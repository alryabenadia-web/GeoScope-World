import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiClient, User, Profile } from '../lib/api-client';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  isAuthenticated: boolean;
  signUp: (username: string, password: string, role: 'child' | 'parent', parentEmail?: string) => Promise<void>;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUserData = async () => {
    try {
      const [userData, profileData] = await Promise.all([
        apiClient.getCurrentUser(),
        apiClient.getProfile(),
      ]);
      setUser(userData);
      setProfile(profileData);
    } catch (error) {
      console.error('Failed to load user data:', error);
      apiClient.clearTokens();
      setUser(null);
      setProfile(null);
    }
  };

  const refreshProfile = async () => {
    try {
      const profileData = await apiClient.getProfile();
      setProfile(profileData);
    } catch (error) {
      console.error('Failed to refresh profile:', error);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      if (apiClient.getAccessToken()) {
        await loadUserData();
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const signUp = async (username: string, password: string, role: 'child' | 'parent', parentEmail?: string) => {
    const response = await apiClient.register(username, password, role, parentEmail);
    setUser(response.user);
    await loadUserData();
  };

  const signIn = async (username: string, password: string) => {
    const response = await apiClient.login(username, password);
    setUser(response.user);
    await loadUserData();
  };

  const signOut = async () => {
    try {
      await apiClient.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setProfile(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        isAuthenticated: !!user,
        signUp,
        signIn,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
