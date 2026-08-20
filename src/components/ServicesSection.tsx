import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import FadeIn from './FadeIn';
import GravityDrop from './GravityDrop';
import PhysicsBall from './PhysicsBall';

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

const experiences: ExperienceItem[] = [
  {
    id: '01',
    role: 'Product Support Associate',
    company: 'Polar Bear Tech',
    period: '2026 — Present',
    description: 'Supporting flagship operational platforms, handling user interface queries, database configurations, compiling guides, and streamlining SaaS client operations.',
  },
  {
    id: '02',
    role: 'EduBuddy Platform Support',
    company: 'School Operation Suite',
    period: '2025 — 2026',
    description: 'Assisting academic client operations utilizing a SaaS suite automating registrations, fee billings, parent messaging, and gradebook databases.',
  },
  {
    id: '03',
    role: 'HotelBuddy Platform Support',
    company: 'Hospitality Control Hub',
    period: '2024 — 2025',
    description: 'Providing technical and configuration support for a comprehensive hotel engine tracking bookings, POS invoice logs, housekeeping, and room occupancy.',
  },
  {
    id: '04',
    role: 'Web Operations Intern',
    company: 'BCA Academic Portals',
    period: '2023 — 2024',
    description: 'Contributed to school management backends and portals during academic training, reinforcing database alignment and frontend operations.',
  },
  {
    id: '05',
    role: 'Technical Operations',
    company: 'SaaS Platform Optimizations',
    period: '2023',
    description: 'Ensuring operations run smoothly, debugging workflow bottlenecks, and optimizing configuration settings across multiple client platforms.',
  },
];

export const ServicesSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll percentage through the Experience section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 65%', 'end 75%'],
  });

  // Smooth spring physics for scroll movement
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    restDelta: 0.001,
  });

  // Glowing traveling bullet orb top position
  const orbTop = useTransform(smoothProgress, [0, 1], ['0%', '100%']);
  const orbOpacity = useTransform(smoothProgress, [0, 0.02, 0.98, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={containerRef}
      id="experience"
      className="w-full px-4 sm:px-8 md:px-10 py-20 sm:py-28 relative overflow-hidden"
      style={{ background: 'var(--bg-primary)', color: 'var(--text-dark)' }}
    >
      <div className="max-w-5xl mx-auto relative">
        {/* Label */}
        <FadeIn delay={0} y={20} className="flex justify-center mb-4">
          <span className="tag-yellow">02 — Experience</span>
        </FadeIn>

        {/* Title */}
        <FadeIn delay={0.1} y={40} className="text-center mb-14 sm:mb-20">
          <h2
            className="section-heading text-[var(--text-dark)]"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 5rem)' }}
          >
            Where I've<br />Worked
          </h2>
        </FadeIn>

        {/* Experience List Container with Animated SVG Journey Line */}
        <div className="relative pl-8 sm:pl-12">
          {/* SVG Connector Journey Line Track */}
          <div className="absolute left-1 sm:left-3 top-0 bottom-0 w-6 flex justify-center pointer-events-none z-10">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 24 100"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="exp-journey-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="var(--accent)" />
                  <stop offset="50%" stopColor="#00F0FF" />
                  <stop offset="100%" stopColor="var(--accent)" />
                </linearGradient>
                <filter id="exp-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Background Guide Path */}
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

              {/* Animated Journey SVG Path (Draws forward on scroll) */}
              <motion.line
                x1="12"
                y1="0"
                x2="12"
                y2="100"
                stroke="url(#exp-journey-gradient)"
                strokeWidth="4"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                filter="url(#exp-glow)"
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

          {/* Experience Items List with scroll-triggered gravity drop */}
          <div className="flex flex-col gap-6" style={{ borderTop: '1px solid var(--border-dark)' }}>
            {experiences.map((exp, index) => {
              const nodeThreshold = (index + 0.2) / experiences.length;

              return (
                <GravityDrop
                  key={exp.id}
                  delay={index * 0.12}
                  yDrop={-70}
                  rotateDrop={index % 2 === 0 ? -2.5 : 2.5}
                  className="group transition-all duration-300 relative"
                >
                  {/* SVG Node Marker */}
                  <ExpNodeMarker progress={smoothProgress} threshold={nodeThreshold} />

                  <div
                    className="flex flex-col sm:flex-row sm:items-center py-7 sm:py-9 gap-4 sm:gap-8 cursor-default px-4 sm:px-6 rounded-2xl transition-all duration-300 hover:bg-[var(--bg-card)] group-hover:shadow-lg"
                    style={{ borderBottom: '1px solid var(--border)' }}
                  >
                    {/* Number */}
                    <span
                      className="font-black leading-none select-none flex-shrink-0 opacity-30 group-hover:opacity-100 group-hover:text-[var(--accent)] transition-all duration-300"
                      style={{
                        fontSize: 'clamp(1.8rem, 5vw, 4rem)',
                        fontFamily: "'Inter'",
                        width: '80px',
                      }}
                    >
                      {exp.id}
                    </span>

                    {/* Main info */}
                    <div className="flex-1 flex flex-col gap-1">
                      <h3
                        className="font-black uppercase text-[var(--text-dark)] leading-tight transition-colors group-hover:text-[var(--accent-dark)]"
                        style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', fontFamily: "'Inter'" }}
                      >
                        {exp.role}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[var(--text-mid)] flex items-center gap-2">
                        <span>{exp.company}</span>
                      </p>
                      <p className="text-xs sm:text-sm text-[var(--text-mid)] leading-relaxed mt-1 max-w-2xl font-medium">
                        {exp.description}
                      </p>
                    </div>

                    {/* Period badge */}
                    <div className="flex-shrink-0">
                      <span
                        className="inline-block px-3 py-1.5 rounded-full text-[0.65rem] font-bold uppercase tracking-wider group-hover:bg-[var(--accent)] group-hover:text-[#111] transition-all duration-300"
                        style={{
                          background: 'var(--bg-card)',
                          color: 'var(--text-dark)',
                          border: '1px solid var(--border)',
                        }}
                      >
                        {exp.period}
                      </span>
                    </div>
                  </div>
                </GravityDrop>
              );
            })}
          </div>
        </div>

        {/* Platform showcase with scroll-triggered gravity drop */}
        <div className="mt-16 sm:mt-24">
          <FadeIn delay={0.1} y={20}>
            <div className="flex items-center gap-3 mb-6">
              <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h3 className="font-black uppercase text-sm tracking-widest text-[var(--text-mid)]" style={{ fontFamily: "'Inter'" }}>
                Platforms I've Supported
              </h3>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { label: 'EduBuddy School Operations', src: '/edubuddy-showcase.png', alt: 'EduBuddy Portal' },
              { label: 'HotelBuddy Control Hub', src: '/hotelbuddy-showcase.png', alt: 'HotelBuddy Portal' },
            ].map((item, idx) => (
              <GravityDrop
                key={item.label}
                delay={0.15 + idx * 0.12}
                yDrop={-50}
              >
                <div
                  className="p-4 sm:p-5 hover:scale-[1.01] transition-transform duration-300 rounded-2xl"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                >
                  <span className="tag-yellow mb-3 inline-block">Platform Preview</span>
                  <h4 className="font-bold text-base text-[var(--text-dark)] mb-3">{item.label}</h4>
                  <div className="w-full rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-auto object-cover transition-opacity duration-300 hover:opacity-90"
                    />
                  </div>
                </div>
              </GravityDrop>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// SVG Node Marker for Experience Items
const ExpNodeMarker: React.FC<{ progress: any; threshold: number }> = ({ progress, threshold }) => {
  const isPassed = useTransform(progress, (v: number) => v >= threshold);
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    return isPassed.on('change', (latest) => setActive(latest));
  }, [isPassed]);

  return (
    <div className="absolute -left-[38px] sm:-left-[44px] top-8 z-20 flex items-center justify-center pointer-events-none">
      <div
        className="w-4 h-4 rounded-full border-2 transition-all duration-500"
        style={{
          background: active ? 'var(--accent)' : 'var(--bg-primary)',
          borderColor: active ? 'var(--text-dark)' : 'var(--border-dark)',
          boxShadow: active ? '0 0 12px var(--accent)' : 'none',
          transform: active ? 'scale(1.3)' : 'scale(1)',
        }}
      />
      {active && (
        <span className="absolute w-7 h-7 rounded-full bg-[var(--accent)] opacity-40 animate-ping pointer-events-none" />
      )}
    </div>
  );
};

export default ServicesSection;

