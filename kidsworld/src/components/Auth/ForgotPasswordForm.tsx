import { useState } from 'react';
import { ArrowLeft, Mail } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface ForgotPasswordFormProps {
  onBack: () => void;
}

export function ForgotPasswordForm({ onBack }: ForgotPasswordFormProps) {
  const [username, setUsername] = useState('');
  const [loading] = useState(false);
  const [error] = useState('');
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 w-full max-w-md animate-slideUp">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-blue-500 hover:text-blue-600 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        {t('back') || 'Back'}
      </button>

      <div className="flex items-center justify-center mb-6">
        <div className="bg-blue-100 rounded-full p-4">
          <Mail className="w-16 h-16 text-blue-500" />
        </div>
      </div>

      <h2 className="text-3xl font-bold text-center mb-3 text-gray-800">
        {t('forgotPassword') || 'Forgot Password?'}
      </h2>

      <p className="text-center text-gray-600 mb-8">
        Password reset functionality is not yet available with the backend API.
      </p>

      <div className="bg-yellow-50 border-2 border-yellow-200 text-yellow-800 px-4 py-3 rounded-xl mb-6">
        <p className="text-sm">
          Please contact your administrator to reset your password.
        </p>
      </div>

      <button
        onClick={onBack}
        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg"
      >
        {t('backToLogin') || 'Back to Login'}
      </button>
    </div>
  );
}
