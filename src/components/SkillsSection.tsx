import React, { useRef, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import FadeIn from './FadeIn';
import GravityDrop from './GravityDrop';

interface SkillData {
  name: string;
  level: number;
  emoji: string;
}

interface CategoryData {
  label: string;
  icon: string;
  skills: SkillData[];
}

const categories: CategoryData[] = [
  {
    label: 'Frontend Development',
    icon: '🖥️',
    skills: [
      { name: 'HTML5 & CSS3',      level: 88, emoji: '🌐' },
      { name: 'JavaScript',        level: 78, emoji: '⚡' },
      { name: 'Responsive Design', level: 85, emoji: '📱' },
    ],
  },
  {
    label: 'Operations & Support',
    icon: '🎧',
    skills: [
      { name: 'SaaS Support',      level: 90, emoji: '🎧' },
      { name: 'Software Testing',  level: 82, emoji: '🧪' },
      { name: 'Data Analytics',    level: 70, emoji: '📊' },
    ],
  },
  {
    label: 'Tools & Other',
    icon: '🛠️',
    skills: [
      { name: 'Python',            level: 72, emoji: '🐍' },
      { name: 'Git & GitHub',      level: 82, emoji: '🌿' },
      { name: 'Database Queries',  level: 68, emoji: '🗄️' },
    ],
  },
];

// Rolling 3D physics ball icon inside skill card (motion.zajno.com style)
const RollingSkillBall: React.FC<{ emoji: string; index: number; animated: boolean }> = ({ emoji, index, animated }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center flex-shrink-0 text-lg sm:text-xl shadow-lg relative overflow-hidden group-hover:scale-110 transition-transform duration-300"
      style={{
        background: 'radial-gradient(circle at 35% 35%, #FFFFFF 0%, #E6FF00 30%, var(--accent) 60%, #00B4C8 90%, #033238 100%)',
        color: '#111',
        boxShadow: '0 0 14px var(--theme-glow), inset -2px -2px 5px rgba(0,0,0,0.5), inset 1px 1px 3px rgba(255,255,255,0.8)',
        border: '1.5px solid rgba(255,255,255,0.6)',
      }}
      initial={shouldReduceMotion ? { opacity: 0 } : { y: -60, rotate: -360, opacity: 0 }}
      animate={animated ? { y: 0, rotate: 0, opacity: 1 } : {}}
      transition={{
        y: { type: 'spring', stiffness: 280, damping: 12, mass: 0.85, delay: index * 0.06 },
        rotate: { type: 'spring', stiffness: 220, damping: 14, delay: index * 0.06 },
        opacity: { duration: 0.3, delay: index * 0.06 },
      }}
    >
      {/* Specular 3D highlight */}
      <div className="absolute top-1 left-1.5 w-2 h-2 rounded-full bg-white/90 blur-[0.4px] pointer-events-none" />
      {/* Spinning dashed axis line */}
      <div
        className="absolute inset-0 rounded-full border border-dashed border-black/30 pointer-events-none"
        style={{ transform: 'rotate(45deg)' }}
      />
      <span className="relative z-10 select-none text-base">{emoji}</span>
    </motion.div>
  );
};

const SkillBar: React.FC<{ skill: SkillData; index: number }> = ({ skill, index }) => {
  const barRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTimeout(() => setAnimated(true), index * 80);
      },
      { threshold: 0.25 }
    );
    if (barRef.current) observer.observe(barRef.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <GravityDrop delay={index * 0.08} yDrop={-50} rotateDrop={index % 2 === 0 ? -2 : 2}>
      <div
        className="group flex items-center gap-3 sm:gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-default"
        style={{ border: '1px solid var(--border)', background: 'var(--bg-card)' }}
        ref={barRef}
      >
        {/* 3D Rolling Sphere icon */}
        <RollingSkillBall emoji={skill.emoji} index={index} animated={animated} />

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1.5">
            <h3 className="font-black text-sm text-[var(--text-dark)] uppercase tracking-wide" style={{ fontFamily: "'Inter'" }}>
              {skill.name}
            </h3>
            <span className="font-black text-sm text-[var(--text-dark)] ml-3 flex-shrink-0" style={{ fontFamily: "'Inter'" }}>
              {skill.level}%
            </span>
          </div>
          {/* Progress bar */}
          <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{ width: animated ? `${skill.level}%` : '0%', background: 'var(--accent)' }}
            />
          </div>
        </div>
      </div>
    </GravityDrop>
  );
};

// Zajno motion physics ball track visual
const ZajnoBallTrack: React.FC = () => {
  return (
    <div className="relative w-full max-w-xl mx-auto h-16 mb-8 overflow-hidden flex items-center justify-center pointer-events-none select-none">
      <svg className="w-full h-full" viewBox="0 0 500 60" fill="none">
        <defs>
          <linearGradient id="zajno-track-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="25%" stopColor="var(--border-dark)" />
            <stop offset="50%" stopColor="var(--accent)" />
            <stop offset="75%" stopColor="#00F0FF" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          d="M 20 30 Q 140 55, 250 25 T 480 35"
          stroke="url(#zajno-track-grad)"
          strokeWidth="3"
          strokeDasharray="4 4"
          fill="none"
          opacity="0.6"
        />
      </svg>
      {/* 3D Rolling & Bouncing Ball */}
      <motion.div
        className="absolute w-7 h-7 rounded-full shadow-xl flex items-center justify-center overflow-hidden"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #FFFFFF 0%, #E6FF00 30%, var(--accent) 60%, #00B4C8 90%, #033238 100%)',
          boxShadow: '0 0 16px var(--accent), 0 0 25px rgba(0,240,255,0.6)',
          border: '1.5px solid rgba(255,255,255,0.8)',
        }}
        animate={{
          x: [-180, -60, 40, 160, 40, -60, -180],
          y: [-12, 14, -8, 8, -8, 14, -12],
          rotate: [0, 360, 720, 1080, 720, 360, 0],
          scaleY: [1.15, 0.85, 1.1, 0.9, 1.1, 0.85, 1.15],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className="absolute top-1 left-1.5 w-1.5 h-1.5 rounded-full bg-white/90" />
        <div className="w-1.5 h-1.5 rounded-full bg-black/60" />
      </motion.div>
    </div>
  );
};

export const SkillsSection: React.FC = () => {
  return (
    <section
      id="skills"
      className="w-full px-4 sm:px-8 md:px-10 py-20 sm:py-28 relative overflow-hidden"
      style={{ background: 'var(--bg-primary)', color: 'var(--text-dark)' }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Label */}
        <FadeIn delay={0} y={20} className="flex justify-center mb-4">
          <span className="tag-yellow">04 — Skills</span>
        </FadeIn>

        {/* Title */}
        <FadeIn delay={0.1} y={40} className="text-center mb-4">
          <h2 className="section-heading text-[var(--text-dark)]" style={{ fontSize: 'clamp(2.2rem, 6vw, 5rem)' }}>
            My Tech Arsenal
          </h2>
        </FadeIn>

        <FadeIn delay={0.15} y={20} className="text-center mb-6 sm:mb-8">
          <p className="text-sm sm:text-base text-[var(--text-mid)] max-w-md mx-auto leading-relaxed font-medium">
            Tools, languages, and disciplines I use to build, ship, and support digital products.
          </p>
        </FadeIn>

        {/* motion.zajno.com style Rolling Ball Track */}
        <ZajnoBallTrack />

        {/* Categorized skill groups */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((cat, catIdx) => (
            <div key={cat.label} className="flex flex-col gap-3">
              {/* Category header */}
              <FadeIn delay={catIdx * 0.1} y={20}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{cat.icon}</span>
                  <h3
                    className="font-black text-xs uppercase tracking-[0.15em] text-[var(--text-dark)]"
                    style={{ fontFamily: "'Inter'" }}
                  >
                    {cat.label}
                  </h3>
                </div>
              </FadeIn>
              {/* Skill bars with rolling ball gravity drop */}
              <div className="flex flex-col gap-3">
                {cat.skills.map((skill, idx) => (
                  <SkillBar key={skill.name} skill={skill} index={catIdx * 3 + idx} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech stack logos strip with rolling marble gravity bounce */}
        <div className="mt-14 sm:mt-20">
          <FadeIn delay={0.2} y={20}>
            <h4 className="font-bold text-xs uppercase tracking-widest text-[var(--text-mid)] text-center mb-6">
              Technologies I Work With
            </h4>
          </FadeIn>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'HTML5', 'CSS3', 'JavaScript', 'Python', 'React', 'Git',
              'GitHub', 'Tailwind CSS', 'Figma', 'VS Code', 'Netlify', 'Vercel',
            ].map((tech, i) => (
              <GravityDrop key={tech} delay={0.1 + i * 0.04} yDrop={-40} rotateDrop={i % 2 === 0 ? -3 : 3}>
                <span
                  className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-200 hover:bg-[var(--accent)] hover:text-[#111] hover:scale-105 cursor-default inline-block shadow-sm"
                  style={{
                    background: 'var(--bg-card)',
                    color: 'var(--text-dark)',
                    border: '1px solid var(--border)',
                  }}
                >
                  {tech}
                </span>
              </GravityDrop>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
