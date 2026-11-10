import React, { useState } from 'react';
import VisitorCounter from './components/VisitorCounter';
import { Molecule } from './types/chemistry';
import { MOLECULES_DATABASE } from './data/molecules';

// Sections
import { HomeDashboard } from './components/sections/HomeDashboard';
import { MolecularLaboratorySection } from './components/sections/MolecularLaboratorySection';
import { ChiralitySection } from './components/sections/ChiralitySection';
import { RSConfigurationSection } from './components/sections/RSConfigurationSection';
import { CIPRulesSection } from './components/sections/CIPRulesSection';
import { EnantiomersDiastereomersSection } from './components/sections/EnantiomersDiastereomersSection';
import { MesoSection } from './components/sections/MesoSection';
import { FischerSection } from './components/sections/FischerSection';
import { NewmanSection } from './components/sections/NewmanSection';
import { EZIsomerismSection } from './components/sections/EZIsomerismSection';
import { CyclohexaneSection } from './components/sections/CyclohexaneSection';
import { OpticalActivitySection } from './components/sections/OpticalActivitySection';
import { AITutorSection } from './components/sections/AITutorSection';
import { MCQPracticeSection } from './components/sections/MCQPracticeSection';
import { LearningResourcesSection } from './components/sections/LearningResourcesSection';

import {
  LayoutDashboard,
  FlaskConical,
  Sparkles,
  Compass,
  BookOpen,
  Layers,
  Atom,
  Grid,
  Activity,
  GitBranch,
  RefreshCw,
  Eye,
  Bot,
  Award,
  Menu,
  X,
  ChevronRight,
  ExternalLink,
  PlusCircle,
} from 'lucide-react';
import { AddMoleculeModal } from './components/modals/AddMoleculeModal';
import LegalPage from './components/legal/LegalPage';

export default function App() {
  const [currentSection, setCurrentSection] = useState<string>('home');
  const [currentMolecule, setCurrentMolecule] = useState<Molecule>(MOLECULES_DATABASE[0]); // Default to L-Alanine
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isGlobalAddModalOpen, setIsGlobalAddModalOpen] = useState(false);

  const navSections = [
    { id: 'home', title: '1. Home Dashboard', icon: LayoutDashboard },
    { id: 'lab', title: '2. 3D Molecular Laboratory', icon: FlaskConical, badge: 'Core' },
    { id: 'chirality', title: '3. Chirality & Stereocenters', icon: Sparkles },
    { id: 'rs-config', title: '4. R/S Configuration', icon: Compass, badge: 'Trainer' },
    { id: 'cip-rules', title: '5. CIP Priority Rules', icon: BookOpen },
    { id: 'enantiomers', title: '6. Enantiomers & Diastereomers', icon: Layers },
    { id: 'meso', title: '7. Meso Compounds', icon: Atom },
    { id: 'fischer', title: '8. Fischer Projection', icon: Grid },
    { id: 'newman', title: '9. Newman Projection', icon: Activity },
    { id: 'ez-isomerism', title: '10. E/Z Isomerism', icon: GitBranch },
    { id: 'cyclohexane', title: '11. Cyclohexane Conformations', icon: RefreshCw },
    { id: 'optical-activity', title: '12. Optical Activity & Polarimeter', icon: Eye },
    { id: 'tutor', title: '13. AI Chemistry Tutor', icon: Bot, badge: 'AI' },
    { id: 'mcq', title: '14. MCQ Practice Center', icon: Award, badge: 'Quiz' },
    { id: 'resources', title: '15. Learning Resources', icon: BookOpen },
  ];

  const handleNavigate = (id: string) => {
    setCurrentSection(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 px-4 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavigate('home')}>
          {/* Logo */}
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/25 ring-1 ring-cyan-400/40">
            <Atom className="w-6 h-6 text-slate-950 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-white">StereoChem</span>
              <span className="px-1.5 py-0.5 rounded-md text-[10px] font-black bg-cyan-400 text-slate-950 uppercase tracking-widest">
                3D
              </span>
            </div>
            <p className="text-[10px] text-cyan-400/90 font-medium tracking-wide hidden sm:block">
              3S-Powered Stereochemistry Learning Platform
            </p>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsGlobalAddModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-md shadow-amber-500/20"
            title="Add any molecule by name or SMILES to check its stereochemical configuration"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">+ Check Configuration</span>
            <span className="sm:hidden">+ Check</span>
          </button>

          <button
            onClick={() => handleNavigate('lab')}
            className={`hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentSection === 'lab'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>3D Lab</span>
          </button>

          <button
            onClick={() => handleNavigate('tutor')}
            className={`hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentSection === 'tutor'
                ? 'bg-violet-500 text-slate-950 shadow-md shadow-violet-500/20'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>AI Tutor</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Global Add Molecule Modal */}
      <AddMoleculeModal
        isOpen={isGlobalAddModalOpen}
        onClose={() => setIsGlobalAddModalOpen(false)}
        onMoleculeAdded={(newMol) => {
          setCurrentMolecule(newMol);
          setCurrentSection('lab');
        }}
      />

      {/* Main App Layout */}
      <div className="flex-1 flex max-w-[1720px] w-full mx-auto">
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden lg:flex w-72 flex-col gap-1 p-4 border-r border-slate-800/80 bg-slate-950/40 sticky top-[61px] h-[calc(100vh-61px)] overflow-y-auto scrollbar-thin">
          <div className="text-[11px] font-bold text-slate-400 px-3 py-2 uppercase tracking-wider">
            Curriculum Modules
          </div>

          {navSections.map((sec) => {
            const Icon = sec.icon;
            const isActive = currentSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => handleNavigate(sec.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left group ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/15 to-blue-500/10 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                  <span className="truncate">{sec.title}</span>
                </div>

                {sec.badge && (
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0 uppercase tracking-wider ${
                      isActive
                        ? 'bg-cyan-500 text-slate-950'
                        : sec.badge === 'Core'
                        ? 'bg-cyan-950 text-cyan-400 border border-cyan-800/40'
                        : sec.badge === 'AI'
                        ? 'bg-violet-950 text-violet-400 border border-violet-800/40'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {sec.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="mt-auto pt-4 border-t border-slate-800/80 px-2 text-[11px] text-slate-400 flex flex-col gap-1">
            <span className="font-semibold text-slate-300">StereoChem 3D v1.0</span>
            <span>B.Sc. & M.Sc. Chemistry Syllabus Compliant</span>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-2xl p-6 flex flex-col gap-3 overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-2">
              <span className="font-bold text-base text-white">Curriculum Navigation</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl bg-slate-900 text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {navSections.map((sec) => {
              const Icon = sec.icon;
              const isActive = currentSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => handleNavigate(sec.id)}
                  className={`flex items-center justify-between p-3 rounded-xl text-sm font-semibold text-left transition-all ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'bg-slate-900/60 text-slate-300 border border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{sec.title}</span>
                  </div>
                  {sec.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-white font-bold">
                      {sec.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          {currentSection === 'home' && (
            <HomeDashboard
              onNavigate={handleNavigate}
              onSelectMolecule={(m) => {
                setCurrentMolecule(m);
                setCurrentSection('lab');
              }}
            />
          )}

          {currentSection === 'lab' && (
            <MolecularLaboratorySection
              currentMolecule={currentMolecule}
              onSelectMolecule={setCurrentMolecule}
            />
          )}

          {currentSection === 'chirality' && (
            <ChiralitySection onSelectMolecule={setCurrentMolecule} />
          )}

          {currentSection === 'rs-config' && (
            <RSConfigurationSection onSelectMolecule={setCurrentMolecule} />
          )}

          {currentSection === 'cip-rules' && <CIPRulesSection />}

          {currentSection === 'enantiomers' && (
            <EnantiomersDiastereomersSection onSelectMolecule={setCurrentMolecule} />
          )}

          {currentSection === 'meso' && (
            <MesoSection onSelectMolecule={setCurrentMolecule} />
          )}

          {currentSection === 'fischer' && <FischerSection />}

          {currentSection === 'newman' && <NewmanSection />}

          {currentSection === 'ez-isomerism' && <EZIsomerismSection />}

          {currentSection === 'cyclohexane' && <CyclohexaneSection />}

          {currentSection === 'optical-activity' && <OpticalActivitySection />}

          {currentSection === 'tutor' && <AITutorSection />}

          {currentSection === 'mcq' && <MCQPracticeSection />}

          {currentSection === 'resources' && <LearningResourcesSection />}
{['copyright', 'disclaimer', 'terms', 'privacy', 'contact'].includes(currentSection) && (
  <LegalPage
    page={currentSection as 'copyright' | 'disclaimer' | 'terms' | 'privacy' | 'contact'}
    onNavigate={handleNavigate}
  />
)}
        </main>
      </div>
      <footer className="border-t border-slate-800 bg-slate-950 px-4 py-8 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">
                StereoChem 3D
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                3S-Powered Stereochemistry Learning Platform
              </p>
            </div>

            <nav className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-400">
              <button onClick={() => handleNavigate('copyright')} className="hover:text-cyan-400">
                Copyright
              </button>
              <button onClick={() => handleNavigate('disclaimer')} className="hover:text-cyan-400">
                Disclaimer
              </button>
              <button onClick={() => handleNavigate('terms')} className="hover:text-cyan-400">
                Terms of Service
              </button>
              <button onClick={() => handleNavigate('privacy')} className="hover:text-cyan-400">
                Privacy Policy
              </button>
              <button onClick={() => handleNavigate('contact')} className="hover:text-cyan-400">
                Contact
              </button>
            </nav>
          </div>

          <div className="mt-6 border-t border-slate-800 pt-5 text-center text-xs text-slate-500">
            © 2026 StereoChem 3D. All rights reserved.
            <span className="mx-2">|</span>
            Educational platform for chemistry learning.
          </div>
<VisitorCounter />
        </div>
      </footer>
    </div>
  );
}
