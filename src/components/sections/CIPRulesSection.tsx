import React, { useState } from 'react';
import { Compass, BookOpen, Layers, CheckCircle2, ChevronRight, Atom, Sparkles } from 'lucide-react';

export const CIPRulesSection: React.FC = () => {
  const [activeRule, setActiveRule] = useState<number>(1);

  const rules = [
    {
      num: 1,
      title: 'Rule 1: Sequence by Atomic Number (Z)',
      summary: 'Atoms directly attached to the stereocenter are ranked strictly by atomic number. Higher Z = Higher Priority.',
      details: [
        'Compare the 4 atoms directly bonded to the stereogenic carbon.',
        'Atoms with higher atomic numbers take precedence.',
        'Sequence: I (53) > Br (35) > Cl (17) > S (16) > F (9) > O (8) > N (7) > C (6) > H (1) > Lone pair (0).',
        'Isotopes rule: When isotopes of the same element are present, higher atomic mass takes precedence. For example: Tritium (3H) > Deuterium (2H) > Protium (1H); Carbon-13 (13C) > Carbon-12 (12C).',
      ],
      example: 'In Bromochlorofluoromethane (CHBrClF): Priority 1 = -Br (Z=35), Priority 2 = -Cl (Z=17), Priority 3 = -F (Z=9), Priority 4 = -H (Z=1).',
    },
    {
      num: 2,
      title: 'Rule 2: Tie-Breaking Along the Substituent Chain',
      summary: 'When two or more directly attached atoms are identical, proceed atom-by-atom along the chains until the first point of difference.',
      details: [
        'Explore the atoms bonded to the first tied atom.',
        'List these attached atoms in order of decreasing atomic number.',
        'Compare the lists element-by-element at the very first point of difference.',
        'Do NOT sum atomic numbers! A single higher atomic number atom trumps multiple lower atomic number atoms.',
      ],
      example: '-CH2-OH vs -CH2-CH3: Both have C attached to stereocenter. For -CH2OH, the C is bonded to (O, H, H). For -CH2CH3, the C is bonded to (C, H, H). Comparing the highest atoms: Oxygen (Z=8) > Carbon (Z=6), so -CH2OH has higher priority.',
    },
    {
      num: 3,
      title: 'Rule 3: Multiple Bonds (Phantom Duplicate Atoms)',
      summary: 'Double and triple bonds are split into equivalent multiple single bonds to duplicated "phantom" atoms.',
      details: [
        'A double bond between X and Y is considered as X bonded to two separate Y atoms, and Y bonded to two separate X atoms.',
        'A triple bond is considered as bonded to three separate atoms.',
        'Aldehyde -CH=O is treated as Carbon bonded to (O, O, H).',
        'Carboxylic acid -COOH is treated as Carbon bonded to (O, O, O).',
        'Nitrile -C≡N is treated as Carbon bonded to (N, N, N).',
      ],
      example: 'Comparing -CH=O (Aldehyde) vs -CH2OH (Primary alcohol): Aldehyde carbon is bonded to (O, O, H). Alcohol carbon is bonded to (O, H, H). At the second atom, (O, O) beats (O, H). Therefore: -COOH > -CHO > -CH2OH.',
    },
    {
      num: 4,
      title: 'Rule 4: Spatial Orientation & Configuration Assignment',
      summary: 'Orient the molecule so priority 4 points directly away from the viewer. Trace the path from 1 -> 2 -> 3.',
      details: [
        'View the stereocenter down the C - Priority 4 bond (with #4 in the background).',
        'Trace the circular arc from Priority 1 to Priority 2 to Priority 3.',
        'Clockwise curve = (R) configuration (from Latin "Rectus" = Right/Straight).',
        'Counter-clockwise curve = (S) configuration (from Latin "Sinister" = Left).',
        'Shortcut when #4 is on a wedge (pointing towards you): Determine the apparent direction of 1 -> 2 -> 3 and reverse it! (Clockwise becomes S, Counter-clockwise becomes R).',
      ],
      example: 'If priority 4 (H) is on a dashed bond (away): 1 -> 2 -> 3 clockwise yields (R). If #4 is on a wedge (forward): clockwise yields (S).',
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold w-fit">
          <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
          <span>IUPAC Stereochemical Standards</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Cahn-Ingold-Prelog (CIP) Priority Rules
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
          Formulated by Nobel Laureate Vladimir Prelog, Robert Sidney Cahn, and Sir Christopher Ingold in 1956, the CIP rules form the cornerstone of modern stereochemical notation for R/S, E/Z, and prochirality.
        </p>
      </div>

      {/* Rules Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {rules.map((r) => (
          <button
            key={r.num}
            onClick={() => setActiveRule(r.num)}
            className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between ${
              activeRule === r.num
                ? 'bg-cyan-950/40 border-cyan-500 ring-1 ring-cyan-500/30 shadow-lg shadow-cyan-500/10'
                : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div>
              <span className="text-xs font-bold text-cyan-400 font-mono">RULE {r.num}</span>
              <h3 className="text-sm font-bold text-white mt-1">{r.title.split(':')[1]}</h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">{r.summary}</p>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs text-cyan-400 font-semibold">
              <span>View Rule Details</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </button>
        ))}
      </div>

      {/* Active Rule Deep-Dive Card */}
      {(() => {
        const rule = rules.find((r) => r.num === activeRule)!;
        return (
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col gap-6">
            <div className="flex flex-col gap-2 border-b border-slate-800 pb-4">
              <span className="text-xs font-bold text-cyan-400 font-mono tracking-widest uppercase">
                RULE {rule.num} DEEP-DIVE
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-white">{rule.title}</h2>
              <p className="text-xs md:text-sm text-cyan-200/90 font-medium">{rule.summary}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Detailed Points */}
              <div className="flex flex-col gap-3">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Core Criteria & Methodology:
                </span>
                <ul className="space-y-2.5">
                  {rule.details.map((d, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Verified Textbook Example */}
              <div className="flex flex-col gap-3">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Textbook Chemical Example:
                </span>
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 font-mono leading-relaxed">
                  <div className="flex items-center gap-2 mb-2 text-cyan-300 font-bold font-sans">
                    <Sparkles className="w-4 h-4" />
                    <span>Application:</span>
                  </div>
                  {rule.example}
                </div>

                {/* Common Group Priority Ranking Table */}
                {rule.num === 2 && (
                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                    <span className="font-bold text-amber-300 block mb-1">Standard Priority Hierarchy:</span>
                    <span className="text-slate-300 font-mono text-[11px] leading-relaxed block">
                      -I &gt; -Br &gt; -Cl &gt; -SO3H &gt; -F &gt; -O-COR &gt; -OR &gt; -OH &gt; -NO2 &gt; -NH2 &gt; -COOH &gt; -COOR &gt; -CONH2 &gt; -CHO &gt; -CH2OH &gt; -CN &gt; -C6H5 (phenyl) &gt; -C≡CH &gt; -C(CH3)3 &gt; -CH=CH2 &gt; -CH(CH3)2 &gt; -CH2CH2CH3 &gt; -CH2CH3 &gt; -CH3 &gt; -H
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
