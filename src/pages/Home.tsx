import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '@/contexts/UserContext';
import { Navbar } from '@/components/Navbar';
import { DashboardCard } from '@/components/DashboardCard';
import { AcademicDetailsForm } from '@/components/AcademicDetailsForm';
import { SubjectsSection } from '@/components/SubjectsSection';
import { User, Gauge, TrendingUp, Flame, BookOpen } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, profile, academicDetails, progress } = useUser();
  const [showAcademicForm, setShowAcademicForm] = useState(!academicDetails);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const paceColors = {
    slow: 'text-highlight',
    medium: 'text-primary',
    fast: 'text-accent',
  };

  const levelEmoji = {
    beginner: '🌱',
    intermediate: '🌿',
    advanced: '🌳',
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-6 py-8">
        {/* Welcome section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {profile?.name || 'Learner'}! 👋
          </h1>
          <p className="text-muted-foreground">
            Ready to continue your learning journey? Let's make today count!
          </p>
        </motion.div>

        {/* Dashboard cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="Profile"
            icon={User}
            delay={0}
          >
            <div className="space-y-2">
              <p className="font-medium text-card-foreground">{profile?.name}</p>
              <p className="text-sm text-muted-foreground">{profile?.email}</p>
              {profile?.favoriteSubject && (
                <p className="text-sm text-primary">
                  Loves {profile.favoriteSubject} 💫
                </p>
              )}
            </div>
          </DashboardCard>

          <DashboardCard
            title="Learning Pace"
            icon={Gauge}
            delay={0.1}
          >
            <div className="flex items-center gap-3">
              <div className={`text-3xl font-bold capitalize ${paceColors[progress.pace]}`}>
                {progress.pace}
              </div>
              <div className="text-2xl">
                {progress.pace === 'slow' ? '🐢' : progress.pace === 'medium' ? '🚶' : '🏃'}
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Adjusted to your comfort level
            </p>
          </DashboardCard>

          <DashboardCard
            title="Current Level"
            icon={TrendingUp}
            delay={0.2}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{levelEmoji[progress.level]}</span>
              <div>
                <p className="font-bold text-card-foreground capitalize">{progress.level}</p>
                <p className="text-sm text-muted-foreground">Keep going!</p>
              </div>
            </div>
          </DashboardCard>

          <DashboardCard
            title="Progress"
            icon={Flame}
            delay={0.3}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Streak</span>
                <span className="font-bold text-accent">{progress.streakDays} days 🔥</span>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-muted-foreground">Chapters</span>
                  <span className="text-sm font-medium text-card-foreground">
                    {progress.completedChapters}/{progress.totalChapters || 0}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full gradient-primary rounded-full transition-all duration-500"
                    style={{
                      width: `${progress.totalChapters ? (progress.completedChapters / progress.totalChapters) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </DashboardCard>
        </div>

        {/* Academic details or Subjects */}
        {showAcademicForm || !academicDetails ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <AcademicDetailsForm onComplete={() => setShowAcademicForm(false)} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Your Subjects</h2>
                  <p className="text-sm text-muted-foreground">
                    Class {academicDetails.classGrade} • {academicDetails.board.toUpperCase()} Board
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAcademicForm(true)}
                className="text-sm text-primary hover:underline"
              >
                Edit details
              </button>
            </div>
            <SubjectsSection />
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Home;
