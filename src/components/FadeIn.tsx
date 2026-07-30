import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  id?: string;
  blur?: boolean;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.85,
  x = 0,
  y = 35,
  as = 'div',
  className = '',
  id,
  blur = true,
}) => {
  // Memoize motion component creation
  const MotionComponent = useMemo(() => motion.create(as as any), [as]);

  return (
    <MotionComponent
      id={id}
      initial={{
        opacity: 0,
        x,
        y,
        filter: blur ? 'blur(14px)' : 'blur(0px)',
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        filter: 'blur(0px)',
      }}
      viewport={{ once: false, margin: '-30px', amount: 0.1 }}
      transition={{
        delay,
        duration,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
};

export default FadeIn;
