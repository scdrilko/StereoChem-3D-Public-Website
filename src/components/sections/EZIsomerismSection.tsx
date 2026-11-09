import React, { useState } from 'react';
import { MolecularViewer3D } from '../laboratory/MolecularViewer3D';
import { getMoleculeById } from '../../data/molecules';
import { Compass, Sparkles, CheckCircle2, ArrowRightLeft } from 'lucide-react';

export const EZIsomerismSection: React.FC = () => {
  const [selectedIsomer, setSelectedIsomer] = useState<'z-2-butene' | 'e-2-butene'>('z-2-butene');
  const molecule = getMoleculeById(selectedIsomer)!;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold w-fit">
          <Compass className="w-3.5 h-3.5" />
          <span>Geometrical Isomerism in Alkenes</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          (E)/(Z) Alkene Stereochemistry
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
          Because rotation around a carbon-carbon double bond (C=C) is restricted by the pi-bond (requiring ~260 kJ/mol to break), substituents on either carbon are held in fixed spatial orientations. The (E)/(Z) system replaces ambiguous <em>cis/trans</em> labels using Cahn-Ingold-Prelog (CIP) priority rules.
        </p>
      </div>

      {/* Isomer Switcher Bar */}
      <div className="flex items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedIsomer('z-2-butene')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedIsomer === 'z-2-butene'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            (Z)-2-Butene (cis)
          </button>
          <button
            onClick={() => setSelectedIsomer('e-2-butene')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedIsomer === 'e-2-butene'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            (E)-2-Butene (trans)
          </button>
        </div>

        <button
          onClick={() => setSelectedIsomer(selectedIsomer === 'z-2-butene' ? 'e-2-butene' : 'z-2-butene')}
          className="text-xs px-3 py-1.5 rounded-xl bg-slate-800 text-cyan-400 hover:bg-slate-700 transition-all flex items-center gap-1.5 font-semibold"
        >
          <ArrowRightLeft className="w-3.5 h-3.5" />
          <span>Toggle E ↔ Z</span>
        </button>
      </div>

      {/* 3D Visualizer and Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 flex flex-col gap-2">
          <MolecularViewer3D
            molecule={molecule}
            height="460px"
            title={`${molecule.name} - Planar sp2 Double Bond 3D Model`}
            showCIPPrio={true}
          />
        </div>

        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-col gap-5 text-xs text-slate-300">
          <div className="flex flex-col gap-1 border-b border-slate-800 pb-3">
            <span className="text-[11px] font-bold text-cyan-400 font-mono">IUPAC CONFIGURATION</span>
            <h3 className="text-xl font-bold text-white">{molecule.name}</h3>
            <p className="text-slate-400 mt-1">{molecule.description}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col gap-3">
            <span className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
              E/Z Decision Algorithm:
            </span>

            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold shrink-0">1</span>
              <span>Look at C2: Priority 1 is -CH3 (Z=6), Priority 2 is -H (Z=1).</span>
            </div>

            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold shrink-0">2</span>
              <span>Look at C3: Priority 1 is -CH3 (Z=6), Priority 2 is -H (Z=1).</span>
            </div>

            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold shrink-0">3</span>
              {selectedIsomer === 'z-2-butene' ? (
                <span>
                  Both high-priority groups (-CH3) are on the <strong>SAME SIDE</strong> of the double bond: <strong>(Z)</strong> from German <em>Zusammen</em> ("together").
                </span>
              ) : (
                <span>
                  The two high-priority groups (-CH3) are on <strong>OPPOSITE SIDES</strong> of the double bond: <strong>(E)</strong> from German <em>Entgegen</em> ("opposite").
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[11px] text-slate-400 block font-semibold">Dipole Moment (μ)</span>
              <span className="text-sm font-bold text-cyan-300 font-mono">
                {selectedIsomer === 'z-2-butene' ? '0.25 Debye (Polar)' : '0.00 Debye (Non-polar)'}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[11px] text-slate-400 block font-semibold">Boiling Point</span>
              <span className="text-sm font-bold text-amber-300 font-mono">
                {selectedIsomer === 'z-2-butene' ? '+3.7 °C' : '+0.9 °C'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
