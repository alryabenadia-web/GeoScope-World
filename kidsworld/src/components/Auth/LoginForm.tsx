import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { LogIn, User, Lock } from 'lucide-react';

interface LoginFormProps {
  onToggleForm: () => void;
  onForgotPassword: () => void;
}

export function LoginForm({ onToggleForm, onForgotPassword }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(username, password);
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 w-full max-w-md backdrop-blur-lg animate-slideUp">
      <div className="flex items-center justify-center mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-4 shadow-lg">
          <LogIn className="w-12 h-12 text-white" />
        </div>
      </div>

      <h2 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
        {t('welcomeBack')}
      </h2>

      <p className="text-center text-gray-500 mb-8">
        {t('loginDesc') || 'Continue your adventure around the world!'}
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-start gap-3 animate-shake">
            <span className="text-red-500 text-xl">⚠️</span>
            <span className="text-sm">{error}</span>
          </div>
        )}

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            {t('username')}
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
              autoFocus
              autoComplete="username"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-semibold text-gray-700">
              {t('password')}
            </label>
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-sm text-blue-500 hover:text-blue-600 font-semibold transition-colors"
            >
              {t('forgotPassword') || 'Forgot?'}
            </button>
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
              autoComplete="current-password"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:transform-none"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              {t('loading')}
            </div>
          ) : (
            t('login')
          )}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          {t('dontHaveAccount')}{' '}
          <button
            onClick={onToggleForm}
            className="text-blue-500 hover:text-blue-600 font-bold transition-colors"
          >
            {t('signup')}
          </button>
        </p>
      </div>

      <div className="mt-6 text-center text-xs text-gray-400">
        <p>{t('secureLogin') || '🔒 Your data is safe and secure'}</p>
      </div>
    </div>
  );
}
