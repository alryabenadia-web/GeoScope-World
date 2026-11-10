import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { UserPlus, User, Lock } from 'lucide-react';

interface SignupFormProps {
  onToggleForm: () => void;
}

export function SignupForm({ onToggleForm }: SignupFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signUp(username, password, 'child', undefined);
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 w-full max-w-md backdrop-blur-lg animate-slideUp">
      <div className="flex items-center justify-center mb-6">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-full p-4 shadow-lg">
          <UserPlus className="w-12 h-12 text-white" />
        </div>
      </div>

      <h2 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
        {t('createAccount')}
      </h2>

      <p className="text-center text-gray-500 mb-8">
        {t('signupDesc') || 'Start your journey as a world explorer!'}
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
              placeholder="Choose a cool username"
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            {t('password')}
          </label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 6 characters"
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              required
              minLength={6}
            />
          </div>
          <p className="text-xs text-gray-500 ml-1">At least 6 characters</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:transform-none"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              {t('loading')}
            </div>
          ) : (
            t('signup')
          )}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          {t('alreadyHaveAccount')}{' '}
          <button
            onClick={onToggleForm}
            className="text-green-500 hover:text-green-600 font-bold transition-colors"
          >
            {t('login')}
          </button>
        </p>
      </div>

      <div className="mt-6 text-center text-xs text-gray-400">
        <p>{t('secureSignup') || '🔒 Your data is safe and secure'}</p>
      </div>
    </div>
  );
}
