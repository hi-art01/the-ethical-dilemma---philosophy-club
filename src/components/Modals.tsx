import React, { useState } from 'react';
import { ClubInfo, Quote, Topic, ReadingItem } from '../types';
import { X, ExternalLink, BookOpen, MessageSquare, Check, Search, Mail, Send, Sparkles } from 'lucide-react';
import { initialReadingList } from '../data/initialData';

// --- JOIN CLUB MODAL ---
export const JoinClubModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  clubInfo: ClubInfo;
}> = ({ isOpen, onClose, clubInfo }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [grade, setGrade] = useState('11th Grade (Junior)');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#041627]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#fdf9f0] border border-[#dedad1] w-full max-w-lg p-6 sm:p-8 rounded-[2px] shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#5e5e5b] hover:text-[#041627] p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#041627] mb-2">Welcome to the Symposium!</h3>
            <p className="text-sm text-[#44474c] mb-6">
              Thank you, {name}. You've been registered for {clubInfo.clubName}. We meet {clubInfo.frequency} in {clubInfo.classroom}.
            </p>

            <div className="space-y-3">
              <a
                href={clubInfo.groupmeUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#041627] text-white text-xs font-semibold uppercase tracking-widest py-3 px-4 rounded-[2px] flex items-center justify-center gap-2 hover:bg-[#1a2b3c] transition-colors inline-flex"
              >
                <MessageSquare className="w-4 h-4" /> Open GroupMe Channel
              </a>
              <button
                onClick={onClose}
                className="w-full text-xs text-[#5e5e5b] hover:text-[#041627] underline py-2"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2 className="font-serif text-2xl font-bold text-[#041627] mb-1">
              Join {clubInfo.clubName}
            </h2>
            <p className="text-xs sm:text-sm text-[#5e5e5b] mb-6">
              No prior philosophical experience required. All respectful questioning and inquiry welcome.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold text-[#44474c] uppercase tracking-widest mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Maya Lin"
                  className="w-full bg-[#fdf9f0] border border-[#c4c6cd] px-3 py-2 text-sm text-[#1c1c16] rounded-[2px] focus:outline-none focus:border-[#041627]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#44474c] uppercase tracking-widest mb-1">
                  Student Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@school.edu"
                  className="w-full bg-[#fdf9f0] border border-[#c4c6cd] px-3 py-2 text-sm text-[#1c1c16] rounded-[2px] focus:outline-none focus:border-[#041627]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#44474c] uppercase tracking-widest mb-1">
                  Grade Level / Year
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full bg-[#fdf9f0] border border-[#c4c6cd] px-3 py-2 text-sm text-[#1c1c16] rounded-[2px] focus:outline-none focus:border-[#041627]"
                >
                  <option>9th Grade (Freshman)</option>
                  <option>10th Grade (Sophomore)</option>
                  <option>11th Grade (Junior)</option>
                  <option>12th Grade (Senior)</option>
                  <option>Faculty / Guest</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#041627] text-white text-[12px] font-semibold tracking-widest uppercase py-3 px-6 rounded-[2px] hover:bg-[#1a2b3c] transition-colors"
                >
                  Confirm Registration
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

// --- TOPIC DEEP DIVE MODAL ---
export const TopicDetailModal: React.FC<{
  topic: Topic | null;
  onClose: () => void;
}> = ({ topic, onClose }) => {
  if (!topic) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#041627]/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#fdf9f0] border border-[#dedad1] w-full max-w-2xl p-6 sm:p-8 rounded-[2px] shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#5e5e5b] hover:text-[#041627] p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-[11px] font-semibold tracking-widest uppercase text-[#5e5e5b] mb-2">
          {topic.category}
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#041627] mb-4">
          {topic.title}
        </h2>

        <p className="text-sm sm:text-base text-[#44474c] leading-relaxed mb-6">
          {topic.description}
        </p>

        {topic.keyThinkers && topic.keyThinkers.length > 0 && (
          <div className="mb-6 p-4 bg-[#f2ede4] rounded-[2px]">
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#041627] mb-2">
              Primary Thinkers & Authors
            </h4>
            <div className="flex flex-wrap gap-2">
              {topic.keyThinkers.map((thinker) => (
                <span
                  key={thinker}
                  className="text-xs bg-[#fdf9f0] border border-[#dedad1] text-[#1c1c16] px-2.5 py-1 rounded-[2px]"
                >
                  {thinker}
                </span>
              ))}
            </div>
          </div>
        )}

        {topic.discussionQuestions && topic.discussionQuestions.length > 0 && (
          <div className="mb-6">
            <h4 className="font-serif text-lg font-bold text-[#041627] mb-3">
              Dialectic Discussion Questions
            </h4>
            <ul className="space-y-2.5">
              {topic.discussionQuestions.map((q, idx) => (
                <li key={idx} className="text-sm text-[#44474c] flex items-start gap-2.5">
                  <span className="font-serif font-bold text-[#041627] text-base shrink-0">
                    {idx + 1}.
                  </span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="pt-4 border-t border-[#dedad1] flex items-center justify-between">
          {topic.resourceLink ? (
            <a
              href={topic.resourceLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#041627] hover:underline"
            >
              Open Stanford Encyclopedia Deep Dive <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <span className="text-xs text-[#74777d]">Reading materials distributed at meeting.</span>
          )}

          <button
            onClick={onClose}
            className="bg-[#041627] text-white text-[11px] font-semibold uppercase tracking-wider px-4 py-2 rounded-[2px]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// --- QUOTE DETAIL MODAL ---
export const QuoteDetailModal: React.FC<{
  quote: Quote | null;
  onClose: () => void;
}> = ({ quote, onClose }) => {
  if (!quote) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#041627]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#fdf9f0] border border-[#dedad1] w-full max-w-lg p-6 sm:p-8 rounded-[2px] shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#5e5e5b] hover:text-[#041627] p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-4xl font-serif text-[#041627]/20 select-none leading-none">“</div>
        <blockquote className="font-serif text-xl sm:text-2xl font-bold text-[#041627] my-3 leading-snug">
          "{quote.text}"
        </blockquote>

        <p className="font-serif text-base font-semibold text-[#44474c] mb-1">
          — {quote.author}
        </p>
        <p className="text-xs uppercase tracking-widest text-[#5e5e5b] mb-4">
          {quote.source}
        </p>

        {quote.commentary && (
          <div className="p-4 bg-[#f2ede4] border-l-2 border-[#041627] rounded-[2px] text-sm text-[#44474c] leading-relaxed mb-6">
            {quote.commentary}
          </div>
        )}

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#041627] text-white text-[11px] font-semibold uppercase tracking-wider px-5 py-2 rounded-[2px]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

// --- READING LIST MODAL ---
export const ReadingListModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#041627]/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#fdf9f0] border border-[#dedad1] w-full max-w-2xl p-6 sm:p-8 rounded-[2px] shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#5e5e5b] hover:text-[#041627] p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#041627] mb-2">
          Recommended Reading List
        </h2>
        <p className="text-xs sm:text-sm text-[#5e5e5b] mb-6">
          Foundational philosophical treatises and contemporary commentaries recommended for club members.
        </p>

        <div className="space-y-4">
          {initialReadingList.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-[#fdf9f0] border border-[#dedad1] rounded-[2px] hover:border-[#041627] transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#041627]">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#44474c] mt-0.5">
                    by {item.author} ({item.era})
                  </p>
                </div>
                <span className="text-[10px] uppercase font-semibold text-[#5e5e5b] bg-[#f2ede4] px-2 py-1 rounded shrink-0">
                  {item.category}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#5e5e5b] mt-2 leading-relaxed">
                {item.description}
              </p>
              {item.link && (
                <div className="mt-3">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#041627] hover:underline uppercase tracking-wider"
                  >
                    Access Free Digital Edition <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- ARCHIVES MODAL ---
export const ArchivesModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  quotes: Quote[];
  onSelectQuote: (quote: Quote) => void;
}> = ({ isOpen, onClose, quotes, onSelectQuote }) => {
  const [filter, setFilter] = useState('');

  if (!isOpen) return null;

  const filtered = quotes.filter(
    (q) =>
      q.text.toLowerCase().includes(filter.toLowerCase()) ||
      q.author.toLowerCase().includes(filter.toLowerCase()) ||
      q.source.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#041627]/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#fdf9f0] border border-[#dedad1] w-full max-w-2xl p-6 sm:p-8 rounded-[2px] shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#5e5e5b] hover:text-[#041627] p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#041627] mb-2">
          Philosophical Archives
        </h2>
        <p className="text-xs sm:text-sm text-[#5e5e5b] mb-5">
          A complete repository of past weekly reflections and historical citations.
        </p>

        <div className="mb-6 relative">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search by quote, thinker, or source text..."
            className="w-full bg-[#fdf9f0] border border-[#c4c6cd] px-3.5 py-2.5 text-sm text-[#1c1c16] rounded-[2px] focus:outline-none focus:border-[#041627]"
          />
        </div>

        <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
          {filtered.map((quote) => (
            <div
              key={quote.id}
              onClick={() => {
                onSelectQuote(quote);
                onClose();
              }}
              className="p-4 bg-[#fdf9f0] border border-[#dedad1] rounded-[2px] cursor-pointer hover:border-[#041627] hover:bg-[#f7f3ea] transition-all"
            >
              <blockquote className="font-serif text-base font-semibold text-[#041627] mb-2">
                "{quote.text}"
              </blockquote>
              <div className="flex items-center justify-between text-xs text-[#5e5e5b]">
                <span className="font-semibold text-[#44474c]">— {quote.author}</span>
                <span>{quote.source}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- CONTACT MODAL ---
export const ContactModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  clubInfo: ClubInfo;
}> = ({ isOpen, onClose, clubInfo }) => {
  const [msgSent, setMsgSent] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMsgSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#041627]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#fdf9f0] border border-[#dedad1] w-full max-w-lg p-6 sm:p-8 rounded-[2px] shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#5e5e5b] hover:text-[#041627] p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {msgSent ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#041627] mb-2">Message Dispatched</h3>
            <p className="text-sm text-[#44474c] mb-6">
              Thank you, {senderName}. Your note has been routed to {clubInfo.presidentName} and {clubInfo.facultyAdvisor}.
            </p>
            <button
              onClick={onClose}
              className="bg-[#041627] text-white text-xs font-semibold uppercase tracking-wider py-2.5 px-6 rounded-[2px]"
            >
              Return
            </button>
          </div>
        ) : (
          <>
            <h2 className="font-serif text-2xl font-bold text-[#041627] mb-1">
              Contact Leadership
            </h2>
            <p className="text-xs sm:text-sm text-[#5e5e5b] mb-6">
              Reach out to the student officers or faculty advisor with inquiries or proposed debate topics.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold text-[#44474c] uppercase tracking-widest mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full bg-[#fdf9f0] border border-[#c4c6cd] px-3 py-2 text-sm text-[#1c1c16] rounded-[2px]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#44474c] uppercase tracking-widest mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  className="w-full bg-[#fdf9f0] border border-[#c4c6cd] px-3 py-2 text-sm text-[#1c1c16] rounded-[2px]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#44474c] uppercase tracking-widest mb-1">
                  Inquiry / Topic Proposal
                </label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#fdf9f0] border border-[#c4c6cd] p-3 text-sm text-[#1c1c16] rounded-[2px]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#041627] text-white text-[12px] font-semibold tracking-widest uppercase py-3 rounded-[2px] hover:bg-[#1a2b3c] transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

// --- GLOBAL SEARCH MODAL ---
export const SearchModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  quotes: Quote[];
  topics: Topic[];
  onSelectQuote: (quote: Quote) => void;
  onSelectTopic: (topic: Topic) => void;
}> = ({ isOpen, onClose, quotes, topics, onSelectQuote, onSelectTopic }) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const matchedQuotes = query.trim()
    ? quotes.filter(
        (q) =>
          q.text.toLowerCase().includes(query.toLowerCase()) ||
          q.author.toLowerCase().includes(query.toLowerCase()) ||
          q.source.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const matchedTopics = query.trim()
    ? topics.filter(
        (t) =>
          t.title.toLowerCase().includes(query.toLowerCase()) ||
          t.description.toLowerCase().includes(query.toLowerCase()) ||
          t.category.toLowerCase().includes(query.toLowerCase()) ||
          t.keyThinkers?.some((k) => k.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 bg-[#041627]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#fdf9f0] border border-[#dedad1] w-full max-w-xl p-6 rounded-[2px] shadow-2xl relative">
        <div className="flex items-center gap-3 border-b border-[#c4c6cd] pb-3 mb-4">
          <Search className="w-5 h-5 text-[#5e5e5b]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search quotes, topics, authors, or concepts..."
            className="w-full bg-transparent border-0 text-base text-[#1c1c16] focus:outline-none placeholder-[#74777d]"
            autoFocus
          />
          <button onClick={onClose} className="text-[#5e5e5b] hover:text-[#041627]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto space-y-4">
          {query.trim() === '' ? (
            <p className="text-xs text-[#74777d] py-6 text-center">
              Type keywords like "Socrates", "AI", "Stoicism", "Epistemology", or "Rawls"...
            </p>
          ) : (
            <>
              {matchedTopics.length > 0 && (
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-[#5e5e5b] mb-2">
                    Topics ({matchedTopics.length})
                  </div>
                  <div className="space-y-2">
                    {matchedTopics.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => {
                          onSelectTopic(t);
                          onClose();
                        }}
                        className="p-3 bg-[#f2ede4] hover:bg-[#ece8df] rounded-[2px] cursor-pointer"
                      >
                        <div className="font-serif text-sm font-bold text-[#041627]">{t.title}</div>
                        <div className="text-xs text-[#5e5e5b] line-clamp-1">{t.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchedQuotes.length > 0 && (
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-[#5e5e5b] mb-2">
                    Quotes ({matchedQuotes.length})
                  </div>
                  <div className="space-y-2">
                    {matchedQuotes.map((q) => (
                      <div
                        key={q.id}
                        onClick={() => {
                          onSelectQuote(q);
                          onClose();
                        }}
                        className="p-3 bg-[#f2ede4] hover:bg-[#ece8df] rounded-[2px] cursor-pointer"
                      >
                        <div className="font-serif text-xs font-semibold text-[#041627]">"{q.text}"</div>
                        <div className="text-[11px] text-[#5e5e5b] mt-1">— {q.author}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchedTopics.length === 0 && matchedQuotes.length === 0 && (
                <p className="text-xs text-[#74777d] py-6 text-center">
                  No philosophical entries found matching "{query}".
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
