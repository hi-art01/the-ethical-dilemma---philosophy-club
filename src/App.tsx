import React, { useState, useEffect } from 'react';
import { ClubInfo, Quote, Topic } from './types';
import {
  getStoredClubInfo,
  saveClubInfo,
  getStoredQuotes,
  saveQuotes,
  getStoredTopics,
  saveTopics,
  getAdminAuthState,
  setAdminAuthState,
  resetAllDataToDefault,
} from './utils/storage';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WeeklyQuoteView } from './components/WeeklyQuoteView';
import { TopicsView } from './components/TopicsView';
import { EssaysView } from './components/EssaysView';
import { CreditsView } from './components/CreditsView';
import { ClubInfoView } from './components/ClubInfoView';
import { AdminDashboardQuotes } from './components/AdminDashboardQuotes';
import { AdminCurriculumDetails } from './components/AdminCurriculumDetails';
import { AdminLoginView } from './components/AdminLoginView';
import { AdminAddTopicModal } from './components/AdminAddTopicModal';
import {
  JoinClubModal,
  TopicDetailModal,
  QuoteDetailModal,
  ReadingListModal,
  ArchivesModal,
  ContactModal,
  SearchModal,
} from './components/Modals';

export function App() {
  // Main Data States with LocalStorage Persistence
  const [clubInfo, setClubInfo] = useState<ClubInfo>(getStoredClubInfo);
  const [quotes, setQuotes] = useState<Quote[]>(getStoredQuotes);
  const [topics, setTopics] = useState<Topic[]>(getStoredTopics);
  const [isAdmin, setIsAdmin] = useState<boolean>(getAdminAuthState);

  // View state
  const [currentView, setCurrentView] = useState<
    'weekly-quote' | 'topics' | 'essays' | 'club-info' | 'credits' | 'admin-quotes' | 'admin-curriculum' | 'admin-login'
  >('weekly-quote');

  // Modal States
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [isReadingListOpen, setIsReadingListOpen] = useState(false);
  const [isArchivesOpen, setIsArchivesOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);

  // Admin Topic Modal State
  const [isAddTopicModalOpen, setIsAddTopicModalOpen] = useState(false);
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);

  // Sync to localStorage
  useEffect(() => {
    saveClubInfo(clubInfo);
  }, [clubInfo]);

  useEffect(() => {
    saveQuotes(quotes);
  }, [quotes]);

  useEffect(() => {
    saveTopics(topics);
  }, [topics]);

  // Handlers for Quotes
  const handleAddQuote = (newQuoteData: Omit<Quote, 'id'>) => {
    let updatedQuotes = [...quotes];
    if (newQuoteData.status === 'active') {
      updatedQuotes = updatedQuotes.map((q) =>
        q.status === 'active' ? { ...q, status: 'archived' as const } : q
      );
    }
    const newQuote: Quote = {
      ...newQuoteData,
      id: `quote-${Date.now()}`,
    };
    setQuotes([newQuote, ...updatedQuotes]);
  };

  const handleDeleteQuote = (id: string) => {
    setQuotes(quotes.filter((q) => q.id !== id));
  };

  const handleSetActiveQuote = (id: string) => {
    setQuotes(
      quotes.map((q) => ({
        ...q,
        status: q.id === id ? 'active' : q.status === 'active' ? 'archived' : q.status,
      }))
    );
  };

  // Handlers for Topics
  const handleSaveTopic = (savedTopic: Topic) => {
    if (topics.some((t) => t.id === savedTopic.id)) {
      setTopics(topics.map((t) => (t.id === savedTopic.id ? savedTopic : t)));
    } else {
      setTopics([...topics, savedTopic]);
    }
  };

  const handleDeleteTopic = (id: string) => {
    setTopics(topics.filter((t) => t.id !== id));
  };

  // Auth Handlers
  const handleLoginSuccess = () => {
    setIsAdmin(true);
    setAdminAuthState(true);
    setCurrentView('admin-quotes');
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setAdminAuthState(false);
    setCurrentView('weekly-quote');
  };

  const handleResetDefaults = () => {
    const defaults = resetAllDataToDefault();
    setClubInfo(defaults.clubInfo);
    setQuotes(defaults.quotes);
    setTopics(defaults.topics);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f1e8] text-[#1c1c16] selection:bg-[#173b4d] selection:text-white">
      {/* Navigation Header */}
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        onOpenJoinModal={() => setIsJoinOpen(true)}
        onOpenSearchModal={() => setIsSearchOpen(true)}
        isAdmin={isAdmin}
        onLogoutAdmin={handleLogout}
        clubInfo={clubInfo}
      />

      {/* Main View Router */}
      {currentView === 'weekly-quote' && (
        <WeeklyQuoteView
          quotes={quotes}
          onOpenArchives={() => setIsArchivesOpen(true)}
          onOpenQuoteDetail={(q) => setSelectedQuote(q)}
        />
      )}

      {currentView === 'topics' && (
        <TopicsView
          topics={topics}
          onSelectTopic={(t) => setSelectedTopic(t)}
          onAddNewTopic={() => {
            setEditingTopic(null);
            setIsAddTopicModalOpen(true);
          }}
          isAdmin={isAdmin}
        />
      )}

      {currentView === 'essays' && <EssaysView />}

      {currentView === 'credits' && <CreditsView />}

      {currentView === 'club-info' && (
        <ClubInfoView
          clubInfo={clubInfo}
          onOpenJoinModal={() => setIsJoinOpen(true)}
          onOpenContactModal={() => setIsContactOpen(true)}
        />
      )}

      {currentView === 'admin-login' && (
        <AdminLoginView
          onLoginSuccess={handleLoginSuccess}
          onCancel={() => setCurrentView('weekly-quote')}
        />
      )}

      {currentView === 'admin-quotes' && (
        <AdminDashboardQuotes
          quotes={quotes}
          onAddQuote={handleAddQuote}
          onDeleteQuote={handleDeleteQuote}
          onSetActiveQuote={handleSetActiveQuote}
        />
      )}

      {currentView === 'admin-curriculum' && (
        <AdminCurriculumDetails
          clubInfo={clubInfo}
          topics={topics}
          onUpdateClubInfo={setClubInfo}
          onOpenAddTopicModal={() => {
            setEditingTopic(null);
            setIsAddTopicModalOpen(true);
          }}
          onOpenEditTopicModal={(t) => {
            setEditingTopic(t);
            setIsAddTopicModalOpen(true);
          }}
          onDeleteTopic={handleDeleteTopic}
          onResetDefaults={handleResetDefaults}
        />
      )}

      {/* Shared Academic Footer */}
      <Footer
        onOpenArchives={() => setIsArchivesOpen(true)}
        onOpenReadingList={() => setIsReadingListOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenAdminLogin={() => {
          if (isAdmin) {
            setCurrentView('admin-quotes');
          } else {
            setCurrentView('admin-login');
          }
        }}
        isAdmin={isAdmin}
      />

      {/* Modals and Overlays */}
      <JoinClubModal
        isOpen={isJoinOpen}
        onClose={() => setIsJoinOpen(false)}
        clubInfo={clubInfo}
      />

      <TopicDetailModal
        topic={selectedTopic}
        onClose={() => setSelectedTopic(null)}
      />

      <QuoteDetailModal
        quote={selectedQuote}
        onClose={() => setSelectedQuote(null)}
      />

      <ReadingListModal
        isOpen={isReadingListOpen}
        onClose={() => setIsReadingListOpen(false)}
      />

      <ArchivesModal
        isOpen={isArchivesOpen}
        onClose={() => setIsArchivesOpen(false)}
        quotes={quotes}
        onSelectQuote={(q) => setSelectedQuote(q)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        clubInfo={clubInfo}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        quotes={quotes}
        topics={topics}
        onSelectQuote={(q) => setSelectedQuote(q)}
        onSelectTopic={(t) => setSelectedTopic(t)}
      />

      <AdminAddTopicModal
        isOpen={isAddTopicModalOpen}
        onClose={() => {
          setIsAddTopicModalOpen(false);
          setEditingTopic(null);
        }}
        onSaveTopic={handleSaveTopic}
        editingTopic={editingTopic}
      />
    </div>
  );
}

export default App;
