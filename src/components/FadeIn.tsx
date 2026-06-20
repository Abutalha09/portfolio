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
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  as = 'div',
  className = '',
  id,
}) => {
  // Memoize so motion.create() is NOT called on every re-render.
  // Without this, every parent state change (e.g. isPlaying) would create a
  // brand-new component type, causing Framer Motion to reset the animation
  // to opacity:0 — producing the "blink / flash black" bug.
  const MotionComponent = useMemo(() => motion.create(as as any), [as]);

  return (
    <MotionComponent
      id={id}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{
        delay,
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
};

export default FadeIn;
