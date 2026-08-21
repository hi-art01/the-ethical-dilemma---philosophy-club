import React, { useState } from 'react';
import { Topic, TopicCategory } from '../types';
import { ArrowRight, Eye, Sparkles, Filter, ExternalLink } from 'lucide-react';

interface TopicsViewProps {
  topics: Topic[];
  onSelectTopic: (topic: Topic) => void;
  onAddNewTopic?: () => void;
  isAdmin?: boolean;
}

export const TopicsView: React.FC<TopicsViewProps> = ({
  topics,
  onSelectTopic,
  onAddNewTopic,
  isAdmin,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: ('All' | TopicCategory)[] = [
    'All',
    'Ethics & Moral Philosophy',
    'Existentialism & Meaning',
    'Political Philosophy',
    'Epistemology',
    'Metaphysics',
  ];

  const filteredTopics = topics.filter((topic) => {
    const matchesCategory = selectedCategory === 'All' || topic.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.keyThinkers?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="flex-grow flex flex-col py-10 md:py-16 px-5 sm:px-8 md:px-12 max-w-[1120px] mx-auto w-full animate-in fade-in duration-300">
      {/* Header Section matching Image 5 */}
      <section className="flex flex-col gap-4 max-w-3xl mb-10 md:mb-12">
        <h1 className="font-serif text-3xl sm:text-4xl md:text-[48px] font-bold text-[#041627] leading-tight tracking-tight">
          Explorations in Thought
        </h1>
        <p className="text-base sm:text-lg text-[#44474c] leading-relaxed">
          A curated index of the philosophical themes, historical epochs, and modern dilemmas we examine.
          Each topic serves as a gateway to deeper understanding, challenging our preconceptions and broadening our intellectual horizons.
        </p>
        <div className="h-px bg-[#c4c6cd] w-24 mt-2"></div>
      </section>

      {/* Category Pills & Search Filter */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-10 border-b border-[#dedad1] pb-6">
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3.5 py-1.5 rounded-[2px] transition-all font-medium whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#041627] text-white shadow-xs'
                  : 'bg-[#f2ede4] text-[#5e5e5b] hover:bg-[#e6e2d9] hover:text-[#041627]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {isAdmin && onAddNewTopic && (
          <button
            onClick={onAddNewTopic}
            className="text-xs font-semibold uppercase tracking-wider bg-[#041627] text-white px-4 py-2 rounded-[2px] hover:bg-[#1a2b3c] transition-colors whitespace-nowrap self-end sm:self-auto"
          >
            + Propose Topic
          </button>
        )}
      </div>

      {/* Topics Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filteredTopics.map((topic, index) => {
          // If marked isWide or is the 5th item, render the 2-column special card from Image 5
          const isEpistemologyOrWide = topic.isWide || (index === 4 && filteredTopics.length === 5);

          if (isEpistemologyOrWide) {
            return (
              <article
                key={topic.id}
                onClick={() => onSelectTopic(topic)}
                className="paper-card p-6 md:p-8 group relative flex flex-col gap-4 lg:col-span-2 cursor-pointer rounded-[2px] shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-md transition-all"
              >
                <div className="h-px w-8 bg-[#041627] mb-1 transition-all duration-300 group-hover:w-16"></div>
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-stretch h-full">
                  <div className="flex-1 flex flex-col justify-between h-full">
                    <div>
                      <div className="text-[11px] font-semibold tracking-widest uppercase text-[#5e5e5b] mb-1">
                        {topic.category}
                      </div>
                      <h2 className="font-serif text-xl md:text-2xl font-bold text-[#041627] mb-3 leading-snug">
                        {topic.title}
                      </h2>
                      <p className="text-sm md:text-base text-[#44474c] leading-relaxed mb-6">
                        {topic.description}
                      </p>
                    </div>

                    <div className="pt-2">
                      <span className="text-[12px] font-semibold text-[#041627] uppercase tracking-widest inline-flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                        Explore Deep Dive <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                  {/* Right Academic Graphic Box matching Image 5 */}
                  <div className="w-full md:w-5/12 min-h-[160px] bg-[#ece8df] border border-[#c4c6cd] flex flex-col items-center justify-center p-6 text-center rounded-[2px] relative overflow-hidden">
                    {topic.imageUrl ? (
                      <img
                        src={topic.imageUrl}
                        alt={topic.title}
                        className="w-full h-full object-cover absolute inset-0"
                      />
                    ) : (
                      <>
                        <Eye className="w-12 h-12 text-[#041627] opacity-40 mb-2 stroke-[1.2]" />
                        <span className="text-xs text-[#5e5e5b] tracking-wider uppercase font-medium">
                          Dialectic Inquest
                        </span>
                        <span className="text-[11px] text-[#74777d] mt-1 italic">
                          Justification & Skepticism
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </article>
            );
          }

          return (
            <article
              key={topic.id}
              onClick={() => onSelectTopic(topic)}
              className="paper-card p-6 md:p-8 group relative flex flex-col justify-between gap-4 cursor-pointer rounded-[2px] shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-md transition-all"
            >
              <div>
                <div className="h-px w-8 bg-[#041627] mb-2 transition-all duration-300 group-hover:w-16"></div>
                <div className="text-[10px] font-semibold tracking-widest uppercase text-[#5e5e5b] mb-1.5">
                  {topic.category}
                </div>
                <h2 className="font-serif text-xl font-bold text-[#041627] mb-3 leading-snug">
                  {topic.title}
                </h2>
                <p className="text-sm md:text-[15px] text-[#44474c] leading-relaxed line-clamp-4">
                  {topic.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#dedad1]/60 flex items-center justify-between">
                <span className="text-[12px] font-semibold text-[#041627] uppercase tracking-widest inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-300">
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </span>

                {topic.resourceLink && (
                  <span className="text-xs text-[#74777d] hover:text-[#041627] inline-flex items-center gap-1" title="Primary Stanford Encyclopedia link attached">
                    <ExternalLink className="w-3 h-3" />
                  </span>
                )}
              </div>
            </article>
          );
        })}
      </section>

      {filteredTopics.length === 0 && (
        <div className="text-center py-16 border border-dashed border-[#dedad1] rounded p-8">
          <p className="font-serif text-lg text-[#041627]">No discussion topics found in this category.</p>
          <button
            onClick={() => setSelectedCategory('All')}
            className="mt-3 text-xs uppercase tracking-wider font-semibold text-[#041627] underline"
          >
            Show All Topics
          </button>
        </div>
      )}
    </main>
  );
};
