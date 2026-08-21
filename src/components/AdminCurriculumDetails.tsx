import React, { useState } from 'react';
import { ClubInfo, Topic } from '../types';
import { Plus, Edit2, Trash2, CheckCircle2, RotateCcw, Download, Upload } from 'lucide-react';

interface AdminCurriculumDetailsProps {
  clubInfo: ClubInfo;
  topics: Topic[];
  onUpdateClubInfo: (info: ClubInfo) => void;
  onOpenAddTopicModal: () => void;
  onOpenEditTopicModal: (topic: Topic) => void;
  onDeleteTopic: (id: string) => void;
  onResetDefaults: () => void;
}

export const AdminCurriculumDetails: React.FC<AdminCurriculumDetailsProps> = ({
  clubInfo,
  topics,
  onUpdateClubInfo,
  onOpenAddTopicModal,
  onOpenEditTopicModal,
  onDeleteTopic,
  onResetDefaults,
}) => {
  const [formData, setFormData] = useState<ClubInfo>(clubInfo);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateClubInfo(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ clubInfo: formData, topics }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "philosophy_club_backup.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <main className="max-w-[1120px] mx-auto px-5 sm:px-8 md:px-12 py-8 md:py-12 w-full animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 md:mb-12">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#041627] tracking-tight">
            Curriculum & Details
          </h1>
          <p className="text-[#5e5e5b] text-sm mt-1">
            Manage symposium topics, club logistics, and general chapter metadata.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportJSON}
            className="text-xs font-semibold px-3 py-2 border border-[#dedad1] bg-[#fdf9f0] hover:bg-[#f2ede4] rounded flex items-center gap-1.5"
            title="Export club data to JSON"
          >
            <Download className="w-3.5 h-3.5" /> Backup JSON
          </button>
          <button
            onClick={() => {
              if (window.confirm('Reset all club information and topics to original demo data?')) {
                onResetDefaults();
              }
            }}
            className="text-xs text-[#ba1a1a] hover:text-red-800 font-semibold px-3 py-2 border border-red-200 bg-red-50/50 hover:bg-red-100/50 rounded flex items-center gap-1.5"
            title="Reset to demo data"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Defaults
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        {/* Left: Discussion Topics Management matching Image 1 */}
        <section className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between border-b border-[#dedad1] pb-3">
            <h2 className="font-serif text-xl md:text-2xl font-bold text-[#041627]">
              Discussion Topics
            </h2>
            <button
              onClick={onOpenAddTopicModal}
              className="bg-[#041627] text-white text-[11px] font-semibold uppercase tracking-widest px-4 py-2 rounded-[2px] hover:bg-[#1a2b3c] flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Topic
            </button>
          </div>

          <div className="space-y-4">
            {topics.map((topic) => (
              <div
                key={topic.id}
                className="bg-[#fdf9f0] border border-[#dedad1] p-5 rounded-[2px] hover:border-[#041627] transition-all relative group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#5e5e5b] bg-[#f2ede4] px-2 py-0.5 rounded-[2px] inline-block mb-1.5">
                      {topic.category}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-[#041627]">
                      {topic.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onOpenEditTopicModal(topic)}
                      className="p-1.5 text-[#5e5e5b] hover:text-[#041627] hover:bg-[#f2ede4] rounded"
                      title="Edit Topic"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteTopic(topic.id)}
                      className="p-1.5 text-[#ba1a1a] hover:text-red-800 hover:bg-red-50 rounded"
                      title="Delete Topic"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#44474c] mt-2 leading-relaxed line-clamp-2">
                  {topic.description}
                </p>

                {topic.resourceLink && (
                  <p className="text-[11px] text-[#74777d] mt-3 truncate font-mono">
                    Link: {topic.resourceLink}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Right: Edit Club Information Form matching Image 1 */}
        <section className="lg:col-span-5 bg-[#fdf9f0] border border-[#dedad1] p-6 sm:p-8 rounded-[2px] h-fit">
          <h2 className="font-serif text-xl md:text-2xl font-bold text-[#041627] mb-6">
            Club Information
          </h2>

          <form onSubmit={handleInfoSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-[11px] font-semibold text-[#44474c] uppercase tracking-widest">
                Club / Chapter Name
              </label>
              <input
                type="text"
                value={formData.clubName}
                onChange={(e) => setFormData({ ...formData, clubName: e.target.value })}
                className="w-full bg-[#fdf9f0] border border-[#c4c6cd] px-3 py-2 text-sm text-[#1c1c16] rounded-[2px] focus:outline-none focus:border-[#041627]"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-semibold text-[#44474c] uppercase tracking-widest">
                School / Institution
              </label>
              <input
                type="text"
                value={formData.schoolName}
                onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                className="w-full bg-[#fdf9f0] border border-[#c4c6cd] px-3 py-2 text-sm text-[#1c1c16] rounded-[2px] focus:outline-none focus:border-[#041627]"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-semibold text-[#44474c] uppercase tracking-widest">
                Tagline / Purpose
              </label>
              <textarea
                rows={2}
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full bg-[#fdf9f0] border border-[#c4c6cd] px-3 py-2 text-sm text-[#1c1c16] rounded-[2px] focus:outline-none focus:border-[#041627]"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-semibold text-[#44474c] uppercase tracking-widest">
                Classroom Location
              </label>
              <input
                type="text"
                value={formData.classroom}
                onChange={(e) => setFormData({ ...formData, classroom: e.target.value })}
                placeholder="e.g. Classroom S102"
                className="w-full bg-[#fdf9f0] border border-[#c4c6cd] px-3 py-2 text-sm text-[#1c1c16] rounded-[2px] focus:outline-none focus:border-[#041627]"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-semibold text-[#44474c] uppercase tracking-widest">
                Meeting Frequency & Time
              </label>
              <input
                type="text"
                value={formData.frequency}
                onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                placeholder="e.g. Every other Friday"
                className="w-full bg-[#fdf9f0] border border-[#c4c6cd] px-3 py-2 text-sm text-[#1c1c16] rounded-[2px] focus:outline-none focus:border-[#041627]"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-semibold text-[#44474c] uppercase tracking-widest">
                GroupMe / Discord URL
              </label>
              <input
                type="url"
                value={formData.groupmeUrl}
                onChange={(e) => setFormData({ ...formData, groupmeUrl: e.target.value })}
                className="w-full bg-[#fdf9f0] border border-[#c4c6cd] px-3 py-2 text-sm text-[#1c1c16] rounded-[2px] focus:outline-none focus:border-[#041627]"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-semibold text-[#44474c] uppercase tracking-widest">
                Club President / Leader
              </label>
              <input
                type="text"
                value={formData.presidentName}
                onChange={(e) => setFormData({ ...formData, presidentName: e.target.value })}
                className="w-full bg-[#fdf9f0] border border-[#c4c6cd] px-3 py-2 text-sm text-[#1c1c16] rounded-[2px] focus:outline-none focus:border-[#041627]"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-semibold text-[#44474c] uppercase tracking-widest">
                Vice President
              </label>
              <input
                type="text"
                value={formData.vicePresidentName || ''}
                onChange={(e) => setFormData({ ...formData, vicePresidentName: e.target.value })}
                placeholder="e.g. Arthur Yount & Augie Wilhelm"
                className="w-full bg-[#fdf9f0] border border-[#c4c6cd] px-3 py-2 text-sm text-[#1c1c16] rounded-[2px] focus:outline-none focus:border-[#041627]"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-semibold text-[#44474c] uppercase tracking-widest">
                Faculty Advisor
              </label>
              <input
                type="text"
                value={formData.facultyAdvisor}
                onChange={(e) => setFormData({ ...formData, facultyAdvisor: e.target.value })}
                className="w-full bg-[#fdf9f0] border border-[#c4c6cd] px-3 py-2 text-sm text-[#1c1c16] rounded-[2px] focus:outline-none focus:border-[#041627]"
              />
            </div>

            {savedSuccess && (
              <p className="text-xs text-emerald-700 font-medium bg-emerald-50 p-2.5 rounded border border-emerald-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Club information successfully updated!
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-[#041627] text-white text-[12px] font-semibold tracking-widest uppercase py-3 px-6 rounded-[2px] hover:bg-[#1a2b3c] transition-colors mt-2"
            >
              Save Club Information
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};
