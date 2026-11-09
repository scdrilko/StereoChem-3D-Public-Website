import { Atom, Bond, Molecule, StereocenterInfo } from '../types/chemistry';

// Standard CPK coloring and van der Waals radii (in Angstroms)
export const ELEMENT_PROPERTIES: Record<string, { name: string; color: string; radius: number; weight: number; atomicNumber: number }> = {
  H:  { name: 'Hydrogen',   color: '#f8fafc', radius: 1.20, weight: 1.008,   atomicNumber: 1 },
  C:  { name: 'Carbon',     color: '#334155', radius: 1.70, weight: 12.011,  atomicNumber: 6 },
  N:  { name: 'Nitrogen',   color: '#3b82f6', radius: 1.55, weight: 14.007,  atomicNumber: 7 },
  O:  { name: 'Oxygen',     color: '#ef4444', radius: 1.52, weight: 15.999,  atomicNumber: 8 },
  F:  { name: 'Fluorine',   color: '#06b6d4', radius: 1.47, weight: 18.998,  atomicNumber: 9 },
  Cl: { name: 'Chlorine',   color: '#22c55e', radius: 1.75, weight: 35.45,   atomicNumber: 17 },
  Br: { name: 'Bromine',    color: '#b45309', radius: 1.85, weight: 79.904,  atomicNumber: 35 },
  I:  { name: 'Iodine',     color: '#7e22ce', radius: 1.98, weight: 126.904, atomicNumber: 53 },
  S:  { name: 'Sulfur',     color: '#eab308', radius: 1.80, weight: 32.06,   atomicNumber: 16 },
  P:  { name: 'Phosphorus', color: '#f97316', radius: 1.80, weight: 30.974,  atomicNumber: 15 },
};

export function getElementProps(symbol: string) {
  return ELEMENT_PROPERTIES[symbol] || { name: symbol, color: '#94a3b8', radius: 1.5, weight: 12.0, atomicNumber: 6 };
}

export function calculateMolecularWeight(atoms: Atom[]): number {
  return Number(atoms.reduce((sum, atom) => {
    const props = getElementProps(atom.symbol);
    return sum + props.weight;
  }, 0).toFixed(3));
}

export function calculateFormula(atoms: Atom[]): string {
  const counts: Record<string, number> = {};
  for (const a of atoms) {
    counts[a.symbol] = (counts[a.symbol] || 0) + 1;
  }
  // Hill system: C first, then H, then alphabetical
  let formula = '';
  if (counts['C']) {
    formula += `C${counts['C'] > 1 ? counts['C'] : ''}`;
    delete counts['C'];
    if (counts['H']) {
      formula += `H${counts['H'] > 1 ? counts['H'] : ''}`;
      delete counts['H'];
    }
  }
  const remaining = Object.keys(counts).sort();
  for (const el of remaining) {
    formula += `${el}${counts[el] > 1 ? counts[el] : ''}`;
  }
  return formula;
}

export function calculateDistance(a: Atom, b: Atom): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = a.z - b.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

/**
 * Parses an MDL Molfile / SDF text into atoms and bonds.
 */
export function parseSdf(sdfText: string, moleculeName: string = 'Custom Molecule'): { atoms: Atom[]; bonds: Bond[] } {
  const lines = sdfText.split('\n');
  let countsLineIndex = -1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('V2000')) {
      countsLineIndex = i;
      break;
    }
  }

  if (countsLineIndex === -1) {
    throw new Error('Invalid SDF / Molfile format: missing V2000 header');
  }

  const countsLine = lines[countsLineIndex];
  const numAtoms = parseInt(countsLine.substring(0, 3).trim(), 10);
  const numBonds = parseInt(countsLine.substring(3, 6).trim(), 10);

  const atoms: Atom[] = [];
  const atomStart = countsLineIndex + 1;

  for (let i = 0; i < numAtoms; i++) {
    const line = lines[atomStart + i];
    if (!line) break;
    const x = parseFloat(line.substring(0, 10).trim());
    const y = parseFloat(line.substring(10, 20).trim());
    const z = parseFloat(line.substring(20, 30).trim());
    const symbol = line.substring(31, 34).trim();
    const props = getElementProps(symbol);

    atoms.push({
      id: i,
      symbol,
      x: isNaN(x) ? 0 : x,
      y: isNaN(y) ? 0 : y,
      z: isNaN(z) ? 0 : z,
      color: props.color,
      radius: props.radius,
      label: `${symbol}${i + 1}`,
    });
  }

  const bonds: Bond[] = [];
  const bondStart = atomStart + numAtoms;

  for (let i = 0; i < numBonds; i++) {
    const line = lines[bondStart + i];
    if (!line) break;
    const atom1 = parseInt(line.substring(0, 3).trim(), 10) - 1;
    const atom2 = parseInt(line.substring(3, 6).trim(), 10) - 1;
    const orderNum = parseInt(line.substring(6, 9).trim(), 10);
    const order = (orderNum === 2 ? 2 : orderNum === 3 ? 3 : 1) as 1 | 2 | 3;

    if (atom1 >= 0 && atom1 < atoms.length && atom2 >= 0 && atom2 < atoms.length) {
      bonds.push({
        id: i,
        atom1,
        atom2,
        order,
      });
    }
  }

  return { atoms, bonds };
}

/**
 * Detects tetrahedral stereocenters and calculates CIP priorities (1-4) and (R)/(S) configuration from 3D coordinates
 */
export function detectStereocentersAndAssignCIP(
  atoms: Atom[],
  bonds: Bond[]
): { stereocenters: StereocenterInfo[]; updatedAtoms: Atom[] } {
  const adj: Map<number, { neighbor: number; bondOrder: number }[]> = new Map();
  for (let i = 0; i < atoms.length; i++) {
    adj.set(i, []);
  }
  for (const b of bonds) {
    adj.get(b.atom1)?.push({ neighbor: b.atom2, bondOrder: b.order });
    adj.get(b.atom2)?.push({ neighbor: b.atom1, bondOrder: b.order });
  }

  const getSubstituentSignature = (rootAtomIdx: number, fromAtomIdx: number, depth: number = 3): number[] => {
    const root = atoms[rootAtomIdx];
    if (!root) return [0];
    const props = getElementProps(root.symbol);
    const result = [props.atomicNumber];

    if (depth <= 0) return result;

    const neighbors = adj.get(rootAtomIdx) || [];
    const childScores: number[] = [];
    for (const nb of neighbors) {
      if (nb.neighbor === fromAtomIdx) continue;
      const nbProps = getElementProps(atoms[nb.neighbor]?.symbol || 'C');
      for (let m = 0; m < nb.bondOrder; m++) {
        childScores.push(nbProps.atomicNumber);
      }
    }
    childScores.sort((a, b) => b - a);
    result.push(...childScores);
    return result;
  };

  const compareSignatures = (sigA: number[], sigB: number[]): number => {
    const maxLen = Math.max(sigA.length, sigB.length);
    for (let i = 0; i < maxLen; i++) {
      const valA = sigA[i] || 0;
      const valB = sigB[i] || 0;
      if (valA !== valB) {
        return valB - valA;
      }
    }
    return 0;
  };

  const stereocenters: StereocenterInfo[] = [];
  const updatedAtoms = atoms.map((a) => ({ ...a }));

  for (let cIdx = 0; cIdx < atoms.length; cIdx++) {
    const center = atoms[cIdx];
    if (center.symbol !== 'C') continue;

    const neighbors = adj.get(cIdx) || [];
    if (neighbors.length === 4) {
      const substituentsData = neighbors.map((nb) => {
        const atom = atoms[nb.neighbor];
        const sig = getSubstituentSignature(nb.neighbor, cIdx, 3);
        const props = getElementProps(atom.symbol);
        return {
          atomIndex: nb.neighbor,
          symbol: atom.symbol,
          atomicNumber: props.atomicNumber,
          signature: sig,
          groupName: `${atom.symbol}${nb.neighbor + 1} (${props.name})`,
          reason: `Z=${props.atomicNumber}`,
        };
      });

      substituentsData.sort((a, b) => compareSignatures(a.signature, b.signature));

      let isChiral = true;
      for (let i = 0; i < 3; i++) {
        if (compareSignatures(substituentsData[i].signature, substituentsData[i + 1].signature) === 0) {
          isChiral = false;
          break;
        }
      }

      if (isChiral) {
        const cipSubs = substituentsData.map((sub, idx) => ({
          atomIndex: sub.atomIndex,
          symbol: sub.symbol,
          priority: (idx + 1) as 1 | 2 | 3 | 4,
          groupName: sub.groupName,
          reason: `Ranked #${idx + 1} (Atomic Number / CIP tree)`,
        }));

        const a1 = atoms[cipSubs[0].atomIndex];
        const a2 = atoms[cipSubs[1].atomIndex];
        const a4 = atoms[cipSubs[3].atomIndex];

        const v1 = { x: a1.x - center.x, y: a1.y - center.y, z: a1.z - center.z };
        const v2 = { x: a2.x - center.x, y: a2.y - center.y, z: a2.z - center.z };
        const v4 = { x: a4.x - center.x, y: a4.y - center.y, z: a4.z - center.z };

        const cross = {
          x: v1.y * v2.z - v1.z * v2.y,
          y: v1.z * v2.x - v1.x * v2.z,
          z: v1.x * v2.y - v1.y * v2.x,
        };

        const dot = cross.x * v4.x + cross.y * v4.y + cross.z * v4.z;
        const config: 'R' | 'S' = dot > 0 ? 'R' : 'S';

        updatedAtoms[cIdx].isChiralCenter = true;
        updatedAtoms[cIdx].label = `C${cIdx + 1}(${config})`;

        cipSubs.forEach((s) => {
          updatedAtoms[s.atomIndex].cipPriority = s.priority;
        });

        stereocenters.push({
          atomIndex: cIdx,
          configuration: config,
          label: `C${cIdx + 1}`,
          substituents: cipSubs,
        });
      }
    }
  }

  return { stereocenters, updatedAtoms };
}
