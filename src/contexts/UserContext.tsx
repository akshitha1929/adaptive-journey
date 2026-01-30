import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface UserProfile {
  name: string;
  email: string;
  favoriteMovie: string;
  favoriteGame: string;
  favoriteFood: string;
  favoriteSeason: string;
  favoriteSubject: string;
}

export interface AcademicDetails {
  classGrade: string;
  board: 'state' | 'cbse' | 'icse' | '';
  state?: string;
  firstLanguage: string;
  secondLanguage?: string;
  thirdLanguage?: string;
  electives: string[];
}

export interface LearningProgress {
  pace: 'slow' | 'medium' | 'fast';
  level: 'beginner' | 'intermediate' | 'advanced';
  completedChapters: number;
  totalChapters: number;
  streakDays: number;
}

interface UserContextType {
  isAuthenticated: boolean;
  isOnboarded: boolean;
  profile: UserProfile | null;
  academicDetails: AcademicDetails | null;
  progress: LearningProgress;
  setIsAuthenticated: (val: boolean) => void;
  setIsOnboarded: (val: boolean) => void;
  setProfile: (profile: UserProfile) => void;
  setAcademicDetails: (details: AcademicDetails) => void;
  updateProgress: (progress: Partial<LearningProgress>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [academicDetails, setAcademicDetails] = useState<AcademicDetails | null>(null);
  const [progress, setProgress] = useState<LearningProgress>({
    pace: 'medium',
    level: 'beginner',
    completedChapters: 0,
    totalChapters: 0,
    streakDays: 0,
  });

  const updateProgress = (updates: Partial<LearningProgress>) => {
    setProgress(prev => ({ ...prev, ...updates }));
  };

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        isOnboarded,
        profile,
        academicDetails,
        progress,
        setIsAuthenticated,
        setIsOnboarded,
        setProfile,
        setAcademicDetails,
        updateProgress,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
