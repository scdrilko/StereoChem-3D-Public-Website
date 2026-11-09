import React, { useState } from 'react';
import { Molecule } from '../../types/chemistry';
import { MolecularViewer3D } from '../laboratory/MolecularViewer3D';
import { getMoleculeById } from '../../data/molecules';
import { Atom, CheckCircle2, Sparkles, ArrowRight, Layers, HelpCircle } from 'lucide-react';

interface Props {
  onSelectMolecule: (molecule: Molecule) => void;
}

export const MesoSection: React.FC<Props> = ({ onSelectMolecule }) => {
  const [selectedMesoId, setSelectedMesoId] = useState<'meso-tartaric-acid' | 'meso-2-3-dichlorobutane'>('meso-tartaric-acid');
  const molecule = getMoleculeById(selectedMesoId)!;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold w-fit">
          <Atom className="w-3.5 h-3.5" />
          <span>Internal Symmetry & Optical Inactivity</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Meso Compounds & Internal Compensation
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
          A <strong>meso compound</strong> is an achiral molecule containing two or more stereogenic (chiral) centers. Even though each individual stereocenter is asymmetric, the molecule as a whole is superimposable on its mirror image and optically inactive ($[\alpha]_D = 0.0^\circ$) due to an internal element of symmetry.
        </p>
      </div>

      {/* Meso Molecule Selector */}
      <div className="flex items-center gap-3 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
        <span className="text-xs text-slate-400 font-semibold">Benchmark Meso Molecule:</span>
        <button
          onClick={() => setSelectedMesoId('meso-tartaric-acid')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            selectedMesoId === 'meso-tartaric-acid'
              ? 'bg-rose-500 text-slate-950 font-bold shadow-md shadow-rose-500/20'
              : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          Meso-Tartaric Acid ((2R,3S))
        </button>
        <button
          onClick={() => setSelectedMesoId('meso-2-3-dichlorobutane')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            selectedMesoId === 'meso-2-3-dichlorobutane'
              ? 'bg-rose-500 text-slate-950 font-bold shadow-md shadow-rose-500/20'
              : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          Meso-2,3-Dichlorobutane
        </button>
      </div>

      {/* 3D Visualizer & Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 flex flex-col gap-2">
          <MolecularViewer3D
            molecule={molecule}
            height="480px"
            title={`${molecule.name} - Achiral Meso 3D Model`}
            showCIPPrio={true}
            highlightStereocenters={true}
          />
          <span className="text-xs text-slate-400 text-center italic">
            Rotate the molecule to observe the plane of symmetry dividing the upper (2R) half and lower (3S) half!
          </span>
        </div>

        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col gap-5 text-xs">
          <div>
            <h3 className="text-base font-bold text-white mb-1">{molecule.name}</h3>
            <span className="text-rose-400 font-mono font-semibold">IUPAC: {molecule.iupacName}</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col gap-2">
            <span className="font-bold text-slate-200">Stereocenters Breakdown:</span>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-amber-950 text-amber-300 border border-amber-800/60 font-mono font-bold">
                C2: (R) Configuration
              </span>
              <span className="text-slate-400 font-bold">+</span>
              <span className="px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-mono font-bold">
                C3: (S) Configuration
              </span>
            </div>
            <p className="text-slate-400 text-[11px] mt-1 leading-relaxed">
              Because both carbons have identical sets of substituents (-OH/-Cl, -COOH/-CH3, and -H), the clockwise optical rotation of C2 is exactly matched and canceled by the counter-clockwise rotation of C3.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-emerald-200 flex flex-col gap-2">
            <div className="flex items-center gap-2 font-bold text-emerald-300 text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Internal Compensation vs External Compensation:</span>
            </div>
            <ul className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
              <li>
                <strong>Internal Compensation (Meso):</strong> The optical rotation cancelation occurs <em>within the single molecule itself</em> through its internal symmetry plane ($\sigma$). Optically inactive at any temperature and concentration.
              </li>
              <li>
                <strong>External Compensation (Racemic Mixture):</strong> A 50:50 intermolecular mixture of two separate enantiomer molecules ($d$ and $l$). Can be separated back into optically active enantiomers by chiral resolution!
              </li>
            </ul>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="font-bold text-amber-400 block mb-1">Formula for Number of Stereoisomers:</span>
            <span className="text-slate-300 font-mono leading-relaxed block text-[11px]">
              For molecules with n stereocenters and similar ends (even n):
              <br />
              • Total Isomers: N = 2^(n-1) + 2^(n/2 - 1)
              <br />
              • Optically active pairs (Enantiomers): a = 2^(n-1) (for tartaric acid: 2^(2-1) = 2, the (R,R) and (S,S) pair)
              <br />
              • Meso forms: m = 2^(n/2 - 1) (for tartaric acid: 2^(1-1) = 1 meso isomer)
              <br />
              Total = 2 chiral + 1 meso = 3 stereoisomers (not 2^2 = 4!).
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
