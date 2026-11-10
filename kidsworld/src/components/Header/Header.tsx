import { useState } from 'react';
import { Globe, Volume2, VolumeX, LogOut, User, Menu, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { useAudio } from '../../contexts/AudioContext';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Header({ onNavigate, currentPage }: HeaderProps) {
  const { language, setLanguage, t } = useLanguage();
  const { profile, signOut } = useAuth();
  const { isSoundEnabled, toggleSound } = useAudio();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const navItems = [
    { id: 'dashboard', label: language === 'ar' ? 'لوحتي' : 'My Dashboard' },
    { id: 'map', label: t('explore') },
    { id: 'journal', label: t('myJournal') },
    { id: 'ask-the-map', label: language === 'ar' ? 'اكتشف مع ليو 🦁' : 'Discover with Leo 🦁' },
    { id: 'challenge', label: t('dailyChallenge') },
    { id: 'little-explorer', label: language === 'ar' ? 'مستكشفي الصغير' : 'Little Explorer' },
  ];

  return (
    <header className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('landing')}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              title={language === 'ar' ? 'الصفحة الرئيسية' : 'Home'}
            >
              <Globe className="w-10 h-10" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{t('appTitle')}</h1>
                <p className="text-sm opacity-90 hidden md:block">{t('tagline')}</p>
              </div>
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`
                  px-4 py-2 rounded-lg font-semibold transition-all
                  ${currentPage === item.id
                    ? 'bg-white text-purple-600'
                    : 'hover:bg-white hover:bg-opacity-20'
                  }
                `}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {profile && (
              <div className="hidden md:flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                <User className="w-5 h-5" />
                <div className="text-right">
                  <div className="font-bold text-sm">{profile.username}</div>
                  <div className="text-xs opacity-90">{profile.total_points} pts</div>
                </div>
              </div>
            )}

            <button
              onClick={toggleLanguage}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              title={language === 'en' ? 'العربية' : 'English'}
            >
              <span className="text-2xl">{language === 'en' ? '🇸🇦' : '🇬🇧'}</span>
            </button>

            <button
              onClick={toggleSound}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              title={isSoundEnabled ? t('soundOn') : t('soundOff')}
            >
              {isSoundEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
            </button>

            <button
              onClick={signOut}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              title={t('logout')}
            >
              <LogOut className="w-6 h-6" />
            </button>

            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {showMobileMenu && (
          <div className="lg:hidden mt-4 space-y-2 animate-slideDown">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setShowMobileMenu(false);
                }}
                className={`
                  w-full text-left px-4 py-3 rounded-lg font-semibold transition-all
                  ${currentPage === item.id
                    ? 'bg-white text-purple-600'
                    : 'bg-white bg-opacity-20 hover:bg-opacity-30'
                  }
                `}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
