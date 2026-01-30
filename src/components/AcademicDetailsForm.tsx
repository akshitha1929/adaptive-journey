import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useUser, AcademicDetails } from '@/contexts/UserContext';
import { GraduationCap, Check, ChevronRight } from 'lucide-react';

const classes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

const boards = [
  { value: 'state', label: 'State Board' },
  { value: 'cbse', label: 'CBSE' },
  { value: 'icse', label: 'ICSE' },
];

const states = [
  'Andhra Pradesh', 'Bihar', 'Gujarat', 'Karnataka', 'Kerala',
  'Maharashtra', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal',
];

const languages = [
  'Hindi', 'English', 'Bengali', 'Telugu', 'Marathi', 'Tamil',
  'Kannada', 'Malayalam', 'Gujarati', 'Punjabi', 'Odia', 'Sanskrit', 'French', 'German',
];

const electives = {
  academic: ['Computer Science', 'Economics', 'Physical Education', 'Psychology', 'Fine Arts'],
  extracurricular: ['Music', 'Dance', 'Drama', 'Debate', 'Sports'],
};

interface AcademicDetailsFormProps {
  onComplete: () => void;
}

export const AcademicDetailsForm = ({ onComplete }: AcademicDetailsFormProps) => {
  const { setAcademicDetails, updateProgress } = useUser();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<AcademicDetails>({
    classGrade: '',
    board: '',
    state: '',
    firstLanguage: '',
    secondLanguage: '',
    thirdLanguage: '',
    electives: [],
  });

  const classNum = parseInt(formData.classGrade) || 0;

  // Determine number of languages based on board and class
  const getLanguageCount = () => {
    if (formData.board === 'icse') return 1;
    if (formData.board === 'cbse') {
      if (classNum <= 8) return 3;
      if (classNum <= 10) return 2;
      return 1;
    }
    if (formData.board === 'state') return 3;
    return 3;
  };

  const languageCount = getLanguageCount();

  // Set English as default for CBSE
  useEffect(() => {
    if (formData.board === 'cbse' || formData.board === 'icse') {
      setFormData(prev => ({ ...prev, firstLanguage: 'English' }));
    }
  }, [formData.board]);

  const handleElectiveToggle = (elective: string) => {
    setFormData(prev => ({
      ...prev,
      electives: prev.electives.includes(elective)
        ? prev.electives.filter(e => e !== elective)
        : [...prev.electives, elective],
    }));
  };

  const handleSubmit = () => {
    setAcademicDetails(formData);
    // Set some initial progress
    updateProgress({
      totalChapters: 50,
      completedChapters: 0,
      streakDays: 1,
    });
    onComplete();
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.classGrade && formData.board;
      case 2:
        if (formData.board === 'state') {
          return formData.state && formData.firstLanguage;
        }
        return formData.firstLanguage;
      case 3:
        return true; // Electives are optional
      default:
        return false;
    }
  };

  return (
    <div className="bg-card rounded-2xl p-8 shadow-elevated">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
          <GraduationCap className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-card-foreground">Academic Details</h2>
          <p className="text-sm text-muted-foreground">
            Help us personalize your learning experience
          </p>
        </div>
      </div>

      {/* Progress steps */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                step > s
                  ? 'bg-success text-success-foreground'
                  : step === s
                  ? 'gradient-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {step > s ? <Check className="w-4 h-4" /> : s}
            </div>
            {s < 3 && (
              <div
                className={`w-12 h-1 mx-2 rounded ${
                  step > s ? 'bg-success' : 'bg-muted'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Class and Board */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-foreground font-medium mb-2 block">Class / Grade</Label>
              <Select
                value={formData.classGrade}
                onValueChange={(value) => setFormData({ ...formData, classGrade: value })}
              >
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Select your class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((c) => (
                    <SelectItem key={c} value={c}>
                      Class {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-foreground font-medium mb-2 block">Education Board</Label>
              <Select
                value={formData.board}
                onValueChange={(value) =>
                  setFormData({ ...formData, board: value as AcademicDetails['board'] })
                }
              >
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Select your board" />
                </SelectTrigger>
                <SelectContent>
                  {boards.map((b) => (
                    <SelectItem key={b.value} value={b.value}>
                      {b.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {formData.board === 'state' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              <Label className="text-foreground font-medium mb-2 block">State</Label>
              <Select
                value={formData.state}
                onValueChange={(value) => setFormData({ ...formData, state: value })}
              >
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Select your state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Step 2: Languages */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="bg-secondary/50 rounded-lg p-4 mb-4">
            <p className="text-sm text-secondary-foreground">
              {formData.board === 'icse'
                ? 'ICSE requires only English as the language subject.'
                : formData.board === 'cbse' && classNum > 10
                ? 'For classes above 10th in CBSE, only English is required.'
                : `Based on your selection, you can choose ${languageCount} language${languageCount > 1 ? 's' : ''}.`}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label className="text-foreground font-medium mb-2 block">First Language</Label>
              <Select
                value={formData.firstLanguage}
                onValueChange={(value) => setFormData({ ...formData, firstLanguage: value })}
                disabled={formData.board === 'cbse' || formData.board === 'icse'}
              >
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((l) => (
                    <SelectItem key={l} value={l}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {languageCount >= 2 && (
              <div>
                <Label className="text-foreground font-medium mb-2 block">Second Language</Label>
                <Select
                  value={formData.secondLanguage}
                  onValueChange={(value) => setFormData({ ...formData, secondLanguage: value })}
                >
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages
                      .filter((l) => l !== formData.firstLanguage)
                      .map((l) => (
                        <SelectItem key={l} value={l}>
                          {l}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {languageCount >= 3 && (
              <div>
                <Label className="text-foreground font-medium mb-2 block">Third Language</Label>
                <Select
                  value={formData.thirdLanguage}
                  onValueChange={(value) => setFormData({ ...formData, thirdLanguage: value })}
                >
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages
                      .filter(
                        (l) => l !== formData.firstLanguage && l !== formData.secondLanguage
                      )
                      .map((l) => (
                        <SelectItem key={l} value={l}>
                          {l}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Step 3: Electives */}
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <p className="text-muted-foreground">
            Select any additional subjects or activities you'd like to learn (optional)
          </p>

          <div>
            <h4 className="font-medium text-foreground mb-3">Academic Electives</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {electives.academic.map((e) => (
                <label
                  key={e}
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.electives.includes(e)
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <Checkbox
                    checked={formData.electives.includes(e)}
                    onCheckedChange={() => handleElectiveToggle(e)}
                  />
                  <span className="text-sm font-medium text-foreground">{e}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-3">Extracurricular Activities</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {electives.extracurricular.map((e) => (
                <label
                  key={e}
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.electives.includes(e)
                      ? 'border-accent bg-accent/5'
                      : 'border-border hover:border-accent/50'
                  }`}
                >
                  <Checkbox
                    checked={formData.electives.includes(e)}
                    onCheckedChange={() => handleElectiveToggle(e)}
                  />
                  <span className="text-sm font-medium text-foreground">{e}</span>
                </label>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-8 pt-6 border-t border-border">
        <Button
          variant="ghost"
          onClick={() => setStep(step - 1)}
          disabled={step === 1}
          className="text-muted-foreground"
        >
          Back
        </Button>

        {step < 3 ? (
          <Button
            onClick={() => setStep(step + 1)}
            disabled={!canProceed()}
            className="gradient-primary text-primary-foreground"
          >
            Continue
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            className="gradient-primary text-primary-foreground"
          >
            Complete Setup
            <Check className="w-4 h-4 ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
};
