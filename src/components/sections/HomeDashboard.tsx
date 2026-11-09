import React from 'react';
import { Molecule } from '../../types/chemistry';
import {
  Compass,
  Sparkles,
  Layers,
  ArrowRight,
  BookOpen,
  Award,
  Zap,
  CheckCircle2,
  Atom,
  HelpCircle,
  FlaskConical,
  Activity,
} from 'lucide-react';
import { MOLECULES_DATABASE } from '../../data/molecules';

interface Props {
  onNavigate: (section: string) => void;
  onSelectMolecule: (molecule: Molecule) => void;
}

export const HomeDashboard: React.FC<Props> = ({ onNavigate, onSelectMolecule }) => {
  const featuredMolecules = [
    MOLECULES_DATABASE.find((m) => m.id === 'l-alanine')!,
    MOLECULES_DATABASE.find((m) => m.id === 'meso-tartaric-acid')!,
    MOLECULES_DATABASE.find((m) => m.id === 'r-bromochlorofluoromethane')!,
    MOLECULES_DATABASE.find((m) => m.id === 'cyclohexane-chair')!,
  ].filter(Boolean);

  const modules = [
    {
      id: 'lab',
      title: '3D Molecular Laboratory',
      desc: 'Interactive 3D molecular viewer with ball-and-stick, CPK, CIP priority visualizer, and SMILES input.',
      icon: FlaskConical,
      color: 'from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30',
      badge: 'Core Feature',
    },
    {
      id: 'chirality',
      title: 'Chirality & Stereocenters',
      desc: 'Discover chiral vs achiral molecules, elements of symmetry (σ, i), and non-superimposability tests.',
      icon: Sparkles,
      color: 'from-indigo-500/20 to-purple-500/20 text-indigo-400 border-indigo-500/30',
      badge: 'Fundamental',
    },
    {
      id: 'rs-config',
      title: 'R/S Configuration & CIP Rules',
      desc: 'Step-by-step Cahn-Ingold-Prelog priorities (1-4) with an interactive assignment trainer and feedback.',
      icon: Compass,
      color: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30',
      badge: 'Interactive Practice',
    },
    {
      id: 'enantiomers',
      title: 'Enantiomers & Diastereomers',
      desc: 'Compare non-superimposable mirror images side-by-side with our dual 3D virtual mirror plane.',
      icon: Layers,
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30',
      badge: 'Dual 3D Viewer',
    },
    {
      id: 'meso',
      title: 'Meso Compounds',
      desc: 'Learn how internal planes of symmetry cause optical inactivity despite multiple chiral stereocenters.',
      icon: Atom,
      color: 'from-rose-500/20 to-pink-500/20 text-rose-400 border-rose-500/30',
      badge: 'Key Concept',
    },
    {
      id: 'newman',
      title: 'Newman & Conformations',
      desc: 'Dynamic dihedral angle rotation slider with synchronized 3D view and 2D Newman circle diagrams.',
      icon: Activity,
      color: 'from-sky-500/20 to-cyan-500/20 text-sky-400 border-sky-500/30',
      badge: '3D Simulation',
    },
    {
      id: 'tutor',
      title: 'AI Chemistry Tutor',
      desc: 'Ask stereochemistry questions to our specialized AI organic chemistry professor.',
      icon: Zap,
      color: 'from-violet-500/20 to-purple-500/20 text-violet-400 border-violet-500/30',
      badge: 'AI Powered',
    },
    {
      id: 'mcq',
      title: 'MCQ Practice & Quizzes',
      desc: '25+ university-level chemistry problems with Beginner, Intermediate, and Advanced tiers.',
      icon: Award,
      color: 'from-yellow-500/20 to-amber-500/20 text-yellow-400 border-yellow-500/30',
      badge: 'Test Yourself',
    },
  ];

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-cyan-950/40 to-slate-900 border border-slate-800 p-6 md:p-10 shadow-2xl">
        <div className="relative z-10 max-w-3xl flex flex-col gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold w-fit">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive 3D Stereochemistry Education Platform</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Master Stereochemistry in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300">True 3D</span>
          </h1>

          <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl">
            Designed for undergraduate (B.Sc.) and postgraduate (M.Sc.) Chemistry students. Explore chiral centers, Cahn-Ingold-Prelog (CIP) priority rules, R/S configurations, enantiomers, Fischer and Newman projections, and cyclohexane ring flips with real-time molecular visualization.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('lab')}
              className="px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-sky-400 hover:from-cyan-400 hover:to-sky-300 text-slate-950 shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2"
            >
              <FlaskConical className="w-4 h-4" />
              <span>Launch 3D Laboratory</span>
            </button>

            <button
              onClick={() => onNavigate('rs-config')}
              className="px-6 py-3 rounded-xl font-bold text-sm bg-slate-800/90 hover:bg-slate-700 text-white border border-slate-700 transition-all flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Practice R/S Assignment</span>
            </button>
          </div>
        </div>

        {/* Ambient Scientific Background Glow */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute right-40 bottom-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Featured Molecules Quick Launch */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Atom className="w-5 h-5 text-cyan-400" />
            <span>Featured Stereochemical Benchmark Molecules</span>
          </h2>
          <button
            onClick={() => onNavigate('lab')}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <span>View All in 3D Lab</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredMolecules.map((m) => (
            <div
              key={m.id}
              onClick={() => {
                onSelectMolecule(m);
                onNavigate('lab');
              }}
              className="bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 p-4 rounded-2xl cursor-pointer transition-all hover:shadow-xl hover:shadow-cyan-500/10 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {m.formula}
                  </span>
                  {m.stereocentersCount > 0 && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800/40">
                      {m.stereocenters.map((s) => `${s.label}:${s.configuration}`).join(' ')}
                    </span>
                  )}
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {m.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {m.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-cyan-400 font-semibold">
                <span>Explore in 3D</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Curriculum Modules Grid */}
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-cyan-400" />
          <span>Interactive Chemistry Modules</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {modules.map((mod) => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.id}
                onClick={() => onNavigate(mod.id)}
                className="bg-slate-900/70 border border-slate-800 hover:border-slate-700 p-5 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br border ${mod.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {mod.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-1.5">
                    {mod.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {mod.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-300 group-hover:text-cyan-300 font-semibold">
                  <span>Open Module</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* University Level Study Path Guidance */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Recommended Study Sequence</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              1. Chirality & Stereocenters → 2. CIP Priority Rules → 3. R/S Configuration Exercises → 4. Enantiomers & Diastereomers → 5. Meso Compounds → 6. Fischer & Newman Projections → 7. Optical Activity & Polarimetry.
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('mcq')}
          className="px-5 py-2.5 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all flex items-center gap-2 shrink-0"
        >
          <span>Take Knowledge Assessment</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
