import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUser } from '@/contexts/UserContext';
import { Brain, Eye, EyeOff, ArrowLeft, Mail, Lock, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState<'login' | 'signup'>(
    searchParams.get('mode') === 'signup' ? 'signup' : 'login'
  );
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { setIsAuthenticated, setProfile, isOnboarded } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    setMode(searchParams.get('mode') === 'signup' ? 'signup' : 'login');
  }, [searchParams]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (mode === 'signup' && !formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Please enter your password';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsAuthenticated(true);

    if (mode === 'signup') {
      setProfile({
        name: formData.name,
        email: formData.email,
        favoriteMovie: '',
        favoriteGame: '',
        favoriteFood: '',
        favoriteSeason: '',
        favoriteSubject: '',
      });
      toast({
        title: 'Welcome to LearnEase! 🎉',
        description: "Let's personalize your learning experience",
      });
      navigate('/onboarding');
    } else {
      // Sign in goes directly to home, skip onboarding
      navigate('/home');
      toast({
        title: 'Welcome back! 👋',
        description: 'Ready to continue learning?',
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - decorative */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-40 h-40 bg-primary-foreground/10 rounded-full blur-2xl" />
          <div className="absolute bottom-40 right-20 w-60 h-60 bg-primary-foreground/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col justify-center p-12 text-primary-foreground">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              {mode === 'signup' ? 'Start your journey' : 'Continue learning'}
            </h2>
            <p className="text-lg opacity-90 leading-relaxed max-w-md">
              {mode === 'signup'
                ? 'Join thousands of learners who are discovering their unique path to knowledge.'
                : 'Pick up right where you left off. Your personalized learning awaits.'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 max-w-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                <span className="text-xl">💡</span>
              </div>
              <span className="font-medium">Did you know?</span>
            </div>
            <p className="text-sm opacity-80">
              Our adaptive system adjusts to your learning pace automatically, making sure you never feel overwhelmed or bored.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right side - form */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="p-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </header>

        {/* Form container */}
        <div className="flex-1 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center shadow-soft">
                <Brain className="w-7 h-7 text-primary-foreground" />
              </div>
              <span className="text-2xl font-semibold text-foreground">LearnEase</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {mode === 'signup' ? 'Create your account' : 'Welcome back'}
            </h1>
            <p className="text-muted-foreground mb-8">
              {mode === 'signup'
                ? 'Start your personalized learning journey'
                : 'Sign in to continue learning'}
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <AnimatePresence mode="wait">
                {mode === 'signup' && (
                  <motion.div
                    key="name"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Label htmlFor="name" className="text-foreground font-medium">
                      Your Name
                    </Label>
                    <div className="relative mt-2">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="pl-12 py-6 bg-card border-border text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                    {errors.name && (
                      <p className="text-destructive text-sm mt-1">{errors.name}</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <Label htmlFor="email" className="text-foreground font-medium">
                  Email
                </Label>
                <div className="relative mt-2">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-12 py-6 bg-card border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                {errors.email && (
                  <p className="text-destructive text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <Label htmlFor="password" className="text-foreground font-medium">
                  Password
                </Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-12 pr-12 py-6 bg-card border-border text-foreground placeholder:text-muted-foreground"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-destructive text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className="w-full gradient-primary text-primary-foreground shadow-soft hover:shadow-elevated transition-all duration-300 py-6 text-lg"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                    />
                    {mode === 'signup' ? 'Creating account...' : 'Signing in...'}
                  </span>
                ) : mode === 'signup' ? (
                  'Create Account'
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            {/* Toggle mode */}
            <p className="text-center text-muted-foreground mt-8">
              {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
                className="text-primary font-medium hover:underline"
              >
                {mode === 'signup' ? 'Sign in' : 'Sign up'}
              </button>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
