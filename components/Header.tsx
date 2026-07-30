"use client";

import { useState, useEffect } from "react";
import { Menu01Icon, Cancel01Icon } from "hugeicons-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Accueil", href: "#accueil" },
    { name: "Programme", href: "#programme" },
    { name: "Thème", href: "#theme" },
    { name: "Notre Histoire", href: "#histoire" },
    { name: "RSVP", href: "#rsvp" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      // Offset for the fixed header
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
  };

  return (
    <header 
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-background py-3 md:py-4 border-b border-sand/15 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-12 flex justify-between items-center gap-2">
        {/* Logo */}
        <a 
          href="#accueil" 
          onClick={(e) => handleNavClick(e, "#accueil")}
          className="font-serif text-2xl md:text-3xl text-cream tracking-widest shrink-0"
        >
          J&M
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-sans text-xs tracking-widest uppercase text-cream hover:text-sand transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          {/* RSVP Button */}
          <a 
            href="#rsvp" 
            onClick={(e) => handleNavClick(e, "#rsvp")}
            className="px-3.5 py-1.5 md:px-5 md:py-2 bg-sand text-cream rounded-full font-sans text-xs tracking-widest uppercase hover:bg-terracotta transition-colors shadow-sm font-medium whitespace-nowrap shrink-0"
          >
            <span className="sm:hidden">RSVP</span>
            <span className="hidden sm:inline">Confirmer présence</span>
          </a>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-cream p-1 shrink-0"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <Cancel01Icon size={26} /> : <Menu01Icon size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-background z-40 flex flex-col items-center justify-center transition-transform duration-500 md:hidden ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <button 
          className="absolute top-6 right-6 text-cream"
          onClick={() => setIsOpen(false)}
        >
          <Cancel01Icon size={32} />
        </button>
        <nav className="flex flex-col gap-8 text-center">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-serif text-3xl text-cream hover:text-sand transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#rsvp" 
            onClick={(e) => handleNavClick(e, "#rsvp")}
            className="font-serif text-3xl text-sand hover:text-cream transition-colors duration-300"
          >
            Confirmer présence
          </a>
        </nav>
      </div>
    </header>
  );
}
