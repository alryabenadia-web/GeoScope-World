import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { BookOpen, Award, Brain, Lightbulb, Globe2, Map, Flag, Users, Mountain, Music, Trophy, Star, X } from 'lucide-react';

interface LearningTopic {
  id: string;
  icon: JSX.Element;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  color: string;
  lessons: Lesson[];
}

interface Lesson {
  titleEn: string;
  titleAr: string;
  contentEn: string[];
  contentAr: string[];
  funFactEn: string;
  funFactAr: string;
}

export function LearningPage() {
  const { language } = useLanguage();
  const [selectedTopic, setSelectedTopic] = useState<LearningTopic | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<number>(0);

  const learningTopics: LearningTopic[] = [
    {
      id: 'geography-basics',
      icon: <Globe2 className="w-12 h-12" />,
      titleEn: 'Geography Basics',
      titleAr: 'أساسيات الجغرافيا',
      descriptionEn: 'Learn about our amazing planet Earth and how we understand it!',
      descriptionAr: 'تعلم عن كوكبنا المذهل الأرض وكيف نفهمه!',
      color: 'from-blue-400 to-cyan-500',
      lessons: [
        {
          titleEn: 'What is Geography?',
          titleAr: 'ما هي الجغرافيا؟',
          contentEn: [
            'Geography is the study of Earth and its lands, features, and people.',
            'It helps us understand where things are and why they are there.',
            'Geographers use maps, globes, and technology to explore our world!',
            'Geography teaches us about different places, cultures, and environments.'
          ],
          contentAr: [
            'الجغرافيا هي دراسة الأرض وأراضيها ومعالمها وشعوبها.',
            'تساعدنا على فهم أين الأشياء ولماذا هي هناك.',
            'يستخدم الجغرافيون الخرائط والكرات الأرضية والتكنولوجيا لاستكشاف عالمنا!',
            'تعلمنا الجغرافيا عن الأماكن والثقافات والبيئات المختلفة.'
          ],
          funFactEn: 'The word "geography" comes from Greek words meaning "Earth writing"!',
          funFactAr: 'كلمة "جغرافيا" تأتي من كلمات يونانية تعني "كتابة الأرض"!'
        },
        {
          titleEn: 'Understanding Maps',
          titleAr: 'فهم الخرائط',
          contentEn: [
            'Maps are drawings that show us places from above.',
            'They use symbols and colors to show different things like water, land, and cities.',
            'A compass rose on a map shows us directions: North, South, East, and West.',
            'Map legends tell us what the symbols mean!'
          ],
          contentAr: [
            'الخرائط هي رسومات تظهر لنا الأماكن من الأعلى.',
            'تستخدم الرموز والألوان لإظهار أشياء مختلفة مثل الماء والأرض والمدن.',
            'بوصلة الاتجاهات على الخريطة تظهر لنا الاتجاهات: الشمال والجنوب والشرق والغرب.',
            'مفاتيح الخرائط تخبرنا بمعنى الرموز!'
          ],
          funFactEn: 'The oldest known map is over 4,000 years old and was found in Spain!',
          funFactAr: 'أقدم خريطة معروفة عمرها أكثر من 4000 سنة وتم العثور عليها في إسبانيا!'
        }
      ]
    },
    {
      id: 'continents-oceans',
      icon: <Map className="w-12 h-12" />,
      titleEn: 'Continents & Oceans',
      titleAr: 'القارات والمحيطات',
      descriptionEn: 'Discover the seven continents and five oceans of our world!',
      descriptionAr: 'اكتشف القارات السبع والمحيطات الخمسة في عالمنا!',
      color: 'from-purple-400 to-pink-500',
      lessons: [
        {
          titleEn: 'The Seven Continents',
          titleAr: 'القارات السبع',
          contentEn: [
            'Our world has seven continents: Africa, Asia, Europe, North America, South America, Australia, and Antarctica.',
            'Asia is the largest continent, covering about 30% of Earth\'s land!',
            'Antarctica is the coldest continent and is covered in ice.',
            'Each continent has unique animals, plants, and people!'
          ],
          contentAr: [
            'عالمنا به سبع قارات: أفريقيا وآسيا وأوروبا وأمريكا الشمالية وأمريكا الجنوبية وأستراليا والقارة القطبية الجنوبية.',
            'آسيا هي أكبر قارة، تغطي حوالي 30٪ من أرض الأرض!',
            'القارة القطبية الجنوبية هي أبرد قارة وهي مغطاة بالجليد.',
            'كل قارة لديها حيوانات ونباتات وشعوب فريدة!'
          ],
          funFactEn: 'Africa is called the "Mother Continent" because humans first appeared there!',
          funFactAr: 'أفريقيا تسمى "القارة الأم" لأن البشر ظهروا هناك أولاً!'
        },
        {
          titleEn: 'The Five Oceans',
          titleAr: 'المحيطات الخمسة',
          contentEn: [
            'Earth has five oceans: Pacific, Atlantic, Indian, Southern, and Arctic.',
            'The Pacific Ocean is the largest and deepest ocean!',
            'Oceans cover about 71% of Earth\'s surface.',
            'Millions of amazing creatures live in our oceans, from tiny plankton to giant whales!'
          ],
          contentAr: [
            'الأرض لديها خمسة محيطات: الهادئ والأطلسي والهندي والجنوبي والقطبي الشمالي.',
            'المحيط الهادئ هو أكبر وأعمق محيط!',
            'المحيطات تغطي حوالي 71٪ من سطح الأرض.',
            'ملايين المخلوقات المذهلة تعيش في محيطاتنا، من العوالق الصغيرة إلى الحيتان العملاقة!'
          ],
          funFactEn: 'The Pacific Ocean is so big, all the continents could fit inside it!',
          funFactAr: 'المحيط الهادئ كبير جدًا، يمكن أن تتسع جميع القارات بداخله!'
        }
      ]
    },
    {
      id: 'countries-flags',
      icon: <Flag className="w-12 h-12" />,
      titleEn: 'Countries & Flags',
      titleAr: 'الدول والأعلام',
      descriptionEn: 'Explore different countries and their colorful flags!',
      descriptionAr: 'استكشف الدول المختلفة وأعلامها الملونة!',
      color: 'from-red-400 to-orange-500',
      lessons: [
        {
          titleEn: 'What Makes a Country?',
          titleAr: 'ما الذي يصنع دولة؟',
          contentEn: [
            'A country is a place with its own government, borders, and laws.',
            'There are 195 countries in the world today!',
            'Each country has its own capital city where the government works.',
            'Countries have their own languages, money, and traditions.'
          ],
          contentAr: [
            'الدولة هي مكان له حكومة وحدود وقوانين خاصة به.',
            'هناك 195 دولة في العالم اليوم!',
            'كل دولة لديها عاصمة خاصة بها حيث تعمل الحكومة.',
            'الدول لديها لغاتها وأموالها وتقاليدها الخاصة.'
          ],
          funFactEn: 'Vatican City is the smallest country in the world - it\'s smaller than a shopping mall!',
          funFactAr: 'الفاتيكان هي أصغر دولة في العالم - إنها أصغر من مركز تسوق!'
        },
        {
          titleEn: 'Understanding Flags',
          titleAr: 'فهم الأعلام',
          contentEn: [
            'Every country has a flag with unique colors and symbols.',
            'Flag colors and symbols often represent the country\'s history and values.',
            'Red is the most common color found on flags around the world!',
            'Some flags have stars, animals, or plants that are important to the country.'
          ],
          contentAr: [
            'كل دولة لديها علم بألوان ورموز فريدة.',
            'ألوان ورموز العلم غالبًا تمثل تاريخ وقيم الدولة.',
            'الأحمر هو اللون الأكثر شيوعًا الموجود على الأعلام في جميع أنحاء العالم!',
            'بعض الأعلام بها نجوم أو حيوانات أو نباتات مهمة للدولة.'
          ],
          funFactEn: 'Nepal is the only country with a flag that isn\'t rectangular!',
          funFactAr: 'نيبال هي الدولة الوحيدة التي لها علم ليس مستطيلاً!'
        }
      ]
    },
    {
      id: 'cultures-people',
      icon: <Users className="w-12 h-12" />,
      titleEn: 'Cultures & People',
      titleAr: 'الثقافات والشعوب',
      descriptionEn: 'Learn about different cultures, traditions, and ways of life!',
      descriptionAr: 'تعلم عن الثقافات والتقاليد وطرق الحياة المختلفة!',
      color: 'from-green-400 to-teal-500',
      lessons: [
        {
          titleEn: 'What is Culture?',
          titleAr: 'ما هي الثقافة؟',
          contentEn: [
            'Culture is the way people live, including their traditions, food, music, and beliefs.',
            'Every country and region has its own unique culture!',
            'Learning about other cultures helps us understand and respect each other.',
            'Culture includes language, clothing, holidays, and how we celebrate!'
          ],
          contentAr: [
            'الثقافة هي الطريقة التي يعيش بها الناس، بما في ذلك تقاليدهم وطعامهم وموسيقاهم ومعتقداتهم.',
            'كل دولة ومنطقة لها ثقافتها الفريدة!',
            'التعلم عن الثقافات الأخرى يساعدنا على الفهم والاحترام المتبادل.',
            'الثقافة تشمل اللغة والملابس والأعياد وكيف نحتفل!'
          ],
          funFactEn: 'There are over 7,000 languages spoken around the world!',
          funFactAr: 'هناك أكثر من 7000 لغة منطوقة في جميع أنحاء العالم!'
        },
        {
          titleEn: 'World Traditions',
          titleAr: 'تقاليد العالم',
          contentEn: [
            'Different cultures celebrate in different ways!',
            'Some cultures greet with handshakes, some with bows, and some with kisses on the cheek.',
            'Food is an important part of every culture - each place has special dishes!',
            'Music and dance vary around the world, each with unique instruments and styles.'
          ],
          contentAr: [
            'الثقافات المختلفة تحتفل بطرق مختلفة!',
            'بعض الثقافات تحيي بالمصافحة، وبعضها بالانحناء، وبعضها بالقبلات على الخد.',
            'الطعام جزء مهم من كل ثقافة - كل مكان له أطباق خاصة!',
            'الموسيقى والرقص يختلفان في جميع أنحاء العالم، ولكل منهما آلات وأنماط فريدة.'
          ],
          funFactEn: 'In Japan, slurping your noodles is considered polite - it shows you enjoy the food!',
          funFactAr: 'في اليابان، صوت الشرب عند أكل المعكرونة يعتبر مهذبًا - يظهر أنك تستمتع بالطعام!'
        }
      ]
    },
    {
      id: 'landforms-nature',
      icon: <Mountain className="w-12 h-12" />,
      titleEn: 'Landforms & Nature',
      titleAr: 'التضاريس والطبيعة',
      descriptionEn: 'Discover mountains, rivers, deserts, and other natural wonders!',
      descriptionAr: 'اكتشف الجبال والأنهار والصحاري والعجائب الطبيعية الأخرى!',
      color: 'from-yellow-400 to-green-500',
      lessons: [
        {
          titleEn: 'Types of Landforms',
          titleAr: 'أنواع التضاريس',
          contentEn: [
            'Mountains are tall landforms that reach high into the sky!',
            'Valleys are low areas between hills or mountains.',
            'Plains are large, flat areas of land - perfect for farming!',
            'Deserts are dry areas with very little rain, but they\'re full of life!'
          ],
          contentAr: [
            'الجبال هي تضاريس عالية تصل إلى السماء!',
            'الوديان هي مناطق منخفضة بين التلال أو الجبال.',
            'السهول هي مناطق كبيرة ومسطحة من الأرض - مثالية للزراعة!',
            'الصحاري هي مناطق جافة بها القليل جدًا من الأمطار، لكنها مليئة بالحياة!'
          ],
          funFactEn: 'Mount Everest grows about 4 millimeters taller every year!',
          funFactAr: 'جبل إيفرست ينمو بحوالي 4 ملليمترات أطول كل عام!'
        },
        {
          titleEn: 'Water Features',
          titleAr: 'المعالم المائية',
          contentEn: [
            'Rivers are flowing bodies of water that travel to the ocean or lakes.',
            'Lakes are large bodies of water surrounded by land.',
            'Waterfalls happen when a river drops suddenly from a high place!',
            'Islands are pieces of land completely surrounded by water.'
          ],
          contentAr: [
            'الأنهار هي مجاري مائية متدفقة تسافر إلى المحيط أو البحيرات.',
            'البحيرات هي مسطحات مائية كبيرة محاطة بالأرض.',
            'الشلالات تحدث عندما ينحدر النهر فجأة من مكان مرتفع!',
            'الجزر هي قطع أرض محاطة بالماء بالكامل.'
          ],
          funFactEn: 'The Amazon River releases so much water, it makes the ocean less salty for miles!',
          funFactAr: 'نهر الأمازون يطلق الكثير من الماء، مما يجعل المحيط أقل ملوحة لأميال!'
        }
      ]
    },
    {
      id: 'climate-weather',
      icon: <Music className="w-12 h-12" />,
      titleEn: 'Climate & Weather',
      titleAr: 'المناخ والطقس',
      descriptionEn: 'Understand different climates and weather patterns around the world!',
      descriptionAr: 'افهم المناخات وأنماط الطقس المختلفة حول العالم!',
      color: 'from-cyan-400 to-blue-600',
      lessons: [
        {
          titleEn: 'Weather vs Climate',
          titleAr: 'الطقس مقابل المناخ',
          contentEn: [
            'Weather is what\'s happening outside right now - rain, sun, snow, or wind.',
            'Climate is the pattern of weather over many years.',
            'Some places have four seasons: spring, summer, fall, and winter!',
            'Near the equator, it\'s warm all year round!'
          ],
          contentAr: [
            'الطقس هو ما يحدث في الخارج الآن - مطر أو شمس أو ثلج أو رياح.',
            'المناخ هو نمط الطقس على مدى سنوات عديدة.',
            'بعض الأماكن بها أربعة فصول: الربيع والصيف والخريف والشتاء!',
            'بالقرب من خط الاستواء، يكون الجو دافئًا طوال العام!'
          ],
          funFactEn: 'The driest place on Earth is the Atacama Desert - some areas haven\'t seen rain in 400 years!',
          funFactAr: 'أكثر مكان جفافًا على الأرض هو صحراء أتاكاما - بعض المناطق لم تشهد مطرًا منذ 400 سنة!'
        },
        {
          titleEn: 'Climate Zones',
          titleAr: 'المناطق المناخية',
          contentEn: [
            'Tropical zones are hot and humid, with lots of rain and plants!',
            'Desert zones are very dry with big temperature differences between day and night.',
            'Temperate zones have moderate temperatures with four distinct seasons.',
            'Polar zones are extremely cold with ice and snow all year!'
          ],
          contentAr: [
            'المناطق الاستوائية حارة ورطبة، مع الكثير من الأمطار والنباتات!',
            'المناطق الصحراوية جافة جدًا مع فروق كبيرة في درجات الحرارة بين النهار والليل.',
            'المناطق المعتدلة لها درجات حرارة معتدلة مع أربعة فصول متميزة.',
            'المناطق القطبية باردة للغاية مع الجليد والثلج طوال العام!'
          ],
          funFactEn: 'Antarctica is technically a desert because it gets so little precipitation!',
          funFactAr: 'القارة القطبية الجنوبية تقنيًا صحراء لأنها تحصل على القليل جدًا من الأمطار!'
        }
      ]
    }
  ];

  return (
    <div className="learning-page min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-slideDown">
          <div className="flex items-center justify-center gap-4 mb-4">
            <BookOpen className="w-12 h-12 text-purple-600 animate-bounce" />
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {language === 'ar' ? 'مركز التعلم' : 'Learning Center'}
            </h1>
            <Brain className="w-12 h-12 text-pink-600 animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>
          <p className="text-xl text-gray-600 font-semibold max-w-3xl mx-auto">
            {language === 'ar'
              ? 'استكشف عالمنا المذهل من خلال دروس ممتعة وتفاعلية!'
              : 'Explore our amazing world through fun and interactive lessons!'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {learningTopics.map((topic, index) => (
            <button
              key={topic.id}
              onClick={() => {
                setSelectedTopic(topic);
                setSelectedLesson(0);
              }}
              className="learning-topic-card group bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl
                         transform hover:scale-105 transition-all duration-300 animate-slideUp
                         border-4 border-transparent hover:border-opacity-50"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`mb-4 p-4 rounded-2xl bg-gradient-to-br ${topic.color}
                              text-white flex items-center justify-center
                              transform group-hover:rotate-6 group-hover:scale-110
                              transition-all duration-300 shadow-lg`}>
                {topic.icon}
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {language === 'ar' ? topic.titleAr : topic.titleEn}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {language === 'ar' ? topic.descriptionAr : topic.descriptionEn}
              </p>

              <div className="mt-4 flex items-center justify-center gap-2">
                <Award className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-bold text-gray-700">
                  {topic.lessons.length} {language === 'ar' ? 'دروس' : 'lessons'}
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="text-center mt-12 p-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl border-4 border-purple-200">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4 animate-bounce" />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {language === 'ar' ? 'تعلم واكسب النقاط!' : 'Learn and Earn Points!'}
          </h2>
          <p className="text-lg text-gray-700">
            {language === 'ar'
              ? 'أكمل الدروس للحصول على شارات خاصة وفتح محتوى جديد!'
              : 'Complete lessons to earn special badges and unlock new content!'}
          </p>
        </div>
      </div>

      {selectedTopic && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn overflow-y-auto"
             onClick={() => setSelectedTopic(null)}>
          <div className={`bg-gradient-to-br ${selectedTopic.color} rounded-3xl max-w-4xl w-full my-8
                          shadow-2xl animate-scaleIn`}
               onClick={(e) => e.stopPropagation()}>
            <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-3xl p-8 m-2">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${selectedTopic.color} text-white`}>
                    {selectedTopic.icon}
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-gray-800">
                      {language === 'ar' ? selectedTopic.titleAr : selectedTopic.titleEn}
                    </h2>
                    <p className="text-gray-600">
                      {language === 'ar' ? selectedTopic.descriptionAr : selectedTopic.descriptionEn}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTopic(null)}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {selectedTopic.lessons.map((lesson, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedLesson(index)}
                    className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap
                               transition-all duration-300 ${
                      selectedLesson === index
                        ? `bg-gradient-to-r ${selectedTopic.color} text-white shadow-lg scale-105`
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {language === 'ar' ? `درس ${index + 1}` : `Lesson ${index + 1}`}
                  </button>
                ))}
              </div>

              <div className="lesson-content bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Star className="w-6 h-6 text-yellow-500" />
                  {language === 'ar'
                    ? selectedTopic.lessons[selectedLesson].titleAr
                    : selectedTopic.lessons[selectedLesson].titleEn}
                </h3>

                <div className="space-y-3 mb-6">
                  {(language === 'ar'
                    ? selectedTopic.lessons[selectedLesson].contentAr
                    : selectedTopic.lessons[selectedLesson].contentEn
                  ).map((paragraph, index) => (
                    <div key={index} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
                      <span className="text-2xl flex-shrink-0">📖</span>
                      <p className="text-gray-700 leading-relaxed text-lg">{paragraph}</p>
                    </div>
                  ))}
                </div>

                <div className="fun-fact bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 border-4 border-yellow-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-6 h-6 text-orange-500 animate-pulse" />
                    <h4 className="text-xl font-bold text-gray-800">
                      {language === 'ar' ? 'حقيقة ممتعة!' : 'Fun Fact!'}
                    </h4>
                  </div>
                  <p className="text-gray-700 text-lg font-semibold">
                    {language === 'ar'
                      ? selectedTopic.lessons[selectedLesson].funFactAr
                      : selectedTopic.lessons[selectedLesson].funFactEn}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => setSelectedLesson(Math.max(0, selectedLesson - 1))}
                  disabled={selectedLesson === 0}
                  className="px-6 py-3 bg-gray-300 text-gray-700 rounded-full font-bold
                           hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed
                           transition-all duration-300"
                >
                  {language === 'ar' ? 'السابق' : 'Previous'}
                </button>

                <span className="text-gray-600 font-semibold">
                  {selectedLesson + 1} / {selectedTopic.lessons.length}
                </span>

                <button
                  onClick={() =>
                    setSelectedLesson(Math.min(selectedTopic.lessons.length - 1, selectedLesson + 1))
                  }
                  disabled={selectedLesson === selectedTopic.lessons.length - 1}
                  className={`px-6 py-3 bg-gradient-to-r ${selectedTopic.color} text-white rounded-full font-bold
                           hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed
                           transition-all duration-300`}
                >
                  {language === 'ar' ? 'التالي' : 'Next'}
                </button>
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

        .learning-topic-card {
          position: relative;
          overflow: hidden;
        }

        .learning-topic-card::before {
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

        .learning-topic-card:hover::before {
          left: 100%;
        }
      `}</style>
    </div>
  );
}
