import React, { useState } from 'react';
import { Molecule } from '../../types/chemistry';
import { MolecularViewer3D } from '../laboratory/MolecularViewer3D';
import { MOLECULES_DATABASE, getMoleculeById } from '../../data/molecules';
import {
  Compass,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  HelpCircle,
  RotateCw,
  RotateCcw,
  RefreshCw,
  Eye,
  Award,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  onSelectMolecule: (molecule: Molecule) => void;
}

export const RSConfigurationSection: React.FC<Props> = ({ onSelectMolecule }) => {
  // Practice Exercises Set
  const exercises = [
    {
      moleculeId: 'r-bromochlorofluoromethane',
      title: 'Practice 1: Bromochlorofluoromethane',
      stereocenterIndex: 0,
      hint: 'Compare the atomic numbers (Z) of the 4 directly attached atoms: Br (35), Cl (17), F (9), H (1).',
    },
    {
      moleculeId: 'l-alanine',
      title: 'Practice 2: L-Alanine (Alpha-Amino Acid)',
      stereocenterIndex: 0,
      hint: 'Rank: -NH2 (N, Z=7), -COOH (C bonded to O,O,O), -CH3 (C bonded to H,H,H), -H (Z=1).',
    },
    {
      moleculeId: 's-lactic-acid',
      title: 'Practice 3: (S)-Lactic Acid',
      stereocenterIndex: 0,
      hint: 'Rank: -OH (O, Z=8), -COOH (C=O, C-OH), -CH3, -H.',
    },
    {
      moleculeId: '2r-butanol',
      title: 'Practice 4: 2-Butanol (Sec-Butyl Alcohol)',
      stereocenterIndex: 0,
      hint: 'Compare ethyl (-CH2CH3) vs methyl (-CH3) at the first point of difference along the carbon chain.',
    },
    {
      moleculeId: 'd-glyceraldehyde',
      title: 'Practice 5: D-Glyceraldehyde',
      stereocenterIndex: 0,
      hint: 'Compare aldehyde -CH=O (C bonded to O,O,H) vs alcohol -CH2OH (C bonded to O,H,H).',
    },
  ];

  const [currentExerciseIdx, setCurrentExerciseIdx] = useState(0);
  const currentEx = exercises[currentExerciseIdx];
  const molecule = getMoleculeById(currentEx.moleculeId) || MOLECULES_DATABASE[0];
  const sc = molecule.stereocenters[currentEx.stereocenterIndex] || molecule.stereocenters[0];

  // User input states: user priority assignments for each substituent
  const [userPriorities, setUserPriorities] = useState<Record<number, number>>({});
  const [userConfiguration, setUserConfiguration] = useState<'R' | 'S' | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [showRSHelp, setShowRSHelp] = useState(false);

  // Reset exercise state when switching exercises
  const handleSelectExercise = (idx: number) => {
    setCurrentExerciseIdx(idx);
    setUserPriorities({});
    setUserConfiguration(null);
    setHasSubmitted(false);
    setFeedback(null);
  };

  const handleSetPriority = (subIdx: number, p: number) => {
    if (hasSubmitted) return;
    setUserPriorities((prev) => ({
      ...prev,
      [subIdx]: p,
    }));
  };

  const handleVerify = () => {
    if (!sc) return;

    // Check priorities
    let prioritiesCorrect = true;
    sc.substituents.forEach((sub, idx) => {
      if (userPriorities[idx] !== sub.priority) {
        prioritiesCorrect = false;
      }
    });

    // Check configuration
    const configCorrect = userConfiguration === sc.configuration;

    const allCorrect = prioritiesCorrect && configCorrect;

    if (allCorrect) {
      setFeedback({
        isCorrect: true,
        message: `Excellent! Verified: ${sc.label} has the (${sc.configuration}) configuration. All CIP priorities (1 > 2 > 3 > 4) and 3D rotational sequence are assigned with 100% chemical accuracy.`,
      });
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    } else {
      let msg = '';
      if (!prioritiesCorrect && !configCorrect) {
        msg = `Both substituent CIP priorities and the R/S configuration need revision. Review atomic numbers and tie-breaking rules.`;
      } else if (!prioritiesCorrect) {
        msg = `The (R/S) choice is marked, but the individual 1-4 CIP substituent priorities have errors. Check atomic numbers: higher Z = higher priority!`;
      } else {
        msg = `Priorities 1 to 4 are correct! However, when viewing with lowest priority group (#4) pointing away, trace 1 -> 2 -> 3: Clockwise = (R), Counter-clockwise = (S).`;
      }
      setFeedback({ isCorrect: false, message: msg });
    }

    setHasSubmitted(true);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold w-fit">
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          <span>Cahn-Ingold-Prelog (CIP) System</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          R/S Configuration & CIP Priority Rules
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
          The Cahn-Ingold-Prelog (CIP) rules provide an unambiguous, universally recognized nomenclature to describe the absolute 3D spatial arrangement of substituents at chiral stereocenters.
        </p>
      </div>

      {/* CIP Rules Summary Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
        <div className="flex flex-col gap-1 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
          <span className="text-[11px] font-bold text-amber-400">Step 1: Atomic Number</span>
          <span className="text-xs text-slate-300">
            Higher atomic number (Z) gets higher priority: I &gt; Br &gt; Cl &gt; S &gt; F &gt; O &gt; N &gt; C &gt; H.
          </span>
        </div>

        <div className="flex flex-col gap-1 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
          <span className="text-[11px] font-bold text-sky-400">Step 2: Tie Breaking</span>
          <span className="text-xs text-slate-300">
            If first atoms are tied, list attached atoms in decreasing $Z$ and compare at the first point of difference.
          </span>
        </div>

        <div className="flex flex-col gap-1 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
          <span className="text-[11px] font-bold text-purple-400">Step 3: Phantom Atoms</span>
          <span className="text-xs text-slate-300">
            Double bonds count as two single bonds to duplicate atoms: C=O is equivalent to C-(O,O).
          </span>
        </div>

        <div className="flex flex-col gap-1 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
          <span className="text-[11px] font-bold text-emerald-400">Step 4: View & Trace</span>
          <span className="text-xs text-slate-300">
            Put priority 4 in back. Trace $1 \to 2 \to 3$: <strong>Clockwise = (R)</strong>, <strong>Counter-clockwise = (S)</strong>.
          </span>
        </div>
      </div>

      {/* Exercise Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {exercises.map((ex, i) => (
          <button
            key={i}
            onClick={() => handleSelectExercise(i)}
            className={`px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
              currentExerciseIdx === i
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {ex.title}
          </button>
        ))}
      </div>

      {/* Main Interactive Practice Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 3D Visualizer on Left */}
        <div className="lg:col-span-7 flex flex-col gap-2">
          <MolecularViewer3D
            molecule={molecule}
            height="480px"
            title={`${currentEx.title} - 3D Stereocenter`}
            showCIPPrio={hasSubmitted}
            highlightStereocenters={true}
          />
          <div className="text-xs text-slate-400 italic text-center">
            Tip: Click the <span className="text-amber-300 font-semibold">"Align R/S View"</span> button inside the 3D viewer to orient group #4 directly away from you into the page!
          </div>
        </div>

        {/* Assignment Controls on Right */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-xl flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white">Interactive R/S Assignment</h3>
              <p className="text-xs text-slate-400">Assign CIP priorities 1 (highest) to 4 (lowest)</p>
            </div>
            <button
              onClick={() => setShowRSHelp(!showRSHelp)}
              className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Hint</span>
            </button>
          </div>

          {showRSHelp && (
            <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-800/40 text-xs text-amber-200/90 leading-relaxed">
              <strong>Chemistry Hint:</strong> {currentEx.hint}
            </div>
          )}

          {/* Substituents Priority Assignment */}
          <div className="flex flex-col gap-2.5">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              1. Assign Priority to Groups at {sc.label}:
            </span>

            {sc.substituents.map((sub, sIdx) => {
              const currentVal = userPriorities[sIdx];
              return (
                <div
                  key={sIdx}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs"
                >
                  <span className="font-semibold text-white">{sub.groupName}</span>

                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4].map((pNum) => (
                      <button
                        key={pNum}
                        onClick={() => handleSetPriority(sIdx, pNum)}
                        className={`w-7 h-7 rounded-lg font-bold text-xs transition-all ${
                          currentVal === pNum
                            ? pNum === 1
                              ? 'bg-amber-500 text-slate-950'
                              : pNum === 2
                              ? 'bg-sky-400 text-slate-950'
                              : pNum === 3
                              ? 'bg-purple-400 text-slate-950'
                              : 'bg-slate-500 text-white'
                            : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                        }`}
                      >
                        {pNum}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Configuration Selection (R or S) */}
          <div className="flex flex-col gap-2.5 pt-2 border-t border-slate-800">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              2. Determine Stereochemical Configuration:
            </span>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setUserConfiguration('R')}
                className={`py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                  userConfiguration === 'R'
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 ring-2 ring-amber-400'
                    : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                <RotateCw className="w-4 h-4 text-amber-500 group-hover:text-amber-400" />
                <span>(R) - Rectus (Clockwise)</span>
              </button>

              <button
                onClick={() => setUserConfiguration('S')}
                className={`py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                  userConfiguration === 'S'
                    ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25 ring-2 ring-cyan-400'
                    : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                <RotateCcw className="w-4 h-4 text-cyan-400" />
                <span>(S) - Sinister (Counter-CW)</span>
              </button>
            </div>
          </div>

          {/* Verification Feedback Banner */}
          {feedback && (
            <div
              className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 ${
                feedback.isCorrect
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                  : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
              }`}
            >
              {feedback.isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div className="flex flex-col gap-1">
                <span className="font-bold">{feedback.isCorrect ? 'Correct!' : 'Check your answer:'}</span>
                <span>{feedback.message}</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={handleVerify}
              disabled={Object.keys(userPriorities).length < 4 || !userConfiguration}
              className="flex-1 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-1.5"
            >
              <Award className="w-4 h-4" />
              <span>Verify CIP & R/S Assignment</span>
            </button>

            {hasSubmitted && (
              <button
                onClick={() => {
                  setUserPriorities({});
                  setUserConfiguration(null);
                  setHasSubmitted(false);
                  setFeedback(null);
                }}
                className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all"
                title="Reset attempt"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
