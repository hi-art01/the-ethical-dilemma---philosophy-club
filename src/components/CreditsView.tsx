import React from 'react';
import { Crown, PenLine } from 'lucide-react';

export const CreditsView: React.FC = () => (
  <main className="flex-grow w-full max-w-[900px] mx-auto px-5 sm:px-8 md:px-12 py-12 md:py-20 animate-in fade-in duration-300">
    <section className="text-center mb-12">
      <p className="eyebrow mb-4">The people behind the dialogue</p>
      <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#041627]">Credits</h1>
      <p className="text-[#5e5e5b] mt-4">Ink & Ethics is managed and shaped by its student leaders.</p>
    </section>
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="paper-card p-8 text-center rounded-[4px]"><Crown className="w-7 h-7 mx-auto text-[#ba5a3a] mb-4" strokeWidth={1.5} /><p className="eyebrow mb-2">President</p><h2 className="font-serif text-2xl font-semibold text-[#041627]">Erik Mathaney</h2></div>
      <div className="paper-card p-8 text-center rounded-[4px]"><Crown className="w-7 h-7 mx-auto text-[#ba5a3a] mb-4" strokeWidth={1.5} /><p className="eyebrow mb-2">Vice Presidents</p><h2 className="font-serif text-2xl font-semibold text-[#041627]">Arthur Yount & Augie Wilhelm</h2></div>
    </section>
    <section className="mt-6 paper-card p-8 text-center rounded-[4px]"><PenLine className="w-6 h-6 mx-auto text-[#ba5a3a] mb-4" strokeWidth={1.5} /><p className="text-sm uppercase tracking-widest text-[#74777d]">Managed by Erik · Designed by Arthur</p></section>
  </main>
);
