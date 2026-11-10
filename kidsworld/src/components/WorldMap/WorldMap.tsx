import { useState, useEffect } from 'react';
import { apiClient, type Country } from '../../lib/api-client';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAudio } from '../../contexts/AudioContext';
import { CountryModal } from './CountryModal';
import { CountryFlag } from '../common/CountryFlag';

export function WorldMap() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const { language } = useLanguage();
  const { playSound } = useAudio();

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const data = await apiClient.getCountries();
      setCountries(data || []);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const handleCountryClick = (country: Country) => {
    playSound('click');
    setSelectedCountry(country);
  };

  const getContainerStyle = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * 100;
    const y = ((90 - lat) / 180) * 100;
    return { left: `${x}%`, top: `${y}%` };
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-sky-200 to-blue-300 rounded-xl overflow-hidden">
     
      <div className="relative w-full h-full">
        {countries.map((country) => (
          <div
            key={country.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300"
            style={getContainerStyle(country.latitude, country.longitude)}
            onMouseEnter={() => setHoveredCountry(country.code)}
            onMouseLeave={() => setHoveredCountry(null)}
            onClick={() => handleCountryClick(country)}
          >
            <div
              className={`
                flex flex-col items-center justify-center p-2 rounded-full
                ${hoveredCountry === country.code ? 'scale-125' : 'scale-100'}
                transition-transform duration-200
              `}
            >
              <CountryFlag
                countryCode={country.code}
                size={48}
                className="filter drop-shadow-lg"
              />
              {hoveredCountry === country.code && (
                <div className="absolute top-full mt-2 bg-white px-3 py-2 rounded-lg shadow-lg text-sm font-semibold whitespace-nowrap z-10">
                  {language === 'ar' ? country.name_ar : country.name_en}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedCountry && (
        <CountryModal
          country={selectedCountry}
          onClose={() => setSelectedCountry(null)}
        />
      )}
    </div>
  );
}
