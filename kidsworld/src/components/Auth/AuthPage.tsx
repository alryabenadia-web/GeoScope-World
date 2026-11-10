import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { Globe, Sparkles } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export function AuthPage() {
  const [view, setView] = useState<'login' | 'signup' | 'forgot'>('login');
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-500 relative overflow-hidden flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtNi42MjcgNS4zNzMtMTIgMTItMTJzMTIgNS4zNzMgMTIgMTItNS4zNzMgMTItMTIgMTItMTItNS4zNzMtMTItMTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>

      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
          className="bg-white bg-opacity-20 backdrop-blur-md hover:bg-opacity-30 text-white px-5 py-3 rounded-full transition-all flex items-center gap-2 shadow-lg border border-white border-opacity-30"
        >
          <span className="text-2xl">{language === 'en' ? '🇸🇦' : '🇬🇧'}</span>
          <span className="font-semibold">{language === 'en' ? 'العربية' : 'English'}</span>
        </button>
      </div>

      <div className="absolute top-10 left-10 animate-bounce">
        <Sparkles className="w-8 h-8 text-yellow-300 opacity-80" />
      </div>
      <div className="absolute bottom-20 right-20 animate-bounce delay-100">
        <Sparkles className="w-6 h-6 text-pink-300 opacity-80" />
      </div>
      <div className="absolute top-1/3 right-10 animate-bounce delay-200">
        <Sparkles className="w-7 h-7 text-white opacity-60" />
      </div>

      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-center gap-12 relative z-10">
        <div className="text-center lg:text-left lg:flex-1">
          <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
            <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-full p-6 shadow-2xl border-4 border-white border-opacity-30 animate-pulse">
              <Globe className="w-20 h-20 text-white" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl leading-tight">
            {t('appTitle')}
          </h1>

          <p className="text-2xl md:text-3xl text-white opacity-95 drop-shadow-lg mb-8 font-medium">
            {t('tagline')}
          </p>

          <div className="hidden lg:flex flex-wrap gap-4 justify-center lg:justify-start">
            <div className="bg-white bg-opacity-20 backdrop-blur-md px-6 py-3 rounded-full text-white font-semibold border border-white border-opacity-30">
              🌍 Explore 39 Countries
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-md px-6 py-3 rounded-full text-white font-semibold border border-white border-opacity-30">
              🧠 Fun Quizzes
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-md px-6 py-3 rounded-full text-white font-semibold border border-white border-opacity-30">
              🏆 Earn Points
            </div>
          </div>
        </div>

        <div className="lg:flex-1 w-full max-w-md">
          {view === 'login' && (
            <LoginForm
              onToggleForm={() => setView('signup')}
              onForgotPassword={() => setView('forgot')}
            />
          )}
          {view === 'signup' && (
            <SignupForm onToggleForm={() => setView('login')} />
          )}
          {view === 'forgot' && (
            <ForgotPasswordForm onBack={() => setView('login')} />
          )}
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm opacity-60">
        Made with ❤️ for young explorers
      </div>
    </div>
  );
}
