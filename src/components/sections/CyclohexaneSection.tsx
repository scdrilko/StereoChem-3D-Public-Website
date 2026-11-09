import React, { useState } from 'react';
import { MolecularViewer3D } from '../laboratory/MolecularViewer3D';
import { getMoleculeById } from '../../data/molecules';
import { RefreshCw, Sparkles, CheckCircle2, ShieldAlert, ArrowRight } from 'lucide-react';

export const CyclohexaneSection: React.FC = () => {
  const [conformation, setConformation] = useState<'chair' | 'boat'>('chair');
  const [isFlipping, setIsFlipping] = useState(false);

  const molecule = getMoleculeById('cyclohexane-chair')!;

  const handleRingFlip = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setIsFlipping(false);
    }, 600);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold w-fit">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Conformational Analysis in Rings</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Cyclohexane Conformations: Chair vs Boat
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
          Because planar cyclohexane would have C-C-C bond angles of 120° (inducing severe angle strain) and 12 eclipsed C-H bonds (inducing severe torsional strain), the six-membered ring puckers into the strain-free <strong>Chair conformation</strong> where all bond angles are 109.5° and all adjacent C-H bonds are staggered.
        </p>
      </div>

      {/* Conformation Selector Bar */}
      <div className="flex items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setConformation('chair')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              conformation === 'chair'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            Chair Conformation (0 kJ/mol)
          </button>
          <button
            onClick={() => setConformation('boat')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              conformation === 'boat'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            Boat Conformation (+29 kJ/mol)
          </button>
        </div>

        <button
          onClick={handleRingFlip}
          className={`text-xs px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold transition-all flex items-center gap-1.5 shadow-md shadow-amber-500/20 ${
            isFlipping ? 'animate-spin' : ''
          }`}
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Execute Chair Ring Flip</span>
        </button>
      </div>

      {/* 3D Visualizer and Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 flex flex-col gap-2">
          <MolecularViewer3D
            molecule={molecule}
            height="480px"
            title="Cyclohexane 3D Model: Light Blue = Axial H, White = Equatorial H"
            showLabels={true}
          />
          <div className="flex items-center justify-center gap-4 text-xs mt-1">
            <span className="flex items-center gap-1.5 text-sky-400 font-semibold">
              <span className="w-3 h-3 rounded-full bg-sky-400"></span>
              <span>6 Axial Hydrogens (Vertical, parallel to C3 axis)</span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-200 font-semibold">
              <span className="w-3 h-3 rounded-full bg-slate-200"></span>
              <span>6 Equatorial Hydrogens (Radiate outwards)</span>
            </span>
          </div>
        </div>

        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-col gap-5 text-xs text-slate-300">
          <h3 className="text-base font-bold text-white">Axial vs Equatorial & Ring Flip Principles</h3>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col gap-2.5">
            <span className="font-bold text-amber-300 uppercase tracking-wider text-[11px]">
              What Happens During a Chair Ring Flip?
            </span>
            <p className="leading-relaxed">
              Via a high-energy half-chair and twist-boat intermediate, the ring inverts:
            </p>
            <ul className="space-y-1.5 text-[11px] font-mono text-cyan-300">
              <li>• ALL 6 AXIAL bonds become EQUATORIAL</li>
              <li>• ALL 6 EQUATORIAL bonds become AXIAL</li>
              <li>• UP bonds remain UP; DOWN bonds remain DOWN!</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col gap-2">
            <span className="font-bold text-rose-400 uppercase tracking-wider text-[11px]">
              1,3-Diaxial Steric Interaction:
            </span>
            <p className="leading-relaxed text-slate-300">
              When a bulky substituent (such as -CH3 or -C(CH3)3) occupies an <strong>axial</strong> position, it clashes with the axial hydrogens on carbons 3 and 5. For <em>tert</em>-butylcyclohexane, the equatorial conformer is favored by ~20 kJ/mol (99.99% equatorial at 25°C).
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[11px] text-slate-400 block font-semibold">Chair Strain</span>
              <span className="text-sm font-bold text-emerald-400 font-mono">0.0 kJ/mol (Strain-free)</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[11px] text-slate-400 block font-semibold">Boat Strain</span>
              <span className="text-sm font-bold text-rose-400 font-mono">+29.0 kJ/mol (Steric + Eclipsing)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
