import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Lock, CheckCircle2, Circle, BookOpen } from 'lucide-react';
import { Chapter, Subtopic } from '@/types/subjects';
import { SubtopicCard } from './SubtopicCard';

interface ChapterSectionProps {
  chapter: Chapter;
  index: number;
  onSubtopicComplete: (chapterId: string, subtopicId: string) => void;
}

export const ChapterSection = ({ chapter, index, onSubtopicComplete }: ChapterSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const completedSubtopics = chapter.subtopics.filter(s => s.completed).length;
  const totalSubtopics = chapter.subtopics.length;
  const progress = totalSubtopics > 0 ? (completedSubtopics / totalSubtopics) * 100 : 0;
  const isChapterComplete = completedSubtopics === totalSubtopics && totalSubtopics > 0;

  const handleMarkComplete = (subtopicId: string) => {
    onSubtopicComplete(chapter.id, subtopicId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`rounded-xl overflow-hidden border ${
        chapter.locked 
          ? 'bg-muted/20 border-border/50' 
          : isChapterComplete
          ? 'bg-success/5 border-success/30'
          : 'bg-card border-border'
      }`}
    >
      {/* Chapter Header */}
      <button
        onClick={() => !chapter.locked && setIsExpanded(!isExpanded)}
        disabled={chapter.locked}
        className={`w-full p-4 flex items-center justify-between transition-colors ${
          chapter.locked 
            ? 'cursor-not-allowed opacity-60' 
            : 'hover:bg-muted/30'
        }`}
      >
        <div className="flex items-center gap-3">
          {isChapterComplete ? (
            <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
          ) : chapter.locked ? (
            <Lock className="w-5 h-5 text-muted-foreground shrink-0" />
          ) : (
            <BookOpen className="w-5 h-5 text-primary shrink-0" />
          )}
          
          <div className="text-left">
            <span className={`font-medium ${
              chapter.locked 
                ? 'text-muted-foreground' 
                : isChapterComplete 
                ? 'text-success' 
                : 'text-foreground'
            }`}>
              {chapter.name}
            </span>
            <p className="text-xs text-muted-foreground mt-0.5">
              {completedSubtopics}/{totalSubtopics} subtopics completed
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Mini progress bar */}
          {!chapter.locked && (
            <div className="hidden sm:block w-20">
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
          
          {!chapter.locked && (
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </motion.div>
          )}
        </div>
      </button>

      {/* Subtopics List */}
      <AnimatePresence>
        {isExpanded && !chapter.locked && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3 border-t border-border pt-4">
              {chapter.subtopics.map((subtopic, i) => (
                <SubtopicCard
                  key={subtopic.id}
                  subtopic={subtopic}
                  onMarkComplete={handleMarkComplete}
                  index={i}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
