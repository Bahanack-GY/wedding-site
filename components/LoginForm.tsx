"use client";

import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "hugeicons-react";

export default function LoginForm({ action }: { action: (formData: FormData) => void }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={action} className="bg-sand/10 p-8 md:p-12 rounded-2xl max-w-md w-full flex flex-col gap-8 shadow-xl border border-cream/10">
      <div className="text-center">
        <h1 className="text-4xl font-belinda text-cream mb-2">Accès Sécurisé</h1>
        <p className="font-serif text-cream/70 text-sm italic">Espace administrateur</p>
      </div>
      
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="font-sans text-xs tracking-widest uppercase text-sand font-semibold">Mot de passe</label>
        <div className="relative">
          <input 
            type={showPassword ? "text" : "password"}
            name="password" 
            id="password"
            placeholder="••••••••"
            className="w-full bg-background/50 border-b border-cream/30 py-3 pl-3 pr-10 text-cream focus:outline-none focus:border-cream transition-colors rounded-t-md"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/50 hover:text-cream transition-colors"
            aria-label="Toggle password visibility"
          >
            {showPassword ? <ViewOffIcon size={20} /> : <ViewIcon size={20} />}
          </button>
        </div>
      </div>
      
      <button 
        type="submit"
        className="w-full bg-sand text-background font-sans py-3.5 uppercase tracking-widest text-sm rounded-lg hover:bg-terracotta transition-colors shadow-md font-semibold"
      >
        Se connecter
      </button>
    </form>
  );
}
