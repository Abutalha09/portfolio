import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import FadeIn from './FadeIn';
import GravityDrop from './GravityDrop';
import PhysicsBall from './PhysicsBall';

const educationTimeline = [
  {
    year: '2023 — 2026',
    title: 'Bachelor of Computer Applications',
    institution: 'Vision Management College',
    description: 'BCA focused degree covering relational databases, software design cycles, web development, and algorithms.',
    tags: ['Application Logic', 'Frontend Paradigms', 'Databases'],
    isHighlight: true,
  },
  {
    year: '2022 — 2023',
    title: 'Intermediate Education',
    institution: 'Harjinder Nagar College',
    description: 'Transitional learning phase preparing towards computer science, coding foundations, and mathematical logic.',
    tags: ['Algebraic Analysis', 'CS Foundations'],
    isHighlight: false,
  },
  {
    year: '2020 — 2021',
    title: 'High School Education',
    institution: 'SU Memorial',
    description: 'Primary academic baseline with consistent coursework, team dynamics, and structured studies.',
    tags: ['Study Methodology', 'Academic Focus'],
    isHighlight: false,
  },
];

const certifications = [
  { name: 'Web Development Certification', issuer: 'Academic Program', year: '2025' },
  { name: 'Digital Marketing Foundations', issuer: 'Online Course', year: '2024' },
  { name: 'Python Programming', issuer: 'Online Course', year: '2024' },
];

export const EducationSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll percentage through the section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 65%', 'end 75%'],
  });

  // Smooth scroll spring animation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    restDelta: 0.001,
  });

  // Moving glowing orb positioning along line
  const orbTop = useTransform(smoothProgress, [0, 1], ['0%', '100%']);
  const orbOpacity = useTransform(smoothProgress, [0, 0.03, 0.97, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={containerRef}
      id="education"
      className="w-full px-4 sm:px-8 md:px-10 py-20 sm:py-28 relative overflow-hidden"
      style={{ background: 'var(--bg-primary)', color: 'var(--text-dark)' }}
    >
      <div className="max-w-4xl mx-auto relative">
        {/* Label */}
        <FadeIn delay={0} y={20} className="flex justify-center mb-4">
          <span className="tag-yellow">05 — Education</span>
        </FadeIn>

        {/* Title */}
        <FadeIn delay={0.1} y={40} className="text-center mb-14 sm:mb-20">
          <h2
            className="section-heading text-[var(--text-dark)]"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 5rem)' }}
          >
            Academic<br />Journey
          </h2>
        </FadeIn>

        {/* Timeline wrapper with SVG Animated Journey Line */}
        <div className="relative pl-8 sm:pl-12 mb-16">
          {/* SVG Connector Journey Line Container */}
          <div className="absolute left-1 sm:left-3 top-0 bottom-0 w-6 flex justify-center pointer-events-none z-10">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 24 100"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="edu-journey-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="var(--accent)" />
                  <stop offset="50%" stopColor="#00F0FF" />
                  <stop offset="100%" stopColor="var(--accent)" />
                </linearGradient>
                <filter id="edu-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Background Guide Line (Dashed Track) */}
              <line
                x1="12"
                y1="0"
                x2="12"
                y2="100"
                stroke="var(--border-dark)"
                strokeWidth="2"
                strokeDasharray="4 4"
                vectorEffect="non-scaling-stroke"
                opacity="0.4"
              />

              {/* Animated Journey SVG Line (Draws forward on scroll) */}
              <motion.line
                x1="12"
                y1="0"
                x2="12"
                y2="100"
                stroke="url(#edu-journey-gradient)"
                strokeWidth="4"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                filter="url(#edu-glow)"
                style={{ pathLength: smoothProgress }}
              />
            </svg>

            {/* 3D Rolling Physics Ball on tip of SVG Line */}
            <PhysicsBall
              top={orbTop}
              opacity={orbOpacity}
              progress={smoothProgress}
              size={26}
            />
          </div>

          {/* Timeline items with scroll-triggered gravity drop */}
          <div className="flex flex-col gap-8 sm:gap-10">
            {educationTimeline.map((item, idx) => {
              // Calculate threshold for dot illumination based on item position
              const nodeThreshold = (idx + 0.2) / educationTimeline.length;
              
              return (
                <GravityDrop
                  key={idx}
                  delay={idx * 0.13}
                  yDrop={-70}
                  rotateDrop={idx % 2 === 0 ? -2.5 : 2.5}
                >
                  <div className="relative group">
                    {/* SVG Interactive Milestone Dot */}
                    <MilestoneDot
                      isHighlight={item.isHighlight}
                      progress={smoothProgress}
                      threshold={nodeThreshold}
                    />

                    {/* Timeline Card */}
                    <div
                      className="p-5 sm:p-7 hover:scale-[1.01] transition-all duration-300 rounded-2xl relative overflow-hidden"
                      style={{
                        background: 'var(--bg-card)',
                        border: item.isHighlight ? '2px solid var(--accent)' : '1px solid var(--border)',
                        boxShadow: item.isHighlight ? '0 4px 24px var(--theme-glow)' : 'none',
                      }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                        <span
                          className="inline-block px-3 py-1 rounded-full text-[0.6rem] font-bold uppercase tracking-wider w-fit"
                          style={{
                            background: item.isHighlight ? 'var(--accent)' : 'var(--bg-card)',
                            color: item.isHighlight ? '#111' : 'var(--text-dark)',
                            border: '1px solid var(--border)',
                          }}
                        >
                          {item.year}
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-mid)]">
                          {item.institution}
                        </span>
                      </div>

                      <h3
                        className="font-black uppercase text-[var(--text-dark)] mb-2"
                        style={{ fontSize: 'clamp(0.9rem, 2vw, 1.25rem)', fontFamily: "'Inter'" }}
                      >
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[var(--text-mid)] leading-relaxed mb-4 font-medium">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[0.6rem] px-2.5 py-1 rounded-full font-bold uppercase tracking-wide"
                            style={{ background: 'var(--bg-card)', color: 'var(--text-dark)', border: '1px solid var(--border)' }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </GravityDrop>
              );
            })}
          </div>
        </div>

        {/* Certifications with scroll-triggered gravity drop */}
        <div className="mt-8">
          <FadeIn delay={0.1} y={20}>
            <div className="flex items-center gap-3 mb-6">
              <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-black uppercase text-sm tracking-widest text-[var(--text-mid)]" style={{ fontFamily: "'Inter'" }}>
                Certifications &amp; Courses
              </h3>
            </div>
          </FadeIn>
          <div className="flex flex-col gap-3">
            {certifications.map((cert, i) => (
              <GravityDrop key={i} delay={0.15 + i * 0.1} yDrop={-40}>
                <div
                  className="flex items-center justify-between px-5 py-4 rounded-2xl hover:scale-[1.01] transition-all duration-200"
                  style={{ border: '1px solid var(--border)', background: 'var(--bg-card)' }}
                >
                  <div>
                    <h4 className="font-bold text-sm text-[var(--text-dark)]">{cert.name}</h4>
                    <p className="text-xs text-[var(--text-mid)]">{cert.issuer}</p>
                  </div>
                  <span className="tag-yellow flex-shrink-0">{cert.year}</span>
                </div>
              </GravityDrop>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper component for Milestone Dot activated by SVG scroll line
const MilestoneDot: React.FC<{
  isHighlight: boolean;
  progress: any;
  threshold: number;
}> = ({ isHighlight, progress, threshold }) => {
  const isPassed = useTransform(progress, (v: number) => v >= threshold);
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    return isPassed.on('change', (latest) => setActive(latest));
  }, [isPassed]);

  return (
    <div
      className="absolute -left-[38px] sm:-left-[44px] top-6 z-20 flex items-center justify-center transition-all duration-500"
    >
      <div
        className="w-4 h-4 rounded-full border-2 transition-all duration-500"
        style={{
          background: active
            ? 'var(--accent)'
            : isHighlight
            ? 'var(--accent)'
            : 'var(--bg-primary)',
          borderColor: active ? 'var(--text-dark)' : 'var(--border-dark)',
          boxShadow: active ? '0 0 12px var(--accent)' : 'none',
          transform: active ? 'scale(1.25)' : 'scale(1)',
        }}
      />
      {active && (
        <span className="absolute w-7 h-7 rounded-full bg-[var(--accent)] opacity-40 animate-ping pointer-events-none" />
      )}
    </div>
  );
};

export default EducationSection;

