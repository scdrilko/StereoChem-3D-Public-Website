import { Molecule } from '../types/chemistry';

export const MOLECULES_DATABASE: Molecule[] = [
  // ==========================================
  // 1. L-ALANINE ((S)-2-aminopropanoic acid)
  // ==========================================
  {
    id: 'l-alanine',
    name: 'L-Alanine',
    iupacName: '(2S)-2-aminopropanoic acid',
    formula: 'C3H7NO2',
    molecularWeight: 89.094,
    smiles: 'C[C@@H](N)C(=O)O',
    category: 'amino-acid',
    isChiral: true,
    stereocentersCount: 1,
    opticalRotation: '+14.5° (in 6M HCl)',
    description: 'The natural proteinogenic enantiomer of alanine. The alpha-carbon (C2) is a stereogenic center with (S) configuration according to Cahn-Ingold-Prelog (CIP) priority rules: -NH2 (1) > -COOH (2) > -CH3 (3) > -H (4).',
    enantiomerId: 'd-alanine',
    biologicalRelevance: 'One of the 20 standard amino acids used by ribosomes in protein biosynthesis. Mammalian physiology strictly utilizes the L-(S) form.',
    symmetryElements: ['C1 (No symmetry)'],
    stereocenters: [
      {
        atomIndex: 1,
        configuration: 'S',
        label: 'C2',
        substituents: [
          { atomIndex: 2, symbol: 'N', priority: 1, groupName: '-NH2 (Amino)', reason: 'N has highest atomic number (Z=7)' },
          { atomIndex: 3, symbol: 'C', priority: 2, groupName: '-COOH (Carboxyl)', reason: 'Carbon bonded to (O, O, O) phantom atoms' },
          { atomIndex: 0, symbol: 'C', priority: 3, groupName: '-CH3 (Methyl)', reason: 'Carbon bonded to (H, H, H)' },
          { atomIndex: 6, symbol: 'H', priority: 4, groupName: '-H (Hydrogen)', reason: 'Lowest atomic number (Z=1)' }
        ]
      }
    ],
    atoms: [
      // 0: C1 (methyl)
      { id: 0, symbol: 'C', x: -1.25, y: -0.62, z: -0.32, color: '#334155', radius: 1.70, label: 'C3' },
      // 1: C2 (chiral alpha-carbon)
      { id: 1, symbol: 'C', x: 0.00, y: 0.22, z: 0.00, color: '#334155', radius: 1.70, isChiralCenter: true, label: 'C2(S)' },
      // 2: N (amino) - Priority 1
      { id: 2, symbol: 'N', x: 0.06, y: 1.48, z: -0.73, color: '#3b82f6', radius: 1.55, cipPriority: 1, label: 'N(1)' },
      // 3: C (carboxyl) - Priority 2
      { id: 3, symbol: 'C', x: 1.28, y: -0.58, z: -0.22, color: '#334155', radius: 1.70, cipPriority: 2, label: 'C1(2)' },
      // 4: O (carbonyl =O)
      { id: 4, symbol: 'O', x: 1.34, y: -1.78, z: -0.05, color: '#ef4444', radius: 1.52, label: '=O' },
      // 5: O (hydroxyl -OH)
      { id: 5, symbol: 'O', x: 2.33, y: 0.16, z: -0.62, color: '#ef4444', radius: 1.52, label: '-OH' },
      // 6: H on C2 - Priority 4
      { id: 6, symbol: 'H', x: -0.05, y: 0.49, z: 1.06, color: '#f8fafc', radius: 1.20, cipPriority: 4, label: 'H(4)' },
      // 7: H on OH
      { id: 7, symbol: 'H', x: 3.12, y: -0.36, z: -0.75, color: '#f8fafc', radius: 1.20, label: 'H' },
      // 8, 9, 10: H on methyl
      { id: 8, symbol: 'H', x: -1.29, y: -1.54, z: 0.26, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 9, symbol: 'H', x: -2.12, y: -0.02, z: -0.07, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 10, symbol: 'H', x: -1.28, y: -0.90, z: -1.37, color: '#f8fafc', radius: 1.20, label: 'H' },
      // 11, 12: H on amino
      { id: 11, symbol: 'H', x: -0.77, y: 2.03, z: -0.57, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 12, symbol: 'H', x: 0.87, y: 2.03, z: -0.50, color: '#f8fafc', radius: 1.20, label: 'H' }
    ],
    bonds: [
      { id: 0, atom1: 1, atom2: 0, order: 1 },
      { id: 1, atom1: 1, atom2: 2, order: 1 },
      { id: 2, atom1: 1, atom2: 3, order: 1 },
      { id: 3, atom1: 1, atom2: 6, order: 1 },
      { id: 4, atom1: 3, atom2: 4, order: 2 },
      { id: 5, atom1: 3, atom2: 5, order: 1 },
      { id: 6, atom1: 5, atom2: 7, order: 1 },
      { id: 7, atom1: 0, atom2: 8, order: 1 },
      { id: 8, atom1: 0, atom2: 9, order: 1 },
      { id: 9, atom1: 0, atom2: 10, order: 1 },
      { id: 10, atom1: 2, atom2: 11, order: 1 },
      { id: 11, atom1: 2, atom2: 12, order: 1 }
    ]
  },

  // ==========================================
  // 2. D-ALANINE ((R)-2-aminopropanoic acid)
  // ==========================================
  {
    id: 'd-alanine',
    name: 'D-Alanine',
    iupacName: '(2R)-2-aminopropanoic acid',
    formula: 'C3H7NO2',
    molecularWeight: 89.094,
    smiles: 'C[C@H](N)C(=O)O',
    category: 'amino-acid',
    isChiral: true,
    stereocentersCount: 1,
    opticalRotation: '-14.5° (in 6M HCl)',
    description: 'The non-superimposable mirror image (enantiomer) of L-alanine. Possesses identical physical properties (melting point, solubility, IR spectra) but rotates plane-polarized light in the opposite direction (-14.5°).',
    enantiomerId: 'l-alanine',
    biologicalRelevance: 'Found in bacterial peptidoglycan cell walls. Antibiotics like cycloserine target D-alanine incorporation.',
    symmetryElements: ['C1 (No symmetry)'],
    stereocenters: [
      {
        atomIndex: 1,
        configuration: 'R',
        label: 'C2',
        substituents: [
          { atomIndex: 2, symbol: 'N', priority: 1, groupName: '-NH2 (Amino)', reason: 'N has highest atomic number (Z=7)' },
          { atomIndex: 3, symbol: 'C', priority: 2, groupName: '-COOH (Carboxyl)', reason: 'Carbon bonded to (O, O, O) phantom atoms' },
          { atomIndex: 0, symbol: 'C', priority: 3, groupName: '-CH3 (Methyl)', reason: 'Carbon bonded to (H, H, H)' },
          { atomIndex: 6, symbol: 'H', priority: 4, groupName: '-H (Hydrogen)', reason: 'Lowest atomic number (Z=1)' }
        ]
      }
    ],
    atoms: [
      // Exact mirror reflection across the X=0 plane
      { id: 0, symbol: 'C', x: 1.25, y: -0.62, z: -0.32, color: '#334155', radius: 1.70, label: 'C3' },
      { id: 1, symbol: 'C', x: 0.00, y: 0.22, z: 0.00, color: '#334155', radius: 1.70, isChiralCenter: true, label: 'C2(R)' },
      { id: 2, symbol: 'N', x: -0.06, y: 1.48, z: -0.73, color: '#3b82f6', radius: 1.55, cipPriority: 1, label: 'N(1)' },
      { id: 3, symbol: 'C', x: -1.28, y: -0.58, z: -0.22, color: '#334155', radius: 1.70, cipPriority: 2, label: 'C1(2)' },
      { id: 4, symbol: 'O', x: -1.34, y: -1.78, z: -0.05, color: '#ef4444', radius: 1.52, label: '=O' },
      { id: 5, symbol: 'O', x: -2.33, y: 0.16, z: -0.62, color: '#ef4444', radius: 1.52, label: '-OH' },
      { id: 6, symbol: 'H', x: 0.05, y: 0.49, z: 1.06, color: '#f8fafc', radius: 1.20, cipPriority: 4, label: 'H(4)' },
      { id: 7, symbol: 'H', x: -3.12, y: -0.36, z: -0.75, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 8, symbol: 'H', x: 1.29, y: -1.54, z: 0.26, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 9, symbol: 'H', x: 2.12, y: -0.02, z: -0.07, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 10, symbol: 'H', x: 1.28, y: -0.90, z: -1.37, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 11, symbol: 'H', x: 0.77, y: 2.03, z: -0.57, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 12, symbol: 'H', x: -0.87, y: 2.03, z: -0.50, color: '#f8fafc', radius: 1.20, label: 'H' }
    ],
    bonds: [
      { id: 0, atom1: 1, atom2: 0, order: 1 },
      { id: 1, atom1: 1, atom2: 2, order: 1 },
      { id: 2, atom1: 1, atom2: 3, order: 1 },
      { id: 3, atom1: 1, atom2: 6, order: 1 },
      { id: 4, atom1: 3, atom2: 4, order: 2 },
      { id: 5, atom1: 3, atom2: 5, order: 1 },
      { id: 6, atom1: 5, atom2: 7, order: 1 },
      { id: 7, atom1: 0, atom2: 8, order: 1 },
      { id: 8, atom1: 0, atom2: 9, order: 1 },
      { id: 9, atom1: 0, atom2: 10, order: 1 },
      { id: 10, atom1: 2, atom2: 11, order: 1 },
      { id: 11, atom1: 2, atom2: 12, order: 1 }
    ]
  },

  // ==========================================
  // 3. (S)-LACTIC ACID
  // ==========================================
  {
    id: 's-lactic-acid',
    name: '(S)-Lactic Acid',
    iupacName: '(2S)-2-hydroxypropanoic acid',
    formula: 'C3H6O3',
    molecularWeight: 90.078,
    smiles: 'C[C@@H](O)C(=O)O',
    category: 'hydroxy-acid',
    isChiral: true,
    stereocentersCount: 1,
    opticalRotation: '+3.82° (c=1, H2O)',
    description: 'The physiologically active form of lactic acid produced during human anaerobic glycolysis and muscle exertion. CIP Priorities at C2: -OH (1) > -COOH (2) > -CH3 (3) > -H (4).',
    enantiomerId: 'r-lactic-acid',
    biologicalRelevance: 'Produced in muscle tissue during anaerobic exercise; elevated in lactic acidosis.',
    symmetryElements: ['C1 (Asymmetric)'],
    stereocenters: [
      {
        atomIndex: 1,
        configuration: 'S',
        label: 'C2',
        substituents: [
          { atomIndex: 2, symbol: 'O', priority: 1, groupName: '-OH (Hydroxyl)', reason: 'Oxygen has atomic number Z=8' },
          { atomIndex: 3, symbol: 'C', priority: 2, groupName: '-COOH (Carboxyl)', reason: 'C bonded to (O, O, O)' },
          { atomIndex: 0, symbol: 'C', priority: 3, groupName: '-CH3 (Methyl)', reason: 'C bonded to (H, H, H)' },
          { atomIndex: 6, symbol: 'H', priority: 4, groupName: '-H (Hydrogen)', reason: 'Lowest atomic number Z=1' }
        ]
      }
    ],
    atoms: [
      { id: 0, symbol: 'C', x: -1.24, y: -0.62, z: -0.32, color: '#334155', radius: 1.70, cipPriority: 3, label: 'C3(3)' },
      { id: 1, symbol: 'C', x: 0.00, y: 0.22, z: 0.00, color: '#334155', radius: 1.70, isChiralCenter: true, label: 'C2(S)' },
      { id: 2, symbol: 'O', x: 0.06, y: 1.45, z: -0.73, color: '#ef4444', radius: 1.52, cipPriority: 1, label: 'OH(1)' },
      { id: 3, symbol: 'C', x: 1.28, y: -0.58, z: -0.22, color: '#334155', radius: 1.70, cipPriority: 2, label: 'C1(2)' },
      { id: 4, symbol: 'O', x: 1.34, y: -1.78, z: -0.05, color: '#ef4444', radius: 1.52, label: '=O' },
      { id: 5, symbol: 'O', x: 2.33, y: 0.16, z: -0.62, color: '#ef4444', radius: 1.52, label: '-OH' },
      { id: 6, symbol: 'H', x: -0.05, y: 0.49, z: 1.06, color: '#f8fafc', radius: 1.20, cipPriority: 4, label: 'H(4)' },
      { id: 7, symbol: 'H', x: 0.88, y: 1.95, z: -0.60, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 8, symbol: 'H', x: 3.12, y: -0.36, z: -0.75, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 9, symbol: 'H', x: -1.29, y: -1.54, z: 0.26, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 10, symbol: 'H', x: -2.12, y: -0.02, z: -0.07, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 11, symbol: 'H', x: -1.28, y: -0.90, z: -1.37, color: '#f8fafc', radius: 1.20, label: 'H' }
    ],
    bonds: [
      { id: 0, atom1: 1, atom2: 0, order: 1 },
      { id: 1, atom1: 1, atom2: 2, order: 1 },
      { id: 2, atom1: 1, atom2: 3, order: 1 },
      { id: 3, atom1: 1, atom2: 6, order: 1 },
      { id: 4, atom1: 2, atom2: 7, order: 1 },
      { id: 5, atom1: 3, atom2: 4, order: 2 },
      { id: 6, atom1: 3, atom2: 5, order: 1 },
      { id: 7, atom1: 5, atom2: 8, order: 1 },
      { id: 8, atom1: 0, atom2: 9, order: 1 },
      { id: 9, atom1: 0, atom2: 10, order: 1 },
      { id: 10, atom1: 0, atom2: 11, order: 1 }
    ]
  },

  // ==========================================
  // 4. (R)-LACTIC ACID
  // ==========================================
  {
    id: 'r-lactic-acid',
    name: '(R)-Lactic Acid',
    iupacName: '(2R)-2-hydroxypropanoic acid',
    formula: 'C3H6O3',
    molecularWeight: 90.078,
    smiles: 'C[C@H](O)C(=O)O',
    category: 'hydroxy-acid',
    isChiral: true,
    stereocentersCount: 1,
    opticalRotation: '-3.82° (c=1, H2O)',
    description: 'Enantiomer of natural L-lactic acid. Formed by certain bacteria (e.g. Lactobacillus delbrueckii) during fermentation.',
    enantiomerId: 's-lactic-acid',
    biologicalRelevance: 'Bacterial fermentation product; metabolized via different pathway than (S) in humans.',
    symmetryElements: ['C1'],
    stereocenters: [
      {
        atomIndex: 1,
        configuration: 'R',
        label: 'C2',
        substituents: [
          { atomIndex: 2, symbol: 'O', priority: 1, groupName: '-OH (Hydroxyl)', reason: 'Oxygen has atomic number Z=8' },
          { atomIndex: 3, symbol: 'C', priority: 2, groupName: '-COOH (Carboxyl)', reason: 'C bonded to (O, O, O)' },
          { atomIndex: 0, symbol: 'C', priority: 3, groupName: '-CH3 (Methyl)', reason: 'C bonded to (H, H, H)' },
          { atomIndex: 6, symbol: 'H', priority: 4, groupName: '-H (Hydrogen)', reason: 'Lowest atomic number Z=1' }
        ]
      }
    ],
    atoms: [
      { id: 0, symbol: 'C', x: 1.24, y: -0.62, z: -0.32, color: '#334155', radius: 1.70, cipPriority: 3, label: 'C3(3)' },
      { id: 1, symbol: 'C', x: 0.00, y: 0.22, z: 0.00, color: '#334155', radius: 1.70, isChiralCenter: true, label: 'C2(R)' },
      { id: 2, symbol: 'O', x: -0.06, y: 1.45, z: -0.73, color: '#ef4444', radius: 1.52, cipPriority: 1, label: 'OH(1)' },
      { id: 3, symbol: 'C', x: -1.28, y: -0.58, z: -0.22, color: '#334155', radius: 1.70, cipPriority: 2, label: 'C1(2)' },
      { id: 4, symbol: 'O', x: -1.34, y: -1.78, z: -0.05, color: '#ef4444', radius: 1.52, label: '=O' },
      { id: 5, symbol: 'O', x: -2.33, y: 0.16, z: -0.62, color: '#ef4444', radius: 1.52, label: '-OH' },
      { id: 6, symbol: 'H', x: 0.05, y: 0.49, z: 1.06, color: '#f8fafc', radius: 1.20, cipPriority: 4, label: 'H(4)' },
      { id: 7, symbol: 'H', x: -0.88, y: 1.95, z: -0.60, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 8, symbol: 'H', x: -3.12, y: -0.36, z: -0.75, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 9, symbol: 'H', x: 1.29, y: -1.54, z: 0.26, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 10, symbol: 'H', x: 2.12, y: -0.02, z: -0.07, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 11, symbol: 'H', x: 1.28, y: -0.90, z: -1.37, color: '#f8fafc', radius: 1.20, label: 'H' }
    ],
    bonds: [
      { id: 0, atom1: 1, atom2: 0, order: 1 },
      { id: 1, atom1: 1, atom2: 2, order: 1 },
      { id: 2, atom1: 1, atom2: 3, order: 1 },
      { id: 3, atom1: 1, atom2: 6, order: 1 },
      { id: 4, atom1: 2, atom2: 7, order: 1 },
      { id: 5, atom1: 3, atom2: 4, order: 2 },
      { id: 6, atom1: 3, atom2: 5, order: 1 },
      { id: 7, atom1: 5, atom2: 8, order: 1 },
      { id: 8, atom1: 0, atom2: 9, order: 1 },
      { id: 9, atom1: 0, atom2: 10, order: 1 },
      { id: 10, atom1: 0, atom2: 11, order: 1 }
    ]
  },

  // ==========================================
  // 5. (2R)-2-BUTANOL
  // ==========================================
  {
    id: '2r-butanol',
    name: '(2R)-2-Butanol',
    iupacName: '(2R)-butan-2-ol',
    formula: 'C4H10O',
    molecularWeight: 74.122,
    smiles: 'CC[C@H](O)C',
    category: 'alcohol',
    isChiral: true,
    stereocentersCount: 1,
    opticalRotation: '-13.5° (neat)',
    description: 'Chiral secondary alcohol. The stereocenter C2 has substituents: -OH (1), -CH2CH3 ethyl (2), -CH3 methyl (3), and -H (4). Tie-breaking between ethyl and methyl: ethyl C is bonded to (C, H, H) whereas methyl C is bonded to (H, H, H), giving ethyl higher CIP priority.',
    enantiomerId: '2s-butanol',
    biologicalRelevance: 'Model secondary alcohol for demonstrating asymmetric organic synthesis and lipase resolution.',
    stereocenters: [
      {
        atomIndex: 1,
        configuration: 'R',
        label: 'C2',
        substituents: [
          { atomIndex: 4, symbol: 'O', priority: 1, groupName: '-OH (Hydroxyl)', reason: 'Z=8' },
          { atomIndex: 2, symbol: 'C', priority: 2, groupName: '-CH2CH3 (Ethyl)', reason: 'C bonded to (C, H, H)' },
          { atomIndex: 0, symbol: 'C', priority: 3, groupName: '-CH3 (Methyl)', reason: 'C bonded to (H, H, H)' },
          { atomIndex: 5, symbol: 'H', priority: 4, groupName: '-H (Hydrogen)', reason: 'Z=1' }
        ]
      }
    ],
    atoms: [
      { id: 0, symbol: 'C', x: 1.24, y: -0.65, z: -0.30, color: '#334155', radius: 1.70, cipPriority: 3, label: 'C1(3)' },
      { id: 1, symbol: 'C', x: 0.00, y: 0.20, z: 0.00, color: '#334155', radius: 1.70, isChiralCenter: true, label: 'C2(R)' },
      { id: 2, symbol: 'C', x: -1.25, y: -0.65, z: 0.15, color: '#334155', radius: 1.70, cipPriority: 2, label: 'C3(2)' },
      { id: 3, symbol: 'C', x: -2.50, y: 0.20, z: -0.15, color: '#334155', radius: 1.70, label: 'C4' },
      { id: 4, symbol: 'O', x: 0.10, y: 1.35, z: -0.85, color: '#ef4444', radius: 1.52, cipPriority: 1, label: 'OH(1)' },
      { id: 5, symbol: 'H', x: 0.00, y: 0.55, z: 1.05, color: '#f8fafc', radius: 1.20, cipPriority: 4, label: 'H(4)' },
      { id: 6, symbol: 'H', x: -0.70, y: 1.88, z: -0.85, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 7, symbol: 'H', x: 1.25, y: -1.55, z: 0.30, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 8, symbol: 'H', x: 2.12, y: -0.05, z: -0.15, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 9, symbol: 'H', x: 1.25, y: -0.95, z: -1.35, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 10, symbol: 'H', x: -1.25, y: -1.50, z: -0.55, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 11, symbol: 'H', x: -1.25, y: -1.05, z: 1.15, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 12, symbol: 'H', x: -3.40, y: -0.40, z: -0.05, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 13, symbol: 'H', x: -2.50, y: 1.05, z: 0.55, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 14, symbol: 'H', x: -2.55, y: 0.60, z: -1.15, color: '#f8fafc', radius: 1.20, label: 'H' }
    ],
    bonds: [
      { id: 0, atom1: 1, atom2: 0, order: 1 },
      { id: 1, atom1: 1, atom2: 2, order: 1 },
      { id: 2, atom1: 1, atom2: 4, order: 1 },
      { id: 3, atom1: 1, atom2: 5, order: 1 },
      { id: 4, atom1: 2, atom2: 3, order: 1 },
      { id: 5, atom1: 4, atom2: 6, order: 1 },
      { id: 6, atom1: 0, atom2: 7, order: 1 },
      { id: 7, atom1: 0, atom2: 8, order: 1 },
      { id: 8, atom1: 0, atom2: 9, order: 1 },
      { id: 9, atom1: 2, atom2: 10, order: 1 },
      { id: 10, atom1: 2, atom2: 11, order: 1 },
      { id: 11, atom1: 3, atom2: 12, order: 1 },
      { id: 12, atom1: 3, atom2: 13, order: 1 },
      { id: 13, atom1: 3, atom2: 14, order: 1 }
    ]
  },

  // ==========================================
  // 6. (2S)-2-BUTANOL
  // ==========================================
  {
    id: '2s-butanol',
    name: '(2S)-2-Butanol',
    iupacName: '(2S)-butan-2-ol',
    formula: 'C4H10O',
    molecularWeight: 74.122,
    smiles: 'CC[C@@H](O)C',
    category: 'alcohol',
    isChiral: true,
    stereocentersCount: 1,
    opticalRotation: '+13.5° (neat)',
    description: 'Enantiomer of (2R)-2-butanol. Has the (S) configuration at C2 and rotates polarized light in the positive (+) dextrorotatory direction.',
    enantiomerId: '2r-butanol',
    stereocenters: [
      {
        atomIndex: 1,
        configuration: 'S',
        label: 'C2',
        substituents: [
          { atomIndex: 4, symbol: 'O', priority: 1, groupName: '-OH (Hydroxyl)', reason: 'Z=8' },
          { atomIndex: 2, symbol: 'C', priority: 2, groupName: '-CH2CH3 (Ethyl)', reason: 'C bonded to (C, H, H)' },
          { atomIndex: 0, symbol: 'C', priority: 3, groupName: '-CH3 (Methyl)', reason: 'C bonded to (H, H, H)' },
          { atomIndex: 5, symbol: 'H', priority: 4, groupName: '-H (Hydrogen)', reason: 'Z=1' }
        ]
      }
    ],
    atoms: [
      { id: 0, symbol: 'C', x: -1.24, y: -0.65, z: -0.30, color: '#334155', radius: 1.70, cipPriority: 3, label: 'C1(3)' },
      { id: 1, symbol: 'C', x: 0.00, y: 0.20, z: 0.00, color: '#334155', radius: 1.70, isChiralCenter: true, label: 'C2(S)' },
      { id: 2, symbol: 'C', x: 1.25, y: -0.65, z: 0.15, color: '#334155', radius: 1.70, cipPriority: 2, label: 'C3(2)' },
      { id: 3, symbol: 'C', x: 2.50, y: 0.20, z: -0.15, color: '#334155', radius: 1.70, label: 'C4' },
      { id: 4, symbol: 'O', x: -0.10, y: 1.35, z: -0.85, color: '#ef4444', radius: 1.52, cipPriority: 1, label: 'OH(1)' },
      { id: 5, symbol: 'H', x: 0.00, y: 0.55, z: 1.05, color: '#f8fafc', radius: 1.20, cipPriority: 4, label: 'H(4)' },
      { id: 6, symbol: 'H', x: 0.70, y: 1.88, z: -0.85, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 7, symbol: 'H', x: -1.25, y: -1.55, z: 0.30, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 8, symbol: 'H', x: -2.12, y: -0.05, z: -0.15, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 9, symbol: 'H', x: -1.25, y: -0.95, z: -1.35, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 10, symbol: 'H', x: 1.25, y: -1.50, z: -0.55, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 11, symbol: 'H', x: 1.25, y: -1.05, z: 1.15, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 12, symbol: 'H', x: 3.40, y: -0.40, z: -0.05, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 13, symbol: 'H', x: 2.50, y: 1.05, z: 0.55, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 14, symbol: 'H', x: 2.55, y: 0.60, z: -1.15, color: '#f8fafc', radius: 1.20, label: 'H' }
    ],
    bonds: [
      { id: 0, atom1: 1, atom2: 0, order: 1 },
      { id: 1, atom1: 1, atom2: 2, order: 1 },
      { id: 2, atom1: 1, atom2: 4, order: 1 },
      { id: 3, atom1: 1, atom2: 5, order: 1 },
      { id: 4, atom1: 2, atom2: 3, order: 1 },
      { id: 5, atom1: 4, atom2: 6, order: 1 },
      { id: 6, atom1: 0, atom2: 7, order: 1 },
      { id: 7, atom1: 0, atom2: 8, order: 1 },
      { id: 8, atom1: 0, atom2: 9, order: 1 },
      { id: 9, atom1: 2, atom2: 10, order: 1 },
      { id: 10, atom1: 2, atom2: 11, order: 1 },
      { id: 11, atom1: 3, atom2: 12, order: 1 },
      { id: 12, atom1: 3, atom2: 13, order: 1 },
      { id: 13, atom1: 3, atom2: 14, order: 1 }
    ]
  },

  // ==========================================
  // 7. 2-BUTANONE (Achiral Ketone Control)
  // ==========================================
  {
    id: '2-butanone',
    name: '2-Butanone (Achiral)',
    iupacName: 'butan-2-one',
    formula: 'C4H8O',
    molecularWeight: 72.106,
    smiles: 'CCC(=O)C',
    category: 'ketone',
    isChiral: false,
    stereocentersCount: 0,
    opticalRotation: '0.0° (Optically Inactive)',
    description: 'Serves as an essential achiral reference/control molecule. The carbonyl carbon (C2) is sp2 hybridized with trigonal planar geometry ($120^\\circ$ bond angles), lacking 4 different substituents and possessing an internal plane of symmetry coincident with the carbonyl plane.',
    symmetryElements: ['Plane of symmetry (σ)'],
    stereocenters: [],
    atoms: [
      { id: 0, symbol: 'C', x: -1.35, y: -0.65, z: 0.00, color: '#334155', radius: 1.70, label: 'C1' },
      { id: 1, symbol: 'C', x: 0.00, y: 0.05, z: 0.00, color: '#334155', radius: 1.70, label: 'C2(sp2)' },
      { id: 2, symbol: 'O', x: 0.15, y: 1.25, z: 0.00, color: '#ef4444', radius: 1.52, label: '=O' },
      { id: 3, symbol: 'C', x: 1.20, y: -0.85, z: 0.00, color: '#334155', radius: 1.70, label: 'C3' },
      { id: 4, symbol: 'C', x: 2.55, y: -0.15, z: 0.00, color: '#334155', radius: 1.70, label: 'C4' },
      { id: 5, symbol: 'H', x: -1.45, y: -1.30, z: 0.88, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 6, symbol: 'H', x: -1.45, y: -1.30, z: -0.88, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 7, symbol: 'H', x: -2.15, y: 0.08, z: 0.00, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 8, symbol: 'H', x: 1.15, y: -1.50, z: 0.88, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 9, symbol: 'H', x: 1.15, y: -1.50, z: -0.88, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 10, symbol: 'H', x: 3.38, y: -0.85, z: 0.00, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 11, symbol: 'H', x: 2.65, y: 0.50, z: 0.88, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 12, symbol: 'H', x: 2.65, y: 0.50, z: -0.88, color: '#f8fafc', radius: 1.20, label: 'H' }
    ],
    bonds: [
      { id: 0, atom1: 1, atom2: 0, order: 1 },
      { id: 1, atom1: 1, atom2: 2, order: 2 },
      { id: 2, atom1: 1, atom2: 3, order: 1 },
      { id: 3, atom1: 3, atom2: 4, order: 1 },
      { id: 4, atom1: 0, atom2: 5, order: 1 },
      { id: 5, atom1: 0, atom2: 6, order: 1 },
      { id: 6, atom1: 0, atom2: 7, order: 1 },
      { id: 7, atom1: 3, atom2: 8, order: 1 },
      { id: 8, atom1: 3, atom2: 9, order: 1 },
      { id: 9, atom1: 4, atom2: 10, order: 1 },
      { id: 10, atom1: 4, atom2: 11, order: 1 },
      { id: 11, atom1: 4, atom2: 12, order: 1 }
    ]
  },

  // ==========================================
  // 8. MESO-TARTARIC ACID ((2R,3S)-tartaric acid)
  // ==========================================
  {
    id: 'meso-tartaric-acid',
    name: 'Meso-Tartaric Acid',
    iupacName: '(2R,3S)-2,3-dihydroxybutanedioic acid',
    formula: 'C4H6O6',
    molecularWeight: 150.087,
    smiles: 'O=C(O)[C@@H](O)[C@H](O)C(=O)O',
    category: 'dicarboxylic',
    isChiral: false,
    isMeso: true,
    stereocentersCount: 2,
    opticalRotation: '0.0° (Internal Compensation)',
    description: 'The textbook example of a meso compound. Although it possesses two stereogenic centers (C2 is R, C3 is S), it has an internal plane of symmetry (σ) bisecting the central C2-C3 bond in its eclipsed/Fischer conformation. Consequently, the rotation of light caused by C2 is exactly canceled by the opposite rotation of C3.',
    diastereomerIds: ['2r-3r-tartaric-acid', '2s-3s-tartaric-acid'],
    symmetryElements: ['Internal Plane of Symmetry (σ)', 'Inversion Center in anti conformation (i)'],
    stereocenters: [
      {
        atomIndex: 1,
        configuration: 'R',
        label: 'C2',
        substituents: [
          { atomIndex: 3, symbol: 'O', priority: 1, groupName: '-OH (Hydroxyl)', reason: 'Z=8' },
          { atomIndex: 2, symbol: 'C', priority: 2, groupName: '-CH(OH)COOH', reason: 'C bonded to (O, C, H)' },
          { atomIndex: 0, symbol: 'C', priority: 3, groupName: '-COOH', reason: 'C bonded to (O, O, O)' },
          { atomIndex: 4, symbol: 'H', priority: 4, groupName: '-H', reason: 'Z=1' }
        ]
      },
      {
        atomIndex: 2,
        configuration: 'S',
        label: 'C3',
        substituents: [
          { atomIndex: 7, symbol: 'O', priority: 1, groupName: '-OH (Hydroxyl)', reason: 'Z=8' },
          { atomIndex: 1, symbol: 'C', priority: 2, groupName: '-CH(OH)COOH', reason: 'C bonded to (O, C, H)' },
          { atomIndex: 5, symbol: 'C', priority: 3, groupName: '-COOH', reason: 'C bonded to (O, O, O)' },
          { atomIndex: 8, symbol: 'H', priority: 4, groupName: '-H', reason: 'Z=1' }
        ]
      }
    ],
    atoms: [
      // Symmetrical coordinates across the Y=0 plane
      { id: 0, symbol: 'C', x: -1.75, y: 1.25, z: 0.00, color: '#334155', radius: 1.70, label: 'C1(COOH)' },
      { id: 1, symbol: 'C', x: -0.75, y: 0.00, z: 0.00, color: '#334155', radius: 1.70, isChiralCenter: true, label: 'C2(2R)' },
      { id: 2, symbol: 'C', x: 0.75, y: 0.00, z: 0.00, color: '#334155', radius: 1.70, isChiralCenter: true, label: 'C3(3S)' },
      { id: 3, symbol: 'O', x: -1.15, y: -0.90, z: 1.05, color: '#ef4444', radius: 1.52, label: 'OH(2)' },
      { id: 4, symbol: 'H', x: -0.85, y: -0.55, z: -0.95, color: '#f8fafc', radius: 1.20, label: 'H(2)' },
      { id: 5, symbol: 'C', x: 1.75, y: 1.25, z: 0.00, color: '#334155', radius: 1.70, label: 'C4(COOH)' },
      { id: 6, symbol: 'O', x: -2.95, y: 1.15, z: 0.00, color: '#ef4444', radius: 1.52, label: '=O' },
      { id: 7, symbol: 'O', x: 1.15, y: -0.90, z: 1.05, color: '#ef4444', radius: 1.52, label: 'OH(3)' },
      { id: 8, symbol: 'H', x: 0.85, y: -0.55, z: -0.95, color: '#f8fafc', radius: 1.20, label: 'H(3)' },
      { id: 9, symbol: 'O', x: -1.10, y: 2.45, z: 0.00, color: '#ef4444', radius: 1.52, label: '-OH' },
      { id: 10, symbol: 'O', x: 2.95, y: 1.15, z: 0.00, color: '#ef4444', radius: 1.52, label: '=O' },
      { id: 11, symbol: 'O', x: 1.10, y: 2.45, z: 0.00, color: '#ef4444', radius: 1.52, label: '-OH' },
      { id: 12, symbol: 'H', x: -1.75, y: 3.15, z: 0.00, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 13, symbol: 'H', x: 1.75, y: 3.15, z: 0.00, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 14, symbol: 'H', x: -2.05, y: -1.25, z: 0.95, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 15, symbol: 'H', x: 2.05, y: -1.25, z: 0.95, color: '#f8fafc', radius: 1.20, label: 'H' }
    ],
    bonds: [
      { id: 0, atom1: 0, atom2: 1, order: 1 },
      { id: 1, atom1: 1, atom2: 2, order: 1 },
      { id: 2, atom1: 1, atom2: 3, order: 1 },
      { id: 3, atom1: 1, atom2: 4, order: 1 },
      { id: 4, atom1: 2, atom2: 5, order: 1 },
      { id: 5, atom1: 2, atom2: 7, order: 1 },
      { id: 6, atom1: 2, atom2: 8, order: 1 },
      { id: 7, atom1: 0, atom2: 6, order: 2 },
      { id: 8, atom1: 0, atom2: 9, order: 1 },
      { id: 9, atom1: 5, atom2: 10, order: 2 },
      { id: 10, atom1: 5, atom2: 11, order: 1 },
      { id: 11, atom1: 9, atom2: 12, order: 1 },
      { id: 12, atom1: 11, atom2: 13, order: 1 },
      { id: 13, atom1: 3, atom2: 14, order: 1 },
      { id: 14, atom1: 7, atom2: 15, order: 1 }
    ]
  },

  // ==========================================
  // 9. (2R,3R)-TARTARIC ACID (Dextrorotatory)
  // ==========================================
  {
    id: '2r-3r-tartaric-acid',
    name: '(+)-(2R,3R)-Tartaric Acid',
    iupacName: '(2R,3R)-2,3-dihydroxybutanedioic acid',
    formula: 'C4H6O6',
    molecularWeight: 150.087,
    smiles: 'O=C(O)[C@@H](O)[C@@H](O)C(=O)O',
    category: 'dicarboxylic',
    isChiral: true,
    stereocentersCount: 2,
    opticalRotation: '+12.4° (c=5, H2O)',
    description: 'Chiral enantiomer of tartaric acid with C2 symmetry. Historical molecule studied by Louis Pasteur in 1848 when he manually separated racemic sodium ammonium tartrate crystals under a microscope.',
    enantiomerId: '2s-3s-tartaric-acid',
    diastereomerIds: ['meso-tartaric-acid'],
    symmetryElements: ['C2 Axis of Symmetry'],
    stereocenters: [
      {
        atomIndex: 1,
        configuration: 'R',
        label: 'C2',
        substituents: [
          { atomIndex: 3, symbol: 'O', priority: 1, groupName: '-OH', reason: 'Z=8' },
          { atomIndex: 2, symbol: 'C', priority: 2, groupName: '-CH(OH)COOH', reason: 'C(O,C,H)' },
          { atomIndex: 0, symbol: 'C', priority: 3, groupName: '-COOH', reason: 'C(O,O,O)' },
          { atomIndex: 4, symbol: 'H', priority: 4, groupName: '-H', reason: 'Z=1' }
        ]
      },
      {
        atomIndex: 2,
        configuration: 'R',
        label: 'C3',
        substituents: [
          { atomIndex: 7, symbol: 'O', priority: 1, groupName: '-OH', reason: 'Z=8' },
          { atomIndex: 1, symbol: 'C', priority: 2, groupName: '-CH(OH)COOH', reason: 'C(O,C,H)' },
          { atomIndex: 5, symbol: 'C', priority: 3, groupName: '-COOH', reason: 'C(O,O,O)' },
          { atomIndex: 8, symbol: 'H', priority: 4, groupName: '-H', reason: 'Z=1' }
        ]
      }
    ],
    atoms: [
      { id: 0, symbol: 'C', x: -1.75, y: 1.25, z: 0.00, color: '#334155', radius: 1.70, label: 'C1' },
      { id: 1, symbol: 'C', x: -0.75, y: 0.00, z: 0.00, color: '#334155', radius: 1.70, isChiralCenter: true, label: 'C2(2R)' },
      { id: 2, symbol: 'C', x: 0.75, y: 0.00, z: 0.00, color: '#334155', radius: 1.70, isChiralCenter: true, label: 'C3(3R)' },
      { id: 3, symbol: 'O', x: -1.15, y: -0.90, z: 1.05, color: '#ef4444', radius: 1.52, label: 'OH(2)' },
      { id: 4, symbol: 'H', x: -0.85, y: -0.55, z: -0.95, color: '#f8fafc', radius: 1.20, label: 'H(2)' },
      { id: 5, symbol: 'C', x: 1.75, y: 1.25, z: 0.00, color: '#334155', radius: 1.70, label: 'C4' },
      { id: 6, symbol: 'O', x: -2.95, y: 1.15, z: 0.00, color: '#ef4444', radius: 1.52, label: '=O' },
      { id: 7, symbol: 'O', x: 1.15, y: -0.90, z: -1.05, color: '#ef4444', radius: 1.52, label: 'OH(3)' },
      { id: 8, symbol: 'H', x: 0.85, y: -0.55, z: 0.95, color: '#f8fafc', radius: 1.20, label: 'H(3)' },
      { id: 9, symbol: 'O', x: -1.10, y: 2.45, z: 0.00, color: '#ef4444', radius: 1.52, label: '-OH' },
      { id: 10, symbol: 'O', x: 2.95, y: 1.15, z: 0.00, color: '#ef4444', radius: 1.52, label: '=O' },
      { id: 11, symbol: 'O', x: 1.10, y: 2.45, z: 0.00, color: '#ef4444', radius: 1.52, label: '-OH' },
      { id: 12, symbol: 'H', x: -1.75, y: 3.15, z: 0.00, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 13, symbol: 'H', x: 1.75, y: 3.15, z: 0.00, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 14, symbol: 'H', x: -2.05, y: -1.25, z: 0.95, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 15, symbol: 'H', x: 2.05, y: -1.25, z: -0.95, color: '#f8fafc', radius: 1.20, label: 'H' }
    ],
    bonds: [
      { id: 0, atom1: 0, atom2: 1, order: 1 },
      { id: 1, atom1: 1, atom2: 2, order: 1 },
      { id: 2, atom1: 1, atom2: 3, order: 1 },
      { id: 3, atom1: 1, atom2: 4, order: 1 },
      { id: 4, atom1: 2, atom2: 5, order: 1 },
      { id: 5, atom1: 2, atom2: 7, order: 1 },
      { id: 6, atom1: 2, atom2: 8, order: 1 },
      { id: 7, atom1: 0, atom2: 6, order: 2 },
      { id: 8, atom1: 0, atom2: 9, order: 1 },
      { id: 9, atom1: 5, atom2: 10, order: 2 },
      { id: 10, atom1: 5, atom2: 11, order: 1 },
      { id: 11, atom1: 9, atom2: 12, order: 1 },
      { id: 12, atom1: 11, atom2: 13, order: 1 },
      { id: 13, atom1: 3, atom2: 14, order: 1 },
      { id: 14, atom1: 7, atom2: 15, order: 1 }
    ]
  },

  // ==========================================
  // 10. (2S,3S)-TARTARIC ACID (Levorotatory)
  // ==========================================
  {
    id: '2s-3s-tartaric-acid',
    name: '(-)-(2S,3S)-Tartaric Acid',
    iupacName: '(2S,3S)-2,3-dihydroxybutanedioic acid',
    formula: 'C4H6O6',
    molecularWeight: 150.087,
    smiles: 'O=C(O)[C@H](O)[C@H](O)C(=O)O',
    category: 'dicarboxylic',
    isChiral: true,
    stereocentersCount: 2,
    opticalRotation: '-12.4° (c=5, H2O)',
    description: 'Enantiomer of (+)-(2R,3R)-tartaric acid and diastereomer of meso-tartaric acid. Inverts both stereocenters from (R,R) to (S,S).',
    enantiomerId: '2r-3r-tartaric-acid',
    diastereomerIds: ['meso-tartaric-acid'],
    symmetryElements: ['C2 Axis of Symmetry'],
    stereocenters: [
      {
        atomIndex: 1,
        configuration: 'S',
        label: 'C2',
        substituents: [
          { atomIndex: 3, symbol: 'O', priority: 1, groupName: '-OH', reason: 'Z=8' },
          { atomIndex: 2, symbol: 'C', priority: 2, groupName: '-CH(OH)COOH', reason: 'C(O,C,H)' },
          { atomIndex: 0, symbol: 'C', priority: 3, groupName: '-COOH', reason: 'C(O,O,O)' },
          { atomIndex: 4, symbol: 'H', priority: 4, groupName: '-H', reason: 'Z=1' }
        ]
      },
      {
        atomIndex: 2,
        configuration: 'S',
        label: 'C3',
        substituents: [
          { atomIndex: 7, symbol: 'O', priority: 1, groupName: '-OH', reason: 'Z=8' },
          { atomIndex: 1, symbol: 'C', priority: 2, groupName: '-CH(OH)COOH', reason: 'C(O,C,H)' },
          { atomIndex: 5, symbol: 'C', priority: 3, groupName: '-COOH', reason: 'C(O,O,O)' },
          { atomIndex: 8, symbol: 'H', priority: 4, groupName: '-H', reason: 'Z=1' }
        ]
      }
    ],
    atoms: [
      { id: 0, symbol: 'C', x: -1.75, y: 1.25, z: 0.00, color: '#334155', radius: 1.70, label: 'C1' },
      { id: 1, symbol: 'C', x: -0.75, y: 0.00, z: 0.00, color: '#334155', radius: 1.70, isChiralCenter: true, label: 'C2(2S)' },
      { id: 2, symbol: 'C', x: 0.75, y: 0.00, z: 0.00, color: '#334155', radius: 1.70, isChiralCenter: true, label: 'C3(3S)' },
      { id: 3, symbol: 'O', x: -1.15, y: -0.90, z: -1.05, color: '#ef4444', radius: 1.52, label: 'OH(2)' },
      { id: 4, symbol: 'H', x: -0.85, y: -0.55, z: 0.95, color: '#f8fafc', radius: 1.20, label: 'H(2)' },
      { id: 5, symbol: 'C', x: 1.75, y: 1.25, z: 0.00, color: '#334155', radius: 1.70, label: 'C4' },
      { id: 6, symbol: 'O', x: -2.95, y: 1.15, z: 0.00, color: '#ef4444', radius: 1.52, label: '=O' },
      { id: 7, symbol: 'O', x: 1.15, y: -0.90, z: 1.05, color: '#ef4444', radius: 1.52, label: 'OH(3)' },
      { id: 8, symbol: 'H', x: 0.85, y: -0.55, z: -0.95, color: '#f8fafc', radius: 1.20, label: 'H(3)' },
      { id: 9, symbol: 'O', x: -1.10, y: 2.45, z: 0.00, color: '#ef4444', radius: 1.52, label: '-OH' },
      { id: 10, symbol: 'O', x: 2.95, y: 1.15, z: 0.00, color: '#ef4444', radius: 1.52, label: '=O' },
      { id: 11, symbol: 'O', x: 1.10, y: 2.45, z: 0.00, color: '#ef4444', radius: 1.52, label: '-OH' },
      { id: 12, symbol: 'H', x: -1.75, y: 3.15, z: 0.00, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 13, symbol: 'H', x: 1.75, y: 3.15, z: 0.00, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 14, symbol: 'H', x: -2.05, y: -1.25, z: -0.95, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 15, symbol: 'H', x: 2.05, y: -1.25, z: 0.95, color: '#f8fafc', radius: 1.20, label: 'H' }
    ],
    bonds: [
      { id: 0, atom1: 0, atom2: 1, order: 1 },
      { id: 1, atom1: 1, atom2: 2, order: 1 },
      { id: 2, atom1: 1, atom2: 3, order: 1 },
      { id: 3, atom1: 1, atom2: 4, order: 1 },
      { id: 4, atom1: 2, atom2: 5, order: 1 },
      { id: 5, atom1: 2, atom2: 7, order: 1 },
      { id: 6, atom1: 2, atom2: 8, order: 1 },
      { id: 7, atom1: 0, atom2: 6, order: 2 },
      { id: 8, atom1: 0, atom2: 9, order: 1 },
      { id: 9, atom1: 5, atom2: 10, order: 2 },
      { id: 10, atom1: 5, atom2: 11, order: 1 },
      { id: 11, atom1: 9, atom2: 12, order: 1 },
      { id: 12, atom1: 11, atom2: 13, order: 1 },
      { id: 13, atom1: 3, atom2: 14, order: 1 },
      { id: 14, atom1: 7, atom2: 15, order: 1 }
    ]
  },

  // ==========================================
  // 11. BROMOCHLOROFLUOROMETHANE (R enantiomer)
  // ==========================================
  {
    id: 'r-bromochlorofluoromethane',
    name: '(R)-Bromochlorofluoromethane',
    iupacName: '(1R)-bromo-chloro-fluoromethane',
    formula: 'CHBrClF',
    molecularWeight: 147.373,
    smiles: 'F[C@@H](Cl)Br',
    category: 'haloalkane',
    isChiral: true,
    stereocentersCount: 1,
    opticalRotation: 'Optically Active',
    description: 'The prototypical textbook chiral molecule with 4 different single atoms directly bonded to a single tetrahedral carbon atom. Ideal for demonstrating CIP priority assignment without the complication of multi-atom substituent chains.',
    enantiomerId: 's-bromochlorofluoromethane',
    symmetryElements: ['C1'],
    stereocenters: [
      {
        atomIndex: 0,
        configuration: 'R',
        label: 'C1',
        substituents: [
          { atomIndex: 1, symbol: 'Br', priority: 1, groupName: 'Bromine', reason: 'Highest atomic number (Z=35)' },
          { atomIndex: 2, symbol: 'Cl', priority: 2, groupName: 'Chlorine', reason: 'Atomic number (Z=17)' },
          { atomIndex: 3, symbol: 'F',  priority: 3, groupName: 'Fluorine', reason: 'Atomic number (Z=9)' },
          { atomIndex: 4, symbol: 'H',  priority: 4, groupName: 'Hydrogen', reason: 'Lowest atomic number (Z=1)' }
        ]
      }
    ],
    atoms: [
      { id: 0, symbol: 'C', x: 0.00, y: 0.00, z: 0.00, color: '#334155', radius: 1.70, isChiralCenter: true, label: 'C(R)' },
      { id: 1, symbol: 'Br', x: 0.00, y: 1.94, z: 0.00, color: '#b45309', radius: 1.85, cipPriority: 1, label: 'Br(1)' },
      { id: 2, symbol: 'Cl', x: 1.67, y: -0.60, z: 0.00, color: '#22c55e', radius: 1.75, cipPriority: 2, label: 'Cl(2)' },
      { id: 3, symbol: 'F',  x: -0.83, y: -0.60, z: 1.18, color: '#06b6d4', radius: 1.47, cipPriority: 3, label: 'F(3)' },
      { id: 4, symbol: 'H',  x: -0.83, y: -0.60, z: -1.18, color: '#f8fafc', radius: 1.20, cipPriority: 4, label: 'H(4)' }
    ],
    bonds: [
      { id: 0, atom1: 0, atom2: 1, order: 1 },
      { id: 1, atom1: 0, atom2: 2, order: 1 },
      { id: 2, atom1: 0, atom2: 3, order: 1 },
      { id: 3, atom1: 0, atom2: 4, order: 1 }
    ]
  },

  // ==========================================
  // 12. BROMOCHLOROFLUOROMETHANE (S enantiomer)
  // ==========================================
  {
    id: 's-bromochlorofluoromethane',
    name: '(S)-Bromochlorofluoromethane',
    iupacName: '(1S)-bromo-chloro-fluoromethane',
    formula: 'CHBrClF',
    molecularWeight: 147.373,
    smiles: 'F[C@H](Cl)Br',
    category: 'haloalkane',
    isChiral: true,
    stereocentersCount: 1,
    opticalRotation: 'Optically Active',
    description: 'Enantiomer of (R)-bromochlorofluoromethane. Viewing down the C-H bond (priority 4 into page), priorities 1(Br) -> 2(Cl) -> 3(F) turn counter-clockwise (Sinister).',
    enantiomerId: 'r-bromochlorofluoromethane',
    symmetryElements: ['C1'],
    stereocenters: [
      {
        atomIndex: 0,
        configuration: 'S',
        label: 'C1',
        substituents: [
          { atomIndex: 1, symbol: 'Br', priority: 1, groupName: 'Bromine', reason: 'Highest atomic number (Z=35)' },
          { atomIndex: 2, symbol: 'Cl', priority: 2, groupName: 'Chlorine', reason: 'Atomic number (Z=17)' },
          { atomIndex: 3, symbol: 'F',  priority: 3, groupName: 'Fluorine', reason: 'Atomic number (Z=9)' },
          { atomIndex: 4, symbol: 'H',  priority: 4, groupName: 'Hydrogen', reason: 'Lowest atomic number (Z=1)' }
        ]
      }
    ],
    atoms: [
      { id: 0, symbol: 'C', x: 0.00, y: 0.00, z: 0.00, color: '#334155', radius: 1.70, isChiralCenter: true, label: 'C(S)' },
      { id: 1, symbol: 'Br', x: 0.00, y: 1.94, z: 0.00, color: '#b45309', radius: 1.85, cipPriority: 1, label: 'Br(1)' },
      { id: 2, symbol: 'Cl', x: -1.67, y: -0.60, z: 0.00, color: '#22c55e', radius: 1.75, cipPriority: 2, label: 'Cl(2)' },
      { id: 3, symbol: 'F',  x: 0.83, y: -0.60, z: 1.18, color: '#06b6d4', radius: 1.47, cipPriority: 3, label: 'F(3)' },
      { id: 4, symbol: 'H',  x: 0.83, y: -0.60, z: -1.18, color: '#f8fafc', radius: 1.20, cipPriority: 4, label: 'H(4)' }
    ],
    bonds: [
      { id: 0, atom1: 0, atom2: 1, order: 1 },
      { id: 1, atom1: 0, atom2: 2, order: 1 },
      { id: 2, atom1: 0, atom2: 3, order: 1 },
      { id: 3, atom1: 0, atom2: 4, order: 1 }
    ]
  },

  // ==========================================
  // 13. (2R,3R)-2,3-DICHLOROBUTANE
  // ==========================================
  {
    id: '2r-3r-dichlorobutane',
    name: '(2R,3R)-2,3-Dichlorobutane',
    iupacName: '(2R,3R)-2,3-dichlorobutane',
    formula: 'C4H8Cl2',
    molecularWeight: 127.012,
    smiles: 'C[C@@H](Cl)[C@H](Cl)C',
    category: 'haloalkane',
    isChiral: true,
    stereocentersCount: 2,
    opticalRotation: '+25.0°',
    description: 'A chiral diastereomer of 2,3-dichlorobutane possessing a C2 symmetry axis. Both stereocenters are in the (R) configuration.',
    diastereomerIds: ['meso-2-3-dichlorobutane'],
    stereocenters: [
      {
        atomIndex: 1,
        configuration: 'R',
        label: 'C2',
        substituents: [
          { atomIndex: 4, symbol: 'Cl', priority: 1, groupName: 'Chlorine', reason: 'Z=17' },
          { atomIndex: 2, symbol: 'C',  priority: 2, groupName: '-CH(Cl)CH3', reason: 'C(Cl,C,H)' },
          { atomIndex: 0, symbol: 'C',  priority: 3, groupName: '-CH3', reason: 'C(H,H,H)' },
          { atomIndex: 5, symbol: 'H',  priority: 4, groupName: '-H', reason: 'Z=1' }
        ]
      },
      {
        atomIndex: 2,
        configuration: 'R',
        label: 'C3',
        substituents: [
          { atomIndex: 6, symbol: 'Cl', priority: 1, groupName: 'Chlorine', reason: 'Z=17' },
          { atomIndex: 1, symbol: 'C',  priority: 2, groupName: '-CH(Cl)CH3', reason: 'C(Cl,C,H)' },
          { atomIndex: 3, symbol: 'C',  priority: 3, groupName: '-CH3', reason: 'C(H,H,H)' },
          { atomIndex: 7, symbol: 'H',  priority: 4, groupName: '-H', reason: 'Z=1' }
        ]
      }
    ],
    atoms: [
      { id: 0, symbol: 'C',  x: -1.95, y: -0.65, z: 0.20, color: '#334155', radius: 1.70, label: 'C1' },
      { id: 1, symbol: 'C',  x: -0.75, y: 0.15, z: -0.10, color: '#334155', radius: 1.70, isChiralCenter: true, label: 'C2(R)' },
      { id: 2, symbol: 'C',  x: 0.75, y: -0.15, z: -0.10, color: '#334155', radius: 1.70, isChiralCenter: true, label: 'C3(R)' },
      { id: 3, symbol: 'C',  x: 1.95, y: 0.65, z: 0.20, color: '#334155', radius: 1.70, label: 'C4' },
      { id: 4, symbol: 'Cl', x: -0.85, y: 1.85, z: 0.45, color: '#22c55e', radius: 1.75, cipPriority: 1, label: 'Cl(1)' },
      { id: 5, symbol: 'H',  x: -0.70, y: 0.15, z: -1.18, color: '#f8fafc', radius: 1.20, cipPriority: 4, label: 'H(4)' },
      { id: 6, symbol: 'Cl', x: 0.85, y: -1.85, z: 0.45, color: '#22c55e', radius: 1.75, cipPriority: 1, label: 'Cl(1)' },
      { id: 7, symbol: 'H',  x: 0.70, y: -0.15, z: -1.18, color: '#f8fafc', radius: 1.20, cipPriority: 4, label: 'H(4)' },
      { id: 8, symbol: 'H',  x: -2.00, y: -1.58, z: -0.36, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 9, symbol: 'H',  x: -2.85, y: -0.08, z: 0.02, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 10, symbol: 'H', x: -1.95, y: -0.90, z: 1.26, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 11, symbol: 'H', x: 2.00, y: 1.58, z: -0.36, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 12, symbol: 'H', x: 2.85, y: 0.08, z: 0.02, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 13, symbol: 'H', x: 1.95, y: 0.90, z: 1.26, color: '#f8fafc', radius: 1.20, label: 'H' }
    ],
    bonds: [
      { id: 0, atom1: 1, atom2: 0, order: 1 },
      { id: 1, atom1: 1, atom2: 2, order: 1 },
      { id: 2, atom1: 1, atom2: 4, order: 1 },
      { id: 3, atom1: 1, atom2: 5, order: 1 },
      { id: 4, atom1: 2, atom2: 3, order: 1 },
      { id: 5, atom1: 2, atom2: 6, order: 1 },
      { id: 6, atom1: 2, atom2: 7, order: 1 },
      { id: 7, atom1: 0, atom2: 8, order: 1 },
      { id: 8, atom1: 0, atom2: 9, order: 1 },
      { id: 9, atom1: 0, atom2: 10, order: 1 },
      { id: 10, atom1: 3, atom2: 11, order: 1 },
      { id: 11, atom1: 3, atom2: 12, order: 1 },
      { id: 12, atom1: 3, atom2: 13, order: 1 }
    ]
  },

  // ==========================================
  // 14. MESO-2,3-DICHLOROBUTANE
  // ==========================================
  {
    id: 'meso-2-3-dichlorobutane',
    name: 'Meso-2,3-Dichlorobutane',
    iupacName: '(2R,3S)-2,3-dichlorobutane',
    formula: 'C4H8Cl2',
    molecularWeight: 127.012,
    smiles: 'C[C@@H](Cl)[C@@H](Cl)C',
    category: 'haloalkane',
    isChiral: false,
    isMeso: true,
    stereocentersCount: 2,
    opticalRotation: '0.0° (Achiral)',
    description: 'The meso stereoisomer of 2,3-dichlorobutane containing one (R) and one (S) stereocenter. Contains a plane of symmetry (σ) in the eclipsed conformation and a center of inversion (i) in the anti-staggered conformation.',
    diastereomerIds: ['2r-3r-dichlorobutane'],
    symmetryElements: ['Plane of symmetry (σ) in eclipsed', 'Center of Inversion (i) in anti'],
    stereocenters: [
      {
        atomIndex: 1,
        configuration: 'R',
        label: 'C2',
        substituents: [
          { atomIndex: 4, symbol: 'Cl', priority: 1, groupName: 'Chlorine', reason: 'Z=17' },
          { atomIndex: 2, symbol: 'C',  priority: 2, groupName: '-CH(Cl)CH3', reason: 'C(Cl,C,H)' },
          { atomIndex: 0, symbol: 'C',  priority: 3, groupName: '-CH3', reason: 'C(H,H,H)' },
          { atomIndex: 5, symbol: 'H',  priority: 4, groupName: '-H', reason: 'Z=1' }
        ]
      },
      {
        atomIndex: 2,
        configuration: 'S',
        label: 'C3',
        substituents: [
          { atomIndex: 6, symbol: 'Cl', priority: 1, groupName: 'Chlorine', reason: 'Z=17' },
          { atomIndex: 1, symbol: 'C',  priority: 2, groupName: '-CH(Cl)CH3', reason: 'C(Cl,C,H)' },
          { atomIndex: 3, symbol: 'C',  priority: 3, groupName: '-CH3', reason: 'C(H,H,H)' },
          { atomIndex: 7, symbol: 'H',  priority: 4, groupName: '-H', reason: 'Z=1' }
        ]
      }
    ],
    atoms: [
      { id: 0, symbol: 'C',  x: -1.95, y: -0.65, z: 0.20, color: '#334155', radius: 1.70, label: 'C1' },
      { id: 1, symbol: 'C',  x: -0.75, y: 0.15, z: -0.10, color: '#334155', radius: 1.70, isChiralCenter: true, label: 'C2(R)' },
      { id: 2, symbol: 'C',  x: 0.75, y: 0.15, z: -0.10, color: '#334155', radius: 1.70, isChiralCenter: true, label: 'C3(S)' },
      { id: 3, symbol: 'C',  x: 1.95, y: -0.65, z: 0.20, color: '#334155', radius: 1.70, label: 'C4' },
      { id: 4, symbol: 'Cl', x: -0.85, y: 1.85, z: 0.45, color: '#22c55e', radius: 1.75, cipPriority: 1, label: 'Cl(1)' },
      { id: 5, symbol: 'H',  x: -0.70, y: 0.15, z: -1.18, color: '#f8fafc', radius: 1.20, cipPriority: 4, label: 'H(4)' },
      { id: 6, symbol: 'Cl', x: 0.85, y: 1.85, z: 0.45, color: '#22c55e', radius: 1.75, cipPriority: 1, label: 'Cl(1)' },
      { id: 7, symbol: 'H',  x: 0.70, y: 0.15, z: -1.18, color: '#f8fafc', radius: 1.20, cipPriority: 4, label: 'H(4)' },
      { id: 8, symbol: 'H',  x: -2.00, y: -1.58, z: -0.36, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 9, symbol: 'H',  x: -2.85, y: -0.08, z: 0.02, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 10, symbol: 'H', x: -1.95, y: -0.90, z: 1.26, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 11, symbol: 'H', x: 2.00, y: -1.58, z: -0.36, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 12, symbol: 'H', x: 2.85, y: -0.08, z: 0.02, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 13, symbol: 'H', x: 1.95, y: -0.90, z: 1.26, color: '#f8fafc', radius: 1.20, label: 'H' }
    ],
    bonds: [
      { id: 0, atom1: 1, atom2: 0, order: 1 },
      { id: 1, atom1: 1, atom2: 2, order: 1 },
      { id: 2, atom1: 1, atom2: 4, order: 1 },
      { id: 3, atom1: 1, atom2: 5, order: 1 },
      { id: 4, atom1: 2, atom2: 3, order: 1 },
      { id: 5, atom1: 2, atom2: 6, order: 1 },
      { id: 6, atom1: 2, atom2: 7, order: 1 },
      { id: 7, atom1: 0, atom2: 8, order: 1 },
      { id: 8, atom1: 0, atom2: 9, order: 1 },
      { id: 9, atom1: 0, atom2: 10, order: 1 },
      { id: 10, atom1: 3, atom2: 11, order: 1 },
      { id: 11, atom1: 3, atom2: 12, order: 1 },
      { id: 12, atom1: 3, atom2: 13, order: 1 }
    ]
  },

  // ==========================================
  // 15. CYCLOHEXANE (Chair Conformation)
  // ==========================================
  {
    id: 'cyclohexane-chair',
    name: 'Cyclohexane (Chair)',
    iupacName: 'cyclohexane',
    formula: 'C6H12',
    molecularWeight: 84.16,
    smiles: 'C1CCCCC1',
    category: 'cycloalkane',
    isChiral: false,
    stereocentersCount: 0,
    opticalRotation: '0.0° (Achiral D3d)',
    description: 'The global energy minimum conformation of cyclohexane. Free of angle strain (all C-C-C angles are 109.5°) and free of torsional strain (all adjacent C-H bonds are fully staggered). Features 6 axial hydrogens (vertical) and 6 equatorial hydrogens (slanted outwards).',
    symmetryElements: ['D3d point group (C3 axis, 3 C2 axes, 3 vertical mirror planes, inversion center i)'],
    stereocenters: [],
    atoms: [
      // 6 carbons in chair conformation
      { id: 0, symbol: 'C', x: 1.26, y: 0.73, z: 0.25, color: '#334155', radius: 1.70, label: 'C1' },
      { id: 1, symbol: 'C', x: 0.00, y: 1.45, z: -0.25, color: '#334155', radius: 1.70, label: 'C2' },
      { id: 2, symbol: 'C', x: -1.26, y: 0.73, z: 0.25, color: '#334155', radius: 1.70, label: 'C3' },
      { id: 3, symbol: 'C', x: -1.26, y: -0.73, z: -0.25, color: '#334155', radius: 1.70, label: 'C4' },
      { id: 4, symbol: 'C', x: 0.00, y: -1.45, z: 0.25, color: '#334155', radius: 1.70, label: 'C5' },
      { id: 5, symbol: 'C', x: 1.26, y: -0.73, z: -0.25, color: '#334155', radius: 1.70, label: 'C6' },

      // 6 Axial Hydrogens (pointing straight up or down)
      { id: 6, symbol: 'H', x: 1.26, y: 0.73, z: 1.34, color: '#38bdf8', radius: 1.20, label: 'H(ax-up)' },
      { id: 7, symbol: 'H', x: 0.00, y: 1.45, z: -1.34, color: '#38bdf8', radius: 1.20, label: 'H(ax-dn)' },
      { id: 8, symbol: 'H', x: -1.26, y: 0.73, z: 1.34, color: '#38bdf8', radius: 1.20, label: 'H(ax-up)' },
      { id: 9, symbol: 'H', x: -1.26, y: -0.73, z: -1.34, color: '#38bdf8', radius: 1.20, label: 'H(ax-dn)' },
      { id: 10, symbol: 'H', x: 0.00, y: -1.45, z: 1.34, color: '#38bdf8', radius: 1.20, label: 'H(ax-up)' },
      { id: 11, symbol: 'H', x: 1.26, y: -0.73, z: -1.34, color: '#38bdf8', radius: 1.20, label: 'H(ax-dn)' },

      // 6 Equatorial Hydrogens (slanted outward)
      { id: 12, symbol: 'H', x: 2.15, y: 1.24, z: -0.10, color: '#f8fafc', radius: 1.20, label: 'H(eq)' },
      { id: 13, symbol: 'H', x: 0.00, y: 2.48, z: 0.10, color: '#f8fafc', radius: 1.20, label: 'H(eq)' },
      { id: 14, symbol: 'H', x: -2.15, y: 1.24, z: -0.10, color: '#f8fafc', radius: 1.20, label: 'H(eq)' },
      { id: 15, symbol: 'H', x: -2.15, y: -1.24, z: 0.10, color: '#f8fafc', radius: 1.20, label: 'H(eq)' },
      { id: 16, symbol: 'H', x: 0.00, y: -2.48, z: -0.10, color: '#f8fafc', radius: 1.20, label: 'H(eq)' },
      { id: 17, symbol: 'H', x: 2.15, y: -1.24, z: 0.10, color: '#f8fafc', radius: 1.20, label: 'H(eq)' }
    ],
    bonds: [
      { id: 0, atom1: 0, atom2: 1, order: 1 },
      { id: 1, atom1: 1, atom2: 2, order: 1 },
      { id: 2, atom1: 2, atom2: 3, order: 1 },
      { id: 3, atom1: 3, atom2: 4, order: 1 },
      { id: 4, atom1: 4, atom2: 5, order: 1 },
      { id: 5, atom1: 5, atom2: 0, order: 1 },

      { id: 6, atom1: 0, atom2: 6, order: 1 },
      { id: 7, atom1: 1, atom2: 7, order: 1 },
      { id: 8, atom1: 2, atom2: 8, order: 1 },
      { id: 9, atom1: 3, atom2: 9, order: 1 },
      { id: 10, atom1: 4, atom2: 10, order: 1 },
      { id: 11, atom1: 5, atom2: 11, order: 1 },

      { id: 12, atom1: 0, atom2: 12, order: 1 },
      { id: 13, atom1: 1, atom2: 13, order: 1 },
      { id: 14, atom1: 2, atom2: 14, order: 1 },
      { id: 15, atom1: 3, atom2: 15, order: 1 },
      { id: 16, atom1: 4, atom2: 16, order: 1 },
      { id: 17, atom1: 5, atom2: 17, order: 1 }
    ]
  },

  // ==========================================
  // 16. (Z)-2-BUTENE & (E)-2-BUTENE (Alkene Geometrical Isomerism)
  // ==========================================
  {
    id: 'z-2-butene',
    name: '(Z)-2-Butene (cis)',
    iupacName: '(2Z)-but-2-ene',
    formula: 'C4H8',
    molecularWeight: 56.108,
    smiles: 'C/C=C\\C',
    category: 'alkene',
    isChiral: false,
    stereocentersCount: 2,
    opticalRotation: '0.0° (Achiral)',
    description: 'The (Z) [Zusammen = together] stereoisomer of 2-butene. The two higher CIP priority methyl groups (-CH3 > -H) are on the SAME side of the rigid C=C double bond plane. Higher dipole moment (0.25 D) and higher boiling point (3.7°C) than (E)-2-butene (0.9°C).',
    enantiomerId: 'e-2-butene',
    stereocenters: [
      {
        atomIndex: 1,
        configuration: 'Z',
        label: 'C2(sp2)',
        substituents: [
          { atomIndex: 0, symbol: 'C', priority: 1, groupName: '-CH3', reason: 'C(H,H,H) > H' },
          { atomIndex: 4, symbol: 'H', priority: 2, groupName: '-H', reason: 'Lowest atomic number Z=1' }
        ]
      },
      {
        atomIndex: 2,
        configuration: 'Z',
        label: 'C3(sp2)',
        substituents: [
          { atomIndex: 3, symbol: 'C', priority: 1, groupName: '-CH3', reason: 'C(H,H,H) > H' },
          { atomIndex: 5, symbol: 'H', priority: 2, groupName: '-H', reason: 'Lowest atomic number Z=1' }
        ]
      }
    ],
    atoms: [
      { id: 0, symbol: 'C', x: -1.75, y: 1.25, z: 0.00, color: '#334155', radius: 1.70, label: 'C1' },
      { id: 1, symbol: 'C', x: -0.67, y: 0.22, z: 0.00, color: '#334155', radius: 1.70, label: 'C2(Z)' },
      { id: 2, symbol: 'C', x: 0.67, y: 0.22, z: 0.00, color: '#334155', radius: 1.70, label: 'C3(Z)' },
      { id: 3, symbol: 'C', x: 1.75, y: 1.25, z: 0.00, color: '#334155', radius: 1.70, label: 'C4' },
      { id: 4, symbol: 'H', x: -1.05, y: -0.82, z: 0.00, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 5, symbol: 'H', x: 1.05, y: -0.82, z: 0.00, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 6, symbol: 'H', x: -1.65, y: 1.90, z: 0.88, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 7, symbol: 'H', x: -1.65, y: 1.90, z: -0.88, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 8, symbol: 'H', x: -2.75, y: 0.78, z: 0.00, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 9, symbol: 'H', x: 1.65, y: 1.90, z: 0.88, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 10, symbol: 'H', x: 1.65, y: 1.90, z: -0.88, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 11, symbol: 'H', x: 2.75, y: 0.78, z: 0.00, color: '#f8fafc', radius: 1.20, label: 'H' }
    ],
    bonds: [
      { id: 0, atom1: 1, atom2: 0, order: 1 },
      { id: 1, atom1: 1, atom2: 2, order: 2 },
      { id: 2, atom1: 2, atom2: 3, order: 1 },
      { id: 3, atom1: 1, atom2: 4, order: 1 },
      { id: 4, atom1: 2, atom2: 5, order: 1 },
      { id: 5, atom1: 0, atom2: 6, order: 1 },
      { id: 6, atom1: 0, atom2: 7, order: 1 },
      { id: 7, atom1: 0, atom2: 8, order: 1 },
      { id: 8, atom1: 3, atom2: 9, order: 1 },
      { id: 9, atom1: 3, atom2: 10, order: 1 },
      { id: 10, atom1: 3, atom2: 11, order: 1 }
    ]
  },
  {
    id: 'e-2-butene',
    name: '(E)-2-Butene (trans)',
    iupacName: '(2E)-but-2-ene',
    formula: 'C4H8',
    molecularWeight: 56.108,
    smiles: 'C/C=C/C',
    category: 'alkene',
    isChiral: false,
    stereocentersCount: 2,
    opticalRotation: '0.0° (Achiral)',
    description: 'The (E) [Entgegen = opposite] stereoisomer of 2-butene. The two higher CIP priority methyl groups are on OPPOSITE sides of the double bond. Thermodynamically more stable than the (Z) isomer by ~4 kJ/mol due to lower steric repulsion.',
    enantiomerId: 'z-2-butene',
    stereocenters: [
      {
        atomIndex: 1,
        configuration: 'E',
        label: 'C2(sp2)',
        substituents: [
          { atomIndex: 0, symbol: 'C', priority: 1, groupName: '-CH3', reason: 'C(H,H,H) > H' },
          { atomIndex: 4, symbol: 'H', priority: 2, groupName: '-H', reason: 'Lowest atomic number Z=1' }
        ]
      },
      {
        atomIndex: 2,
        configuration: 'E',
        label: 'C3(sp2)',
        substituents: [
          { atomIndex: 3, symbol: 'C', priority: 1, groupName: '-CH3', reason: 'C(H,H,H) > H' },
          { atomIndex: 5, symbol: 'H', priority: 2, groupName: '-H', reason: 'Lowest atomic number Z=1' }
        ]
      }
    ],
    atoms: [
      { id: 0, symbol: 'C', x: -1.75, y: 1.25, z: 0.00, color: '#334155', radius: 1.70, label: 'C1' },
      { id: 1, symbol: 'C', x: -0.67, y: 0.22, z: 0.00, color: '#334155', radius: 1.70, label: 'C2(E)' },
      { id: 2, symbol: 'C', x: 0.67, y: -0.22, z: 0.00, color: '#334155', radius: 1.70, label: 'C3(E)' },
      { id: 3, symbol: 'C', x: 1.75, y: -1.25, z: 0.00, color: '#334155', radius: 1.70, label: 'C4' },
      { id: 4, symbol: 'H', x: -0.95, y: -0.85, z: 0.00, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 5, symbol: 'H', x: 0.95, y: 0.85, z: 0.00, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 6, symbol: 'H', x: -1.65, y: 1.90, z: 0.88, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 7, symbol: 'H', x: -1.65, y: 1.90, z: -0.88, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 8, symbol: 'H', x: -2.75, y: 0.78, z: 0.00, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 9, symbol: 'H', x: 1.65, y: -1.90, z: 0.88, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 10, symbol: 'H', x: 1.65, y: -1.90, z: -0.88, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 11, symbol: 'H', x: 2.75, y: -0.78, z: 0.00, color: '#f8fafc', radius: 1.20, label: 'H' }
    ],
    bonds: [
      { id: 0, atom1: 1, atom2: 0, order: 1 },
      { id: 1, atom1: 1, atom2: 2, order: 2 },
      { id: 2, atom1: 2, atom2: 3, order: 1 },
      { id: 3, atom1: 1, atom2: 4, order: 1 },
      { id: 4, atom1: 2, atom2: 5, order: 1 },
      { id: 5, atom1: 0, atom2: 6, order: 1 },
      { id: 6, atom1: 0, atom2: 7, order: 1 },
      { id: 7, atom1: 0, atom2: 8, order: 1 },
      { id: 8, atom1: 3, atom2: 9, order: 1 },
      { id: 9, atom1: 3, atom2: 10, order: 1 },
      { id: 10, atom1: 3, atom2: 11, order: 1 }
    ]
  },

  // ==========================================
  // 17. (R)-LIMONENE & (S)-LIMONENE (Olfactory Stereospecificity)
  // ==========================================
  {
    id: 'r-limonene',
    name: '(R)-(+)-Limonene',
    iupacName: '(4R)-1-methyl-4-prop-1-en-2-ylcyclohexene',
    formula: 'C10H16',
    molecularWeight: 136.238,
    smiles: 'CC1=CCC(CC1)C(=C)C',
    category: 'terpene',
    isChiral: true,
    stereocentersCount: 1,
    opticalRotation: '+125.6° (neat)',
    description: 'Natural monoterpene found in orange and citrus peels. Endowed with a pleasant sweet orange aroma due to chiral recognition at human olfactory receptors.',
    enantiomerId: 's-limonene',
    biologicalRelevance: 'Classic textbook demonstration that enantiomers interact differently with chiral biological receptors: (R) smells like sweet oranges, whereas (S) smells like pine/turpentine!',
    stereocenters: [
      {
        atomIndex: 3,
        configuration: 'R',
        label: 'C4',
        substituents: [
          { atomIndex: 6, symbol: 'C', priority: 1, groupName: '-C(CH3)=CH2', reason: 'Isopropenyl group with double bond phantom atoms' },
          { atomIndex: 2, symbol: 'C', priority: 2, groupName: 'Ring C3', reason: 'Leads towards C=C double bond' },
          { atomIndex: 4, symbol: 'C', priority: 3, groupName: 'Ring C5', reason: 'Saturated methylene chain' },
          { atomIndex: 10, symbol: 'H', priority: 4, groupName: '-H', reason: 'Lowest atomic number Z=1' }
        ]
      }
    ],
    atoms: [
      { id: 0, symbol: 'C', x: 0.00, y: 1.45, z: 0.10, color: '#334155', radius: 1.70, label: 'C1' },
      { id: 1, symbol: 'C', x: -1.22, y: 0.72, z: 0.00, color: '#334155', radius: 1.70, label: 'C2' },
      { id: 2, symbol: 'C', x: -1.22, y: -0.72, z: -0.15, color: '#334155', radius: 1.70, label: 'C3' },
      { id: 3, symbol: 'C', x: 0.00, y: -1.45, z: 0.15, color: '#334155', radius: 1.70, isChiralCenter: true, label: 'C4(R)' },
      { id: 4, symbol: 'C', x: 1.22, y: -0.72, z: -0.15, color: '#334155', radius: 1.70, label: 'C5' },
      { id: 5, symbol: 'C', x: 1.22, y: 0.72, z: 0.00, color: '#334155', radius: 1.70, label: 'C6' },
      { id: 6, symbol: 'C', x: 0.00, y: -2.85, z: -0.40, color: '#334155', radius: 1.70, label: 'C7' },
      { id: 7, symbol: 'C', x: 1.15, y: -3.65, z: -0.30, color: '#334155', radius: 1.70, label: 'C8(=CH2)' },
      { id: 8, symbol: 'C', x: -1.25, y: -3.35, z: -1.05, color: '#334155', radius: 1.70, label: 'C9(CH3)' },
      { id: 9, symbol: 'C', x: 0.00, y: 2.90, z: 0.25, color: '#334155', radius: 1.70, label: 'C10(CH3)' },
      { id: 10, symbol: 'H', x: 0.00, y: -1.55, z: 1.25, color: '#f8fafc', radius: 1.20, cipPriority: 4, label: 'H(4)' }
    ],
    bonds: [
      { id: 0, atom1: 0, atom2: 1, order: 2 },
      { id: 1, atom1: 1, atom2: 2, order: 1 },
      { id: 2, atom1: 2, atom2: 3, order: 1 },
      { id: 3, atom1: 3, atom2: 4, order: 1 },
      { id: 4, atom1: 4, atom2: 5, order: 1 },
      { id: 5, atom1: 5, atom2: 0, order: 1 },
      { id: 6, atom1: 3, atom2: 6, order: 1 },
      { id: 7, atom1: 6, atom2: 7, order: 2 },
      { id: 8, atom1: 6, atom2: 8, order: 1 },
      { id: 9, atom1: 0, atom2: 9, order: 1 },
      { id: 10, atom1: 3, atom2: 10, order: 1 }
    ]
  },
  {
    id: 's-limonene',
    name: '(S)-(-)-Limonene',
    iupacName: '(4S)-1-methyl-4-prop-1-en-2-ylcyclohexene',
    formula: 'C10H16',
    molecularWeight: 136.238,
    smiles: 'CC1=CC[C@H](CC1)C(=C)C',
    category: 'terpene',
    isChiral: true,
    stereocentersCount: 1,
    opticalRotation: '-125.6° (neat)',
    description: 'Enantiomer of (R)-limonene. Found in pine needles and turpentine oil, imparting a distinctly woody, lemon-pine scent.',
    enantiomerId: 'r-limonene',
    stereocenters: [
      {
        atomIndex: 3,
        configuration: 'S',
        label: 'C4',
        substituents: [
          { atomIndex: 6, symbol: 'C', priority: 1, groupName: '-C(CH3)=CH2', reason: 'Isopropenyl' },
          { atomIndex: 2, symbol: 'C', priority: 2, groupName: 'Ring C3', reason: 'Towards double bond' },
          { atomIndex: 4, symbol: 'C', priority: 3, groupName: 'Ring C5', reason: 'Methylene chain' },
          { atomIndex: 10, symbol: 'H', priority: 4, groupName: '-H', reason: 'Z=1' }
        ]
      }
    ],
    atoms: [
      { id: 0, symbol: 'C', x: 0.00, y: 1.45, z: 0.10, color: '#334155', radius: 1.70, label: 'C1' },
      { id: 1, symbol: 'C', x: 1.22, y: 0.72, z: 0.00, color: '#334155', radius: 1.70, label: 'C2' },
      { id: 2, symbol: 'C', x: 1.22, y: -0.72, z: -0.15, color: '#334155', radius: 1.70, label: 'C3' },
      { id: 3, symbol: 'C', x: 0.00, y: -1.45, z: 0.15, color: '#334155', radius: 1.70, isChiralCenter: true, label: 'C4(S)' },
      { id: 4, symbol: 'C', x: -1.22, y: -0.72, z: -0.15, color: '#334155', radius: 1.70, label: 'C5' },
      { id: 5, symbol: 'C', x: -1.22, y: 0.72, z: 0.00, color: '#334155', radius: 1.70, label: 'C6' },
      { id: 6, symbol: 'C', x: 0.00, y: -2.85, z: -0.40, color: '#334155', radius: 1.70, label: 'C7' },
      { id: 7, symbol: 'C', x: -1.15, y: -3.65, z: -0.30, color: '#334155', radius: 1.70, label: 'C8(=CH2)' },
      { id: 8, symbol: 'C', x: 1.25, y: -3.35, z: -1.05, color: '#334155', radius: 1.70, label: 'C9(CH3)' },
      { id: 9, symbol: 'C', x: 0.00, y: 2.90, z: 0.25, color: '#334155', radius: 1.70, label: 'C10(CH3)' },
      { id: 10, symbol: 'H', x: 0.00, y: -1.55, z: 1.25, color: '#f8fafc', radius: 1.20, cipPriority: 4, label: 'H(4)' }
    ],
    bonds: [
      { id: 0, atom1: 0, atom2: 1, order: 2 },
      { id: 1, atom1: 1, atom2: 2, order: 1 },
      { id: 2, atom1: 2, atom2: 3, order: 1 },
      { id: 3, atom1: 3, atom2: 4, order: 1 },
      { id: 4, atom1: 4, atom2: 5, order: 1 },
      { id: 5, atom1: 5, atom2: 0, order: 1 },
      { id: 6, atom1: 3, atom2: 6, order: 1 },
      { id: 7, atom1: 6, atom2: 7, order: 2 },
      { id: 8, atom1: 6, atom2: 8, order: 1 },
      { id: 9, atom1: 0, atom2: 9, order: 1 },
      { id: 10, atom1: 3, atom2: 10, order: 1 }
    ]
  },

  // ==========================================
  // 18. D-GLYCERALDEHYDE (The Standard Reference for D/L Sugar Nomenclature)
  // ==========================================
  {
    id: 'd-glyceraldehyde',
    name: 'D-Glyceraldehyde',
    iupacName: '(2R)-2,3-dihydroxypropanal',
    formula: 'C3H6O3',
    molecularWeight: 90.078,
    smiles: 'O=C[C@H](O)CO',
    category: 'alcohol',
    isChiral: true,
    stereocentersCount: 1,
    opticalRotation: '+8.7° (H2O)',
    description: 'The historical benchmark carbohydrate defined by Emil Fischer. All D-sugars and L-amino acids are historically indexed against the configuration of D-(+)-glyceraldehyde (which is (R) at C2 under modern CIP rules).',
    stereocenters: [
      {
        atomIndex: 1,
        configuration: 'R',
        label: 'C2',
        substituents: [
          { atomIndex: 3, symbol: 'O', priority: 1, groupName: '-OH', reason: 'Z=8' },
          { atomIndex: 0, symbol: 'C', priority: 2, groupName: '-CH=O (Aldehyde)', reason: 'C(O,O,H) phantom atoms' },
          { atomIndex: 4, symbol: 'C', priority: 3, groupName: '-CH2OH', reason: 'C(O,H,H)' },
          { atomIndex: 5, symbol: 'H', priority: 4, groupName: '-H', reason: 'Z=1' }
        ]
      }
    ],
    atoms: [
      { id: 0, symbol: 'C', x: 0.00, y: 1.24, z: -0.87, color: '#334155', radius: 1.70, cipPriority: 2, label: 'C1(CHO)' },
      { id: 1, symbol: 'C', x: 0.00, y: 0.00, z: 0.00, color: '#334155', radius: 1.70, isChiralCenter: true, label: 'C2(2R)' },
      { id: 2, symbol: 'O', x: -1.05, y: 1.85, z: -0.87, color: '#ef4444', radius: 1.52, label: '=O' },
      { id: 3, symbol: 'O', x: 1.17, y: 0.00, z: 0.83, color: '#ef4444', radius: 1.52, cipPriority: 1, label: '-OH(1)' },
      { id: 4, symbol: 'C', x: 0.00, y: -1.24, z: -0.87, color: '#334155', radius: 1.70, cipPriority: 3, label: 'C3(3)' },
      { id: 5, symbol: 'H', x: -0.89, y: 0.00, z: 0.63, color: '#f8fafc', radius: 1.20, cipPriority: 4, label: 'H(4)' },
      { id: 6, symbol: 'H', x: 1.00, y: 1.70, z: -0.87, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 7, symbol: 'O', x: -1.20, y: -1.85, z: -0.45, color: '#ef4444', radius: 1.52, label: 'OH(C3)' },
      { id: 8, symbol: 'H', x: 1.30, y: 0.85, z: 1.15, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 9, symbol: 'H', x: 0.85, y: -1.75, z: -0.45, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 10, symbol: 'H', x: 0.00, y: -1.30, z: -1.95, color: '#f8fafc', radius: 1.20, label: 'H' },
      { id: 11, symbol: 'H', x: -1.25, y: -2.75, z: -0.75, color: '#f8fafc', radius: 1.20, label: 'H' }
    ],
    bonds: [
      { id: 0, atom1: 0, atom2: 1, order: 1 },
      { id: 1, atom1: 0, atom2: 2, order: 2 },
      { id: 2, atom1: 0, atom2: 6, order: 1 },
      { id: 3, atom1: 1, atom2: 3, order: 1 },
      { id: 4, atom1: 1, atom2: 4, order: 1 },
      { id: 5, atom1: 1, atom2: 5, order: 1 },
      { id: 6, atom1: 4, atom2: 7, order: 1 },
      { id: 7, atom1: 3, atom2: 8, order: 1 },
      { id: 8, atom1: 4, atom2: 9, order: 1 },
      { id: 9, atom1: 4, atom2: 10, order: 1 },
      { id: 10, atom1: 7, atom2: 11, order: 1 }
    ]
  }
];

export function getMoleculeById(id: string): Molecule | undefined {
  return MOLECULES_DATABASE.find(m => m.id === id);
}

export function searchMolecules(query: string): Molecule[] {
  const q = query.toLowerCase().trim();
  if (!q) return MOLECULES_DATABASE;
  return MOLECULES_DATABASE.filter(m =>
    m.name.toLowerCase().includes(q) ||
    m.iupacName.toLowerCase().includes(q) ||
    m.smiles.toLowerCase().includes(q) ||
    m.formula.toLowerCase().includes(q)
  );
}
