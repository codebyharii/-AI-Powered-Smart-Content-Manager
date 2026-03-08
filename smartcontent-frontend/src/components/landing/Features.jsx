import { motion } from 'framer-motion';
import { Sparkles, Target, Zap, Shield, BarChart, Users } from 'lucide-react';
import Card from '../common/Card';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Writing',
    description: 'Generate summaries, tags, and optimize content with advanced AI algorithms.',
    color: 'blue',
  },
  {
    icon: Target,
    title: 'SEO Optimization',
    description: 'Real-time SEO scoring and actionable suggestions to boost your rankings.',
    color: 'green',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Create and publish content in seconds with our intuitive interface.',
    color: 'yellow',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Enterprise-grade security with role-based access control.',
    color: 'red',
  },
  {
    icon: BarChart,
    title: 'Analytics',
    description: 'Track performance metrics and gain insights into your content.',
    color: 'blue',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Work together seamlessly with your team members.',
    color: 'green',
  },
];

const colorClasses = {
  blue: 'text-google-blue bg-blue-100 dark:bg-blue-900/20',
  green: 'text-google-green bg-green-100 dark:bg-green-900/20',
  red: 'text-google-red bg-red-100 dark:bg-red-900/20',
  yellow: 'text-google-yellow bg-yellow-100 dark:bg-yellow-900/20',
};

const glowClasses = {
  blue: 'hover:shadow-glow-blue',
  green: 'hover:shadow-glow-green',
  red: 'hover:shadow-glow-red',
  yellow: 'hover:shadow-glow-yellow',
};

const FeatureCard = ({ feature, index }) => {
  const [ref, isVisible] = useScrollReveal({ once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className={`h-full p-6 ${glowClasses[feature.color]} transition-all duration-300 cursor-pointer hover:-translate-y-1`}>
        <div className={`p-3 rounded-lg w-fit mb-4 ${colorClasses[feature.color]}`}>
          <feature.icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-light-text dark:text-dark-text">
          {feature.title}
        </h3>
        <p className="text-light-muted dark:text-dark-muted">
          {feature.description}
        </p>
      </Card>
    </motion.div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4 text-light-text dark:text-dark-text"
          >
            Everything You Need
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-light-muted dark:text-dark-muted max-w-2xl mx-auto"
          >
            Powerful features to help you create, manage, and optimize your content.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
