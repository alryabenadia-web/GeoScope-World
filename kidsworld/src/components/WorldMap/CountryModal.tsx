import { useState, useEffect } from 'react';
import { X, MapPin, Globe } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { useAudio } from '../../contexts/AudioContext';
import { apiClient, type Country } from '../../lib/api-client';
import { QuizSection } from './QuizSection';
import { CountryFlag } from '../common/CountryFlag';
import { fetchCountryImages } from '../../utils/imageService';

interface CountryModalProps {
  country: Country;
  onClose: () => void;
}

export function CountryModal({ country, onClose }: CountryModalProps) {
  const { language, t } = useLanguage();
  const { user } = useAuth();
  const { playSound } = useAudio();
  const [showQuiz, setShowQuiz] = useState(false);
  const [countryImages, setCountryImages] = useState<string[]>(country.image_urls || []);
  const [loadingImages, setLoadingImages] = useState(!country.image_urls);

  useEffect(() => {
    if (user) {
      recordVisit();
    }
  }, [country.id, user]);

  useEffect(() => {
    loadCountryImages();
  }, [country.id]);

  const loadCountryImages = async () => {
    setLoadingImages(true);
    const result = await fetchCountryImages(country.name_en);
    setCountryImages(result.urls);
    setLoadingImages(false);
  };

  const recordVisit = async () => {
    if (!user) return;

    try {
      await apiClient.visitCountry(country.code);
    } catch (error) {
      console.error('Error recording visit:', error);
    }
  };

  const name = language === 'ar' ? country.name_ar : country.name_en;
  const capital = language === 'ar' ? country.capital_ar : country.capital_en;
  const funFacts = language === 'ar' ? country.fun_facts_ar : country.fun_facts_en;
  const landmarks = language === 'ar' ? country.famous_landmarks_ar : country.famous_landmarks_en;
  const animals = language === 'ar' ? country.famous_animals_ar : country.famous_animals_en;
  const foods = language === 'ar' ? country.famous_foods_ar : country.famous_foods_en;

  return (
    <div className="country-info-modal overlay-container bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors shadow-lg z-10"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <CountryFlag countryCode={country.code} size={64} />
              <div>
                <h2 className="text-4xl font-bold text-gray-800">{name}</h2>
                <div className="flex items-center gap-2 mt-2 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span className="text-lg">{t('capital')}: {capital}</span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-gray-600">
                  <Globe className="w-5 h-5" />
                  <span className="text-lg">{t('continent')}: {t(`continents.${country.continent}`)}</span>
                </div>
              </div>
            </div>
          </div>

          {!showQuiz ? (
            <>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{t('gallery') || 'Gallery'}</h3>
                {loadingImages ? (
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="aspect-square bg-gray-200 rounded-xl animate-pulse" />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-4">
                    {countryImages.map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        alt={`${name} ${index + 1}`}
                        className="w-full aspect-square object-cover rounded-xl shadow-md hover:shadow-xl transition-shadow"
                      />
                    ))}
                  </div>
                )}
              </div>

              {funFacts.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{t('funFacts')}</h3>
                  <ul className="space-y-2">
                    {funFacts.map((fact, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">●</span>
                        <span className="text-gray-700">{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {landmarks.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{t('landmarks')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {landmarks.map((landmark, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {landmark}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {animals.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{t('animals')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {animals.map((animal, index) => (
                      <span
                        key={index}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                      >
                        {animal}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {foods.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{t('foods')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {foods.map((food, index) => (
                      <span
                        key={index}
                        className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm"
                      >
                        {food}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => {
                  playSound('click');
                  setShowQuiz(true);
                }}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
              >
                {t('takeQuiz')}
              </button>
            </>
          ) : (
            <QuizSection countryCode={country.code} onBack={() => setShowQuiz(false)} />
          )}
        </div>
      </div>
    </div>
  );
}
