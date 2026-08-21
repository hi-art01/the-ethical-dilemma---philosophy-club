import React, { useState } from 'react';
import { ClubInfo } from '../types';
import { MapPin, Calendar, Clock, MessageSquare, ExternalLink, UserCheck, ShieldCheck, Mail, Check } from 'lucide-react';

interface ClubInfoViewProps {
  clubInfo: ClubInfo;
  onOpenJoinModal: () => void;
  onOpenContactModal: () => void;
}

export const ClubInfoView: React.FC<ClubInfoViewProps> = ({
  clubInfo,
  onOpenJoinModal,
  onOpenContactModal,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleGroupMeClick = () => {
    if (clubInfo.groupmeUrl) {
      window.open(clubInfo.groupmeUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCopyLink = () => {
    if (navigator.clipboard && clubInfo.groupmeUrl) {
      navigator.clipboard.writeText(clubInfo.groupmeUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Generate an iCalendar .ics file download for the club schedule
  const handleDownloadCalendarInvite = () => {
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Ink & Ethics//Philosophy Club//EN
BEGIN:VEVENT
SUMMARY:${clubInfo.clubName || 'Philosophy Club Meeting'}
DESCRIPTION:${clubInfo.tagline}
LOCATION:${clubInfo.classroom}, ${clubInfo.schoolName}
RRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=FR
DTSTART:20260904T153000
DTEND:20260904T170000
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'philosophy-club-meeting.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="flex-grow pt-8 md:pt-14 pb-16 md:pb-24 px-5 sm:px-8 md:px-12 max-w-[1120px] mx-auto w-full animate-in fade-in duration-300">
      {/* Header Section matching Image 7 */}
      <header className="mb-8 md:mb-10 text-center md:text-left">
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#041627] mb-4">
          {clubInfo.schoolName ? `${clubInfo.schoolName.replace('High School', '')} Philosophy Club` : 'Brentwood Philosophy Club'}
        </h1>
        <p className="text-base sm:text-lg text-[#44474c] max-w-2xl mx-auto md:mx-0 leading-relaxed">
          {clubInfo.tagline}
        </p>
      </header>

      <div className="w-16 h-px bg-[#74777d] mb-8 md:mb-10 mx-auto md:mx-0"></div>

      <div className="paper-card p-5 md:p-6 mb-8 rounded-[4px]">
        <p className="eyebrow mb-2">About our outreach</p>
        <p className="text-sm md:text-base text-[#44474c] leading-relaxed">
          In addition to our regular meetings, we occasionally teach younger students about philosophy through friendly discussions, stories, and big questions.
        </p>
      </div>

      {/* Bento Grid Layout matching Image 7 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
        {/* Meeting Details (col-span-8) */}
        <div className="md:col-span-8 paper-card p-6 md:p-8 rounded-[4px] bg-[#fdf9f0] border border-[#dedad1]">
          <h2 className="font-serif text-xl md:text-2xl font-bold text-[#041627] mb-6 flex items-center gap-3">
            <Clock className="w-6 h-6 text-[#041627] stroke-[1.8]" />
            Meeting Details
          </h2>

          <div className="space-y-6">
            {/* Location */}
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-[#5e5e5b] mt-1 shrink-0" />
              <div>
                <h3 className="font-serif text-base md:text-lg font-semibold text-[#1c1c16]">
                  Location
                </h3>
                <p className="text-base sm:text-lg text-[#44474c] mt-0.5">
                  {clubInfo.classroom || 'Classroom S102'}
                </p>
                <p className="text-xs text-[#74777d] mt-0.5">
                  {clubInfo.schoolName || 'Brentwood High School'}
                </p>
              </div>
            </div>

            <div className="w-full h-px bg-[#ece8df]"></div>

            {/* Schedule */}
            <div className="flex items-start gap-4">
              <Calendar className="w-5 h-5 text-[#5e5e5b] mt-1 shrink-0" />
              <div className="flex-1">
                <h3 className="font-serif text-base md:text-lg font-semibold text-[#1c1c16]">
                  Schedule
                </h3>
                <p className="text-base sm:text-lg text-[#44474c] mt-0.5 font-medium">
                  {clubInfo.frequency || 'Every other Friday'}
                </p>
                <p className="text-sm text-[#5e5e5b] mt-1">
                  {clubInfo.scheduleDetail || 'After school, 3:30 PM - 5:00 PM'}
                </p>

                <div className="mt-3 flex items-center gap-3">
                  <button
                    onClick={handleDownloadCalendarInvite}
                    className="inline-flex items-center gap-1.5 text-xs text-[#041627] hover:underline font-semibold uppercase tracking-wider"
                  >
                    + Add to Apple / Google Calendar (.ics)
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-[#ece8df]"></div>

            {/* Officers / Leadership */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1 text-sm">
              <div className="flex items-center gap-2.5">
                <UserCheck className="w-4 h-4 text-[#5e5e5b]" />
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#74777d]">Club President</div>
                  <div className="font-medium text-[#1c1c16]">{clubInfo.presidentName || 'Erik Mathaney'}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <UserCheck className="w-4 h-4 text-[#5e5e5b]" />
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#74777d]">Vice President</div>
                  <div className="font-medium text-[#1c1c16]">{clubInfo.vicePresidentName || 'Arthur Yount & Augie Wilhelm'}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#5e5e5b]" />
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#74777d]">Faculty Advisor</div>
                  <div className="font-medium text-[#1c1c16]">{clubInfo.facultyAdvisor || 'Dr. Eleanor Hayes'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Connect / GroupMe Section (col-span-4) */}
        <div className="md:col-span-4 paper-card p-6 md:p-8 rounded-[4px] bg-[#f7f3ea] border border-[#dedad1] flex flex-col justify-between items-center text-center">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#041627] mb-3">
              Join the Conversation
            </h2>
            <p className="text-sm text-[#44474c] mb-6 leading-relaxed">
              Stay updated on upcoming topics, symposium readings, discussion questions, and schedule changes.
            </p>
          </div>

          <div className="w-full flex flex-col gap-3">
            <button
              onClick={handleGroupMeClick}
              className="bg-[#041627] text-white text-xs font-semibold uppercase tracking-widest px-6 py-3.5 rounded-[2px] hover:bg-[#1a2b3c] active:scale-95 transition-all w-full flex justify-center items-center gap-2 shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              GroupMe Link
            </button>

            <button
              onClick={onOpenJoinModal}
              className="border border-[#041627] text-[#041627] text-xs font-semibold uppercase tracking-widest px-4 py-2.5 rounded-[2px] hover:bg-[#ece8df] transition-colors w-full"
            >
              Register as Member
            </button>

            <button
              onClick={handleCopyLink}
              className="text-[11px] text-[#5e5e5b] hover:text-[#041627] underline inline-flex items-center justify-center gap-1 mt-1"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span className="text-emerald-700 font-medium">GroupMe Link Copied!</span>
                </>
              ) : (
                'Copy Direct GroupMe URL'
              )}
            </button>
          </div>
        </div>

        {/* Classroom Photography Section matching Image 7 */}
        <div className="md:col-span-12 mt-4">
          <div className="w-full h-64 sm:h-80 md:h-[420px] rounded-[4px] overflow-hidden border border-[#c4c6cd] relative group shadow-sm">
            <img
              src={clubInfo.heroImageUrl}
              alt="Philosophy Club students in structured discussion in modern classroom"
              className="object-cover w-full h-full absolute inset-0 transition-transform duration-700 group-hover:scale-[1.02]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-[#041627] opacity-10 group-hover:opacity-5 transition-opacity"></div>
            <div className="absolute bottom-4 left-4 bg-[#fdf9f0]/95 backdrop-blur-xs border border-[#dedad1] px-4 py-2 rounded-[2px] text-xs text-[#1c1c16] font-medium hidden sm:block">
              Socratic Circle in Session — {clubInfo.classroom}, {clubInfo.schoolName}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
