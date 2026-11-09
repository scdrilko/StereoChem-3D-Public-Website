import React, { useState } from 'react';
import { Molecule } from '../../types/chemistry';
import {
  X,
  PlusCircle,
  Search,
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Compass,
  Atom,
} from 'lucide-react';
import { parseSdf, calculateFormula, calculateMolecularWeight, detectStereocentersAndAssignCIP } from '../../utils/chemicalCalculations';
import { MOLECULES_DATABASE } from '../../data/molecules';
import { analyzeSmilesWithRDKit } from '../../utils/rdkit';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onMoleculeAdded: (molecule: Molecule) => void;
}

export const AddMoleculeModal: React.FC<Props> = ({ isOpen, onClose, onMoleculeAdded }) => {
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resultMolecule, setResultMolecule] = useState<Molecule | null>(null);
  const [rdkitSvg, setRdkitSvg] = useState<string | null>(null);

  if (!isOpen) return null;

  const quickSuggestions = [
    { name: 'Threonine', query: 'threonine', desc: 'Amino acid with 2 stereocenters (2S, 3R)' },
    { name: '(R)-Carvone', query: 'R-carvone', desc: 'Spearmint fragrance' },
    { name: '(S)-Carvone', query: 'S-carvone', desc: 'Caraway seed fragrance' },
    { name: 'Malic Acid', query: 'malic acid', desc: 'Apple hydroxy dicarboxylic acid' },
    { name: 'Menthol', query: 'menthol', desc: 'Terpene with 3 chiral centers' },
    { name: 'Epinephrine', query: 'epinephrine', desc: 'Adrenaline neurotransmitter' },
    { name: '2-Chloropropanoic acid', query: 'CC(Cl)C(=O)O', desc: 'Simple chiral halo acid' },
  ];

  const handleProcessQuery = async (queryToUse?: string) => {
    const q = (queryToUse || inputQuery).trim();
    if (!q) {
      setErrorMessage('Please enter a chemical name or SMILES string.');
      return;
    }

    setErrorMessage(null);
    setIsLoading(true);
    setResultMolecule(null);
    setRdkitSvg(null);

    try {
      // 1. Check existing curated database
      const existing = MOLECULES_DATABASE.find(
        (m) =>
          m.name.toLowerCase() === q.toLowerCase() ||
          m.iupacName.toLowerCase() === q.toLowerCase() ||
          m.smiles.toLowerCase() === q.toLowerCase()
      );

      if (existing) {
        setResultMolecule(existing);
        analyzeSmilesWithRDKit(existing.smiles).then((res) => {
          if (res.svg) setRdkitSvg(res.svg);
        });
        setIsLoading(false);
        return;
      }

      // Pre-validate if input resembles SMILES notation
      const isLikelySmiles = /[=\\#@()[\]]/.test(q) || (!q.includes(' ') && /^[A-Za-z0-9@+\-[\]()=#$\\/.]+$/.test(q));
      if (isLikelySmiles) {
        const rdkitCheck = await analyzeSmilesWithRDKit(q);
        if (!rdkitCheck.isValid && rdkitCheck.errorMessage) {
          throw new Error(`RDKit SMILES Error: ${rdkitCheck.errorMessage}`);
        }
        if (rdkitCheck.svg) {
          setRdkitSvg(rdkitCheck.svg);
        }
      }

      // 2. Query PubChem 3D coordinates via server route
      const res = await fetch(`/api/pubchem/3d?query=${encodeURIComponent(q)}`);
      if (!res.ok) {
        throw new Error(`Could not find 3D coordinates for "${q}". Please check spelling or verify SMILES syntax.`);
      }

      const sdfText = await res.text();
      const parsed = parseSdf(sdfText, q);

      if (parsed.atoms.length === 0) {
        throw new Error('Retrieved structure contains no atoms.');
      }

      const formula = calculateFormula(parsed.atoms);
      const mw = calculateMolecularWeight(parsed.atoms);

      // Automated stereocenter detection & CIP R/S computation
      const { stereocenters, updatedAtoms } = detectStereocentersAndAssignCIP(parsed.atoms, parsed.bonds);

      const newMol: Molecule = {
        id: `custom-${Date.now()}`,
        name: q.charAt(0).toUpperCase() + q.slice(1),
        iupacName: `Structure: ${q}`,
        formula,
        molecularWeight: mw,
        smiles: q,
        description: `Imported via 3D PubChem coordinate resolver. Automatically detected ${stereocenters.length} stereogenic center(s) with CIP (R)/(S) configuration assignments.`,
        category: 'haloalkane',
        isChiral: stereocenters.length > 0,
        stereocentersCount: stereocenters.length,
        stereocenters,
        atoms: updatedAtoms,
        bonds: parsed.bonds,
      };

      setResultMolecule(newMol);
      analyzeSmilesWithRDKit(q).then((r) => {
        if (r.svg) setRdkitSvg(r.svg);
      });
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Failed to load and compute stereochemistry.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmAdd = () => {
    if (!resultMolecule) return;
    onMoleculeAdded(resultMolecule);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Add Molecule & Check Configuration</h2>
              <p className="text-xs text-slate-400">
                Input any chemical name or SMILES string for automatic 3D stereocenter & CIP R/S analysis
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex flex-col gap-5 text-xs text-slate-300">
          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleProcessQuery();
            }}
            className="flex flex-col gap-2"
          >
            <label className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
              Enter Chemical Name or SMILES:
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => {
                    setInputQuery(e.target.value);
                    setErrorMessage(null);
                  }}
                  placeholder="e.g. threonine, malic acid, CC(O)C(=O)O, carvone..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9.5 pr-4 py-2.5 text-xs font-mono text-cyan-300 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !inputQuery.trim()}
                className="px-5 py-2.5 rounded-xl font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <span>Analyze</span>
                    <Sparkles className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Suggestions */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-semibold text-slate-400">Quick Test Candidates:</span>
            <div className="flex flex-wrap gap-1.5">
              {quickSuggestions.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInputQuery(s.query);
                    handleProcessQuery(s.query);
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-cyan-300 transition-all text-[11px] flex items-center gap-1"
                >
                  <Atom className="w-3 h-3 text-cyan-400" />
                  <span>{s.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/60 text-rose-300 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Analysis Results Display */}
          {resultMolecule && (
            <div className="p-4 rounded-2xl bg-slate-950/90 border border-cyan-500/40 flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{resultMolecule.name}</span>
                  </h3>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Formula: {resultMolecule.formula} • MW: {resultMolecule.molecularWeight} g/mol • {resultMolecule.atoms.length} Atoms
                  </span>
                </div>

                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-bold border ${
                    resultMolecule.stereocentersCount > 0
                      ? 'bg-amber-950 text-amber-300 border-amber-800/50'
                      : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  {resultMolecule.stereocentersCount > 0
                    ? `${resultMolecule.stereocentersCount} Chiral Center(s)`
                    : 'Achiral Molecule'}
                </span>
              </div>

              {/* RDKit 2D Structure Preview if available */}
              {rdkitSvg && (
                <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div
                    className="w-32 h-20 bg-white rounded-lg p-1 flex items-center justify-center shrink-0 overflow-hidden [&_svg]:w-full [&_svg]:h-full"
                    dangerouslySetInnerHTML={{ __html: rdkitSvg }}
                  />
                  <div className="flex flex-col text-xs text-slate-400">
                    <span className="font-semibold text-cyan-400 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      RDKit C++ WebAssembly Depiction
                    </span>
                    <span className="text-[11px] text-slate-400 mt-0.5">
                      Chemical structure validated with formal valence and 2D stereobond projection.
                    </span>
                  </div>
                </div>
              )}

              {/* Stereocenters Details */}
              {resultMolecule.stereocenters.length > 0 ? (
                <div className="flex flex-col gap-3">
                  <span className="font-bold text-amber-300 uppercase tracking-wider text-[11px]">
                    Determined Stereochemical Configurations:
                  </span>

                  {resultMolecule.stereocenters.map((sc, scIdx) => (
                    <div
                      key={scIdx}
                      className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col gap-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-xs">
                          Chiral Center: <span className="text-cyan-400">{sc.label}</span>
                        </span>
                        <span className="text-xs px-2.5 py-0.5 rounded font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          Configuration: ({sc.configuration})
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[11px]">
                        {sc.substituents.map((sub) => (
                          <div
                            key={sub.priority}
                            className="p-1.5 rounded bg-slate-950 border border-slate-800 flex items-center gap-1.5 truncate"
                          >
                            <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-[10px] shrink-0">
                              {sub.priority}
                            </span>
                            <span className="truncate text-slate-200">{sub.groupName}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-400 text-center">
                  No tetrahedral carbons with 4 distinct substituents detected. The molecule is achiral.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/50 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Coordinates and bond connectivity verified via PubChem REST API.
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            {resultMolecule && (
              <button
                onClick={handleConfirmAdd}
                className="px-5 py-2 rounded-xl font-bold text-xs bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20 transition-all flex items-center gap-1.5"
              >
                <span>Load into 3D Laboratory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
