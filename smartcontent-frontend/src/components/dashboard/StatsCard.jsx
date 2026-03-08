import { motion } from 'framer-motion';
import Card from '../common/Card';

const StatsCard = ({ icon: Icon, label, value, change, index, color = 'blue' }) => {
  const isPositive = change >= 0;

  const colorClasses = {
    blue: 'text-google-blue bg-blue-100 dark:bg-blue-900/20',
    green: 'text-google-green bg-green-100 dark:bg-green-900/20',
    red: 'text-google-red bg-red-100 dark:bg-red-900/20',
    yellow: 'text-google-yellow bg-yellow-100 dark:bg-yellow-900/20',
  };

  const glowClasses = {
    blue: 'shadow-glow-blue',
    green: 'shadow-glow-green',
    red: 'shadow-glow-red',
    yellow: 'shadow-glow-yellow',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <Card className={`p-6 cursor-pointer hover:${glowClasses[color]} transition-all duration-300`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-light-muted dark:text-dark-muted mb-1 font-medium">
              {label}
            </p>
            <p className="text-3xl font-bold text-light-text dark:text-dark-text">
              {value}
            </p>
            {change !== undefined && (
              <div className="flex items-center gap-1 mt-2">
                <span className={`text-sm font-medium ${isPositive ? 'text-google-green' : 'text-google-red'}`}>
                  {isPositive ? '+' : ''}{change}%
                </span>
                <span className="text-xs text-light-muted dark:text-dark-muted">
                  vs last month
                </span>
              </div>
            )}
          </div>
          <div className={`p-4 rounded-xl ${colorClasses[color]} transition-all duration-300`}>
            <Icon className="w-8 h-8" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default StatsCard;
