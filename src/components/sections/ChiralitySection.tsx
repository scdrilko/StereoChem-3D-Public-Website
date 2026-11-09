import React, { useState } from 'react';
import { Molecule } from '../../types/chemistry';
import { MolecularViewer3D } from '../laboratory/MolecularViewer3D';
import { DualMirrorViewer } from '../laboratory/DualMirrorViewer';
import { MOLECULES_DATABASE, getMoleculeById } from '../../data/molecules';
import {
  Sparkles,
  Layers,
  ArrowRightLeft,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Info,
  Compass,
} from 'lucide-react';

interface Props {
  onSelectMolecule: (molecule: Molecule) => void;
}

export const ChiralitySection: React.FC<Props> = ({ onSelectMolecule }) => {
  const [selectedMoleculeId, setSelectedMoleculeId] = useState<string>('l-alanine');
  const [viewMode, setViewMode] = useState<'single' | 'mirror'>('mirror');

  const molecule = getMoleculeById(selectedMoleculeId) || MOLECULES_DATABASE[0];

  const chiralityExamples = [
    { id: 'l-alanine', name: 'L-Alanine vs D-Alanine', type: 'Chiral Enantiomers' },
    { id: 's-lactic-acid', name: 'Lactic Acid (S vs R)', type: 'Chiral Enantiomers' },
    { id: '2r-butanol', name: '2-Butanol (R vs S)', type: 'Chiral Enantiomers' },
    { id: 'r-bromochlorofluoromethane', name: 'CHBrClF (R vs S)', type: 'Chiral Haloalkane' },
    { id: 'meso-tartaric-acid', name: 'Meso-Tartaric Acid', type: 'Achiral Meso' },
    { id: '2-butanone', name: '2-Butanone', type: 'Achiral Ketone (Control)' },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold w-fit">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Core Stereochemistry Fundamentals</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Chirality & Stereogenic Centres
        </h1>
        <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
          A molecule is defined as <strong>chiral</strong> if it cannot be superimposed on its mirror image by any combination of translations and rotations in three-dimensional space. The property of non-superimposability onto a mirror image is the ultimate test of chirality.
        </p>
      </div>

      {/* Interactive Molecule Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 border border-slate-800 p-3 rounded-2xl">
        <div className="flex flex-wrap items-center gap-2">
          {chiralityExamples.map((ex) => (
            <button
              key={ex.id}
              onClick={() => setSelectedMoleculeId(ex.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedMoleculeId === ex.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-950/60 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              {ex.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setViewMode('mirror')}
            className={`px-3 py-1 text-xs rounded-lg font-semibold transition-all ${
              viewMode === 'mirror' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Dual Mirror Comparison
          </button>
          <button
            onClick={() => setViewMode('single')}
            className={`px-3 py-1 text-xs rounded-lg font-semibold transition-all ${
              viewMode === 'single' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Single 3D View
          </button>
        </div>
      </div>

      {/* Interactive 3D Comparison View */}
      {viewMode === 'mirror' && molecule.enantiomerId ? (
        <DualMirrorViewer
          molecule={molecule}
          onSelectMolecule={(m) => {
            setSelectedMoleculeId(m.id);
            onSelectMolecule(m);
          }}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <MolecularViewer3D
              molecule={molecule}
              height="480px"
              showCIPPrio={true}
              highlightStereocenters={true}
            />
          </div>

          <div className="lg:col-span-4 flex flex-col gap-4 bg-slate-900/80 border border-slate-800 p-5 rounded-2xl text-xs">
            <h3 className="text-base font-bold text-white">{molecule.name}</h3>
            <p className="text-slate-300 leading-relaxed">{molecule.description}</p>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col gap-1.5">
              <span className="font-semibold text-slate-400">Chirality Status:</span>
              <div className="flex items-center gap-2">
                {molecule.isChiral ? (
                  <span className="text-cyan-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Chiral (Asymmetric, non-superimposable mirror image)
                  </span>
                ) : (
                  <span className="text-slate-300 font-bold flex items-center gap-1">
                    <XCircle className="w-4 h-4 text-slate-400" />
                    Achiral (Superimposable on mirror image)
                  </span>
                )}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col gap-1">
              <span className="font-semibold text-slate-400">Symmetry Elements:</span>
              <span className="text-slate-200">
                {molecule.symmetryElements?.join(', ') || 'No symmetry elements (C1 group)'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Deep-Dive Theory Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl flex flex-col gap-2">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 w-fit">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">Chiral vs Stereogenic Centre</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            A <strong>stereogenic centre</strong> (or stereocenter) is an atom at which an interchange of two bonded groups produces a new stereoisomer. When a tetrahedral carbon bears 4 distinct groups (C_abcd), it is an asymmetric chiral carbon.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl flex flex-col gap-2">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 w-fit">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">Elements of Symmetry</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            A molecule is <strong>achiral</strong> if it possesses an alternating axis of symmetry ($S_n$), which includes an internal plane of symmetry ($\sigma = S_1$) or an inversion center ($i = S_2$). Chiral molecules lack any $S_n$ axis.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl flex flex-col gap-2">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 w-fit">
            <ArrowRightLeft className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">Enantiomeric Pair Test</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Enantiomers have identical physical properties (density, boiling point, melting point, dipole moment) in an achiral environment, but rotate plane-polarized light in equal and opposite directions ($+[\alpha]$ and $-[\alpha]$).
          </p>
        </div>
      </div>
    </div>
  );
};
