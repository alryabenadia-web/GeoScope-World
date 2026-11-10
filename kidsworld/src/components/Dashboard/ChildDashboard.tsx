import { useState, useEffect } from 'react';
import { Star, Target, TrendingUp, Map, Zap, Compass, Globe, Trophy, Sparkles } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { apiClient } from '../../lib/api-client';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';

interface DashboardStats {
  countriesVisited: number;
  totalCountries: number;
  quizzesTaken: number;
  correctAnswers: number;
  totalQuizAttempts: number;
  achievementsUnlocked: number;
  totalAchievements: number;
  streak: number;
  recentActivities: Array<{
    type: string;
    description: string;
    timestamp: string;
    sortDate: number;
    icon: string;
  }>;
  continentProgress: Array<{
    continent: string;
    count: number;
  }>;
}

interface ChildDashboardProps {
  onNavigate: (page: string) => void;
}

export function ChildDashboard({ onNavigate }: ChildDashboardProps) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { t, language, isRTL } = useLanguage();
  const { profile, user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchDashboardStats();
    }
  }, [user, profile?.total_points, profile?.avatar_style]);

  const fetchDashboardStats = async () => {
    if (!user) return;

    try {
      const [statsData, journalData, countriesData, quizAttemptsData] = await Promise.all([
        apiClient.getStatistics(),
        apiClient.getJournal(),
        apiClient.getCountries(),
        apiClient.getQuizAttempts(),
      ]);

      const continentMap: Record<string, number> = {};
      journalData.forEach((visit: any) => {
        const continent = visit.country?.continent;
        if (continent) {
          continentMap[continent] = (continentMap[continent] || 0) + 1;
        }
      });

      const continentProgress = Object.entries(continentMap).map(([continent, count]) => ({
        continent,
        count: count as number,
      }));

      const streak = calculateStreak(quizAttemptsData);
      const recentActivities = generateRecentActivitiesFromData(journalData, quizAttemptsData);

      // Calculate unique countries from journal (matches travel journal count)
      const uniqueCountries = new Set(journalData.map((visit: any) => visit.country_id)).size;

      setStats({
        countriesVisited: uniqueCountries,
        totalCountries: countriesData.length || 0,
        quizzesTaken: quizAttemptsData.length || 0,
        correctAnswers: quizAttemptsData.filter((a: any) => a.is_correct).length || 0,
        totalQuizAttempts: quizAttemptsData.length || 0,
        achievementsUnlocked: 0,
        totalAchievements: 0,
        streak,
        recentActivities,
        continentProgress,
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStreak = (quizAttempts: any[]) => {
    if (!quizAttempts || quizAttempts.length === 0) return 0;

    const sortedAttempts = [...quizAttempts].sort(
      (a, b) => new Date(b.attempted_at).getTime() - new Date(a.attempted_at).getTime()
    );

    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    for (const attempt of sortedAttempts) {
      const attemptDate = new Date(attempt.attempted_at);
      attemptDate.setHours(0, 0, 0, 0);

      const daysDiff = Math.floor((currentDate.getTime() - attemptDate.getTime()) / (1000 * 60 * 60 * 24));

      if (daysDiff === streak) {
        streak++;
      } else if (daysDiff > streak) {
        break;
      }
    }

    return streak;
  };

  const generateRecentActivitiesFromData = (journalData: any[], quizAttempts: any[]) => {
    const activities: any[] = [];

    journalData.forEach((visit: any) => {
      activities.push({
        type: 'visit',
        description: language === 'ar'
          ? `زرت ${visit.country?.name_ar || 'دولة'}`
          : `Visited ${visit.country?.name_en || 'a country'}`,
        timestamp: new Date(visit.visited_at).toLocaleDateString(),
        sortDate: new Date(visit.visited_at).getTime(),
        icon: '🌍',
      });
    });

    quizAttempts.forEach((attempt: any) => {
      activities.push({
        type: 'quiz',
        description: attempt.is_correct
          ? (language === 'ar' ? 'أجبت على الاختبار بشكل صحيح!' : 'Answered quiz correctly!')
          : (language === 'ar' ? 'حاولت الإجابة على اختبار' : 'Attempted a quiz'),
        timestamp: new Date(attempt.attempted_at).toLocaleDateString(),
        sortDate: new Date(attempt.attempted_at).getTime(),
        icon: attempt.is_correct ? '✅' : '📝',
      });
    });

    return activities
      .sort((a, b) => b.sortDate - a.sortDate)
      .slice(0, 10);
  };

  const getRankTitle = (points: number) => {
    if (points < 50) return language === 'ar' ? 'مستكشف مبتدئ' : 'Junior Explorer';
    if (points < 200) return language === 'ar' ? 'مغامر عالمي' : 'World Adventurer';
    if (points < 500) return language === 'ar' ? 'خبير جغرافي' : 'Geography Expert';
    return language === 'ar' ? 'أسطورة العالم' : 'World Legend';
  };

  const getRankBadge = (points: number) => {
    if (points < 50) return '🌱';
    if (points < 200) return '🗺️';
    if (points < 500) return '🌟';
    return '👑';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-t-4 border-blue-500"></div>
          <Compass className="w-10 h-10 text-blue-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!stats) return null;

  const exploredPercentage = Math.round((stats.countriesVisited / stats.totalCountries) * 100);
  const correctPercentage =
    stats.totalQuizAttempts > 0
      ? Math.round((stats.correctAnswers / stats.totalQuizAttempts) * 100)
      : 0;

  const pieData = [
    { name: 'Explored', value: stats.countriesVisited, color: '#60a5fa' },
    { name: 'Unexplored', value: stats.totalCountries - stats.countriesVisited, color: '#e5e7eb' },
  ];

  const avatarType = (profile?.avatar_style?.type || 'boy') as 'boy' | 'girl';
  const explorerImage = avatarType === 'boy'
    ? '/ChatGPT_Image_Nov_25__2025__05_35_41_PM-removebg-preview.png'
    : '/ChatGPT_Image_Nov_25__2025__05_32_19_PM-removebg-preview.png';

  return (
    <div className="space-y-6">
      <div className="relative bg-gradient-to-br from-blue-400 via-cyan-400 to-teal-500 rounded-3xl p-8 text-white shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -ml-32 -mb-32"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-32 h-32 bg-white rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden border-4 border-white">
                  <img
                    src={explorerImage}
                    alt="Little Explorer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-2 border-4 border-white shadow-lg">
                  <span className="text-2xl">{getRankBadge(profile?.total_points || 0)}</span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-5xl font-black">
                    {language === 'ar' ? 'مرحبا' : 'Hello'}, {profile?.username}!
                  </h1>
                  <span className="text-5xl animate-wave">👋</span>
                </div>
                <p className="text-2xl opacity-95 mb-3 font-semibold">
                  {language === 'ar' ? 'جاهز لاستكشاف العالم؟' : "Ready to explore the world?"}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-full backdrop-blur-sm">
                    <Star className="w-6 h-6 fill-yellow-300 text-yellow-300" />
                    <span className="text-2xl font-black">{profile?.total_points}</span>
                    <span className="text-sm font-semibold">{t('points')}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-full backdrop-blur-sm">
                    <Trophy className="w-6 h-6 text-yellow-300" />
                    <span className="text-lg font-bold">{getRankTitle(profile?.total_points || 0)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <img
                src={explorerImage}
                alt="Explorer"
                className="w-48 h-48 object-contain animate-float filter drop-shadow-2xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white bg-opacity-20 rounded-2xl p-4 backdrop-blur-sm border border-white border-opacity-30">
              <Globe className="w-8 h-8 mb-2 text-yellow-300" />
              <div className="text-3xl font-black">{stats.countriesVisited}</div>
              <div className="text-sm font-semibold opacity-90">
                {language === 'ar' ? 'دول زارها' : 'Countries Visited'}
              </div>
            </div>

            <div className="bg-white bg-opacity-20 rounded-2xl p-4 backdrop-blur-sm border border-white border-opacity-30">
              <Target className="w-8 h-8 mb-2 text-yellow-300" />
              <div className="text-3xl font-black">{correctPercentage}%</div>
              <div className="text-sm font-semibold opacity-90">
                {language === 'ar' ? 'دقة الاختبار' : 'Quiz Accuracy'}
              </div>
            </div>

            <div className="bg-white bg-opacity-20 rounded-2xl p-4 backdrop-blur-sm border border-white border-opacity-30">
              <Zap className="w-8 h-8 mb-2 text-yellow-300" />
              <div className="text-3xl font-black">{stats.streak}</div>
              <div className="text-sm font-semibold opacity-90">
                {language === 'ar' ? 'سلسلة الأيام' : 'Day Streak'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-blue-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-blue-400 to-cyan-500 p-3 rounded-2xl">
              <Map className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-black text-gray-800">
              {language === 'ar' ? 'رحلة الاستكشاف' : 'Exploration Journey'}
            </h3>
          </div>

          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="text-center mt-4">
            <div className="text-5xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {exploredPercentage}%
            </div>
            <div className="text-gray-600 font-semibold text-lg">
              {language === 'ar' ? 'من العالم مستكشف' : 'of World Explored'}
            </div>
            <div className="mt-3 text-sm text-gray-500">
              {stats.countriesVisited} / {stats.totalCountries} {language === 'ar' ? 'دول' : 'countries'}
            </div>
          </div>

          <button
            onClick={() => onNavigate('map')}
            className="mt-4 w-full bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 rounded-2xl p-6 transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            <div className="text-center text-5xl mb-3">🌍</div>
            <p className="text-lg text-white text-center font-black">
              {language === 'ar'
                ? `استكشف ${stats.totalCountries - stats.countriesVisited} دولة أخرى!`
                : `Explore ${stats.totalCountries - stats.countriesVisited} more countries!`
              }
            </p>
          </button>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-green-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-3 rounded-2xl">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-black text-gray-800">
              {language === 'ar' ? 'أداء الاختبار' : 'Quiz Performance'}
            </h3>
          </div>

          <div className="space-y-6">
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#e5e7eb"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#10b981"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${correctPercentage * 3.52} 352`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute">
                  <div className="text-4xl font-black text-green-600">{correctPercentage}%</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between bg-green-50 rounded-xl p-3">
                <span className="text-gray-700 font-semibold">
                  {language === 'ar' ? 'إجابات صحيحة' : 'Correct Answers'}
                </span>
                <span className="text-2xl font-black text-green-600">{stats.correctAnswers}</span>
              </div>

              <div className="flex items-center justify-between bg-blue-50 rounded-xl p-3">
                <span className="text-gray-700 font-semibold">
                  {language === 'ar' ? 'إجمالي الأسئلة' : 'Total Questions Answered'}
                </span>
                <span className="text-2xl font-black text-blue-600">{stats.totalQuizAttempts}</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('map')}
              className="w-full bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 rounded-2xl p-6 transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              <span className="text-5xl block mb-3">🎯</span>
              <p className="text-lg text-white font-black">
                {language === 'ar' ? 'استمر في التعلم!' : 'Keep learning!'}
              </p>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-orange-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-orange-400 to-red-500 p-3 rounded-2xl">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-black text-gray-800">
              {language === 'ar' ? 'تقدم القارات' : 'Continent Progress'}
            </h3>
          </div>

          {stats.continentProgress.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={stats.continentProgress} margin={{ bottom: 60, top: 20 }}>
                <XAxis
                  dataKey="continent"
                  angle={isRTL ? 45 : -45}
                  textAnchor={isRTL ? 'start' : 'end'}
                  height={80}
                  tick={{ fontSize: 12 }}
                  interval={0}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#f97316" radius={[10, 10, 0, 0]}>
                  {stats.continentProgress.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`hsl(${index * 50}, 70%, 60%)`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <Globe className="w-20 h-20 mb-4 opacity-50" />
              <p className="text-lg font-semibold">
                {language === 'ar' ? 'ابدأ باستكشاف القارات!' : 'Start exploring continents!'}
              </p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-pink-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-pink-400 to-rose-500 p-3 rounded-2xl">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-black text-gray-800">
              {language === 'ar' ? 'النشاط الأخير' : 'Recent Activity'}
            </h3>
          </div>

          <div className="space-y-3 max-h-80 overflow-y-auto">
            {stats.recentActivities.length > 0 ? (
              stats.recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl border border-pink-200 hover:shadow-md transition-shadow"
                >
                  <div className="text-4xl">{activity.icon}</div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-800">{activity.description}</div>
                    <div className="text-sm text-gray-500">{activity.timestamp}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <Compass className="w-20 h-20 mb-4 opacity-50" />
                <p className="text-lg font-semibold text-center">
                  {language === 'ar'
                    ? 'ابدأ الاستكشاف لرؤية أنشطتك هنا!'
                    : 'Start exploring to see your activities here!'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(20deg); }
          75% { transform: rotate(-20deg); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .animate-wave {
          animation: wave 1.5s ease-in-out infinite;
          transform-origin: 70% 70%;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
