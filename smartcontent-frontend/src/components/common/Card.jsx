import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  hover = false,
  onClick,
  ...props 
}) => {
  const Component = onClick ? motion.button : motion.div;
  
  return (
    <Component
      className={`card ${hover ? 'card-hover cursor-pointer' : ''} p-6 ${className}`}
      onClick={onClick}
      whileHover={hover ? { y: -4 } : {}}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Card;
