import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Shield, GraduationCap, Rocket, Brain, Server, Star } from 'lucide-react'

const MILESTONES = [
  {
    id: 1,
    year: '2020',
    icon: Shield,
    title: 'Military Service',
    subtitle: 'Israeli Defense Forces',
    description: 'Served in the IDF, developing discipline, team leadership, and the ability to perform under pressure. Learned what it means to take responsibility for critical systems.',
    color: 'from-slate-500/20 to-slate-600/10',
    accent: 'text-slate-400',
    border: 'border-slate-500/20',
    dot: 'bg-slate-500',
    tags: ['Leadership', 'Discipline', 'Resilience'],
  },
  {
    id: 2,
    year: '2022',
    icon: GraduationCap,
    title: 'Computer Science',
    subtitle: 'B.Sc. — GPA 93',
    description: 'Dove deep into CS fundamentals: algorithms, operating systems, networks, databases. Not just learning theory — building software every semester that actually runs.',
    color: 'from-blue-500/15 to-blue-600/5',
    accent: 'text-blue-400',
    border: 'border-blue-500/20',
    dot: 'bg-blue-500',
    tags: ['Algorithms', 'OS', 'Networks', 'Databases', 'GPA 93'],
  },
  {
    id: 3,
    year: '2023',
    icon: Rocket,
    title: 'Co-Founded Web4You',
    subtitle: 'Software Agency',
    description: 'Started a software agency from zero. Landed real clients, delivered 20+ production websites, managed deployments, and learned that real engineering happens when things go wrong at 2am.',
    color: 'from-cyan-500/15 to-cyan-600/5',
    accent: 'text-cyan-400',
    border: 'border-cyan-500/20',
    dot: 'bg-cyan-400',
    tags: ['Full Stack', 'Client Work', '20+ Sites', 'DevOps'],
  },
  {
    id: 4,
    year: '2024',
    icon: Server,
    title: 'DevOps & Cloud',
    subtitle: 'Docker · Kubernetes · CI/CD',
    description: 'Went deep on infrastructure. Containerized everything, orchestrated with Kubernetes, built automated pipelines. Understood that great software means nothing if you can\'t ship it reliably.',
    color: 'from-purple-500/15 to-purple-600/5',
    accent: 'text-purple-400',
    border: 'border-purple-500/20',
    dot: 'bg-purple-500',
    tags: ['Docker', 'Kubernetes', 'GitHub Actions', 'Linux'],
  },
  {
    id: 5,
    year: '2024–25',
    icon: Brain,
    title: 'AI & LLM Systems',
    subtitle: 'RAG · ChromaDB · Ollama',
    description: 'Built production AI applications before AI became a buzzword. Designed RAG pipelines, integrated local LLMs, built a full AI SOC analyst. Discovered that AI engineering is 90% engineering and 10% prompting.',
    color: 'from-blue-500/15 to-purple-500/10',
    accent: 'text-blue-400',
    border: 'border-blue-500/20',
    dot: 'bg-gradient-to-r from-blue-500 to-purple-500',
    tags: ['LLMs', 'RAG', 'ChromaDB', 'Ollama', 'Security AI'],
  },
  {
    id: 6,
    year: '2026 →',
    icon: Star,
    title: 'The Next Chapter',
    subtitle: 'Senior Software Engineer',
    description: 'Graduating October 2026. Looking to join a team that builds products millions of people use. Interested in backend systems, AI infrastructure, and companies that value engineering craft.',
    color: 'from-amber-500/15 to-amber-600/5',
    accent: 'text-amber-400',
    border: 'border-amber-500/20',
    dot: 'bg-amber-400',
    tags: ['Open to Work', 'Backend', 'AI', 'Remote/Israel'],
    isFuture: true,
  },
]

function MilestoneCard({ m, index }: { m: typeof MILESTONES[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const Icon = m.icon
  const isRight = index % 2 === 1

  return (
    <div ref={ref} className={`relative flex items-start gap-6 md:gap-0 ${isRight ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
      {/* Card side */}
      <motion.div
        initial={{ opacity: 0, x: isRight ? 40 : -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 md:w-[calc(50%-3rem)]"
      >
        <motion.div
          className={`group p-6 rounded-2xl bg-gradient-to-br border ${m.color} ${m.border} backdrop-blur-sm`}
          style={m.isFuture ? { borderStyle: 'dashed' } : {}}
          whileHover={{ scale: 1.02, y: -3 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-start gap-3 mb-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${m.isFuture ? 'bg-amber-500/10' : 'bg-white/[0.04]'}`}>
              <Icon size={17} className={m.accent} />
            </div>
            <div>
              <div className={`text-xs font-mono font-bold ${m.accent} mb-0.5`}>{m.year}</div>
              <h3 className="font-bold text-white leading-tight text-base">{m.title}</h3>
              <p className={`text-xs ${m.accent} opacity-70`}>{m.subtitle}</p>
            </div>
          </div>

          <p className="text-sm text-white/55 leading-relaxed mb-4">{m.description}</p>

          <div className="flex flex-wrap gap-1.5">
            {m.tags.map((tag) => (
              <span
                key={tag}
                className={`px-2 py-0.5 rounded text-[10px] font-medium bg-white/[0.04] ${m.accent} border border-white/[0.05]`}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Center dot — desktop only */}
      <div className="hidden md:flex flex-col items-center justify-start w-24 pt-6 flex-shrink-0">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.15 }}
          className={`w-4 h-4 rounded-full ${m.dot} shadow-lg flex-shrink-0`}
          style={{ boxShadow: `0 0 20px rgba(59,130,246,0.4)` }}
        />
      </div>

      {/* Empty opposite side — desktop layout balance */}
      <div className="hidden md:block flex-1" />
    </div>
  )
}

export default function Journey() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' })
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="journey" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/3 rounded-full blur-[150px]" />
      </div>

      <div ref={sectionRef} className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-blue-400 uppercase tracking-widest">The Story</span>
            <div className="flex-1 h-px bg-gradient-to-r from-blue-500/30 to-transparent" />
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            <span className="text-white">Every great engineer</span>
            <br />
            <span className="text-gradient-blue">has a journey.</span>
          </h2>
          <p className="text-white/40 text-base mb-20 max-w-xl">
            From military service to AI systems — here's the path that shaped how I think about software.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Animated vertical line — desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/[0.04] -translate-x-1/2">
            <motion.div
              className="w-full origin-top"
              style={{
                height: lineHeight,
                background: 'linear-gradient(to bottom, #3b82f6, #06b6d4, #a855f7)',
              }}
            />
          </div>

          {/* Mobile line */}
          <div className="md:hidden absolute left-5 top-0 bottom-0 w-px bg-white/[0.04]" />

          <div className="space-y-8">
            {MILESTONES.map((m, i) => (
              <MilestoneCard key={m.id} m={m} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
