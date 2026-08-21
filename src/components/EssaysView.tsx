import React, { useEffect, useState } from 'react';
import { Feather, LockKeyhole, Send } from 'lucide-react';
import { Essay } from '../essayTypes';
import { fetchPublicEssays, submitEssay } from '../utils/essayApi';

const emptyForm = { title: '', body: '', authorName: '', email: '', isPrivate: false };

const formatSubmissionDate = (date: string) => {
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? 'Date unavailable' : parsed.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const EssaysView: React.FC = () => {
  const [essays, setEssays] = useState<Essay[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [serviceReady, setServiceReady] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchPublicEssays().then((items) => { setEssays(items); setServiceReady(true); }).catch(() => setServiceReady(false));
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage('');
    try {
      const essay = await submitEssay(form);
      if (!essay.isPrivate) setEssays((current) => [essay, ...current]);
      setForm(emptyForm);
      setMessage(form.isPrivate ? 'Your private essay was submitted.' : 'Your essay was submitted for everyone to read.');
    } catch {
      setMessage('Essay submissions will be available when the site is connected to its server.');
    }
  };

  return (
    <main className="flex-grow w-full max-w-[1120px] mx-auto px-5 sm:px-8 md:px-12 py-12 md:py-20 animate-in fade-in duration-300">
      <section className="max-w-3xl mb-12"><p className="eyebrow mb-4">From the club notebook</p><h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#041627] tracking-tight leading-[1.05]">Philosophy Essays</h1><p className="text-base sm:text-lg text-[#44474c] leading-relaxed mt-6 max-w-2xl">A home for student writing, long-form reflections, and arguments worth sitting with.</p><div className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-[#ece4d6] border border-[#d8d0c3] text-xs font-semibold uppercase tracking-widest text-[#041627]">Bi-monthly essay competition</div></section>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        <section className="lg:col-span-3 space-y-5">
          <div className="flex items-end justify-between border-b border-[#d8d0c3] pb-3"><div><p className="eyebrow">Public archive</p><h2 className="font-serif text-2xl font-semibold text-[#041627] mt-1">Community essays</h2></div>{!serviceReady && <span className="text-[11px] text-[#74777d]">Server connection pending</span>}</div>
          {essays.length === 0 ? <div className="paper-card min-h-[260px] flex flex-col items-center justify-center text-center px-6 py-14 rounded-[4px]"><Feather className="w-8 h-8 text-[#ba5a3a] mb-5" strokeWidth={1.5} /><h3 className="font-serif text-2xl font-semibold text-[#041627]">The archive is still being written.</h3><p className="text-sm text-[#5e5e5b] max-w-sm mt-3">Be the first to share a thoughtful question, argument, or reflection.</p></div> : essays.map((essay) => <article key={essay.id} className="paper-card p-6 rounded-[4px]"><div className="flex flex-wrap items-center justify-between gap-2"><p className="eyebrow">{essay.authorName || 'Anonymous'}</p><time dateTime={essay.createdAt} className="text-xs text-[#74777d]">Submitted {formatSubmissionDate(essay.createdAt)}</time></div><h3 className="font-serif text-2xl font-semibold text-[#041627] mt-2">{essay.title}</h3><p className="text-sm text-[#44474c] leading-relaxed mt-3 whitespace-pre-wrap">{essay.body}</p></article>)}
        </section>
        <section className="lg:col-span-2 paper-card p-6 sm:p-8 rounded-[4px]"><p className="eyebrow mb-2">Add your voice</p><h2 className="font-serif text-2xl font-semibold text-[#041627]">Submit an essay</h2><p className="text-sm text-[#5e5e5b] leading-relaxed mt-3 mb-6">Public essays appear in the archive. Private essays are sent to the club without being displayed publicly.</p>
          <form onSubmit={handleSubmit} className="space-y-4"><input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Essay title" className="w-full bg-transparent border border-[#c4c6cd] rounded-[2px] px-3 py-2.5 text-sm" /><input value={form.authorName} onChange={(e) => setForm({ ...form, authorName: e.target.value })} placeholder="Your name (optional)" className="w-full bg-transparent border border-[#c4c6cd] rounded-[2px] px-3 py-2.5 text-sm" /><div><input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email address" className="w-full bg-transparent border border-[#c4c6cd] rounded-[2px] px-3 py-2.5 text-sm" /><p className="text-[11px] text-[#74777d] mt-1.5">Your email will only be used to contact you if you win the essay competition.</p></div><textarea required rows={7} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} placeholder="Write your essay..." className="w-full bg-transparent border border-[#c4c6cd] rounded-[2px] px-3 py-2.5 text-sm resize-y" /><label className="flex items-start gap-2 text-sm text-[#44474c]"><input type="checkbox" checked={form.isPrivate} onChange={(e) => setForm({ ...form, isPrivate: e.target.checked })} className="mt-1" /><span><strong className="text-[#041627]">Keep this private</strong><br /><span className="text-xs text-[#74777d]">Only the future server will receive it.</span></span></label><button type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-[#041627] text-white text-xs font-semibold uppercase tracking-widest py-3 rounded-[2px] hover:bg-[#1a2b3c]"><Send className="w-3.5 h-3.5" /> Submit Essay</button>{message && <p className="text-xs text-[#5e5e5b] leading-relaxed">{message}</p>}</form>
          <div className="flex items-center gap-2 text-[11px] text-[#74777d] mt-6"><LockKeyhole className="w-3.5 h-3.5" /> Privacy choice is sent with the submission.</div>
        </section>
      </div>
    </main>
  );
};
