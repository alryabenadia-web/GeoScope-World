const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

interface User {
  id: string;
  username: string;
  role: 'child' | 'parent';
  created_at: string;
}

interface Profile {
  id: string;
  username: string;
  avatar_style: any;
  language_preference: string;
  total_points: number;
  parent_email?: string;
  is_parent: boolean;
  child_id?: string;
}

interface Country {
  id: string;
  code: string;
  name_en: string;
  name_ar: string;
  capital_en: string;
  capital_ar: string;
  continent: string;
  population?: string;
  area?: string;
  flag_emoji?: string;
  flag_url?: string;
  map_url?: string;
  landmark_url?: string;
  image_url?: string;
  description_en?: string;
  description_ar?: string;
  fun_facts_en: string[];
  fun_facts_ar: string[];
  famous_landmarks_en: string[];
  famous_landmarks_ar: string[];
  famous_animals_en: string[];
  famous_animals_ar: string[];
  famous_foods_en: string[];
  famous_foods_ar: string[];
  latitude?: number;
  longitude?: number;
  visited?: boolean;
}

interface Quiz {
  id: string;
  country_id: string;
  question_en: string;
  question_ar: string;
  correct_answer_en: string;  // English correct answer
  correct_answer_ar: string;  // Arabic correct answer
  options_en: string[];
  options_ar: string[];
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  points: number;
  last_attempt?: QuizAttempt;
}

interface QuizAttempt {
  id: string;
  quiz_id: string;
  answer: string;
  is_correct: boolean;
  points_earned: number;
  attempted_at: string;
}

interface JournalEntry {
  id: string;
  country_id: string;
  country?: Country;
  visited_at: string;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  points: number;
  criteria?: any;
  unlocked: boolean;
  unlocked_at?: string | null;
}

interface DailyChallenge {
  id: string;
  challenge_type: string;
  target_value: number;
  reward_points: number;
  description_en: string;
  description_ar: string;
  challenge_date: string;
}

interface DailyChallengeResponse {
  challenge: DailyChallenge;
  userProgress: {
    id: string;
    progress: number;
    completed: boolean;
  } | null;
}

interface ChallengeProgressResponse {
  progress: number;
  completed: boolean;
  target: number;
}

interface ClaimRewardResponse {
  success: boolean;
  points_earned: number;
  message: string;
}

interface Statistics {
  total_points: number;
  countries_visited: number;
  quizzes_completed: number;
  achievements_earned: number;
  correct_answers: number;
  total_attempts: number;
}

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

interface RegisterResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

interface RefreshResponse {
  access_token: string;
}

class ApiClient {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private refreshPromise: Promise<string> | null = null;

  constructor() {
    // Load tokens from localStorage on initialization
    this.accessToken = localStorage.getItem('access_token');
    this.refreshToken = localStorage.getItem('refresh_token');
  }

  setTokens(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    // Persist tokens to localStorage for session persistence
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }

  clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
    this.refreshPromise = null;
    // Clear tokens from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  getAccessToken() {
    return this.accessToken;
  }

  private async refreshAccessToken(): Promise<string> {
    if (!this.refreshToken) {
      throw new Error('No refresh token available');
    }

    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = (async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refresh_token: this.refreshToken }),
        });

        if (!response.ok) {
          throw new Error('Failed to refresh token');
        }

        const data: RefreshResponse = await response.json();
        this.accessToken = data.access_token;
        // Persist the new access token to localStorage
        localStorage.setItem('access_token', data.access_token);
        return data.access_token;
      } finally {
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`;
    }

    let response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.status === 401 && this.refreshToken && endpoint !== '/auth/refresh') {
      try {
        await this.refreshAccessToken();
        headers['Authorization'] = `Bearer ${this.accessToken}`;
        response = await fetch(url, {
          ...options,
          headers,
        });
      } catch (error) {
        this.clearTokens();
        throw new Error('Session expired. Please login again.');
      }
    }

    if (!response.ok) {
      const error: ApiError = await response.json().catch(() => ({
        message: 'An error occurred',
      }));
      // Log detailed error for debugging
      if ((error as any).details) {
        console.error('API Error Details:', (error as any).details);
      }
      throw new Error(error.message);
    }

    return response.json();
  }

  async register(
    username: string,
    password: string,
    role: 'child' | 'parent',
    parentEmail?: string
  ): Promise<LoginResponse> {
    const response = await this.request<RegisterResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, password, role, parent_email: parentEmail }),
    });

    this.setTokens(response.access_token, response.refresh_token);
    return response;
  }

  async login(username: string, password: string): Promise<LoginResponse> {
    const response = await this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    this.setTokens(response.access_token, response.refresh_token);
    return response;
  }

  async logout(): Promise<void> {
    try {
      await this.request('/auth/logout', {
        method: 'POST',
        body: JSON.stringify({ refresh_token: this.refreshToken }),
      });
    } finally {
      this.clearTokens();
    }
  }

  async getCurrentUser(): Promise<User> {
    return this.request<User>('/profile/me');
  }

  async getProfile(): Promise<Profile> {
    return this.request<Profile>('/profile/me/profile');
  }

  async updateProfile(updates: Partial<Profile>): Promise<Profile> {
    return this.request<Profile>('/profile/me', {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  async getStatistics() {
    return this.request('/profile/me/statistics');
  }

  async getCountries() {
    return this.request('/countries');
  }

  async getCountryDetails(code: string) {
    return this.request(`/countries/${code}`);
  }

  async visitCountry(code: string) {
    return this.request(`/countries/${code}/visit`, {
      method: 'POST',
    });
  }

  async getQuizzes(countryCode: string) {
    return this.request(`/quizzes/country/${countryCode}`);
  }

  async getDynamicQuizzes(countryCode: string, count: number = 5) {
    return this.request(`/quizzes/country/${countryCode}/dynamic?count=${count}`);
  }

  async submitQuiz(quizId: string, answer: string) {
    return this.request(`/quizzes/${quizId}/submit`, {
      method: 'POST',
      body: JSON.stringify({ answer }),
    });
  }

  async submitDynamicQuizSession(sessionData: {
    countryCode: string;
    attempts: Array<{
      question: string;
      selectedAnswer: string;
      correctAnswer: string;
      isCorrect: boolean;
      points: number;
      difficulty: string;
    }>;
    totalScore: number;
    correctCount: number;
  }) {
    return this.request('/quizzes/dynamic/submit', {
      method: 'POST',
      body: JSON.stringify(sessionData),
    });
  }

  async getQuizAttempts() {
    return this.request('/quizzes/attempts');
  }

  async getJournal() {
    return this.request('/journal');
  }

  async getChildStatistics(childId: string) {
    return this.request(`/parent/children/${childId}/statistics`);
  }

  async getLeaderboard() {
    return this.request('/parent/leaderboard');
  }

  async getAchievements(): Promise<Achievement[]> {
    return this.request('/profile/me/achievements');
  }

  async getDailyChallenge(): Promise<DailyChallengeResponse> {
    return this.request('/challenges/daily');
  }

  async getDailyChallengeProgress(): Promise<ChallengeProgressResponse> {
    return this.request('/challenges/daily/progress');
  }

  async claimDailyChallengeReward(): Promise<ClaimRewardResponse> {
    return this.request('/challenges/daily/claim', {
      method: 'POST',
    });
  }

  async askTheMap(question: string, language: 'en' | 'ar' = 'en'): Promise<{ question: string; answer: string; language: string }> {
    return this.request('/ai/ask', {
      method: 'POST',
      body: JSON.stringify({ question, language }),
    });
  }
}

export const apiClient = new ApiClient();
export type {
  User,
  Profile,
  Country,
  Quiz,
  QuizAttempt,
  JournalEntry,
  Achievement,
  Statistics,
  LoginResponse,
  RegisterResponse,
  DailyChallenge,
  DailyChallengeResponse,
  ChallengeProgressResponse,
  ClaimRewardResponse
};
