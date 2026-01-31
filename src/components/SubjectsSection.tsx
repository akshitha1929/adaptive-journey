import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/contexts/UserContext';
import { ChevronDown, BookOpen, CheckCircle2, Circle, Lock } from 'lucide-react';

interface Chapter {
  id: string;
  name: string;
  completed: boolean;
  locked: boolean;
}

interface Subject {
  name: string;
  icon: string;
  color: string;
  chapters: Chapter[];
}

// Generate subjects based on academic details
const getSubjects = (classGrade: string, board: string, electives: string[]): Subject[] => {
  const classNum = parseInt(classGrade) || 0;
  const baseSubjects: Subject[] = [];

  // Core subjects - all chapters start as not completed for first-time users
  baseSubjects.push({
    name: 'Mathematics',
    icon: '📐',
    color: 'primary',
    chapters: [
      { id: 'math-1', name: 'Number Systems', completed: false, locked: false },
      { id: 'math-2', name: 'Algebra Basics', completed: false, locked: false },
      { id: 'math-3', name: 'Geometry', completed: false, locked: false },
      { id: 'math-4', name: 'Statistics', completed: false, locked: true },
      { id: 'math-5', name: 'Probability', completed: false, locked: true },
    ],
  });

  baseSubjects.push({
    name: 'Science',
    icon: '🔬',
    color: 'accent',
    chapters: [
      { id: 'sci-1', name: 'Matter and Materials', completed: false, locked: false },
      { id: 'sci-2', name: 'Living World', completed: false, locked: false },
      { id: 'sci-3', name: 'Motion and Force', completed: false, locked: false },
      { id: 'sci-4', name: 'Energy', completed: false, locked: true },
    ],
  });

  baseSubjects.push({
    name: 'English',
    icon: '📖',
    color: 'highlight',
    chapters: [
      { id: 'eng-1', name: 'Reading Comprehension', completed: false, locked: false },
      { id: 'eng-2', name: 'Grammar Essentials', completed: false, locked: false },
      { id: 'eng-3', name: 'Writing Skills', completed: false, locked: false },
      { id: 'eng-4', name: 'Literature', completed: false, locked: true },
    ],
  });

  // Social Studies for lower classes
  if (classNum <= 10) {
    baseSubjects.push({
      name: 'Social Studies',
      icon: '🌍',
      color: 'success',
      chapters: [
        { id: 'sst-1', name: 'History: Ancient Civilizations', completed: false, locked: false },
        { id: 'sst-2', name: 'Geography: Our Earth', completed: false, locked: false },
        { id: 'sst-3', name: 'Civics: Democracy', completed: false, locked: true },
      ],
    });
  }

  // Add electives
  electives.forEach((elective) => {
    if (elective === 'Computer Science') {
      baseSubjects.push({
        name: 'Computer Science',
        icon: '💻',
        color: 'primary',
        chapters: [
          { id: 'cs-1', name: 'Introduction to Programming', completed: false, locked: false },
          { id: 'cs-2', name: 'Web Basics', completed: false, locked: false },
          { id: 'cs-3', name: 'Data Handling', completed: false, locked: true },
        ],
      });
    }
    if (elective === 'Music') {
      baseSubjects.push({
        name: 'Music',
        icon: '🎵',
        color: 'accent',
        chapters: [
          { id: 'mus-1', name: 'Basic Notes & Rhythm', completed: false, locked: false },
          { id: 'mus-2', name: 'Instrument Basics', completed: false, locked: false },
        ],
      });
    }
  });

  return baseSubjects;
};

const colorMap: Record<string, string> = {
  primary: 'bg-primary/10 text-primary border-primary/30',
  accent: 'bg-accent/10 text-accent border-accent/30',
  highlight: 'bg-highlight/10 text-highlight border-highlight/30',
  success: 'bg-success/10 text-success border-success/30',
};

interface SubjectsSectionProps {
  expanded?: boolean;
}

export const SubjectsSection = ({ expanded = false }: SubjectsSectionProps) => {
  const { academicDetails } = useUser();
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>(
    expanded ? ['Mathematics'] : []
  );

  if (!academicDetails) return null;

  const subjects = getSubjects(
    academicDetails.classGrade,
    academicDetails.board,
    academicDetails.electives
  );

  const toggleSubject = (name: string) => {
    setExpandedSubjects((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
  };

  return (
    <div className="space-y-4">
      {subjects.map((subject, index) => {
        const isExpanded = expandedSubjects.includes(subject.name);
        const completedCount = subject.chapters.filter((c) => c.completed).length;
        const progress = (completedCount / subject.chapters.length) * 100;

        return (
          <motion.div
            key={subject.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-2xl shadow-card overflow-hidden"
          >
            {/* Subject header */}
            <button
              onClick={() => toggleSubject(subject.name)}
              className="w-full p-5 flex items-center justify-between hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                    colorMap[subject.color]
                  }`}
                >
                  {subject.icon}
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-card-foreground">{subject.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {completedCount}/{subject.chapters.length} chapters completed
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Progress bar */}
                <div className="hidden sm:block w-32">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full gradient-primary rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                </motion.div>
              </div>
            </button>

            {/* Chapters list */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5">
                    <div className="border-t border-border pt-4 space-y-2">
                      {subject.chapters.map((chapter, i) => (
                        <motion.div
                          key={chapter.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                            chapter.locked
                              ? 'bg-muted/30 opacity-60'
                              : chapter.completed
                              ? 'bg-success/10'
                              : 'bg-background hover:bg-muted/50 cursor-pointer'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {chapter.completed ? (
                              <CheckCircle2 className="w-5 h-5 text-success" />
                            ) : chapter.locked ? (
                              <Lock className="w-5 h-5 text-muted-foreground" />
                            ) : (
                              <Circle className="w-5 h-5 text-muted-foreground" />
                            )}
                            <span
                              className={`font-medium ${
                                chapter.locked
                                  ? 'text-muted-foreground'
                                  : chapter.completed
                                  ? 'text-success'
                                  : 'text-foreground'
                              }`}
                            >
                              {chapter.name}
                            </span>
                          </div>

                          {!chapter.locked && !chapter.completed && (
                            <button className="px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors">
                              Start
                            </button>
                          )}
                          {chapter.completed && (
                            <span className="text-sm text-success font-medium">Completed ✓</span>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};
