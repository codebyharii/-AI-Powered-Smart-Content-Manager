import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import Button from '../common/Button';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-google-blue/30 text-google-blue text-sm font-medium shadow-glow-blue">
              <Sparkles className="w-4 h-4" />
              AI-Powered Content Management
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-light-text dark:text-dark-text"
          >
            Create Content That
            <span className="text-gradient block mt-2">Converts & Ranks</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-light-muted dark:text-dark-muted mb-10 max-w-2xl mx-auto"
          >
            Leverage AI to write, optimize, and manage your content. 
            Automated summaries, SEO scoring, and intelligent tagging—all in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/register">
              <Button size="lg" variant="primary" className="group">
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">
                View Demo
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto"
          >
            {[
              { value: '10K+', label: 'Articles Created', color: 'google-blue' },
              { value: '5K+', label: 'Active Users', color: 'google-green' },
              { value: '99%', label: 'Satisfaction', color: 'google-yellow' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-3xl font-bold text-${stat.color} mb-1`}>
                  {stat.value}
                </div>
                <div className="text-sm text-light-muted dark:text-dark-muted">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-google-blue rounded-full blur-3xl opacity-20 animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-google-green rounded-full blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }} />
    </section>
  );
};

export default Hero;
