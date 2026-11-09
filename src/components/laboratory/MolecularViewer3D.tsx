import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Molecule, Atom, RepresentationMode, StereocenterInfo } from '../../types/chemistry';
import {
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Eye,
  Camera,
  Layers,
  Sparkles,
  Compass,
  Ruler,
  HelpCircle,
  Play,
  Pause,
} from 'lucide-react';
import { calculateDistance } from '../../utils/chemicalCalculations';

interface Props {
  molecule: Molecule;
  mode?: RepresentationMode;
  onModeChange?: (mode: RepresentationMode) => void;
  showLabels?: boolean;
  onToggleLabels?: () => void;
  highlightStereocenters?: boolean;
  onToggleStereocenters?: () => void;
  showCIPPrio?: boolean;
  onToggleCIPPrio?: () => void;
  selectedStereocenterIndex?: number;
  height?: string;
  enableMeasurement?: boolean;
  title?: string;
}

export const MolecularViewer3D: React.FC<Props> = ({
  molecule,
  mode = 'ballAndStick',
  onModeChange,
  showLabels = true,
  onToggleLabels,
  highlightStereocenters = true,
  onToggleStereocenters,
  showCIPPrio = true,
  onToggleCIPPrio,
  selectedStereocenterIndex = 0,
  height = '520px',
  enableMeasurement = false,
  title,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const animFrameId = useRef<number | null>(null);

  const [isRotating, setIsRotating] = useState(false);
  const [measuring, setMeasuring] = useState(enableMeasurement);
  const [selectedAtoms, setSelectedAtoms] = useState<Atom[]>([]);
  const [measuredDistance, setMeasuredDistance] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [currentMode, setCurrentMode] = useState<RepresentationMode>(mode);

  // Sync internal mode with prop if provided
  useEffect(() => {
    setCurrentMode(mode);
  }, [mode]);

  // Mouse interaction state
  const isDraggingRef = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const mouseSensitivity = 0.007;

  // Touch interaction state
  const touchStartRef = useRef<{ x: number; y: number; dist?: number }>({ x: 0, y: 0 });

  // Initialize Three.js scene once
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const heightPx = container.clientHeight || 520;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060c18); // Dark scientific navy
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(42, width / heightPx, 0.1, 1000);
    camera.position.set(0, 0, 11);
    cameraRef.current = camera;

    // 3. Renderer with high DPI support
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer.setSize(width, heightPx);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    rendererRef.current = renderer;

    container.replaceChildren(renderer.domElement);

    // 4. Lights - Multi-point studio lighting for molecules
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight1.position.set(10, 15, 12);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 0.7); // Light blue rim light
    dirLight2.position.set(-10, -10, -8);
    scene.add(dirLight2);

    const dirLight3 = new THREE.DirectionalLight(0x818cf8, 0.4);
    dirLight3.position.set(0, 10, -10);
    scene.add(dirLight3);

    // 5. Molecule Group
    const group = new THREE.Group();
    scene.add(group);
    groupRef.current = group;

    // Animation Loop
    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);

      if (groupRef.current && isRotating) {
        groupRef.current.rotation.y += 0.008;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      renderer.dispose();
    };
  }, []);

  // Update molecule geometry whenever molecule or visual props change
  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    // Clear previous objects
    while (group.children.length > 0) {
      const obj = group.children[0];
      group.remove(obj);
      if ((obj as any).geometry) (obj as any).geometry.dispose();
      if ((obj as any).material) {
        if (Array.isArray((obj as any).material)) {
          (obj as any).material.forEach((m: any) => m.dispose());
        } else {
          (obj as any).material.dispose();
        }
      }
    }

    if (!molecule || !molecule.atoms || molecule.atoms.length === 0) return;

    // Calculate center of mass to center the molecule
    let cx = 0, cy = 0, cz = 0;
    molecule.atoms.forEach((a) => {
      cx += a.x;
      cy += a.y;
      cz += a.z;
    });
    cx /= molecule.atoms.length;
    cy /= molecule.atoms.length;
    cz /= molecule.atoms.length;

    // Shared Geometries
    const sphereGeoDefault = new THREE.SphereGeometry(1, 32, 32);
    const cylinderGeo = new THREE.CylinderGeometry(1, 1, 1, 24);

    // Helper for atom scale depending on representation
    const getAtomRadius = (atom: Atom) => {
      if (currentMode === 'spacefill') return atom.radius * 0.75;
      if (currentMode === 'stick') return 0.22;
      if (currentMode === 'wireframe') return 0.12;
      // ballAndStick
      return atom.symbol === 'H' ? 0.28 : 0.48;
    };

    const bondRadius = currentMode === 'stick' ? 0.18 : currentMode === 'wireframe' ? 0.05 : 0.12;

    // 1. Render Atoms
    molecule.atoms.forEach((atom) => {
      const atomPos = new THREE.Vector3(atom.x - cx, atom.y - cy, atom.z - cz);

      // Atom Sphere
      const r = getAtomRadius(atom);
      const atomMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(atom.color),
        roughness: 0.25,
        metalness: 0.15,
      });

      const sphere = new THREE.Mesh(sphereGeoDefault, atomMat);
      sphere.scale.set(r, r, r);
      sphere.position.copy(atomPos);
      sphere.userData = { atom, isAtom: true };
      group.add(sphere);

      // Highlight Stereocenter with glowing aura
      if (highlightStereocenters && atom.isChiralCenter) {
        const auraGeo = new THREE.SphereGeometry(r * 1.55, 24, 24);
        const auraMat = new THREE.MeshBasicMaterial({
          color: 0x06b6d4, // glowing cyan
          transparent: true,
          opacity: 0.35,
          wireframe: true,
        });
        const aura = new THREE.Mesh(auraGeo, auraMat);
        aura.position.copy(atomPos);
        group.add(aura);

        // Solid inner ring
        const ringGeo = new THREE.TorusGeometry(r * 1.8, 0.04, 16, 64);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.copy(atomPos);
        ring.rotation.x = Math.PI / 2;
        group.add(ring);
      }

      // CIP Priority Badges (1, 2, 3, 4)
      if (showCIPPrio && atom.cipPriority) {
        const prioCanvas = document.createElement('canvas');
        prioCanvas.width = 128;
        prioCanvas.height = 128;
        const ctx = prioCanvas.getContext('2d');
        if (ctx) {
          const prioColors: Record<number, string> = {
            1: '#f59e0b', // Gold #1
            2: '#38bdf8', // Sky Blue #2
            3: '#a855f7', // Violet #3
            4: '#64748b', // Slate #4
          };
          const bgCol = prioColors[atom.cipPriority] || '#3b82f6';

          // Circle background
          ctx.beginPath();
          ctx.arc(64, 64, 56, 0, Math.PI * 2);
          ctx.fillStyle = bgCol;
          ctx.fill();
          ctx.lineWidth = 8;
          ctx.strokeStyle = '#ffffff';
          ctx.stroke();

          // Priority number text
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 64px "Plus Jakarta Sans", sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(String(atom.cipPriority), 64, 66);
        }

        const texture = new THREE.CanvasTexture(prioCanvas);
        const spriteMat = new THREE.SpriteMaterial({ map: texture, depthTest: false });
        const sprite = new THREE.Sprite(spriteMat);
        sprite.scale.set(0.65, 0.65, 1);
        sprite.position.set(atomPos.x, atomPos.y + r + 0.35, atomPos.z);
        group.add(sprite);
      }

      // Atom Label Sprite
      if (showLabels && currentMode !== 'spacefill') {
        const labelCanvas = document.createElement('canvas');
        labelCanvas.width = 64;
        labelCanvas.height = 64;
        const ctx = labelCanvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
          ctx.beginPath();
          ctx.arc(32, 32, 28, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 30px "JetBrains Mono", monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(atom.symbol, 32, 34);
        }
        const texture = new THREE.CanvasTexture(labelCanvas);
        const spriteMat = new THREE.SpriteMaterial({ map: texture, depthTest: false });
        const sprite = new THREE.Sprite(spriteMat);
        sprite.scale.set(0.42, 0.42, 1);
        sprite.position.set(atomPos.x, atomPos.y, atomPos.z + r * 0.9);
        group.add(sprite);
      }
    });

    // 2. Render Bonds
    molecule.bonds.forEach((bond) => {
      const a1 = molecule.atoms[bond.atom1];
      const a2 = molecule.atoms[bond.atom2];
      if (!a1 || !a2) return;

      const p1 = new THREE.Vector3(a1.x - cx, a1.y - cy, a1.z - cz);
      const p2 = new THREE.Vector3(a2.x - cx, a2.y - cy, a2.z - cz);
      const dist = p1.distanceTo(p2);
      const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);

      const orientation = new THREE.Matrix4();
      const up = new THREE.Vector3(0, 1, 0);
      const dir = new THREE.Vector3().subVectors(p2, p1).normalize();
      orientation.lookAt(p1, p2, up);

      const createCylinder = (offsetVec?: THREE.Vector3, radiusMultiplier = 1) => {
        const cylMat = new THREE.MeshStandardMaterial({
          color: 0x94a3b8, // Light slate
          roughness: 0.35,
          metalness: 0.1,
        });
        const cyl = new THREE.Mesh(cylinderGeo, cylMat);
        cyl.scale.set(bondRadius * radiusMultiplier, dist, bondRadius * radiusMultiplier);

        const pos = mid.clone();
        if (offsetVec) pos.add(offsetVec);
        cyl.position.copy(pos);

        cyl.quaternion.setFromUnitVectors(up, dir);
        group.add(cyl);
      };

      if (bond.order === 2 && currentMode !== 'spacefill') {
        // Double bond: render 2 parallel cylinders
        const perp = new THREE.Vector3().crossVectors(dir, new THREE.Vector3(0, 0, 1)).normalize();
        if (perp.lengthSq() < 0.01) {
          perp.crossVectors(dir, new THREE.Vector3(0, 1, 0)).normalize();
        }
        const offset = perp.clone().multiplyScalar(0.12);
        createCylinder(offset, 0.85);
        createCylinder(offset.clone().negate(), 0.85);
      } else if (bond.order === 3 && currentMode !== 'spacefill') {
        createCylinder();
        const perp = new THREE.Vector3().crossVectors(dir, new THREE.Vector3(0, 0, 1)).normalize();
        createCylinder(perp.clone().multiplyScalar(0.14), 0.7);
        createCylinder(perp.clone().multiplyScalar(-0.14), 0.7);
      } else if (currentMode !== 'spacefill') {
        createCylinder();
      }
    });

    // 3. Highlight line if two atoms are selected for measurement
    if (selectedAtoms.length === 2) {
      const p1 = new THREE.Vector3(selectedAtoms[0].x - cx, selectedAtoms[0].y - cy, selectedAtoms[0].z - cz);
      const p2 = new THREE.Vector3(selectedAtoms[1].x - cx, selectedAtoms[1].y - cy, selectedAtoms[1].z - cz);
      const lineGeo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
      const lineMat = new THREE.LineDashedMaterial({ color: 0xf43f5e, dashSize: 0.2, gapSize: 0.1 });
      const line = new THREE.Line(lineGeo, lineMat);
      line.computeLineDistances();
      group.add(line);
    }
  }, [molecule, currentMode, showLabels, highlightStereocenters, showCIPPrio, selectedAtoms]);

  // Mouse & Touch Orbiting Controls Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !groupRef.current) return;

    const deltaX = e.clientX - previousMousePosition.current.x;
    const deltaY = e.clientY - previousMousePosition.current.y;

    groupRef.current.rotation.y += deltaX * mouseSensitivity;
    groupRef.current.rotation.x += deltaY * mouseSensitivity;

    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (!cameraRef.current) return;
    const zoomDelta = e.deltaY * 0.005;
    cameraRef.current.position.z = Math.max(3, Math.min(25, cameraRef.current.position.z + zoomDelta));
  };

  // Touch handlers for mobile / tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      touchStartRef.current = {
        x: 0,
        y: 0,
        dist: Math.sqrt(dx * dx + dy * dy),
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!groupRef.current || !cameraRef.current) return;

    if (e.touches.length === 1) {
      const deltaX = e.touches[0].clientX - touchStartRef.current.x;
      const deltaY = e.touches[0].clientY - touchStartRef.current.y;
      groupRef.current.rotation.y += deltaX * 0.008;
      groupRef.current.rotation.x += deltaY * 0.008;
      touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    } else if (e.touches.length === 2 && touchStartRef.current.dist) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const newDist = Math.sqrt(dx * dx + dy * dy);
      const diff = touchStartRef.current.dist - newDist;
      cameraRef.current.position.z = Math.max(3, Math.min(25, cameraRef.current.position.z + diff * 0.02));
      touchStartRef.current.dist = newDist;
    }
  };

  // Click on Canvas for Atom Measurement or Selection
  const handleClick = (e: React.MouseEvent) => {
    if (!mountRef.current || !cameraRef.current || !sceneRef.current) return;

    const rect = mountRef.current.getBoundingClientRect();
    const mouse = new THREE.Vector2(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1
    );

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, cameraRef.current);

    if (groupRef.current) {
      const intersects = raycaster.intersectObjects(groupRef.current.children, true);
      const atomHit = intersects.find((hit) => hit.object.userData?.isAtom);

      if (atomHit && atomHit.object.userData?.atom) {
        const clickedAtom = atomHit.object.userData.atom as Atom;

        if (measuring) {
          if (selectedAtoms.length === 0) {
            setSelectedAtoms([clickedAtom]);
            setMeasuredDistance(null);
          } else if (selectedAtoms.length === 1) {
            if (selectedAtoms[0].id !== clickedAtom.id) {
              const d = calculateDistance(selectedAtoms[0], clickedAtom);
              setSelectedAtoms([selectedAtoms[0], clickedAtom]);
              setMeasuredDistance(Number(d.toFixed(3)));
            }
          } else {
            setSelectedAtoms([clickedAtom]);
            setMeasuredDistance(null);
          }
        }
      }
    }
  };

  // Re-center and reset view
  const resetView = () => {
    if (groupRef.current) {
      groupRef.current.quaternion.identity();
      groupRef.current.rotation.set(0, 0, 0);
      groupRef.current.position.set(0, 0, 0);
    }
    if (cameraRef.current) {
      cameraRef.current.position.set(0, 0, 11);
    }
    setIsRotating(false);
    setSelectedAtoms([]);
    setMeasuredDistance(null);
  };

  // Zoom controls
  const zoomIn = () => {
    if (cameraRef.current) {
      cameraRef.current.position.z = Math.max(3, cameraRef.current.position.z - 1.5);
    }
  };

  const zoomOut = () => {
    if (cameraRef.current) {
      cameraRef.current.position.z = Math.min(25, cameraRef.current.position.z + 1.5);
    }
  };

  // Special Feature: View down lowest-priority bond!
  const viewDownLowestPriority = () => {
    if (!molecule.stereocenters || molecule.stereocenters.length === 0 || !groupRef.current) return;
    const sc = molecule.stereocenters[selectedStereocenterIndex] || molecule.stereocenters[0];
    const chiralAtom = molecule.atoms[sc.atomIndex];
    const p4Sub = sc.substituents.find((s) => s.priority === 4);
    if (!p4Sub) return;
    const p4Atom = molecule.atoms[p4Sub.atomIndex];
    if (!chiralAtom || !p4Atom) return;

    // Vector pointing from chiral center to lowest-priority group #4
    const bondVec = new THREE.Vector3(p4Atom.x - chiralAtom.x, p4Atom.y - chiralAtom.y, p4Atom.z - chiralAtom.z).normalize();
    const targetVec = new THREE.Vector3(0, 0, -1);

    const quat = new THREE.Quaternion().setFromUnitVectors(bondVec, targetVec);
    groupRef.current.quaternion.copy(quat);
    setIsRotating(false);
  };

  // Save / Screenshot Canvas image
  const captureScreenshot = () => {
    if (!rendererRef.current) return;
    const dataUrl = rendererRef.current.domElement.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `${molecule.id || 'molecule'}-3d.png`;
    a.click();
  };

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl flex flex-col select-none"
      style={{ height }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Header Overlay */}
      <div className="absolute top-0 left-0 right-0 z-10 px-4 py-3 bg-gradient-to-b from-slate-950/90 via-slate-950/50 to-transparent flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-2">
          {title ? (
            <span className="font-semibold text-sm text-cyan-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              {title}
            </span>
          ) : (
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-wide text-white">{molecule.name}</span>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/60">
                {molecule.formula}
              </span>
              {molecule.stereocentersCount > 0 && (
                <span className="text-xs px-2 py-0.5 rounded bg-amber-950/70 text-amber-300 border border-amber-800/50 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                  {molecule.stereocenters.map((s) => `${s.label}:${s.configuration}`).join(', ')}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Representation Selector Bar */}
        <div className="flex items-center gap-1 bg-slate-900/90 backdrop-blur-md p-1 rounded-xl border border-slate-800/80 shadow-lg">
          {(['ballAndStick', 'spacefill', 'stick', 'wireframe'] as RepresentationMode[]).map((m) => (
            <button
              key={m}
              onClick={() => {
                setCurrentMode(m);
                onModeChange?.(m);
              }}
              className={`text-xs px-2.5 py-1 rounded-lg transition-all capitalize font-medium ${
                currentMode === m
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {m === 'ballAndStick' ? 'Ball & Stick' : m}
            </button>
          ))}
        </div>
      </div>

      {/* WebGL Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onClick={handleClick}
      />

      {/* Measurement Banner if active */}
      {measuring && (
        <div className="absolute top-14 left-4 z-10 bg-slate-900/90 border border-rose-500/40 rounded-xl px-3 py-1.5 backdrop-blur-md flex items-center gap-3 text-xs">
          <Ruler className="w-4 h-4 text-rose-400" />
          <span className="text-slate-300">
            {selectedAtoms.length === 0
              ? 'Click 1st atom...'
              : selectedAtoms.length === 1
              ? `Selected ${selectedAtoms[0].symbol}${selectedAtoms[0].id + 1} - click 2nd atom`
              : `Distance (${selectedAtoms[0].symbol}${selectedAtoms[0].id + 1} - ${selectedAtoms[1].symbol}${selectedAtoms[1].id + 1}):`}
          </span>
          {measuredDistance !== null && (
            <span className="font-mono font-bold text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/60">
              {measuredDistance} Å
            </span>
          )}
        </div>
      )}

      {/* Bottom Floating Control Panel */}
      <div className="absolute bottom-3 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Left Actions */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-slate-800 shadow-xl pointer-events-auto">
          <button
            onClick={() => setIsRotating(!isRotating)}
            title={isRotating ? 'Pause rotation' : 'Auto-rotate'}
            className={`p-2 rounded-lg transition-all ${
              isRotating ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {isRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          <button
            onClick={resetView}
            title="Reset 3D camera"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={zoomIn}
            title="Zoom In"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <button
            onClick={zoomOut}
            title="Zoom Out"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <div className="w-[1px] h-5 bg-slate-700 mx-1" />

          {/* View down lowest priority bond */}
          {molecule.stereocentersCount > 0 && (
            <button
              onClick={viewDownLowestPriority}
              title="Align view: lowest priority group (H) pointing directly away from viewer for R/S determination"
              className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-all flex items-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Align R/S View</span>
            </button>
          )}

          {/* Measure Bond Distances */}
          <button
            onClick={() => {
              setMeasuring(!measuring);
              setSelectedAtoms([]);
              setMeasuredDistance(null);
            }}
            title="Measure distance between two atoms"
            className={`p-2 rounded-lg transition-all ${
              measuring ? 'bg-rose-500 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Ruler className="w-4 h-4" />
          </button>
        </div>

        {/* Right Toggle Badges */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-slate-800 shadow-xl pointer-events-auto">
          {onToggleLabels && (
            <button
              onClick={onToggleLabels}
              title="Toggle Atom Labels (C, H, O, N)"
              className={`px-2 py-1 text-xs rounded-lg transition-all font-medium ${
                showLabels ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              Symbols
            </button>
          )}

          {onToggleStereocenters && molecule.stereocentersCount > 0 && (
            <button
              onClick={onToggleStereocenters}
              title="Toggle Stereocenter Halo"
              className={`px-2 py-1 text-xs rounded-lg transition-all font-medium flex items-center gap-1 ${
                highlightStereocenters ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              Chiral Aura
            </button>
          )}

          {onToggleCIPPrio && molecule.stereocentersCount > 0 && (
            <button
              onClick={onToggleCIPPrio}
              title="Toggle CIP Priority Numbers (1, 2, 3, 4)"
              className={`px-2 py-1 text-xs rounded-lg transition-all font-medium flex items-center gap-1 ${
                showCIPPrio ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              CIP (1-4)
            </button>
          )}

          <button
            onClick={captureScreenshot}
            title="Export high-resolution 3D screenshot"
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
          >
            <Camera className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Floating touch gesture guide hint on initial load */}
      <div className="absolute bottom-16 right-4 pointer-events-none opacity-40 hover:opacity-100 transition-opacity hidden md:block">
        <span className="text-[10px] text-slate-400 bg-slate-900/80 px-2 py-1 rounded border border-slate-800">
          Left Drag: Rotate • Scroll: Zoom
        </span>
      </div>
    </div>
  );
};
