import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Globe2, MapPin, Users, Mountain, Languages as LanguagesIcon, Sparkles, X } from 'lucide-react';

interface Continent {
  id: string;
  nameEn: string;
  nameAr: string;
  emoji: string;
  color: string;
  descriptionEn: string;
  descriptionAr: string;
  area: string;
  population: string;
  countries: number;
  highestPoint: string;
  highestPointAr: string;
  languages: number;
  funFactsEn: string[];
  funFactsAr: string[];
  famousLandmarksEn: string[];
  famousLandmarksAr: string[];
  image: string;
}

export function ContinentsPage() {
  const { language } = useLanguage();
  const [selectedContinent, setSelectedContinent] = useState<Continent | null>(null);

  const continents: Continent[] = [
    {
      id: 'africa',
      nameEn: 'Africa',
      nameAr: 'أفريقيا',
      emoji: '🌍',
      color: 'from-orange-400 to-red-500',
      descriptionEn: 'The cradle of humanity! Africa is the second-largest continent and home to incredible wildlife, ancient pyramids, and diverse cultures.',
      descriptionAr: 'مهد البشرية! أفريقيا هي ثاني أكبر قارة وموطن للحياة البرية المذهلة والأهرامات القديمة والثقافات المتنوعة.',
      area: '30.37 million km²',
      population: '1.3 billion',
      countries: 54,
      highestPoint: 'Mount Kilimanjaro (5,895 m)',
      highestPointAr: 'جبل كليمنجارو (5,895 م)',
      languages: 2000,
      funFactsEn: [
        'Africa is home to the Sahara Desert, the largest hot desert in the world!',
        'The Nile River, the longest river on Earth, flows through 11 African countries.',
        'Africa has more countries than any other continent - 54 in total!',
        'Madagascar, an African island, is home to animals found nowhere else on Earth.'
      ],
      funFactsAr: [
        'أفريقيا هي موطن الصحراء الكبرى، أكبر صحراء حارة في العالم!',
        'نهر النيل، أطول نهر على وجه الأرض، يتدفق عبر 11 دولة أفريقية.',
        'أفريقيا لديها دول أكثر من أي قارة أخرى - 54 دولة في المجموع!',
        'مدغشقر، جزيرة أفريقية، هي موطن لحيوانات لا توجد في أي مكان آخر على الأرض.'
      ],
      famousLandmarksEn: [
        'Great Pyramids of Giza (Egypt)',
        'Victoria Falls (Zambia/Zimbabwe)',
        'Table Mountain (South Africa)',
        'Serengeti National Park (Tanzania)'
      ],
      famousLandmarksAr: [
        'أهرامات الجيزة العظيمة (مصر)',
        'شلالات فيكتوريا (زامبيا/زيمبابوي)',
        'جبل الطاولة (جنوب أفريقيا)',
        'حديقة سيرينجيتي الوطنية (تنزانيا)'
      ],
      image: '🦁'
    },
    {
      id: 'asia',
      nameEn: 'Asia',
      nameAr: 'آسيا',
      emoji: '🌏',
      color: 'from-red-400 to-pink-500',
      descriptionEn: 'The largest and most populous continent! Asia is home to ancient civilizations, towering mountains, and bustling megacities.',
      descriptionAr: 'أكبر قارة وأكثرها كثافة سكانية! آسيا هي موطن للحضارات القديمة والجبال الشاهقة والمدن الضخمة الصاخبة.',
      area: '44.58 million km²',
      population: '4.7 billion',
      countries: 49,
      highestPoint: 'Mount Everest (8,849 m)',
      highestPointAr: 'جبل إيفرست (8,849 م)',
      languages: 2300,
      funFactsEn: [
        'Asia is home to Mount Everest, the tallest mountain in the world!',
        'More than 60% of the world\'s population lives in Asia.',
        'The Great Wall of China is over 21,000 kilometers long!',
        'Asia has the most languages spoken of any continent.'
      ],
      funFactsAr: [
        'آسيا هي موطن جبل إيفرست، أعلى جبل في العالم!',
        'أكثر من 60٪ من سكان العالم يعيشون في آسيا.',
        'سور الصين العظيم يزيد طوله عن 21,000 كيلومتر!',
        'آسيا لديها أكثر اللغات المنطوقة من أي قارة.'
      ],
      famousLandmarksEn: [
        'Great Wall of China (China)',
        'Taj Mahal (India)',
        'Angkor Wat (Cambodia)',
        'Mount Fuji (Japan)'
      ],
      famousLandmarksAr: [
        'سور الصين العظيم (الصين)',
        'تاج محل (الهند)',
        'أنغكور وات (كمبوديا)',
        'جبل فوجي (اليابان)'
      ],
      image: '🐼'
    },
    {
      id: 'europe',
      nameEn: 'Europe',
      nameAr: 'أوروبا',
      emoji: '🌍',
      color: 'from-blue-400 to-indigo-500',
      descriptionEn: 'A continent rich in history and culture! Europe is known for its art, architecture, and diverse nations packed into a relatively small area.',
      descriptionAr: 'قارة غنية بالتاريخ والثقافة! تشتهر أوروبا بفنها وعمارتها ودولها المتنوعة المحشورة في منطقة صغيرة نسبيًا.',
      area: '10.18 million km²',
      population: '748 million',
      countries: 44,
      highestPoint: 'Mount Elbrus (5,642 m)',
      highestPointAr: 'جبل إلبروس (5,642 م)',
      languages: 200,
      funFactsEn: [
        'Europe has no deserts - it\'s the only continent without one!',
        'The Alps mountain range stretches across 8 European countries.',
        'Europe invented the concept of democracy in ancient Greece.',
        'The European Union uses the Euro, shared by 19 countries.'
      ],
      funFactsAr: [
        'أوروبا ليس بها صحاري - إنها القارة الوحيدة بدون صحراء!',
        'سلسلة جبال الألب تمتد عبر 8 دول أوروبية.',
        'أوروبا اخترعت مفهوم الديمقراطية في اليونان القديمة.',
        'الاتحاد الأوروبي يستخدم اليورو، الذي تتشاركه 19 دولة.'
      ],
      famousLandmarksEn: [
        'Eiffel Tower (France)',
        'Colosseum (Italy)',
        'Big Ben (United Kingdom)',
        'Acropolis (Greece)'
      ],
      famousLandmarksAr: [
        'برج إيفل (فرنسا)',
        'الكولوسيوم (إيطاليا)',
        'بيج بن (المملكة المتحدة)',
        'الأكروبوليس (اليونان)'
      ],
      image: '🏰'
    },
    {
      id: 'north-america',
      nameEn: 'North America',
      nameAr: 'أمريكا الشمالية',
      emoji: '🌎',
      color: 'from-green-400 to-teal-500',
      descriptionEn: 'A diverse continent of natural wonders! From frozen tundra to tropical beaches, North America has it all.',
      descriptionAr: 'قارة متنوعة من العجائب الطبيعية! من التندرا المتجمدة إلى الشواطئ الاستوائية، أمريكا الشمالية لديها كل شيء.',
      area: '24.71 million km²',
      population: '592 million',
      countries: 23,
      highestPoint: 'Denali (6,190 m)',
      highestPointAr: 'ديني (6,190 م)',
      languages: 1000,
      funFactsEn: [
        'The Grand Canyon is so big, you can see it from space!',
        'North America is home to the world\'s largest island, Greenland.',
        'Mexico City is the oldest capital city in the Americas.',
        'The Great Lakes contain 21% of the world\'s fresh surface water!'
      ],
      funFactsAr: [
        'الوادي الكبير كبير جدًا، يمكنك رؤيته من الفضاء!',
        'أمريكا الشمالية هي موطن أكبر جزيرة في العالم، غرينلاند.',
        'مكسيكو سيتي هي أقدم عاصمة في الأمريكتين.',
        'البحيرات العظمى تحتوي على 21٪ من المياه العذبة السطحية في العالم!'
      ],
      famousLandmarksEn: [
        'Statue of Liberty (USA)',
        'Grand Canyon (USA)',
        'Niagara Falls (Canada/USA)',
        'Chichen Itza (Mexico)'
      ],
      famousLandmarksAr: [
        'تمثال الحرية (الولايات المتحدة)',
        'الوادي الكبير (الولايات المتحدة)',
        'شلالات نياجرا (كندا/الولايات المتحدة)',
        'تشيتشن إيتزا (المكسيك)'
      ],
      image: '🦅'
    },
    {
      id: 'south-america',
      nameEn: 'South America',
      nameAr: 'أمريكا الجنوبية',
      emoji: '🌎',
      color: 'from-yellow-400 to-orange-500',
      descriptionEn: 'Home to the Amazon Rainforest! South America is filled with vibrant cultures, stunning landscapes, and incredible biodiversity.',
      descriptionAr: 'موطن غابات الأمازون المطيرة! أمريكا الجنوبية مليئة بالثقافات النابضة بالحياة والمناظر الطبيعية المذهلة والتنوع البيولوجي المذهل.',
      area: '17.84 million km²',
      population: '434 million',
      countries: 12,
      highestPoint: 'Aconcagua (6,961 m)',
      highestPointAr: 'أكونكاغوا (6,961 م)',
      languages: 448,
      funFactsEn: [
        'The Amazon Rainforest produces 20% of the world\'s oxygen!',
        'Angel Falls in Venezuela is the world\'s highest waterfall.',
        'The Andes is the longest mountain range in the world.',
        'South America is home to the driest place on Earth - the Atacama Desert!'
      ],
      funFactsAr: [
        'غابات الأمازون المطيرة تنتج 20٪ من أكسجين العالم!',
        'شلالات آنجل في فنزويلا هي أعلى شلالات في العالم.',
        'جبال الأنديز هي أطول سلسلة جبال في العالم.',
        'أمريكا الجنوبية هي موطن أكثر الأماكن جفافًا على الأرض - صحراء أتاكاما!'
      ],
      famousLandmarksEn: [
        'Machu Picchu (Peru)',
        'Christ the Redeemer (Brazil)',
        'Iguazu Falls (Argentina/Brazil)',
        'Galapagos Islands (Ecuador)'
      ],
      famousLandmarksAr: [
        'ماتشو بيتشو (بيرو)',
        'المسيح الفادي (البرازيل)',
        'شلالات إجوازو (الأرجنتين/البرازيل)',
        'جزر غالاباغوس (الإكوادور)'
      ],
      image: '🦜'
    },
    {
      id: 'australia',
      nameEn: 'Australia & Oceania',
      nameAr: 'أستراليا وأوقيانوسيا',
      emoji: '🌏',
      color: 'from-cyan-400 to-blue-500',
      descriptionEn: 'The land down under! Australia and Oceania feature unique wildlife, beautiful islands, and the Great Barrier Reef.',
      descriptionAr: 'الأرض في الأسفل! أستراليا وأوقيانوسيا تتميز بالحياة البرية الفريدة والجزر الجميلة والحاجز المرجاني العظيم.',
      area: '8.56 million km²',
      population: '44 million',
      countries: 14,
      highestPoint: 'Puncak Jaya (4,884 m)',
      highestPointAr: 'بونكاك جايا (4,884 م)',
      languages: 1300,
      funFactsEn: [
        'Australia is the only country that is also a continent!',
        'The Great Barrier Reef is the largest living structure on Earth.',
        '80% of animals found in Australia exist nowhere else!',
        'New Zealand was the last major landmass to be discovered by humans.'
      ],
      funFactsAr: [
        'أستراليا هي الدولة الوحيدة التي هي أيضًا قارة!',
        'الحاجز المرجاني العظيم هو أكبر هيكل حي على الأرض.',
        '80٪ من الحيوانات الموجودة في أستراليا لا توجد في أي مكان آخر!',
        'نيوزيلندا كانت آخر كتلة أرضية رئيسية يكتشفها البشر.'
      ],
      famousLandmarksEn: [
        'Sydney Opera House (Australia)',
        'Great Barrier Reef (Australia)',
        'Uluru (Australia)',
        'Milford Sound (New Zealand)'
      ],
      famousLandmarksAr: [
        'دار أوبرا سيدني (أستراليا)',
        'الحاجز المرجاني العظيم (أستراليا)',
        'أولورو (أستراليا)',
        'ميلفورد ساوند (نيوزيلندا)'
      ],
      image: '🦘'
    },
    {
      id: 'antarctica',
      nameEn: 'Antarctica',
      nameAr: 'القارة القطبية الجنوبية',
      emoji: '🧊',
      color: 'from-sky-400 to-blue-600',
      descriptionEn: 'The frozen continent! Antarctica is the coldest, driest, and windiest place on Earth, covered in ice year-round.',
      descriptionAr: 'القارة المتجمدة! القارة القطبية الجنوبية هي أبرد وأجف وأكثر الأماكن رياحًا على الأرض، مغطاة بالجليد على مدار العام.',
      area: '14.2 million km²',
      population: '1,000-5,000 (researchers)',
      countries: 0,
      highestPoint: 'Vinson Massif (4,892 m)',
      highestPointAr: 'فينسون ماسيف (4,892 م)',
      languages: 0,
      funFactsEn: [
        'Antarctica is the coldest place on Earth - temperatures reach -89°C!',
        'Antarctica has no permanent residents, only scientists.',
        '90% of the world\'s ice is in Antarctica!',
        'Antarctica is technically a desert because it gets so little rain.'
      ],
      funFactsAr: [
        'القارة القطبية الجنوبية هي أبرد مكان على الأرض - تصل درجات الحرارة إلى -89 درجة مئوية!',
        'القارة القطبية الجنوبية ليس لديها سكان دائمون، فقط علماء.',
        '90٪ من الجليد في العالم موجود في القارة القطبية الجنوبية!',
        'القارة القطبية الجنوبية تقنيًا صحراء لأنها تحصل على القليل جدًا من الأمطار.'
      ],
      famousLandmarksEn: [
        'South Pole',
        'Mount Erebus (Active Volcano)',
        'Ross Ice Shelf',
        'Blood Falls'
      ],
      famousLandmarksAr: [
        'القطب الجنوبي',
        'جبل إيريبوس (بركان نشط)',
        'الجرف الجليدي روس',
        'شلالات الدم'
      ],
      image: '🐧'
    }
  ];

  return (
    <div className="continents-page min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-slideDown">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Globe2 className="w-12 h-12 text-purple-600 animate-spin-slow" />
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {language === 'ar' ? 'القارات' : 'Continents'}
            </h1>
            <Globe2 className="w-12 h-12 text-pink-600 animate-spin-slow" style={{ animationDelay: '1s' }} />
          </div>
          <p className="text-xl text-gray-600 font-semibold max-w-3xl mx-auto">
            {language === 'ar'
              ? 'اكتشف القارات السبع المذهلة التي تشكل كوكبنا الجميل!'
              : 'Discover the seven amazing continents that make up our beautiful planet!'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {continents.map((continent, index) => (
            <button
              key={continent.id}
              onClick={() => setSelectedContinent(continent)}
              className="continent-card group bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl
                         transform hover:scale-105 transition-all duration-300 animate-slideUp
                         border-4 border-transparent hover:border-opacity-50"
              style={{
                animationDelay: `${index * 0.1}s`,
                borderColor: continent.color.includes('orange') ? '#fb923c' :
                             continent.color.includes('red') ? '#ef4444' :
                             continent.color.includes('blue') ? '#3b82f6' :
                             continent.color.includes('green') ? '#10b981' :
                             continent.color.includes('yellow') ? '#fbbf24' :
                             continent.color.includes('cyan') ? '#06b6d4' : '#8b5cf6'
              }}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`mb-4 p-4 rounded-2xl bg-gradient-to-br ${continent.color}
                                transform group-hover:rotate-12 group-hover:scale-110
                                transition-all duration-300 shadow-lg`}>
                  <span className="text-6xl">{continent.emoji}</span>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {language === 'ar' ? continent.nameAr : continent.nameEn}
                </h3>

                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-semibold">
                    {continent.countries} {language === 'ar' ? 'دولة' : 'countries'}
                  </span>
                </div>

                <div className="text-5xl mb-2 animate-float" style={{ animationDelay: `${index * 0.3}s` }}>
                  {continent.image}
                </div>

                <div className={`mt-2 w-full h-2 rounded-full bg-gradient-to-r ${continent.color}`}></div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedContinent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
             onClick={() => setSelectedContinent(null)}>
          <div className={`bg-gradient-to-br ${selectedContinent.color} rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto
                          shadow-2xl animate-scaleIn`}
               onClick={(e) => e.stopPropagation()}>
            <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-3xl p-8 m-2">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <span className="text-7xl">{selectedContinent.emoji}</span>
                  <div>
                    <h2 className="text-4xl font-black text-gray-800">
                      {language === 'ar' ? selectedContinent.nameAr : selectedContinent.nameEn}
                    </h2>
                    <p className="text-gray-600 mt-1">
                      {language === 'ar' ? selectedContinent.descriptionAr : selectedContinent.descriptionEn}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedContinent(null)}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="stat-card bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-4 text-center">
                  <MapPin className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-sm font-semibold text-gray-600">
                    {language === 'ar' ? 'المساحة' : 'Area'}
                  </div>
                  <div className="text-lg font-bold text-gray-800">{selectedContinent.area}</div>
                </div>

                <div className="stat-card bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl p-4 text-center">
                  <Users className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                  <div className="text-sm font-semibold text-gray-600">
                    {language === 'ar' ? 'السكان' : 'Population'}
                  </div>
                  <div className="text-lg font-bold text-gray-800">{selectedContinent.population}</div>
                </div>

                <div className="stat-card bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl p-4 text-center">
                  <Mountain className="w-8 h-8 mx-auto mb-2 text-pink-600" />
                  <div className="text-sm font-semibold text-gray-600">
                    {language === 'ar' ? 'أعلى نقطة' : 'Highest Point'}
                  </div>
                  <div className="text-sm font-bold text-gray-800">
                    {language === 'ar' ? selectedContinent.highestPointAr : selectedContinent.highestPoint}
                  </div>
                </div>

                <div className="stat-card bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl p-4 text-center">
                  <LanguagesIcon className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                  <div className="text-sm font-semibold text-gray-600">
                    {language === 'ar' ? 'اللغات' : 'Languages'}
                  </div>
                  <div className="text-lg font-bold text-gray-800">
                    {selectedContinent.languages === 0 ? 'N/A' : `${selectedContinent.languages}+`}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-6 h-6 text-yellow-500" />
                  <h3 className="text-2xl font-bold text-gray-800">
                    {language === 'ar' ? 'حقائق ممتعة' : 'Fun Facts'}
                  </h3>
                </div>
                <div className="space-y-3">
                  {(language === 'ar' ? selectedContinent.funFactsAr : selectedContinent.funFactsEn).map((fact, index) => (
                    <div key={index} className="flex items-start gap-3 bg-yellow-50 rounded-xl p-4 border-2 border-yellow-200">
                      <span className="text-2xl flex-shrink-0">✨</span>
                      <p className="text-gray-700 leading-relaxed">{fact}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Globe2 className="w-6 h-6 text-purple-500" />
                  <h3 className="text-2xl font-bold text-gray-800">
                    {language === 'ar' ? 'معالم مشهورة' : 'Famous Landmarks'}
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(language === 'ar' ? selectedContinent.famousLandmarksAr : selectedContinent.famousLandmarksEn).map((landmark, index) => (
                    <div key={index} className="flex items-center gap-3 bg-purple-50 rounded-xl p-4 border-2 border-purple-200">
                      <span className="text-2xl">🏛️</span>
                      <p className="text-gray-700 font-semibold">{landmark}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 text-center">
                <span className="text-6xl animate-bounce inline-block">{selectedContinent.image}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-slideDown {
          animation: slideDown 0.8s ease-out forwards;
        }

        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .continent-card {
          position: relative;
          overflow: hidden;
        }

        .continent-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent);
          transform: rotate(45deg);
          transition: all 0.6s;
        }

        .continent-card:hover::before {
          left: 100%;
        }
      `}</style>
    </div>
  );
}
