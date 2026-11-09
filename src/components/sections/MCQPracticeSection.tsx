import React, { useState } from 'react';
import { QuizQuestion } from '../../types/chemistry';
import { Award, CheckCircle2, XCircle, RefreshCw, Sparkles, Filter, ChevronRight, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const MCQ_DATABASE: QuizQuestion[] = [
  // BEGINNER
  {
    id: 1,
    difficulty: 'Beginner',
    category: 'Chirality Basics',
    question: 'Which of the following conditions is strictly necessary for a molecule to be chiral?',
    options: [
      'It must contain at least two double bonds',
      'It must be non-superimposable on its mirror image',
      'It must contain a nitrogen atom',
      'It must be planar'
    ],
    correctIndex: 1,
    explanation: 'By definition, a molecule is chiral if and only if it is non-superimposable on its mirror image (lacking an alternating axis of symmetry Sn).'
  },
  {
    id: 2,
    difficulty: 'Beginner',
    category: 'CIP Priority',
    question: 'According to Cahn-Ingold-Prelog (CIP) priority rules, which atom among the following has the highest priority?',
    options: ['Chlorine (Z=17)', 'Fluorine (Z=9)', 'Bromine (Z=35)', 'Oxygen (Z=8)'],
    correctIndex: 2,
    explanation: 'Rule 1 of CIP assigns priority directly by atomic number (Z). Bromine (Z=35) > Chlorine (Z=17) > Fluorine (Z=9) > Oxygen (Z=8).'
  },
  {
    id: 3,
    difficulty: 'Beginner',
    category: 'R/S Configuration',
    question: 'When determining (R) vs (S) configuration, if the lowest-priority group (#4) is oriented directly AWAY from the observer, what does a clockwise sequence 1 -> 2 -> 3 represent?',
    options: ['(S) - Sinister', '(R) - Rectus', '(E) - Entgegen', '(Z) - Zusammen'],
    correctIndex: 1,
    explanation: 'With group 4 directed away, clockwise rotation 1 -> 2 -> 3 defines (R) [Latin Rectus = right], while counter-clockwise defines (S) [Latin Sinister = left].'
  },
  {
    id: 4,
    difficulty: 'Beginner',
    category: 'Optical Activity',
    question: 'What is an equimolar (50:50) mixture of two enantiomers called, and what is its net optical rotation?',
    options: [
      'Meso compound, [α] = +10°',
      'Racemic mixture (racemate), [α] = 0°',
      'Diastereomeric pair, [α] = -10°',
      'Constitutional isomer mixture, [α] = 180°'
    ],
    correctIndex: 1,
    explanation: 'A 50:50 mixture of two enantiomers is termed a racemic mixture (racemate, (±) or (d,l)). It is optically inactive ([α] = 0°) due to external compensation.'
  },
  {
    id: 5,
    difficulty: 'Beginner',
    category: 'Symmetry',
    question: 'Why is 2-butanone (CH3-CO-CH2CH3) optically inactive?',
    options: [
      'It has an internal chiral carbon',
      'The carbonyl carbon is sp2 hybridized and planar, possessing an internal plane of symmetry',
      'It has 4 different groups on C2',
      'It exists solely as a pair of enantiomers'
    ],
    correctIndex: 1,
    explanation: 'In 2-butanone, C2 is sp2 hybridized with 120° trigonal planar geometry and lacks 4 distinct substituents. The plane containing the carbonyl and attached carbons serves as a plane of symmetry.'
  },

  // INTERMEDIATE
  {
    id: 6,
    difficulty: 'Intermediate',
    category: 'CIP Tie Breaking',
    question: 'Which of the following substituents has higher CIP priority: -CH2OH or -CH(CH3)2?',
    options: [
      '-CH(CH3)2, because it has two carbons attached',
      '-CH2OH, because oxygen (Z=8) has a higher atomic number than carbon (Z=6)',
      'Both have identical priority',
      'Priority depends on the solvent'
    ],
    correctIndex: 1,
    explanation: 'Both groups have Carbon bonded to the stereocenter. For -CH2OH, the attached atoms in decreasing Z are (O, H, H). For -CH(CH3)2, they are (C, C, H). Comparing the highest atoms at the first point of difference: Oxygen (Z=8) beats Carbon (Z=6). Priority is not determined by summing atomic numbers!'
  },
  {
    id: 7,
    difficulty: 'Intermediate',
    category: 'Meso Compounds',
    question: 'Which of the following stereoisomers of tartaric acid is a meso compound?',
    options: [
      '(2R, 3R)-tartaric acid',
      '(2S, 3S)-tartaric acid',
      '(2R, 3S)-tartaric acid',
      'All tartaric acids are meso'
    ],
    correctIndex: 2,
    explanation: '(2R, 3S)-tartaric acid has an internal horizontal plane of symmetry bisecting the C2-C3 bond in its eclipsed conformation. Optical rotation cancels internally (internal compensation).'
  },
  {
    id: 8,
    difficulty: 'Intermediate',
    category: 'Fischer Projections',
    question: 'In a standard Fischer projection cross formula, what do the horizontal and vertical bonds represent?',
    options: [
      'Horizontal: receding away (dashes); Vertical: coming forward (wedges)',
      'Horizontal: coming forward (wedges); Vertical: receding away (dashes)',
      'Both horizontal and vertical bonds lie entirely in the plane of the paper',
      'Horizontal represents double bonds, vertical represents single bonds'
    ],
    correctIndex: 1,
    explanation: 'By Emil Fischer convention, horizontal bonds project out of the plane towards the viewer (wedges), while vertical bonds recede behind the plane away from the viewer (dashes).'
  },
  {
    id: 9,
    difficulty: 'Intermediate',
    category: 'Fischer Manipulation',
    question: 'Rotating a Fischer projection by 90° in the plane of the paper results in which of the following?',
    options: [
      'The identical molecule with the same configuration',
      'The enantiomer of the original molecule (inverted configuration)',
      'A structural constitutional isomer',
      'A meso conformer'
    ],
    correctIndex: 1,
    explanation: 'A 90° in-plane rotation swaps horizontal (wedges) with vertical (dashes), thereby inverting all stereocenters and generating the enantiomer. Only 180° rotations preserve the original molecule.'
  },
  {
    id: 10,
    difficulty: 'Intermediate',
    category: 'Newman Conformations',
    question: 'For n-butane viewing down the C2-C3 bond, which conformation corresponds to the global energy minimum?',
    options: [
      'Fully eclipsed (0° dihedral)',
      'Gauche (60° dihedral)',
      'Anti (180° dihedral)',
      'Eclipsed (120° dihedral)'
    ],
    correctIndex: 2,
    explanation: 'The anti conformation (180° dihedral between methyl groups) is the global energy minimum (0 kJ/mol) because steric repulsion and torsional strain are both minimized.'
  },
  {
    id: 11,
    difficulty: 'Intermediate',
    category: 'Cyclohexane',
    question: 'In a chair ring flip of cyclohexane, what happens to an axial substituent?',
    options: [
      'It remains axial but points in the opposite direction',
      'It becomes equatorial',
      'It detaches and forms a planar double bond',
      'It moves to the center of the ring'
    ],
    correctIndex: 1,
    explanation: 'During a chair-to-chair ring flip, all axial bonds become equatorial, and all equatorial bonds become axial (while maintaining their relative up/down orientation).'
  },
  {
    id: 12,
    difficulty: 'Intermediate',
    category: 'E/Z Alkene Stereochemistry',
    question: 'What is the correct CIP assignment for 2-bromo-2-butene with -CH3 and -Br on C2 and -H and -CH3 on C3 on opposite sides?',
    options: [
      'Always cis',
      'Determined by comparing CIP priorities at C2 (Br > CH3) and C3 (CH3 > H)',
      'Alkene cannot have E/Z isomerism',
      'Always trans'
    ],
    correctIndex: 1,
    explanation: 'At C2, -Br (Z=35) > -CH3 (Z=6). At C3, -CH3 (Z=6) > -H (Z=1). If the two high-priority groups (-Br and -CH3) are on opposite sides, it is (E); if on the same side, it is (Z).'
  },

  // ADVANCED (M.Sc. / University Chemistry Level)
  {
    id: 13,
    difficulty: 'Advanced',
    category: 'Phantom Atoms',
    question: 'Between -C≡CH (ethynyl) and -C(CH3)3 (tert-butyl), which group has higher CIP priority?',
    options: [
      '-C(CH3)3, because it has three actual carbons attached',
      '-C≡CH, because the triple bond counts as Carbon bonded to (C, C, C) and at the second level has (C, C, C) phantom atoms',
      '-C≡CH, because at the first atom it is C bonded to (C, C, C), and its attached carbon is bonded to (C, C, H), which beats C(H, H, H)',
      'They have equal priority'
    ],
    correctIndex: 2,
    explanation: 'For -C≡CH, the first carbon is bonded to (C, C, C). For -C(CH3)3, the first carbon is also bonded to (C, C, C) [tie]. Moving to the next atom: on -C≡CH, the terminal carbon is bonded to (C, C, H) because of phantom duplicate atoms! On -C(CH3)3, each methyl carbon is bonded to (H, H, H). Since (C, C, H) beats (H, H, H), -C≡CH has higher priority!'
  },
  {
    id: 14,
    difficulty: 'Advanced',
    category: 'Enantiomeric Excess',
    question: 'A sample of 2-butanol has an observed specific rotation [α] = +6.75°. If pure (+)-(2S)-2-butanol has [α] = +13.5°, what is the optical purity (% ee) and the percentage of each enantiomer?',
    options: [
      '% ee = 50%; 75% (S) and 25% (R)',
      '% ee = 50%; 50% (S) and 50% (R)',
      '% ee = 25%; 62.5% (S) and 37.5% (R)',
      '% ee = 100%; 100% (S)'
    ],
    correctIndex: 0,
    explanation: '% ee = (+6.75 / +13.5) × 100 = 50% ee. The 50% racemic portion contains 25% (S) + 25% (R). The 50% excess is pure (S). Thus, total (S) = 25% + 50% = 75%, and total (R) = 25%.'
  },
  {
    id: 15,
    difficulty: 'Advanced',
    category: 'Stereochemistry in Pharmacology',
    question: 'Why cannot pure (R)-thalidomide be safely administered to pregnant women even though (R) is non-teratogenic?',
    options: [
      '(R)-thalidomide is insoluble in human blood',
      '(R)-thalidomide undergoes rapid metabolic chiral inversion (racemization) in vivo at physiological pH',
      '(R)-thalidomide converts directly into morphine',
      '(R)-thalidomide binds irreversibly to hemoglobin'
    ],
    correctIndex: 1,
    explanation: 'The chiral proton at the stereocenter is acidic due to the adjacent phthalimide and glutarimide carbonyls. In aqueous biological buffer at physiological pH 7.4, keto-enol tautomerism causes rapid in vivo racemization (half-life ~4 hours), generating teratogenic (S)-thalidomide inside the patient.'
  },
];

export const MCQPracticeSection: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [userSelectedOption, setUserSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [streak, setStreak] = useState(0);

  const filteredQuestions = MCQ_DATABASE.filter(
    (q) => selectedDifficulty === 'All' || q.difficulty === selectedDifficulty
  );

  const currentQ = filteredQuestions[currentQuestionIdx] || filteredQuestions[0];

  const handleSelectOption = (index: number) => {
    if (hasAnswered) return;
    setUserSelectedOption(index);
    setHasAnswered(true);
    setTotalAnswered((prev) => prev + 1);

    if (index === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 },
      });
    } else {
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    setUserSelectedOption(null);
    setHasAnswered(false);
    if (currentQuestionIdx < filteredQuestions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      setCurrentQuestionIdx(0); // Loop back
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 text-xs font-semibold w-fit">
          <Award className="w-3.5 h-3.5 text-yellow-400" />
          <span>Interactive Chemistry Assessment</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Stereochemistry MCQ Practice Center
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          Test your conceptual understanding of chirality, CIP rules, R/S configurations, Fischer/Newman projections, and optical activity with university-level chemistry problems.
        </p>
      </div>

      {/* Score & Streak Header Bar */}
      <div className="grid grid-cols-3 gap-3 bg-slate-900/80 border border-slate-800 p-4 rounded-2xl shadow-lg">
        <div className="flex flex-col items-center">
          <span className="text-[11px] text-slate-400 font-semibold">Total Score</span>
          <span className="text-xl font-extrabold text-cyan-300 font-mono">
            {score} / {totalAnswered}
          </span>
        </div>
        <div className="flex flex-col items-center border-x border-slate-800">
          <span className="text-[11px] text-slate-400 font-semibold">Accuracy</span>
          <span className="text-xl font-extrabold text-emerald-400 font-mono">
            {totalAnswered > 0 ? Math.round((score / totalAnswered) * 100) : 0}%
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[11px] text-slate-400 font-semibold">Current Streak</span>
          <span className="text-xl font-extrabold text-amber-400 font-mono flex items-center gap-1">
            🔥 {streak}
          </span>
        </div>
      </div>

      {/* Difficulty Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-400 font-semibold mr-1">Difficulty:</span>
        {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map((diff) => (
          <button
            key={diff}
            onClick={() => {
              setSelectedDifficulty(diff);
              setCurrentQuestionIdx(0);
              setUserSelectedOption(null);
              setHasAnswered(false);
            }}
            className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all ${
              selectedDifficulty === diff
                ? 'bg-yellow-500 text-slate-950 font-bold shadow-md shadow-yellow-500/20'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            {diff}
          </button>
        ))}
      </div>

      {/* Question Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
              Q{currentQuestionIdx + 1} of {filteredQuestions.length}
            </span>
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                currentQ.difficulty === 'Beginner'
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-800/60'
                  : currentQ.difficulty === 'Intermediate'
                  ? 'bg-cyan-950 text-cyan-300 border-cyan-800/60'
                  : 'bg-purple-950 text-purple-300 border-purple-800/60'
              }`}
            >
              {currentQ.difficulty}
            </span>
            <span className="text-xs text-slate-400">• {currentQ.category}</span>
          </div>
        </div>

        {/* Question Text */}
        <h2 className="text-base md:text-lg font-bold text-white leading-relaxed">
          {currentQ.question}
        </h2>

        {/* Options */}
        <div className="flex flex-col gap-3">
          {currentQ.options.map((opt, oIdx) => {
            const isSelected = userSelectedOption === oIdx;
            const isCorrect = oIdx === currentQ.correctIndex;

            let optionStyle = 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/50';

            if (hasAnswered) {
              if (isCorrect) {
                optionStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500/40';
              } else if (isSelected && !isCorrect) {
                optionStyle = 'bg-rose-950/40 border-rose-500 text-rose-300 ring-1 ring-rose-500/40';
              }
            }

            return (
              <button
                key={oIdx}
                disabled={hasAnswered}
                onClick={() => handleSelectOption(oIdx)}
                className={`p-4 rounded-2xl text-left border text-xs md:text-sm font-medium transition-all flex items-center justify-between gap-3 ${optionStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs shrink-0 text-slate-300">
                    {String.fromCharCode(65 + oIdx)}
                  </span>
                  <span>{opt}</span>
                </div>

                {hasAnswered && isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                )}
                {hasAnswered && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation Banner */}
        {hasAnswered && (
          <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/30 flex flex-col gap-2 text-xs">
            <span className="font-bold text-cyan-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Chemical Explanation:</span>
            </span>
            <p className="text-slate-300 leading-relaxed">{currentQ.explanation}</p>
          </div>
        )}

        {/* Next Question Button */}
        {hasAnswered && (
          <div className="flex justify-end pt-2">
            <button
              onClick={handleNextQuestion}
              className="px-6 py-2.5 rounded-xl font-bold text-xs bg-yellow-500 hover:bg-yellow-400 text-slate-950 transition-all flex items-center gap-2 shadow-lg shadow-yellow-500/20"
            >
              <span>{currentQuestionIdx < filteredQuestions.length - 1 ? 'Next Problem' : 'Restart Quiz'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
