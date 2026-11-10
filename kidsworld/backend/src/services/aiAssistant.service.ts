import OpenAI from 'openai';
import Groq from 'groq-sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * AI Provider Interface
 * All AI providers must implement this interface
 */
interface AIProvider {
  name: string;
  ask(prompt: string, systemPrompt: string, language: 'en' | 'ar'): Promise<string>;
  isAvailable(): boolean;
}

/**
 * Groq Provider (Primary - FREE)
 * Uses Llama models via Groq's fast inference API
 * Free tier: 14,400 requests/day
 */
class GroqProvider implements AIProvider {
  name = 'Groq (Llama 3.1)';
  private client: Groq | null = null;

  constructor() {
    if (process.env.GROQ_API_KEY) {
      this.client = new Groq({
        apiKey: process.env.GROQ_API_KEY,
      });
    }
  }

  isAvailable(): boolean {
    return !!this.client && !!process.env.GROQ_API_KEY;
  }

  async ask(prompt: string, systemPrompt: string, language: 'en' | 'ar'): Promise<string> {
    if (!this.client) {
      throw new Error('Groq client not initialized');
    }

    const completion = await this.client.chat.completions.create({
      model: 'llama-3.1-8b-instant', // Fast, free, good quality
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    return completion.choices[0]?.message?.content || '';
  }
}

/**
 * Google Gemini Provider (Fallback - FREE)
 * Uses Google's Gemini model
 * Free tier: 1,500 requests/day
 */
class GeminiProvider implements AIProvider {
  name = 'Google Gemini';
  private model: any = null;

  constructor() {
    if (process.env.GOOGLE_AI_API_KEY) {
      try {
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
        this.model = genAI.getGenerativeModel({
          model: 'gemini-2.5-flash', // Updated to current free tier model
          generationConfig: {
            maxOutputTokens: 800, // Increased for complete responses
            temperature: 0.7,
          }
        });
      } catch (error) {
        console.error('Failed to initialize Gemini:', error);
        this.model = null;
      }
    }
  }

  isAvailable(): boolean {
    return !!this.model && !!process.env.GOOGLE_AI_API_KEY;
  }

  async ask(prompt: string, systemPrompt: string, language: 'en' | 'ar'): Promise<string> {
    if (!this.model) {
      throw new Error('Gemini model not initialized');
    }

    // Combine system prompt with user message for better compatibility
    const fullPrompt = `${systemPrompt}\n\nUser question: ${prompt}`;

    const result = await this.model.generateContent({
      contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
      generationConfig: {
        maxOutputTokens: 800,
        temperature: 0.7,
      }
    });

    const response = await result.response;
    return response.text();
  }
}

/**
 * OpenAI Provider (Optional - PAID)
 * Original OpenAI implementation, kept as fallback option
 */
class OpenAIProvider implements AIProvider {
  name = 'OpenAI (GPT-4o-mini)';
  private client: OpenAI | null = null;

  constructor() {
    if (process.env.OPENAI_API_KEY) {
      this.client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
    }
  }

  isAvailable(): boolean {
    return !!this.client && !!process.env.OPENAI_API_KEY;
  }

  async ask(prompt: string, systemPrompt: string, language: 'en' | 'ar'): Promise<string> {
    if (!this.client) {
      throw new Error('OpenAI client not initialized');
    }

    const completion = await this.client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    return completion.choices[0]?.message?.content || '';
  }
}

/**
 * Static Provider (Last Resort - ALWAYS AVAILABLE)
 * Uses database country data OR friendly Leo break messages
 */
class StaticProvider implements AIProvider {
  name = 'Static Responses (Fallback)';

  // Leo's friendly break messages (English)
  private readonly LEO_BREAK_MESSAGES_EN = [
    "Leo is a little tired right now 🦁💤. Let's explore countries later!",
    "Leo needs a short break. Try discovering a new country 🌍",
    "Leo has been thinking a lot today! Let's play a fun quiz 🎯",
    "Leo will be back soon. Let's keep learning together!",
    "Leo is taking a quick nap 🦁😴. Visit a country on the map!",
    "Leo needs to rest his paws 🦁. Try exploring the world map!",
    "Leo is dreaming about faraway places 💤. Let's explore countries!",
    "Leo says: Take a quiz while I catch my breath! 🎯"
  ];

  // Leo's friendly break messages (Arabic - فصحى مبسّطة)
  private readonly LEO_BREAK_MESSAGES_AR = [
    "ليو متعب قليلاً الآن 🦁💤. لنكمل استكشاف البلدان لاحقًا!",
    "ليو يحتاج إلى استراحة صغيرة. جرّب أن تزور بلدًا جديدًا 🌍",
    "ليو يفكّر كثيرًا اليوم! هيا نلعب كويزًا ممتعًا 🎯",
    "ليو سيعود بعد قليل. تعال نكمل التعلّم معًا!",
    "ليو يأخذ قيلولة سريعة 🦁😴. زُر دولة على الخريطة!",
    "ليو يحتاج لراحة قدميه 🦁. جرّب استكشاف خريطة العالم!",
    "ليو يحلم بأماكن بعيدة 💤. هيا نستكشف البلدان!",
    "ليو يقول: العب كويز بينما أستريح قليلاً! 🎯"
  ];

  isAvailable(): boolean {
    return true; // Always available
  }

  async ask(question: string, systemPrompt: string, language: 'en' | 'ar'): Promise<string> {
    // Try to find country data from the question
    const countryData = await this.findRelevantCountryData(question);

    // If a specific country is clearly mentioned AND data found → return educational response
    if (countryData) {
      return this.generateCountryResponse(countryData, language);
    }

    // Otherwise → return a random friendly Leo break message
    return this.getRandomLeoBreakMessage(language);
  }

  /**
   * Get a random friendly message from Leo
   */
  private getRandomLeoBreakMessage(language: 'en' | 'ar'): string {
    const messages = language === 'ar' ? this.LEO_BREAK_MESSAGES_AR : this.LEO_BREAK_MESSAGES_EN;
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  }

  /**
   * STRICT country detection - only matches when country is clearly mentioned
   * Uses word boundaries to avoid false matches (e.g., "what" != "Austria")
   */
  private async findRelevantCountryData(question: string): Promise<any | null> {
    try {
      const countries = await prisma.country.findMany({
        select: {
          code: true,
          name_en: true,
          name_ar: true,
          capital_en: true,
          capital_ar: true,
          continent: true,
          famous_landmarks_en: true,
          famous_landmarks_ar: true,
          famous_animals_en: true,
          famous_animals_ar: true,
          famous_foods_en: true,
          famous_foods_ar: true,
          fun_facts_en: true,
          fun_facts_ar: true,
        }
      });

      console.log('[StaticFallback] Question:', question);

      // STRICT MATCHING: Use word boundaries for English, exact match for Arabic
      const mentionedCountry = countries.find(c => {
        // English: Use word boundary regex to match whole words only
        // Prevents "what" from matching "Austria" (AT code)
        const nameEnRegex = new RegExp(`\\b${this.escapeRegex(c.name_en)}\\b`, 'i');
        const capitalEnRegex = new RegExp(`\\b${this.escapeRegex(c.capital_en)}\\b`, 'i');

        const matchesEnglish = nameEnRegex.test(question) || capitalEnRegex.test(question);

        // Arabic: Check for exact substring match (Arabic doesn't use word boundaries like English)
        // Also check common Arabic patterns: "أخبرني عن {country}", "معلومات عن {country}", etc.
        const matchesArabic = question.includes(c.name_ar) || question.includes(c.capital_ar);

        return matchesEnglish || matchesArabic;
      });

      if (mentionedCountry) {
        console.log('[StaticFallback] Detected country:', mentionedCountry.code, '-', mentionedCountry.name_en);
      } else {
        console.log('[StaticFallback] No country detected → returning Leo break message');
      }

      return mentionedCountry || null;

    } catch (error) {
      console.error('[StaticFallback] Error fetching country data:', error);
      return null;
    }
  }

  /**
   * Escape special regex characters
   */
  private escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  private generateCountryResponse(data: any, language: 'en' | 'ar'): string {
    if (language === 'ar') {
      const parts = [
        `${data.name_ar} هي دولة في ${data.continent}.`,
        `عاصمتها ${data.capital_ar}.`,
      ];

      if (data.famous_landmarks_ar?.length > 0) {
        parts.push(`من المعالم الشهيرة: ${data.famous_landmarks_ar.slice(0, 2).join(' و ')}.`);
      }

      if (data.fun_facts_ar?.length > 0) {
        parts.push(data.fun_facts_ar[0]);
      }

      return parts.join(' ');
    }

    // English response
    const parts = [
      `${data.name_en} is a country in ${data.continent}.`,
      `Its capital is ${data.capital_en}.`,
    ];

    if (data.famous_landmarks_en?.length > 0) {
      parts.push(`Famous landmarks include ${data.famous_landmarks_en.slice(0, 2).join(' and ')}.`);
    }

    if (data.fun_facts_en?.length > 0) {
      parts.push(data.fun_facts_en[0]);
    }

    return parts.join(' ');
  }
}

/**
 * Child-Safe AI Assistant Service ("Ask the Map")
 *
 * Provides educational, child-safe responses about countries and geography
 * for children ages 7-13.
 *
 * MULTI-PROVIDER SUPPORT:
 * - Automatically tries multiple AI providers in order
 * - Falls back to static responses if all APIs fail
 * - Zero-cost operation using free tiers
 *
 * SAFETY RULES:
 * - Simple, child-friendly language
 * - No political content or controversies
 * - No AI self-references
 * - Educational focus only
 * - Short, concise answers
 */
export class AIAssistantService {

  private groqProvider: GroqProvider;
  private geminiProvider: GeminiProvider;
  private openaiProvider: OpenAIProvider;
  private staticProvider: StaticProvider;

  constructor() {
    // Initialize all providers
    this.groqProvider = new GroqProvider();
    this.geminiProvider = new GeminiProvider();
    this.openaiProvider = new OpenAIProvider();
    this.staticProvider = new StaticProvider();

    // Log available providers at startup
    const available = [
      this.groqProvider,
      this.geminiProvider,
      this.openaiProvider,
      this.staticProvider
    ].filter(p => p.isAvailable());

    console.log('🤖 AI Providers available:', available.map(p => p.name).join(', '));
  }

  /**
   * Child-safe system prompt for the AI assistant
   */
  private readonly CHILD_SAFE_SYSTEM_PROMPT = `You are a friendly geography teacher helping children learn about countries and the world.

CRITICAL RULES YOU MUST FOLLOW:

1. AUDIENCE: You're speaking to children ages 7-13. Use simple, short sentences.

2. LANGUAGE STYLE:
   - Use everyday words, not complex vocabulary
   - Keep sentences short and clear
   - Be enthusiastic and encouraging
   - Use fun facts and interesting details

3. NEVER MENTION:
   - Politics, wars, conflicts, or controversies
   - Religion in a comparative or political way
   - Economic problems or poverty
   - Anything scary or upsetting
   - That you are an AI, bot, or computer program

4. ALWAYS FOCUS ON:
   - Geography (location, landscapes, climate)
   - Culture (food, music, celebrations, traditions)
   - Animals and nature
   - Famous landmarks and places
   - Fun and interesting facts
   - Languages and greetings

5. ANSWER FORMAT:
   - Keep answers to 2-4 short sentences
   - If the topic is not about geography/countries, politely redirect: "I'm here to help you learn about countries and the world! Ask me about a country, animal, food, or place."
   - Always stay positive and educational

6. EXAMPLES OF GOOD RESPONSES:
   - "Egypt is in Africa and is famous for the pyramids! The pyramids were built thousands of years ago. Egypt also has the Nile River, which is the longest river in the world."
   - "Kangaroos live in Australia! Australia is a big island country with beautiful beaches and interesting animals like koalas and platypuses."
   - "France is known for delicious food like croissants and cheese. The Eiffel Tower in Paris is one of the most famous landmarks in the world!"

Remember: You're a friendly teacher, not a computer. Keep it fun, safe, and educational!`;

  /**
   * Ask the Map - Process a child's question with automatic provider fallback
   */
  async askQuestion(question: string, language: 'en' | 'ar' = 'en'): Promise<string> {
    try {
      // Basic safety checks
      if (!question || question.trim().length === 0) {
        return language === 'ar'
          ? 'ماذا تريد أن تعرف عن العالم؟ اسألني عن أي دولة!'
          : 'What would you like to know about the world? Ask me about any country!';
      }

      if (question.length > 500) {
        return language === 'ar'
          ? 'سؤالك طويل جداً! اجعله أقصر من فضلك.'
          : 'Your question is too long! Please make it shorter.';
      }

      // Check for inappropriate content keywords (basic filter)
      const inappropriateKeywords = [
        'war', 'kill', 'death', 'bomb', 'weapon', 'gun', 'fight',
        'hate', 'racist', 'terror', 'violent', 'attack'
      ];

      const lowerQuestion = question.toLowerCase();
      const hasInappropriate = inappropriateKeywords.some(keyword =>
        lowerQuestion.includes(keyword)
      );

      if (hasInappropriate) {
        return language === 'ar'
          ? 'دعنا نتحدث عن أشياء إيجابية! اسألني عن البلدان أو الحيوانات أو الطعام أو الأماكن الجميلة.'
          : 'Let\'s talk about positive things! Ask me about countries, animals, food, or beautiful places.';
      }

      // Fetch relevant country data if question mentions a country
      const countryContext = await this.findRelevantCountryData(question);

      // Build the user message with context
      let userMessage = question;
      if (countryContext) {
        userMessage = `${question}\n\nContext: ${countryContext}`;
      }

      // Add language instruction if Arabic
      if (language === 'ar') {
        userMessage += '\n\nIMPORTANT: Respond in Arabic (العربية) using simple words suitable for children.';
      }

      // Try providers in order: Groq → Gemini → OpenAI → Static
      const providers = [
        this.groqProvider,
        this.geminiProvider,
        this.openaiProvider,
        this.staticProvider
      ].filter(p => p.isAvailable());

      for (const provider of providers) {
        try {
          const response = await provider.ask(userMessage, this.CHILD_SAFE_SYSTEM_PROMPT, language);
          console.log(`✓ AI response from: ${provider.name}`);
          console.log(`  Raw response: "${response}"`);

          // Final safety check on response
          const safeResponse = this.sanitizeResponse(response, language);
          console.log(`  After sanitization: "${safeResponse}"`);
          return safeResponse;

        } catch (error: any) {
          console.warn(`✗ ${provider.name} failed:`, error.message);
          // Continue to next provider
        }
      }

      // All providers failed (shouldn't happen due to static fallback)
      return language === 'ar'
        ? 'عذراً، حدث خطأ. حاول مرة أخرى لاحقاً!'
        : 'Sorry, something went wrong. Please try again later!';

    } catch (error) {
      console.error('AI Assistant error:', error);

      return language === 'ar'
        ? 'عذراً، حدث خطأ. حاول مرة أخرى لاحقاً!'
        : 'Sorry, something went wrong. Please try again later!';
    }
  }

  /**
   * Find relevant country data from database to provide context
   */
  private async findRelevantCountryData(question: string): Promise<string | null> {
    try {
      // Get all countries
      const countries = await prisma.country.findMany({
        select: {
          code: true,
          name_en: true,
          name_ar: true,
          capital_en: true,
          continent: true,
          famous_landmarks_en: true,
          famous_animals_en: true,
          famous_foods_en: true,
          fun_facts_en: true,
        }
      });

      const lowerQuestion = question.toLowerCase();

      // Find if question mentions any country
      const mentionedCountry = countries.find(c =>
        lowerQuestion.includes(c.name_en.toLowerCase()) ||
        lowerQuestion.includes(c.capital_en.toLowerCase()) ||
        lowerQuestion.includes(c.code.toLowerCase())
      );

      if (!mentionedCountry) {
        return null;
      }

      // Build context about the country
      const context = [
        `${mentionedCountry.name_en} is in ${mentionedCountry.continent}.`,
        `Capital: ${mentionedCountry.capital_en}.`,
        mentionedCountry.famous_landmarks_en?.length ?
          `Landmarks: ${mentionedCountry.famous_landmarks_en.slice(0, 2).join(', ')}.` : '',
        mentionedCountry.famous_animals_en?.length ?
          `Animals: ${mentionedCountry.famous_animals_en.slice(0, 2).join(', ')}.` : '',
        mentionedCountry.fun_facts_en?.[0] || '',
      ].filter(Boolean).join(' ');

      return context;

    } catch (error) {
      console.error('Error fetching country data:', error);
      return null;
    }
  }

  /**
   * Sanitize AI response for child safety
   */
  private sanitizeResponse(response: string, language: 'en' | 'ar'): string {
    // Remove any self-references to being an AI
    const aiReferences = [
      /I('m| am) (an AI|a bot|a computer|an assistant|artificial)/gi,
      /as (an AI|a bot|a computer program)/gi,
      /I (don't|do not|can't|cannot) have (feelings|emotions|opinions)/gi,
    ];

    let sanitized = response;
    aiReferences.forEach(pattern => {
      sanitized = sanitized.replace(pattern, '');
    });

    // Ensure response isn't too long
    const sentences = sanitized.split(/[.!?]+/).filter(s => s.trim().length > 0);
    if (sentences.length > 4) {
      sanitized = sentences.slice(0, 4).join('. ') + '.';
    }

    // Clean up any double spaces or formatting issues
    sanitized = sanitized.replace(/\s+/g, ' ').trim();

    // Ensure response ends with punctuation
    if (!/[.!?]$/.test(sanitized)) {
      sanitized += '.';
    }

    return sanitized;
  }
}

export const aiAssistantService = new AIAssistantService();
