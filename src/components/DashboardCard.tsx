import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  delay?: number;
}

export const DashboardCard = ({ title, icon: Icon, children, delay = 0 }: DashboardCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-card rounded-2xl p-6 shadow-card hover:shadow-elevated transition-shadow duration-300"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <h3 className="font-semibold text-card-foreground">{title}</h3>
      </div>
      {children}
    </motion.div>
  );
};
