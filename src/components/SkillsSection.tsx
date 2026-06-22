import React, { useRef, useEffect, useState } from 'react';
import {
  Code2,
  Terminal,
  GitBranch,
  Database,
  Laptop,
  TrendingUp,
  BarChart3,
  Headphones,
  Cpu
} from 'lucide-react';
import FadeIn from './FadeIn';

interface SkillData {
  name: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  iconBg: string;
  glow: string;
  level: number;
}

const skills: SkillData[] = [
  {
    name: 'HTML5 & CSS3',
    category: 'Frontend Core',
    description: 'Semantic, high-performance user interfaces and responsive web layouts built for every viewport.',
    icon: <Code2 className="w-5 h-5" />,
    gradient: 'from-orange-500/15 via-red-500/8 to-transparent',
    iconBg: 'from-orange-500 to-red-500',
    glow: 'rgba(249,115,22,0.35)',
    level: 88,
  },
  {
    name: 'JavaScript',
    category: 'Interactivity',
    description: 'Dynamic scripting, state control, DOM manipulation, and modern ES6+ frontend architectures.',
    icon: <Laptop className="w-5 h-5" />,
    gradient: 'from-yellow-500/15 via-amber-500/8 to-transparent',
    iconBg: 'from-yellow-400 to-amber-500',
    glow: 'rgba(234,179,8,0.35)',
    level: 78,
  },
  {
    name: 'Python',
    category: 'Programming',
    description: 'Algorithmic logic, data processing scripts, and automation for real-world problem solving.',
    icon: <Terminal className="w-5 h-5" />,
    gradient: 'from-blue-500/15 via-cyan-500/8 to-transparent',
    iconBg: 'from-blue-500 to-cyan-400',
    glow: 'rgba(59,130,246,0.35)',
    level: 72,
  },
  {
    name: 'Git & Version Control',
    category: 'Workflow',
    description: 'Branch management, code merges, repository audits, and deployment flows using GitHub.',
    icon: <GitBranch className="w-5 h-5" />,
    gradient: 'from-purple-500/15 via-pink-500/8 to-transparent',
    iconBg: 'from-purple-500 to-pink-500',
    glow: 'rgba(168,85,247,0.35)',
    level: 82,
  },
  {
    name: 'Database Queries',
    category: 'Backend',
    description: 'Configuring and querying relational database tables and optimizing record alignment.',
    icon: <Database className="w-5 h-5" />,
    gradient: 'from-emerald-500/15 via-teal-500/8 to-transparent',
    iconBg: 'from-emerald-400 to-teal-500',
    glow: 'rgba(16,185,129,0.35)',
    level: 68,
  },
  {
    name: 'SaaS Support',
    category: 'Operations',
    description: 'Resolving workflow gaps, operational bottlenecks, and optimizing client configuration setups.',
    icon: <Headphones className="w-5 h-5" />,
    gradient: 'from-rose-500/15 via-indigo-500/8 to-transparent',
    iconBg: 'from-rose-400 to-indigo-400',
    glow: 'rgba(244,63,94,0.35)',
    level: 90,
  },
  {
    name: 'Responsive Design',
    category: 'Interface',
    description: 'Fluid layout adjustments across mobile, tablet, and desktop viewports using CSS flex/grid.',
    icon: <Cpu className="w-5 h-5" />,
    gradient: 'from-indigo-500/15 via-purple-500/8 to-transparent',
    iconBg: 'from-indigo-400 to-purple-500',
    glow: 'rgba(99,102,241,0.35)',
    level: 85,
  },
  {
    name: 'Digital Marketing',
    category: 'Strategy',
    description: 'Campaign metrics, web traffic channels, SEO strategy, and content positioning for growth.',
    icon: <TrendingUp className="w-5 h-5" />,
    gradient: 'from-teal-500/15 via-emerald-500/8 to-transparent',
    iconBg: 'from-teal-400 to-emerald-400',
    glow: 'rgba(20,184,166,0.35)',
    level: 74,
  },
  {
    name: 'Data Analytics',
    category: 'Insights',
    description: 'Extracting performance tables, charts, and translating raw numbers into actionable insights.',
    icon: <BarChart3 className="w-5 h-5" />,
    gradient: 'from-cyan-500/15 via-blue-500/8 to-transparent',
    iconBg: 'from-cyan-400 to-blue-500',
    glow: 'rgba(6,182,212,0.35)',
    level: 70,
  },
];

const SkillCard: React.FC<{ skill: SkillData; index: number }> = ({ skill, index }) => {
  const barRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setAnimated(true), index * 60);
        }
      },
      { threshold: 0.2 }
    );
    if (barRef.current) observer.observe(barRef.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <FadeIn
      delay={index * 0.06}
      y={30}
      className="group relative flex flex-col rounded-2xl transition-all duration-500 hover:scale-[1.025]"
    >
      {/* Gradient border wrapper */}
      <div
        className="flex flex-col rounded-2xl p-[1px] h-full"
        style={{
          background: `linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.08) 100%)`,
        }}
      >
      {/* Card body */}
      <div
        className={`flex flex-col gap-4 rounded-2xl p-5 h-full bg-gradient-to-br ${skill.gradient} relative overflow-hidden`}
        style={{ backgroundColor: '#111111' }}
      >
        {/* Glow blob on hover */}
        <div
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{ background: skill.glow }}
        />

        {/* Top row: icon + category */}
        <div className="flex items-start justify-between">
          <div
            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${skill.iconBg} flex items-center justify-center text-white shadow-lg flex-shrink-0`}
            style={{ boxShadow: `0 4px 20px ${skill.glow}` }}
          >
            {skill.icon}
          </div>
          <span className="text-[9px] uppercase tracking-[0.15em] text-[#D7E2EA]/35 font-medium mt-1">
            {skill.category}
          </span>
        </div>

        {/* Skill name */}
        <div>
          <h3 className="text-base font-bold text-[#D7E2EA] leading-tight uppercase tracking-wide">
            {skill.name}
          </h3>
        </div>

        {/* Description */}
        <p className="text-[11px] sm:text-xs text-[#D7E2EA]/55 leading-relaxed flex-1">
          {skill.description}
        </p>

        {/* Skill level bar */}
        <div ref={barRef} className="mt-auto">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[9px] uppercase tracking-[0.12em] text-[#D7E2EA]/30">Proficiency</span>
            <span className="text-[10px] font-semibold text-[#D7E2EA]/60">{skill.level}%</span>
          </div>
          <div className="h-[3px] w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{
                width: animated ? `${skill.level}%` : '0%',
                background: `linear-gradient(90deg, ${skill.glow.replace('0.35', '0.9')}, ${skill.glow.replace('0.35', '0.5')})`,
                boxShadow: `0 0 8px ${skill.glow}`,
              }}
            />
          </div>
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
      className="bg-[#0C0C0C] text-[#D7E2EA] px-5 sm:px-8 md:px-10 py-24 sm:py-32 w-full z-20 relative border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-16 md:gap-20">

        {/* Section Header */}
        <FadeIn delay={0} y={40} className="flex flex-col items-center gap-4 text-center">
          {/* Label pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-[0.2em] text-[#D7E2EA]/50">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Capabilities
          </div>

          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{
              fontSize: 'clamp(2.2rem, 7vw, 80px)',
              background: 'linear-gradient(135deg, #ffffff 30%, rgba(255,255,255,0.45) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Tech Arsenal
          </h2>

          <p className="text-sm sm:text-base text-[#D7E2EA]/45 max-w-xl leading-relaxed">
            A curated set of tools, languages, and disciplines I use to build, ship, and support digital products.
          </p>
        </FadeIn>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 w-full">
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
