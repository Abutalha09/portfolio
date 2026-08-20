import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface PhysicsBallProps {
  top?: MotionValue<string> | string;
  opacity?: MotionValue<number> | number;
  progress?: MotionValue<number>;
  size?: number;
  className?: string;
}

export const PhysicsBall: React.FC<PhysicsBallProps> = ({
  top,
  opacity,
  progress,
  size = 28,
  className = '',
}) => {
  // If progress motion value is provided, rotate ball continuously as it rolls down the path
  const rollRotation = progress
    ? useTransform(progress, [0, 1], [0, 1080])
    : 0;

  return (
    <motion.div
      className={`absolute left-1/2 -translate-x-1/2 pointer-events-none z-20 ${className}`}
      style={{
        top: top as any,
        opacity: opacity as any,
        width: size,
        height: size,
      }}
    >
      {/* Outer ambient aura */}
      <div
        className="absolute -inset-2 rounded-full animate-ping opacity-35 pointer-events-none"
        style={{ background: 'var(--accent)' }}
      />

      {/* 3D Realistic Rolling Sphere */}
      <motion.div
        className="relative w-full h-full rounded-full shadow-2xl flex items-center justify-center overflow-hidden"
        style={{
          rotate: rollRotation,
          background: 'radial-gradient(circle at 35% 35%, #FFFFFF 0%, #E6FF00 25%, var(--accent) 55%, #00D2DF 80%, #042D33 100%)',
          boxShadow: '0 0 16px var(--accent), 0 0 30px rgba(0, 240, 255, 0.7), inset -3px -3px 8px rgba(0, 0, 0, 0.6), inset 2px 2px 5px rgba(255, 255, 255, 0.9)',
          border: '1.5px solid rgba(255, 255, 255, 0.8)',
        }}
        initial={{ y: -100, rotate: -360, scaleY: 1.3, scaleX: 0.8 }}
        animate={{ y: 0, rotate: 0, scaleY: 1, scaleX: 1 }}
        transition={{
          y: { type: 'spring', stiffness: 280, damping: 11, mass: 0.85 },
          rotate: { type: 'spring', stiffness: 200, damping: 14 },
          scaleY: { duration: 0.6, times: [0, 0.4, 0.7, 1], ease: 'easeOut' },
          scaleX: { duration: 0.6, times: [0, 0.4, 0.7, 1], ease: 'easeOut' },
        }}
      >
        {/* Visible spinning seam / axis texture so roll rotation ("round round") is clearly seen */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none opacity-60"
          style={{
            border: '2px dashed rgba(10, 10, 10, 0.6)',
            transform: 'rotate(45deg) scale(0.9)',
          }}
        />
        <div
          className="absolute w-full h-[2px] bg-black/40 pointer-events-none"
          style={{ transform: 'rotate(25deg)' }}
        />
        <div
          className="absolute w-[2px] h-full bg-black/40 pointer-events-none"
          style={{ transform: 'rotate(25deg)' }}
        />

        {/* Specular highlight glint */}
        <div
          className="absolute top-1 left-1.5 w-2 h-2 rounded-full bg-white opacity-90 blur-[0.5px]"
        />

        {/* Center core dot */}
        <div
          className="w-2 h-2 rounded-full bg-black/70 shadow-inner z-10"
        />
      </motion.div>
    </motion.div>
  );
};

export default PhysicsBall;
