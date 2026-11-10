import { useState, useEffect } from 'react';
import { Calendar, Target, CheckCircle, Trophy, Star, Zap, Award, Clock, Gift } from 'lucide-react';
import { apiClient, DailyChallenge as DailyChallengeType } from '../../lib/api-client';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { useAudio } from '../../contexts/AudioContext';
import confetti from 'canvas-confetti';

interface UserProgress {
  id: string;
  progress: number;
  completed: boolean;
}

export function DailyChallenge() {
  const [challenge, setChallenge] = useState<DailyChallengeType | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeUntilReset, setTimeUntilReset] = useState('');
  const { language, t } = useLanguage();
  const { user, profile, refreshProfile } = useAuth();
  const { playSound } = useAudio();

  useEffect(() => {
    if (user) {
      fetchTodayChallenge();
    } else {
      setLoading(false);
    }
    updateTimeUntilReset();
    const interval = setInterval(updateTimeUntilReset, 60000);
    return () => clearInterval(interval);
  }, [user]);

  // Refresh progress periodically
  useEffect(() => {
    if (!user || !challenge) return;

    const refreshProgress = async () => {
      try {
        const progressData = await apiClient.getDailyChallengeProgress();
        setUserProgress(prev => prev ? {
          ...prev,
          progress: progressData.progress,
          completed: progressData.completed
        } : null);
      } catch (error) {
        console.error('Error refreshing progress:', error);
      }
    };

    const progressInterval = setInterval(refreshProgress, 30000);
    return () => clearInterval(progressInterval);
  }, [user, challenge]);

  const updateTimeUntilReset = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const diff = tomorrow.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    setTimeUntilReset(`${hours}h ${minutes}m`);
  };

  const fetchTodayChallenge = async () => {
    try {
      const response = await apiClient.getDailyChallenge();
      setChallenge(response.challenge);
      setUserProgress(response.userProgress);
    } catch (error) {
      console.error('Error fetching challenge:', error);
    } finally {
      setLoading(false);
    }
  };

  const claimReward = async () => {
    if (!user || !challenge || !userProgress || userProgress.completed) return;

    try {
      playSound('correct');

      const result = await apiClient.claimDailyChallengeReward();

      if (result.success) {
        setUserProgress({ ...userProgress, completed: true });

        // Refresh profile to update points
        if (refreshProfile) {
          refreshProfile();
        }

        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FFD700', '#FFA500', '#FF69B4', '#00CED1']
        });
      }
    } catch (error) {
      console.error('Error claiming reward:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-t-4 border-blue-500"></div>
          <Target className="w-8 h-8 text-blue-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl shadow-2xl p-12 text-center border-4 border-orange-200">
        <div className="bg-white bg-opacity-50 rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center">
          <Calendar className="w-16 h-16 text-orange-500 animate-pulse" />
        </div>
        <h3 className="text-3xl font-black text-gray-800 mb-4">
          {language === 'ar' ? 'لا يوجد تحدي اليوم' : 'No Challenge Today'}
        </h3>
        <p className="text-lg text-gray-600">
          {language === 'ar'
            ? 'تحقق مرة أخرى قريبًا للحصول على تحديات جديدة!'
            : 'Check back soon for new challenges!'}
        </p>
        <div className="mt-6 text-5xl">🎯✨🌍</div>
      </div>
    );
  }

  const description = language === 'ar' ? challenge.description_ar : challenge.description_en;
  const isCompleted = userProgress?.completed || false;
  const progress = userProgress?.progress || 0;
  const progressPercentage = Math.min((progress / challenge.target_value) * 100, 100);
  const canClaim = progressPercentage >= 100 && !isCompleted;

  const getChallengeIcon = () => {
    switch (challenge.challenge_type) {
      case 'visit_countries':
        return '🗺️';
      case 'complete_quizzes':
        return '📝';
      case 'earn_points':
        return '⭐';
      case 'explore_continents':
        return '🌍';
      default:
        return '🎯';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-white bg-opacity-20 p-4 rounded-2xl backdrop-blur-sm">
                <Target className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-4xl font-black mb-1">
                  {language === 'ar' ? 'التحدي اليومي' : 'Daily Challenge'}
                </h1>
                <div className="flex items-center gap-2 text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
                  <Clock className="w-4 h-4" />
                  <span>{language === 'ar' ? 'يتجدد في' : 'Resets in'}: {timeUntilReset}</span>
                </div>
              </div>
            </div>
            <div className="text-6xl animate-bounce">{getChallengeIcon()}</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white bg-opacity-20 rounded-2xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-yellow-300" />
                <span className="text-sm opacity-90">
                  {language === 'ar' ? 'الهدف' : 'Target'}
                </span>
              </div>
              <div className="text-3xl font-black">{challenge.target_value}</div>
            </div>

            <div className="bg-white bg-opacity-20 rounded-2xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-yellow-300" />
                <span className="text-sm opacity-90">
                  {language === 'ar' ? 'المكافأة' : 'Reward'}
                </span>
              </div>
              <div className="text-3xl font-black">{challenge.reward_points}</div>
            </div>

            <div className="bg-white bg-opacity-20 rounded-2xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-yellow-300" />
                <span className="text-sm opacity-90">
                  {language === 'ar' ? 'التقدم' : 'Progress'}
                </span>
              </div>
              <div className="text-3xl font-black">{progress}/{challenge.target_value}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-8 border-4 border-blue-100">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-3 flex items-center gap-3">
            <span className="text-3xl">{getChallengeIcon()}</span>
            {language === 'ar' ? 'مهمة اليوم' : "Today's Mission"}
          </h3>
          <p className="text-xl text-gray-700 leading-relaxed">{description}</p>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-bold text-gray-700">
              {language === 'ar' ? 'التقدم' : 'Progress'}
            </span>
            <span className="text-lg font-bold text-blue-600">
              {progressPercentage.toFixed(0)}%
            </span>
          </div>
          <div className="relative w-full bg-gray-200 rounded-full h-6 overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500 flex items-center justify-center"
              style={{ width: `${progressPercentage}%` }}
            >
              {progressPercentage > 10 && (
                <span className="text-xs font-bold text-white">
                  {progress} / {challenge.target_value}
                </span>
              )}
            </div>
          </div>
        </div>

        {isCompleted ? (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-4 border-green-400 rounded-2xl p-6 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h4 className="text-2xl font-black text-green-800 mb-2">
              {language === 'ar' ? '🎉 تم الإنجاز!' : '🎉 Completed!'}
            </h4>
            <p className="text-lg text-green-700 font-semibold">
              {language === 'ar'
                ? `لقد كسبت ${challenge.reward_points} نقطة!`
                : `You earned ${challenge.reward_points} points!`}
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-gray-600">
              <Trophy className="w-5 h-5" />
              <span className="text-sm">
                {language === 'ar' ? 'عد غدًا لتحدي جديد!' : 'Come back tomorrow for a new challenge!'}
              </span>
            </div>
          </div>
        ) : canClaim ? (
          <button
            onClick={claimReward}
            className="w-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 hover:from-yellow-500 hover:via-orange-500 hover:to-red-500 text-white font-black text-xl py-6 px-8 rounded-2xl transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-3 group"
          >
            <Gift className="w-8 h-8 group-hover:rotate-12 transition-transform" />
            {language === 'ar' ? 'احصل على المكافأة!' : 'Claim Reward!'}
            <Zap className="w-8 h-8 group-hover:rotate-12 transition-transform" />
          </button>
        ) : (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-6 text-center">
            <Award className="w-12 h-12 text-blue-500 mx-auto mb-3" />
            <p className="text-lg text-gray-700 font-semibold">
              {language === 'ar'
                ? 'استمر في الاستكشاف لإكمال التحدي!'
                : 'Keep exploring to complete the challenge!'}
            </p>
            <div className="mt-3 text-sm text-gray-600">
              {language === 'ar'
                ? `تحتاج إلى ${challenge.target_value - progress} أكثر`
                : `Need ${challenge.target_value - progress} more`}
            </div>
          </div>
        )}
      </div>

      {profile && (
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-lg p-6 border-2 border-yellow-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-3 rounded-xl">
                <Star className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm text-gray-600 font-semibold">
                  {language === 'ar' ? 'نقاطك الإجمالية' : 'Your Total Points'}
                </div>
                <div className="text-3xl font-black text-gray-800">{profile.total_points}</div>
              </div>
            </div>
            <div className="text-5xl">🏆</div>
          </div>
        </div>
      )}
    </div>
  );
}
