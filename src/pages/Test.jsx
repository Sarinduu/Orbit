import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { useGLTF } from '@react-three/drei'

const EarthModel = () => {
  const { scene } = useGLTF('/scene.gltf');
  const earthRef = useRef();

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.002; // Adjust rotation speed as needed
    }
  });

  return <primitive ref={earthRef} object={scene} scale={[1.5, 1.5, 1.5]}/>;
};

const Test = () => {
  return (
    <div >
      <Canvas>
        <ambientLight intensity={1.5}/>
        <OrbitControls enableZoom={false} />
        <Suspense fallback={null}>
          <EarthModel />
        </Suspense>
        <Environment preset="night" />
      </Canvas>
    </div>
  );
};

export default Test;
