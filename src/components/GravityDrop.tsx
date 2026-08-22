import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface GravityDropProps {
  children: React.ReactNode;
  delay?: number;
  yDrop?: number;
  rotateDrop?: number;
  className?: string;
  style?: React.CSSProperties;
  amount?: number;
  margin?: string;
  stiffness?: number;
  damping?: number;
  mass?: number;
  as?: keyof JSX.IntrinsicElements;
}

export const GravityDrop: React.FC<GravityDropProps> = ({
  children,
  delay = 0,
  yDrop = -70,
  rotateDrop = 0,
  className = '',
  style = {},
  amount = 0.15,
  margin = '-20px',
  stiffness = 240,
  damping = 14,
  mass = 0.85,
  as = 'div',
}) => {
  const shouldReduceMotion = useReducedMotion();
  const MotionComponent = (motion[as as keyof typeof motion] || motion.div) as React.ElementType;

  if (shouldReduceMotion) {
    return (
      <MotionComponent
        className={className}
        style={style}
        initial={{ opacity: 0, y: 0, rotate: 0 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, amount, margin }}
        transition={{
          duration: 0.4,
          delay,
          ease: 'easeOut',
        }}
      >
        {children}
      </MotionComponent>
    );
  }

  return (
    <MotionComponent
      className={className}
      style={{
        willChange: 'transform, opacity',
        ...style,
      }}
      initial={{
        opacity: 0,
        y: yDrop,
        rotate: rotateDrop,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotate: 0,
      }}
      viewport={{
        once: true,
        amount,
        margin,
      }}
      transition={{
        y: {
          type: 'spring',
          stiffness,
          damping,
          mass,
          delay,
        },
        rotate: {
          type: 'spring',
          stiffness: stiffness * 0.8,
          damping: damping * 1.1,
          delay,
        },
        opacity: {
          duration: 0.35,
          ease: 'easeOut',
          delay,
        },
      }}
    >
      {children}
    </MotionComponent>
  );
};

export default GravityDrop;
