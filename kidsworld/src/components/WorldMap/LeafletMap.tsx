import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, CircleMarker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { apiClient, type Country, type JournalEntry } from '../../lib/api-client';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { useAudio } from '../../contexts/AudioContext';
import { CountryModal } from './CountryModal';
import { LittleExplorerMarker } from './LittleExplorerMarker';
import confetti from 'canvas-confetti';

interface CountryCircle {
  country: Country;
  isVisited: boolean;
  isHovered: boolean;
}

function MapController({ selectedCountry, onMapReady }: any) {
  const map = useMap();

  useEffect(() => {
    if (onMapReady) {
      onMapReady(map);
    }
  }, [map, onMapReady]);

  useEffect(() => {
    if (selectedCountry) {
      map.dragging.disable();
      map.scrollWheelZoom.disable();
      map.touchZoom.disable();
      map.doubleClickZoom.disable();
    } else {
      map.dragging.enable();
      map.scrollWheelZoom.enable();
      map.touchZoom.enable();
      map.doubleClickZoom.enable();
    }
  }, [selectedCountry, map]);

  return null;
}

export function LeafletMap() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [visitedCountries, setVisitedCountries] = useState<Set<string>>(new Set());
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [hoveredCountryId, setHoveredCountryId] = useState<string | null>(null);
  const [avatarPosition, setAvatarPosition] = useState<[number, number] | null>(null);
  const [arrivalMessage, setArrivalMessage] = useState<string>('');
  const [showArrivalMessage, setShowArrivalMessage] = useState(false);
  const { language } = useLanguage();
  const { playSound } = useAudio();
  const { profile, user } = useAuth();
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    fetchCountries();
    if (user) {
      fetchVisitedCountries();
    }
  }, [user]);

  useEffect(() => {
    if (countries.length > 0 && !avatarPosition) {
      const randomCountry = countries[Math.floor(Math.random() * countries.length)];
      setAvatarPosition([randomCountry.latitude, randomCountry.longitude]);
    }
  }, [countries]);

  const fetchCountries = async () => {
    try {
      const data = await apiClient.getCountries();
      // Filter out countries without valid coordinates
      const validCountries = (data || []).filter(
        country => country.latitude != null && country.longitude != null
      );
      setCountries(validCountries);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const fetchVisitedCountries = async () => {
    if (!user) return;

    try {
      const journal = await apiClient.getJournal() as JournalEntry[];
      if (journal) {
        setVisitedCountries(new Set(journal.map((v) => v.country_id)));
      }
    } catch (error) {
      console.error('Error fetching visited countries:', error);
    }
  };

  const handleCountryClick = (country: Country) => {
    playSound('click');
    setAvatarPosition([country.latitude, country.longitude]);

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.3);
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);

    setTimeout(() => {
      const countryName = language === 'ar' ? country.name_ar : country.name_en;
      setArrivalMessage(
        language === 'ar' ? `📍 وصلت إلى ${countryName}!` : `📍 You arrived in ${countryName}!`
      );
      setShowArrivalMessage(true);

      setTimeout(() => setShowArrivalMessage(false), 3000);

      setSelectedCountry(country);

      if (user) {
        fetchVisitedCountries();
      }

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#68b6ff', '#91e676', '#ffe780', '#ffb6c1']
      });
    }, 2000);
  };

  const getCountryColor = (countryId: string, isHovered: boolean) => {
    if (isHovered) {
      return { fillColor: '#FFE082', color: '#FFB300', weight: 2.5 };
    }
    if (visitedCountries.has(countryId)) {
      return { fillColor: '#AED581', color: '#7CB342', weight: 1.5 };
    }
    return { fillColor: '#B3E5FC', color: '#90CAF9', weight: 1 };
  };

  const handleCloseModal = () => {
    setSelectedCountry(null);
  };

  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        minZoom={2}
        maxZoom={6}
        style={{ height: '100%', width: '100%', borderRadius: '24px' }}
        zoomControl={true}
        ref={(map) => {
          if (map) {
            mapRef.current = map;
          }
        }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          opacity={0.85}
        />

        <MapController
          selectedCountry={selectedCountry}
          onMapReady={(map: L.Map) => {
            mapRef.current = map;
            if (!map.getPane('avatar')) {
              const avatarPane = map.createPane('avatar');
              avatarPane.style.zIndex = '400';
            }
          }}
        />

        {countries.map((country) => {
          const isHovered = hoveredCountryId === country.id;
          const style = getCountryColor(country.id, isHovered);

          return (
            <CircleMarker
              key={country.id}
              center={[country.latitude, country.longitude]}
              radius={8}
              pathOptions={{
                fillColor: style.fillColor,
                fillOpacity: 0.8,
                color: style.color,
                weight: style.weight,
              }}
              eventHandlers={{
                click: () => handleCountryClick(country),
                mouseover: () => setHoveredCountryId(country.id),
                mouseout: () => setHoveredCountryId(null),
              }}
            >
            </CircleMarker>
          );
        })}

        {profile && avatarPosition && (
          <LittleExplorerMarker
            position={avatarPosition}
            avatarType={(profile.avatar_style?.type as 'boy' | 'girl') || 'boy'}
          />
        )}
      </MapContainer>

      {hoveredCountryId && !selectedCountry && (
        <div className="absolute top-4 left-4 z-[500] pointer-events-none animate-bounce">
          <div className="bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl shadow-2xl px-6 py-3 border-4 border-white">
            <p className="font-black text-white text-lg">
              {countries.find((c) => c.id === hoveredCountryId)
                ? language === 'ar'
                  ? countries.find((c) => c.id === hoveredCountryId)?.name_ar
                  : countries.find((c) => c.id === hoveredCountryId)?.name_en
                : ''}
            </p>
          </div>
        </div>
      )}

      {showArrivalMessage && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[500] animate-bounce pointer-events-none">
          <div className="bg-gradient-to-r from-green-400 to-emerald-400 rounded-3xl shadow-2xl px-8 py-4 border-4 border-white">
            <p className="text-2xl font-black text-white">{arrivalMessage}</p>
          </div>
        </div>
      )}

      {selectedCountry && (
        <CountryModal
          country={selectedCountry}
          onClose={handleCloseModal}
        />
      )}

      <div className="absolute bottom-4 left-4 z-[500] bg-white rounded-xl shadow-lg p-4">
        <h4 className="font-bold text-gray-800 mb-2">
          {language === 'ar' ? 'المفتاح' : 'Legend'}
        </h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#B3E5FC] border-2 border-[#90CAF9]"></div>
            <span className="text-sm text-gray-700">
              {language === 'ar' ? 'لم تزر' : 'Not Visited'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#FFE082] border-2 border-[#FFB300]"></div>
            <span className="text-sm text-gray-700">
              {language === 'ar' ? 'محوم' : 'Hovered'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#AED581] border-2 border-[#7CB342]"></div>
            <span className="text-sm text-gray-700">
              {language === 'ar' ? 'تمت الزيارة' : 'Visited'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
