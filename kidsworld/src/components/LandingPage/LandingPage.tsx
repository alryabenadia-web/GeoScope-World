import { useLanguage } from '../../contexts/LanguageContext';
import { EarthMascot } from './EarthMascot';
import { Rocket, PlayCircle, Languages } from 'lucide-react';

interface LandingPageProps {
  onStartExploring: () => void;
  onLearnHow: () => void;
  onNavigateToContinents: () => void;
  onNavigateToLearning: () => void;
  onNavigateToTopics: () => void;
  onNavigateToMountains: () => void;
}

export function LandingPage({ onStartExploring, onLearnHow, onNavigateToContinents, onNavigateToLearning, onNavigateToTopics, onNavigateToMountains }: LandingPageProps) {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const categories = [
    {
      icon: '🌍',
      title: 'القارات',
      titleEn: 'Continents',
      color: 'from-blue-400 to-blue-500',
      action: onNavigateToContinents,
    },
    {
      icon: '📚',
      title: 'التعلم',
      titleEn: 'Learning',
      color: 'from-purple-400 to-purple-500',
      action: onNavigateToLearning,
    },
    {
      icon: '🎨',
      title: 'المواضيع',
      titleEn: 'Topics',
      color: 'from-pink-400 to-pink-500',
      action: onNavigateToTopics,
    },
    {
      icon: '⛰️',
      title: 'الجبال',
      titleEn: 'Mountains',
      color: 'from-green-400 to-green-500',
      action: onNavigateToMountains,
    },
  ];

  return (
    <div className="landing-page-container min-h-screen relative overflow-hidden">
      <div className="wave-background"></div>
      <div className="wave-overlay"></div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="absolute top-4 right-4 z-20 animate-fadeIn">
          <button
            onClick={toggleLanguage}
            className="bg-white bg-opacity-20 backdrop-blur-md hover:bg-opacity-30
                       px-6 py-3 rounded-full font-bold text-white text-lg
                       flex items-center gap-3 border-2 border-white border-opacity-30
                       hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg"
            title={language === 'en' ? 'العربية' : 'English'}
          >
            <Languages className="w-6 h-6" />
            <span>{language === 'en' ? '🇸🇦 العربية' : '🇬🇧 English'}</span>
          </button>
        </div>

        <div className="flex flex-col items-center">
          <div className="top-icons flex items-center justify-center gap-8 mb-8 animate-fadeIn">
            <span className="text-6xl animate-spinSlow">⭐</span>
            <div className="animate-float">
              <img
                src="/pngtree-a-cute-3d-cartoon-earth-character-smiling-and-wearing-sunglasses-carrying-png-image_16340561-removebg-preview.png"
                alt="Earth Character"
                className="w-24 h-24 object-contain drop-shadow-2xl"
              />
            </div>
            <span className="text-6xl animate-spinSlow" style={{ animationDelay: '1s' }}>⭐</span>
          </div>

          <div className="hero-content flex items-center justify-center gap-8 mb-6 max-w-6xl w-full">
            <div className="hidden lg:block animate-float" style={{ animationDelay: '0.5s' }}>
              <img
                src="/pngtree-a-cute-3d-cartoon-earth-character-smiling-and-wearing-sunglasses-carrying-png-image_16340561-removebg-preview.png"
                alt="Earth Character"
                className="w-48 h-48 object-contain drop-shadow-2xl"
              />
            </div>

            <div className="text-center">
              <h1 className="hero-title text-7xl md:text-9xl font-black text-white mb-4 animate-slideUp"
                  style={{
                    textShadow: '0 8px 32px rgba(0,0,0,0.3)',
                    lineHeight: '1.1',
                    fontFamily: 'Arial, sans-serif',
                    letterSpacing: '-2px'
                  }}>
                {language === 'ar' ? (
                  <>
                    مستكشف<br />العالم!
                  </>
                ) : (
                  <>
                    World<br />Explorer!
                  </>
                )}
              </h1>
              <p className="hero-subtitle text-2xl md:text-3xl text-white font-bold mb-8 animate-slideUp"
                 style={{
                   animationDelay: '0.2s',
                   textShadow: '0 4px 16px rgba(0,0,0,0.2)'
                 }}>
                {language === 'ar'
                  ? 'اكتشف أماكن رائعة حول العالم!'
                  : 'Discover amazing places around the world!'}
              </p>
            </div>

            <div className="hidden lg:block animate-float" style={{ animationDelay: '1s' }}>
              <img
                src="/pngtree-a-cute-3d-cartoon-earth-character-smiling-and-wearing-sunglasses-carrying-png-image_16340561-removebg-preview.png"
                alt="Earth Character"
                className="w-48 h-48 object-contain drop-shadow-2xl transform scale-x-[-1]"
              />
            </div>
          </div>

          <div className="action-buttons flex flex-col sm:flex-row gap-4 mb-16 animate-slideUp"
               style={{ animationDelay: '0.4s' }}>
            <button
              onClick={onStartExploring}
              className="start-button group relative bg-gradient-to-r from-green-400 to-green-500 text-white font-bold
                         px-8 py-5 rounded-full text-xl flex items-center gap-3
                         hover:scale-105 hover:shadow-2xl transition-all duration-300
                         shadow-lg hover:from-green-500 hover:to-green-600"
            >
              <Rocket className="w-7 h-7 group-hover:translate-x-1 transition-transform" />
              <span>{language === 'ar' ? 'ابدأ الاستكشاف!' : 'Start Exploring!'}</span>
            </button>

            <button
              onClick={onLearnHow}
              className="learn-button bg-white text-blue-600 font-bold px-8 py-5 rounded-full text-xl
                         flex items-center gap-3 border-4 border-blue-300
                         hover:scale-105 hover:border-blue-400 hover:shadow-xl
                         transition-all duration-300 shadow-lg"
            >
              <PlayCircle className="w-7 h-7" />
              <span>{language === 'ar' ? 'تعلم كيف تلعب' : 'Learn How to Play'}</span>
            </button>
          </div>

          <div className="categories-grid grid grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl animate-slideUp"
               style={{ animationDelay: '0.6s' }}>
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={category.action}
                disabled={!category.action}
                className="category-card group bg-white bg-opacity-20 backdrop-blur-md
                           rounded-3xl p-6 flex flex-col items-center justify-center gap-4
                           hover:bg-opacity-30 hover:scale-105 hover:shadow-2xl
                           transition-all duration-300 cursor-pointer border-2 border-white border-opacity-30
                           disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{ animationDelay: `${0.8 + index * 0.1}s` }}
              >
                <div className="category-icon text-6xl group-hover:scale-110 group-hover:rotate-12
                                transition-all duration-300 animate-float"
                     style={{ animationDelay: `${index * 0.5}s` }}>
                  {category.icon}
                </div>
                <h3 className="category-title text-white font-bold text-xl text-center">
                  {language === 'ar' ? category.title : category.titleEn}
                </h3>
              </button>
            ))}
          </div>

         
        </div>
      </div>

      <style>{`
        .landing-page-container {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .wave-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background:
            radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(255,255,255,0.08) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 60%);
          animation: waveMove 20s ease-in-out infinite;
        }

        @keyframes waveMove {
          0%, 100% { transform: scale(1) translate(0, 0); }
          50% { transform: scale(1.1) translate(-20px, 20px); }
        }

        .wave-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at center, transparent 0%, rgba(102, 126, 234, 0.2) 100%);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes spinSlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-spinSlow {
          animation: spinSlow 20s linear infinite;
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }

        .animate-slideUp {
          animation: slideUp 1s ease-out forwards;
        }

        .start-button {
          position: relative;
          overflow: hidden;
        }

        .start-button::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255,255,255,0.3);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .start-button:hover::before {
          width: 300px;
          height: 300px;
        }

        .category-card {
          position: relative;
          overflow: hidden;
        }

        .category-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
          transform: rotate(45deg);
          transition: all 0.5s;
        }

        .category-card:hover::before {
          left: 100%;
        }
      `}</style>
    </div>
  );
}
