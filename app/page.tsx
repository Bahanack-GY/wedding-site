import Header from "@/components/Header";
import Decorations from "@/components/Decorations";
import Hero from "@/components/Hero";
import Events from "@/components/Events";
import Theme from "@/components/Theme";
import Gallery from "@/components/Gallery";
import RSVPForm from "@/components/RSVPForm";

export default function Home() {
  return (
    <main className="w-full flex flex-col min-h-[100dvh] relative">
      <Header />
      <Decorations />
      <div id="accueil"><Hero /></div>
      <div id="programme"><Events /></div>
      <div id="theme"><Theme /></div>
      <div id="histoire"><Gallery /></div>
      <div id="rsvp"><RSVPForm /></div>
      
      {/* Simple Footer */}
      <footer className="py-12 bg-espresso text-center">
        <p className="font-serif text-cream text-sm">
          Nous avons hâte de partager ce moment avec vous.
        </p>
      </footer>
    </main>
  );
}
