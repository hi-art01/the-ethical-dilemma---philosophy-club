import React, { useState } from 'react';
import { Quote } from '../types';
import { Calendar, Trash2, CheckCircle2, ArrowRight } from 'lucide-react';

interface AdminDashboardQuotesProps {
  quotes: Quote[];
  onAddQuote: (quote: Omit<Quote, 'id'>) => void;
  onDeleteQuote: (id: string) => void;
  onSetActiveQuote: (id: string) => void;
}

export const AdminDashboardQuotes: React.FC<AdminDashboardQuotesProps> = ({
  quotes,
  onAddQuote,
  onDeleteQuote,
  onSetActiveQuote,
}) => {
  const [activeDate, setActiveDate] = useState('2026-08-20');
  const [quoteText, setQuoteText] = useState('');
  const [author, setAuthor] = useState('');
  const [source, setSource] = useState('');
  const [status, setStatus] = useState<'active' | 'scheduled' | 'archived'>('active');
  const [formSuccess, setFormSuccess] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteText.trim() || !author.trim()) return;

    onAddQuote({
      text: quoteText.trim(),
      author: author.trim(),
      source: source.trim() || 'Philosophical Discourse',
      activeWeek: activeDate,
      status: status,
      era: 'Contemporary',
      commentary: 'Weekly philosophical prompt for classroom and community discussion.',
    });

    setQuoteText('');
    setAuthor('');
    setSource('');
    setFormSuccess('Quote successfully recorded!');
    setTimeout(() => setFormSuccess(''), 3000);
  };

  return (
    <main className="max-w-[1120px] mx-auto px-5 sm:px-8 md:px-12 py-8 md:py-12 w-full animate-in fade-in duration-300">
      <div className="mb-8 md:mb-12">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#041627] tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-[#5e5e5b] text-sm mt-1">
          Curate weekly quotes, manage publication schedule, and monitor archives.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        {/* Left: Add New Quote Form matching Image 11 */}
        <section className="lg:col-span-7 bg-[#fdf9f0] border border-[#dedad1] p-6 sm:p-8 rounded-[2px]">
          <h2 className="font-serif text-xl md:text-2xl font-bold text-[#041627] mb-6 flex items-center justify-between">
            <span>Add New Quote</span>
            <span className="text-xs font-sans font-medium text-[#74777d]">Curation Engine</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold text-[#44474c] uppercase tracking-widest">
                Active Week Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={activeDate}
                  onChange={(e) => setActiveDate(e.target.value)}
                  className="w-full bg-[#fdf9f0] border border-[#c4c6cd] px-3.5 py-2.5 text-sm text-[#1c1c16] rounded-[2px] focus:outline-none focus:border-[#041627]"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold text-[#44474c] uppercase tracking-widest">
                Quote Text
              </label>
              <textarea
                value={quoteText}
                onChange={(e) => setQuoteText(e.target.value)}
                placeholder="Enter philosophical quote..."
                rows={4}
                className="w-full bg-[#fdf9f0] border border-[#c4c6cd] p-3.5 text-sm text-[#1c1c16] rounded-[2px] focus:outline-none focus:border-[#041627] leading-relaxed"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-[#44474c] uppercase tracking-widest">
                  Author
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Socrates, Kant"
                  className="w-full bg-[#fdf9f0] border border-[#c4c6cd] px-3.5 py-2.5 text-sm text-[#1c1c16] rounded-[2px] focus:outline-none focus:border-[#041627]"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-[#44474c] uppercase tracking-widest">
                  Source / Work
                </label>
                <input
                  type="text"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="e.g. Apology, Critique of Pure Reason"
                  className="w-full bg-[#fdf9f0] border border-[#c4c6cd] px-3.5 py-2.5 text-sm text-[#1c1c16] rounded-[2px] focus:outline-none focus:border-[#041627]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold text-[#44474c] uppercase tracking-widest">
                Publication Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'active' | 'scheduled' | 'archived')}
                className="w-full bg-[#fdf9f0] border border-[#c4c6cd] px-3.5 py-2.5 text-sm text-[#1c1c16] rounded-[2px] focus:outline-none focus:border-[#041627]"
              >
                <option value="active">Active (Current Featured Quote)</option>
                <option value="scheduled">Scheduled (Upcoming)</option>
                <option value="archived">Archived (Past Reflection)</option>
              </select>
            </div>

            {formSuccess && (
              <p className="text-xs text-emerald-700 font-medium bg-emerald-50 p-2.5 rounded border border-emerald-200">
                {formSuccess}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-[#041627] text-white text-[12px] font-semibold tracking-widest uppercase py-3 px-6 rounded-[2px] hover:bg-[#1a2b3c] transition-colors"
            >
              Add Quote
            </button>
          </form>
        </section>

        {/* Right: Recent Entries List matching Image 11 */}
        <section className="lg:col-span-5 space-y-4">
          <h2 className="font-serif text-xl font-bold text-[#041627] mb-4">
            Recent Entries
          </h2>

          <div className="space-y-3">
            {quotes.map((q) => {
              const isActive = q.status === 'active';
              const isScheduled = q.status === 'scheduled';
              return (
                <div
                  key={q.id}
                  className="bg-[#fdf9f0] border border-[#dedad1] p-4 rounded-[2px] relative group hover:border-[#041627] transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-serif text-[#44474c]">
                      {q.activeWeek || 'Undated'}
                    </span>
                    <span
                      className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-[2px] ${
                        isActive
                          ? 'bg-[#041627] text-white'
                          : isScheduled
                          ? 'bg-[#f2ede4] text-[#44474c] border border-[#dedad1]'
                          : 'bg-[#e6e2d9] text-[#74777d]'
                      }`}
                    >
                      {isActive ? 'Active' : isScheduled ? 'Scheduled' : 'Archived'}
                    </span>
                  </div>

                  <p className="font-serif text-sm font-semibold text-[#041627] line-clamp-2 mb-2 leading-snug">
                    "{q.text}"
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-[#dedad1]/60 text-xs text-[#5e5e5b]">
                    <span>— {q.author}</span>

                    <div className="flex items-center gap-2">
                      {!isActive && (
                        <button
                          onClick={() => onSetActiveQuote(q.id)}
                          className="text-[11px] text-[#041627] hover:underline font-medium"
                          title="Set as featured quote of the week"
                        >
                          Make Active
                        </button>
                      )}
                      <button
                        onClick={() => onDeleteQuote(q.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Delete quote"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
};
