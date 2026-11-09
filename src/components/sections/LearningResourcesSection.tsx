import React, { useState } from 'react';
import { BookOpen, Search, Sparkles, Award, Atom, ExternalLink } from 'lucide-react';

export const LearningResourcesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cip-table' | 'glossary' | 'nobel' | 'drugs'>('cip-table');
  const [glossarySearch, setGlossarySearch] = useState('');

  const glossaryTerms = [
    { term: 'Achiral', def: 'A molecule that is superimposable on its mirror image; has an internal plane of symmetry or inversion center.' },
    { term: 'Allene', def: 'A compound with contiguous double bonds (-C=C=C-); can possess axial chirality without asymmetric carbons if ends are substituted.' },
    { term: 'Anti-periplanar', def: 'Conformation with a dihedral angle of 180° between two designated groups; global energy minimum in n-butane.' },
    { term: 'Asymmetric Carbon', def: 'A carbon atom bonded to four constitutionally or stereochemically distinct groups.' },
    { term: 'Atropisomerism', def: 'Stereoisomerism resulting from hindered rotation about a single bond where steric barrier exceeds ~80 kJ/mol (e.g. BINAP).' },
    { term: 'Axial Chirality', def: 'Chirality around an axis (chiral axis) rather than a single stereogenic center (e.g., substituted biphenyls and allenes).' },
    { term: 'Biot’s Law', def: 'Equation relating observed optical rotation to specific rotation, path length, and concentration: α = [α] · l · c.' },
    { term: 'Cahn-Ingold-Prelog (CIP)', def: 'System of rules used to sequence priority of groups around a chiral center to assign (R)/(S) or (E)/(Z).' },
    { term: 'Chiral Center', def: 'An atom holding a set of ligands in a spatial arrangement that is not superimposable on its mirror image.' },
    { term: 'Chirality', def: 'The geometric property of a rigid object of not being superimposable on its mirror image.' },
    { term: 'Circular Dichroism (CD)', def: 'Spectroscopic technique measuring difference in absorption of left- and right-circularly polarized light by chiral molecules.' },
    { term: 'Conformation', def: 'Any spatial arrangement of atoms in a molecule achieved by rotation around single bonds without breaking covalent bonds.' },
    { term: 'Dextrorotatory (+)', def: 'Substance that rotates the plane of polarized light clockwise when facing the oncoming light beam.' },
    { term: 'Diastereomers', def: 'Stereoisomers that are not mirror images of one another; possess different physical and chemical properties.' },
    { term: 'Enantiomeric Excess (% ee)', def: 'Measurement of optical purity: [(Major enantiomer - Minor enantiomer) / (Total)] × 100%.' },
    { term: 'Enantiomers', def: 'A pair of non-superimposable mirror image stereoisomers.' },
    { term: 'Epimer', def: 'A diastereomer that differs in configuration at only one of several stereocenters (e.g., D-glucose and D-galactose).' },
    { term: 'Erythro and Threo', def: 'Nomenclature for diastereomers with two adjacent stereocenters: erythro has identical groups on the same side in Fischer; threo has them on opposite sides.' },
    { term: 'Fischer Projection', def: '2D cross formula representing chiral centers where horizontal bonds point forward (wedges) and vertical recede backward (dashes).' },
    { term: 'Gauche', def: 'Conformation with a dihedral angle of ~60° between two substituents; higher energy than anti due to steric interaction.' },
    { term: 'Helicity', def: 'Chirality arising from a screw-like or helical spatial arrangement (e.g., hexahelicene, DNA double helix).' },
    { term: 'Internal Compensation', def: 'Cancelation of optical rotation within a meso molecule because one chiral center cancels the opposite chiral center.' },
    { term: 'Levorotatory (-)', def: 'Substance that rotates the plane of polarized light counter-clockwise.' },
    { term: 'Meso Compound', def: 'An achiral stereoisomer containing multiple stereocenters that has an internal element of symmetry (plane σ or inversion center i).' },
    { term: 'Newman Projection', def: 'Representation viewing down a carbon-carbon bond axis with front carbon as vertex and back carbon as a circle.' },
    { term: 'Optical Purity', def: 'The ratio of observed optical rotation to the specific rotation of the pure enantiomer.' },
    { term: 'Prochirality', def: 'The geometric property of an achiral molecule that can be converted into a chiral molecule in a single chemical step.' },
    { term: 'Racemic Mixture', def: 'An equimolar (1:1) mixture of two enantiomers; exhibits zero optical rotation.' },
    { term: 'Resolution', def: 'The chemical or physical separation of a racemic mixture into its individual pure enantiomers.' },
    { term: 'Stereogenic Center', def: 'A focus of stereoisomerism such that an interchange of two attached groups produces a new stereoisomer.' },
    { term: 'Torsional Strain', def: 'Strain caused by repulsion between electron pairs in adjacent bonds when atoms are forced into an eclipsed conformation.' },
  ];

  const nobelLaureates = [
    { year: 1848, name: 'Louis Pasteur', contribution: 'Manual separation of (+) and (-) sodium ammonium tartrate crystals, discovering molecular chirality.' },
    { year: 1901, name: 'Jacobus Henricus van \'t Hoff & Joseph Le Bel', contribution: 'Proposed the 3D tetrahedral geometry of carbon bonds, establishing the foundation of stereochemistry.' },
    { year: 1969, name: 'Derek Barton & Odd Hassel', contribution: 'Nobel Prize in Chemistry for developing the concept of conformation and its application in cyclohexane chemistry.' },
    { year: 1975, name: 'Vladimir Prelog & John Cornforth', contribution: 'Nobel Prize for research into the stereochemistry of organic molecules, reactions, and the formulation of CIP rules.' },
    { year: 2001, name: 'William Knowles, Ryōji Noyori & K. Barry Sharpless', contribution: 'Nobel Prize for stereoselective asymmetric hydrogenations and epoxidations, revolutionizing chiral synthesis.' },
  ];

  const filteredGlossary = glossaryTerms.filter(
    (g) =>
      g.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      g.def.toLowerCase().includes(glossarySearch.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold w-fit">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Curriculum Compendium</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Learning Resources & Stereochemistry Reference
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
          Comprehensive reference materials including IUPAC priority tables, authoritative stereochemical glossaries, Nobel prize milestones, and chiral pharmacology.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab('cip-table')}
          className={`px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
            activeTab === 'cip-table'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white bg-slate-900/60'
          }`}
        >
          CIP Priority Reference Chart
        </button>
        <button
          onClick={() => setActiveTab('glossary')}
          className={`px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
            activeTab === 'glossary'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white bg-slate-900/60'
          }`}
        >
          Stereochemistry Glossary (30+ Terms)
        </button>
        <button
          onClick={() => setActiveTab('nobel')}
          className={`px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
            activeTab === 'nobel'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white bg-slate-900/60'
          }`}
        >
          Nobel Laureates in Stereochemistry
        </button>
        <button
          onClick={() => setActiveTab('drugs')}
          className={`px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
            activeTab === 'drugs'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white bg-slate-900/60'
          }`}
        >
          Chiral Pharmacology Case Studies
        </button>
      </div>

      {/* CIP Priority Chart Tab */}
      {activeTab === 'cip-table' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-4 text-xs text-slate-300">
          <h3 className="text-base font-bold text-white">Cahn-Ingold-Prelog Comprehensive Group Ranking Table</h3>
          <p className="text-slate-400 leading-relaxed">
            Standard decreasing priority order from highest (1) to lowest (30+) for commonly encountered functional groups in university organic chemistry:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-2">
            {[
              { rank: 1, group: '-I (Iodine)', note: 'Atomic number Z=53' },
              { rank: 2, group: '-Br (Bromine)', note: 'Z=35' },
              { rank: 3, group: '-Cl (Chlorine)', note: 'Z=17' },
              { rank: 4, group: '-SO3H (Sulfonic acid)', note: 'Sulfur Z=16' },
              { rank: 5, group: '-F (Fluorine)', note: 'Z=9' },
              { rank: 6, group: '-O-COR (Ester oxygen)', note: 'Oxygen Z=8' },
              { rank: 7, group: '-OR (Alkoxy)', note: 'Oxygen Z=8' },
              { rank: 8, group: '-OH (Hydroxyl)', note: 'Oxygen Z=8' },
              { rank: 9, group: '-NO2 (Nitro)', note: 'Nitrogen Z=7' },
              { rank: 10, group: '-NH2 (Amino)', note: 'Nitrogen Z=7' },
              { rank: 11, group: '-COOH (Carboxylic acid)', note: 'C bonded to (O, O, O)' },
              { rank: 12, group: '-COOR (Ester carbon)', note: 'C bonded to (O, O, O)' },
              { rank: 13, group: '-CONH2 (Amide)', note: 'C bonded to (O, O, N)' },
              { rank: 14, group: '-CHO (Aldehyde)', note: 'C bonded to (O, O, H)' },
              { rank: 15, group: '-CH2OH (Hydroxymethyl)', note: 'C bonded to (O, H, H)' },
              { rank: 16, group: '-C≡N (Nitrile)', note: 'C bonded to (N, N, N)' },
              { rank: 17, group: '-C6H5 (Phenyl)', note: 'Aromatic carbons' },
              { rank: 18, group: '-C≡CH (Ethynyl)', note: 'C bonded to (C, C, C)' },
              { rank: 19, group: '-C(CH3)3 (tert-Butyl)', note: 'C bonded to (C, C, C)' },
              { rank: 20, group: '-CH=CH2 (Vinyl)', note: 'C bonded to (C, C, H)' },
              { rank: 21, group: '-CH(CH3)2 (Isopropyl)', note: 'C bonded to (C, C, H)' },
              { rank: 22, group: '-CH2CH2CH3 (Propyl)', note: 'C bonded to (C, H, H)' },
              { rank: 23, group: '-CH2CH3 (Ethyl)', note: 'C bonded to (C, H, H)' },
              { rank: 24, group: '-CH3 (Methyl)', note: 'C bonded to (H, H, H)' },
              { rank: 25, group: '-2H / -D (Deuterium)', note: 'Isotope mass = 2' },
              { rank: 26, group: '-1H / -H (Hydrogen)', note: 'Atomic number Z=1 (Lowest)' },
            ].map((item) => (
              <div key={item.rank} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-300 font-mono font-bold flex items-center justify-center text-xs">
                    {item.rank}
                  </span>
                  <span className="font-bold text-white font-mono">{item.group}</span>
                </div>
                <span className="text-[10px] text-slate-400">{item.note}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Glossary Tab */}
      {activeTab === 'glossary' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-4 text-xs text-slate-300">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-base font-bold text-white">Glossary of Stereochemical Terms</h3>
            <div className="relative w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={glossarySearch}
                onChange={(e) => setGlossarySearch(e.target.value)}
                placeholder="Search glossary terms..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2 max-h-[500px] overflow-y-auto pr-2">
            {filteredGlossary.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col gap-1">
                <span className="font-bold text-sm text-cyan-400">{item.term}</span>
                <p className="text-slate-300 text-xs leading-relaxed">{item.def}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Nobel Laureates Tab */}
      {activeTab === 'nobel' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-4 text-xs text-slate-300">
          <h3 className="text-base font-bold text-white">Nobel Laureates in Stereochemistry History</h3>
          <div className="flex flex-col gap-3 mt-2">
            {nobelLaureates.map((nobel, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold font-mono text-sm shrink-0">
                  {nobel.year}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{nobel.name}</h4>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">{nobel.contribution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chiral Pharmacology Tab */}
      {activeTab === 'drugs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col gap-2">
            <span className="font-bold text-cyan-400 text-sm">Naproxen (Aleve)</span>
            <p className="leading-relaxed">
              <strong>(S)-Naproxen</strong> is an effective nonsteroidal anti-inflammatory drug (NSAID) 28 times more active than its (R)-enantiomer. The <strong>(R)-enantiomer</strong> causes severe liver toxicity without relieving pain.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col gap-2">
            <span className="font-bold text-cyan-400 text-sm">Albuterol (Salbutamol)</span>
            <p className="leading-relaxed">
              <strong>(R)-Albuterol (levalbuterol)</strong> is a potent bronchodilator for asthma relief. The <strong>(S)-enantiomer</strong> does not dilate airways and can actually promote bronchial inflammation and bronchospasm.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
