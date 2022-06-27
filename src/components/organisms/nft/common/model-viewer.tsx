import dynamic from 'next/dynamic';

import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls, Stats, Environment } from '@react-three/drei'
import { Group } from 'three';
import { useEffect, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

interface NftModelViewerProps {
  url: string;
}

function NftModelViewerInternal({ url }: NftModelViewerProps) {
  const [model, setModel] = useState<Group | undefined>(undefined);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(url, (gltf) => {
      setModel(gltf.scene);
    })
  }, [url])

  return (
    <Canvas>
      <PerspectiveCamera makeDefault near={0.1} far={100.0} fov={20} />
      <OrbitControls minDistance={30} maxDistance={30} autoRotate enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2} />

      <Environment
        background
        preset="dawn"
        scene={undefined}
      />

      {model && <primitive object={model} />}

      <Stats />
    </Canvas>
  )
}

const NftModelViewer = dynamic(async () => {
  return NftModelViewerInternal;
}, { ssr: false });

export default NftModelViewer;