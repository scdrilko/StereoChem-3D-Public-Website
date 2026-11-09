import React, { useState } from 'react';
import { Activity, Sparkles, RotateCw, RotateCcw, Info, CheckCircle2 } from 'lucide-react';

export const OpticalActivitySection: React.FC = () => {
  // Polarimeter parameters
  const [specificRotation, setSpecificRotation] = useState<number>(12.4); // e.g. (+)-(2R,3R)-tartaric acid (+12.4°)
  const [concentration, setConcentration] = useState<number>(0.15); // g/mL (e.g. 15 g/100 mL)
  const [pathLength, setPathLength] = useState<number>(1.0); // dm (10 cm = 1.0 dm)
  const [analyzerAngle, setAnalyzerAngle] = useState<number>(0); // User rotated analyzer angle

  // Biot's Law: α_observed = [α] * l * c
  const trueObservedAngle = Number((specificRotation * pathLength * concentration).toFixed(2));

  // Intensity formula: Malus' Law: I = I_0 * cos^2(analyzerAngle - trueObservedAngle)
  const angleDiffRad = ((analyzerAngle - trueObservedAngle) * Math.PI) / 180;
  const transmittedIntensity = Math.pow(Math.cos(angleDiffRad), 2);

  // Optical Activity presets
  const samplePresets = [
    { name: '(+)-(2R,3R)-Tartaric Acid', specificRot: 12.4, desc: 'Dextrorotatory (+)' },
    { name: '(-)-(2S,3S)-Tartaric Acid', specificRot: -12.4, desc: 'Levorotatory (-)' },
    { name: 'Meso-Tartaric Acid', specificRot: 0.0, desc: 'Optically Inactive (Internal Compensation)' },
    { name: '(S)-Lactic Acid', specificRot: 3.82, desc: 'Natural Muscle Lactic Acid' },
    { name: 'Racemic (±)-Alanine (50:50)', specificRot: 0.0, desc: 'Optically Inactive (External Compensation)' },
    { name: '(+)-(R)-Limonene', specificRot: 125.6, desc: 'High Optical Rotation (Orange oil)' },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold w-fit">
          <Activity className="w-3.5 h-3.5" />
          <span>Polarimetry & Biot's Law</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Optical Activity & Polarimeter Simulator
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
          Discovered by Jean-Baptiste Biot in 1815. When plane-polarized light passes through an enantiopure chiral sample, its plane of polarization is rotated by an angle $\alpha$. <strong>Dextrorotatory (+)</strong> compounds rotate the plane clockwise; <strong>Levorotatory (-)</strong> compounds rotate it counter-clockwise.
        </p>
      </div>

      {/* Preset Samples */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
        <span className="text-xs text-slate-400 font-semibold mr-1">Load Sample:</span>
        {samplePresets.map((s, idx) => (
          <button
            key={idx}
            onClick={() => {
              setSpecificRotation(s.specificRot);
              setAnalyzerAngle(0);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              specificRotation === s.specificRot
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* Virtual Polarimeter Diagram */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Optical Bench Simulator View */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Virtual Sodium D-Line (589 nm) Polarimeter</span>
            </h3>
            <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950/80 px-2.5 py-1 rounded-lg border border-cyan-800/60">
              [α]D = {specificRotation > 0 ? `+${specificRotation}` : specificRotation}°
            </span>
          </div>

          {/* Graphical Polarimeter Optical Train */}
          <div className="relative p-6 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center gap-6 overflow-hidden min-h-[220px]">
            {/* Light Beam Running Across */}
            <div
              className="absolute left-8 right-8 h-2 rounded-full transition-all duration-300"
              style={{
                background: `linear-gradient(to right, #facc15 0%, #38bdf8 50%, rgba(56, 189, 248, ${transmittedIntensity}) 100%)`,
                boxShadow: `0 0 ${16 * transmittedIntensity}px rgba(56, 189, 248, ${transmittedIntensity})`,
              }}
            />

            <div className="relative z-10 w-full flex items-center justify-between px-2 text-center text-xs">
              {/* 1. Light Source */}
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-10 h-10 rounded-full bg-yellow-400/20 border-2 border-yellow-400 flex items-center justify-center text-yellow-300 font-bold shadow-[0_0_15px_rgba(250,204,21,0.5)]">
                  Na
                </div>
                <span className="text-[10px] text-slate-400 font-medium">Sodium D-line</span>
              </div>

              {/* 2. Fixed Polarizer */}
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-12 h-16 rounded-xl bg-slate-800 border-2 border-cyan-400/80 flex items-center justify-center">
                  <div className="w-0.5 h-10 bg-cyan-400"></div>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">Fixed Polarizer (0°)</span>
              </div>

              {/* 3. Sample Tube */}
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-24 h-12 rounded-xl bg-cyan-950/80 border-2 border-cyan-500/60 flex items-center justify-center shadow-inner">
                  <span className="text-[10px] font-mono text-cyan-300 font-bold">
                    {pathLength} dm • {concentration} g/mL
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">Sample Cell</span>
              </div>

              {/* 4. Rotatable Analyzer */}
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className="w-12 h-16 rounded-xl bg-slate-800 border-2 border-amber-400 flex items-center justify-center transition-transform"
                  style={{ transform: `rotate(${analyzerAngle}deg)` }}
                >
                  <div className="w-0.5 h-10 bg-amber-400"></div>
                </div>
                <span className="text-[10px] text-amber-300 font-medium">Analyzer ({analyzerAngle}°)</span>
              </div>

              {/* 5. Eyepiece Detector */}
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className="w-10 h-10 rounded-full border-2 border-slate-600 flex items-center justify-center transition-all duration-200"
                  style={{
                    backgroundColor: `rgba(250, 204, 21, ${transmittedIntensity})`,
                    boxShadow: `0 0 ${20 * transmittedIntensity}px rgba(250, 204, 21, ${transmittedIntensity})`,
                  }}
                >
                  <span className="text-[9px] font-bold text-slate-950">
                    {Math.round(transmittedIntensity * 100)}%
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">Detector Eyepiece</span>
              </div>
            </div>
          </div>

          {/* Interactive Analyzer Rotation Dial Slider */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
              <span>Rotate Analyzer Eyepiece Dial:</span>
              <span className="font-mono text-amber-300 text-sm font-bold">{analyzerAngle}°</span>
            </div>
            <input
              type="range"
              min="-180"
              max="180"
              step="0.5"
              value={analyzerAngle}
              onChange={(e) => setAnalyzerAngle(parseFloat(e.target.value))}
              className="w-full accent-amber-400 h-2 bg-slate-950 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>-180°</span>
              <span>-90°</span>
              <span>0°</span>
              <span>+90°</span>
              <span>+180°</span>
            </div>
          </div>

          {/* Match Indicator Button */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
            <span className="text-slate-300">
              Match light intensity to determine observed rotation:
            </span>
            <button
              onClick={() => setAnalyzerAngle(trueObservedAngle)}
              className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20"
            >
              Align to Max Transmission ({trueObservedAngle > 0 ? `+${trueObservedAngle}` : trueObservedAngle}°)
            </button>
          </div>
        </div>

        {/* Biot's Law Calculator & Theory on Right */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-col gap-5 text-xs text-slate-300">
          <div className="flex flex-col gap-1 border-b border-slate-800 pb-3">
            <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest font-mono">
              BIOT'S LAW EQUATION
            </span>
            <div className="text-xl font-bold text-white font-mono mt-1">
              [α]D^T = α / (l · c)
            </div>
            <span className="text-xs text-slate-400">
              Where α = observed rotation (°), l = path length (dm), c = concentration (g/mL).
            </span>
          </div>

          {/* Interactive Parameters Sliders */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-slate-400 font-semibold">
                <span>Concentration (c):</span>
                <span className="font-mono text-cyan-300 font-bold">{concentration} g/mL</span>
              </div>
              <input
                type="range"
                min="0.01"
                max="0.5"
                step="0.01"
                value={concentration}
                onChange={(e) => setConcentration(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 h-1.5 bg-slate-950 rounded cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-slate-400 font-semibold">
                <span>Path Length (l):</span>
                <span className="font-mono text-cyan-300 font-bold">{pathLength} dm ({pathLength * 10} cm)</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.1"
                value={pathLength}
                onChange={(e) => setPathLength(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 h-1.5 bg-slate-950 rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Computed Observed Rotation Card */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col gap-2">
            <span className="text-[11px] font-bold text-slate-400">True Observed Rotation (α_obs):</span>
            <span className="text-2xl font-bold text-cyan-400 font-mono">
              {trueObservedAngle > 0 ? `+${trueObservedAngle}` : trueObservedAngle}°
            </span>
            <span className="text-[11px] text-slate-400">
              Calculation: ({specificRotation}°) × ({pathLength} dm) × ({concentration} g/mL) = {trueObservedAngle}°
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
            <strong>Racemic Mixture vs Enantiomeric Excess (ee):</strong>
            <br />
            An equimolar (50:50) mixture of (+) and (-) enantiomers yields $\alpha = 0.0^\circ$ because the equal and opposite rotations cancel out externally. If a mixture contains 75% (R) and 25% (S), its enantiomeric excess is:
            <br />
            <code className="text-cyan-300 font-mono font-bold block mt-1">
              % ee = [(% Major) - (% Minor)] = 75% - 25% = 50% ee
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};
