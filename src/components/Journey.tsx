import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { Shield, GraduationCap, Rocket, Brain, Server, Star, ChevronLeft, ChevronRight } from 'lucide-react'

const MILESTONES = [
  {
    id: 1,
    year: '2020',
    icon: Shield,
    title: 'Military Service',
    subtitle: 'Israeli Defense Forces',
    description: 'Served in the IDF, developing discipline, team leadership, and the ability to perform under pressure. Learned what it means to take responsibility for critical systems.',
    accent: '#94a3b8',
    border: 'rgba(148,163,184,0.15)',
    glow: 'rgba(148,163,184,0.08)',
    tags: ['Leadership', 'Discipline', 'Resilience'],
  },
  {
    id: 2,
    year: '2022',
    icon: GraduationCap,
    title: 'Computer Science',
    subtitle: 'B.Sc. — GPA 93',
    description: 'Dove deep into CS fundamentals: algorithms, operating systems, networks, databases. Not just learning theory — building software every semester that actually runs.',
    accent: '#3b82f6',
    border: 'rgba(59,130,246,0.2)',
    glow: 'rgba(59,130,246,0.08)',
    tags: ['Algorithms', 'OS', 'Networks', 'GPA 93'],
  },
  {
    id: 3,
    year: '2023',
    icon: Rocket,
    title: 'Co-Founded Web4You',
    subtitle: 'Software Agency',
    description: 'Started a software agency from zero. Landed real clients, delivered 20+ production websites, managed deployments, and learned that real engineering happens when things go wrong at 2am.',
    accent: '#06b6d4',
    border: 'rgba(6,182,212,0.2)',
    glow: 'rgba(6,182,212,0.08)',
    tags: ['Full Stack', 'Client Work', '20+ Sites', 'DevOps'],
  },
  {
    id: 4,
    year: '2024',
    icon: Server,
    title: 'DevOps & Cloud',
    subtitle: 'Docker · Kubernetes · CI/CD',
    description: "Went deep on infrastructure. Containerized everything, orchestrated with Kubernetes, built automated pipelines. Understood that great software means nothing if you can't ship it reliably.",
    accent: '#a855f7',
    border: 'rgba(168,85,247,0.2)',
    glow: 'rgba(168,85,247,0.08)',
    tags: ['Docker', 'Kubernetes', 'GitHub Actions', 'Linux'],
  },
  {
    id: 5,
    year: '2024–25',
    icon: Brain,
    title: 'AI & LLM Systems',
    subtitle: 'RAG · ChromaDB · Ollama',
    description: 'Built production AI applications before AI became a buzzword. Designed RAG pipelines, integrated local LLMs, built a full AI SOC analyst. Discovered that AI engineering is 90% engineering and 10% prompting.',
    accent: '#60a5fa',
    border: 'rgba(96,165,250,0.2)',
    glow: 'rgba(96,165,250,0.08)',
    tags: ['LLMs', 'RAG', 'ChromaDB', 'Security AI'],
  },
  {
    id: 6,
    year: '2026 →',
    icon: Star,
    title: 'The Next Chapter',
    subtitle: 'Senior Software Engineer',
    description: 'Graduating October 2026. Looking to join a team that builds products millions of people use. Interested in backend systems, AI infrastructure, and companies that value engineering craft.',
    accent: '#f59e0b',
    border: 'rgba(245,158,11,0.2)',
    glow: 'rgba(245,158,11,0.08)',
    tags: ['Open to Work', 'Backend', 'AI', 'Remote/Israel'],
    isFuture: true,
  },
]

const CARD_WIDTH = 320
const CARD_GAP = 20

function MilestoneCard({ m, index, isActive }: { m: typeof MILESTONES[0]; index: number; isActive: boolean }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px' })
  const Icon = m.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="flex-shrink-0 flex flex-col"
      style={{ width: CARD_WIDTH }}
    >
      {/* Dot + connector line */}
      <div className="flex items-center mb-5 gap-0">
        <motion.div
          className="w-3 h-3 rounded-full flex-shrink-0 z-10"
          style={{ background: m.accent, boxShadow: `0 0 12px ${m.accent}70` }}
          animate={isActive ? { scale: [1, 1.4, 1], boxShadow: [`0 0 8px ${m.accent}60`, `0 0 20px ${m.accent}90`, `0 0 8px ${m.accent}60`] } : {}}
          transition={{ duration: 1.5, repeat: isActive ? Infinity : 0, ease: 'easeInOut' }}
        />
        <div
          className="flex-1 h-px ml-0"
          style={{
            background: `linear-gradient(to right, ${m.accent}60, ${m.accent}10)`,
          }}
        />
      </div>

      {/* Card */}
      <motion.div
        className="flex-1 rounded-2xl p-5 cursor-default select-none"
        style={{
          background: `radial-gradient(ellipse at top left, ${m.glow}, transparent 70%), rgba(255,255,255,0.02)`,
          border: `1px solid ${isActive ? m.border : 'rgba(255,255,255,0.05)'}`,
          borderStyle: m.isFuture ? 'dashed' : 'solid',
          transition: 'border-color 0.3s ease',
        }}
        whileHover={{ y: -4, scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-start gap-3 mb-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${m.accent}14` }}
          >
            <Icon size={16} style={{ color: m.accent }} />
          </div>
          <div>
            <div className="text-[10px] font-mono font-bold uppercase tracking-widest mb-0.5" style={{ color: m.accent }}>
              {m.year}
            </div>
            <h3 className="font-bold text-white leading-tight text-sm">{m.title}</h3>
            <p className="text-[11px] mt-0.5" style={{ color: `${m.accent}99` }}>{m.subtitle}</p>
          </div>
        </div>

        <p className="text-xs text-white/45 leading-relaxed mb-4">{m.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {m.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded text-[10px] font-medium"
              style={{
                background: `${m.accent}10`,
                border: `1px solid ${m.accent}25`,
                color: `${m.accent}cc`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Journey() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' })
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  // Drag with Framer Motion
  const x = useMotionValue(0)
  const springX = useSpring(x, { damping: 30, stiffness: 200 })

  const totalWidth = MILESTONES.length * (CARD_WIDTH + CARD_GAP) - CARD_GAP

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const scrollLeft = el.scrollLeft
    const maxScroll = el.scrollWidth - el.clientWidth
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft < maxScroll - 10)

    const cardStep = CARD_WIDTH + CARD_GAP
    const idx = Math.round(scrollLeft / cardStep)
    setActiveIndex(Math.min(idx, MILESTONES.length - 1))
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('scroll', updateScrollState, { passive: true })
    updateScrollState()
    return () => el.removeEventListener('scroll', updateScrollState)
  }, [updateScrollState])

  const scrollTo = (dir: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const step = CARD_WIDTH + CARD_GAP
    const target = dir === 'right'
      ? Math.min(el.scrollLeft + step, el.scrollWidth - el.clientWidth)
      : Math.max(el.scrollLeft - step, 0)
    el.scrollTo({ left: target, behavior: 'smooth' })
  }

  const scrollToIndex = (i: number) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ left: i * (CARD_WIDTH + CARD_GAP), behavior: 'smooth' })
  }

  // Progress bar width
  const progressPct = MILESTONES.length > 1
    ? (activeIndex / (MILESTONES.length - 1)) * 100
    : 0

  return (
    <section id="journey" aria-label="Professional journey and experience" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[160px]"
          style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.04), transparent)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs text-blue-400 uppercase tracking-widest">The Story</span>
              <div className="flex-1 h-px bg-gradient-to-r from-blue-500/30 to-transparent" />
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              <span className="text-white">Every great engineer</span>
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #60a5fa 0%, #06b6d4 50%, #a855f7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                has a journey.
              </span>
            </h2>
            <p className="text-white/35 text-sm mb-10 max-w-lg">
              From military service to AI systems — here's the path that shaped how I think about software.
            </p>
          </motion.div>
        </div>

        {/* Navigation row */}
        <div className="flex items-center justify-between mb-6">
          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {MILESTONES.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === activeIndex ? 20 : 6,
                  height: 6,
                  background: i === activeIndex
                    ? MILESTONES[i].accent
                    : 'rgba(255,255,255,0.12)',
                }}
              />
            ))}
          </div>

          {/* Arrow buttons */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => scrollTo('left')}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                opacity: canScrollLeft ? 1 : 0.3,
              }}
              whileHover={canScrollLeft ? { scale: 1.08, background: 'rgba(59,130,246,0.12)', borderColor: 'rgba(59,130,246,0.3)' } : {}}
              whileTap={canScrollLeft ? { scale: 0.95 } : {}}
              disabled={!canScrollLeft}
            >
              <ChevronLeft size={16} className="text-white/60" />
            </motion.button>
            <motion.button
              onClick={() => scrollTo('right')}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                opacity: canScrollRight ? 1 : 0.3,
              }}
              whileHover={canScrollRight ? { scale: 1.08, background: 'rgba(59,130,246,0.12)', borderColor: 'rgba(59,130,246,0.3)' } : {}}
              whileTap={canScrollRight ? { scale: 0.95 } : {}}
              disabled={!canScrollRight}
            >
              <ChevronRight size={16} className="text-white/60" />
            </motion.button>
          </div>
        </div>

        {/* Scrollable track */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4"
          style={{
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            cursor: 'grab',
          }}
          onMouseDown={(e) => {
            const el = scrollRef.current
            if (!el) return
            const startX = e.pageX - el.offsetLeft
            const startScroll = el.scrollLeft
            el.style.cursor = 'grabbing'

            const onMove = (ev: MouseEvent) => {
              const delta = (ev.pageX - el.offsetLeft) - startX
              el.scrollLeft = startScroll - delta
            }
            const onUp = () => {
              el.style.cursor = 'grab'
              window.removeEventListener('mousemove', onMove)
              window.removeEventListener('mouseup', onUp)
            }
            window.addEventListener('mousemove', onMove)
            window.addEventListener('mouseup', onUp)
          }}
        >
          <style>{`
            #journey-scroll::-webkit-scrollbar { display: none; }
          `}</style>
          {MILESTONES.map((m, i) => (
            <div key={m.id} style={{ scrollSnapAlign: 'start' }}>
              <MilestoneCard m={m} index={i} isActive={i === activeIndex} />
            </div>
          ))}
          {/* Trailing space so last card doesn't get cut */}
          <div className="flex-shrink-0 w-6" />
        </div>

        {/* Progress bar */}
        <div className="mt-6 h-px bg-white/[0.05] rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(to right, #3b82f6, #06b6d4, #a855f7)',
              width: `${progressPct}%`,
            }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>

        {/* Drag hint */}
        <motion.p
          className="text-center text-[11px] text-white/20 mt-3 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          drag to explore
        </motion.p>
      </div>
    </section>
  )
}
