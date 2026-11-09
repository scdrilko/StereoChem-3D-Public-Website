import React, { useState } from 'react';
import { Activity, RotateCw, Sparkles, Compass, Info, CheckCircle2 } from 'lucide-react';

export const NewmanSection: React.FC = () => {
  const [dihedralAngle, setDihedralAngle] = useState<number>(180); // Default to Anti (180°)

  // Determine conformation name & relative potential energy (for butane down C2-C3)
  const getConformationInfo = (deg: number) => {
    const normalized = Math.round(deg) % 360;

    if (normalized === 0 || normalized === 360) {
      return {
        name: 'Fully Eclipsed (Syn-periplanar)',
        energy: '19.0 kJ/mol',
        desc: 'Sterically most hindered conformation; methyl groups directly eclipse each other with maximum torsional and van der Waals strain.',
        status: 'Global Energy Maximum',
        color: 'text-rose-400 bg-rose-950/40 border-rose-800/60',
      };
    } else if (normalized === 60 || normalized === 300) {
      return {
        name: 'Gauche (Synclinal)',
        energy: '3.8 kJ/mol',
        desc: 'Staggered conformation where the two bulky methyl groups have a 60° dihedral angle. Staggered bonds relieve torsional strain, but mild steric clash persists.',
        status: 'Local Energy Minimum',
        color: 'text-amber-400 bg-amber-950/40 border-amber-800/60',
      };
    } else if (normalized === 120 || normalized === 240) {
      return {
        name: 'Eclipsed (Anticlinal)',
        energy: '16.0 kJ/mol',
        desc: 'Eclipsed conformation where methyl groups overlap with hydrogen atoms (CH3 // H eclipsing strain).',
        status: 'Local Energy Maximum',
        color: 'text-orange-400 bg-orange-950/40 border-orange-800/60',
      };
    } else if (normalized === 180) {
      return {
        name: 'Anti (Anti-periplanar)',
        energy: '0.0 kJ/mol',
        desc: 'The most stable, lowest energy conformation. Methyl groups are 180° apart, minimizing all steric repulsion and maximizing hyperconjugative stabilization.',
        status: 'Global Energy Minimum (Most Stable)',
        color: 'text-emerald-400 bg-emerald-950/40 border-emerald-800/60',
      };
    } else {
      // Intermediate / Skew
      const rad = (normalized * Math.PI) / 180;
      // Approximate Fourier series for n-butane potential energy
      const e = (19.0 * (1 - Math.cos(rad)) / 2) - 5.7 * Math.sin(rad) * Math.sin(rad);
      return {
        name: `Skew (${normalized}°)`,
        energy: `${Math.max(0, e).toFixed(1)} kJ/mol`,
        desc: 'Intermediate rotating conformation.',
        status: 'Intermediate Transition',
        color: 'text-cyan-400 bg-cyan-950/40 border-cyan-800/60',
      };
    }
  };

  const currentConf = getConformationInfo(dihedralAngle);

  // Quick preset angles
  const presets = [
    { label: 'Anti (180°)', angle: 180 },
    { label: 'Gauche (60°)', angle: 60 },
    { label: 'Eclipsed (120°)', angle: 120 },
    { label: 'Fully Eclipsed (0°)', angle: 0 },
    { label: 'Gauche (300°)', angle: 300 },
  ];

  // Coordinates for 2D Newman diagram
  // Front carbon: center dot, 3 radiating lines (fixed at 90°, 210°, 330°)
  // Back carbon: circle, 3 radiating lines rotated by dihedralAngle
  const frontAngle1 = -90; // Top (CH3)
  const frontAngle2 = 30;  // Bottom right (H)
  const frontAngle3 = 150; // Bottom left (H)

  // Back groups are rotated by dihedralAngle relative to front CH3
  const backAngle1 = frontAngle1 + dihedralAngle; // Back CH3
  const backAngle2 = frontAngle2 + dihedralAngle; // Back H
  const backAngle3 = frontAngle3 + dihedralAngle; // Back H

  const toCartesian = (deg: number, radius: number, cx = 150, cy = 150) => {
    const rad = (deg * Math.PI) / 180;
    return {
      x: cx + radius * Math.cos(rad),
      y: cy + radius * Math.sin(rad),
    };
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-semibold w-fit">
          <Activity className="w-3.5 h-3.5" />
          <span>Conformational Analysis</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Newman Projections & Rotational Isomers
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
          Devised by Melvin Spencer Newman in 1952. The molecule is viewed straight down a carbon-carbon bond axis (e.g. C2-C3 of butane). The <strong>front carbon</strong> is represented by a central vertex with three radiating bonds, while the <strong>back carbon</strong> is represented by a large circle with bonds extending from its perimeter.
        </p>
      </div>

      {/* Preset Conformations Buttons */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
        <span className="text-xs text-slate-400 font-semibold mr-1">Conformation Presets:</span>
        {presets.map((p) => (
          <button
            key={p.angle}
            onClick={() => setDihedralAngle(p.angle)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              dihedralAngle === p.angle
                ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Interactive Simulator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Dynamic 2D Newman Circle Diagram */}
        <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-col items-center gap-6">
          <div className="w-full flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-400" />
              <span>Interactive Newman Circle (n-Butane C2-C3)</span>
            </h3>
            <span className="text-xs font-mono font-bold text-sky-300 bg-sky-950/80 px-2.5 py-1 rounded-lg border border-sky-800/60">
              θ = {dihedralAngle}°
            </span>
          </div>

          {/* SVG Newman Projection Diagram */}
          <div className="relative w-[300px] h-[300px] bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center p-2 shadow-inner">
            <svg width="300" height="300" viewBox="0 0 300 300" className="overflow-visible">
              {/* Back Carbon Large Circle (Radius 65) */}
              <circle
                cx="150"
                cy="150"
                r="65"
                fill="#0f172a"
                stroke="#38bdf8"
                strokeWidth="4"
                className="transition-colors"
              />

              {/* Back Carbon Bonds (Starting from circle perimeter r=65 to r=115) */}
              {(() => {
                const b1_start = toCartesian(backAngle1, 65);
                const b1_end = toCartesian(backAngle1, 115);
                const b2_start = toCartesian(backAngle2, 65);
                const b2_end = toCartesian(backAngle2, 115);
                const b3_start = toCartesian(backAngle3, 65);
                const b3_end = toCartesian(backAngle3, 115);

                const b1_text = toCartesian(backAngle1, 130);
                const b2_text = toCartesian(backAngle2, 128);
                const b3_text = toCartesian(backAngle3, 128);

                return (
                  <g stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round">
                    <line x1={b1_start.x} y1={b1_start.y} x2={b1_end.x} y2={b1_end.y} />
                    <line x1={b2_start.x} y1={b2_start.y} x2={b2_end.x} y2={b2_end.y} />
                    <line x1={b3_start.x} y1={b3_start.y} x2={b3_end.x} y2={b3_end.y} />

                    {/* Back Carbon Group Labels */}
                    <text
                      x={b1_text.x}
                      y={b1_text.y + 4}
                      fill="#38bdf8"
                      fontSize="13"
                      fontWeight="bold"
                      textAnchor="middle"
                      stroke="none"
                    >
                      CH3(back)
                    </text>
                    <text
                      x={b2_text.x}
                      y={b2_text.y + 4}
                      fill="#94a3b8"
                      fontSize="12"
                      fontWeight="bold"
                      textAnchor="middle"
                      stroke="none"
                    >
                      H
                    </text>
                    <text
                      x={b3_text.x}
                      y={b3_text.y + 4}
                      fill="#94a3b8"
                      fontSize="12"
                      fontWeight="bold"
                      textAnchor="middle"
                      stroke="none"
                    >
                      H
                    </text>
                  </g>
                );
              })()}

              {/* Front Carbon Center Point (Radius 6) & Front 3 Bonds (From 150,150 to r=90) */}
              {(() => {
                const f1 = toCartesian(frontAngle1, 90);
                const f2 = toCartesian(frontAngle2, 90);
                const f3 = toCartesian(frontAngle3, 90);

                const f1_text = toCartesian(frontAngle1, 110);
                const f2_text = toCartesian(frontAngle2, 108);
                const f3_text = toCartesian(frontAngle3, 108);

                return (
                  <g stroke="#f59e0b" strokeWidth="4" strokeLinecap="round">
                    <line x1="150" y1="150" x2={f1.x} y2={f1.y} />
                    <line x1="150" y1="150" x2={f2.x} y2={f2.y} />
                    <line x1="150" y1="150" x2={f3.x} y2={f3.y} />

                    {/* Front Center Dot */}
                    <circle cx="150" cy="150" r="7" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />

                    {/* Front Carbon Group Labels */}
                    <text
                      x={f1_text.x}
                      y={f1_text.y + 4}
                      fill="#f59e0b"
                      fontSize="13"
                      fontWeight="bold"
                      textAnchor="middle"
                      stroke="none"
                    >
                      CH3(front)
                    </text>
                    <text
                      x={f2_text.x}
                      y={f2_text.y + 4}
                      fill="#ffffff"
                      fontSize="12"
                      fontWeight="bold"
                      textAnchor="middle"
                      stroke="none"
                    >
                      H
                    </text>
                    <text
                      x={f3_text.x}
                      y={f3_text.y + 4}
                      fill="#ffffff"
                      fontSize="12"
                      fontWeight="bold"
                      textAnchor="middle"
                      stroke="none"
                    >
                      H
                    </text>
                  </g>
                );
              })()}
            </svg>
          </div>

          {/* Interactive Dihedral Angle Slider */}
          <div className="w-full flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
              <span>Rotate Dihedral Angle (θ):</span>
              <span className="font-mono text-white text-sm">{dihedralAngle}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="360"
              step="5"
              value={dihedralAngle}
              onChange={(e) => setDihedralAngle(parseInt(e.target.value, 10))}
              className="w-full accent-sky-400 h-2 bg-slate-950 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0° (Eclipsed)</span>
              <span>60° (Gauche)</span>
              <span>180° (Anti)</span>
              <span>300° (Gauche)</span>
              <span>360°</span>
            </div>
          </div>
        </div>

        {/* Energy & Conformation Analysis on Right */}
        <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-col gap-5 text-xs text-slate-300">
          <div className="flex flex-col gap-1 border-b border-slate-800 pb-3">
            <span className="text-[11px] font-bold text-sky-400 uppercase tracking-widest">
              CURRENT CONFORMATION
            </span>
            <h3 className="text-xl font-bold text-white">{currentConf.name}</h3>
            <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-bold border mt-1 w-fit ${currentConf.color}`}>
              {currentConf.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col gap-1">
              <span className="text-[11px] text-slate-400 font-semibold">Torsional & Steric Energy:</span>
              <span className="text-base font-bold text-sky-300 font-mono">{currentConf.energy}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col gap-1">
              <span className="text-[11px] text-slate-400 font-semibold">Dihedral Angle:</span>
              <span className="text-base font-bold text-amber-300 font-mono">{dihedralAngle}°</span>
            </div>
          </div>

          <p className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-300 leading-relaxed">
            {currentConf.desc}
          </p>

          {/* Potential Energy Curve Legend Table */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
              Butane Conformation Energy Hierarchy:
            </span>

            <div className="divide-y divide-slate-800 rounded-xl border border-slate-800 overflow-hidden bg-slate-950/60">
              <div className="p-2.5 flex items-center justify-between">
                <span className="font-semibold text-emerald-400">Anti (180°)</span>
                <span className="font-mono text-slate-400">0.0 kJ/mol (Most Stable)</span>
              </div>
              <div className="p-2.5 flex items-center justify-between">
                <span className="font-semibold text-amber-400">Gauche (60° / 300°)</span>
                <span className="font-mono text-slate-400">+3.8 kJ/mol (Steric strain)</span>
              </div>
              <div className="p-2.5 flex items-center justify-between">
                <span className="font-semibold text-orange-400">Eclipsed (120° / 240°)</span>
                <span className="font-mono text-slate-400">+16.0 kJ/mol (Torsional strain)</span>
              </div>
              <div className="p-2.5 flex items-center justify-between">
                <span className="font-semibold text-rose-400">Fully Eclipsed (0° / 360°)</span>
                <span className="font-mono text-slate-400">+19.0 kJ/mol (Maximum strain)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
