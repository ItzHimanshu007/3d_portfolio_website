import { useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface CharacterModelProps {
  rotationSpeed: number;
  scrollProgress: number;
  isActive: boolean;
}

const CharacterModel: React.FC<CharacterModelProps> = ({ rotationSpeed, scrollProgress, isActive }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/character-model.glb');
  const { viewport } = useThree();

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = false;
        mesh.receiveShadow = false;
      }
    });
    return clone;
  }, [scene]);

  useEffect(() => {
    if (groupRef.current) {
      const box = new THREE.Box3().setFromObject(clonedScene);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      clonedScene.position.set(-center.x, -center.y, -center.z);

      const maxDim = Math.max(size.x, size.y, size.z);
      const targetHeight = viewport.height * 0.7;
      const scale = targetHeight / maxDim;
      groupRef.current.scale.setScalar(scale);
    }
  }, [clonedScene, viewport.height]);

  useFrame((state) => {
    if (!groupRef.current || !isActive) return;

    groupRef.current.rotation.y = rotationSpeed;
    const tiltX = Math.sin(scrollProgress * Math.PI) * 0.15;
    groupRef.current.rotation.x = tiltX;

    const time = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(time * 0.8) * 0.06;
  });

  return (
    <group ref={groupRef} visible={isActive}>
      <primitive object={clonedScene} />
    </group>
  );
};

interface HeroModelCanvasProps {
  rotationSpeed: number;
  scrollProgress: number;
  opacity: number;
  isActive: boolean;
}

const HeroModelCanvas: React.FC<HeroModelCanvasProps> = ({ rotationSpeed, scrollProgress, opacity, isActive }) => {
  const [canvasReady, setCanvasReady] = useState(false);

  useEffect(() => {
    // Delay canvas creation slightly to avoid context competition
    const timer = setTimeout(() => setCanvasReady(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!canvasReady) return null;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        opacity,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0.3, 4.5], fov: 40 }}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: 'high-performance',
          failIfMajorPerformanceCaveat: false,
        }}
        style={{ background: 'transparent' }}
        dpr={1}
        frameloop={isActive ? 'always' : 'never'}
      >
        <ambientLight intensity={1.0} />
        <directionalLight position={[3, 5, 5]} intensity={1.8} color="#ffffff" />
        <pointLight position={[-4, 2, -2]} intensity={1.2} color="#ff3333" />
        <pointLight position={[0, -4, 3]} intensity={0.8} color="#ff0000" />

        <CharacterModel
          rotationSpeed={rotationSpeed}
          scrollProgress={scrollProgress}
          isActive={isActive}
        />
      </Canvas>
    </div>
  );
};

useGLTF.preload('/character-model.glb');

export default HeroModelCanvas;
