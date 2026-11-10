import { useState, useEffect } from 'react';
import { Globe, MapPin, Calendar, Trophy, Star } from 'lucide-react';
import { apiClient, type JournalEntry, type Country } from '../../lib/api-client';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { CountryFlag } from '../common/CountryFlag';
import { CountryModal } from '../WorldMap/CountryModal';

export function TravelJournal() {
  const [visits, setVisits] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContinent, setSelectedContinent] = useState<string>('all');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const { language, t } = useLanguage();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchVisits();
    }
  }, [user]);

  const fetchVisits = async () => {
    if (!user) return;

    try {
      const data = await apiClient.getJournal();
      setVisits(data as JournalEntry[]);
    } catch (error) {
      console.error('Error fetching visits:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (visits.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-3xl shadow-2xl p-12 text-center text-white">
          <Globe className="w-24 h-24 mx-auto mb-6 animate-pulse" />
          <h3 className="text-4xl font-bold mb-4">{t('myJournal')}</h3>
          <p className="text-xl opacity-90">{t('startExploring')}</p>
          <div className="mt-8 text-6xl">🗺️✈️🌍</div>
        </div>
      </div>
    );
  }

  const continents = ['all', ...new Set(visits.filter(v => v.country).map(v => v.country!.continent))];
  const filteredVisits = selectedContinent === 'all'
    ? visits
    : visits.filter(v => v.country && v.country.continent === selectedContinent);

  const continentStats = visits.filter(v => v.country).reduce((acc, visit) => {
    const continent = visit.country!.continent;
    acc[continent] = (acc[continent] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalVisits = visits.length;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-3xl shadow-2xl p-8 text-white">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-white bg-opacity-20 p-4 rounded-2xl">
              <Globe className="w-12 h-12" />
            </div>
            <div>
              <h1 className="text-4xl font-black mb-2">
                {language === 'ar' ? 'رحلاتي حول العالم' : 'My World Journey'}
              </h1>
              <p className="text-lg opacity-90">
                {language === 'ar'
                  ? 'اكتشف الأماكن التي زرتها'
                  : 'Discover the places you\'ve explored'}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-20 rounded-2xl p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-2">
              <MapPin className="w-6 h-6" />
              <span className="text-sm opacity-90">
                {language === 'ar' ? 'الدول المزارة' : 'Countries Visited'}
              </span>
            </div>
            <div className="text-4xl font-black">{visits.length}</div>
          </div>

          <div className="bg-white bg-opacity-20 rounded-2xl p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-2">
              <Star className="w-6 h-6" />
              <span className="text-sm opacity-90">
                {language === 'ar' ? 'إجمالي الزيارات' : 'Total Visits'}
              </span>
            </div>
            <div className="text-4xl font-black">{totalVisits}</div>
          </div>

          <div className="bg-white bg-opacity-20 rounded-2xl p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-6 h-6" />
              <span className="text-sm opacity-90">
                {language === 'ar' ? 'القارات' : 'Continents'}
              </span>
            </div>
            <div className="text-4xl font-black">{Object.keys(continentStats).length}</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2">
          {continents.map((continent) => (
            <button
              key={continent}
              onClick={() => setSelectedContinent(continent)}
              className={`
                px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all
                ${selectedContinent === continent
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {continent === 'all'
                ? (language === 'ar' ? 'الكل' : 'All')
                : continent}
              {continent !== 'all' && continentStats[continent] && (
                <span className="ml-2 bg-white bg-opacity-30 px-2 py-1 rounded-full text-xs">
                  {continentStats[continent]}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredVisits.map((visit) => {
            if (!visit.country) return null;

            const countryName = language === 'ar'
              ? visit.country.name_ar
              : visit.country.name_en;

            const capital = language === 'ar'
              ? visit.country.capital_ar
              : visit.country.capital_en;

            const firstVisit = new Date(visit.visited_at).toLocaleDateString();

            return (
              <div
                key={visit.id}
                onClick={() => setSelectedCountry(visit.country)}
                className="group relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-4 border-2 border-transparent hover:border-blue-400 hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1"
              >
                <div className="text-center">
                  <div className="mb-3 transform group-hover:scale-110 transition-transform flex justify-center">
                    <CountryFlag countryCode={visit.country!.code} size={64} />
                  </div>

                  <h3 className="font-bold text-gray-800 text-lg mb-1">
                    {countryName}
                  </h3>

                  <div className="text-xs text-gray-600 mb-2 flex items-center justify-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {capital}
                  </div>

                  <div className="flex items-center justify-center gap-1 text-xs text-purple-600 font-semibold mb-2">
                    <Star className="w-3 h-3 fill-purple-600" />
                    {visit.visit_count} {visit.visit_count === 1
                      ? (language === 'ar' ? 'زيارة' : 'visit')
                      : (language === 'ar' ? 'زيارات' : 'visits')}
                  </div>

                  <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    {firstVisit}
                  </div>

                  <div className="mt-2 inline-block px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold rounded-full">
                    {visit.country!.continent}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
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
