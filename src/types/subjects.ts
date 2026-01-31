export interface Subtopic {
  id: string;
  title: string;
  explanation: string;
  completed: boolean;
  videoEmbedId?: string; // For future video embedding
}

export interface Chapter {
  id: string;
  name: string;
  completed: boolean;
  locked: boolean;
  subtopics: Subtopic[];
}

export interface Subject {
  name: string;
  icon: string;
  color: string;
  chapters: Chapter[];
}

export type SubjectColor = 'primary' | 'accent' | 'highlight' | 'success';

export const colorMap: Record<SubjectColor, string> = {
  primary: 'bg-primary/10 text-primary border-primary/30',
  accent: 'bg-accent/10 text-accent border-accent/30',
  highlight: 'bg-highlight/10 text-highlight border-highlight/30',
  success: 'bg-success/10 text-success border-success/30',
};
