"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Theme() {
  const sectionRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        elementsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  return (
    <section ref={sectionRef} className="py-24 bg-background">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div ref={addToRefs} className="mb-4">
          <h2 className="font-belinda text-5xl md:text-6xl text-cream">Le Thème</h2>
        </div>
        
        <div ref={addToRefs} className="mb-2 max-w-2xl mx-auto">
          <p className="font-serif text-3xl md:text-4xl text-cream italic mb-4">
            Chic traditionnel
          </p>
        </div>

        <div ref={addToRefs} className="mb-4 mt-20 md:mt-28">
          <h2 className="font-belinda text-5xl md:text-6xl text-cream">Dress code</h2>
        </div>
        
        <div ref={addToRefs} className="mb-12 max-w-2xl mx-auto">
          <p className="font-serif text-3xl md:text-4xl text-cream italic mb-4">
            Sortez vos plus belles tenues traditionnelles d’apparat.
          </p>
        </div>
      </div>
    </section>
  );
}
