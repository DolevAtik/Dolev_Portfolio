import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

const skillCategories = [
  {
    title: 'Backend & APIs',
    color: 'blue',
    accent: '#3b82f6',
    skills: [
      { name: 'Python', detail: 'Flask, FastAPI, automation', years: '3y' },
      { name: 'Node.js', detail: 'Express, REST, async patterns', years: '2y' },
      { name: 'Java', detail: 'OOP, data structures, algorithms', years: '2y' },
      { name: 'SQL / NoSQL', detail: 'PostgreSQL, MongoDB, queries', years: '2y' },
    ],
  },
  {
    title: 'AI & Intelligence',
    color: 'purple',
    accent: '#a855f7',
    skills: [
      { name: 'LLMs & Prompting', detail: 'Ollama, OpenAI API integration', years: '1y' },
      { name: 'RAG Systems', detail: 'ChromaDB, vector embeddings', years: '1y' },
      { name: 'ChromaDB', detail: 'Vector storage, semantic search', years: '1y' },
      { name: 'AI Pipelines', detail: 'End-to-end LLM applications', years: '1y' },
    ],
  },
  {
    title: 'DevOps & Cloud',
    color: 'cyan',
    accent: '#06b6d4',
    skills: [
      { name: 'Docker', detail: 'Compose, multi-stage builds', years: '2y' },
      { name: 'Kubernetes', detail: 'Deployments, pods, services', years: '1y' },
      { name: 'GitHub Actions', detail: 'CI/CD pipelines, automation', years: '2y' },
      { name: 'Linux / Bash', detail: 'Shell scripting, system admin', years: '3y' },
    ],
  },
  {
    title: 'Frontend',
    color: 'blue',
    accent: '#60a5fa',
    skills: [
      { name: 'React', detail: 'Hooks, context, TypeScript', years: '2y' },
      { name: 'TypeScript', detail: 'Type safety, interfaces, generics', years: '2y' },
      { name: 'Tailwind CSS', detail: 'Utility-first, responsive design', years: '2y' },
      { name: 'Framer Motion', detail: 'Animations, transitions', years: '1y' },
    ],
  },
]

const colorMap: Record<string, { bg: string; border: string; text: string; dot: string }> = {
  blue: { bg: 'rgba(59,130,246,0.05)', border: 'rgba(59,130,246,0.12)', text: '#60a5fa', dot: '#3b82f6' },
  purple: { bg: 'rgba(168,85,247,0.05)', border: 'rgba(168,85,247,0.12)', text: '#c084fc', dot: '#a855f7' },
  cyan: { bg: 'rgba(6,182,212,0.05)', border: 'rgba(6,182,212,0.12)', text: '#22d3ee', dot: '#06b6d4' },
}

function SkillCategoryCard({ cat, delay }: { cat: typeof skillCategories[0]; delay: number }) {
  const c = colorMap[cat.color]
  return (
    <FadeIn delay={delay}>
      <motion.div
        className="h-full rounded-2xl p-6 overflow-hidden relative"
        style={{ background: c.bg, border: `1px solid ${c.border}` }}
        whileHover={{ scale: 1.01, y: -3 }}
        transition={{ duration: 0.2 }}
      >
        {/* Subtle corner glow */}
        <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-20 blur-2xl pointer-events-none"
          style={{ background: c.text }} />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-2 h-2 rounded-full" style={{ background: c.dot, boxShadow: `0 0 8px ${c.dot}` }} />
            <h3 className="font-bold text-white text-sm tracking-tight">{cat.title}</h3>
          </div>

          <div className="space-y-3">
            {cat.skills.map((skill) => (
              <motion.div
                key={skill.name}
                className="flex items-start gap-3 p-3 rounded-xl group cursor-default"
                style={{ background: 'rgba(255,255,255,0.02)' }}
                whileHover={{ background: 'rgba(255,255,255,0.04)', x: 3 }}
                transition={{ duration: 0.15 }}
              >
                <div className="w-1 h-full min-h-[2rem] rounded-full mt-1 flex-shrink-0" style={{ background: c.dot, opacity: 0.6 }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <span className="text-sm font-semibold text-white/90">{skill.name}</span>
                    <span className="text-[10px] font-mono text-white/25 flex-shrink-0">{skill.years}</span>
                  </div>
                  <p className="text-xs text-white/35 leading-relaxed">{skill.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </FadeIn>
  )
}


export default function Skills() {
  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[600px] h-[500px] bg-blue-600/4 rounded-full blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Skills header */}
        <FadeIn>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-blue-400 uppercase tracking-widest">04 — Skills</span>
            <div className="flex-1 h-px bg-gradient-to-r from-blue-500/30 to-transparent" />
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            <span className="text-white">Tools of</span>
            <br />
            <span className="text-gradient-blue">the craft.</span>
          </h2>
          <p className="text-white/35 text-base mb-14 max-w-lg">
            Not just a list — skills built through shipping real production software.
          </p>
        </FadeIn>

        {/* Skill category cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
          {skillCategories.map((cat, i) => (
            <SkillCategoryCard key={cat.title} cat={cat} delay={0.1 + i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  )
}
