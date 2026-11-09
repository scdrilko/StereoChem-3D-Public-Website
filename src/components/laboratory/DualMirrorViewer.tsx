import React, { useState } from 'react';
import { Molecule } from '../../types/chemistry';
import { MolecularViewer3D } from './MolecularViewer3D';
import { getMoleculeById } from '../../data/molecules';
import { ArrowRightLeft, Sparkles, Layers, CheckCircle2, XCircle, Info } from 'lucide-react';

interface Props {
  molecule: Molecule;
  onSelectMolecule: (molecule: Molecule) => void;
}

export const DualMirrorViewer: React.FC<Props> = ({ molecule, onSelectMolecule }) => {
  const [showSuperimposed, setShowSuperimposed] = useState(false);
  const [syncRotation, setSyncRotation] = useState(true);

  const enantiomer = molecule.enantiomerId ? getMoleculeById(molecule.enantiomerId) : null;

  if (!enantiomer) {
    return (
      <div className="p-8 text-center bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-col items-center justify-center gap-3 text-slate-300">
        <Info className="w-8 h-8 text-cyan-400" />
        <h3 className="text-base font-bold text-white">No Enantiomer Available</h3>
        <p className="text-xs text-slate-400 max-w-md">
          {molecule.isMeso
            ? 'This molecule is a Meso compound (achiral) and has no enantiomer—it is superimposable on its own mirror image.'
            : `${molecule.name} does not have a defined chiral partner in this demonstration.`}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Interactive Controls Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-white flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Stereoisomer Comparison Lab:
          </span>
          <span className="text-xs text-slate-400">
            {molecule.name} vs {enantiomer.name}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSuperimposed(!showSuperimposed)}
            className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
              showSuperimposed
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{showSuperimposed ? 'Exit Superimposition' : 'Test Superimposition'}</span>
          </button>
        </div>
      </div>

      {/* Superimposition Diagnostic Banner */}
      {showSuperimposed && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-rose-950/40 via-slate-900/90 to-amber-950/40 border border-amber-500/30 text-xs flex items-start gap-3 text-slate-300">
          <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1">
            <span className="font-bold text-amber-300">Non-Superimposability Test Result:</span>
            <span>
              Notice how no matter how you rotate either molecule in 3D space, when the carbon backbone and one substituent are aligned, the other two substituents are swapped and point in opposite directions!
            </span>
            <span className="text-slate-400 text-[11px] mt-1 font-mono">
              Enantiomers are non-superimposable mirror images: (R) ≠ (S).
            </span>
          </div>
        </div>
      )}

      {/* Dual 3D Viewers with Virtual Mirror Plane in Middle */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
        {/* Left Isomer Viewer */}
        <div className="relative">
          <div className="absolute top-3 left-4 z-20 pointer-events-none">
            <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-cyan-950/90 text-cyan-300 border border-cyan-700/60 shadow">
              {molecule.name}
            </span>
          </div>
          <MolecularViewer3D
            molecule={molecule}
            height="460px"
            title={`${molecule.name}`}
            showCIPPrio={true}
          />
        </div>

        {/* Virtual Mirror Plane Center Indicator (Hidden on small screens) */}
        <div className="hidden md:flex absolute left-1/2 top-0 bottom-0 -translate-x-1/2 z-20 pointer-events-none items-center justify-center">
          <div className="h-[80%] w-[2px] bg-gradient-to-b from-transparent via-cyan-400/80 to-transparent shadow-[0_0_12px_rgba(34,211,238,0.8)] relative">
            <span className="absolute top-1/2 -translate-y-1/2 -left-12 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950/90 text-cyan-300 border border-cyan-800">
              MIRROR PLANE
            </span>
          </div>
        </div>

        {/* Right Isomer Viewer */}
        <div className="relative">
          <div className="absolute top-3 left-4 z-20 pointer-events-none">
            <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-amber-950/90 text-amber-300 border border-amber-700/60 shadow">
              {enantiomer.name}
            </span>
          </div>
          <MolecularViewer3D
            molecule={enantiomer}
            height="460px"
            title={`${enantiomer.name}`}
            showCIPPrio={true}
          />
        </div>
      </div>
    </div>
  );
};
