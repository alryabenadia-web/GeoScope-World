import { useState } from 'react';
import { BoyExplorer } from './BoyExplorer';
import { GirlExplorer } from './GirlExplorer';
import { apiClient } from '../../lib/api-client';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAudio } from '../../contexts/AudioContext';
import { Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export function AvatarSelector() {
  const { profile, user, refreshProfile } = useAuth();
  const { language } = useLanguage();
  const { playSound } = useAudio();
  const currentAvatarType = (profile?.avatar_style?.type || 'boy') as 'boy' | 'girl';
  const [selectedType, setSelectedType] = useState<'boy' | 'girl'>(currentAvatarType);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!user || selectedType === currentAvatarType) return;

    setSaving(true);
    playSound('click');

    try {
      await apiClient.updateProfile({ avatar_style: { type: selectedType } });
      await refreshProfile();
      playSound('achievement');
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#68b6ff', '#91e676', '#ffe780', '#ffb6c1'],
      });
    } catch (error) {
      console.error('Error updating avatar:', error);
    } finally {
      setSaving(false);
    }
  };

  const title = language === 'ar' ? 'اختر مستكشفك الصغير' : 'Choose Your Little Explorer';
  const boyLabel = language === 'ar' ? 'مستكشف صبي' : 'Boy Explorer';
  const girlLabel = language === 'ar' ? 'مستكشفة فتاة' : 'Girl Explorer';
  const saveButton = language === 'ar' ? 'حفظ' : 'Save Avatar';
  const description = language === 'ar'
    ? 'سيسافر مستكشفك الصغير معك حول العالم!'
    : 'Your Little Explorer will travel the world with you!';

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 mb-6">{description}</p>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <button
          onClick={() => {
            setSelectedType('boy');
            playSound('click');
          }}
          className={`
            relative p-6 rounded-2xl border-4 transition-all transform hover:scale-105
            ${
              selectedType === 'boy'
                ? 'border-blue-500 bg-blue-50 shadow-xl'
                : 'border-gray-200 bg-gray-50 hover:border-blue-300'
            }
          `}
        >
          {selectedType === 'boy' && (
            <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-1">
              <Check className="w-5 h-5 text-white" />
            </div>
          )}
          <div className="flex flex-col items-center">
            <div className="mb-4 transform hover:scale-110 transition-transform">
              <BoyExplorer size={150} />
            </div>
            <span className="font-bold text-lg text-gray-800">{boyLabel}</span>
          </div>
        </button>

        <button
          onClick={() => {
            setSelectedType('girl');
            playSound('click');
          }}
          className={`
            relative p-6 rounded-2xl border-4 transition-all transform hover:scale-105
            ${
              selectedType === 'girl'
                ? 'border-pink-500 bg-pink-50 shadow-xl'
                : 'border-gray-200 bg-gray-50 hover:border-pink-300'
            }
          `}
        >
          {selectedType === 'girl' && (
            <div className="absolute top-2 right-2 bg-pink-500 rounded-full p-1">
              <Check className="w-5 h-5 text-white" />
            </div>
          )}
          <div className="flex flex-col items-center">
            <div className="mb-4 transform hover:scale-110 transition-transform">
              <GirlExplorer size={150} />
            </div>
            <span className="font-bold text-lg text-gray-800">{girlLabel}</span>
          </div>
        </button>
      </div>

      {selectedType !== currentAvatarType && (
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg disabled:opacity-50"
        >
          {saving ? (language === 'ar' ? 'جار الحفظ...' : 'Saving...') : saveButton}
        </button>
      )}
    </div>
  );
}
