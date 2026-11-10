import { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowLeft, Trophy } from 'lucide-react';
import { apiClient, type Quiz } from '../../lib/api-client';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { useAudio } from '../../contexts/AudioContext';

interface QuizSectionProps {
  countryCode: string;
  onBack: () => void;
}

interface QuizAttemptRecord {
  question: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  points: number;
  difficulty: string;
}

export function QuizSection({ countryCode, onBack }: QuizSectionProps) {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [attemptRecords, setAttemptRecords] = useState<QuizAttemptRecord[]>([]);
  const [submittingResults, setSubmittingResults] = useState(false);
  const { language, t } = useLanguage();
  const { user, refreshProfile } = useAuth();
  const { playSound } = useAudio();
  const loadedCountryRef = useRef<string | null>(null);

  const loadQuizzes = useCallback(async () => {
    // Skip reloading if we've already loaded quizzes for this country
    // This prevents React Strict Mode from generating different quiz sets
    if (loadedCountryRef.current === countryCode) {
      console.log('Skipping quiz reload - already loaded for', countryCode);
      return;
    }

    try {
      // Reset all quiz state when loading new quizzes
      setLoading(true);
      setCurrentQuizIndex(0);
      setSelectedAnswer(null);
      setShowResult(false);
      setIsCorrect(false);
      setTotalScore(0);
      setCorrectAnswersCount(0);
      setQuizCompleted(false);
      setAttemptRecords([]);
      setSubmittingResults(false);

      // Use dynamic quiz generation instead of static database quizzes
      const data = await apiClient.getDynamicQuizzes(countryCode, 5);
      setQuizzes(data || []);

      // Mark this country as loaded to prevent reloading
      loadedCountryRef.current = countryCode;
    } catch (error) {
      console.error('Error loading quizzes:', error);
      setQuizzes([]);
    } finally {
      setLoading(false);
    }
  }, [countryCode]);

  useEffect(() => {
    loadQuizzes();
  }, [loadQuizzes]);

  // Clear quiz state immediately when country changes to prevent showing stale data
  useEffect(() => {
    if (loadedCountryRef.current && loadedCountryRef.current !== countryCode) {
      // Country changed - clear all quiz state immediately
      setQuizzes([]);
      setCurrentQuizIndex(0);
      setSelectedAnswer(null);
      setShowResult(false);
      setIsCorrect(false);
      setTotalScore(0);
      setCorrectAnswersCount(0);
      setQuizCompleted(false);
      setAttemptRecords([]);
      setSubmittingResults(false);
      setLoading(true);
    }
  }, [countryCode]);

  const handleAnswerSelect = async (answerIndex: number) => {
    if (showResult) return;

    setSelectedAnswer(answerIndex);
    const currentQuiz = quizzes[currentQuizIndex];
    const question = language === 'ar' ? currentQuiz.question_ar : currentQuiz.question_en;
    const options = language === 'ar' ? currentQuiz.options_ar : currentQuiz.options_en;
    const selectedAnswerText = options[answerIndex];

    // Use language-specific correct answer for validation
    const correctAnswer = language === 'ar' ? currentQuiz.correct_answer_ar : currentQuiz.correct_answer_en;
    const correct = selectedAnswerText.trim() === correctAnswer.trim();

    setIsCorrect(correct);
    setShowResult(true);

    // Record this attempt (use language-specific correct answer)
    const attemptRecord: QuizAttemptRecord = {
      question,
      selectedAnswer: selectedAnswerText,
      correctAnswer: correctAnswer,  // Already determined based on language
      isCorrect: correct,
      points: currentQuiz.points,
      difficulty: currentQuiz.difficulty,
    };
    setAttemptRecords(prev => [...prev, attemptRecord]);

    if (correct) {
      playSound('correct');
      setTotalScore(prev => prev + currentQuiz.points);
      setCorrectAnswersCount(prev => prev + 1);
    } else {
      playSound('incorrect');
    }
  };

  const handleNext = async () => {
    if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setIsCorrect(false);
    } else {
      // Quiz completed! Submit results to backend
      setSubmittingResults(true);

      // Wait a moment to ensure state has fully updated (React batches updates)
      await new Promise(resolve => setTimeout(resolve, 100));

      // Ensure we have all attempts recorded (should be quizzes.length)
      if (attemptRecords.length !== quizzes.length) {
        console.error('Attempt records mismatch:', {
          expected: quizzes.length,
          actual: attemptRecords.length,
          records: attemptRecords,
        });
        // Force show completion screen even if we can't save
        playSound('correct');
        setQuizCompleted(true);
        setSubmittingResults(false);
        return;
      }

      try {
        console.log('Submitting quiz with full details:', {
          countryCode,
          attempts: attemptRecords,
          totalScore,
          correctCount: correctAnswersCount,
        });
        console.log('Individual attempts:', attemptRecords.map((a, i) => ({
          index: i,
          question: a.question,
          selectedAnswer: a.selectedAnswer,
          correctAnswer: a.correctAnswer,
          isCorrect: a.isCorrect,
          points: a.points,
          difficulty: a.difficulty,
        })));

        await apiClient.submitDynamicQuizSession({
          countryCode,
          attempts: attemptRecords,
          totalScore,
          correctCount: correctAnswersCount,
        });

        // Refresh profile to show updated points
        await refreshProfile();

        playSound('correct'); // Celebration sound
        setQuizCompleted(true);
      } catch (error: any) {
        console.error('Error submitting quiz session:', error);
        console.error('Attempted to submit:', {
          countryCode,
          attempts: attemptRecords,
          totalScore,
          correctCount: correctAnswersCount,
        });
        // Still show completion screen even if submission fails
        playSound('correct');
        setQuizCompleted(true);
      } finally {
        setSubmittingResults(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (quizzes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">
          {language === 'ar'
            ? 'عذراً، حدث خطأ في تحميل الاختبارات. يرجى المحاولة مرة أخرى.'
            : 'Sorry, there was an error loading the quizzes. Please try again.'}
        </p>
        <button
          onClick={onBack}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
        >
          {t('close')}
        </button>
      </div>
    );
  }

  // Quiz completion screen
  if (quizCompleted) {
    const percentageCorrect = (correctAnswersCount / quizzes.length) * 100;
    const didWell = percentageCorrect >= 60;

    return (
      <div>
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-blue-500 hover:text-blue-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          {t('close')}
        </button>

        <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-8 text-center">
          {/* Celebration Animation */}
          <div className="text-8xl mb-6 animate-bounce">
            {didWell ? '🎉' : '⭐'}
          </div>

          {/* Main Message */}
          <h2 className="text-4xl font-black text-gray-800 mb-4">
            {language === 'ar'
              ? didWell ? '🎉 عمل رائع!' : '⭐ أحسنت!'
              : didWell ? '🎉 Great Job!' : '⭐ Good Effort!'}
          </h2>

          <p className="text-xl text-gray-700 mb-8">
            {language === 'ar'
              ? didWell
                ? 'ليو فخور بك! لقد أجبت على معظم الأسئلة بشكل صحيح! 🦁'
                : 'ليو يشجعك! استمر في التعلم معًا! 🦁💪'
              : didWell
              ? 'Leo is proud of you! You answered most questions correctly! 🦁'
              : 'Leo encourages you! Keep learning together! 🦁💪'}
          </p>

          {/* Score Display */}
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600 text-sm mb-2">
                  {language === 'ar' ? 'الإجابات الصحيحة' : 'Correct Answers'}
                </p>
                <p className="text-4xl font-black text-green-600">
                  {correctAnswersCount} / {quizzes.length}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-2">
                  {language === 'ar' ? 'إجمالي النقاط' : 'Total Points'}
                </p>
                <p className="text-4xl font-black text-blue-600">
                  {totalScore}
                </p>
              </div>
            </div>
          </div>

          {/* Encouragement Message */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-4 mb-6">
            <p className="text-lg font-semibold">
              {language === 'ar'
                ? didWell
                  ? '🌟 رائع! أنت مستكشف مذهل!'
                  : '💪 استمر في الاستكشاف والتعلم!'
                : didWell
                ? '🌟 Amazing! You\'re a great explorer!'
                : '💪 Keep exploring and learning!'}
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={onBack}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg text-xl"
          >
            {language === 'ar' ? '✓ إنهاء' : '✓ Finish'}
          </button>
        </div>
      </div>
    );
  }

  const currentQuiz = quizzes[currentQuizIndex];
  const question = language === 'ar' ? currentQuiz.question_ar : currentQuiz.question_en;
  const options = language === 'ar' ? currentQuiz.options_ar : currentQuiz.options_en;
  const isLastQuiz = currentQuizIndex === quizzes.length - 1;

  // Use language-specific correct answer for highlighting
  const correctAnswer = language === 'ar' ? currentQuiz.correct_answer_ar : currentQuiz.correct_answer_en;
  const correctIndex = options.indexOf(correctAnswer);

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-blue-500 hover:text-blue-600 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        {t('close')}
      </button>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-gray-600">
            {t('yourScore')}: {totalScore} {t('points')}
          </span>
          <span className="text-sm font-semibold text-gray-600">
            {currentQuizIndex + 1} / {quizzes.length}
          </span>
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mb-6">{question}</h3>

        <div className="space-y-3">
          {options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectAnswer = index === correctIndex;
            let buttonClass = 'w-full text-left p-4 rounded-lg border-2 transition-all font-semibold ';

            if (showResult) {
              if (isCorrectAnswer) {
                buttonClass += 'bg-green-100 border-green-500 text-green-800';
              } else if (isSelected && !isCorrect) {
                buttonClass += 'bg-red-100 border-red-500 text-red-800';
              } else {
                buttonClass += 'bg-gray-100 border-gray-300 text-gray-600';
              }
            } else {
              buttonClass += 'bg-white border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-gray-800';
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={buttonClass}
              >
                {option}
              </button>
            );
          })}
        </div>

        {showResult && (
          <div className="mt-6">
            <div
              className={`p-4 rounded-lg text-center font-bold text-lg ${
                isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
            >
              {isCorrect ? (
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-6 h-6" />
                    <span>+{currentQuiz.points} {t('points')}</span>
                  </div>
                  <span className="text-base">
                    {language === 'ar' ? '🎉 أحسنت! ليو فخور بك!' : '🎉 Great job! Leo is proud of you!'}
                  </span>
                </div>
              ) : (
                <span>{language === 'ar' ? '💪 محاولة جميلة! هيا نتعلّم معًا!' : '💪 Good try! Let\'s learn together!'}</span>
              )}
            </div>

            <button
              onClick={handleNext}
              disabled={submittingResults}
              className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submittingResults ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  {language === 'ar' ? 'جاري الحفظ...' : 'Saving...'}
                </div>
              ) : (
                isLastQuiz ? (language === 'ar' ? 'عرض النتائج' : 'View Results') : t('next')
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
