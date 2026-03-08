import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const Loading = ({ fullScreen = false, text = 'Loading...' }) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-light-bg dark:bg-dark-bg z-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-light-accent dark:text-dark-accent mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">{text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      <Loader2 className="w-8 h-8 animate-spin text-light-accent dark:text-dark-accent" />
    </div>
  );
};

export const LoadingSkeleton = ({ count = 3 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          className="card p-6 animate-pulse"
        >
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4" />
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2" />
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-5/6" />
        </motion.div>
      ))}
    </div>
  );
};

export default Loading;
