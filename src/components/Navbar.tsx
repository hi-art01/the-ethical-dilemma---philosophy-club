import React, { useState } from 'react';
import { ClubInfo } from '../types';
import { Search, Menu, X, Shield, LogIn, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentView: 'weekly-quote' | 'topics' | 'essays' | 'club-info' | 'credits' | 'admin-quotes' | 'admin-curriculum' | 'admin-login';
  onNavigate: (view: 'weekly-quote' | 'topics' | 'essays' | 'club-info' | 'credits' | 'admin-quotes' | 'admin-curriculum' | 'admin-login') => void;
  onOpenJoinModal: () => void;
  onOpenSearchModal: () => void;
  isAdmin: boolean;
  onLogoutAdmin: () => void;
  clubInfo: ClubInfo;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenJoinModal,
  onOpenSearchModal,
  isAdmin,
  onLogoutAdmin,
  clubInfo,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isPublicView = ['weekly-quote', 'topics', 'essays', 'club-info', 'credits'].includes(currentView);

  return (
    <header className="bg-[#fdf9f0] border-b border-[#c4c6cd]/70 sticky top-0 z-40 w-full transition-shadow duration-300">
      {/* Top Admin Quick Switcher Bar (If logged in or in admin mode) */}
      {isAdmin && (
        <div className="bg-[#041627] text-[#f5f0e7] px-4 py-1.5 text-xs font-mono flex items-center justify-between border-b border-[#1a2b3c]">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold uppercase tracking-wider">Admin Session Active</span>
            <span className="text-[#8192a7] hidden sm:inline">| Quick edit mode</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('admin-quotes')}
              className={`px-2 py-0.5 rounded transition-colors ${
                currentView === 'admin-quotes' ? 'bg-[#1a2b3c] text-white font-bold' : 'hover:text-white'
              }`}
            >
              Quotes Curation
            </button>
            <button
              onClick={() => onNavigate('admin-curriculum')}
              className={`px-2 py-0.5 rounded transition-colors ${
                currentView === 'admin-curriculum' ? 'bg-[#1a2b3c] text-white font-bold' : 'hover:text-white'
              }`}
            >
              Curriculum & Details
            </button>
            <button
              onClick={() => onNavigate('weekly-quote')}
              className="text-[#b7c8de] hover:text-white underline ml-2"
            >
              View Live Site
            </button>
            <button
              onClick={onLogoutAdmin}
              className="text-red-300 hover:text-red-100 ml-2"
              title="Log out of Admin"
            >
              Exit Admin
            </button>
          </div>
        </div>
      )}

      <div className="max-w-[1120px] mx-auto px-5 sm:px-8 md:px-12 py-3 flex justify-between items-center h-16 md:h-20">
        {/* Brand Title */}
        <button
          onClick={() => onNavigate('weekly-quote')}
          className="text-left group cursor-pointer"
        >
          <span className="font-serif text-2xl md:text-[32px] lg:text-[36px] font-bold text-[#041627] tracking-tight leading-none block group-hover:opacity-85 transition-opacity">
            {clubInfo.clubName || 'Ink & Ethics'}
          </span>
          <span className="text-[10px] md:text-xs text-[#5e5e5b] tracking-widest uppercase font-medium mt-0.5 block">
            Philosophy Club
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-8 lg:gap-10">
          {isAdmin && (
            <>
              <button
                onClick={() => onNavigate('admin-quotes')}
                className={`text-sm tracking-wide transition-colors py-1 ${
                  currentView === 'admin-quotes'
                    ? 'text-[#041627] font-bold border-b-2 border-[#041627]'
                    : 'text-[#5e5e5b] hover:text-[#041627]'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => onNavigate('admin-curriculum')}
                className={`text-sm tracking-wide transition-colors py-1 ${
                  currentView === 'admin-curriculum'
                    ? 'text-[#041627] font-bold border-b-2 border-[#041627]'
                    : 'text-[#5e5e5b] hover:text-[#041627]'
                }`}
              >
                Manage Topics
              </button>
            </>
          )}

          <button
            onClick={() => onNavigate('weekly-quote')}
            className={`text-sm tracking-wide transition-colors py-1 ${
              currentView === 'weekly-quote'
                ? 'text-[#041627] font-bold border-b-2 border-[#041627]'
                : 'text-[#5e5e5b] hover:text-[#041627]'
            }`}
          >
            Weekly Quote
          </button>

          <button
            onClick={() => onNavigate('topics')}
            className={`text-sm tracking-wide transition-colors py-1 ${
              currentView === 'topics'
                ? 'text-[#041627] font-bold border-b-2 border-[#041627]'
                : 'text-[#5e5e5b] hover:text-[#041627]'
            }`}
          >
            Topics
          </button>

          <button
            onClick={() => onNavigate('club-info')}
            className={`text-sm tracking-wide transition-colors py-1 ${
              currentView === 'club-info'
                ? 'text-[#041627] font-bold border-b-2 border-[#041627]'
                : 'text-[#5e5e5b] hover:text-[#041627]'
            }`}
          >
            Club Info
          </button>

          <button
            onClick={() => onNavigate('essays')}
            className={`text-sm tracking-wide transition-colors py-1 ${
              currentView === 'essays'
                ? 'text-[#041627] font-bold border-b-2 border-[#041627]'
                : 'text-[#5e5e5b] hover:text-[#041627]'
            }`}
          >
            Essays
          </button>

          <button
            onClick={() => onNavigate('credits')}
            className={`text-sm tracking-wide transition-colors py-1 ${
              currentView === 'credits' ? 'text-[#041627] font-bold border-b-2 border-[#041627]' : 'text-[#5e5e5b] hover:text-[#041627]'
            }`}
          >
            Credits
          </button>
        </nav>

        {/* Right CTA / Search / Mobile Menu */}
        <div className="flex items-center gap-3 md:gap-4">
          <button
            onClick={onOpenSearchModal}
            className="hidden md:flex items-center justify-center text-[#1c1c16] hover:text-[#041627] p-2 hover:bg-[#f2ede4] rounded transition-colors"
            title="Search quotes and topics"
            aria-label="Search"
          >
            <Search className="w-[18px] h-[18px]" />
          </button>

          <button
            onClick={onOpenJoinModal}
            className="bg-[#041627] text-white text-[12px] font-semibold tracking-widest uppercase px-5 py-2.5 rounded-[2px] hover:bg-[#1a2b3c] active:scale-95 transition-all shadow-sm"
          >
            Join Club
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#041627] p-2 hover:bg-[#f2ede4] rounded"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#dedad1] bg-[#fdf9f0] px-6 py-5 flex flex-col gap-4 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <button
            onClick={() => {
              onNavigate('weekly-quote');
              setMobileMenuOpen(false);
            }}
            className={`text-left text-base py-1.5 ${
              currentView === 'weekly-quote' ? 'font-bold text-[#041627]' : 'text-[#5e5e5b]'
            }`}
          >
            Weekly Quote
          </button>
          <button
            onClick={() => {
              onNavigate('topics');
              setMobileMenuOpen(false);
            }}
            className={`text-left text-base py-1.5 ${
              currentView === 'topics' ? 'font-bold text-[#041627]' : 'text-[#5e5e5b]'
            }`}
          >
            Topics & Syllabus
          </button>
          <button
            onClick={() => {
              onNavigate('club-info');
              setMobileMenuOpen(false);
            }}
            className={`text-left text-base py-1.5 ${
              currentView === 'club-info' ? 'font-bold text-[#041627]' : 'text-[#5e5e5b]'
            }`}
          >
            Club Information
          </button>
          <button
            onClick={() => {
              onNavigate('essays');
              setMobileMenuOpen(false);
            }}
            className={`text-left text-base py-1.5 ${
              currentView === 'essays' ? 'font-bold text-[#041627]' : 'text-[#5e5e5b]'
            }`}
          >
            Philosophy Essays
          </button>
          <button
            onClick={() => {
              onNavigate('credits');
              setMobileMenuOpen(false);
            }}
            className={`text-left text-base py-1.5 ${currentView === 'credits' ? 'font-bold text-[#041627]' : 'text-[#5e5e5b]'}`}
          >
            Credits
          </button>

          <div className="h-px bg-[#dedad1] my-1"></div>

          <button
            onClick={() => {
              onOpenSearchModal();
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 text-left text-sm text-[#5e5e5b] py-1"
          >
            <Search className="w-4 h-4" />
            Search Library
          </button>

          {isAdmin ? (
            <div className="flex flex-col gap-2 pt-2 border-t border-[#dedad1]">
              <div className="text-xs font-semibold text-[#041627] uppercase tracking-wider">Admin Controls</div>
              <button
                onClick={() => {
                  onNavigate('admin-quotes');
                  setMobileMenuOpen(false);
                }}
                className="text-left text-sm text-[#041627] hover:underline"
              >
                • Quote Dashboard
              </button>
              <button
                onClick={() => {
                  onNavigate('admin-curriculum');
                  setMobileMenuOpen(false);
                }}
                className="text-left text-sm text-[#041627] hover:underline"
              >
                • Curriculum & Details Manager
              </button>
              <button
                onClick={() => {
                  onLogoutAdmin();
                  setMobileMenuOpen(false);
                }}
                className="text-left text-xs text-red-600 font-medium mt-1"
              >
                Log out of Admin
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                onNavigate('admin-login');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-left text-xs text-[#5e5e5b] hover:text-[#041627] pt-2"
            >
              <Shield className="w-3.5 h-3.5" />
              Administrator Login
            </button>
          )}
        </div>
      )}
    </header>
  );
};
