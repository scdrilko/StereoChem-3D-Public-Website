import React, { useState } from 'react';
import { Molecule, RepresentationMode } from '../../types/chemistry';
import { MolecularViewer3D } from '../laboratory/MolecularViewer3D';
import { MolecularInfoPanel } from '../laboratory/MolecularInfoPanel';
import { MoleculeLibraryBar } from '../laboratory/MoleculeLibraryBar';
import { DualMirrorViewer } from '../laboratory/DualMirrorViewer';
import { FlaskConical, ArrowRightLeft, Sparkles, Layers } from 'lucide-react';

interface Props {
  currentMolecule: Molecule;
  onSelectMolecule: (m: Molecule) => void;
}

export const MolecularLaboratorySection: React.FC<Props> = ({ currentMolecule, onSelectMolecule }) => {
  const [repMode, setRepMode] = useState<RepresentationMode>('ballAndStick');
  const [showLabels, setShowLabels] = useState(true);
  const [highlightStereocenters, setHighlightStereocenters] = useState(true);
  const [showCIPPrio, setShowCIPPrio] = useState(true);
  const [selectedStereocenterIdx, setSelectedStereocenterIdx] = useState(0);
  const [showDualMirror, setShowDualMirror] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-1">
            <FlaskConical className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive 3D Molecular Laboratory</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            3D Molecular Laboratory & Stereochemical Analysis
          </h1>
        </div>

        {currentMolecule.enantiomerId && (
          <button
            onClick={() => setShowDualMirror(!showDualMirror)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 self-start sm:self-auto ${
              showDualMirror
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-md shadow-cyan-500/20'
            }`}
          >
            <ArrowRightLeft className="w-4 h-4" />
            <span>{showDualMirror ? 'Exit Mirror Studio' : 'Open Dual Mirror Studio'}</span>
          </button>
        )}
      </div>

      {/* Example Molecule Selector & SMILES Input Box */}
      <MoleculeLibraryBar
        currentMolecule={currentMolecule}
        onSelectMolecule={onSelectMolecule}
      />

      {/* Main 3D Display Stage */}
      {showDualMirror ? (
        <DualMirrorViewer
          molecule={currentMolecule}
          onSelectMolecule={onSelectMolecule}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: 3D Molecular Viewer Canvas */}
          <div className="lg:col-span-7 flex flex-col gap-2">
            <MolecularViewer3D
              molecule={currentMolecule}
              mode={repMode}
              onModeChange={setRepMode}
              showLabels={showLabels}
              onToggleLabels={() => setShowLabels(!showLabels)}
              highlightStereocenters={highlightStereocenters}
              onToggleStereocenters={() => setHighlightStereocenters(!highlightStereocenters)}
              showCIPPrio={showCIPPrio}
              onToggleCIPPrio={() => setShowCIPPrio(!showCIPPrio)}
              selectedStereocenterIndex={selectedStereocenterIdx}
              height="530px"
              enableMeasurement={false}
            />
          </div>

          {/* Right: Chemical Properties & Stereocenter Info Panel */}
          <div className="lg:col-span-5">
            <MolecularInfoPanel
              molecule={currentMolecule}
              onSelectMolecule={onSelectMolecule}
              onSelectStereocenter={setSelectedStereocenterIdx}
              selectedStereocenterIndex={selectedStereocenterIdx}
            />
          </div>
        </div>
      )}
    </div>
  );
};
