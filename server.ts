import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  // Setup Gemini AI client if API key is present
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // API Route for AI Stereochemistry Tutor
  app.post('/api/tutor', async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message || typeof message !== 'string') {
        res.status(400).json({ error: 'Message query is required' });
        return;
      }

      // If Gemini API is available
      if (ai) {
        const systemPrompt = `You are an expert Professor of Organic Chemistry and Stereochemistry specializing in teaching undergraduate (B.Sc.) and postgraduate (M.Sc.) students.
Explain concepts clearly, accurately, with scientific rigor.
When discussing stereochemistry:
- State Cahn-Ingold-Prelog (CIP) priority rules step-by-step using atomic numbers.
- Clarify (R) vs (S) configurations (viewing down lowest priority bond, clockwise = R, counterclockwise = S).
- Explain relationships: enantiomers (non-superimposable mirror images), diastereomers (stereoisomers that are not mirror images), meso compounds (superimposable on mirror image due to internal symmetry plane/center of inversion).
- Address Fischer projections (horizontal wedges forward, vertical dashes backward), Newman projections, cyclohexane conformations (axial vs equatorial), and optical activity polarimetry.
- Use clean formatting, bullet points, and chemical notations (e.g., (2R,3R)-tartaric acid, [α]_D).
Keep explanations engaging, concise, and academically precise.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: [
            {
              role: 'user',
              parts: [{ text: `${systemPrompt}\n\nStudent Question: ${message}` }],
            },
          ],
        });

        res.json({ reply: response.text || 'Unable to generate response.' });
        return;
      }

      // Fallback expert chemical tutor engine when API key is not configured
      const q = message.toLowerCase();
      let expertReply = '';

      if (q.includes('cip') || q.includes('cahn') || q.includes('priority')) {
        expertReply = `### Cahn-Ingold-Prelog (CIP) Priority Rules

1. **Rule 1 (Atomic Number)**: Assign priorities (1 to 4) directly to the atoms bonded to the stereocenter based on atomic number ($Z$).
   - Example: $\\text{I} (53) > \\text{Br} (35) > \\text{Cl} (17) > \\text{S} (16) > \\text{F} (9) > \\text{O} (8) > \\text{N} (7) > \\text{C} (6) > \\text{H} (1)$.
   
2. **Rule 2 (Tie Breaking)**: If two atoms are identical (e.g., two carbons), proceed along the substituent chains atom-by-atom comparing the list of bonded atoms ordered by decreasing atomic number until a point of difference is found.
   - Example: $-\\text{CH}_2\\text{OH}$ beats $-\\text{CH}_2\\text{CH}_3$ because C is bonded to $(O, H, H)$ versus $(C, H, H)$.

3. **Rule 3 (Multiple Bonds)**: Double and triple bonds are treated as duplicated (phantom) atoms.
   - Example: $-\\text{CH}=\\text{O}$ counts as Carbon bonded to $(O, O, H)$ and beats $-\\text{CH}_2\\text{OH}$ $(O, H, H)$.
   - $-\\text{C}\\equiv\\text{N}$ counts as Carbon bonded to $(N, N, N)$.

4. **Rule 4 (Configuration Assignment)**:
   - Orient the molecule so priority **4** (lowest, usually H) points away from you into the plane.
   - Trace priorities $1 \\to 2 \\to 3$:
     - **Clockwise** = **(R)** (*Rectus*, Latin for right).
     - **Counter-clockwise** = **(S)** (*Sinister*, Latin for left).
   - *Quick Shortcut*: If priority 4 is pointing *towards* you, determine the apparent direction and reverse the result!`;
      } else if (q.includes('meso')) {
        expertReply = `### Meso Compounds Explained

A **meso compound** is an achiral stereoisomer that possesses two or more stereogenic (chiral) centers but is **optically inactive** because of an **internal element of symmetry**.

**Key Criteria:**
- Contains $\\ge 2$ stereocenters (typically with identical sets of substituents).
- Has an internal plane of symmetry ($\\sigma$) or an inversion center ($i$).
- Is superimposable on its own mirror image.
- Specific rotation $[\\alpha]_D = 0^\\circ$ due to **internal compensation** (one chiral center rotates plane-polarized light clockwise by an equal amount as the other rotates it counter-clockwise).

**Classic Example: Tartaric Acid**
- $(2R,3R)$-tartaric acid: Chiral, dextrorotatory ($+12.4^\\circ$).
- $(2S,3S)$-tartaric acid: Chiral, levorotatory ($-12.4^\\circ$).
- $(2R,3S)$-tartaric acid: **Meso**, optically inactive ($0^\\circ$). In the eclipsed/Fischer conformation, a horizontal mirror plane bisects the C2-C3 bond.`;
      } else if (q.includes('fischer') && (q.includes('newman') || q.includes('convert'))) {
        expertReply = `### Converting Fischer to Newman Projections

**Fischer Projection Conventions:**
- The vertical carbon backbone recedes *away* from you (dashes).
- The horizontal groups project *towards* you (wedges).
- The molecule is effectively in an **eclipsed conformation**.

**Step-by-Step Conversion to Newman:**
1. **Choose your line of sight**: Look down the C2—C3 bond from top to bottom (C2 front, C3 back).
2. **Draw the eclipsed Newman template**:
   - Front carbon (C2): Top group (vertical), bottom-left (horizontal), bottom-right (horizontal).
   - Back carbon (C3): Behind C2 with groups aligned.
3. **Rotate to Staggered Conformation**:
   - Hold the front carbon stationary and rotate the back carbon by $180^\\circ$ or $60^\\circ$ to reach the lower energy staggered/anti conformation.
   - For Tartaric acid, this places the two $-\\text{COOH}$ groups anti ($180^\\circ$) to each other.`;
      } else if (q.includes('enantiomer') || q.includes('diastereomer')) {
        expertReply = `### Enantiomers vs Diastereomers

| Property | Enantiomers | Diastereomers |
| :--- | :--- | :--- |
| **Relationship** | Non-superimposable mirror images | Stereoisomers that are NOT mirror images |
| **Stereocenters** | All stereocenters are inverted ($(R,R) \\leftrightarrow (S,S)$) | Some (not all) stereocenters inverted ($(R,R) \\leftrightarrow (R,S)$) |
| **Physical Properties** | Identical (bp, mp, density, solubility in achiral solvents) | Different (different bp, mp, solubilities, NMR chemical shifts) |
| **Optical Activity** | Equal magnitude, opposite sign of $[\\alpha]_D$ | Different magnitudes, unrelated signs |
| **Separation** | Difficult; requires chiral resolving agents or chiral chromatography | Readily separable by fractional crystallization or standard chromatography |
| **Biological Activity** | Often dramatically different (e.g., $(R)$-carvone smells like spearmint; $(S)$-carvone smells like caraway) | Completely different pharmacological profiles |`;
      } else if (q.includes('cyclohexane') || q.includes('chair') || q.includes('axial')) {
        expertReply = `### Cyclohexane Conformations & Stereochemistry

1. **Chair Conformation**:
   - The most stable, strain-free conformation of cyclohexane.
   - All $\\text{C-C-C}$ bond angles are close to the ideal tetrahedral angle ($109.5^\\circ$).
   - All adjacent $\\text{C-H}$ bonds are staggered (no torsional strain).

2. **Axial vs Equatorial Positions**:
   - **Axial (6 bonds)**: Parallel to the 3-fold molecular symmetry axis (3 point straight UP, 3 point straight DOWN alternately).
   - **Equatorial (6 bonds)**: Radiate outwards roughly around the molecular equator (slanted slightly up or down).

3. **1,3-Diaxial Interaction**:
   - Bulky substituents prefer the **equatorial** position to avoid severe steric hindrance (1,3-diaxial clash) with axial hydrogens two carbons away.
   - Example: For methylcyclohexane, the equatorial conformer is favoured by $\\sim 7.3\\text{ kJ/mol}$ ($95\\%$ equatorial at equilibrium).

4. **Ring Flip**:
   - Interconverts chair forms: all axial substituents become equatorial, and all equatorial substituents become axial!`;
      } else {
        expertReply = `### Stereochemistry Guidance

Stereochemistry investigates the 3-dimensional spatial arrangement of atoms in molecules and how this determines their physical, chemical, and biological properties.

**Core Pillars in StereoChem 3D:**
1. **Chirality & Asymmetry**: A molecule without an improper axis of rotation ($S_n$, including mirror planes $\\sigma$ and inversion centers $i$) is chiral.
2. **Cahn-Ingold-Prelog (CIP) Priorities**: Ranks substituents $1 > 2 > 3 > 4$ based on atomic number $Z$.
3. **Configurations**: $(R)/(S)$ for tetrahedral stereocenters; $(E)/(Z)$ for alkenes.
4. **Isomeric Relationships**: Enantiomers, Diastereomers, Meso compounds, and Constitutional isomers.
5. **Projections**: 3D tetrahedral, Fischer cross projections, and Newman conformational projections.

Feel free to ask any specific question about CIP priority assignments, R/S configurations, Fischer-Newman conversions, or polarimetry!`;
      }

      res.json({ reply: expertReply });
    } catch (err: any) {
      console.error('Tutor API error:', err);
      res.status(500).json({ error: 'Internal server error processing tutor query' });
    }
  });

  // Molecular structure 3D fetch helper (PubChem proxy supporting SMILES and chemical names)
  app.get('/api/pubchem/3d', async (req, res) => {
    try {
      const query = ((req.query.query || req.query.smiles || req.query.name) as string)?.trim();
      if (!query) {
        res.status(400).json({ error: 'Query parameter required (SMILES or chemical name)' });
        return;
      }

      // Try SMILES first
      let url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/smiles/${encodeURIComponent(query)}/SDF?record_type=3d`;
      let response = await fetch(url, { headers: { 'Accept': 'chemical/x-mdl-sdfile' } });

      // If SMILES lookup fails or returned 404, fallback to search by compound name
      if (!response.ok) {
        url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(query)}/SDF?record_type=3d`;
        response = await fetch(url, { headers: { 'Accept': 'chemical/x-mdl-sdfile' } });
      }

      if (!response.ok) {
        res.status(response.status).json({ error: `Could not find 3D structure for "${query}" in PubChem.` });
        return;
      }

      const sdfText = await response.text();
      res.setHeader('Content-Type', 'text/plain');
      res.send(sdfText);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch 3D structure from PubChem' });
    }
  });

  // PubChem compound name-to-canonical-SMILES resolver
  app.get('/api/pubchem/resolve', async (req, res) => {
    try {
      const name = ((req.query.name || req.query.query) as string)?.trim();
      if (!name) {
        res.status(400).json({ error: 'Name query parameter required' });
        return;
      }

      const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(name)}/property/CanonicalSMILES,IsomericSMILES,IUPACName,Title/JSON`;
      const response = await fetch(url);
      if (!response.ok) {
        res.status(response.status).json({ error: `Could not resolve chemical name "${name}" in PubChem.` });
        return;
      }

      const data = await response.json();
      const props = data?.PropertyTable?.Properties?.[0];
      if (!props) {
        res.status(404).json({ error: `No compound properties found for "${name}".` });
        return;
      }

      const canonicalSmiles = props.IsomericSMILES || props.CanonicalSMILES || props.SMILES || '';
      if (!canonicalSmiles) {
        res.status(404).json({ error: `No SMILES representation found for "${name}".` });
        return;
      }

      res.json({
        smiles: canonicalSmiles,
        name: props.Title || name,
        iupacName: props.IUPACName || props.Title || name,
        cid: props.CID,
      });
    } catch (err) {
      res.status(500).json({ error: 'Failed to resolve compound name via PubChem' });
    }
  });

  // In development, hook Vite middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve dist folder
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`StereoChem 3D server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
