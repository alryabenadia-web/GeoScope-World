import { PrismaClient, Country } from '@prisma/client';

const prisma = new PrismaClient();

interface QuizQuestion {
  question_en: string;
  question_ar: string;
  correct_answer_en: string;  // English correct answer
  correct_answer_ar: string;  // Arabic correct answer
  options_en: string[];
  options_ar: string[];
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  points: number;
}

/**
 * Dynamic Quiz Generator Service
 *
 * Generates quiz questions dynamically from country data.
 * Child-safe, educational, and randomized for each session.
 *
 * RULES:
 * - Simple, child-friendly language
 * - No political content
 * - Educational focus
 * - Questions derived from visible country data only
 */
export class QuizGeneratorService {

  /**
   * Generate dynamic quizzes for a country
   * @param countryCode - ISO country code (e.g., "US", "DZ")
   * @param questionCount - Number of questions to generate (default: 5)
   * @returns Array of quiz questions
   */
  async generateQuizzesForCountry(countryCode: string, questionCount: number = 5): Promise<QuizQuestion[]> {
    // Fetch the country data
    const country = await prisma.country.findUnique({
      where: { code: countryCode },
    });

    if (!country) {
      throw new Error('Country not found');
    }

    // Fetch all countries for generating wrong answers
    const allCountries = await prisma.country.findMany();

    // Generate questions
    const questions: QuizQuestion[] = [];
    const questionTypes = this.getAvailableQuestionTypes(country);

    // Shuffle question types for variety
    const shuffledTypes = this.shuffleArray([...questionTypes]);

    // Generate the requested number of questions
    for (let i = 0; i < Math.min(questionCount, shuffledTypes.length); i++) {
      const questionType = shuffledTypes[i];
      const question = this.generateQuestion(country, allCountries, questionType);

      if (question) {
        questions.push(question);
      }
    }

    // If we don't have enough questions, add more from random types
    while (questions.length < questionCount && shuffledTypes.length > 0) {
      const randomType = shuffledTypes[Math.floor(Math.random() * shuffledTypes.length)];
      const question = this.generateQuestion(country, allCountries, randomType);

      if (question) {
        questions.push(question);
      }
    }

    return questions;
  }

  /**
   * Determine which question types are available for this country
   */
  private getAvailableQuestionTypes(country: Country): string[] {
    const types: string[] = [];

    // Always available
    types.push('capital');
    types.push('continent');

    // Conditional based on data availability
    if (country.famous_landmarks_en && country.famous_landmarks_en.length > 0) {
      types.push('landmark');
    }

    if (country.famous_animals_en && country.famous_animals_en.length > 0) {
      types.push('animal');
    }

    if (country.famous_foods_en && country.famous_foods_en.length > 0) {
      types.push('food');
    }

    if (country.fun_facts_en && country.fun_facts_en.length > 0) {
      types.push('fun_fact');
    }

    return types;
  }

  /**
   * Generate a single question based on type
   */
  private generateQuestion(
    country: Country,
    allCountries: Country[],
    questionType: string
  ): QuizQuestion | null {
    switch (questionType) {
      case 'capital':
        return this.generateCapitalQuestion(country, allCountries);
      case 'continent':
        return this.generateContinentQuestion(country, allCountries);
      case 'landmark':
        return this.generateLandmarkQuestion(country);
      case 'animal':
        return this.generateAnimalQuestion(country);
      case 'food':
        return this.generateFoodQuestion(country);
      case 'fun_fact':
        return this.generateFunFactQuestion(country);
      default:
        return null;
    }
  }

  /**
   * Generate a capital city question
   */
  private generateCapitalQuestion(country: Country, allCountries: Country[]): QuizQuestion {
    const correctAnswer = country.capital_en;

    // Get wrong answers from other countries' capitals
    const wrongAnswers = allCountries
      .filter(c => c.id !== country.id && c.capital_en !== correctAnswer)
      .map(c => c.capital_en)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const options_en = this.shuffleArray([correctAnswer, ...wrongAnswers]);

    // Arabic options
    const correctAnswer_ar = country.capital_ar;
    const wrongAnswers_ar = allCountries
      .filter(c => c.id !== country.id && c.capital_ar !== correctAnswer_ar)
      .map(c => c.capital_ar)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const options_ar = this.shuffleArray([correctAnswer_ar, ...wrongAnswers_ar]);

    return {
      question_en: `What is the capital of ${country.name_en}?`,
      question_ar: `ما هي عاصمة ${country.name_ar}؟`,
      correct_answer_en: correctAnswer,
      correct_answer_ar: correctAnswer_ar,
      options_en,
      options_ar,
      difficulty: 'EASY',
      points: 10,
    };
  }

  /**
   * Generate a continent question
   */
  private generateContinentQuestion(country: Country, allCountries: Country[]): QuizQuestion {
    const correctAnswer = country.continent;

    // Get unique continents
    const continents = Array.from(new Set(allCountries.map(c => c.continent)));
    const wrongContinents = continents.filter(c => c !== correctAnswer);

    // Shuffle and take 3 wrong answers
    const wrongAnswers = this.shuffleArray(wrongContinents).slice(0, 3);
    const options_en = this.shuffleArray([correctAnswer, ...wrongAnswers]);

    // Arabic continent names (simple translations)
    const continentTranslations: Record<string, string> = {
      'Africa': 'أفريقيا',
      'Asia': 'آسيا',
      'Europe': 'أوروبا',
      'North America': 'أمريكا الشمالية',
      'South America': 'أمريكا الجنوبية',
      'Oceania': 'أوقيانوسيا',
      'Antarctica': 'القارة القطبية الجنوبية',
    };

    const correctAnswer_ar = continentTranslations[correctAnswer] || correctAnswer;
    const wrongAnswers_ar = wrongAnswers.map(c => continentTranslations[c] || c);
    const options_ar = this.shuffleArray([correctAnswer_ar, ...wrongAnswers_ar]);

    return {
      question_en: `Which continent is ${country.name_en} located in?`,
      question_ar: `في أي قارة تقع ${country.name_ar}؟`,
      correct_answer_en: correctAnswer,
      correct_answer_ar: correctAnswer_ar,
      options_en,
      options_ar,
      difficulty: 'EASY',
      points: 10,
    };
  }

  /**
   * Generate a landmark question
   */
  private generateLandmarkQuestion(country: Country): QuizQuestion | null {
    if (!country.famous_landmarks_en || country.famous_landmarks_en.length === 0) {
      return null;
    }

    // Pick a random landmark
    const landmarkIndex = Math.floor(Math.random() * country.famous_landmarks_en.length);
    const correctAnswer = country.famous_landmarks_en[landmarkIndex];
    const correctAnswer_ar = country.famous_landmarks_ar?.[landmarkIndex] || correctAnswer;

    // Generate plausible wrong answers (language-specific)
    const wrongAnswers = this.generateWrongLandmarkAnswers(correctAnswer);
    const options_en = this.shuffleArray([correctAnswer, ...wrongAnswers]);

    const wrongAnswers_ar = this.generateWrongLandmarkAnswers_ar(correctAnswer_ar);
    const options_ar = this.shuffleArray([correctAnswer_ar, ...wrongAnswers_ar]);

    return {
      question_en: `Which famous landmark can you find in ${country.name_en}?`,
      question_ar: `أي معلم شهير يمكنك أن تجده في ${country.name_ar}؟`,
      correct_answer_en: correctAnswer,
      correct_answer_ar: correctAnswer_ar,
      options_en,
      options_ar,
      difficulty: 'MEDIUM',
      points: 15,
    };
  }

  /**
   * Generate an animal question
   */
  private generateAnimalQuestion(country: Country): QuizQuestion | null {
    if (!country.famous_animals_en || country.famous_animals_en.length === 0) {
      return null;
    }

    // Pick a random animal
    const animalIndex = Math.floor(Math.random() * country.famous_animals_en.length);
    const correctAnswer = country.famous_animals_en[animalIndex];
    const correctAnswer_ar = country.famous_animals_ar?.[animalIndex] || correctAnswer;

    // Generate wrong answers (language-specific animals)
    const wrongAnswers = this.generateWrongAnimalAnswers(correctAnswer);
    const options_en = this.shuffleArray([correctAnswer, ...wrongAnswers]);

    const wrongAnswers_ar = this.generateWrongAnimalAnswers_ar(correctAnswer_ar);
    const options_ar = this.shuffleArray([correctAnswer_ar, ...wrongAnswers_ar]);

    return {
      question_en: `Which animal is famous in ${country.name_en}?`,
      question_ar: `أي حيوان مشهور في ${country.name_ar}؟`,
      correct_answer_en: correctAnswer,
      correct_answer_ar: correctAnswer_ar,
      options_en,
      options_ar,
      difficulty: 'MEDIUM',
      points: 15,
    };
  }

  /**
   * Generate a food question
   */
  private generateFoodQuestion(country: Country): QuizQuestion | null {
    if (!country.famous_foods_en || country.famous_foods_en.length === 0) {
      return null;
    }

    // Pick a random food
    const foodIndex = Math.floor(Math.random() * country.famous_foods_en.length);
    const correctAnswer = country.famous_foods_en[foodIndex];
    const correctAnswer_ar = country.famous_foods_ar?.[foodIndex] || correctAnswer;

    // Generate wrong answers (language-specific foods)
    const wrongAnswers = this.generateWrongFoodAnswers(correctAnswer);
    const options_en = this.shuffleArray([correctAnswer, ...wrongAnswers]);

    const wrongAnswers_ar = this.generateWrongFoodAnswers_ar(correctAnswer_ar);
    const options_ar = this.shuffleArray([correctAnswer_ar, ...wrongAnswers_ar]);

    return {
      question_en: `Which food is popular in ${country.name_en}?`,
      question_ar: `أي طعام شهير في ${country.name_ar}؟`,
      correct_answer_en: correctAnswer,
      correct_answer_ar: correctAnswer_ar,
      options_en,
      options_ar,
      difficulty: 'MEDIUM',
      points: 15,
    };
  }

  /**
   * Generate a fun fact question
   */
  private generateFunFactQuestion(country: Country): QuizQuestion | null {
    if (!country.fun_facts_en || country.fun_facts_en.length === 0) {
      return null;
    }

    // Pick a random fun fact
    const factIndex = Math.floor(Math.random() * country.fun_facts_en.length);
    const fact = country.fun_facts_en[factIndex];
    const fact_ar = country.fun_facts_ar?.[factIndex] || fact;

    // True/False question format
    const isTrue = Math.random() > 0.3; // 70% chance of true fact

    const question_en = isTrue
      ? `True or false: ${fact}`
      : `True or false: ${this.modifyFactToFalse(fact)}`;

    const question_ar = isTrue
      ? `صح أم خطأ: ${fact_ar}`
      : `صح أم خطأ: ${this.modifyFactToFalse(fact_ar)}`;

    const correctAnswer = isTrue ? 'True' : 'False';
    const correctAnswer_ar = isTrue ? 'صح' : 'خطأ';

    return {
      question_en,
      question_ar,
      correct_answer_en: correctAnswer,
      correct_answer_ar: correctAnswer_ar,
      options_en: ['True', 'False', 'Not sure', 'Maybe'],
      options_ar: ['صح', 'خطأ', 'غير متأكد', 'ربما'],
      difficulty: 'HARD',
      points: 20,
    };
  }

  /**
   * Shuffle array helper
   */
  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  /**
   * Generate wrong landmark answers (English)
   */
  private generateWrongLandmarkAnswers(correctAnswer: string): string[] {
    const commonLandmarks = [
      'Eiffel Tower', 'Statue of Liberty', 'Big Ben', 'Taj Mahal',
      'Great Wall', 'Colosseum', 'Sydney Opera House', 'Machu Picchu',
      'Christ the Redeemer', 'Burj Khalifa', 'Golden Gate Bridge', 'Pyramids of Giza'
    ];

    return commonLandmarks
      .filter(l => l !== correctAnswer)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
  }

  /**
   * Generate wrong landmark answers (Arabic)
   */
  private generateWrongLandmarkAnswers_ar(correctAnswer: string): string[] {
    const commonLandmarks_ar = [
      'برج إيفل', 'تمثال الحرية', 'بيج بن', 'تاج محل',
      'سور الصين العظيم', 'الكولوسيوم', 'دار الأوبرا في سيدني', 'ماتشو بيتشو',
      'تمثال المسيح الفادي', 'برج خليفة', 'جسر البوابة الذهبية', 'أهرامات الجيزة'
    ];

    return commonLandmarks_ar
      .filter(l => l !== correctAnswer)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
  }

  /**
   * Generate wrong animal answers (English)
   */
  private generateWrongAnimalAnswers(correctAnswer: string): string[] {
    const commonAnimals = [
      'Lion', 'Elephant', 'Kangaroo', 'Panda', 'Koala', 'Tiger',
      'Penguin', 'Polar Bear', 'Giraffe', 'Zebra', 'Eagle', 'Dolphin',
      'Camel', 'Llama', 'Monkey', 'Wolf', 'Fox', 'Bear'
    ];

    return commonAnimals
      .filter(a => a !== correctAnswer)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
  }

  /**
   * Generate wrong animal answers (Arabic)
   */
  private generateWrongAnimalAnswers_ar(correctAnswer: string): string[] {
    const commonAnimals_ar = [
      'أسد', 'فيل', 'كنغر', 'باندا', 'كوالا', 'نمر',
      'بطريق', 'دب قطبي', 'زرافة', 'حمار وحشي', 'نسر', 'دلفين',
      'جمل', 'لاما', 'قرد', 'ذئب', 'ثعلب', 'دب'
    ];

    return commonAnimals_ar
      .filter(a => a !== correctAnswer)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
  }

  /**
   * Generate wrong food answers (English)
   */
  private generateWrongFoodAnswers(correctAnswer: string): string[] {
    const commonFoods = [
      'Pizza', 'Sushi', 'Tacos', 'Pasta', 'Curry', 'Hamburger',
      'Paella', 'Pho', 'Dim Sum', 'Kebab', 'Falafel', 'Croissant',
      'Pad Thai', 'Biryani', 'Ramen', 'Kimchi', 'Baklava', 'Couscous'
    ];

    return commonFoods
      .filter(f => f !== correctAnswer)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
  }

  /**
   * Generate wrong food answers (Arabic)
   */
  private generateWrongFoodAnswers_ar(correctAnswer: string): string[] {
    const commonFoods_ar = [
      'بيتزا', 'سوشي', 'تاكو', 'معكرونة', 'كاري', 'همبرغر',
      'بايلا', 'فو', 'ديم سوم', 'كباب', 'فلافل', 'كرواسون',
      'باد تاي', 'برياني', 'رامن', 'كيمتشي', 'بقلاوة', 'كسكس'
    ];

    return commonFoods_ar
      .filter(f => f !== correctAnswer)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
  }

  /**
   * Modify a fact to make it false (simple approach)
   */
  private modifyFactToFalse(fact: string): string {
    // Simple modification: change numbers, replace words
    const modifications = [
      (f: string) => f.replace(/\d+/g, (match) => String(Number(match) + 10)),
      (f: string) => f.replace(/largest/gi, 'smallest'),
      (f: string) => f.replace(/smallest/gi, 'largest'),
      (f: string) => f.replace(/first/gi, 'last'),
      (f: string) => f.replace(/oldest/gi, 'newest'),
    ];

    const randomMod = modifications[Math.floor(Math.random() * modifications.length)];
    return randomMod(fact);
  }
}

export const quizGeneratorService = new QuizGeneratorService();
