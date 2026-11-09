export type RepresentationMode = 'ballAndStick' | 'spacefill' | 'stick' | 'wireframe';

export interface Atom {
  id: number;
  symbol: string;
  x: number;
  y: number;
  z: number;
  color: string;
  radius: number; // Van der Waals radius
  isChiralCenter?: boolean;
  cipPriority?: 1 | 2 | 3 | 4;
  label?: string;
  formalCharge?: number;
}

export interface Bond {
  id: number;
  atom1: number; // index in atoms array
  atom2: number;
  order: 1 | 2 | 3;
  type?: 'single' | 'double' | 'triple' | 'wedge' | 'dash';
}

export interface CIPSubstituent {
  atomIndex: number;
  symbol: string;
  priority: 1 | 2 | 3 | 4;
  groupName: string;
  reason: string;
}

export interface StereocenterInfo {
  atomIndex: number;
  configuration: 'R' | 'S' | 'E' | 'Z' | 'meso' | 'achiral';
  label: string;
  substituents: CIPSubstituent[];
}

export interface Molecule {
  id: string;
  name: string;
  iupacName: string;
  formula: string;
  molecularWeight: number;
  smiles: string;
  description: string;
  category: 'amino-acid' | 'hydroxy-acid' | 'alcohol' | 'ketone' | 'dicarboxylic' | 'haloalkane' | 'terpene' | 'pharmaceutical' | 'alkene' | 'cycloalkane';
  isChiral: boolean;
  isMeso?: boolean;
  opticalRotation?: string; // e.g. "+3.82°" or "0.0° (optically inactive)"
  stereocentersCount: number;
  stereocenters: StereocenterInfo[];
  atoms: Atom[];
  bonds: Bond[];
  enantiomerId?: string;
  diastereomerIds?: string[];
  symmetryElements?: string[];
  biologicalRelevance?: string;
}

export interface QuizQuestion {
  id: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  moleculeRefId?: string;
}
