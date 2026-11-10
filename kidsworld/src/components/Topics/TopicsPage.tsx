import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Palette, Sparkles, Crown, TreePine, Waves, Plane, Building2, Utensils, Ship, Camera, Compass, Rocket, X } from 'lucide-react';

interface Topic {
  id: string;
  icon: JSX.Element;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  color: string;
  items: TopicItem[];
}

interface TopicItem {
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  funFactEn: string;
  funFactAr: string;
  emoji: string;
}

export function TopicsPage() {
  const { language } = useLanguage();
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedItem, setSelectedItem] = useState<number>(0);

  const topics: Topic[] = [
    {
      id: 'famous-landmarks',
      icon: <Building2 className="w-12 h-12" />,
      titleEn: 'Famous Landmarks',
      titleAr: 'المعالم الشهيرة',
      descriptionEn: 'Discover iconic buildings and monuments from around the world!',
      descriptionAr: 'اكتشف المباني والنصب التذكارية الشهيرة من جميع أنحاء العالم!',
      color: 'from-amber-400 to-orange-500',
      items: [
        {
          nameEn: 'Eiffel Tower',
          nameAr: 'برج إيفل',
          descriptionEn: 'This famous iron tower in Paris, France is 330 meters tall! It was built in 1889 and is visited by millions of people every year.',
          descriptionAr: 'هذا البرج الحديدي الشهير في باريس، فرنسا يبلغ ارتفاعه 330 مترًا! تم بناؤه في عام 1889 ويزوره ملايين الأشخاص كل عام.',
          funFactEn: 'The Eiffel Tower can grow up to 6 inches taller in summer due to thermal expansion!',
          funFactAr: 'يمكن أن ينمو برج إيفل حتى 6 بوصات أطول في الصيف بسبب التمدد الحراري!',
          emoji: '🗼'
        },
        {
          nameEn: 'Great Wall of China',
          nameAr: 'سور الصين العظيم',
          descriptionEn: 'This ancient wall stretches over 13,000 miles across China! It was built to protect the country and took centuries to complete.',
          descriptionAr: 'هذا الجدار القديم يمتد لأكثر من 13000 ميل عبر الصين! تم بناؤه لحماية البلاد واستغرق قرونًا لإكماله.',
          funFactEn: 'Contrary to popular belief, the Great Wall is not visible from space with the naked eye!',
          funFactAr: 'على عكس الاعتقاد الشائع، لا يمكن رؤية السور العظيم من الفضاء بالعين المجردة!',
          emoji: '🏯'
        },
        {
          nameEn: 'Pyramids of Giza',
          nameAr: 'أهرامات الجيزة',
          descriptionEn: 'These ancient pyramids in Egypt are over 4,500 years old! They were built as tombs for pharaohs and are one of the Seven Wonders of the Ancient World.',
          descriptionAr: 'هذه الأهرامات القديمة في مصر عمرها أكثر من 4500 سنة! تم بناؤها كمقابر للفراعنة وهي واحدة من عجائب الدنيا السبع القديمة.',
          funFactEn: 'The Great Pyramid was the tallest man-made structure for 3,800 years!',
          funFactAr: 'كان الهرم الأكبر أطول بناء من صنع الإنسان لمدة 3800 سنة!',
          emoji: '🔺'
        },
        {
          nameEn: 'Taj Mahal',
          nameAr: 'تاج محل',
          descriptionEn: 'This beautiful white marble palace in India was built by an emperor as a monument of love for his wife. It took 22 years to build!',
          descriptionAr: 'هذا القصر الرخامي الأبيض الجميل في الهند بناه إمبراطور كنصب تذكاري للحب لزوجته. استغرق بناؤه 22 عامًا!',
          funFactEn: 'The Taj Mahal changes color depending on the time of day and the light!',
          funFactAr: 'يتغير لون تاج محل حسب الوقت من اليوم والضوء!',
          emoji: '🕌'
        },
        {
          nameEn: 'Statue of Liberty',
          nameAr: 'تمثال الحرية',
          descriptionEn: 'This giant copper statue in New York was a gift from France! Lady Liberty stands 305 feet tall and welcomes visitors to America.',
          descriptionAr: 'هذا التمثال النحاسي العملاق في نيويورك كان هدية من فرنسا! سيدة الحرية يبلغ ارتفاعها 305 قدمًا وترحب بالزوار إلى أمريكا.',
          funFactEn: 'The statue was originally a shiny copper color, but turned green over time!',
          funFactAr: 'كان التمثال في الأصل بلون نحاسي لامع، لكنه تحول إلى اللون الأخضر مع مرور الوقت!',
          emoji: '🗽'
        }
      ]
    },
    {
      id: 'world-foods',
      icon: <Utensils className="w-12 h-12" />,
      titleEn: 'World Foods',
      titleAr: 'أطعمة العالم',
      descriptionEn: 'Taste the flavors of different cultures through their traditional dishes!',
      descriptionAr: 'تذوق نكهات الثقافات المختلفة من خلال أطباقها التقليدية!',
      color: 'from-red-400 to-pink-500',
      items: [
        {
          nameEn: 'Pizza (Italy)',
          nameAr: 'البيتزا (إيطاليا)',
          descriptionEn: 'This delicious flatbread topped with cheese and tomatoes comes from Italy! The first pizza was made in Naples over 200 years ago.',
          descriptionAr: 'هذا الخبز المسطح اللذيذ المغطى بالجبن والطماطم يأتي من إيطاليا! تم صنع أول بيتزا في نابولي قبل أكثر من 200 سنة.',
          funFactEn: 'Americans eat approximately 350 slices of pizza per second!',
          funFactAr: 'يأكل الأمريكيون حوالي 350 شريحة بيتزا في الثانية!',
          emoji: '🍕'
        },
        {
          nameEn: 'Sushi (Japan)',
          nameAr: 'السوشي (اليابان)',
          descriptionEn: 'This Japanese dish combines vinegared rice with fish and vegetables. It\'s healthy, colorful, and fun to eat with chopsticks!',
          descriptionAr: 'هذا الطبق الياباني يجمع بين الأرز المخلل والسمك والخضروات. إنه صحي وملون وممتع لتناوله بالعصي!',
          funFactEn: 'Sushi chefs in Japan train for up to 10 years to master their craft!',
          funFactAr: 'طهاة السوشي في اليابان يتدربون لمدة تصل إلى 10 سنوات لإتقان حرفتهم!',
          emoji: '🍣'
        },
        {
          nameEn: 'Tacos (Mexico)',
          nameAr: 'التاكو (المكسيك)',
          descriptionEn: 'These folded tortillas filled with meat, beans, and vegetables are a Mexican favorite! They\'re tasty and fun to customize.',
          descriptionAr: 'هذه التورتيلا المطوية المحشوة باللحم والفول والخضروات هي المفضلة المكسيكية! إنها لذيذة وممتعة للتخصيص.',
          funFactEn: 'Tacos were invented by Mexican silver miners in the 18th century!',
          funFactAr: 'تم اختراع التاكو من قبل عمال مناجم الفضة المكسيكيين في القرن الثامن عشر!',
          emoji: '🌮'
        },
        {
          nameEn: 'Croissant (France)',
          nameAr: 'الكرواسون (فرنسا)',
          descriptionEn: 'This buttery, flaky pastry is shaped like a crescent moon! It\'s perfect for breakfast with hot chocolate.',
          descriptionAr: 'هذه المعجنات الزبدية المقرمشة على شكل هلال! إنها مثالية لوجبة الإفطار مع الشوكولاتة الساخنة.',
          funFactEn: 'Croissants actually originated in Austria, not France!',
          funFactAr: 'الكرواسون نشأ في الواقع في النمسا، وليس فرنسا!',
          emoji: '🥐'
        },
        {
          nameEn: 'Biryani (India)',
          nameAr: 'البرياني (الهند)',
          descriptionEn: 'This fragrant rice dish mixed with spices, meat, and vegetables is loved across India! Each region has its own special recipe.',
          descriptionAr: 'هذا الطبق العطري من الأرز الممزوج بالتوابل واللحم والخضروات محبوب في جميع أنحاء الهند! كل منطقة لها وصفتها الخاصة.',
          funFactEn: 'The word "biryani" comes from the Persian word "birian" meaning "fried before cooking"!',
          funFactAr: 'كلمة "برياني" تأتي من الكلمة الفارسية "بيريان" وتعني "مقلي قبل الطبخ"!',
          emoji: '🍛'
        }
      ]
    },
    {
      id: 'natural-wonders',
      icon: <Sparkles className="w-12 h-12" />,
      titleEn: 'Natural Wonders',
      titleAr: 'العجائب الطبيعية',
      descriptionEn: 'Explore breathtaking natural formations created by Mother Nature!',
      descriptionAr: 'استكشف التكوينات الطبيعية الخلابة التي صنعتها الطبيعة الأم!',
      color: 'from-green-400 to-teal-500',
      items: [
        {
          nameEn: 'Grand Canyon',
          nameAr: 'جراند كانيون',
          descriptionEn: 'This massive canyon in Arizona, USA was carved by the Colorado River over millions of years! It\'s 277 miles long and up to 18 miles wide.',
          descriptionAr: 'هذا الوادي الضخم في أريزونا، الولايات المتحدة نحته نهر كولورادو على مدى ملايين السنين! يبلغ طوله 277 ميلاً وعرضه حتى 18 ميلاً.',
          funFactEn: 'The rocks at the bottom of the Grand Canyon are 2 billion years old!',
          funFactAr: 'الصخور في قاع جراند كانيون عمرها 2 مليار سنة!',
          emoji: '🏜️'
        },
        {
          nameEn: 'Aurora Borealis',
          nameAr: 'الشفق القطبي',
          descriptionEn: 'These magical dancing lights in the sky appear near the North Pole! They\'re created when particles from the sun interact with Earth\'s atmosphere.',
          descriptionAr: 'هذه الأضواء السحرية الراقصة في السماء تظهر بالقرب من القطب الشمالي! تتكون عندما تتفاعل جزيئات من الشمس مع الغلاف الجوي للأرض.',
          funFactEn: 'The lights can appear in many colors including green, pink, red, yellow, and blue!',
          funFactAr: 'يمكن أن تظهر الأضواء بألوان عديدة بما في ذلك الأخضر والوردي والأحمر والأصفر والأزرق!',
          emoji: '🌌'
        },
        {
          nameEn: 'Great Barrier Reef',
          nameAr: 'الحاجز المرجاني العظيم',
          descriptionEn: 'This massive coral reef off the coast of Australia is the largest living structure on Earth! It\'s home to thousands of marine species.',
          descriptionAr: 'هذا الشعاب المرجانية الضخمة قبالة ساحل أستراليا هي أكبر هيكل حي على الأرض! إنها موطن لآلاف الأنواع البحرية.',
          funFactEn: 'The Great Barrier Reef is so big, it can be seen from outer space!',
          funFactAr: 'الحاجز المرجاني العظيم كبير جدًا، يمكن رؤيته من الفضاء الخارجي!',
          emoji: '🪸'
        },
        {
          nameEn: 'Victoria Falls',
          nameAr: 'شلالات فيكتوريا',
          descriptionEn: 'This enormous waterfall between Zambia and Zimbabwe is one of the largest in the world! The local name means "The Smoke That Thunders".',
          descriptionAr: 'هذا الشلال الهائل بين زامبيا وزيمبابوي هو واحد من أكبر الشلالات في العالم! الاسم المحلي يعني "الدخان الذي يرعد".',
          funFactEn: 'During peak flow, over 500 million liters of water go over the falls every minute!',
          funFactAr: 'خلال ذروة التدفق، أكثر من 500 مليون لتر من الماء تمر فوق الشلالات كل دقيقة!',
          emoji: '💦'
        },
        {
          nameEn: 'Mount Everest',
          nameAr: 'جبل إيفرست',
          descriptionEn: 'The highest mountain on Earth stands at 29,032 feet! It\'s located in the Himalayas between Nepal and Tibet.',
          descriptionAr: 'أعلى جبل على الأرض يبلغ ارتفاعه 29032 قدمًا! يقع في جبال الهيمالايا بين نيبال والتبت.',
          funFactEn: 'Mount Everest is still growing about 4 millimeters each year!',
          funFactAr: 'جبل إيفرست لا يزال ينمو بحوالي 4 ملليمترات كل عام!',
          emoji: '⛰️'
        }
      ]
    },
    {
      id: 'amazing-animals',
      icon: <TreePine className="w-12 h-12" />,
      titleEn: 'Amazing Animals',
      titleAr: 'حيوانات مذهلة',
      descriptionEn: 'Meet incredible creatures from different parts of the world!',
      descriptionAr: 'قابل مخلوقات لا تصدق من أجزاء مختلفة من العالم!',
      color: 'from-purple-400 to-violet-500',
      items: [
        {
          nameEn: 'Giant Panda (China)',
          nameAr: 'الباندا العملاقة (الصين)',
          descriptionEn: 'These adorable black and white bears live in the mountains of China. They spend up to 14 hours a day eating bamboo!',
          descriptionAr: 'هذه الدببة الرائعة بالأبيض والأسود تعيش في جبال الصين. تقضي ما يصل إلى 14 ساعة في اليوم في أكل الخيزران!',
          funFactEn: 'Pandas are born pink, blind, and incredibly tiny - about the size of a stick of butter!',
          funFactAr: 'الباندا تولد وردية وعمياء وصغيرة بشكل لا يصدق - بحجم قطعة زبدة تقريبًا!',
          emoji: '🐼'
        },
        {
          nameEn: 'Kangaroo (Australia)',
          nameAr: 'الكنغر (أستراليا)',
          descriptionEn: 'These hopping marsupials can jump up to 30 feet in a single leap! Baby kangaroos, called joeys, live in their mother\'s pouch.',
          descriptionAr: 'هذه الجرابيات القافزة يمكن أن تقفز حتى 30 قدمًا في قفزة واحدة! صغار الكنغر، تسمى جوي، تعيش في جيب أمها.',
          funFactEn: 'Kangaroos can\'t walk backward and use their tail as a fifth leg!',
          funFactAr: 'الكنغر لا يمكنه المشي للخلف ويستخدم ذيله كساق خامسة!',
          emoji: '🦘'
        },
        {
          nameEn: 'Penguin (Antarctica)',
          nameAr: 'البطريق (القارة القطبية الجنوبية)',
          descriptionEn: 'These flightless birds are excellent swimmers! Emperor penguins can dive up to 1,850 feet deep and hold their breath for 20 minutes.',
          descriptionAr: 'هذه الطيور غير الطائرة سباحون ممتازون! بطاريق الإمبراطور يمكن أن تغوص حتى 1850 قدمًا وتحبس أنفاسها لمدة 20 دقيقة.',
          funFactEn: 'Penguins propose to their mates by giving them a pebble!',
          funFactAr: 'البطاريق تتقدم لشركائها بإعطائهم حصاة!',
          emoji: '🐧'
        },
        {
          nameEn: 'Elephant (Africa & Asia)',
          nameAr: 'الفيل (أفريقيا وآسيا)',
          descriptionEn: 'The largest land animals on Earth, elephants are incredibly smart and have amazing memories! They use their trunks like a hand.',
          descriptionAr: 'أكبر الحيوانات البرية على الأرض، الفيلة ذكية بشكل لا يصدق ولديها ذكريات مذهلة! تستخدم خراطيمها مثل اليد.',
          funFactEn: 'Elephants can hear each other\'s calls from up to 5 miles away!',
          funFactAr: 'الفيلة يمكن أن تسمع نداءات بعضها البعض من على بعد 5 أميال!',
          emoji: '🐘'
        },
        {
          nameEn: 'Sloth (South America)',
          nameAr: 'الكسلان (أمريكا الجنوبية)',
          descriptionEn: 'These slow-moving creatures spend most of their lives hanging upside down in rainforest trees! They only come down once a week.',
          descriptionAr: 'هذه المخلوقات البطيئة الحركة تقضي معظم حياتها معلقة رأسًا على عقب في أشجار الغابات المطيرة! تنزل فقط مرة واحدة في الأسبوع.',
          funFactEn: 'Sloths are such slow movers that algae grows on their fur, making them look green!',
          funFactAr: 'الكسلان بطيء جدًا لدرجة أن الطحالب تنمو على فروه، مما يجعله يبدو أخضر!',
          emoji: '🦥'
        }
      ]
    },
    {
      id: 'transportation',
      icon: <Plane className="w-12 h-12" />,
      titleEn: 'Transportation',
      titleAr: 'وسائل النقل',
      descriptionEn: 'Learn about different ways people travel around the world!',
      descriptionAr: 'تعلم عن الطرق المختلفة التي يسافر بها الناس حول العالم!',
      color: 'from-blue-400 to-indigo-500',
      items: [
        {
          nameEn: 'Bullet Train (Japan)',
          nameAr: 'قطار الرصاصة (اليابان)',
          descriptionEn: 'These super-fast trains in Japan can travel over 200 mph! They\'re called Shinkansen and are known for being extremely punctual.',
          descriptionAr: 'هذه القطارات السريعة جدًا في اليابان يمكن أن تسافر أكثر من 200 ميل في الساعة! تسمى شينكانسن ومعروفة بدقتها الشديدة.',
          funFactEn: 'Bullet trains have never had a passenger injury due to a crash!',
          funFactAr: 'قطارات الرصاصة لم يكن لديها إصابة راكب بسبب حادث!',
          emoji: '🚅'
        },
        {
          nameEn: 'Gondola (Italy)',
          nameAr: 'الجندول (إيطاليا)',
          descriptionEn: 'These traditional rowing boats are used in the canals of Venice, Italy! The gondoliers wear striped shirts and sing songs.',
          descriptionAr: 'هذه القوارب التقليدية بالمجداف تستخدم في قنوات البندقية، إيطاليا! الجندولا يرتدون قمصانًا مخططة ويغنون الأغاني.',
          funFactEn: 'All gondolas in Venice are painted black by tradition!',
          funFactAr: 'جميع الجندولا في البندقية مطلية بالأسود حسب التقليد!',
          emoji: '🛶'
        },
        {
          nameEn: 'Tuk-Tuk (Thailand)',
          nameAr: 'التوك توك (تايلاند)',
          descriptionEn: 'These colorful three-wheeled vehicles are popular in many Asian countries! They\'re fun, fast, and perfect for weaving through traffic.',
          descriptionAr: 'هذه المركبات ذات الثلاث عجلات الملونة شائعة في العديد من البلدان الآسيوية! إنها ممتعة وسريعة ومثالية للتنقل عبر حركة المرور.',
          funFactEn: 'The name "tuk-tuk" comes from the sound the engine makes!',
          funFactAr: 'الاسم "توك توك" يأتي من صوت المحرك!',
          emoji: '🛺'
        },
        {
          nameEn: 'Cable Car (San Francisco)',
          nameAr: 'التلفريك (سان فرانسيسكو)',
          descriptionEn: 'These historic streetcars climb up and down San Francisco\'s steep hills! They\'ve been running since 1873.',
          descriptionAr: 'هذه الترامات التاريخية تتسلق صعودًا وهبوطًا تلال سان فرانسيسكو الشديدة! كانت تعمل منذ عام 1873.',
          funFactEn: 'San Francisco\'s cable cars are the only mobile National Historic Monument!',
          funFactAr: 'التلفريك في سان فرانسيسكو هو النصب التاريخي الوطني المتحرك الوحيد!',
          emoji: '🚡'
        },
        {
          nameEn: 'Camel (Middle East)',
          nameAr: 'الجمل (الشرق الأوسط)',
          descriptionEn: 'Called "ships of the desert," camels have been transporting people and goods across deserts for thousands of years!',
          descriptionAr: 'تسمى "سفن الصحراء"، الجمال تنقل الناس والبضائع عبر الصحاري منذ آلاف السنين!',
          funFactEn: 'Camels can drink up to 40 gallons of water in one go!',
          funFactAr: 'الجمال يمكن أن تشرب حتى 40 جالونًا من الماء دفعة واحدة!',
          emoji: '🐪'
        }
      ]
    },
    {
      id: 'festivals',
      icon: <Crown className="w-12 h-12" />,
      titleEn: 'World Festivals',
      titleAr: 'مهرجانات العالم',
      descriptionEn: 'Celebrate amazing traditions and festivals from different cultures!',
      descriptionAr: 'احتفل بالتقاليد والمهرجانات المذهلة من ثقافات مختلفة!',
      color: 'from-pink-400 to-rose-500',
      items: [
        {
          nameEn: 'Carnival (Brazil)',
          nameAr: 'الكرنفال (البرازيل)',
          descriptionEn: 'This massive festival in Rio de Janeiro features colorful parades, dancing, and samba music! Millions of people celebrate in the streets.',
          descriptionAr: 'هذا المهرجان الضخم في ريو دي جانيرو يضم مواكب ملونة ورقص وموسيقى السامبا! ملايين الأشخاص يحتفلون في الشوارع.',
          funFactEn: 'Some carnival costumes can weigh up to 100 pounds!',
          funFactAr: 'بعض أزياء الكرنفال يمكن أن تزن حتى 100 رطل!',
          emoji: '🎭'
        },
        {
          nameEn: 'Diwali (India)',
          nameAr: 'ديوالي (الهند)',
          descriptionEn: 'Known as the Festival of Lights, families light oil lamps, set off fireworks, and share sweets! It celebrates the victory of light over darkness.',
          descriptionAr: 'المعروف بمهرجان الأضواء، العائلات تضيء مصابيح الزيت وتطلق الألعاب النارية وتشارك الحلويات! يحتفل بانتصار الضوء على الظلام.',
          funFactEn: 'Over 800 million people celebrate Diwali around the world!',
          funFactAr: 'أكثر من 800 مليون شخص يحتفلون بديوالي حول العالم!',
          emoji: '🪔'
        },
        {
          nameEn: 'Day of the Dead (Mexico)',
          nameAr: 'يوم الموتى (المكسيك)',
          descriptionEn: 'Families honor their ancestors by creating colorful altars with photos, flowers, and favorite foods! It\'s a joyful celebration of life.',
          descriptionAr: 'العائلات تكرم أسلافهم بإنشاء مذابح ملونة مع صور وزهور وأطعمة مفضلة! إنه احتفال بهيج بالحياة.',
          funFactEn: 'Marigold flowers are used because their scent is believed to guide spirits home!',
          funFactAr: 'تستخدم زهور الأقحوان لأن رائحتها يعتقد أنها توجه الأرواح إلى المنزل!',
          emoji: '💀'
        },
        {
          nameEn: 'Holi (India)',
          nameAr: 'هولي (الهند)',
          descriptionEn: 'This spring festival is famous for people throwing colored powder at each other! It celebrates the arrival of spring and new beginnings.',
          descriptionAr: 'هذا المهرجان الربيعي مشهور بالناس يرمون المسحوق الملون على بعضهم البعض! يحتفل بوصول الربيع والبدايات الجديدة.',
          funFactEn: 'The colored powders used in Holi were traditionally made from flowers and herbs!',
          funFactAr: 'المساحيق الملونة المستخدمة في هولي كانت تصنع تقليديًا من الزهور والأعشاب!',
          emoji: '🎨'
        },
        {
          nameEn: 'Chinese New Year (China)',
          nameAr: 'رأس السنة الصينية (الصين)',
          descriptionEn: 'This 15-day celebration features dragon dances, red decorations, and firecrackers! Each year is represented by a different animal.',
          descriptionAr: 'هذا الاحتفال الذي يستمر 15 يومًا يتضمن رقصات التنين والزينة الحمراء والمفرقعات النارية! كل سنة يمثلها حيوان مختلف.',
          funFactEn: 'Red envelopes filled with money are given for good luck!',
          funFactAr: 'الأظرف الحمراء المليئة بالمال تُعطى من أجل الحظ السعيد!',
          emoji: '🧧'
        }
      ]
    }
  ];

  return (
    <div className="topics-page min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-slideDown">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Palette className="w-12 h-12 text-pink-600 animate-bounce" />
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              {language === 'ar' ? 'مواضيع مثيرة' : 'Exciting Topics'}
            </h1>
            <Compass className="w-12 h-12 text-purple-600 animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>
          <p className="text-xl text-gray-600 font-semibold max-w-3xl mx-auto">
            {language === 'ar'
              ? 'اكتشف موضوعات رائعة من جميع أنحاء العالم!'
              : 'Discover fascinating topics from around the world!'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic, index) => (
            <button
              key={topic.id}
              onClick={() => {
                setSelectedTopic(topic);
                setSelectedItem(0);
              }}
              className="topic-card group bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl
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

              <p className="text-gray-600 leading-relaxed mb-4">
                {language === 'ar' ? topic.descriptionAr : topic.descriptionEn}
              </p>

              <div className="flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-bold text-gray-700">
                  {topic.items.length} {language === 'ar' ? 'عناصر' : 'items'}
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="text-center mt-12 p-8 bg-gradient-to-r from-pink-100 to-purple-100 rounded-3xl border-4 border-pink-200">
          <Rocket className="w-16 h-16 text-purple-500 mx-auto mb-4 animate-bounce" />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {language === 'ar' ? 'استكشف وتعلم!' : 'Explore and Learn!'}
          </h2>
          <p className="text-lg text-gray-700">
            {language === 'ar'
              ? 'اكتشف حقائق مذهلة حول العالم من حولنا!'
              : 'Discover amazing facts about the world around us!'}
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
                {selectedTopic.items.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedItem(index)}
                    className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap
                               transition-all duration-300 flex items-center gap-2 ${
                      selectedItem === index
                        ? `bg-gradient-to-r ${selectedTopic.color} text-white shadow-lg scale-105`
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    <span className="text-xl">{item.emoji}</span>
                    <span className="text-sm">
                      {language === 'ar' ? item.nameAr.split(' ')[0] : item.nameEn.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>

              <div className="item-content bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-6xl">
                    {selectedTopic.items[selectedItem].emoji}
                  </span>
                  <h3 className="text-3xl font-bold text-gray-800">
                    {language === 'ar'
                      ? selectedTopic.items[selectedItem].nameAr
                      : selectedTopic.items[selectedItem].nameEn}
                  </h3>
                </div>

                <div className="bg-white rounded-xl p-6 mb-4 shadow-sm">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {language === 'ar'
                      ? selectedTopic.items[selectedItem].descriptionAr
                      : selectedTopic.items[selectedItem].descriptionEn}
                  </p>
                </div>

                <div className="fun-fact bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 border-4 border-yellow-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-6 h-6 text-orange-500 animate-pulse" />
                    <h4 className="text-xl font-bold text-gray-800">
                      {language === 'ar' ? 'حقيقة ممتعة!' : 'Fun Fact!'}
                    </h4>
                  </div>
                  <p className="text-gray-700 text-lg font-semibold">
                    {language === 'ar'
                      ? selectedTopic.items[selectedItem].funFactAr
                      : selectedTopic.items[selectedItem].funFactEn}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={() => setSelectedItem(Math.max(0, selectedItem - 1))}
                  disabled={selectedItem === 0}
                  className="px-6 py-3 bg-gray-300 text-gray-700 rounded-full font-bold
                           hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed
                           transition-all duration-300"
                >
                  {language === 'ar' ? 'السابق' : 'Previous'}
                </button>

                <span className="text-gray-600 font-semibold">
                  {selectedItem + 1} / {selectedTopic.items.length}
                </span>

                <button
                  onClick={() =>
                    setSelectedItem(Math.min(selectedTopic.items.length - 1, selectedItem + 1))
                  }
                  disabled={selectedItem === selectedTopic.items.length - 1}
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

        .topic-card {
          position: relative;
          overflow: hidden;
        }

        .topic-card::before {
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

        .topic-card:hover::before {
          left: 100%;
        }
      `}</style>
    </div>
  );
}
