"use client";

import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import {
  Environment,
  MeshTransmissionMaterial,
  Center,
  Lightformer
} from '@react-three/drei';
import { EffectComposer, SMAA, Bloom } from '@react-three/postprocessing';
import { SVGLoader } from 'three-stdlib';
import * as THREE from 'three';

function WireframeToGlass({ url }) {
  const svg = useLoader(SVGLoader, url);
  const materialRef = useRef();
  const wireframeRef = useRef();
  const meshGroupRef = useRef();

  const geometries = useMemo(() => {
    return svg.paths.map((path) =>
      path.toShapes(true).map((shape) => {
        const geo = new THREE.ExtrudeGeometry(shape, {
          depth: 8,
          bevelEnabled: true,
          bevelThickness: 4,
          bevelSize: 3,
          bevelSegments: 8,
          curveSegments: 32,
        });
        geo.computeVertexNormals();
        return geo;
      })
    );
  }, [svg]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    const wirePhase = Math.min(time / 1.5, 1);
    const dissolveProgress = Math.max(0, Math.min((time - 1.5) / 2.5, 1));
    const dissolveEase = 1 - Math.pow(1 - dissolveProgress, 3);

    if (wireframeRef.current) {
      wireframeRef.current.opacity = wirePhase * (1 - dissolveEase);
      wireframeRef.current.visible = dissolveProgress < 0.98;
    }

    if (materialRef.current) {
      materialRef.current.distortion = THREE.MathUtils.lerp(2.5, 0.05, dissolveEase);
      materialRef.current.roughness = THREE.MathUtils.lerp(0.5, 0.02, dissolveEase);
      materialRef.current.opacity = dissolveEase;

      if (dissolveProgress >= 1) {
        materialRef.current.distortion = 0.05 + Math.sin(time * 2) * 0.02;
      }
    }

    if (meshGroupRef.current) {
      // Більше руху: плавне гойдання по осях X та Y + постійна повільна ротація
      meshGroupRef.current.rotation.y = THREE.MathUtils.lerp(-0.3, 0, dissolveEase) + Math.sin(time * 0.7) * 0.18;
      meshGroupRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
      meshGroupRef.current.position.y = Math.sin(time * 0.9) * 0.12;
    }
  });

  return (
    <group ref={meshGroupRef} scale={[0.008, -0.008, 0.01]}>
      {geometries.map((geoArray, index) =>
        geoArray.map((geo, i) => (
          <mesh key={`${index}-${i}`} geometry={geo}>
            <lineSegments renderOrder={1}>
              <edgesGeometry args={[geo]} />
              <lineBasicMaterial
                ref={index === 0 && i === 0 ? wireframeRef : null}
                color="white"
                transparent
                opacity={1}
                depthTest={false}
              />
            </lineSegments>

            <MeshTransmissionMaterial
              ref={index === 0 && i === 0 ? materialRef : null}
              backside
              resolution={512}
              samples={4}
              transmission={1}
              ior={1.5}
              thickness={5}
              chromaticAberration={0.12}
              color="#ffffff"
              clearcoat={1}
              clearcoatRoughness={0}
              transparent
              opacity={0}
            />
          </mesh>
        ))
      )}
    </group>
  );
}

export default function GlassBlock() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
  dpr={[1, 2]}
  gl={{
    alpha: true,
    antialias: true,
    overflow: "visible", // Спробуйте це, якщо бачите обрізані краї
    stencil: false,
    depth: true,
    position: "absolute",
    toneMapping: THREE.ACESFilmicToneMapping,
    toneMappingExposure: 1.2,
    premultipliedAlpha: false, // Це часто прибирає дивний "туман" навколо об'єктів
  }}
  // Видаліть onCreated з setClearColor, якщо alpha: true вже працює
  style={{
    background: 'transparent',
  }}
    >
      <ambientLight intensity={0.4} />

      <React.Suspense fallback={null}>
        <Center>
          <WireframeToGlass url="/pattern.svg" />
        </Center>
      </React.Suspense>

      <Environment resolution={256}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <Lightformer form="rect" intensity={4} position={[0, 5, -9]} scale={[10, 10, 1]} />
          <Lightformer form="rect" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[10, 2, 1]} />
          <Lightformer form="rect" intensity={2} rotation-y={-Math.PI / 2} position={[5, 1, -1]} scale={[10, 2, 1]} />
          <Lightformer form="circle" intensity={1} rotation-x={Math.PI / 2} position={[0, -5, 0]} scale={[10, 10, 1]} />
          <Lightformer form="rect" intensity={1.5} position={[0, 2, 5]} scale={[8, 4, 1]} color="#ffe4c4" />
        </group>
      </Environment>

      <EffectComposer 
  disableNormalPass 
  multisampling={0} // Спробуйте 0, якщо бачите артефакти на краях
  frameBufferType={THREE.HalfFloatType} // Покращує якість кольорів
>
  <SMAA />
  <Bloom 
    luminanceThreshold={1} // Підніміть поріг, щоб не "світилося" все підряд
    intensity={0.5} 
    mipmapBlur 
  />
</EffectComposer>
    </Canvas>
  );
}