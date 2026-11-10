import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const countries = [
  {
    code: 'DZ',
    name_en: 'Algeria',
    name_ar: 'الجزائر',
    capital_en: 'Algiers',
    capital_ar: 'الجزائر',
    continent: 'Africa',
    population: BigInt(44000000),
    area: BigInt(2381741),
    flag_emoji: '🇩🇿',
    latitude: 28.0339,
    longitude: 1.6596,
    description_en: 'Algeria is the largest country in Africa, known for its diverse landscapes from the Mediterranean coast to the Sahara Desert.',
    description_ar: 'الجزائر هي أكبر دولة في أفريقيا، وتشتهر بمناظرها الطبيعية المتنوعة من ساحل البحر الأبيض المتوسط إلى الصحراء الكبرى.',
    fun_facts_en: [
      'Algeria is the largest country in Africa',
      'The Sahara Desert covers 80% of Algeria',
      'Algeria has seven UNESCO World Heritage Sites'
    ],
    fun_facts_ar: [
      'الجزائر هي أكبر دولة في أفريقيا',
      'الصحراء الكبرى تغطي 80% من الجزائر',
      'لدى الجزائر سبعة مواقع تراث عالمي لليونسكو'
    ],
    famous_landmarks_en: ['Casbah of Algiers', 'Tassili n\'Ajjer', 'Djémila'],
    famous_landmarks_ar: ['قصبة الجزائر', 'طاسيلي ناجر', 'جميلة'],
    famous_animals_en: ['Fennec Fox', 'Barbary Macaque', 'Dromedary Camel'],
    famous_animals_ar: ['الفنك', 'القرد البربري', 'الجمل العربي'],
    famous_foods_en: ['Couscous', 'Tajine', 'Merguez'],
    famous_foods_ar: ['كسكس', 'طاجين', 'مرقاز']
  },
  {
    code: 'AU',
    name_en: 'Australia',
    name_ar: 'أستراليا',
    capital_en: 'Canberra',
    capital_ar: 'كانبرا',
    continent: 'Oceania',
    population: BigInt(26000000),
    area: BigInt(7692024),
    flag_emoji: '🇦🇺',
    latitude: -25.2744,
    longitude: 133.7751,
    description_en: 'Australia is both a country and a continent, famous for its unique wildlife, stunning beaches, and the Great Barrier Reef.',
    description_ar: 'أستراليا هي بلد وقارة في آن واحد، وتشتهر بحياتها البرية الفريدة وشواطئها الخلابة والحاجز المرجاني العظيم.',
    fun_facts_en: [
      'Australia has over 10,000 beaches',
      'The Great Barrier Reef is the largest living structure on Earth',
      'Australia is home to 21 of the world\'s 25 most venomous snakes'
    ],
    fun_facts_ar: [
      'أستراليا لديها أكثر من 10,000 شاطئ',
      'الحاجز المرجاني العظيم هو أكبر هيكل حي على الأرض',
      'أستراليا موطن لـ 21 من أصل 25 أفعى الأكثر سمية في العالم'
    ],
    famous_landmarks_en: ['Sydney Opera House', 'Great Barrier Reef', 'Uluru'],
    famous_landmarks_ar: ['دار أوبرا سيدني', 'الحاجز المرجاني العظيم', 'أولورو'],
    famous_animals_en: ['Kangaroo', 'Koala', 'Platypus'],
    famous_animals_ar: ['الكنغر', 'الكوالا', 'خلد الماء'],
    famous_foods_en: ['Vegemite', 'Meat Pie', 'Lamington'],
    famous_foods_ar: ['فيجيمايت', 'فطيرة اللحم', 'لامينجتون']
  },
  {
    code: 'BH',
    name_en: 'Bahrain',
    name_ar: 'البحرين',
    capital_en: 'Manama',
    capital_ar: 'المنامة',
    continent: 'Asia',
    population: BigInt(1500000),
    area: BigInt(765),
    flag_emoji: '🇧🇭',
    latitude: 26.0667,
    longitude: 50.5577,
    description_en: 'Bahrain is a small island nation in the Persian Gulf, known for its pearl diving heritage and modern financial sector.',
    description_ar: 'البحرين دولة جزيرة صغيرة في الخليج العربي، وتشتهر بتراثها في الغوص على اللؤلؤ وقطاعها المالي الحديث.',
    fun_facts_en: [
      'Bahrain means "two seas" in Arabic',
      'It was famous for pearl diving for thousands of years',
      'Bahrain was the first Gulf state to discover oil'
    ],
    fun_facts_ar: [
      'البحرين تعني "بحرين" في اللغة العربية',
      'كانت مشهورة بالغوص على اللؤلؤ لآلاف السنين',
      'كانت البحرين أول دولة خليجية تكتشف النفط'
    ],
    famous_landmarks_en: ['Bahrain Fort', 'Tree of Life', 'Al Fateh Grand Mosque'],
    famous_landmarks_ar: ['قلعة البحرين', 'شجرة الحياة', 'مسجد الفاتح الكبير'],
    famous_animals_en: ['Arabian Oryx', 'Flamingo', 'Green Turtle'],
    famous_animals_ar: ['المها العربي', 'النحام الوردي', 'السلحفاة الخضراء'],
    famous_foods_en: ['Machboos', 'Muhammar', 'Halwa'],
    famous_foods_ar: ['مجبوس', 'محمر', 'حلوى']
  },
  {
    code: 'BR',
    name_en: 'Brazil',
    name_ar: 'البرازيل',
    capital_en: 'Brasília',
    capital_ar: 'برازيليا',
    continent: 'South America',
    population: BigInt(215000000),
    area: BigInt(8515767),
    flag_emoji: '🇧🇷',
    latitude: -14.2350,
    longitude: -51.9253,
    description_en: 'Brazil is the largest country in South America, famous for the Amazon rainforest, Carnival, and football.',
    description_ar: 'البرازيل هي أكبر دولة في أمريكا الجنوبية، وتشتهر بغابات الأمازون المطيرة والكرنفال وكرة القدم.',
    fun_facts_en: [
      'Brazil is the only Portuguese-speaking country in the Americas',
      'The Amazon River is the second longest in the world',
      'Brazil has won the FIFA World Cup 5 times'
    ],
    fun_facts_ar: [
      'البرازيل هي الدولة الوحيدة الناطقة بالبرتغالية في الأمريكتين',
      'نهر الأمازون هو ثاني أطول نهر في العالم',
      'فازت البرازيل بكأس العالم لكرة القدم 5 مرات'
    ],
    famous_landmarks_en: ['Christ the Redeemer', 'Iguazu Falls', 'Copacabana Beach'],
    famous_landmarks_ar: ['تمثال المسيح الفادي', 'شلالات إجوازو', 'شاطئ كوباكابانا'],
    famous_animals_en: ['Jaguar', 'Macaw', 'Capybara'],
    famous_animals_ar: ['اليغور', 'الببغاء الأمازوني', 'الكابيبارا'],
    famous_foods_en: ['Feijoada', 'Pão de Queijo', 'Brigadeiro'],
    famous_foods_ar: ['فيجوادا', 'خبز الجبن', 'بريجاديرو']
  },
  {
    code: 'CA',
    name_en: 'Canada',
    name_ar: 'كندا',
    capital_en: 'Ottawa',
    capital_ar: 'أوتاوا',
    continent: 'North America',
    population: BigInt(39000000),
    area: BigInt(9984670),
    flag_emoji: '🇨🇦',
    latitude: 56.1304,
    longitude: -106.3468,
    description_en: 'Canada is the second-largest country in the world, known for its natural beauty, multiculturalism, and maple syrup.',
    description_ar: 'كندا هي ثاني أكبر دولة في العالم، وتشتهر بجمالها الطبيعي والتعددية الثقافية وشراب القيقب.',
    fun_facts_en: [
      'Canada has the longest coastline in the world',
      'It has more lakes than all other countries combined',
      'The word "Canada" comes from the Huron-Iroquois word "kanata"'
    ],
    fun_facts_ar: [
      'كندا لديها أطول خط ساحلي في العالم',
      'لديها بحيرات أكثر من جميع البلدان الأخرى مجتمعة',
      'كلمة "كندا" تأتي من كلمة الهورون-إيروكوا "كاناتا"'
    ],
    famous_landmarks_en: ['Niagara Falls', 'CN Tower', 'Banff National Park'],
    famous_landmarks_ar: ['شلالات نياجرا', 'برج سي إن', 'منتزه بانف الوطني'],
    famous_animals_en: ['Beaver', 'Moose', 'Polar Bear'],
    famous_animals_ar: ['القندس', 'الموظ', 'الدب القطبي'],
    famous_foods_en: ['Poutine', 'Maple Syrup', 'Butter Tart'],
    famous_foods_ar: ['بوتين', 'شراب القيقب', 'فطيرة الزبدة']
  },
  {
    code: 'CN',
    name_en: 'China',
    name_ar: 'الصين',
    capital_en: 'Beijing',
    capital_ar: 'بكين',
    continent: 'Asia',
    population: BigInt(1400000000),
    area: BigInt(9596961),
    flag_emoji: '🇨🇳',
    latitude: 35.8617,
    longitude: 104.1954,
    description_en: 'China is the world\'s most populous country with a rich history spanning over 5,000 years.',
    description_ar: 'الصين هي الدولة الأكثر اكتظاظاً بالسكان في العالم مع تاريخ غني يمتد لأكثر من 5000 عام.',
    fun_facts_en: [
      'The Great Wall of China is over 13,000 miles long',
      'China invented paper, gunpowder, printing, and the compass',
      'Chinese New Year is the most important holiday'
    ],
    fun_facts_ar: [
      'سور الصين العظيم يبلغ طوله أكثر من 13,000 ميل',
      'اخترعت الصين الورق والبارود والطباعة والبوصلة',
      'رأس السنة الصينية هو أهم عطلة'
    ],
    famous_landmarks_en: ['Great Wall of China', 'Forbidden City', 'Terracotta Army'],
    famous_landmarks_ar: ['سور الصين العظيم', 'المدينة المحرمة', 'جيش التراكوتا'],
    famous_animals_en: ['Giant Panda', 'Red Panda', 'Chinese Dragon'],
    famous_animals_ar: ['الباندا العملاقة', 'الباندا الحمراء', 'التنين الصيني'],
    famous_foods_en: ['Peking Duck', 'Dim Sum', 'Hot Pot'],
    famous_foods_ar: ['بط بكين', 'ديم سوم', 'هوت بوت']
  },
  {
    code: 'EG',
    name_en: 'Egypt',
    name_ar: 'مصر',
    capital_en: 'Cairo',
    capital_ar: 'القاهرة',
    continent: 'Africa',
    population: BigInt(105000000),
    area: BigInt(1002450),
    flag_emoji: '🇪🇬',
    latitude: 26.8206,
    longitude: 30.8025,
    description_en: 'Egypt is home to one of the world\'s oldest civilizations and the iconic pyramids of Giza.',
    description_ar: 'مصر موطن لواحدة من أقدم الحضارات في العالم وأهرامات الجيزة الشهيرة.',
    fun_facts_en: [
      'The ancient Egyptians invented paper from papyrus',
      'The pyramids were built over 4,500 years ago',
      'Egypt has more than 130 pyramids'
    ],
    fun_facts_ar: [
      'اخترع المصريون القدماء الورق من البردي',
      'تم بناء الأهرامات منذ أكثر من 4,500 عام',
      'مصر لديها أكثر من 130 هرماً'
    ],
    famous_landmarks_en: ['Pyramids of Giza', 'Sphinx', 'Valley of the Kings'],
    famous_landmarks_ar: ['أهرامات الجيزة', 'أبو الهول', 'وادي الملوك'],
    famous_animals_en: ['Camel', 'Egyptian Cobra', 'Nile Crocodile'],
    famous_animals_ar: ['الجمل', 'الكوبرا المصرية', 'تمساح النيل'],
    famous_foods_en: ['Koshari', 'Ful Medames', 'Molokhia'],
    famous_foods_ar: ['كشري', 'فول مدمس', 'ملوخية']
  },
  {
    code: 'FR',
    name_en: 'France',
    name_ar: 'فرنسا',
    capital_en: 'Paris',
    capital_ar: 'باريس',
    continent: 'Europe',
    population: BigInt(67000000),
    area: BigInt(643801),
    flag_emoji: '🇫🇷',
    latitude: 46.2276,
    longitude: 2.2137,
    description_en: 'France is known for its art, culture, fashion, cuisine, and iconic landmarks like the Eiffel Tower.',
    description_ar: 'تشتهر فرنسا بالفن والثقافة والموضة والمطبخ والمعالم الشهيرة مثل برج إيفل.',
    fun_facts_en: [
      'France is the most visited country in the world',
      'The Louvre is the world\'s largest art museum',
      'French is spoken on five continents'
    ],
    fun_facts_ar: [
      'فرنسا هي البلد الأكثر زيارة في العالم',
      'متحف اللوفر هو أكبر متحف فني في العالم',
      'يتم التحدث بالفرنسية في خمس قارات'
    ],
    famous_landmarks_en: ['Eiffel Tower', 'Louvre Museum', 'Arc de Triomphe'],
    famous_landmarks_ar: ['برج إيفل', 'متحف اللوفر', 'قوس النصر'],
    famous_animals_en: ['Rooster', 'Alpine Ibex', 'European Hedgehog'],
    famous_animals_ar: ['الديك', 'الوعل الألبي', 'القنفذ الأوروبي'],
    famous_foods_en: ['Croissant', 'Baguette', 'Escargot'],
    famous_foods_ar: ['كرواسون', 'باغيت', 'حلزون']
  },
  {
    code: 'DE',
    name_en: 'Germany',
    name_ar: 'ألمانيا',
    capital_en: 'Berlin',
    capital_ar: 'برلين',
    continent: 'Europe',
    population: BigInt(83000000),
    area: BigInt(357022),
    flag_emoji: '🇩🇪',
    latitude: 51.1657,
    longitude: 10.4515,
    description_en: 'Germany is Europe\'s largest economy, known for its engineering excellence, beer, and rich history.',
    description_ar: 'ألمانيا هي أكبر اقتصاد في أوروبا، وتشتهر بتميزها الهندسي والبيرة وتاريخها الغني.',
    fun_facts_en: [
      'Germany has over 1,500 different types of beer',
      'The printing press was invented in Germany',
      'There are over 25,000 castles in Germany'
    ],
    fun_facts_ar: [
      'ألمانيا لديها أكثر من 1,500 نوع مختلف من البيرة',
      'اخترعت آلة الطباعة في ألمانيا',
      'هناك أكثر من 25,000 قلعة في ألمانيا'
    ],
    famous_landmarks_en: ['Brandenburg Gate', 'Neuschwanstein Castle', 'Cologne Cathedral'],
    famous_landmarks_ar: ['بوابة براندنبورغ', 'قلعة نويشفانشتاين', 'كاتدرائية كولونيا'],
    famous_animals_en: ['Wild Boar', 'Red Fox', 'European Badger'],
    famous_animals_ar: ['الخنزير البري', 'الثعلب الأحمر', 'الغرير الأوروبي'],
    famous_foods_en: ['Bratwurst', 'Pretzel', 'Schnitzel'],
    famous_foods_ar: ['براتفورست', 'بريتزل', 'شنيتزل']
  },
  {
    code: 'IN',
    name_en: 'India',
    name_ar: 'الهند',
    capital_en: 'New Delhi',
    capital_ar: 'نيودلهي',
    continent: 'Asia',
    population: BigInt(1400000000),
    area: BigInt(3287263),
    flag_emoji: '🇮🇳',
    latitude: 20.5937,
    longitude: 78.9629,
    description_en: 'India is the world\'s largest democracy with incredible diversity in culture, languages, and landscapes.',
    description_ar: 'الهند هي أكبر ديمقراطية في العالم مع تنوع مذهل في الثقافة واللغات والمناظر الطبيعية.',
    fun_facts_en: [
      'India has 22 official languages',
      'Chess was invented in India',
      'The Taj Mahal took 22 years to build'
    ],
    fun_facts_ar: [
      'الهند لديها 22 لغة رسمية',
      'اخترعت الشطرنج في الهند',
      'استغرق بناء تاج محل 22 عاماً'
    ],
    famous_landmarks_en: ['Taj Mahal', 'Red Fort', 'Gateway of India'],
    famous_landmarks_ar: ['تاج محل', 'القلعة الحمراء', 'بوابة الهند'],
    famous_animals_en: ['Bengal Tiger', 'Indian Elephant', 'Peacock'],
    famous_animals_ar: ['نمر البنغال', 'الفيل الهندي', 'الطاووس'],
    famous_foods_en: ['Curry', 'Biryani', 'Naan'],
    famous_foods_ar: ['كاري', 'برياني', 'نان']
  },
  {
    code: 'IT',
    name_en: 'Italy',
    name_ar: 'إيطاليا',
    capital_en: 'Rome',
    capital_ar: 'روما',
    continent: 'Europe',
    population: BigInt(59000000),
    area: BigInt(301340),
    flag_emoji: '🇮🇹',
    latitude: 41.8719,
    longitude: 12.5674,
    description_en: 'Italy is famous for its ancient history, Renaissance art, fashion, and world-renowned cuisine.',
    description_ar: 'إيطاليا مشهورة بتاريخها القديم وفن عصر النهضة والموضة والمطبخ المشهور عالمياً.',
    fun_facts_en: [
      'Italy has more UNESCO World Heritage sites than any other country',
      'The pizza was invented in Naples',
      'The Colosseum could hold 50,000 spectators'
    ],
    fun_facts_ar: [
      'إيطاليا لديها مواقع تراث عالمي لليونسكو أكثر من أي دولة أخرى',
      'اخترعت البيتزا في نابولي',
      'يمكن للكولوسيوم استيعاب 50,000 متفرج'
    ],
    famous_landmarks_en: ['Colosseum', 'Leaning Tower of Pisa', 'Venice Canals'],
    famous_landmarks_ar: ['الكولوسيوم', 'برج بيزا المائل', 'قنوات البندقية'],
    famous_animals_en: ['Italian Wolf', 'Marsican Brown Bear', 'Mediterranean Monk Seal'],
    famous_animals_ar: ['الذئب الإيطالي', 'الدب البني المارسيكاني', 'فقمة الراهب المتوسطية'],
    famous_foods_en: ['Pizza', 'Pasta', 'Gelato'],
    famous_foods_ar: ['بيتزا', 'مكرونة', 'جيلاتو']
  },
  {
    code: 'JP',
    name_en: 'Japan',
    name_ar: 'اليابان',
    capital_en: 'Tokyo',
    capital_ar: 'طوكيو',
    continent: 'Asia',
    population: BigInt(125000000),
    area: BigInt(377975),
    flag_emoji: '🇯🇵',
    latitude: 36.2048,
    longitude: 138.2529,
    description_en: 'Japan is an island nation known for its blend of ancient traditions and cutting-edge technology.',
    description_ar: 'اليابان دولة جزيرة معروفة بمزيجها من التقاليد القديمة والتكنولوجيا المتطورة.',
    fun_facts_en: [
      'Japan has more than 6,800 islands',
      'Tokyo is the world\'s largest metropolitan area',
      'Japan has the oldest monarchy in the world'
    ],
    fun_facts_ar: [
      'اليابان لديها أكثر من 6,800 جزيرة',
      'طوكيو هي أكبر منطقة حضرية في العالم',
      'اليابان لديها أقدم ملكية في العالم'
    ],
    famous_landmarks_en: ['Mount Fuji', 'Tokyo Tower', 'Fushimi Inari Shrine'],
    famous_landmarks_ar: ['جبل فوجي', 'برج طوكيو', 'ضريح فوشيمي إيناري'],
    famous_animals_en: ['Japanese Macaque', 'Red-crowned Crane', 'Shiba Inu'],
    famous_animals_ar: ['قرد المكاك الياباني', 'الكركي ذو التاج الأحمر', 'شيبا إينو'],
    famous_foods_en: ['Sushi', 'Ramen', 'Tempura'],
    famous_foods_ar: ['سوشي', 'رامن', 'تمبورا']
  },
  {
    code: 'MX',
    name_en: 'Mexico',
    name_ar: 'المكسيك',
    capital_en: 'Mexico City',
    capital_ar: 'مكسيكو سيتي',
    continent: 'North America',
    population: BigInt(130000000),
    area: BigInt(1964375),
    flag_emoji: '🇲🇽',
    latitude: 23.6345,
    longitude: -102.5528,
    description_en: 'Mexico is known for its rich history, vibrant culture, delicious cuisine, and beautiful beaches.',
    description_ar: 'تشتهر المكسيك بتاريخها الغني وثقافتها النابضة بالحياة ومطبخها اللذيذ وشواطئها الجميلة.',
    fun_facts_en: [
      'Mexico City is built on a lake',
      'Chocolate originated in Mexico',
      'Mexico has 35 UNESCO World Heritage Sites'
    ],
    fun_facts_ar: [
      'مدينة مكسيكو مبنية على بحيرة',
      'الشوكولاتة نشأت في المكسيك',
      'المكسيك لديها 35 موقع تراث عالمي لليونسكو'
    ],
    famous_landmarks_en: ['Chichen Itza', 'Teotihuacan', 'Copper Canyon'],
    famous_landmarks_ar: ['تشيتشن إيتزا', 'تيوتيهواكان', 'وادي النحاس'],
    famous_animals_en: ['Axolotl', 'Mexican Wolf', 'Monarch Butterfly'],
    famous_animals_ar: ['الأكسولوتل', 'الذئب المكسيكي', 'فراشة الملك'],
    famous_foods_en: ['Tacos', 'Guacamole', 'Mole'],
    famous_foods_ar: ['تاكو', 'غواكامولي', 'مولي']
  },
  {
    code: 'RU',
    name_en: 'Russia',
    name_ar: 'روسيا',
    capital_en: 'Moscow',
    capital_ar: 'موسكو',
    continent: 'Europe/Asia',
    population: BigInt(145000000),
    area: BigInt(17098246),
    flag_emoji: '🇷🇺',
    latitude: 61.5240,
    longitude: 105.3188,
    description_en: 'Russia is the world\'s largest country, spanning 11 time zones and two continents.',
    description_ar: 'روسيا هي أكبر دولة في العالم، وتمتد عبر 11 منطقة زمنية وقارتين.',
    fun_facts_en: [
      'Russia has 11 time zones',
      'Lake Baikal is the deepest lake in the world',
      'The Trans-Siberian Railway is the longest railway in the world'
    ],
    fun_facts_ar: [
      'روسيا لديها 11 منطقة زمنية',
      'بحيرة بايكال هي أعمق بحيرة في العالم',
      'خط سكة حديد عبر سيبيريا هو أطول خط سكة حديد في العالم'
    ],
    famous_landmarks_en: ['Red Square', 'Kremlin', 'St. Basil\'s Cathedral'],
    famous_landmarks_ar: ['الساحة الحمراء', 'الكرملين', 'كاتدرائية سانت باسيل'],
    famous_animals_en: ['Brown Bear', 'Siberian Tiger', 'Reindeer'],
    famous_animals_ar: ['الدب البني', 'النمر السيبيري', 'الرنة'],
    famous_foods_en: ['Borscht', 'Pelmeni', 'Blini'],
    famous_foods_ar: ['بورشت', 'بيلميني', 'بليني']
  },
  {
    code: 'SA',
    name_en: 'Saudi Arabia',
    name_ar: 'المملكة العربية السعودية',
    capital_en: 'Riyadh',
    capital_ar: 'الرياض',
    continent: 'Asia',
    population: BigInt(35000000),
    area: BigInt(2149690),
    flag_emoji: '🇸🇦',
    latitude: 23.8859,
    longitude: 45.0792,
    description_en: 'Saudi Arabia is home to Islam\'s two holiest cities, Mecca and Medina, and vast deserts.',
    description_ar: 'المملكة العربية السعودية هي موطن لأقدس مدينتين في الإسلام، مكة والمدينة، والصحاري الشاسعة.',
    fun_facts_en: [
      'Saudi Arabia has no permanent rivers',
      'It is the world\'s largest oil producer',
      'The Rub\' al Khali is the world\'s largest sand desert'
    ],
    fun_facts_ar: [
      'المملكة العربية السعودية ليس لديها أنهار دائمة',
      'هي أكبر منتج للنفط في العالم',
      'الربع الخالي هو أكبر صحراء رملية في العالم'
    ],
    famous_landmarks_en: ['Masjid al-Haram', 'Al-Masjid an-Nabawi', 'Mada\'in Saleh'],
    famous_landmarks_ar: ['المسجد الحرام', 'المسجد النبوي', 'مدائن صالح'],
    famous_animals_en: ['Arabian Camel', 'Arabian Oryx', 'Falcon'],
    famous_animals_ar: ['الجمل العربي', 'المها العربي', 'الصقر'],
    famous_foods_en: ['Kabsa', 'Shawarma', 'Kunafa'],
    famous_foods_ar: ['كبسة', 'شاورما', 'كنافة']
  },
  {
    code: 'ZA',
    name_en: 'South Africa',
    name_ar: 'جنوب أفريقيا',
    capital_en: 'Pretoria',
    capital_ar: 'بريتوريا',
    continent: 'Africa',
    population: BigInt(60000000),
    area: BigInt(1221037),
    flag_emoji: '🇿🇦',
    latitude: -30.5595,
    longitude: 22.9375,
    description_en: 'South Africa is known as the "Rainbow Nation" for its diverse cultures and 11 official languages.',
    description_ar: 'تُعرف جنوب أفريقيا باسم "أمة قوس قزح" لثقافاتها المتنوعة و 11 لغة رسمية.',
    fun_facts_en: [
      'South Africa has three capital cities',
      'It has 11 official languages',
      'Table Mountain is one of the oldest mountains in the world'
    ],
    fun_facts_ar: [
      'جنوب أفريقيا لديها ثلاث مدن عاصمة',
      'لديها 11 لغة رسمية',
      'جبل الطاولة هو واحد من أقدم الجبال في العالم'
    ],
    famous_landmarks_en: ['Table Mountain', 'Kruger National Park', 'Robben Island'],
    famous_landmarks_ar: ['جبل الطاولة', 'منتزه كروجر الوطني', 'جزيرة روبن'],
    famous_animals_en: ['Lion', 'Elephant', 'Rhino'],
    famous_animals_ar: ['الأسد', 'الفيل', 'وحيد القرن'],
    famous_foods_en: ['Biltong', 'Bobotie', 'Bunny Chow'],
    famous_foods_ar: ['بيلتونج', 'بوبوتي', 'باني تشاو']
  },
  {
    code: 'ES',
    name_en: 'Spain',
    name_ar: 'إسبانيا',
    capital_en: 'Madrid',
    capital_ar: 'مدريد',
    continent: 'Europe',
    population: BigInt(47000000),
    area: BigInt(505990),
    flag_emoji: '🇪🇸',
    latitude: 40.4637,
    longitude: -3.7492,
    description_en: 'Spain is known for its art, architecture, flamenco dancing, and passionate culture.',
    description_ar: 'تشتهر إسبانيا بفنها وعمارتها ورقص الفلامنكو وثقافتها العاطفية.',
    fun_facts_en: [
      'Spain has 44 UNESCO World Heritage Sites',
      'Spanish is spoken by 500 million people worldwide',
      'The siesta is a traditional afternoon nap'
    ],
    fun_facts_ar: [
      'إسبانيا لديها 44 موقع تراث عالمي لليونسكو',
      'يتحدث الإسبانية 500 مليون شخص في جميع أنحاء العالم',
      'السيستا هي قيلولة بعد الظهر التقليدية'
    ],
    famous_landmarks_en: ['Sagrada Familia', 'Alhambra', 'Park Güell'],
    famous_landmarks_ar: ['ساجرادا فاميليا', 'قصر الحمراء', 'بارك جويل'],
    famous_animals_en: ['Iberian Lynx', 'Spanish Bull', 'Flamingo'],
    famous_animals_ar: ['الوشق الإيبيري', 'الثور الإسباني', 'الفلامنجو'],
    famous_foods_en: ['Paella', 'Tapas', 'Churros'],
    famous_foods_ar: ['باييا', 'تاباس', 'تشوروس']
  },
  {
    code: 'GB',
    name_en: 'United Kingdom',
    name_ar: 'المملكة المتحدة',
    capital_en: 'London',
    capital_ar: 'لندن',
    continent: 'Europe',
    population: BigInt(67000000),
    area: BigInt(242495),
    flag_emoji: '🇬🇧',
    latitude: 55.3781,
    longitude: -3.4360,
    description_en: 'The UK is made up of England, Scotland, Wales, and Northern Ireland, each with distinct cultures.',
    description_ar: 'المملكة المتحدة تتكون من إنجلترا واسكتلندا وويلز وأيرلندا الشمالية، ولكل منها ثقافات متميزة.',
    fun_facts_en: [
      'The UK has no written constitution',
      'London has been called "Londinium" by Romans',
      'The Queen owns all the swans in England'
    ],
    fun_facts_ar: [
      'المملكة المتحدة ليس لديها دستور مكتوب',
      'سميت لندن "لونديميوم" من قبل الرومان',
      'الملكة تملك جميع البجع في إنجلترا'
    ],
    famous_landmarks_en: ['Big Ben', 'Buckingham Palace', 'Stonehenge'],
    famous_landmarks_ar: ['بيغ بن', 'قصر باكنغهام', 'ستونهنج'],
    famous_animals_en: ['Red Fox', 'Hedgehog', 'Robin'],
    famous_animals_ar: ['الثعلب الأحمر', 'القنفذ', 'أبو الحناء'],
    famous_foods_en: ['Fish and Chips', 'Tea', 'Shepherd\'s Pie'],
    famous_foods_ar: ['السمك والبطاطا', 'الشاي', 'فطيرة الراعي']
  },
  {
    code: 'US',
    name_en: 'United States',
    name_ar: 'الولايات المتحدة',
    capital_en: 'Washington, D.C.',
    capital_ar: 'واشنطن العاصمة',
    continent: 'North America',
    population: BigInt(335000000),
    area: BigInt(9833520),
    flag_emoji: '🇺🇸',
    latitude: 37.0902,
    longitude: -95.7129,
    description_en: 'The United States is a diverse country known for its innovation, entertainment industry, and natural wonders.',
    description_ar: 'الولايات المتحدة بلد متنوع معروف بابتكاره وصناعة الترفيه والعجائب الطبيعية.',
    fun_facts_en: [
      'The US has no official language',
      'It has 50 states and 6 time zones',
      'The Statue of Liberty was a gift from France'
    ],
    fun_facts_ar: [
      'الولايات المتحدة ليس لديها لغة رسمية',
      'لديها 50 ولاية و 6 مناطق زمنية',
      'تمثال الحرية كان هدية من فرنسا'
    ],
    famous_landmarks_en: ['Statue of Liberty', 'Grand Canyon', 'Golden Gate Bridge'],
    famous_landmarks_ar: ['تمثال الحرية', 'الوادي الكبير', 'جسر البوابة الذهبية'],
    famous_animals_en: ['Bald Eagle', 'Bison', 'Grizzly Bear'],
    famous_animals_ar: ['النسر الأصلع', 'الجاموس الأمريكي', 'دب الأشيب'],
    famous_foods_en: ['Hamburger', 'Hot Dog', 'Apple Pie'],
    famous_foods_ar: ['همبرجر', 'هوت دوج', 'فطيرة التفاح']
  },
  {
    code: 'AE',
    name_en: 'United Arab Emirates',
    name_ar: 'الإمارات العربية المتحدة',
    capital_en: 'Abu Dhabi',
    capital_ar: 'أبو ظبي',
    continent: 'Asia',
    population: BigInt(10000000),
    area: BigInt(83600),
    flag_emoji: '🇦🇪',
    latitude: 23.4241,
    longitude: 53.8478,
    description_en: 'The UAE is known for its modern cities, luxury shopping, and ultramodern architecture.',
    description_ar: 'تشتهر الإمارات العربية المتحدة بمدنها الحديثة والتسوق الفاخر والهندسة المعمارية الحديثة.',
    fun_facts_en: [
      'The Burj Khalifa is the tallest building in the world',
      'Dubai has the world\'s largest shopping mall',
      'There are no rivers in the UAE'
    ],
    fun_facts_ar: [
      'برج خليفة هو أطول مبنى في العالم',
      'دبي لديها أكبر مركز تسوق في العالم',
      'لا توجد أنهار في الإمارات العربية المتحدة'
    ],
    famous_landmarks_en: ['Burj Khalifa', 'Sheikh Zayed Mosque', 'Palm Jumeirah'],
    famous_landmarks_ar: ['برج خليفة', 'مسجد الشيخ زايد', 'نخلة جميرا'],
    famous_animals_en: ['Arabian Oryx', 'Falcon', 'Sand Gazelle'],
    famous_animals_ar: ['المها العربي', 'الصقر', 'غزال الرمال'],
    famous_foods_en: ['Shawarma', 'Hummus', 'Falafel'],
    famous_foods_ar: ['شاورما', 'حمص', 'فلافل']
  },
  {
    code: 'AR',
    name_en: 'Argentina',
    name_ar: 'الأرجنتين',
    capital_en: 'Buenos Aires',
    capital_ar: 'بوينس آيرس',
    continent: 'South America',
    population: BigInt(46000000),
    area: BigInt(2780400),
    flag_emoji: '🇦🇷',
    latitude: -38.4161,
    longitude: -63.6167,
    description_en: 'Argentina is known for tango, gauchos, football, and stunning natural landscapes from Andes to Patagonia.',
    description_ar: 'تشتهر الأرجنتين بالتانغو والغاوتشو وكرة القدم والمناظر الطبيعية الخلابة من جبال الأنديز إلى باتاغونيا.',
    fun_facts_en: [
      'Argentina is the birthplace of tango',
      'It has the highest mountain in the Americas',
      'Argentines consume more beef per capita than any other country'
    ],
    fun_facts_ar: [
      'الأرجنتين هي مسقط رأس التانغو',
      'لديها أعلى جبل في الأمريكتين',
      'يستهلك الأرجنتينيون لحم البقر أكثر من أي دولة أخرى للفرد'
    ],
    famous_landmarks_en: ['Iguazu Falls', 'Perito Moreno Glacier', 'Teatro Colón'],
    famous_landmarks_ar: ['شلالات إجوازو', 'نهر بيريتو مورينو الجليدي', 'مسرح كولون'],
    famous_animals_en: ['Guanaco', 'Puma', 'Andean Condor'],
    famous_animals_ar: ['الغواناكو', 'البوما', 'كوندور الأنديز'],
    famous_foods_en: ['Asado', 'Empanadas', 'Dulce de Leche'],
    famous_foods_ar: ['أسادو', 'إمبانادا', 'دولسي دي ليتشي']
  }
];

const quizzes = [
  {
    country_code: 'DZ',
    questions: [
      {
        question_en: 'What is the capital city of Algeria?',
        question_ar: 'ما هي عاصمة الجزائر؟',
        options_en: ['Algiers', 'Cairo', 'Tunis', 'Rabat'],
        options_ar: ['الجزائر', 'القاهرة', 'تونس', 'الرباط'],
        correct_answer: 'Algiers',
        difficulty: 'EASY',
        points: 10
      },
      {
        question_en: 'Which desert covers most of Algeria?',
        question_ar: 'أي صحراء تغطي معظم الجزائر؟',
        options_en: ['Sahara Desert', 'Gobi Desert', 'Arabian Desert', 'Kalahari Desert'],
        options_ar: ['الصحراء الكبرى', 'صحراء جوبي', 'الصحراء العربية', 'صحراء كالاهاري'],
        correct_answer: 'Sahara Desert',
        difficulty: 'EASY',
        points: 10
      },
      {
        question_en: 'What sea is north of Algeria?',
        question_ar: 'أي بحر يقع شمال الجزائر؟',
        options_en: ['Mediterranean Sea', 'Red Sea', 'Black Sea', 'Dead Sea'],
        options_ar: ['البحر الأبيض المتوسط', 'البحر الأحمر', 'البحر الأسود', 'البحر الميت'],
        correct_answer: 'Mediterranean Sea',
        difficulty: 'MEDIUM',
        points: 15
      }
    ]
  },
  {
    country_code: 'AU',
    questions: [
      {
        question_en: 'What is the capital city of Australia?',
        question_ar: 'ما هي عاصمة أستراليا؟',
        options_en: ['Canberra', 'Sydney', 'Melbourne', 'Brisbane'],
        options_ar: ['كانبرا', 'سيدني', 'ملبورن', 'بريسبان'],
        correct_answer: 'Canberra',
        difficulty: 'MEDIUM',
        points: 15
      },
      {
        question_en: 'Which famous landmark is in Sydney?',
        question_ar: 'أي معلم شهير يقع في سيدني؟',
        options_en: ['Opera House', 'Eiffel Tower', 'Big Ben', 'Statue of Liberty'],
        options_ar: ['دار الأوبرا', 'برج إيفل', 'بيغ بن', 'تمثال الحرية'],
        correct_answer: 'Opera House',
        difficulty: 'EASY',
        points: 10
      }
    ]
  },
  {
    country_code: 'US',
    questions: [
      {
        question_en: 'What is the capital of the United States?',
        question_ar: 'ما هي عاصمة الولايات المتحدة؟',
        options_en: ['Washington, D.C.', 'New York', 'Los Angeles', 'Chicago'],
        options_ar: ['واشنطن العاصمة', 'نيويورك', 'لوس أنجلوس', 'شيكاغو'],
        correct_answer: 'Washington, D.C.',
        difficulty: 'EASY',
        points: 10
      },
      {
        question_en: 'How many states are in the USA?',
        question_ar: 'كم عدد الولايات في الولايات المتحدة الأمريكية؟',
        options_en: ['50', '48', '52', '49'],
        options_ar: ['50', '48', '52', '49'],
        correct_answer: '50',
        difficulty: 'EASY',
        points: 10
      }
    ]
  },
  {
    country_code: 'GB',
    questions: [
      {
        question_en: 'What is the capital of the United Kingdom?',
        question_ar: 'ما هي عاصمة المملكة المتحدة؟',
        options_en: ['London', 'Manchester', 'Edinburgh', 'Birmingham'],
        options_ar: ['لندن', 'مانشستر', 'إدنبرة', 'برمنغهام'],
        correct_answer: 'London',
        difficulty: 'EASY',
        points: 10
      },
      {
        question_en: 'What is the famous clock tower in London called?',
        question_ar: 'ماذا يسمى برج الساعة الشهير في لندن؟',
        options_en: ['Big Ben', 'Clock Tower', 'Time Tower', 'London Tower'],
        options_ar: ['بيغ بن', 'برج الساعة', 'برج الزمن', 'برج لندن'],
        correct_answer: 'Big Ben',
        difficulty: 'EASY',
        points: 10
      }
    ]
  },
  {
    country_code: 'JP',
    questions: [
      {
        question_en: 'What is the capital of Japan?',
        question_ar: 'ما هي عاصمة اليابان؟',
        options_en: ['Tokyo', 'Kyoto', 'Osaka', 'Hiroshima'],
        options_ar: ['طوكيو', 'كيوتو', 'أوساكا', 'هيروشيما'],
        correct_answer: 'Tokyo',
        difficulty: 'EASY',
        points: 10
      },
      {
        question_en: 'What is the highest mountain in Japan?',
        question_ar: 'ما هو أعلى جبل في اليابان؟',
        options_en: ['Mount Fuji', 'Mount Everest', 'Mount Kilimanjaro', 'Mount McKinley'],
        options_ar: ['جبل فوجي', 'جبل إيفرست', 'جبل كليمنجارو', 'جبل ماكينلي'],
        correct_answer: 'Mount Fuji',
        difficulty: 'EASY',
        points: 10
      }
    ]
  }
];

async function seed() {
  console.log('🌍 Starting comprehensive database seed...\n');

  try {
    console.log('📍 Seeding countries...');
    for (const country of countries) {
      await prisma.country.upsert({
        where: { code: country.code },
        update: country,
        create: country,
      });
      console.log(`  ✓ ${country.name_en} (${country.name_ar})`);
    }
    console.log(`✅ Seeded ${countries.length} countries\n`);

    console.log('❓ Seeding quizzes...');
    let totalQuizzes = 0;
    for (const countryQuiz of quizzes) {
      const country = await prisma.country.findUnique({
        where: { code: countryQuiz.country_code },
      });

      if (!country) {
        console.log(`  ✗ Country ${countryQuiz.country_code} not found`);
        continue;
      }

      for (const quiz of countryQuiz.questions) {
        const quizId = `${country.id}-${quiz.question_en.substring(0, 30)}`;
        await prisma.quiz.upsert({
          where: { id: quizId },
          update: {
            question_en: quiz.question_en,
            question_ar: quiz.question_ar,
            correct_answer: quiz.correct_answer,
            options_en: quiz.options_en,
            options_ar: quiz.options_ar,
            difficulty: quiz.difficulty as 'EASY' | 'MEDIUM' | 'HARD',
            points: quiz.points,
          },
          create: {
            id: quizId,
            country_id: country.id,
            question_en: quiz.question_en,
            question_ar: quiz.question_ar,
            correct_answer: quiz.correct_answer,
            options_en: quiz.options_en,
            options_ar: quiz.options_ar,
            difficulty: quiz.difficulty as 'EASY' | 'MEDIUM' | 'HARD',
            points: quiz.points,
          },
        });
        totalQuizzes++;
      }
      console.log(`  ✓ ${countryQuiz.country_code} (${countryQuiz.questions.length} quizzes)`);
    }
    console.log(`✅ Seeded ${totalQuizzes} quizzes\n`);

    console.log('✨ Seed completed successfully!');
    console.log(`\n📊 Summary:`);
    console.log(`   - ${countries.length} countries with full multilingual data`);
    console.log(`   - ${totalQuizzes} bilingual quiz questions`);
    console.log(`   - Ready for production use\n`);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    throw error;
  }
}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
