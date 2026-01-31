import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Play } from 'lucide-react';
import { Subtopic } from '@/types/subjects';
import { Button } from '@/components/ui/button';

interface SubtopicCardProps {
  subtopic: Subtopic;
  onMarkComplete: (id: string) => void;
  index: number;
}

export const SubtopicCard = ({ subtopic, onMarkComplete, index }: SubtopicCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-background border border-border rounded-xl p-5 space-y-4"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          {subtopic.completed ? (
            <CheckCircle2 className="w-5 h-5 text-success mt-0.5 shrink-0" />
          ) : (
            <Circle className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
          )}
          <div className="space-y-1">
            <h4 className={`font-semibold ${subtopic.completed ? 'text-success' : 'text-foreground'}`}>
              {subtopic.title}
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {subtopic.explanation}
            </p>
          </div>
        </div>
        
        {subtopic.completed && (
          <span className="text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-full shrink-0">
            Completed ✓
          </span>
        )}
      </div>

      {/* Video Placeholder Section */}
      <div className="relative">
        <div 
          className="w-full aspect-video bg-muted/50 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center gap-3 hover:border-primary/50 hover:bg-muted/70 transition-colors"
          role="region"
          aria-label="Video embed area"
        >
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
            <Play className="w-6 h-6 text-primary ml-1" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-muted-foreground">Video Embed Area</p>
            <p className="text-xs text-muted-foreground/70">Paste video link or embed code here</p>
          </div>
        </div>
        
        {/* iframe-compatible container hint */}
        <div className="absolute bottom-2 right-2 text-[10px] text-muted-foreground/50 bg-background/80 px-2 py-0.5 rounded">
          iframe-ready
        </div>
      </div>

      {/* Mark as Complete Button */}
      {!subtopic.completed && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onMarkComplete(subtopic.id)}
          className="w-full sm:w-auto"
        >
          <CheckCircle2 className="w-4 h-4 mr-2" />
          Mark as Completed
        </Button>
      )}
    </motion.div>
  );
};
