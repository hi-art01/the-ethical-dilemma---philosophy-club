import React, { useState, useEffect } from 'react';
import { Topic, TopicCategory } from '../types';
import { X, Image as ImageIcon, Sparkles } from 'lucide-react';

interface AdminAddTopicModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveTopic: (topic: Topic) => void;
  editingTopic?: Topic | null;
}

const CATEGORIES: TopicCategory[] = [
  'Ethics & Moral Philosophy',
  'Existentialism & Meaning',
  'Political Philosophy',
  'Epistemology',
  'Metaphysics',
  'Aesthetics',
];

export const AdminAddTopicModal: React.FC<AdminAddTopicModalProps> = ({
  isOpen,
  onClose,
  onSaveTopic,
  editingTopic,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<TopicCategory>('Ethics & Moral Philosophy');
  const [resourceLink, setResourceLink] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [questions, setQuestions] = useState('');
  const [thinkers, setThinkers] = useState('');

  useEffect(() => {
    if (editingTopic) {
      setTitle(editingTopic.title);
      setDescription(editingTopic.description);
      setCategory(editingTopic.category);
      setResourceLink(editingTopic.resourceLink || '');
      setImageUrl(editingTopic.imageUrl || '');
      setQuestions((editingTopic.discussionQuestions || []).join('\n'));
      setThinkers((editingTopic.keyThinkers || []).join(', '));
    } else {
      setTitle('');
      setDescription('');
      setCategory('Ethics & Moral Philosophy');
      setResourceLink('');
      setImageUrl('');
      setQuestions('');
      setThinkers('');
    }
  }, [editingTopic, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const topicData: Topic = {
      id: editingTopic ? editingTopic.id : `topic-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      category,
      resourceLink: resourceLink.trim() || undefined,
      imageUrl: imageUrl.trim() || undefined,
      isWide: editingTopic ? editingTopic.isWide : false,
      discussionQuestions: questions
        .split('\n')
        .map((q) => q.trim())
        .filter((q) => q.length > 0),
      keyThinkers: thinkers
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0),
    };

    onSaveTopic(topicData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#041627]/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#fdf9f0] border border-[#dedad1] w-full max-w-2xl p-6 sm:p-8 rounded-[2px] shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#5e5e5b] hover:text-[#041627] p-1 rounded"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#041627] mb-2">
          {editingTopic ? 'Edit Discussion Topic' : 'Add New Discussion Topic'}
        </h2>
        <p className="text-xs sm:text-sm text-[#5e5e5b] mb-6">
          Define the intellectual scope, foundational readings, and dialectic prompts for this syllabus unit.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-[11px] font-semibold text-[#44474c] uppercase tracking-widest">
              Topic Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Free Will vs Determinism"
              className="w-full bg-[#fdf9f0] border border-[#c4c6cd] px-3.5 py-2.5 text-sm text-[#1c1c16] rounded-[2px] focus:outline-none focus:border-[#041627]"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-semibold text-[#44474c] uppercase tracking-widest">
              Primary Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as TopicCategory)}
              className="w-full bg-[#fdf9f0] border border-[#c4c6cd] px-3.5 py-2.5 text-sm text-[#1c1c16] rounded-[2px] focus:outline-none focus:border-[#041627]"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-semibold text-[#44474c] uppercase tracking-widest">
              Topic Abstract / Summary
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A short overview of the thesis, core controversies, and relevance to the student symposium..."
              className="w-full bg-[#fdf9f0] border border-[#c4c6cd] p-3 text-sm text-[#1c1c16] rounded-[2px] focus:outline-none focus:border-[#041627] leading-relaxed"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-semibold text-[#44474c] uppercase tracking-widest">
              Deep Dive Resource URL
            </label>
            <input
              type="url"
              value={resourceLink}
              onChange={(e) => setResourceLink(e.target.value)}
              placeholder="https://plato.stanford.edu/entries/... or JSTOR link"
              className="w-full bg-[#fdf9f0] border border-[#c4c6cd] px-3.5 py-2.5 text-sm text-[#1c1c16] rounded-[2px] focus:outline-none focus:border-[#041627]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-[11px] font-semibold text-[#44474c] uppercase tracking-widest">
                Key Thinkers (comma separated)
              </label>
              <input
                type="text"
                value={thinkers}
                onChange={(e) => setThinkers(e.target.value)}
                placeholder="e.g. Spinoza, Schopenhauer, Nagel"
                className="w-full bg-[#fdf9f0] border border-[#c4c6cd] px-3.5 py-2.5 text-sm text-[#1c1c16] rounded-[2px] focus:outline-none focus:border-[#041627]"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-semibold text-[#44474c] uppercase tracking-widest">
                Thumbnail Image URL (Optional)
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-[#fdf9f0] border border-[#c4c6cd] px-3.5 py-2.5 text-sm text-[#1c1c16] rounded-[2px] focus:outline-none focus:border-[#041627]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-semibold text-[#44474c] uppercase tracking-widest">
              Discussion Starters / Socratic Prompts (one per line)
            </label>
            <textarea
              rows={3}
              value={questions}
              onChange={(e) => setQuestions(e.target.value)}
              placeholder="What criteria should determine human agency?&#10;Can an agent be held morally culpable if every action is causally determined?"
              className="w-full bg-[#fdf9f0] border border-[#c4c6cd] p-3 text-xs text-[#1c1c16] rounded-[2px] focus:outline-none focus:border-[#041627]"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#dedad1]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#5e5e5b] hover:text-[#041627]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#041627] text-white text-[12px] font-semibold tracking-widest uppercase px-6 py-2.5 rounded-[2px] hover:bg-[#1a2b3c] transition-colors"
            >
              {editingTopic ? 'Update Topic' : 'Save Topic'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
