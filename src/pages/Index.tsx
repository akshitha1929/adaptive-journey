import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, BookOpen, Brain, Heart } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-highlight/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex flex-col">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center shadow-soft">
              <Brain className="w-7 h-7 text-primary-foreground" />
            </div>
            <span className="text-2xl font-semibold text-foreground">LearnEase</span>
          </div>
        </motion.header>

        {/* Main content */}
        <main className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 py-12">
          {/* Left side - Hero content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1 max-w-xl text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-secondary-foreground">
                Designed for every mind
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Learn at{' '}
              <span className="text-primary">your pace</span>,{' '}
              <span className="text-accent">your way</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              A personalized learning journey crafted just for you. We adapt to your unique 
              learning style and make education accessible, engaging, and fun.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-10">
              {[
                { icon: BookOpen, text: 'Self-paced' },
                { icon: Brain, text: 'Adaptive' },
                { icon: Heart, text: 'Accessible' },
              ].map((feature, i) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg shadow-card"
                >
                  <feature.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-card-foreground">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                className="gradient-primary text-primary-foreground shadow-soft hover:shadow-elevated transition-all duration-300 text-lg px-8 py-6"
                onClick={() => navigate('/auth?mode=signup')}
              >
                Get Started Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-card border-border text-card-foreground hover:bg-muted transition-all duration-300 text-lg px-8 py-6"
                onClick={() => navigate('/auth?mode=login')}
              >
                Sign In
              </Button>
            </motion.div>
          </motion.div>

          {/* Right side - Illustration cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex-1 max-w-md relative"
          >
            <div className="relative">
              {/* Main card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="bg-card rounded-2xl p-8 shadow-elevated"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 gradient-accent rounded-xl flex items-center justify-center">
                    <span className="text-3xl">🎯</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground">Start Your Journey</h3>
                    <p className="text-sm text-muted-foreground">Personalized learning awaits</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-background rounded-lg p-4 flex items-center gap-3">
                    <span className="text-2xl">📚</span>
                    <span className="text-sm font-medium text-foreground">Learn subjects your way</span>
                  </div>

                  <div className="bg-background rounded-lg p-4 flex items-center gap-3">
                    <span className="text-2xl">🧠</span>
                    <span className="text-sm font-medium text-foreground">Adaptive to your pace</span>
                  </div>

                  <div className="bg-background rounded-lg p-4 flex items-center gap-3">
                    <span className="text-2xl">🌟</span>
                    <span className="text-sm font-medium text-foreground">Track your achievements</span>
                  </div>
                </div>
              </motion.div>

              {/* Floating emoji */}
              <motion.div
                animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 -left-6 text-5xl"
              >
                ✨
              </motion.div>
            </div>
          </motion.div>
        </main>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center py-6"
        >
          <p className="text-sm text-muted-foreground">
            Made with ❤️ for unique learners everywhere
          </p>
        </motion.footer>
      </div>
    </div>
  );
};

export default Index;
