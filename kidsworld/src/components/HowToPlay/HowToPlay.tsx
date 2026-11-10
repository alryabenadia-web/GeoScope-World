import { useLanguage } from '../../contexts/LanguageContext';
import { Map, BookOpen, Trophy, Star, Compass, Sparkles, ArrowRight, Languages } from 'lucide-react';

interface HowToPlayProps {
  onStartPlaying: () => void;
}

export function HowToPlay({ onStartPlaying }: HowToPlayProps) {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const steps = [
    {
      icon: Map,
      titleEn: 'Explore the World Map',
      titleAr: 'استكشف خريطة العالم',
      descriptionEn: 'Click on any country on the interactive map to travel there instantly! Your little explorer avatar will fly to the destination.',
      descriptionAr: 'انقر على أي دولة على الخريطة التفاعلية للسفر إليها على الفور! سوف يطير مستكشفك الصغير إلى الوجهة.',
      emoji: '🗺️',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: BookOpen,
      titleEn: 'Learn Fun Facts',
      titleAr: 'تعلم حقائق ممتعة',
      descriptionEn: 'Discover amazing facts about each country! Learn about their capitals, famous landmarks, animals, and delicious foods.',
      descriptionAr: 'اكتشف حقائق مذهلة عن كل دولة! تعرف على عواصمها ومعالمها الشهيرة والحيوانات والأطعمة اللذيذة.',
      emoji: '📚',
      color: 'from-purple-400 to-purple-600'
    },
    {
      icon: Trophy,
      titleEn: 'Take Quizzes',
      titleAr: 'خذ الاختبارات',
      descriptionEn: 'Test your knowledge with fun quizzes about each country! Answer questions correctly to earn points and unlock achievements.',
      descriptionAr: 'اختبر معلوماتك من خلال اختبارات ممتعة عن كل دولة! أجب على الأسئلة بشكل صحيح لكسب النقاط وفتح الإنجازات.',
      emoji: '🎯',
      color: 'from-pink-400 to-pink-600'
    },
    {
      icon: Star,
      titleEn: 'Collect Points',
      titleAr: 'اجمع النقاط',
      descriptionEn: 'Earn points by visiting countries, completing quizzes, and finishing daily challenges. Watch your score grow!',
      descriptionAr: 'اكسب النقاط من خلال زيارة البلدان وإكمال الاختبارات وإنهاء التحديات اليومية. شاهد نتيجتك تنمو!',
      emoji: '⭐',
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      icon: Sparkles,
      titleEn: 'Unlock Achievements',
      titleAr: 'افتح الإنجازات',
      descriptionEn: 'Complete special challenges to unlock awesome badges and achievements. Can you collect them all?',
      descriptionAr: 'أكمل التحديات الخاصة لفتح شارات وإنجازات رائعة. هل يمكنك جمعها جميعًا؟',
      emoji: '🏆',
      color: 'from-orange-400 to-orange-600'
    },
    {
      icon: Compass,
      titleEn: 'Keep a Travel Journal',
      titleAr: 'احتفظ بمذكرات السفر',
      descriptionEn: 'All the countries you visit are saved in your travel journal. Track your adventures and see how many places you have discovered!',
      descriptionAr: 'يتم حفظ جميع البلدان التي تزورها في دفتر رحلاتك. تتبع مغامراتك وشاهد عدد الأماكن التي اكتشفتها!',
      emoji: '📖',
      color: 'from-green-400 to-green-600'
    }
  ];

  const tips = [
    {
      titleEn: 'Daily Challenge',
      titleAr: 'التحدي اليومي',
      descriptionEn: 'Complete a new challenge every day for bonus points!',
      descriptionAr: 'أكمل تحديًا جديدًا كل يوم للحصول على نقاط إضافية!',
      emoji: '🎪'
    },
    {
      titleEn: 'Customize Your Avatar',
      titleAr: 'خصص شخصيتك',
      descriptionEn: 'Choose your favorite explorer avatar to travel with!',
      descriptionAr: 'اختر مستكشفك المفضل للسفر معه!',
      emoji: '👤'
    },
    {
      titleEn: 'Learn in Arabic or English',
      titleAr: 'تعلم بالعربية أو الإنجليزية',
      descriptionEn: 'Switch between languages anytime using the flag button!',
      descriptionAr: 'قم بالتبديل بين اللغات في أي وقت باستخدام زر العلم!',
      emoji: '🌐'
    }
  ];

  return (
    <div className="how-to-play-container min-h-screen relative overflow-hidden">
      <div className="animated-background"></div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="absolute top-4 right-4 z-20 animate-slideDown">
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

        <div className="text-center mb-12 animate-slideDown">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-6xl animate-bounce">🎮</span>
            <h1 className="text-6xl md:text-7xl font-black text-white"
                style={{ textShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
              {language === 'ar' ? 'كيف تلعب' : 'How to Play'}
            </h1>
            <span className="text-6xl animate-bounce" style={{ animationDelay: '0.2s' }}>🌍</span>
          </div>
          <p className="text-2xl text-white font-semibold max-w-3xl mx-auto"
             style={{ textShadow: '0 4px 16px rgba(0,0,0,0.2)' }}>
            {language === 'ar'
              ? 'انطلق في رحلة حول العالم واستكشف بلدانًا مذهلة!'
              : 'Embark on a journey around the world and explore amazing countries!'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="step-card group bg-white rounded-3xl p-6 shadow-2xl hover:scale-105
                           transition-all duration-300 animate-slideUp border-4 border-opacity-50"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  borderColor: step.color.includes('blue') ? '#60a5fa' :
                               step.color.includes('purple') ? '#c084fc' :
                               step.color.includes('pink') ? '#f472b6' :
                               step.color.includes('yellow') ? '#fbbf24' :
                               step.color.includes('orange') ? '#fb923c' : '#4ade80'
                }}
              >
                <div className="flex items-center justify-center mb-4">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${step.color} transform
                                  group-hover:rotate-12 group-hover:scale-110 transition-all duration-300`}>
                    <Icon className="w-12 h-12 text-white" />
                  </div>
                </div>

                <div className="text-center mb-3">
                  <span className="text-5xl mb-2 inline-block animate-float"
                        style={{ animationDelay: `${index * 0.3}s` }}>
                    {step.emoji}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 text-center mb-3">
                  {language === 'ar' ? step.titleAr : step.titleEn}
                </h3>

                <p className="text-gray-600 text-center leading-relaxed">
                  {language === 'ar' ? step.descriptionAr : step.descriptionEn}
                </p>

                <div className={`mt-4 h-1 rounded-full bg-gradient-to-r ${step.color}
                                transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
              </div>
            );
          })}
        </div>

        <div className="tips-section bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 mb-12
                        border-4 border-white border-opacity-30 animate-slideUp"
             style={{ animationDelay: '0.8s' }}>
          <h2 className="text-4xl font-black text-white text-center mb-8 flex items-center justify-center gap-3">
            <Sparkles className="w-10 h-10" />
            {language === 'ar' ? 'نصائح مفيدة' : 'Helpful Tips'}
            <Sparkles className="w-10 h-10" />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tips.map((tip, index) => (
              <div
                key={index}
                className="tip-card bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl
                           hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${1 + index * 0.1}s` }}
              >
                <div className="text-center">
                  <span className="text-5xl mb-3 inline-block animate-bounce"
                        style={{ animationDelay: `${index * 0.2}s` }}>
                    {tip.emoji}
                  </span>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {language === 'ar' ? tip.titleAr : tip.titleEn}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {language === 'ar' ? tip.descriptionAr : tip.descriptionEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center animate-slideUp" style={{ animationDelay: '1.2s' }}>
          <button
            onClick={onStartPlaying}
            className="start-playing-btn group bg-gradient-to-r from-green-400 via-green-500 to-green-600
                       text-white font-black text-2xl px-12 py-6 rounded-full shadow-2xl
                       hover:scale-110 hover:shadow-3xl transition-all duration-300
                       flex items-center gap-4 mx-auto"
          >
            <span>{language === 'ar' ? 'ابدأ اللعب الآن!' : 'Start Playing Now!'}</span>
            <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>

      <style>{`
        .how-to-play-container {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          background-size: 400% 400%;
          animation: gradientFlow 20s ease infinite;
        }

        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animated-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background:
            radial-gradient(circle at 10% 20%, rgba(255,255,255,0.15) 0%, transparent 50%),
            radial-gradient(circle at 90% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 60%);
          animation: floatBackground 25s ease-in-out infinite;
        }

        @keyframes floatBackground {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.05); }
          66% { transform: translate(-30px, 30px) scale(0.95); }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        .animate-slideDown {
          animation: slideDown 1s ease-out forwards;
        }

        .animate-slideUp {
          animation: slideUp 1s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .step-card {
          position: relative;
          overflow: hidden;
        }

        .step-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent);
          transform: rotate(45deg);
          transition: all 0.6s;
        }

        .step-card:hover::before {
          left: 100%;
        }

        .start-playing-btn {
          position: relative;
          overflow: hidden;
        }

        .start-playing-btn::before {
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

        .start-playing-btn:hover::before {
          width: 400px;
          height: 400px;
        }

        .tip-card {
          animation: slideUp 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
