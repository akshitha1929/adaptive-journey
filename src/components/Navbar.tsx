import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, LayoutDashboard, BookOpen, User, LogOut } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, setIsAuthenticated, setIsOnboarded } = useUser();

  const navItems = [
    { path: '/home', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/topics', label: 'Topics', icon: BookOpen },
  ];

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsOnboarded(false);
    navigate('/');
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/home" className="flex items-center gap-3">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">LearnEase</span>
          </Link>

          {/* Navigation items */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User menu */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-2 bg-card rounded-lg">
              <div className="w-8 h-8 gradient-accent rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-accent-foreground" />
              </div>
              <span className="text-sm font-medium text-card-foreground hidden sm:block">
                {profile?.name?.split(' ')[0] || 'Learner'}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-muted-foreground hover:text-destructive transition-colors"
              title="Sign out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
