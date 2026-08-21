import React, { useState } from 'react';
import { Quote } from '../types';
import { ArrowRight, Sparkles, Share2, Check, BookOpen } from 'lucide-react';

interface WeeklyQuoteViewProps {
  quotes: Quote[];
  onOpenArchives: () => void;
  onOpenQuoteDetail: (quote: Quote) => void;
}

export const WeeklyQuoteView: React.FC<WeeklyQuoteViewProps> = ({
  quotes,
  onOpenArchives,
  onOpenQuoteDetail,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Active quote is the designated active one, or the first quote
  const activeQuote = quotes.find((q) => q.status === 'active') || quotes[0];
  const pastReflections = quotes.filter((q) => q.id !== activeQuote?.id).slice(0, 4);

  const handleShare = (quote: Quote, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `"${quote.text}" — ${quote.author} (${quote.source})`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(quote.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <main className="flex-grow flex flex-col items-center w-full max-w-[1120px] mx-auto px-5 sm:px-8 md:px-12 py-10 md:py-20 animate-in fade-in duration-300">
      {/* Hero: Quote of the Week */}
      {activeQuote && (
        <section className="w-full max-w-4xl mx-auto text-center mb-16 md:mb-24 relative">
          {/* Subtle Decorative Big Quotation Mark */}
          <div className="text-[#041627]/10 text-8xl md:text-9xl font-serif select-none leading-none mb-[-2rem] md:mb-[-3rem] flex justify-center">
            “
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-bold text-[#041627] mb-8 relative z-10 leading-[1.25] tracking-tight">
            "{activeQuote.text}"
          </h1>

          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 md:w-16 h-px bg-[#dedad1]"></div>
            <p className="font-serif text-lg md:text-xl font-semibold text-[#44474c] tracking-wide">
              {activeQuote.author}
            </p>
            <div className="w-12 md:w-16 h-px bg-[#dedad1]"></div>
          </div>

          {activeQuote.source && (
            <p className="text-xs md:text-sm uppercase tracking-widest text-[#5e5e5b] font-medium mb-5">
              {activeQuote.source}
            </p>
          )}

          {activeQuote.commentary && (
            <p className="font-sans text-base md:text-lg text-[#5e5e5b] max-w-2xl mx-auto leading-relaxed font-normal">
              {activeQuote.commentary}
            </p>
          )}

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={() => onOpenQuoteDetail(activeQuote)}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#041627] hover:underline px-4 py-2 border border-[#dedad1] bg-[#fdf9f0] hover:bg-[#f2ede4] transition-colors rounded-[2px]"
            >
              <BookOpen className="w-3.5 h-3.5" /> Read Reflection Notes
            </button>
            <button
              onClick={(e) => handleShare(activeQuote, e)}
              className="inline-flex items-center gap-1.5 text-xs text-[#5e5e5b] hover:text-[#041627] px-3 py-2 border border-transparent hover:border-[#dedad1] transition-colors rounded-[2px]"
              title="Copy quote to clipboard"
            >
              {copiedId === activeQuote.id ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-medium">Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>
        </section>
      )}

      {/* Academic Section Divider */}
      <div className="w-full max-w-4xl mx-auto flex items-center justify-center gap-4 mb-16 md:mb-20 opacity-60">
        <div className="w-full h-px bg-[#dedad1]"></div>
        <span className="material-symbols-outlined text-[#74777d] text-sm">diamond</span>
        <div className="w-full h-px bg-[#dedad1]"></div>
      </div>

      {/* Past Reflections Section */}
      <section className="w-full">
        <div className="flex justify-between items-end mb-8 md:mb-10 border-b border-[#dedad1] pb-4">
          <div>
            <h2 className="font-serif text-2xl md:text-[32px] font-semibold text-[#041627]">
              Past Reflections
            </h2>
            <p className="text-xs md:text-sm text-[#5e5e5b] mt-1">
              Curated aphorisms and core themes from recent weekly symposiums.
            </p>
          </div>

          <button
            onClick={onOpenArchives}
            className="text-xs md:text-sm font-semibold text-[#041627] hover:text-[#44474c] uppercase tracking-widest flex items-center gap-2 group cursor-pointer transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3 or 4-Card Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {pastReflections.map((quote) => (
            <article
              key={quote.id}
              onClick={() => onOpenQuoteDetail(quote)}
              className="paper-card p-6 md:p-8 rounded-[2px] flex flex-col justify-between h-full cursor-pointer relative overflow-hidden group shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-md transition-all"
            >
              {/* Subtle quote glyph */}
              <div className="text-[#041627]/10 text-4xl font-serif leading-none select-none mb-2">
                “
              </div>

              <blockquote className="font-serif text-lg md:text-xl font-semibold text-[#041627] mb-6 flex-grow leading-snug">
                "{quote.text}"
              </blockquote>

              <div className="pt-5 border-t border-[#dedad1]/70 mt-auto flex items-end justify-between">
                <div>
                  <p className="text-xs font-semibold text-[#44474c] uppercase tracking-wider mb-1">
                    {quote.author}
                  </p>
                  <p className="text-xs text-[#74777d] font-normal line-clamp-1">
                    {quote.source}
                  </p>
                </div>

                <button
                  onClick={(e) => handleShare(quote, e)}
                  className="text-[#74777d] hover:text-[#041627] p-1 rounded opacity-70 group-hover:opacity-100 transition-opacity"
                  title="Copy quote"
                >
                  {copiedId === quote.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Share2 className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};
