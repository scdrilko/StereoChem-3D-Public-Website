/**
 * RDKit.js Integration Wrapper
 * Loads and interacts with the official WebAssembly port of RDKit
 */

declare global {
  interface Window {
    initRDKitModule?: () => Promise<any>;
    RDKitModule?: any;
  }
}

let rdkitPromise: Promise<any> | null = null;
let rdkitInstance: any = null;

export async function getRDKit(): Promise<any | null> {
  if (rdkitInstance) return rdkitInstance;

  if (window.RDKitModule) {
    rdkitInstance = window.RDKitModule;
    return rdkitInstance;
  }

  if (typeof window.initRDKitModule === 'function') {
    if (!rdkitPromise) {
      rdkitPromise = window.initRDKitModule().then((module: any) => {
        rdkitInstance = module;
        window.RDKitModule = module;
        return module;
      }).catch((err: any) => {
        console.warn('RDKit WASM initialization error, falling back to embedded chemical engine:', err);
        return null;
      });
    }
    return rdkitPromise;
  }

  return null;
}

export function isRDKitAvailable(): boolean {
  return !!(rdkitInstance || window.RDKitModule);
}

export interface RDKitStereocenter {
  atomIndex: number;
  configuration: string;
}

export interface RDKitValidationResult {
  isValid: boolean;
  canonicalSmiles?: string;
  molecularFormula?: string;
  chiralCenters?: RDKitStereocenter[];
  svg?: string;
  errorMessage?: string;
}

/**
 * Validates a SMILES string and extracts chiral centers using genuine RDKit C++ algorithms
 */
export async function analyzeSmilesWithRDKit(smiles: string): Promise<RDKitValidationResult> {
  const rdkit = await getRDKit();
  if (!rdkit) {
    return {
      isValid: true, // Graceful fallback
    };
  }

  let mol: any = null;
  try {
    mol = rdkit.get_mol(smiles);
    if (!mol) {
      return {
        isValid: false,
        errorMessage: `RDKit was unable to parse "${smiles}". Invalid SMILES syntax or impossible valence.`,
      };
    }

    const canonicalSmiles = mol.get_smiles();
    let chiralCenters: RDKitStereocenter[] = [];

    // Extract chiral centers from RDKit
    try {
      const ccStr = mol.get_stereo_tags ? mol.get_stereo_tags() : '';
      if (ccStr) {
        const parsed = JSON.parse(ccStr);
        if (parsed.CIP_chiral_centers) {
          chiralCenters = parsed.CIP_chiral_centers.map((c: any) => ({
            atomIndex: c[0],
            configuration: c[1],
          }));
        }
      }
    } catch {
      // Some RDKit builds format chiral centers differently
    }

    // 2D SVG rendering from RDKit
    let svg = '';
    try {
      svg = mol.get_svg(240, 160);
    } catch {
      // SVG generation optional
    }

    return {
      isValid: true,
      canonicalSmiles,
      chiralCenters,
      svg,
    };
  } catch (err: any) {
    return {
      isValid: false,
      errorMessage: err.message || 'RDKit chemical parsing error',
    };
  } finally {
    if (mol) {
      mol.delete();
    }
  }
}
