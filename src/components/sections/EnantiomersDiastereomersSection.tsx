import React, { useState } from 'react';
import { Molecule } from '../../types/chemistry';
import { MolecularViewer3D } from '../laboratory/MolecularViewer3D';
import { DualMirrorViewer } from '../laboratory/DualMirrorViewer';
import { MOLECULES_DATABASE, getMoleculeById } from '../../data/molecules';
import { Layers, ArrowRightLeft, Sparkles, Check, X, ShieldAlert, HeartPulse } from 'lucide-react';

interface Props {
  onSelectMolecule: (molecule: Molecule) => void;
}

export const EnantiomersDiastereomersSection: React.FC<Props> = ({ onSelectMolecule }) => {
  const [activeSubTab, setActiveSubTab] = useState<'comparison' | 'drugs' | 'resolution'>('comparison');
  const [selectedPair, setSelectedPair] = useState<'tartaric' | 'alanine' | 'limonene' | 'dichlorobutane'>('tartaric');

  const molecule = selectedPair === 'tartaric'
    ? getMoleculeById('2r-3r-tartaric-acid')!
    : selectedPair === 'alanine'
    ? getMoleculeById('l-alanine')!
    : selectedPair === 'limonene'
    ? getMoleculeById('r-limonene')!
    : getMoleculeById('2r-3r-dichlorobutane')!;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold w-fit">
          <Layers className="w-3.5 h-3.5" />
          <span>Isomer Relationships</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Enantiomers vs Diastereomers
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
          Stereoisomers have identical connectivity but differ in the spatial 3D arrangement of atoms. They bifurcate into <strong>Enantiomers</strong> (non-superimposable mirror images) and <strong>Diastereomers</strong> (stereoisomers that are not mirror images of one another).
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveSubTab('comparison')}
          className={`text-xs px-4 py-2 rounded-xl font-bold transition-all ${
            activeSubTab === 'comparison'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
              : 'text-slate-400 hover:text-white bg-slate-900/60'
          }`}
        >
          Property Comparison & 3D Lab
        </button>
        <button
          onClick={() => setActiveSubTab('drugs')}
          className={`text-xs px-4 py-2 rounded-xl font-bold transition-all ${
            activeSubTab === 'drugs'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
              : 'text-slate-400 hover:text-white bg-slate-900/60'
          }`}
        >
          Biological & Pharmacology Case Studies
        </button>
        <button
          onClick={() => setActiveSubTab('resolution')}
          className={`text-xs px-4 py-2 rounded-xl font-bold transition-all ${
            activeSubTab === 'resolution'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
              : 'text-slate-400 hover:text-white bg-slate-900/60'
          }`}
        >
          Resolution of Racemates
        </button>
      </div>

      {activeSubTab === 'comparison' && (
        <div className="flex flex-col gap-6">
          {/* Pair Selector */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-400 font-semibold mr-2">Benchmark Pair:</span>
            <button
              onClick={() => setSelectedPair('tartaric')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedPair === 'tartaric' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-950 text-slate-300'
              }`}
            >
              Tartaric Acids ((R,R) vs (S,S) vs Meso)
            </button>
            <button
              onClick={() => setSelectedPair('alanine')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedPair === 'alanine' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-950 text-slate-300'
              }`}
            >
              L-Alanine vs D-Alanine
            </button>
            <button
              onClick={() => setSelectedPair('limonene')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedPair === 'limonene' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-950 text-slate-300'
              }`}
            >
              (R)-Limonene vs (S)-Limonene
            </button>
            <button
              onClick={() => setSelectedPair('dichlorobutane')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedPair === 'dichlorobutane' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-950 text-slate-300'
              }`}
            >
              2,3-Dichlorobutane Stereoisomers
            </button>
          </div>

          {/* Dual 3D Mirror Viewer */}
          <DualMirrorViewer
            molecule={molecule}
            onSelectMolecule={onSelectMolecule}
          />

          {/* Comprehensive Comparison Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl">
            <table className="w-full text-xs text-left text-slate-300">
              <thead className="text-[11px] uppercase bg-slate-950/80 text-cyan-400 border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Characteristic</th>
                  <th className="py-3 px-4">Enantiomers (d/l pairs)</th>
                  <th className="py-3 px-4">Diastereomers</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-semibold text-white">Spatial Relationship</td>
                  <td className="py-3 px-4">Non-superimposable mirror images</td>
                  <td className="py-3 px-4">Stereoisomers that are NOT mirror images</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-semibold text-white">Stereocenter Inversion</td>
                  <td className="py-3 px-4 text-cyan-300 font-mono">ALL stereocenters inverted: (R,R) ↔ (S,S)</td>
                  <td className="py-3 px-4 text-amber-300 font-mono">SOME (not all) inverted: (R,R) ↔ (R,S)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-semibold text-white">Melting / Boiling Points</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">IDENTICAL</td>
                  <td className="py-3 px-4 text-rose-400 font-medium">DIFFERENT</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-semibold text-white">Density & Refractive Index</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">IDENTICAL</td>
                  <td className="py-3 px-4 text-rose-400 font-medium">DIFFERENT</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-semibold text-white">Optical Rotation ([α]D)</td>
                  <td className="py-3 px-4">Equal magnitude, opposite sign (+α vs -α)</td>
                  <td className="py-3 px-4">Different magnitudes and independent signs</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-semibold text-white">Separation Difficulty</td>
                  <td className="py-3 px-4 text-amber-300">Challenging (requires chiral environment/salts)</td>
                  <td className="py-3 px-4 text-emerald-400">Easy (fractional crystallization, standard silica)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeSubTab === 'drugs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl flex flex-col gap-3">
            <div className="flex items-center gap-2 text-rose-400">
              <ShieldAlert className="w-5 h-5" />
              <h3 className="text-base font-bold text-white">Thalidomide: The Tragedy of Inactive Enantiomers</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              In the late 1950s, thalidomide was prescribed to pregnant women as a morning sickness sedative. The <strong>(R)-enantiomer</strong> provides the desired sedative effect. However, the <strong>(S)-enantiomer</strong> is a potent teratogen that binds to cereblon (CRBN), leading to severe fetal limb malformations (phocomelia).
            </p>
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-amber-300">
              <strong>Key Stereochemical Principle:</strong> Thalidomide racemizes in vivo under physiological pH (half-life ~4-5 hours), meaning even pure (R)-thalidomide interconverts into the teratogenic (S) form in the bloodstream.
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl flex flex-col gap-3">
            <div className="flex items-center gap-2 text-cyan-400">
              <HeartPulse className="w-5 h-5" />
              <h3 className="text-base font-bold text-white">Ibuprofen: Chiral Inversion</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Ibuprofen is sold as a racemic mixture. Only the <strong>(S)-(+)-ibuprofen</strong> is biologically active in inhibiting cyclooxygenase (COX-1 and COX-2) enzymes to alleviate pain and fever.
            </p>
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-cyan-300">
              <strong>Metabolic Bonus:</strong> In the human liver, an acyl-CoA synthetase enzymatically converts the inactive (R)-ibuprofen into the active (S)-enantiomer, allowing patients to benefit from nearly 80% of the racemic dose!
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'resolution' && (
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl flex flex-col gap-4 text-xs text-slate-300">
          <h3 className="text-base font-bold text-white">How Racemic Mixtures are Separated (Chiral Resolution)</h3>
          <p className="leading-relaxed">
            Because enantiomers have identical physical properties in achiral media, they cannot be separated by standard fractional distillation or simple crystallization. Separation requires introducing a <strong>chiral resolving agent</strong>:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col gap-2">
              <span className="font-bold text-cyan-400 text-sm">1. Diastereomeric Salt Formation</span>
              <p className="text-slate-400 leading-relaxed">
                React racemic acid (±)A with an enantiopure chiral base (+)B to produce a pair of diastereomeric salts: [(+A)(+B)] and [(-A)(+B)]. Because diastereomers have different solubilities, they can be separated by fractional crystallization, then cleaved back with mineral acid!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col gap-2">
              <span className="font-bold text-amber-400 text-sm">2. Chiral Chromatography</span>
              <p className="text-slate-400 leading-relaxed">
                High-Performance Liquid Chromatography (HPLC) using a stationary phase composed of chiral selector molecules (e.g., cyclodextrins, chiral crown ethers, or amylose polymers). One enantiomer forms stronger transient diastereomeric complexes and elutes later.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col gap-2">
              <span className="font-bold text-emerald-400 text-sm">3. Enzymatic Kinetic Resolution</span>
              <p className="text-slate-400 leading-relaxed">
                Chiral enzymes (such as lipases) catalyze reactions selectively on one enantiomer while leaving the other untouched. Yields 50% enantiopure product alongside 50% unreacted enantiomer.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
