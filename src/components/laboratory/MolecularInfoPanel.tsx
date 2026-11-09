import React, { useState, useEffect } from 'react';
import { Molecule, StereocenterInfo } from '../../types/chemistry';
import {
  RotateCcw,
  Sparkles,
  Info,
  Layers,
  ArrowRightLeft,
  Search,
  CheckCircle,
  AlertCircle,
  Atom as AtomIcon,
  BookOpen,
  Compass,
  CheckCircle2,
} from 'lucide-react';
import { getMoleculeById } from '../../data/molecules';
import { analyzeSmilesWithRDKit, isRDKitAvailable, RDKitValidationResult } from '../../utils/rdkit';

interface Props {
  molecule: Molecule;
  onSelectMolecule: (molecule: Molecule) => void;
  onSelectStereocenter?: (index: number) => void;
  selectedStereocenterIndex?: number;
}

export const MolecularInfoPanel: React.FC<Props> = ({
  molecule,
  onSelectMolecule,
  onSelectStereocenter,
  selectedStereocenterIndex = 0,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'stereocenters' | 'symmetry'>('overview');
  const [rdkitResult, setRdkitResult] = useState<RDKitValidationResult | null>(null);

  useEffect(() => {
    let isMounted = true;
    if (molecule?.smiles) {
      analyzeSmilesWithRDKit(molecule.smiles).then((res) => {
        if (isMounted) setRdkitResult(res);
      });
    }
    return () => {
      isMounted = false;
    };
  }, [molecule?.smiles]);

  const enantiomerMolecule = molecule.enantiomerId ? getMoleculeById(molecule.enantiomerId) : undefined;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl backdrop-blur-xl flex flex-col gap-4 text-slate-200">
      {/* Top Header & Enantiomer Quick Switch */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white tracking-tight">{molecule.name}</h2>
            {molecule.isMeso ? (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-700/60">
                MESO COMPOUND
              </span>
            ) : molecule.isChiral ? (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700/60 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                CHIRAL
              </span>
            ) : (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                ACHIRAL
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">{molecule.iupacName}</p>
        </div>

        {/* Enantiomer Swap Button */}
        {enantiomerMolecule && (
          <button
            onClick={() => onSelectMolecule(enantiomerMolecule)}
            className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-all flex items-center gap-1.5 shadow-sm hover:shadow-cyan-500/10"
            title={`Switch directly to its enantiomer: ${enantiomerMolecule.name}`}
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Switch to {enantiomerMolecule.name}</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-800/60 pb-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
            activeTab === 'overview'
              ? 'bg-slate-800 text-cyan-400 font-bold border border-slate-700'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Properties & Formula
        </button>
        <button
          onClick={() => setActiveTab('stereocenters')}
          className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
            activeTab === 'stereocenters'
              ? 'bg-slate-800 text-cyan-400 font-bold border border-slate-700'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Stereocenters & CIP ({molecule.stereocentersCount})
        </button>
        {molecule.symmetryElements && molecule.symmetryElements.length > 0 && (
          <button
            onClick={() => setActiveTab('symmetry')}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'symmetry'
                ? 'bg-slate-800 text-cyan-400 font-bold border border-slate-700'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Symmetry & Optical
          </button>
        )}
      </div>

      {/* Tab 1: Overview & Chemical Properties */}
      {activeTab === 'overview' && (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
              <span className="text-[11px] text-slate-400 block font-medium">Formula</span>
              <span className="font-mono text-sm font-bold text-white">{molecule.formula}</span>
            </div>

            <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
              <span className="text-[11px] text-slate-400 block font-medium">Molecular Weight</span>
              <span className="font-mono text-sm font-bold text-cyan-300">{molecule.molecularWeight} g/mol</span>
            </div>

            <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
              <span className="text-[11px] text-slate-400 block font-medium">Total Atoms</span>
              <span className="font-mono text-sm font-bold text-slate-200">{molecule.atoms.length} atoms</span>
            </div>

            <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
              <span className="text-[11px] text-slate-400 block font-medium">Stereocenters</span>
              <span className="font-mono text-sm font-bold text-amber-400">{molecule.stereocentersCount}</span>
            </div>
          </div>

          {/* Description */}
          <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/60 text-xs leading-relaxed text-slate-300">
            {molecule.description}
          </div>

          {/* Biological / Pharmacological relevance */}
          {molecule.biologicalRelevance && (
            <div className="bg-cyan-950/30 border border-cyan-800/40 p-3 rounded-xl text-xs text-cyan-200/90 flex gap-2.5 items-start">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-cyan-300 block mb-0.5">Biological Importance:</span>
                {molecule.biologicalRelevance}
              </div>
            </div>
          )}

          {/* SMILES Representation */}
          <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400 font-mono text-[11px]">SMILES:</span>
            <code className="text-cyan-300 font-mono font-semibold truncate max-w-[280px]">{molecule.smiles}</code>
          </div>

          {/* RDKit.js Chemical Engine Status & 2D Projection */}
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
                <AtomIcon className="w-3.5 h-3.5 text-cyan-400" />
                <span>RDKit.js Chemical Engine</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-950 text-emerald-400 border border-emerald-700/60 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                WASM Active
              </span>
            </div>

            {rdkitResult?.svg && (
              <div
                className="bg-white rounded-lg p-2 flex justify-center items-center overflow-hidden max-h-36"
                dangerouslySetInnerHTML={{ __html: rdkitResult.svg }}
              />
            )}
            <p className="text-[10px] text-slate-400 font-mono">
              Structure & stereocenters verified via RDKit WebAssembly C++ cheminformatics kernel.
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: Stereocenters & CIP Breakdown */}
      {activeTab === 'stereocenters' && (
        <div className="flex flex-col gap-3">
          {molecule.stereocenters.length === 0 ? (
            <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 text-center text-xs text-slate-400">
              No stereogenic (chiral) centers in this molecule. It is achiral or planar.
            </div>
          ) : (
            molecule.stereocenters.map((sc, scIdx) => (
              <div
                key={scIdx}
                className={`p-3 rounded-xl border transition-all ${
                  selectedStereocenterIndex === scIdx
                    ? 'bg-slate-950/80 border-cyan-500/50 ring-1 ring-cyan-500/20'
                    : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                }`}
                onClick={() => onSelectStereocenter?.(scIdx)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">Chiral Center: {sc.label}</span>
                    <span className="text-xs px-2 py-0.5 rounded font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      Configuration: ({sc.configuration})
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">CIP Rules 1-4</span>
                </div>

                {/* Substituent Ranking Table */}
                <div className="flex flex-col gap-1.5 mt-2">
                  {sc.substituents.map((sub) => (
                    <div
                      key={sub.priority}
                      className="flex items-center justify-between text-xs py-1 px-2 rounded-lg bg-slate-900/80 border border-slate-800"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[11px] ${
                            sub.priority === 1
                              ? 'bg-amber-500 text-slate-950'
                              : sub.priority === 2
                              ? 'bg-sky-400 text-slate-950'
                              : sub.priority === 3
                              ? 'bg-purple-400 text-slate-950'
                              : 'bg-slate-600 text-white'
                          }`}
                        >
                          {sub.priority}
                        </span>
                        <span className="font-semibold text-slate-200">{sub.groupName}</span>
                      </div>
                      <span className="text-[11px] text-slate-400 italic">{sub.reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 3: Symmetry & Optical Properties */}
      {activeTab === 'symmetry' && (
        <div className="flex flex-col gap-3 text-xs">
          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[11px] font-semibold mb-1">Optical Activity [α]D:</span>
            <span className="text-sm font-bold text-cyan-300 font-mono">{molecule.opticalRotation || 'N/A'}</span>
          </div>

          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[11px] font-semibold mb-1">Symmetry Elements:</span>
            <ul className="list-disc list-inside text-slate-300 space-y-1">
              {molecule.symmetryElements?.map((el, i) => (
                <li key={i}>{el}</li>
              ))}
            </ul>
          </div>

          {molecule.isMeso && (
            <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-emerald-200/90 leading-relaxed">
              <strong className="text-emerald-300 block mb-1">Internal Compensation Mechanism:</strong>
              This molecule has stereocenters, but possesses a plane of symmetry ($\sigma$) or inversion center ($i$). The clockwise rotation of plane-polarized light caused by one stereocenter is exactly canceled by the equal and opposite counter-clockwise rotation of the other, resulting in an observed rotation of $0.0^\circ$.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
