import React, { useRef, useEffect, useState } from 'react';
import FadeIn from './FadeIn';

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
    <div
      className="group flex items-center gap-3 sm:gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-md cursor-default"
      style={{ border: '1px solid var(--border)', background: 'var(--bg-card)' }}
      ref={barRef}
    >
      {/* Emoji icon with hover bounce */}
      <div
        className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center flex-shrink-0 text-lg sm:text-xl shadow-sm group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-200"
        style={{ background: 'var(--accent)', color: '#111', border: '1px solid var(--border-dark)' }}
      >
        {skill.emoji}
      </div>

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
  );
};

export const SkillsSection: React.FC = () => {
  return (
    <section
      id="skills"
      className="w-full px-4 sm:px-8 md:px-10 py-20 sm:py-28 relative"
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

        <FadeIn delay={0.15} y={20} className="text-center mb-12 sm:mb-16">
          <p className="text-sm sm:text-base text-[var(--text-mid)] max-w-md mx-auto leading-relaxed font-medium">
            Tools, languages, and disciplines I use to build, ship, and support digital products.
          </p>
        </FadeIn>

        {/* Categorized skill groups */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((cat, catIdx) => (
            <FadeIn key={cat.label} delay={catIdx * 0.1} y={30}>
              <div className="flex flex-col gap-3">
                {/* Category header */}
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{cat.icon}</span>
                  <h3
                    className="font-black text-xs uppercase tracking-[0.15em] text-[var(--text-dark)]"
                    style={{ fontFamily: "'Inter'" }}
                  >
                    {cat.label}
                  </h3>
                </div>
                {/* Skill bars */}
                <div className="flex flex-col gap-2">
                  {cat.skills.map((skill, idx) => (
                    <SkillBar key={skill.name} skill={skill} index={catIdx * 3 + idx} />
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Tech stack logos strip */}
        <FadeIn delay={0.4} y={20} className="mt-14 sm:mt-20">
          <h4 className="font-bold text-xs uppercase tracking-widest text-[var(--text-mid)] text-center mb-6">
            Technologies I Work With
          </h4>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'HTML5', 'CSS3', 'JavaScript', 'Python', 'React', 'Git',
              'GitHub', 'Tailwind CSS', 'Figma', 'VS Code', 'Netlify', 'Vercel',
            ].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-200 hover:bg-[var(--accent)] hover:text-[#111] hover:scale-105 cursor-default"
                style={{
                  background: 'var(--bg-card)',
                  color: 'var(--text-dark)',
                  border: '1px solid var(--border)',
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
