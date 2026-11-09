import React, { useState } from 'react';
import { Molecule } from '../../types/chemistry';
import { MOLECULES_DATABASE, searchMolecules } from '../../data/molecules';
import { Search, Sparkles, Filter, AlertCircle, Loader2, ArrowRight, BookOpen, PlusCircle } from 'lucide-react';
import { parseSdf, calculateFormula, calculateMolecularWeight, detectStereocentersAndAssignCIP } from '../../utils/chemicalCalculations';
import { AddMoleculeModal } from '../modals/AddMoleculeModal';
import { analyzeSmilesWithRDKit, getRDKit } from '../../utils/rdkit';

interface Props {
  currentMolecule: Molecule;
  onSelectMolecule: (molecule: Molecule) => void;
}

export const MoleculeLibraryBar: React.FC<Props> = ({ currentMolecule, onSelectMolecule }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [smilesInput, setSmilesInput] = useState('');
  const [isLoadingPubchem, setIsLoadingPubchem] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const categories = [
    { id: 'all', label: 'All Molecules' },
    { id: 'amino-acid', label: 'Amino Acids' },
    { id: 'hydroxy-acid', label: 'Hydroxy Acids' },
    { id: 'alcohol', label: 'Alcohols & Ketones' },
    { id: 'dicarboxylic', label: 'Tartaric & Meso' },
    { id: 'haloalkane', label: 'Haloalkanes' },
    { id: 'alkene', label: 'E/Z Alkenes' },
    { id: 'cycloalkane', label: 'Cyclohexanes' },
  ];

  const filteredMolecules = MOLECULES_DATABASE.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.iupacName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.formula.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'alcohol') return m.category === 'alcohol' || m.category === 'ketone';
    return m.category === selectedCategory;
  });

  // Robust SMILES classifier combining RDKit WebAssembly as primary validator
  // with an OpenSMILES grammar fallback for simple, aromatic, cyclic, and halogen-containing SMILES
  const checkIfValidSmiles = async (input: string): Promise<boolean> => {
    // 1. Primary validation: Genuine RDKit C++ WebAssembly kernel if available
    try {
      const rdkit = await getRDKit();
      if (rdkit) {
        let mol: any = null;
        try {
          mol = rdkit.get_mol(input);
          if (mol) {
            mol.delete();
            return true;
          }
        } catch {
          return false;
        }
        return false;
      }
    } catch {
      // Fallback if RDKit is initializing or unavailable
    }

    // 2. Fallback validation:
    // Chemical names often contain spaces, commas, or hyphenated prefixes (e.g. "tartaric acid", "2-butanol", "1,2-dichloroethane")
    if (/[\s,]/.test(input)) return false;
    if (/[A-Za-z]-[A-Za-z0-9]/.test(input) || /^[0-9]+-/.test(input)) return false;

    // Organic OpenSMILES grammar token matcher:
    // - Explicit bracketed atoms: [Na+], [OH-], [C@@H], [Fe+2]
    // - Two-letter halogens: Cl, Br
    // - Organic subset atoms: B, C, N, O, P, S, F, I, H and aromatic b, c, n, o, p, s
    // - Ring numbers: digits 0-9 and %00-%99
    // - Bonds, branches, and stereochemistry: =, #, $, :, (, ), /, \, ., +, -, @
    const organicSmilesGrammar = /^(?:\[[^\]]+\]|Cl|Br|[BCNOFPSIHbcnoFps0-9=\(\)@#\\\/.:%+\-])+$/;
    if (!organicSmilesGrammar.test(input)) return false;

    // Must contain at least one valid chemical atom token (not just punctuation or numbers like "123" or "===")
    const containsAtom = /(?:\[[^\]]+\]|Cl|Br|[BCNOFPSIHbcnoFps])/.test(input);
    return containsAtom;
  };

  // Helper to load structure once canonical SMILES is determined
  const loadStructureBySmiles = async (
    targetSmiles: string,
    displayName?: string,
    iupacName?: string
  ) => {
    // Validate with RDKit if it looks like a SMILES string
    const isLikelySmiles = /[=\(\)@\[\]#\\\/]/.test(targetSmiles);
    if (isLikelySmiles) {
      const rdkitVal = await analyzeSmilesWithRDKit(targetSmiles);
      if (rdkitVal && !rdkitVal.isValid && rdkitVal.errorMessage) {
        throw new Error(rdkitVal.errorMessage);
      }
    }

    // Fetch 3D coordinates via server API /api/pubchem/3d
    const res = await fetch(`/api/pubchem/3d?query=${encodeURIComponent(targetSmiles)}`);
    if (!res.ok) {
      throw new Error(`Could not resolve 3D structure for "${targetSmiles}". Please check the SMILES string syntax.`);
    }
    const sdfText = await res.text();
    const parsed = parseSdf(sdfText, targetSmiles);

    if (parsed.atoms.length === 0) {
      throw new Error('Parsed structure contains 0 atoms.');
    }

    const formula = calculateFormula(parsed.atoms);
    const mw = calculateMolecularWeight(parsed.atoms);

    // Automated stereocenter detection and CIP (R)/(S) configuration computation
    const { stereocenters, updatedAtoms } = detectStereocentersAndAssignCIP(parsed.atoms, parsed.bonds);

    let molName = displayName;
    if (!molName) {
      if (targetSmiles === '[NH4+]' || targetSmiles === '[NH4]' || (parsed.atoms.length === 5 && formula === 'NH4+')) {
        molName = 'Ammonium Ion';
      } else {
        molName = targetSmiles.length > 20 ? targetSmiles.substring(0, 18) + '...' : targetSmiles;
      }
    }

    const customMolecule: Molecule = {
      id: `custom-${Date.now()}`,
      name: molName,
      iupacName: iupacName || (molName === 'Ammonium Ion' ? 'Azanium (Ammonium)' : `Custom: ${molName}`),
      formula,
      molecularWeight: mw,
      smiles: targetSmiles,
      description: targetSmiles === '[NH4+]' || molName === 'Ammonium Ion'
        ? 'Ammonium polyatomic cation [NH4+] with tetrahedral coordination geometry and +1 formal charge.'
        : `Imported via 3D PubChem coordinate resolver. Identified ${stereocenters.length} stereogenic center(s) with verified CIP (R)/(S) configurations.`,
      category: 'haloalkane',
      isChiral: stereocenters.length > 0,
      stereocentersCount: stereocenters.length,
      stereocenters,
      atoms: updatedAtoms,
      bonds: parsed.bonds,
    };

    onSelectMolecule(customMolecule);
  };

  // Handler to fetch 3D coordinates from PubChem for custom SMILES or resolved molecule name
  const handleLoadCustomSmiles = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // Priority: user-entered text in SMILES box; fallback to search box query
    const queryFromSmiles = smilesInput.trim();
    const queryFromSearch = searchQuery.trim();
    const query = queryFromSmiles || queryFromSearch;

    if (!query) {
      setErrorMessage('Please enter a SMILES string or chemical name.');
      return;
    }

    setErrorMessage(null);
    setIsLoadingPubchem(true);

    try {
      // First check if it matches an existing molecule SMILES or name
      // SMILES matching is strictly case-sensitive ('c1ccccc1' != 'C1CCCCC1'); name/iupac matching is case-insensitive
      const exactMatch = MOLECULES_DATABASE.find(
        (m) =>
          m.smiles === query ||
          m.name.toLowerCase() === query.toLowerCase() ||
          m.iupacName.toLowerCase() === query.toLowerCase()
      );

      if (exactMatch) {
        onSelectMolecule(exactMatch);
        setIsLoadingPubchem(false);
        if (queryFromSmiles) setSmilesInput('');
        return;
      }

      // Check if input is a valid chemical SMILES string
      const isSmiles = await checkIfValidSmiles(query);

      if (isSmiles) {
        // Direct working SMILES loading pathway
        await loadStructureBySmiles(query);
        setSmilesInput('');
      } else {
        // Resolve molecule name through PubChem property service to retrieve canonical SMILES
        const resolveRes = await fetch(`/api/pubchem/resolve?name=${encodeURIComponent(query)}`);
        if (!resolveRes.ok) {
          throw new Error(`Could not resolve molecule name "${query}" via PubChem. Please verify the chemical name or enter its SMILES string.`);
        }

        const resolvedData = await resolveRes.json();
        const canonicalSmiles = resolvedData.smiles;
        const resolvedName = resolvedData.name || query;
        const resolvedIupac = resolvedData.iupacName || query;

        if (!canonicalSmiles) {
          throw new Error(`PubChem returned no SMILES structure for "${query}".`);
        }

        // Pass the resolved canonical SMILES to the existing working loader
        await loadStructureBySmiles(canonicalSmiles, resolvedName, resolvedIupac);

        // Populate SMILES box with the resolved canonical SMILES if not already typed there
        if (!queryFromSmiles) {
          setSmilesInput(canonicalSmiles);
        } else {
          setSmilesInput('');
        }
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Failed to load 3D coordinates.');
    } finally {
      setIsLoadingPubchem(false);
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl backdrop-blur-xl flex flex-col gap-4 text-slate-200">
      {/* Modal Dialog for Adding Molecule */}
      <AddMoleculeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onMoleculeAdded={onSelectMolecule}
      />

      {/* Search & Custom SMILES Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
        {/* Search Input */}
        <div className="lg:col-span-5 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleLoadCustomSmiles();
              }
            }}
            placeholder="Search example molecules (e.g. Alanine, Tartaric, Butanol)..."
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9.5 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
          />
        </div>

        {/* SMILES & Add Molecule Actions */}
        <form onSubmit={handleLoadCustomSmiles} className="lg:col-span-7 flex flex-wrap sm:flex-nowrap items-center gap-2">
          <div className="relative flex-1 w-full sm:w-auto">
            <input
              type="text"
              value={smilesInput}
              onChange={(e) => {
                setSmilesInput(e.target.value);
                setErrorMessage(null);
              }}
              placeholder="Enter custom SMILES or name (e.g. CC(O)C(=O)O, threonine)..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-cyan-300 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isLoadingPubchem || (!smilesInput.trim() && !searchQuery.trim())}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 shrink-0 shadow-md shadow-cyan-500/20"
          >
            {isLoadingPubchem ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <>
                <span>Load</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all flex items-center gap-1.5 shrink-0 shadow-md shadow-amber-500/20"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>+ Add & Check R/S</span>
          </button>
        </form>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="px-3 py-2 rounded-xl bg-rose-950/40 border border-rose-800/60 text-xs text-rose-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-thin">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all font-medium ${
              selectedCategory === c.id
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Quick Example Molecule Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 max-h-48 overflow-y-auto pr-1">
        {filteredMolecules.map((m) => {
          const isSelected = currentMolecule.id === m.id;
          return (
            <button
              key={m.id}
              onClick={() => onSelectMolecule(m)}
              className={`p-2.5 rounded-xl text-left border transition-all flex flex-col justify-between group ${
                isSelected
                  ? 'bg-cyan-950/50 border-cyan-500 ring-1 ring-cyan-500/30'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/40'
              }`}
            >
              <div className="flex items-start justify-between gap-1 mb-1">
                <span className="font-bold text-xs text-white group-hover:text-cyan-300 transition-colors truncate">
                  {m.name}
                </span>
                {m.stereocentersCount > 0 && (
                  <span className="text-[10px] px-1 rounded bg-amber-950/80 text-amber-300 border border-amber-800/40 font-mono shrink-0">
                    {m.stereocenters.map((s) => s.configuration).join('')}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>{m.formula}</span>
                {m.isMeso && <span className="text-emerald-400 text-[10px] font-bold">Meso</span>}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
