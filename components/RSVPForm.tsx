"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WhatsappIcon, CallIcon } from "hugeicons-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function RSVPForm() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const countries = [
    { code: "+237", flag: "🇨🇲", name: "Cameroun" },
    { code: "+33", flag: "🇫🇷", name: "France" },
    { code: "+1", flag: "🇺🇸", name: "États-Unis/Canada" },
    { code: "+44", flag: "🇬🇧", name: "Royaume-Uni" },
    { code: "+32", flag: "🇧🇪", name: "Belgique" },
    { code: "+41", flag: "🇨🇭", name: "Suisse" },
    { code: "+49", flag: "🇩🇪", name: "Allemagne" },
    { code: "+225", flag: "🇨🇮", name: "Côte d'Ivoire" },
    { code: "+221", flag: "🇸🇳", name: "Sénégal" },
    { code: "+241", flag: "🇬🇦", name: "Gabon" },
  ];
  
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    tel: "",
    accompanying: 0,
  });
  
  const [whatsappCode, setWhatsappCode] = useState("+237");
  const [telCode, setTelCode] = useState("+237");
  
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!containerRef.current) return;
    
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "accompanying" ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      setErrorMessage("Veuillez entrer votre nom.");
      return;
    }
    if (!formData.whatsapp.trim() && !formData.tel.trim()) {
      setErrorMessage("Veuillez fournir au moins un numéro de téléphone.");
      return;
    }
    
    setErrorMessage("");
    setStatus("loading");
    
    try {
      const payload = {
        ...formData,
        whatsapp: formData.whatsapp.trim() ? `${whatsappCode} ${formData.whatsapp}` : "",
        tel: formData.tel.trim() ? `${telCode} ${formData.tel}` : "",
      };

      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      if (!res.ok) throw new Error("Erreur lors de l'envoi");
      
      setStatus("success");
      setFormData({ name: "", whatsapp: "", tel: "", accompanying: 0 });
    } catch (err) {
      setStatus("error");
      setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <section className="py-24 px-4 md:px-8 bg-background relative z-10">
      <div ref={containerRef} className="max-w-xl mx-auto opacity-0">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="font-belinda text-5xl md:text-6xl text-cream mb-4">Confirmer votre présence</h2>
          <p className="font-serif text-cream text-lg">Nous serions honorés de vous compter parmi nous.</p>
          <div className="w-16 h-[1px] bg-sage mx-auto my-6"></div>
        </div>

        {status === "success" ? (
          <div className="bg-sand/20 border border-sand p-6 rounded-lg max-w-md mx-auto">
            <h3 className="font-serif text-2xl text-cream mb-2">Merci pour votre réponse !</h3>
            <p className="text-cream">Nous avons hâte de célébrer avec vous.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-sand/10 rounded-2xl p-6 md:p-10 space-y-6">
            <div>
              <label htmlFor="name" className="block font-sans text-xs tracking-widest uppercase text-sand font-semibold mb-2">Nom et Prénom *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-background/50 border-b border-cream/30 py-3 px-3 text-cream placeholder:text-cream/40 focus:outline-none focus:border-cream transition-colors rounded-t-md"
                placeholder="Votre nom complet"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="whatsapp" className="flex items-center gap-2 font-sans text-xs tracking-widest uppercase text-sand font-semibold mb-2">
                  <WhatsappIcon size={16} /> WhatsApp
                </label>
                <div className="flex border-b border-cream/30 transition-colors focus-within:border-cream bg-background/50 rounded-t-md">
                  <select
                    value={whatsappCode}
                    onChange={(e) => setWhatsappCode(e.target.value)}
                    className="bg-transparent py-3 pl-3 pr-1 text-cream focus:outline-none appearance-none font-sans [&>option]:bg-espresso [&>option]:text-cream"
                    title="Code pays"
                  >
                    {countries.map(c => (
                      <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="w-full bg-transparent py-3 px-2 text-cream placeholder:text-cream/40 focus:outline-none font-sans"
                    placeholder="Numéro WhatsApp"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="tel" className="flex items-center gap-2 font-sans text-xs tracking-widest uppercase text-sand font-semibold mb-2">
                  <CallIcon size={16} /> Téléphone
                </label>
                <div className="flex border-b border-cream/30 transition-colors focus-within:border-cream bg-background/50 rounded-t-md">
                  <select
                    value={telCode}
                    onChange={(e) => setTelCode(e.target.value)}
                    className="bg-transparent py-3 pl-3 pr-1 text-cream focus:outline-none appearance-none font-sans [&>option]:bg-espresso [&>option]:text-cream"
                    title="Code pays"
                  >
                    {countries.map(c => (
                      <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    id="tel"
                    name="tel"
                    value={formData.tel}
                    onChange={handleChange}
                    className="w-full bg-transparent py-3 px-2 text-cream placeholder:text-cream/40 focus:outline-none font-sans"
                    placeholder="Numéro classique"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="accompanying" className="block font-sans text-xs tracking-widest uppercase text-sand font-semibold mb-2">Nombre de personnes vous accompagnant</label>
              <input
                type="number"
                id="accompanying"
                name="accompanying"
                min="0"
                max="10"
                value={formData.accompanying}
                onChange={handleChange}
                className="w-full bg-background/50 border-b border-cream/30 py-3 px-3 text-cream focus:outline-none focus:border-cream transition-colors rounded-t-md"
                required
              />
            </div>

            {errorMessage && (
              <p className="text-terracotta text-sm font-sans font-medium">{errorMessage}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-cream text-espresso font-semibold py-4 uppercase tracking-[0.2em] font-sans text-sm transition-colors hover:bg-sand hover:text-cream disabled:opacity-50 rounded-lg shadow-md mt-4"
            >
              {status === "loading" ? "Envoi en cours..." : "Confirmer"}
            </button>
            <p className="text-xs text-center text-cream mt-4">* L'un des deux numéros de téléphone est requis.</p>
          </form>
        )}
      </div>
    </section>
  );
}
