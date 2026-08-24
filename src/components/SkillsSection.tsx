import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MaskReveal, KineticBackWord } from './KineticEditorial';

type Tier = 'Advanced' | 'Proficient' | 'Familiar';

/** How many of the 3 segments a tier fills — honest levels, not fake percentages. */
const TIER_FILL: Record<Tier, number> = { Advanced: 3, Proficient: 2, Familiar: 1 };

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface SkillData {
  name: string;
  tier: Tier;
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
      { name: 'HTML5 & CSS3',      tier: 'Advanced',   emoji: '🌐' },
      { name: 'JavaScript',        tier: 'Proficient', emoji: '⚡' },
      { name: 'Responsive Design', tier: 'Advanced',   emoji: '📱' },
    ],
  },
  {
    label: 'Operations & Support',
    icon: '🎧',
    skills: [
      { name: 'SaaS Support',      tier: 'Advanced',   emoji: '🎧' },
      { name: 'Software Testing',  tier: 'Proficient', emoji: '🧪' },
      { name: 'Data Analytics',    tier: 'Proficient', emoji: '📊' },
    ],
  },
  {
    label: 'Tools & Other',
    icon: '🛠️',
    skills: [
      { name: 'Python',            tier: 'Proficient', emoji: '🐍' },
      { name: 'Git & GitHub',      tier: 'Proficient', emoji: '🌿' },
      { name: 'Database Queries',  tier: 'Familiar',   emoji: '🗄️' },
    ],
  },
];

const techStack = [
  'HTML5', 'CSS3', 'JavaScript', 'Python', 'React', 'Git',
  'GitHub', 'Tailwind CSS', 'Figma', 'VS Code', 'Netlify', 'Vercel',
];

/* One skill entry — hairline-ruled editorial row with an honest 3-segment level. */
const SkillRow: React.FC<{ skill: SkillData; index: number }> = ({ skill, index }) => {
  const reduce = useReducedMotion();
  const fill = TIER_FILL[skill.tier];
  const num = String(index + 1).padStart(2, '0');
  const localDelay = (index % 3) * 0.05;

  return (
    <motion.div
      className="kxs-row group"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay: localDelay }}
    >
      <span className="kxs-index" aria-hidden="true">{num}</span>
      <MaskReveal as="span" className="kxs-name" text={skill.name} delay={localDelay} />
      <div className="kxs-level">
        <span className="kxs-tier">{skill.tier}</span>
        <div className="kxs-segs" role="img" aria-label={`${skill.tier} proficiency: ${fill} of 3`}>
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className={`kxs-seg${i < fill ? ' kxs-seg--on' : ''}`}
              initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={reduce ? { duration: 0 } : { duration: 0.5, ease: EASE, delay: 0.12 + i * 0.09 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const SkillsSection: React.FC = () => {
  return (
    <section
      className="w-full px-4 sm:px-8 md:px-10 py-20 sm:py-28 relative overflow-hidden"
      style={{ background: 'var(--bg-primary)', color: 'var(--text-dark)' }}
    >
      <KineticBackWord>Stack</KineticBackWord>

      <div className="kx-content max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <motion.span
            className="tag-yellow"
            style={{ display: 'inline-block' }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            04 — Skills
          </motion.span>
          <MaskReveal
            as="h2"
            className="section-heading"
            style={{ fontSize: 'clamp(2.4rem, 7vw, 5.5rem)', marginTop: '1rem' }}
            text={'Tech\nArsenal'}
          />
          <motion.p
            className="kx-desc"
            style={{ maxWidth: '46ch', marginTop: '1.25rem' }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12 }}
          >
            Tools, languages, and disciplines I use to build, ship, and support digital products.
          </motion.p>
        </div>

        {/* Categorized skill ledgers */}
        <div className="kxs-groups">
          {categories.map((cat, catIdx) => (
            <div key={cat.label} className="kxs-group">
              <div className="kxs-group-head">
                <span className="kxs-tick" />
                <span className="kxs-cat-emoji" aria-hidden="true">{cat.icon}</span>
                <MaskReveal as="h3" className="kx-subhead" text={cat.label} />
              </div>
              <div className="kxs-list">
                {cat.skills.map((skill, idx) => (
                  <SkillRow key={skill.name} skill={skill} index={catIdx * 3 + idx} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Technologies strip — editorial tags */}
        <div style={{ marginTop: 'clamp(3rem, 6vw, 5rem)' }}>
          <div className="kxs-group-head" style={{ marginBottom: '1.1rem' }}>
            <span className="kxs-tick" />
            <MaskReveal as="h3" className="kx-subhead" text="Technologies I Work With" />
          </div>
          <div className="kx-tags kxs-techtags">
            {techStack.map((tech) => (
              <span key={tech} className="kx-tag">{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
