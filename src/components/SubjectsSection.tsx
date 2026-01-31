import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/contexts/UserContext';
import { ChevronDown } from 'lucide-react';
import { Subject, colorMap } from '@/types/subjects';
import { getSubjects } from '@/data/subjectsData';
import { ChapterSection } from './ChapterSection';

interface SubjectsSectionProps {
  expanded?: boolean;
}

export const SubjectsSection = ({ expanded = false }: SubjectsSectionProps) => {
  const { academicDetails } = useUser();
  
  // Initialize subjects with state for progress tracking
  const [subjects, setSubjects] = useState<Subject[]>(() => {
    if (!academicDetails) return [];
    return getSubjects(
      academicDetails.classGrade,
      academicDetails.board,
      academicDetails.electives
    );
  });
  
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>(
    expanded ? ['Mathematics'] : []
  );

  // Handle marking subtopic as complete
  const handleSubtopicComplete = useCallback((subjectName: string, chapterId: string, subtopicId: string) => {
    setSubjects(prevSubjects => 
      prevSubjects.map(subject => {
        if (subject.name !== subjectName) return subject;
        
        return {
          ...subject,
          chapters: subject.chapters.map(chapter => {
            if (chapter.id !== chapterId) return chapter;
            
            const updatedSubtopics = chapter.subtopics.map(subtopic =>
              subtopic.id === subtopicId 
                ? { ...subtopic, completed: true }
                : subtopic
            );
            
            const allComplete = updatedSubtopics.every(s => s.completed);
            
            return {
              ...chapter,
              subtopics: updatedSubtopics,
              completed: allComplete,
            };
          }),
        };
      })
    );
  }, []);

  const toggleSubject = (name: string) => {
    setExpandedSubjects((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
  };

  if (!academicDetails || subjects.length === 0) return null;

  return (
    <div className="space-y-4">
      {subjects.map((subject, index) => {
        const isExpanded = expandedSubjects.includes(subject.name);
        
        // Calculate overall progress for subject
        const totalSubtopics = subject.chapters.reduce(
          (acc, ch) => acc + ch.subtopics.length, 0
        );
        const completedSubtopics = subject.chapters.reduce(
          (acc, ch) => acc + ch.subtopics.filter(s => s.completed).length, 0
        );
        const progress = totalSubtopics > 0 
          ? (completedSubtopics / totalSubtopics) * 100 
          : 0;

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
                    colorMap[subject.color as keyof typeof colorMap]
                  }`}
                >
                  {subject.icon}
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-card-foreground">{subject.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {completedSubtopics}/{totalSubtopics} subtopics • {subject.chapters.length} chapters
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
                  <p className="text-xs text-muted-foreground text-right mt-1">
                    {Math.round(progress)}%
                  </p>
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
                    <div className="border-t border-border pt-4 space-y-3">
                      {subject.chapters.map((chapter, i) => (
                        <ChapterSection
                          key={chapter.id}
                          chapter={chapter}
                          index={i}
                          onSubtopicComplete={(chapterId, subtopicId) => 
                            handleSubtopicComplete(subject.name, chapterId, subtopicId)
                          }
                        />
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
