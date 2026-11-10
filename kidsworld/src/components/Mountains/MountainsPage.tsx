import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Mountain, Compass, Snowflake, Sun, Cloud, Wind, MapPin, TrendingUp, Trophy, X, Sparkles } from 'lucide-react';

interface MountainData {
  id: string;
  nameEn: string;
  nameAr: string;
  locationEn: string;
  locationAr: string;
  height: string;
  heightMeters: number;
  descriptionEn: string;
  descriptionAr: string;
  factsEn: string[];
  factsAr: string[];
  climate: string;
  climateEn: string;
  climateAr: string;
  difficulty: 'easy' | 'moderate' | 'challenging' | 'extreme';
  difficultyEn: string;
  difficultyAr: string;
  emoji: string;
  color: string;
  funFactEn: string;
  funFactAr: string;
}

export function MountainsPage() {
  const { language } = useLanguage();
  const [selectedMountain, setSelectedMountain] = useState<MountainData | null>(null);
  const [filter, setFilter] = useState<'all' | 'easy' | 'moderate' | 'challenging' | 'extreme'>('all');

  const mountains: MountainData[] = [
    {
      id: 'everest',
      nameEn: 'Mount Everest',
      nameAr: 'جبل إيفرست',
      locationEn: 'Nepal & Tibet',
      locationAr: 'نيبال والتبت',
      height: '29,032 ft',
      heightMeters: 8849,
      descriptionEn: 'The highest mountain on Earth! Mount Everest stands at the top of the world in the Himalayan mountain range. It\'s named after Sir George Everest, a British surveyor.',
      descriptionAr: 'أعلى جبل على الأرض! يقف جبل إيفرست في قمة العالم في سلسلة جبال الهيمالايا. سمي على اسم السير جورج إيفرست، مساح بريطاني.',
      factsEn: [
        'First climbed in 1953 by Edmund Hillary and Tenzing Norgay',
        'Takes about 2 months to climb from base camp to summit',
        'Over 6,000 people have successfully reached the summit',
        'The mountain grows about 4 millimeters every year'
      ],
      factsAr: [
        'تم تسلقه لأول مرة في عام 1953 من قبل إدموند هيلاري وتينزينج نورجاي',
        'يستغرق حوالي شهرين للتسلق من المعسكر الأساسي إلى القمة',
        'أكثر من 6000 شخص وصلوا بنجاح إلى القمة',
        'الجبل ينمو حوالي 4 ملليمترات كل عام'
      ],
      climate: 'extreme-cold',
      climateEn: 'Extreme Cold',
      climateAr: 'برد شديد',
      difficulty: 'extreme',
      difficultyEn: 'Extreme',
      difficultyAr: 'شديد الصعوبة',
      emoji: '🏔️',
      color: 'from-blue-600 to-cyan-500',
      funFactEn: 'At the summit, climbers are breathing air that has only one-third the oxygen of sea level!',
      funFactAr: 'في القمة، المتسلقون يتنفسون هواءً يحتوي على ثلث الأكسجين فقط مقارنة بمستوى سطح البحر!'
    },
    {
      id: 'kilimanjaro',
      nameEn: 'Mount Kilimanjaro',
      nameAr: 'جبل كليمنجارو',
      locationEn: 'Tanzania, Africa',
      locationAr: 'تنزانيا، أفريقيا',
      height: '19,341 ft',
      heightMeters: 5895,
      descriptionEn: 'Africa\'s tallest mountain and the highest free-standing mountain in the world! It\'s actually a dormant volcano with three volcanic cones.',
      descriptionAr: 'أطول جبل في أفريقيا وأعلى جبل قائم بذاته في العالم! إنه في الواقع بركان خامد به ثلاثة مخاريط بركانية.',
      factsEn: [
        'Has five distinct climate zones from base to summit',
        'No technical climbing skills needed - it\'s a hiking mountain',
        'Name means "Mountain of Greatness" in Swahili',
        'Home to unique alpine plants and animals'
      ],
      factsAr: [
        'له خمس مناطق مناخية متميزة من القاعدة إلى القمة',
        'لا حاجة لمهارات تسلق تقنية - إنه جبل للمشي',
        'الاسم يعني "جبل العظمة" في السواحيلية',
        'موطن للنباتات والحيوانات الألبية الفريدة'
      ],
      climate: 'varied',
      climateEn: 'Varied (Tropical to Arctic)',
      climateAr: 'متنوع (استوائي إلى قطبي)',
      difficulty: 'moderate',
      difficultyEn: 'Moderate',
      difficultyAr: 'متوسط',
      emoji: '🌋',
      color: 'from-orange-500 to-red-500',
      funFactEn: 'You can experience all of Earth\'s climate zones in just one climb!',
      funFactAr: 'يمكنك تجربة جميع المناطق المناخية للأرض في تسلق واحد فقط!'
    },
    {
      id: 'fuji',
      nameEn: 'Mount Fuji',
      nameAr: 'جبل فوجي',
      locationEn: 'Japan',
      locationAr: 'اليابان',
      height: '12,389 ft',
      heightMeters: 3776,
      descriptionEn: 'Japan\'s most famous and sacred mountain! This beautiful, symmetrical volcano is an iconic symbol of Japan and a UNESCO World Heritage site.',
      descriptionAr: 'أشهر جبل مقدس في اليابان! هذا البركان الجميل المتماثل هو رمز شهير لليابان وموقع تراث عالمي لليونسكو.',
      factsEn: [
        'Last erupted in 1707',
        'Over 300,000 people climb it annually',
        'Climbing season is only July and August',
        'Considered one of Japan\'s "Three Holy Mountains"'
      ],
      factsAr: [
        'آخر ثوران كان في عام 1707',
        'أكثر من 300000 شخص يتسلقونه سنويًا',
        'موسم التسلق فقط في يوليو وأغسطس',
        'يعتبر واحدًا من "الجبال المقدسة الثلاثة" في اليابان'
      ],
      climate: 'temperate',
      climateEn: 'Temperate',
      climateAr: 'معتدل',
      difficulty: 'moderate',
      difficultyEn: 'Moderate',
      difficultyAr: 'متوسط',
      emoji: '🗻',
      color: 'from-pink-400 to-purple-500',
      funFactEn: 'Mount Fuji appears perfectly symmetrical from certain angles, making it a favorite subject for artists!',
      funFactAr: 'يظهر جبل فوجي متماثلًا تمامًا من زوايا معينة، مما يجعله موضوعًا مفضلاً للفنانين!'
    },
    {
      id: 'matterhorn',
      nameEn: 'The Matterhorn',
      nameAr: 'ماترهورن',
      locationEn: 'Switzerland & Italy',
      locationAr: 'سويسرا وإيطاليا',
      height: '14,692 ft',
      heightMeters: 4478,
      descriptionEn: 'One of the most photographed mountains in the world! Its distinctive pyramid shape makes it instantly recognizable. It sits on the border between Switzerland and Italy.',
      descriptionAr: 'واحد من أكثر الجبال تصويرًا في العالم! شكله الهرمي المميز يجعله معروفًا على الفور. يقع على الحدود بين سويسرا وإيطاليا.',
      factsEn: [
        'Inspired the design of the Toblerone chocolate logo',
        'First climbed in 1865',
        'Has four distinct faces pointing to compass directions',
        'One of the deadliest peaks in the Alps'
      ],
      factsAr: [
        'ألهم تصميم شعار شوكولاتة توبليرون',
        'تم تسلقه لأول مرة في عام 1865',
        'له أربعة وجوه متميزة تشير إلى اتجاهات البوصلة',
        'واحد من أكثر القمم فتكًا في جبال الألب'
      ],
      climate: 'alpine',
      climateEn: 'Alpine',
      climateAr: 'جبال الألب',
      difficulty: 'challenging',
      difficultyEn: 'Challenging',
      difficultyAr: 'صعب',
      emoji: '⛰️',
      color: 'from-gray-600 to-blue-500',
      funFactEn: 'The Matterhorn appears on the famous Toblerone chocolate bar packaging!',
      funFactAr: 'يظهر ماترهورن على غلاف شوكولاتة توبليرون الشهيرة!'
    },
    {
      id: 'denali',
      nameEn: 'Denali',
      nameAr: 'ديناليى',
      locationEn: 'Alaska, USA',
      locationAr: 'ألاسكا، الولايات المتحدة',
      height: '20,310 ft',
      heightMeters: 6190,
      descriptionEn: 'North America\'s highest peak! Previously called Mount McKinley, its traditional name "Denali" means "The High One" in the native Athabaskan language.',
      descriptionAr: 'أعلى قمة في أمريكا الشمالية! كان يُسمى سابقًا جبل ماكينلي، اسمه التقليدي "ديناليى" يعني "العالي" في لغة أثاباسكان الأصلية.',
      factsEn: [
        'Has the highest vertical rise of any mountain on Earth',
        'Summer temperatures can be -40°F at the summit',
        'Only about half of climbers reach the summit',
        'Home to grizzly bears, wolves, and caribou'
      ],
      factsAr: [
        'له أعلى ارتفاع عمودي لأي جبل على الأرض',
        'درجات الحرارة الصيفية يمكن أن تكون -40 درجة فهرنهايت عند القمة',
        'حوالي نصف المتسلقين فقط يصلون إلى القمة',
        'موطن للدببة الرمادية والذئاب والرنة'
      ],
      climate: 'subarctic',
      climateEn: 'Subarctic',
      climateAr: 'شبه قطبي',
      difficulty: 'extreme',
      difficultyEn: 'Extreme',
      difficultyAr: 'شديد الصعوبة',
      emoji: '🏔️',
      color: 'from-indigo-600 to-blue-400',
      funFactEn: 'Despite being lower than Everest, Denali is considered more challenging due to extreme cold and storms!',
      funFactAr: 'على الرغم من كونه أقل من إيفرست، يعتبر ديناليى أكثر تحديًا بسبب البرد الشديد والعواصف!'
    },
    {
      id: 'table-mountain',
      nameEn: 'Table Mountain',
      nameAr: 'جبل الطاولة',
      locationEn: 'South Africa',
      locationAr: 'جنوب أفريقيا',
      height: '3,558 ft',
      heightMeters: 1085,
      descriptionEn: 'A flat-topped mountain overlooking Cape Town! Its unique shape and biodiversity make it one of the New 7 Wonders of Nature. You can reach the top by hiking or cable car!',
      descriptionAr: 'جبل مسطح القمة يطل على كيب تاون! شكله الفريد والتنوع البيولوجي يجعله واحدًا من عجائب الطبيعة السبع الجديدة. يمكنك الوصول إلى القمة عن طريق المشي أو التلفريك!',
      factsEn: [
        'Has a flat plateau measuring 3 kilometers long',
        'Home to over 2,200 species of plants',
        'Cable car carries 800 people per hour to the summit',
        'Formation is over 600 million years old'
      ],
      factsAr: [
        'له هضبة مسطحة يبلغ طولها 3 كيلومترات',
        'موطن لأكثر من 2200 نوع من النباتات',
        'التلفريك ينقل 800 شخص في الساعة إلى القمة',
        'التكوين عمره أكثر من 600 مليون سنة'
      ],
      climate: 'mediterranean',
      climateEn: 'Mediterranean',
      climateAr: 'متوسطي',
      difficulty: 'easy',
      difficultyEn: 'Easy',
      difficultyAr: 'سهل',
      emoji: '🏔️',
      color: 'from-green-500 to-emerald-600',
      funFactEn: 'When clouds spill over the edge, it\'s called the "tablecloth" - a spectacular sight!',
      funFactAr: 'عندما تنسكب السحب فوق الحافة، تسمى "مفرش المائدة" - منظر رائع!'
    },
    {
      id: 'andes',
      nameEn: 'The Andes Mountains',
      nameAr: 'جبال الأنديز',
      locationEn: 'South America',
      locationAr: 'أمريكا الجنوبية',
      height: '22,841 ft',
      heightMeters: 6961,
      descriptionEn: 'The longest mountain range in the world! Stretching 4,300 miles along South America\'s western coast, the Andes pass through seven countries.',
      descriptionAr: 'أطول سلسلة جبال في العالم! تمتد 4300 ميل على طول الساحل الغربي لأمريكا الجنوبية، تمر جبال الأنديز عبر سبع دول.',
      factsEn: [
        'Home to the ancient Inca civilization',
        'Contains active volcanoes',
        'Highest peak is Aconcagua at 22,841 feet',
        'Rich in minerals including copper, silver, and gold'
      ],
      factsAr: [
        'موطن حضارة الإنكا القديمة',
        'تحتوي على براكين نشطة',
        'أعلى قمة هي أكونكاغوا على ارتفاع 22841 قدمًا',
        'غنية بالمعادن بما في ذلك النحاس والفضة والذهب'
      ],
      climate: 'varied',
      climateEn: 'Varied',
      climateAr: 'متنوع',
      difficulty: 'challenging',
      difficultyEn: 'Challenging',
      difficultyAr: 'صعب',
      emoji: '⛰️',
      color: 'from-yellow-600 to-orange-500',
      funFactEn: 'Machu Picchu, the famous Inca citadel, sits high in the Andes mountains!',
      funFactAr: 'ماتشو بيتشو، قلعة الإنكا الشهيرة، تقع عالياً في جبال الأنديز!'
    },
    {
      id: 'alps',
      nameEn: 'The Alps',
      nameAr: 'جبال الألب',
      locationEn: 'Europe',
      locationAr: 'أوروبا',
      height: '15,774 ft',
      heightMeters: 4808,
      descriptionEn: 'Europe\'s highest and most famous mountain range! The Alps stretch across 8 countries and are known for skiing, hiking, and chocolate!',
      descriptionAr: 'أعلى وأشهر سلسلة جبال في أوروبا! تمتد جبال الألب عبر 8 دول ومعروفة بالتزلج والمشي لمسافات طويلة والشوكولاتة!',
      factsEn: [
        'Highest peak is Mont Blanc at 15,774 feet',
        'Over 14 million people live in the Alps region',
        'Popular destination for winter sports',
        'Home to iconic animals like the ibex and marmot'
      ],
      factsAr: [
        'أعلى قمة هي مون بلان على ارتفاع 15774 قدمًا',
        'أكثر من 14 مليون شخص يعيشون في منطقة جبال الألب',
        'وجهة شهيرة للرياضات الشتوية',
        'موطن لحيوانات شهيرة مثل الوعل والمرموط'
      ],
      climate: 'alpine',
      climateEn: 'Alpine',
      climateAr: 'جبال الألب',
      difficulty: 'moderate',
      difficultyEn: 'Moderate',
      difficultyAr: 'متوسط',
      emoji: '🎿',
      color: 'from-blue-400 to-purple-500',
      funFactEn: 'The Alps are growing about 1-2 millimeters taller each year!',
      funFactAr: 'جبال الألب تنمو بحوالي 1-2 ملليمتر أطول كل عام!'
    }
  ];

  const filteredMountains = filter === 'all'
    ? mountains
    : mountains.filter(m => m.difficulty === filter);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'moderate': return 'text-yellow-600 bg-yellow-100';
      case 'challenging': return 'text-orange-600 bg-orange-100';
      case 'extreme': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="mountains-page min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-slideDown">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Mountain className="w-12 h-12 text-blue-600 animate-bounce" />
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {language === 'ar' ? 'جبال العالم' : 'World Mountains'}
            </h1>
            <Compass className="w-12 h-12 text-purple-600 animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>
          <p className="text-xl text-gray-600 font-semibold max-w-3xl mx-auto">
            {language === 'ar'
              ? 'اكتشف أعلى القمم وسلاسل الجبال الأكثر شهرة في العالم!'
              : 'Discover the highest peaks and most famous mountain ranges in the world!'}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${
              filter === 'all'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {language === 'ar' ? 'الكل' : 'All'}
          </button>
          <button
            onClick={() => setFilter('easy')}
            className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${
              filter === 'easy'
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {language === 'ar' ? 'سهل' : 'Easy'}
          </button>
          <button
            onClick={() => setFilter('moderate')}
            className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${
              filter === 'moderate'
                ? 'bg-gradient-to-r from-yellow-500 to-orange-400 text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {language === 'ar' ? 'متوسط' : 'Moderate'}
          </button>
          <button
            onClick={() => setFilter('challenging')}
            className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${
              filter === 'challenging'
                ? 'bg-gradient-to-r from-orange-500 to-red-400 text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {language === 'ar' ? 'صعب' : 'Challenging'}
          </button>
          <button
            onClick={() => setFilter('extreme')}
            className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${
              filter === 'extreme'
                ? 'bg-gradient-to-r from-red-600 to-pink-500 text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {language === 'ar' ? 'شديد الصعوبة' : 'Extreme'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMountains.map((mountain, index) => (
            <button
              key={mountain.id}
              onClick={() => setSelectedMountain(mountain)}
              className="mountain-card group bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl
                         transform hover:scale-105 transition-all duration-300 animate-slideUp
                         text-left"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`mb-4 p-4 rounded-2xl bg-gradient-to-br ${mountain.color}
                              text-white flex items-center justify-center
                              transform group-hover:rotate-6 group-hover:scale-110
                              transition-all duration-300 shadow-lg`}>
                <span className="text-6xl">{mountain.emoji}</span>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-1">
                {language === 'ar' ? mountain.nameAr : mountain.nameEn}
              </h3>

              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <MapPin className="w-4 h-4" />
                <span>{language === 'ar' ? mountain.locationAr : mountain.locationEn}</span>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                <span className="text-lg font-bold text-gray-800">{mountain.height}</span>
              </div>

              <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getDifficultyColor(mountain.difficulty)}`}>
                {language === 'ar' ? mountain.difficultyAr : mountain.difficultyEn}
              </div>
            </button>
          ))}
        </div>

        {filteredMountains.length === 0 && (
          <div className="text-center py-12">
            <Mountain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600">
              {language === 'ar' ? 'لا توجد جبال تطابق هذا الفلتر' : 'No mountains match this filter'}
            </p>
          </div>
        )}

        <div className="text-center mt-12 p-8 bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl border-4 border-blue-200">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4 animate-bounce" />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {language === 'ar' ? 'اكتشف قمم العالم!' : 'Discover World Peaks!'}
          </h2>
          <p className="text-lg text-gray-700">
            {language === 'ar'
              ? 'تعلم عن أعلى وأشهر الجبال في كل قارة!'
              : 'Learn about the highest and most famous mountains on every continent!'}
          </p>
        </div>
      </div>

      {selectedMountain && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn overflow-y-auto"
             onClick={() => setSelectedMountain(null)}>
          <div className={`bg-gradient-to-br ${selectedMountain.color} rounded-3xl max-w-4xl w-full my-8
                          shadow-2xl animate-scaleIn`}
               onClick={(e) => e.stopPropagation()}>
            <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-3xl p-8 m-2">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${selectedMountain.color} text-white`}>
                    <span className="text-5xl">{selectedMountain.emoji}</span>
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-gray-800">
                      {language === 'ar' ? selectedMountain.nameAr : selectedMountain.nameEn}
                    </h2>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-5 h-5" />
                      <span className="text-lg">
                        {language === 'ar' ? selectedMountain.locationAr : selectedMountain.locationEn}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMountain(null)}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 rounded-2xl p-4 border-2 border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <span className="font-bold text-gray-700">
                      {language === 'ar' ? 'الارتفاع' : 'Height'}
                    </span>
                  </div>
                  <p className="text-2xl font-black text-blue-600">{selectedMountain.height}</p>
                  <p className="text-sm text-gray-600">{selectedMountain.heightMeters.toLocaleString()}m</p>
                </div>

                <div className="bg-purple-50 rounded-2xl p-4 border-2 border-purple-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Cloud className="w-5 h-5 text-purple-600" />
                    <span className="font-bold text-gray-700">
                      {language === 'ar' ? 'المناخ' : 'Climate'}
                    </span>
                  </div>
                  <p className="text-lg font-bold text-purple-600">
                    {language === 'ar' ? selectedMountain.climateAr : selectedMountain.climateEn}
                  </p>
                </div>

                <div className={`rounded-2xl p-4 border-2 ${getDifficultyColor(selectedMountain.difficulty)} border-opacity-50`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Mountain className="w-5 h-5" />
                    <span className="font-bold">
                      {language === 'ar' ? 'الصعوبة' : 'Difficulty'}
                    </span>
                  </div>
                  <p className="text-lg font-bold">
                    {language === 'ar' ? selectedMountain.difficultyAr : selectedMountain.difficultyEn}
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {language === 'ar' ? 'عن هذا الجبل' : 'About This Mountain'}
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg mb-6">
                  {language === 'ar' ? selectedMountain.descriptionAr : selectedMountain.descriptionEn}
                </p>

                <h4 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                  {language === 'ar' ? 'حقائق مثيرة' : 'Interesting Facts'}
                </h4>
                <div className="space-y-3">
                  {(language === 'ar' ? selectedMountain.factsAr : selectedMountain.factsEn).map((fact, index) => (
                    <div key={index} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
                      <span className="text-2xl flex-shrink-0">✓</span>
                      <p className="text-gray-700 leading-relaxed">{fact}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="fun-fact bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 border-4 border-yellow-300">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-6 h-6 text-orange-500 animate-pulse" />
                  <h4 className="text-xl font-bold text-gray-800">
                    {language === 'ar' ? 'حقيقة ممتعة!' : 'Fun Fact!'}
                  </h4>
                </div>
                <p className="text-gray-700 text-lg font-semibold">
                  {language === 'ar' ? selectedMountain.funFactAr : selectedMountain.funFactEn}
                </p>
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

        .animate-slideDown {
          animation: slideDown 0.8s ease-out forwards;
        }

        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }

        .mountain-card {
          position: relative;
          overflow: hidden;
        }

        .mountain-card::before {
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

        .mountain-card:hover::before {
          left: 100%;
        }
      `}</style>
    </div>
  );
}
