"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type GalleryItem = 
  | { type: "image"; src: string }
  | { type: "quote"; text: string; reference: string };

const items: GalleryItem[] = [
  { type: "image", src: "/WhatsApp Image 2026-07-16 at 12.43.28 (2).jpeg" },
  { type: "image", src: "/WhatsApp Image 2026-07-16 at 12.43.28 (3).jpeg" },
  { 
    type: "quote", 
    text: "« Celui qui trouve une femme trouve le bonheur ; c'est une grâce qu'il obtient de l'Éternel. »", 
    reference: "Proverbes 18: 22" 
  },
  { type: "image", src: "/WhatsApp Image 2026-07-16 at 12.43.28 (4).jpeg" },
  { type: "image", src: "/WhatsApp Image 2026-07-16 at 12.43.28 (5).jpeg" },
  { 
    type: "quote", 
    text: "« Mets-moi comme un sceau sur ton cœur, comme un sceau sur ton bras ; car l'amour est fort comme la mort. »", 
    reference: "Cantique des Cantiques 8:6" 
  },
  { type: "image", src: "/WhatsApp Image 2026-07-16 at 12.43.28 (6).jpeg" },
  { 
    type: "quote", 
    text: "“L'amour est patient, il est plein de bonté ; l'amour n'est point envieux ; l'amour ne se vante point, il ne s'enfle point d'orgueil. Il ne fait rien de malhonnête, il ne cherche point son intérêt, il ne s'irrite point, il ne soupçonne point le mal. Il ne se réjouit point de l'injustice, mais il se réjouit de la vérité. Il excuse tout, croit tout, espère tout, supporte tout. L'amour ne périt jamais.”", 
    reference: "1 Corinthiens 13:4-8" 
  },
  { type: "image", src: "/WhatsApp Image 2026-07-16 at 12.43.28 (7).jpeg" },
];

export default function Gallery() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!galleryRef.current) return;

    itemsRef.current.forEach((item, i) => {
      if (!item) return;
      gsap.fromTo(
        item,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          },
        }
      );
    });
  }, []);

  return (
    <section ref={galleryRef} className="py-24 px-4 md:px-8 bg-background">
      <div ref={(el) => { itemsRef.current[0] = el; }} className="text-center mb-16 opacity-0">
        <h2 className="font-belinda text-5xl md:text-6xl text-cream mb-4">Notre Histoire</h2>
        <div className="w-16 h-[1px] bg-sage mx-auto mb-6"></div>
        <p className="font-serif text-lg text-cream max-w-2xl mx-auto italic">
          "Deux âmes, un seul cœur, une éternité ensemble."
        </p>
      </div>
      
      <div className="max-w-7xl mx-auto columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {items.map((item, idx) => (
          <div
            key={idx}
            ref={(el) => {
              itemsRef.current[idx + 1] = el;
            }}
            className="break-inside-avoid relative group opacity-0"
          >
            {item.type === "image" ? (
              <div className="relative w-full overflow-hidden" style={{ minHeight: '300px' }}>
                <Image
                  src={item.src}
                  alt={`Gallery image ${idx + 1}`}
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover"
                />
              </div>
            ) : (
              <div className="w-full bg-sand/10 p-6 md:p-12 flex flex-col items-center justify-center text-center">
                <p className="font-serif text-lg md:text-xl text-cream leading-relaxed italic mb-6">
                  {item.text}
                </p>
                <p className="font-sans text-xs tracking-[0.2em] uppercase text-sand font-semibold">
                  {item.reference}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
