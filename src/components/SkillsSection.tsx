import React, { useRef, useEffect, useState } from 'react';
import FadeIn from './FadeIn';

interface SkillData {
  name: string;
  category: string;
  level: number;
  emoji: string;
}

const skills: SkillData[] = [
  { name: 'HTML5 & CSS3',       category: 'Frontend Core',  level: 88, emoji: '🌐' },
  { name: 'JavaScript',         category: 'Interactivity',  level: 78, emoji: '⚡' },
  { name: 'Python',             category: 'Programming',    level: 72, emoji: '🐍' },
  { name: 'Git & GitHub',       category: 'Version Control',level: 82, emoji: '🌿' },
  { name: 'Database Queries',   category: 'Backend',        level: 68, emoji: '🗄️' },
  { name: 'SaaS Support',       category: 'Operations',     level: 90, emoji: '🎧' },
  { name: 'Responsive Design',  category: 'Interface',      level: 85, emoji: '📱' },
  { name: 'Digital Marketing',  category: 'Strategy',       level: 74, emoji: '📈' },
  { name: 'Data Analytics',     category: 'Insights',       level: 70, emoji: '📊' },
];

const SkillRow: React.FC<{ skill: SkillData; index: number }> = ({ skill, index }) => {
  const barRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTimeout(() => setAnimated(true), index * 60);
      },
      { threshold: 0.2 }
    );
    if (barRef.current) observer.observe(barRef.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <FadeIn delay={index * 0.06} y={20}>
      <div
        className="group flex items-center gap-4 sm:gap-6 px-4 sm:px-6 py-5 rounded-2xl transition-all duration-300 hover:bg-white/40 cursor-default"
        style={{ border: '1px solid rgba(17,17,17,0.08)' }}
        ref={barRef}
      >
        {/* Emoji icon */}
        <div
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-xl sm:text-2xl"
          style={{ background: '#E8FF2A', border: '1.5px solid rgba(17,17,17,0.15)' }}
        >
          {skill.emoji}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1.5">
            <div>
              <h3 className="font-black text-sm sm:text-base text-[#111] uppercase tracking-wide" style={{ fontFamily: "'Inter'" }}>
                {skill.name}
              </h3>
              <span className="text-[0.6rem] uppercase tracking-[0.15em] text-[#888] font-semibold">{skill.category}</span>
            </div>
            <span className="font-black text-lg sm:text-xl text-[#111] ml-4 flex-shrink-0" style={{ fontFamily: "'Inter'" }}>
              {skill.level}%
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-2 w-full rounded-full overflow-hidden" style={{ background: 'rgba(17,17,17,0.1)' }}>
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{
                width: animated ? `${skill.level}%` : '0%',
                background: 'linear-gradient(90deg, #E8FF2A, #C8DF00)',
              }}
            />
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

export const SkillsSection: React.FC = () => {
  return (
    <section
      id="skills"
      className="w-full px-4 sm:px-8 md:px-10 py-20 sm:py-28 relative"
      style={{ background: '#D8D3C8' }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Label */}
        <FadeIn delay={0} y={20} className="flex justify-center mb-4">
          <span className="tag-yellow">04 — Skills</span>
        </FadeIn>

        {/* Title */}
        <FadeIn delay={0.1} y={40} className="text-center mb-5">
          <h2
            className="section-heading"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 5rem)' }}
          >
            My Tech Arsenal
          </h2>
        </FadeIn>

        <FadeIn delay={0.15} y={20} className="text-center mb-12 sm:mb-16">
          <p className="text-sm sm:text-base text-[#555] max-w-md mx-auto leading-relaxed">
            Tools, languages, and disciplines I use to build, ship, and support digital products.
          </p>
        </FadeIn>

        {/* Skills rows */}
        <div className="flex flex-col gap-3">
          {skills.map((skill, index) => (
            <SkillRow key={skill.name} skill={skill} index={index} />
          ))}
        </div>

        {/* Tech stack logos strip */}
        <FadeIn delay={0.4} y={20} className="mt-14 sm:mt-20">
          <h4 className="font-bold text-xs uppercase tracking-widest text-[#888] text-center mb-6">
            Technologies I Work With
          </h4>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'HTML5', 'CSS3', 'JavaScript', 'Python', 'React', 'Git',
              'GitHub', 'Tailwind CSS', 'Figma', 'VS Code', 'Netlify', 'Vercel',
            ].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-200 hover:bg-[#E8FF2A] cursor-default"
                style={{
                  background: 'rgba(255,255,255,0.5)',
                  color: '#333',
                  border: '1px solid rgba(17,17,17,0.12)',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default SkillsSection;
