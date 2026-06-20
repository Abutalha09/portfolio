import React from 'react';
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
  color: string;
}

const skills: SkillData[] = [
  {
    name: 'HTML5 & CSS3',
    category: 'Frontend Core',
    description: 'Structuring and styling semantic, high-performance user interfaces and responsive web layouts.',
    icon: <Code2 className="w-6 h-6" />,
    color: 'from-orange-500/20 to-red-500/10',
  },
  {
    name: 'JavaScript',
    category: 'Interactivity',
    description: 'Dynamic scripting, state control, DOM adjustments, and modern ES6+ frontend architectures.',
    icon: <Laptop className="w-6 h-6" />,
    color: 'from-yellow-500/20 to-amber-500/10',
  },
  {
    name: 'Python Coding',
    category: 'Programming',
    description: 'Foundational algorithmic logic, data processing scripts, and automation tasks.',
    icon: <Terminal className="w-6 h-6" />,
    color: 'from-blue-500/20 to-cyan-500/10',
  },
  {
    name: 'Git & Version Control',
    category: 'Workflow',
    description: 'Branch management, code merges, repository audits, and deployment flows using GitHub.',
    icon: <GitBranch className="w-6 h-6" />,
    color: 'from-purple-500/20 to-pink-500/10',
  },
  {
    name: 'Database Queries',
    category: 'Backend',
    description: 'Configuring and querying relational database tables and optimizing record alignment.',
    icon: <Database className="w-6 h-6" />,
    color: 'from-emerald-500/20 to-teal-500/10',
  },
  {
    name: 'SaaS Platform Support',
    category: 'Operations',
    description: 'Helping clients resolve workflow gaps, operational bottlenecks, and optimizing configuration values.',
    icon: <Headphones className="w-6 h-6" />,
    color: 'from-rose-500/20 to-indigo-500/10',
  },
  {
    name: 'Responsive Design',
    category: 'Interface',
    description: 'Fluid layout adjustments across mobile, tablet, and desktop viewports using CSS flex/grid.',
    icon: <Cpu className="w-6 h-6" />,
    color: 'from-indigo-500/20 to-purple-500/10',
  },
  {
    name: 'Digital Marketing',
    category: 'Strategy',
    description: 'Understanding campaign metrics, web traffic channels, and content positioning.',
    icon: <TrendingUp className="w-6 h-6" />,
    color: 'from-teal-500/20 to-emerald-500/10',
  },
  {
    name: 'Data Analytics',
    category: 'Insights',
    description: 'Extracting data performance tables, charts, and translating numbers into clear insights.',
    icon: <BarChart3 className="w-6 h-6" />,
    color: 'from-cyan-500/20 to-blue-500/10',
  },
];

export const SkillsSection: React.FC = () => {
  return (
    <section
      id="skills"
      className="bg-[#0C0C0C] text-[#D7E2EA] px-5 sm:px-8 md:px-10 py-24 sm:py-32 w-full z-20 relative border-t border-white/5"
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-16 md:gap-24">
        {/* Title */}
        <FadeIn delay={0} y={40}>
          <h2
            style={{ fontSize: 'clamp(2.5rem, 8vw, 100px)' }}
            className="hero-heading font-black uppercase text-center leading-none tracking-tight"
          >
            Tech Arsenal
          </h2>
        </FadeIn>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
          {skills.map((skill, index) => (
            <FadeIn
              key={skill.name}
              delay={index * 0.05}
              y={30}
              className={`flex flex-col bg-gradient-to-br ${skill.color} border border-white/10 hover:border-white/25 transition-all duration-300 rounded-3xl p-6 text-left shadow-lg justify-between hover:scale-[1.02]`}
            >
              <div>
                {/* Icon wrapper */}
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 mb-4 text-[#D7E2EA]">
                  {skill.icon}
                </div>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#D7E2EA] opacity-40 block mb-1">
                  {skill.category}
                </span>
                <h3 className="text-lg sm:text-xl font-bold uppercase text-[#D7E2EA] mb-2">
                  {skill.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#D7E2EA]/75 font-light leading-relaxed">
                  {skill.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
