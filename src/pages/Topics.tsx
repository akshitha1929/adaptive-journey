import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '@/contexts/UserContext';
import { Navbar } from '@/components/Navbar';
import { SubjectsSection } from '@/components/SubjectsSection';
import { BookOpen, Sparkles } from 'lucide-react';

const Topics = () => {
  const navigate = useNavigate();
  const { isAuthenticated, academicDetails } = useUser();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Topics & Chapters</h1>
              <p className="text-muted-foreground">
                Explore all subjects and track your progress
              </p>
            </div>
          </div>

          {academicDetails && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-secondary-foreground">
                Class {academicDetails.classGrade} • {academicDetails.board.toUpperCase()} Board
              </span>
            </div>
          )}
        </motion.div>

        {/* Subjects */}
        {academicDetails ? (
          <SubjectsSection expanded />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              No subjects yet
            </h2>
            <p className="text-muted-foreground mb-6">
              Complete your academic details on the dashboard to see your subjects
            </p>
            <button
              onClick={() => navigate('/home')}
              className="text-primary font-medium hover:underline"
            >
              Go to Dashboard →
            </button>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Topics;
