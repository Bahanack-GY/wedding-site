"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Decorations() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const getEndPosition = () => {
        const targetEl = document.querySelector("#rsvp");
        return targetEl ? targetEl.getBoundingClientRect().top + window.scrollY : 0;
      };

      gsap.to(containerRef.current, {
        y: getEndPosition,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: () => `+=${getEndPosition()}`,
          scrub: true,
          invalidateOnRefresh: true, // Recalculates on resize
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="hidden md:block absolute top-0 left-0 w-full h-screen pointer-events-none z-20 overflow-visible"
    >
      {/* Obom: top left edge */}
      <div className="absolute top-32 -left-12 md:-left-8 w-40 h-56 md:w-64 md:h-80 rotate-[12deg] opacity-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-sand/40">
        <Image src="/obom.jpeg" alt="Obom pattern" fill className="object-cover" />
      </div>
      
      {/* Leopard: top right edge */}
      <div className="absolute top-48 -right-12 md:-right-8 w-32 h-48 md:w-56 md:h-72 -rotate-[15deg] opacity-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-sand/40">
        <Image src="/leopard.avif" alt="Leopard pattern" fill className="object-cover" />
      </div>
      
      {/* Djembe: bottom left/right edge */}
      <div className="absolute bottom-24 -right-10 md:right-8 w-36 h-48 md:w-56 md:h-64 rotate-[20deg] opacity-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-sand/40">
        <Image src="/djembe.jpeg" alt="Djembe drum" fill className="object-cover" />
      </div>
    </div>
  );
}
