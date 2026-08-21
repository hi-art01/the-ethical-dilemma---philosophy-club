import React from 'react';
import { Feather, LockKeyhole } from 'lucide-react';

export const EssaysView: React.FC = () => {
  return (
    <main className="flex-grow w-full max-w-[1120px] mx-auto px-5 sm:px-8 md:px-12 py-12 md:py-20 animate-in fade-in duration-300">
      <section className="max-w-3xl mb-12 md:mb-16">
        <p className="eyebrow mb-4">From the club notebook</p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#041627] tracking-tight leading-[1.05]">
          Philosophy Essays
        </h1>
        <p className="text-base sm:text-lg text-[#44474c] leading-relaxed mt-6 max-w-2xl">
          A future home for student writing, long-form reflections, and arguments worth sitting with.
        </p>
      </section>

      <section className="paper-card min-h-[300px] flex flex-col items-center justify-center text-center px-6 py-16 rounded-[4px]">
        <div className="w-14 h-14 rounded-full border border-[#c9b8a7] bg-[#ece4d6] flex items-center justify-center mb-6">
          <Feather className="w-6 h-6 text-[#ba5a3a]" strokeWidth={1.5} />
        </div>
        <p className="eyebrow mb-3">Coming soon</p>
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-[#041627]">
          The page is still being written.
        </h2>
        <p className="text-sm md:text-base text-[#5e5e5b] max-w-md leading-relaxed mt-3">
          Check back soon for essays from the Ink & Ethics community.
        </p>
        <div className="mt-7 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#74777d]">
          <LockKeyhole className="w-3.5 h-3.5" /> Archive opening soon
        </div>
      </section>
    </main>
  );
};
