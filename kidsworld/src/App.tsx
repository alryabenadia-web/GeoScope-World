import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { AudioProvider } from './contexts/AudioContext';
import { AuthPage } from './components/Auth/AuthPage';
import { Header } from './components/Header/Header';
import { LeafletMap } from './components/WorldMap/LeafletMap';
import { TravelJournal } from './components/TravelJournal/TravelJournal';
import { DailyChallenge } from './components/DailyChallenge/DailyChallenge';
import { AvatarSelector } from './components/Avatar/AvatarSelector';
import { ChildDashboard } from './components/Dashboard/ChildDashboard';
import { LandingPage } from './components/LandingPage/LandingPage';
import { HowToPlay } from './components/HowToPlay/HowToPlay';
import { ContinentsPage } from './components/Continents/ContinentsPage';
import { LearningPage } from './components/Learning/LearningPage';
import { TopicsPage } from './components/Topics/TopicsPage';
import { MountainsPage } from './components/Mountains/MountainsPage';
import { AskTheMap } from './components/AskTheMap/AskTheMap';

function AppContent() {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('landing');
  const [showAuth, setShowAuth] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  useEffect(() => {
    if (user) {
      setShowAuth(false);
      // Only auto-redirect if user just logged in (currently on landing)
      // Allow authenticated users to visit landing page via logo click
      if (currentPage === 'landing' && !showAuth) {
        // Check if this is initial load or navigation from login
        const hasNavigated = sessionStorage.getItem('hasNavigated');
        if (!hasNavigated) {
          setCurrentPage('map'); // Redirect to Explore page after login
          sessionStorage.setItem('hasNavigated', 'true');
        }
      }
    } else {
      // If user logs out, go back to landing
      if (currentPage !== 'landing') {
        setCurrentPage('landing');
      }
      sessionStorage.removeItem('hasNavigated');
    }
  }, [user, currentPage, showAuth]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white"></div>
      </div>
    );
  }

  if (showHowToPlay) {
    return (
      <HowToPlay
        onStartPlaying={() => {
          setShowHowToPlay(false);
          if (!user) {
            setShowAuth(true);
          } else {
            setCurrentPage('map');
          }
        }}
      />
    );
  }

  if (showAuth) {
    return <AuthPage />;
  }

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
    setShowHowToPlay(false);
  };

  const handleExploreClick = () => {
    if (user) {
      setCurrentPage('map');
    } else {
      setShowAuth(true);
    }
  };

  if (currentPage === 'landing') {
    return (
      <LandingPage
        onStartExploring={handleExploreClick}
        onLearnHow={() => setShowHowToPlay(true)}
        onNavigateToContinents={user ? () => setCurrentPage('continents') : () => setShowAuth(true)}
        onNavigateToLearning={user ? () => setCurrentPage('learning') : () => setShowAuth(true)}
        onNavigateToTopics={user ? () => setCurrentPage('topics') : () => setShowAuth(true)}
        onNavigateToMountains={user ? () => setCurrentPage('mountains') : () => setShowAuth(true)}
      />
    );
  }

  // If not logged in and not on landing, return nothing (useEffect will handle redirect)
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header onNavigate={handleNavigation} currentPage={currentPage} />

      <main className="container mx-auto px-4 py-8">
        {currentPage === 'map' && (
          <div className="h-[calc(100vh-200px)]">
            <LeafletMap />
          </div>
        )}
        {currentPage === 'journal' && <TravelJournal />}
        {currentPage === 'challenge' && <DailyChallenge />}
        {currentPage === 'little-explorer' && <AvatarSelector />}
        {currentPage === 'dashboard' && <ChildDashboard onNavigate={handleNavigation} />}
        {currentPage === 'continents' && <ContinentsPage />}
        {currentPage === 'learning' && <LearningPage />}
        {currentPage === 'topics' && <TopicsPage />}
        {currentPage === 'mountains' && <MountainsPage />}
        {currentPage === 'ask-the-map' && <AskTheMap />}
      </main>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AudioProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </AudioProvider>
    </LanguageProvider>
  );
}

export default App;
