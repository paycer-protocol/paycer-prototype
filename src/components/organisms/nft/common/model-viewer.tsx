import dynamic from 'next/dynamic';

import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls, Stats, Environment } from '@react-three/drei'
import { AnimationMixer, Box3, Vector3 } from 'three';
import { useEffect, useRef, useState } from 'react';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

interface NftModelViewerProps {
  url: string;
}

function Model({ gltf }: { gltf: GLTF | undefined }) {
  const mixer = useRef<AnimationMixer>()
  useEffect(() => {
    if (gltf && gltf.animations.length > 0) {
      mixer.current = new AnimationMixer(gltf.scene);
      const animation = gltf.animations[Math.floor(Math.random() * gltf.animations.length)];
      const action = mixer.current.clipAction(animation)
      action.play()
    }
  }, [gltf]);
  useFrame(({ clock }) => {
    mixer.current && mixer.current.setTime(clock.getElapsedTime());
  })

  return (
    <>{gltf && <primitive object={gltf.scene} />}</>
  )
}

function NftModelViewerInternal({ url }: NftModelViewerProps) {
  const [model, setModel] = useState<GLTF | undefined>(undefined);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(url, (gltf) => {
      // Center geometry around (0, 0, 0) with normalized size
      const box = new Box3().setFromObject(gltf.scene);
      const center = box.getCenter(new Vector3());
      const size = box.getSize(new Vector3());
      const longestExtent = Math.max(Math.max(size.x, size.y), size.z);
      gltf.scene.position.x += (gltf.scene.position.x - center.x / longestExtent);
      gltf.scene.position.y += (gltf.scene.position.y - center.y / longestExtent);
      gltf.scene.position.z += (gltf.scene.position.z - center.z / longestExtent);
      gltf.scene.scale.x = 1 / longestExtent;
      gltf.scene.scale.y = 1 / longestExtent;
      gltf.scene.scale.z = 1 / longestExtent;

      setModel(gltf);
    })
  }, [url])

  return (
    <Canvas>
      <PerspectiveCamera makeDefault near={0.1} far={100.0} fov={20} position={[0, 0, 5]} />
      <OrbitControls
        minDistance={1.2}
        maxDistance={3.75}
        autoRotate
        enablePan={false}
        enableZoom={true}
        minPolarAngle={Math.PI / 5 * 1}
        maxPolarAngle={Math.PI / 5 * 4}
      />

      <Environment
        preset="apartment"
        scene={undefined}
      />

      <Model gltf={model} />
    </Canvas >
  )
}

const NftModelViewer = dynamic(async () => {
  return NftModelViewerInternal;
}, { ssr: false }) as unknown as (props: NftModelViewerProps) => JSX.Element;

export default NftModelViewer;