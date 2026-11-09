import React, { useState } from 'react';
import { MolecularViewer3D } from '../laboratory/MolecularViewer3D';
import { getMoleculeById } from '../../data/molecules';
import { BookOpen, Sparkles, AlertTriangle, CheckCircle2, RotateCw, ArrowRight } from 'lucide-react';

export const FischerSection: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<'l-alanine' | 'd-glyceraldehyde' | 'meso-tartaric-acid'>('d-glyceraldehyde');
  const molecule = getMoleculeById(selectedExample)!;

  const [rotationAngle, setRotationAngle] = useState<0 | 90 | 180>(0);
  const [interchangeCount, setInterchangeCount] = useState<number>(0);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold w-fit">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Planar 2D Projection of 3D Chiral Centers</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Fischer Projection Conventions & Rules
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
          Devised by Nobel Laureate Hermann Emil Fischer in 1891, the <strong>Fischer Projection</strong> is a two-dimensional cross representation of three-dimensional tetrahedral stereocenters, widely used for carbohydrates, amino acids, and polyols.
        </p>
      </div>

      {/* Conventions Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-lg">
        <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/30 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span>Horizontal Bonds (Horizontal Arms)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Represent bonds that project <strong>FORWARD</strong> out of the page towards the observer (equivalent to solid <strong>WEDGES</strong> $\blacktriangleleft$).
          </p>
          <span className="text-[11px] text-cyan-300 font-mono bg-cyan-950/60 px-2 py-1 rounded w-fit border border-cyan-800/60">
            Horizontal = "Coming to Hug You" (Towards Viewer)
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/70 border border-indigo-500/30 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
            <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
            <span>Vertical Bonds (Vertical Backbone)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Represent bonds that recede <strong>BACKWARD</strong> into the plane away from the observer (equivalent to hatched <strong>DASHES</strong> $||||$).
          </p>
          <span className="text-[11px] text-indigo-300 font-mono bg-indigo-950/60 px-2 py-1 rounded w-fit border border-indigo-800/60">
            Vertical = Receding into the Blackboard
          </span>
        </div>
      </div>

      {/* Interactive 3D vs 2D Fischer Cross Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 3D Model */}
        <div className="lg:col-span-7 flex flex-col gap-2">
          <div className="flex items-center gap-2 mb-1">
            <button
              onClick={() => setSelectedExample('d-glyceraldehyde')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
                selectedExample === 'd-glyceraldehyde' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400'
              }`}
            >
              D-Glyceraldehyde
            </button>
            <button
              onClick={() => setSelectedExample('l-alanine')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
                selectedExample === 'l-alanine' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400'
              }`}
            >
              L-Alanine
            </button>
            <button
              onClick={() => setSelectedExample('meso-tartaric-acid')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
                selectedExample === 'meso-tartaric-acid' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400'
              }`}
            >
              Meso-Tartaric Acid
            </button>
          </div>

          <MolecularViewer3D
            molecule={molecule}
            height="460px"
            title={`${molecule.name} - 3D Eclipsed Orientation for Fischer`}
            showCIPPrio={true}
          />
        </div>

        {/* 2D Fischer Cross Diagram & Manipulation Rules */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col gap-5 text-xs text-slate-300">
          <h3 className="text-base font-bold text-white">2D Fischer Cross Formula</h3>

          {/* Interactive Fischer Cross Box */}
          <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center relative min-h-[220px]">
            {selectedExample === 'd-glyceraldehyde' ? (
              <div className="flex flex-col items-center gap-1 font-mono font-bold text-sm">
                <span className="text-amber-400 font-bold">CHO (Top)</span>
                <div className="w-1 h-8 bg-slate-700"></div>
                <div className="flex items-center gap-4">
                  <span className="text-cyan-400 font-bold">H (Left)</span>
                  <div className="w-8 h-1 bg-cyan-400"></div>
                  <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-cyan-400 flex items-center justify-center text-xs text-white">
                    C2
                  </div>
                  <div className="w-8 h-1 bg-cyan-400"></div>
                  <span className="text-rose-400 font-bold">OH (Right)</span>
                </div>
                <div className="w-1 h-8 bg-slate-700"></div>
                <span className="text-slate-300 font-bold">CH2OH (Bottom)</span>
              </div>
            ) : selectedExample === 'l-alanine' ? (
              <div className="flex flex-col items-center gap-1 font-mono font-bold text-sm">
                <span className="text-amber-400 font-bold">COOH (Top)</span>
                <div className="w-1 h-8 bg-slate-700"></div>
                <div className="flex items-center gap-4">
                  <span className="text-blue-400 font-bold">H2N (Left)</span>
                  <div className="w-8 h-1 bg-cyan-400"></div>
                  <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-cyan-400 flex items-center justify-center text-xs text-white">
                    C2
                  </div>
                  <div className="w-8 h-1 bg-cyan-400"></div>
                  <span className="text-slate-300 font-bold">H (Right)</span>
                </div>
                <div className="w-1 h-8 bg-slate-700"></div>
                <span className="text-slate-300 font-bold">CH3 (Bottom)</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-0.5 font-mono font-bold text-xs">
                <span className="text-amber-400 font-bold">COOH</span>
                <div className="w-1 h-4 bg-slate-700"></div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-300">H</span>
                  <div className="w-6 h-1 bg-cyan-400"></div>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800 text-white">C2(R)</span>
                  <div className="w-6 h-1 bg-cyan-400"></div>
                  <span className="text-rose-400">OH</span>
                </div>
                <div className="w-1 h-4 bg-slate-700"></div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-300">H</span>
                  <div className="w-6 h-1 bg-cyan-400"></div>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800 text-white">C3(S)</span>
                  <div className="w-6 h-1 bg-cyan-400"></div>
                  <span className="text-rose-400">OH</span>
                </div>
                <div className="w-1 h-4 bg-slate-700"></div>
                <span className="text-amber-400 font-bold">COOH</span>
              </div>
            )}
          </div>

          {/* Golden Manipulation Rules */}
          <div className="flex flex-col gap-2.5">
            <span className="font-bold text-amber-300 uppercase tracking-wider text-[11px]">
              Crucial Manipulation Rules in Fischer Projections:
            </span>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>180° In-Plane Rotation:</strong> Allowed! Leaves the configuration unchanged (preserves R/S).
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>
                <strong>90° In-Plane Rotation:</strong> Strictly FORBIDDEN! Inverts horizontal wedges and vertical dashes, converting the molecule into its enantiomer.
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                <strong>Interchanges Rule:</strong> An <em>odd number</em> of group swaps (e.g. 1 interchange) inverts the configuration ($R \to S$). An <em>even number</em> of group swaps (e.g. 2 interchanges) preserves the original configuration!
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
