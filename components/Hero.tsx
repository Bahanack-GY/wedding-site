"use client";

import { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, Float } from "@react-three/drei";

function Ring() {
  const { scene } = useGLTF("/ring_02.glb");
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <primitive object={scene} scale={0.4} position={[0, 0, 0]} rotation={[Math.PI / 8, 0, 0]} />
    </Float>
  );
}

const leftImages = [
  "/WhatsApp Image 2026-07-16 at 12.43.28 (1).jpeg",
  "/WhatsApp Image 2026-07-16 at 12.43.28 (2).jpeg",
  "/WhatsApp Image 2026-07-16 at 12.43.28 (3).jpeg",
];
const rightImages = [
  "/WhatsApp Image 2026-07-16 at 12.43.28 (4).jpeg",
  "/WhatsApp Image 2026-07-16 at 12.43.28 (5).jpeg",
  "/WhatsApp Image 2026-07-16 at 12.43.28 (6).jpeg",
];

export default function Hero() {
  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    setMounted(true);

    // Left images change every 4 seconds
    const leftInterval = setInterval(() => {
      setLeftIndex((prev) => (prev + 1) % leftImages.length);
    }, 4000);

    // Right images change every 5 seconds
    const rightInterval = setInterval(() => {
      setRightIndex((prev) => (prev + 1) % rightImages.length);
    }, 5000);

    // Countdown timer
    const targetDate = new Date("2026-09-25T17:59:00+01:00").getTime();
    const countdownInterval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        clearInterval(countdownInterval);
      }
    }, 1000);

    return () => {
      clearInterval(leftInterval);
      clearInterval(rightInterval);
      clearInterval(countdownInterval);
    };
  }, []);

  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth"
    });
  };

  return (
    <section className="relative w-full h-[100dvh] flex flex-col bg-background overflow-hidden">
      {/* Top Header */}
      <div className="flex-none pt-24 pb-2 md:pt-32 md:pb-6 flex items-center justify-center bg-background px-4 relative z-10">
        <h1 className="font-belinda text-5xl md:text-[8vw] leading-none text-cream tracking-wide text-center italic">
          Jeff et Murielle
        </h1>
      </div>

      {/* Split Image Section */}
      <div className="flex-1 w-full flex flex-col md:flex-row relative overflow-hidden">
        {/* Top/Left Side */}
        <div className="w-full h-1/2 md:w-1/2 md:h-full relative bg-espresso/5">
          {leftImages.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt="Couple top/left"
              fill
              className={`object-cover transition-opacity duration-[1500ms] ease-in-out ${
                i === leftIndex ? "opacity-100" : "opacity-0"
              }`}
              priority={i === 0}
            />
          ))}
          {/* Subtle overlay for better text contrast if needed */}
          <div className="absolute inset-0 bg-espresso/20 mix-blend-overlay"></div>
        </div>

        {/* Bottom/Right Side */}
        <div className="w-full h-1/2 md:w-1/2 md:h-full relative bg-espresso/10">
          {rightImages.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt="Couple bottom/right"
              fill
              className={`object-cover transition-opacity duration-[1500ms] ease-in-out ${
                i === rightIndex ? "opacity-100" : "opacity-0"
              }`}
              priority={i === 0}
            />
          ))}
          <div className="absolute inset-0 bg-espresso/20 mix-blend-overlay"></div>
        </div>

        {/* Center Overlay Container */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
          {/* Ring Canvas */}
          <div className="w-[220px] h-[220px] md:w-[350px] md:h-[350px] pointer-events-auto flex items-center justify-center">
            <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <Environment preset="studio" />
                <Ring />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={3} />
              </Suspense>
            </Canvas>
          </div>

          {/* Text overlays below ring */}
          <div className="flex flex-col items-center mt-[-15px] md:mt-[-20px] bg-background/70 backdrop-blur-md px-10 py-6 md:px-16 md:py-8 pointer-events-auto border border-cream/10 rounded-2xl max-w-[95vw]">
            <h2 className="font-serif text-4xl md:text-7xl text-cream mb-1 md:mb-2">
              J&M
            </h2>
            <p className="font-sans text-xs md:text-base tracking-[0.3em] uppercase text-cream mb-4 md:mb-6">
              Mariage coutumier
            </p>

            {/* Countdown */}
            {mounted && (
              <div className="flex gap-4 md:gap-6 mb-6 md:mb-8 text-cream font-sans text-xs tracking-widest text-center">
                <div className="flex flex-col gap-1">
                  <span className="text-xl md:text-3xl font-serif">{timeLeft.days}</span>
                  <span className="uppercase text-[0.55rem] md:text-[0.6rem]">Jours</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xl md:text-3xl font-serif">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="uppercase text-[0.55rem] md:text-[0.6rem]">H</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xl md:text-3xl font-serif">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="uppercase text-[0.55rem] md:text-[0.6rem]">Min</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xl md:text-3xl font-serif">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <span className="uppercase text-[0.55rem] md:text-[0.6rem]">Sec</span>
                </div>
              </div>
            )}

            {/* CTA */}
            <button 
              onClick={handleScroll}
              className="px-6 py-2.5 md:px-8 md:py-3 border border-cream text-cream bg-transparent font-sans text-[0.7rem] md:text-xs tracking-[0.2em] uppercase transition-colors duration-300 hover:bg-cream hover:text-background"
            >
              Voir notre histoire
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
