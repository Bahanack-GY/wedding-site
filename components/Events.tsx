"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Events() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    itemsRef.current.forEach((item, i) => {
      if (!item) return;
      gsap.fromTo(
        item,
        { opacity: 0, y: 30 },
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
    <section className="py-24 px-4 md:px-8 bg-background">
      <div ref={containerRef} className="max-w-4xl mx-auto">
        <div 
          ref={(el) => { itemsRef.current[0] = el; }} 
          className="text-center mb-8 opacity-0"
        >
          <div className="max-w-2xl mx-auto px-4 mb-24 md:mb-32">
            <div className="font-serif text-lg md:text-xl text-cream leading-relaxed">
              Les familles <span className="font-sans text-2xl md:text-3xl font-bold tracking-widest text-white uppercase">Ndiomo</span> et <span className="font-sans text-2xl md:text-3xl font-bold tracking-widest text-white uppercase">Amba</span> ont le plaisir de vous convier à l'union traditionnelle de leurs enfants
              
              <div className="mt-8 md:mt-12 flex items-center justify-center gap-4 md:gap-10">
                <span className="font-belinda text-5xl md:text-7xl text-white">Jeff</span> 
                <span className="font-serif text-xl md:text-3xl italic text-white/90">&</span> 
                <span className="font-belinda text-5xl md:text-7xl text-white">Murielle</span>
              </div>
            </div>
          </div>

          <h2 className="font-belinda text-5xl md:text-6xl text-cream mb-6">Programme</h2>
          <div className="w-16 h-[1px] bg-sage mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
          {/* Cérémonie de la dote */}
          <div 
            ref={(el) => { itemsRef.current[1] = el; }} 
            className="flex flex-col items-center text-center p-6 md:p-8 bg-sand/10 opacity-0"
          >
            <h3 className="font-serif text-2xl text-white mb-4">Cérémonie de la dote</h3>
            <p className="font-sans text-base md:text-lg font-bold tracking-widest uppercase text-cream mb-6">25 septembre 2026 à 13h00</p>
            <p className="font-serif text-lg text-cream leading-relaxed">
              Akonolinga au quartier MBANKOLOBOUDOU,<br />
              en face de l’hôpital de district d’Akonolinga.
            </p>
            
            <a 
              href="https://maps.app.goo.gl/4hurEBaGNTUpyuSD6"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block bg-sand text-background font-sans text-xs tracking-widest uppercase py-3 px-8 rounded-lg hover:bg-terracotta transition-colors shadow-sm font-semibold"
            >
              Voir l'itinéraire
            </a>
          </div>

          {/* Réception festive */}
          <div 
            ref={(el) => { itemsRef.current[2] = el; }} 
            className="flex flex-col items-center text-center p-6 md:p-8 bg-sand/10 opacity-0"
          >
            <h3 className="font-serif text-2xl text-white mb-4">Réception festive</h3>
            <p className="font-sans text-base md:text-lg font-bold tracking-widest uppercase text-cream mb-6">26 septembre 2026 à 18h00</p>
            <p className="font-serif text-lg text-cream leading-relaxed">
              Soirée de réception à Yaoundé au carrefour Bastos, <br />
              à la salle de fête KING DAVID<br />
              <span className="text-sm italic text-cream/90">(en face du Lounge Black and White).</span>
            </p>
            
            <a 
              href="https://maps.app.goo.gl/5676oZJaTEcECvN66"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block bg-sand text-background font-sans text-xs tracking-widest uppercase py-3 px-8 rounded-lg hover:bg-terracotta transition-colors shadow-sm font-semibold"
            >
              Voir l'itinéraire
            </a>
          </div>
        </div>
        
        <div className="mt-16 text-center max-w-xl mx-auto opacity-100">
          <p className="font-sans text-xs md:text-sm text-cream uppercase tracking-widest leading-relaxed">
            <span className="text-sand font-bold">NB :</span> veuillez respecter les horaires précisées afin que les cérémonies se déroulent sans encombre. Merci.
          </p>
        </div>
      </div>
    </section>
  );
}
