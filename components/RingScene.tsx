"use client";

import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, Float } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function Ring() {
  const { scene } = useGLTF("/ring_02/scene.gltf");
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <primitive object={scene} scale={2.5} position={[0, -1, 0]} />
    </Float>
  );
}

export default function RingScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      }
    );
  }, []);

  return (
    <section ref={containerRef} className="w-full min-h-[70vh] flex flex-col md:flex-row items-center justify-center bg-sand/10 py-24 px-4 md:px-12 lg:px-24">
      <div ref={textRef} className="w-full md:w-1/2 text-center md:text-left mb-12 md:mb-0 opacity-0">
        <h2 className="font-belinda text-5xl md:text-7xl text-burgundy mb-6">Un Symbole Éternel</h2>
        <p className="font-serif text-lg md:text-xl text-espresso/80 leading-relaxed max-w-lg mx-auto md:mx-0">
          Nous vous invitons à célébrer l'union de nos deux cœurs. Un jour rempli d'amour, de rires et de souvenirs inoubliables.
        </p>
      </div>
      
      <div className="w-full md:w-1/2 h-[400px] md:h-[500px]">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <Environment preset="studio" />
            <Ring />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
}

// Preload the GLTF model
useGLTF.preload("/ring_02/scene.gltf");
