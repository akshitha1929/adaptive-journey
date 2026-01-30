import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUser } from '@/contexts/UserContext';
import { Brain, ArrowRight, ArrowLeft, Sparkles, Check } from 'lucide-react';

interface Question {
  id: keyof typeof questionFields;
  question: string;
  type: 'fill' | 'choice';
  options?: string[];
  placeholder?: string;
  emoji: string;
}

const questionFields = {
  favoriteMovie: 'favoriteMovie',
  favoriteGame: 'favoriteGame',
  favoriteFood: 'favoriteFood',
  favoriteSeason: 'favoriteSeason',
  favoriteSubject: 'favoriteSubject',
} as const;

const questions: Question[] = [
  {
    id: 'favoriteMovie',
    question: 'What is your favorite movie?',
    type: 'fill',
    placeholder: 'e.g., The Lion King, Harry Potter...',
    emoji: '🎬',
  },
  {
    id: 'favoriteGame',
    question: 'What game do you enjoy playing the most?',
    type: 'fill',
    placeholder: 'e.g., Minecraft, Chess, Football...',
    emoji: '🎮',
  },
  {
    id: 'favoriteFood',
    question: 'What is your favorite food?',
    type: 'choice',
    options: ['Pizza', 'Biryani', 'Pasta', 'Ice Cream', 'Something else'],
    emoji: '🍕',
  },
  {
    id: 'favoriteSeason',
    question: 'Which season do you love the most?',
    type: 'choice',
    options: ['Summer ☀️', 'Monsoon 🌧️', 'Autumn 🍂', 'Winter ❄️'],
    emoji: '🌈',
  },
  {
    id: 'favoriteSubject',
    question: 'What subject interests you the most?',
    type: 'choice',
    options: ['Math', 'Science', 'English', 'History', 'Art', 'Music'],
    emoji: '📚',
  },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const { profile, setProfile, setIsOnboarded } = useUser();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({
    favoriteMovie: profile?.favoriteMovie || '',
    favoriteGame: profile?.favoriteGame || '',
    favoriteFood: profile?.favoriteFood || '',
    favoriteSeason: profile?.favoriteSeason || '',
    favoriteSubject: profile?.favoriteSubject || '',
  });
  const [customInput, setCustomInput] = useState('');

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: answer });
    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    }
  };

  const handleNext = () => {
    if (currentQuestion.type === 'fill') {
      if (!answers[currentQuestion.id].trim()) return;
    }
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setProfile({
      name: profile?.name || '',
      email: profile?.email || '',
      ...answers,
    } as any);
    setIsOnboarded(true);
    navigate('/home');
  };

  const isAnswered = answers[currentQuestion.id].trim() !== '';

  return (
    <div className="min-h-screen bg-background">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">LearnEase</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4" />
            <span>Personalizing your experience</span>
          </div>
        </header>

        {/* Progress bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-foreground">
              Question {currentStep + 1} of {questions.length}
            </span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% complete</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full gradient-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Question area */}
        <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              {/* Question card */}
              <div className="bg-card rounded-2xl p-8 shadow-elevated mb-8">
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', duration: 0.5 }}
                    className="text-6xl mb-6"
                  >
                    {currentQuestion.emoji}
                  </motion.div>
                  <h2 className="text-2xl md:text-3xl font-bold text-card-foreground leading-relaxed">
                    {currentQuestion.question}
                  </h2>
                </div>

                {/* Answer input */}
                {currentQuestion.type === 'fill' ? (
                  <div className="max-w-md mx-auto">
                    <Input
                      value={answers[currentQuestion.id]}
                      onChange={(e) =>
                        setAnswers({ ...answers, [currentQuestion.id]: e.target.value })
                      }
                      placeholder={currentQuestion.placeholder}
                      className="text-center text-lg py-6 bg-background border-border"
                      autoFocus
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {currentQuestion.options?.map((option) => {
                      const isSelected = answers[currentQuestion.id] === option;
                      const isOther = option === 'Something else';

                      if (isOther) {
                        return (
                          <div key={option} className="col-span-2 md:col-span-3">
                            <div className="flex gap-3">
                              <Input
                                value={customInput}
                                onChange={(e) => setCustomInput(e.target.value)}
                                placeholder="Type your own..."
                                className="flex-1 py-5 bg-background border-border"
                              />
                              <Button
                                variant="outline"
                                onClick={() => {
                                  if (customInput.trim()) {
                                    handleAnswer(customInput);
                                    setCustomInput('');
                                  }
                                }}
                                disabled={!customInput.trim()}
                                className="bg-card"
                              >
                                Add
                              </Button>
                            </div>
                          </div>
                        );
                      }

                      return (
                        <motion.button
                          key={option}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleAnswer(option)}
                          className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                            isSelected
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-border bg-background hover:border-primary/50 text-foreground'
                          }`}
                        >
                          <div className="flex items-center justify-center gap-2">
                            {isSelected && <Check className="w-5 h-5" />}
                            <span className="font-medium">{option}</span>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center">
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={!isAnswered}
                  className="gradient-primary text-primary-foreground shadow-soft hover:shadow-elevated px-8"
                >
                  {currentStep === questions.length - 1 ? 'Complete' : 'Next'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Answer summary dots */}
        <div className="flex justify-center gap-2 mt-8">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentStep
                  ? 'bg-primary w-6'
                  : answers[questions[index].id]
                  ? 'bg-success'
                  : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
