import { motion } from 'framer-motion'
import { techStack } from '../data/portfolio'
import FadeIn from './FadeIn'
import LiveTerminal from './LiveTerminal'

const skillCategories = [
  {
    title: 'Backend & APIs',
    color: 'blue',
    accent: '#3b82f6',
    skills: [
      { name: 'Python', detail: 'Flask, automation, scripting', years: '3y' },
      { name: 'Node.js', detail: 'Express, REST, async patterns', years: '2y' },
      { name: 'Java', detail: 'OOP, data structures, algorithms', years: '2y' },
      { name: 'SQL / NoSQL', detail: 'PostgreSQL, MongoDB, Supabase', years: '2y' },
    ],
  },
  {
    title: 'AI & LLMs',
    color: 'purple',
    accent: '#a855f7',
    skills: [
      { name: 'LangChain', detail: 'Chains, agents, memory, tools', years: '1y' },
      { name: 'RAG Systems', detail: 'ChromaDB, vector embeddings', years: '1y' },
      { name: 'Ollama', detail: 'Local LLM inference, model management', years: '1y' },
      { name: 'Prompt Engineering', detail: 'LLM integration, fine-tuning prompts', years: '1y' },
    ],
  },
  {
    title: 'DevOps & Cloud',
    color: 'cyan',
    accent: '#06b6d4',
    skills: [
      { name: 'Docker', detail: 'Compose, multi-stage builds', years: '2y' },
      { name: 'Kubernetes', detail: 'Deployments, pods, services', years: '1y' },
      { name: 'ArgoCD', detail: 'GitOps, continuous delivery, sync', years: '1y' },
      { name: 'GitHub Actions', detail: 'CI/CD pipelines, automation', years: '2y' },
    ],
  },
  {
    title: 'Languages & Tools',
    color: 'blue',
    accent: '#60a5fa',
    skills: [
      { name: 'Linux / Bash', detail: 'Shell scripting, system admin', years: '3y' },
      { name: 'JavaScript', detail: 'Full-stack, async, REST clients', years: '2y' },
      { name: 'C++', detail: 'Algorithms, systems programming', years: '2y' },
      { name: 'Git', detail: 'Branching, GitOps, team workflows', years: '3y' },
    ],
  },
]

const colorMap: Record<string, { bg: string; border: string; text: string; dot: string }> = {
  blue:   { bg: 'rgba(59,130,246,0.05)',  border: 'rgba(59,130,246,0.12)',  text: '#60a5fa', dot: '#3b82f6' },
  purple: { bg: 'rgba(168,85,247,0.05)',  border: 'rgba(168,85,247,0.12)',  text: '#c084fc', dot: '#a855f7' },
  cyan:   { bg: 'rgba(6,182,212,0.05)',   border: 'rgba(6,182,212,0.12)',   text: '#22d3ee', dot: '#06b6d4' },
}

function SkillCategoryCard({ cat, delay }: { cat: typeof skillCategories[0]; delay: number }) {
  const c = colorMap[cat.color]
  return (
    <FadeIn delay={delay}>
      <motion.div
        className="h-full rounded-2xl p-3 md:p-6 overflow-hidden relative"
        style={{ background: c.bg, border: `1px solid ${c.border}` }}
        whileHover={{ scale: 1.01, y: -3 }}
        transition={{ duration: 0.2 }}
      >
        <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-20 blur-2xl pointer-events-none"
          style={{ background: c.text }} />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3 md:mb-5">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: c.dot, boxShadow: `0 0 8px ${c.dot}` }} />
            <h3 className="font-bold text-white text-xs md:text-sm tracking-tight">{cat.title}</h3>
          </div>

          <div className="space-y-2 md:space-y-3">
            {cat.skills.map((skill) => (
              <motion.div
                key={skill.name}
                className="flex items-start gap-2 md:gap-3 p-2 md:p-3 rounded-xl group cursor-default"
                style={{ background: 'rgba(255,255,255,0.02)' }}
                whileHover={{ background: 'rgba(255,255,255,0.04)', x: 3 }}
                transition={{ duration: 0.15 }}
              >
                <div className="w-1 min-h-[1.5rem] rounded-full mt-1 flex-shrink-0" style={{ background: c.dot, opacity: 0.6 }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="text-[11px] md:text-sm font-semibold text-white/90 truncate">{skill.name}</span>
                    <span className="text-[9px] md:text-[10px] font-mono text-white/25 flex-shrink-0">{skill.years}</span>
                  </div>
                  <p className="text-[10px] md:text-xs text-white/35 leading-relaxed hidden md:block">{skill.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </FadeIn>
  )
}

function TechLogo({ tech, index }: { tech: typeof techStack[0]; index: number }) {
  const color = tech.color
  return (
    <FadeIn delay={index * 0.03}>
      <motion.div
        className="group flex flex-col items-center gap-2 p-4 rounded-xl cursor-default select-none"
        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
        whileHover={{
          scale: 1.1,
          y: -6,
          background: `${color}0d`,
          borderColor: `${color}30`,
          boxShadow: `0 12px 40px ${color}15`,
        }}
        animate={{ y: [0, index % 2 === 0 ? -5 : 5, 0] }}
        transition={{
          y: { duration: 3 + (index % 3), repeat: Infinity, ease: 'easeInOut', delay: index * 0.15 },
        }}
      >
        <motion.div
          className="w-2.5 h-2.5 rounded-full"
          style={{ background: color }}
          animate={{ boxShadow: [`0 0 4px ${color}40`, `0 0 12px ${color}80`, `0 0 4px ${color}40`] }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.1 }}
        />
        <span className="text-[11px] font-medium text-white/45 group-hover:text-white/90 transition-colors text-center leading-tight">
          {tech.name}
        </span>
      </motion.div>
    </FadeIn>
  )
}

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[600px] h-[500px] bg-blue-600/4 rounded-full blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-blue-400 uppercase tracking-widest">03 — Tech Stack</span>
            <div className="flex-1 h-px bg-gradient-to-r from-blue-500/30 to-transparent" />
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 id="skills-heading" className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            <span className="text-white">Tools of</span>
            <br />
            <span className="text-gradient-blue">the craft.</span>
          </h2>
          <p className="text-white/35 text-base mb-14 max-w-lg">
            Not just a list — skills built through shipping real production software.
          </p>
        </FadeIn>

        {/* Category cards */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4 mb-24">
          {skillCategories.map((cat, i) => (
            <SkillCategoryCard key={cat.title} cat={cat} delay={0.1 + i * 0.08} />
          ))}
        </div>

        {/* LiveTerminal + Tech stack palette */}
        <div className="grid lg:grid-cols-2 gap-10 mb-16">
          <div>
            <FadeIn>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">Live Terminal</span>
                <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/30 to-transparent" />
              </div>
              <p className="text-white/30 text-sm mb-5">Real commands from real workflows.</p>
            </FadeIn>
            <LiveTerminal />
          </div>

          <div>
            <FadeIn>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-purple-400 uppercase tracking-widest">Tech Stack</span>
                <div className="flex-1 h-px bg-gradient-to-r from-purple-500/30 to-transparent" />
              </div>
              <p className="text-white/30 text-sm mb-5">Everything in the arsenal.</p>
            </FadeIn>
            <div className="grid grid-cols-4 gap-2">
              {techStack.map((tech, i) => (
                <TechLogo key={tech.name} tech={tech} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
