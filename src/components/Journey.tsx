import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { Shield, GraduationCap, Rocket, Brain, Server, Star, ChevronLeft, ChevronRight } from 'lucide-react'

const MILESTONES = [
  {
    id: 1,
    year: '2020',
    icon: Shield,
    title: 'Military Service',
    subtitle: 'Israeli Defense Forces',
    description:
      'Served in the IDF — developed discipline, team leadership, and the ability to perform under pressure. Learned what it means to take responsibility for critical systems.',
    accent: '#94a3b8',
    glow: 'rgba(148,163,184,0.07)',
    border: 'rgba(148,163,184,0.14)',
    tags: ['Leadership', 'Discipline', 'Resilience'],
  },
  {
    id: 2,
    year: '2022',
    icon: GraduationCap,
    title: 'Computer Science',
    subtitle: 'B.Sc. — GPA 93',
    description:
      'Dove deep into CS fundamentals: algorithms, operating systems, networks, databases. Not just theory — building software every semester that actually runs.',
    accent: '#3b82f6',
    glow: 'rgba(59,130,246,0.08)',
    border: 'rgba(59,130,246,0.18)',
    tags: ['Algorithms', 'OS', 'Networks', 'GPA 93'],
  },
  {
    id: 3,
    year: '2023',
    icon: Rocket,
    title: 'Co-Founded Web4You',
    subtitle: 'Software Agency',
    description:
      'Started a software agency from zero. Landed real clients, delivered 20+ production websites, managed deployments, and learned that real engineering happens when things go wrong at 2am.',
    accent: '#06b6d4',
    glow: 'rgba(6,182,212,0.08)',
    border: 'rgba(6,182,212,0.18)',
    tags: ['Full Stack', 'Client Work', '20+ Sites', 'DevOps'],
  },
  {
    id: 4,
    year: '2024',
    icon: Server,
    title: 'DevOps & Cloud',
    subtitle: 'Docker · Kubernetes · CI/CD',
    description:
      "Went deep on infrastructure. Containerized everything, orchestrated with Kubernetes, built automated pipelines. Understood that great software means nothing if you can't ship it reliably.",
    accent: '#a855f7',
    glow: 'rgba(168,85,247,0.08)',
    border: 'rgba(168,85,247,0.18)',
    tags: ['Docker', 'Kubernetes', 'GitHub Actions', 'Linux'],
  },
  {
    id: 5,
    year: '2024–25',
    icon: Brain,
    title: 'AI & LLM Systems',
    subtitle: 'RAG · ChromaDB · Ollama',
    description:
      'Built production AI applications before AI became a buzzword. Designed RAG pipelines, integrated local LLMs, built a full AI SOC analyst. AI engineering is 90% engineering.',
    accent: '#60a5fa',
    glow: 'rgba(96,165,250,0.08)',
    border: 'rgba(96,165,250,0.18)',
    tags: ['LLMs', 'RAG', 'ChromaDB', 'Security AI'],
  },
  {
    id: 6,
    year: '2026 →',
    icon: Star,
    title: 'The Next Chapter',
    subtitle: 'Senior Software Engineer',
    description:
      'Graduating October 2026. Looking to join a team building products millions of people use — backend systems, AI infrastructure, companies that value engineering craft.',
    accent: '#f59e0b',
    glow: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.18)',
    tags: ['Open to Work', 'Backend', 'AI', 'Israel / Remote'],
    isFuture: true,
  },
]

const CARD_W = 300
const CARD_GAP = 16
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

function Card({
  m,
  index,
  isActive,
}: {
  m: (typeof MILESTONES)[0]
  index: number
  isActive: boolean
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const Icon = m.icon

  return (
    <motion.div
      ref={ref}
      initial={isMobile ? false : { opacity: 0, y: 24 }}
      animate={isMobile ? {} : (inView ? { opacity: 1, y: 0 } : {})}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="flex-shrink-0 flex flex-col"
      style={{ width: CARD_W, scrollSnapAlign: 'start' }}
    >
      {/* Dot + connector */}
      <div className="flex items-center mb-4 gap-0">
        <motion.div
          className="w-3 h-3 rounded-full flex-shrink-0"
          style={{ background: m.accent }}
          animate={
            isActive
              ? {
                  boxShadow: [
                    `0 0 6px ${m.accent}60`,
                    `0 0 18px ${m.accent}90`,
                    `0 0 6px ${m.accent}60`,
                  ],
                  scale: [1, 1.3, 1],
                }
              : { boxShadow: `0 0 6px ${m.accent}40` }
          }
          transition={{ duration: 1.6, repeat: isActive ? Infinity : 0, ease: 'easeInOut' }}
        />
        <div
          className="flex-1 h-px"
          style={{
            background: `linear-gradient(to right, ${m.accent}55, transparent)`,
          }}
        />
      </div>

      {/* Card body */}
      <motion.div
        className="flex-1 rounded-2xl p-5 cursor-default select-none"
        style={{
          background: `radial-gradient(ellipse at top left, ${m.glow}, transparent 65%), rgba(255,255,255,0.02)`,
          border: `1px solid ${isActive ? m.border : 'rgba(255,255,255,0.05)'}`,
          borderStyle: m.isFuture ? 'dashed' : 'solid',
          transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
          boxShadow: isActive ? `0 0 40px ${m.glow}` : 'none',
        }}
        whileHover={{ y: -4, scale: 1.015 }}
        transition={{ duration: 0.2 }}
      >
        {/* Icon + meta */}
        <div className="flex items-start gap-3 mb-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${m.accent}14` }}
          >
            <Icon size={16} style={{ color: m.accent }} />
          </div>
          <div>
            <div
              className="text-[10px] font-mono font-bold uppercase tracking-widest mb-0.5"
              style={{ color: m.accent }}
            >
              {m.year}
            </div>
            <h3 className="font-bold text-white text-sm leading-tight">{m.title}</h3>
            <p className="text-[11px] mt-0.5" style={{ color: `${m.accent}99` }}>
              {m.subtitle}
            </p>
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
                border: `1px solid ${m.accent}22`,
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
  const headerInView = useInView(headerRef, { once: true, margin: '0px 0px -80px 0px' })
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(true)

  const onScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    setCanLeft(scrollLeft > 8)
    setCanRight(scrollLeft < scrollWidth - clientWidth - 8)
    const step = CARD_W + CARD_GAP
    setActiveIndex(Math.min(Math.round(scrollLeft / step), MILESTONES.length - 1))
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => el.removeEventListener('scroll', onScroll)
  }, [onScroll])

  const scrollBy = (dir: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const step = CARD_W + CARD_GAP
    const target =
      dir === 'right'
        ? Math.min(el.scrollLeft + step, el.scrollWidth - el.clientWidth)
        : Math.max(el.scrollLeft - step, 0)
    el.scrollTo({ left: target, behavior: 'smooth' })
  }

  const scrollToIdx = (i: number) => {
    scrollRef.current?.scrollTo({ left: i * (CARD_W + CARD_GAP), behavior: 'smooth' })
  }

  const progress = MILESTONES.length > 1 ? (activeIndex / (MILESTONES.length - 1)) * 100 : 0
  const activeAccent = MILESTONES[activeIndex]?.accent ?? '#3b82f6'

  return (
    <section
      id="journey"
      aria-label="Professional journey"
      className="relative py-28 overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full blur-[160px]"
          style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.04), transparent)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-blue-400 uppercase tracking-widest">The Story</span>
                <div className="w-16 h-px bg-gradient-to-r from-blue-500/40 to-transparent" />
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-3">
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
              <p className="text-white/35 text-sm max-w-md">
                From military service to AI systems — the path that shaped how I think about software.
              </p>
            </div>

            {/* Nav arrows */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <motion.button
                onClick={() => scrollBy('left')}
                disabled={!canLeft}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-opacity"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  opacity: canLeft ? 1 : 0.3,
                  cursor: canLeft ? 'pointer' : 'default',
                }}
                whileHover={canLeft ? { scale: 1.08, borderColor: `${activeAccent}44` } : {}}
                whileTap={canLeft ? { scale: 0.93 } : {}}
              >
                <ChevronLeft size={16} className="text-white/60" />
              </motion.button>
              <motion.button
                onClick={() => scrollBy('right')}
                disabled={!canRight}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-opacity"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  opacity: canRight ? 1 : 0.3,
                  cursor: canRight ? 'pointer' : 'default',
                }}
                whileHover={canRight ? { scale: 1.08, borderColor: `${activeAccent}44` } : {}}
                whileTap={canRight ? { scale: 0.93 } : {}}
              >
                <ChevronRight size={16} className="text-white/60" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Dot nav */}
        <div className="flex items-center gap-2 mb-6">
          {MILESTONES.map((m, i) => (
            <motion.button
              key={i}
              onClick={() => scrollToIdx(i)}
              className="rounded-full transition-all duration-300"
              style={{
                height: 6,
                width: i === activeIndex ? 22 : 6,
                background: i === activeIndex ? m.accent : 'rgba(255,255,255,0.12)',
              }}
              whileHover={{ scale: 1.2 }}
              aria-label={`Go to ${MILESTONES[i].title}`}
            />
          ))}
        </div>

        {/* Scroll container */}
        <div
          ref={scrollRef}
          className="flex pb-4 overflow-x-auto"
          style={{
            gap: CARD_GAP,
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            cursor: 'grab',
          }}
          onMouseDown={(e) => {
            const el = scrollRef.current
            if (!el) return
            const startX = e.pageX - el.offsetLeft
            const startScroll = el.scrollLeft
            el.style.cursor = 'grabbing'
            const onMove = (ev: MouseEvent) => {
              el.scrollLeft = startScroll - (ev.pageX - el.offsetLeft - startX)
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
          <style>{`#journey-track::-webkit-scrollbar{display:none}`}</style>

          {MILESTONES.map((m, i) => (
            <Card key={m.id} m={m} index={i} isActive={i === activeIndex} />
          ))}

          {/* trailing spacer so last card isn't flush right */}
          <div className="flex-shrink-0" style={{ width: 24 }} />
        </div>

        {/* Progress bar */}
        <div
          className="mt-6 h-px rounded-full overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.05)' }}
        >
          <motion.div
            className="h-full rounded-full origin-left"
            style={{
              background: `linear-gradient(to right, #3b82f6, ${activeAccent})`,
            }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
        </div>

        <motion.p
          className="text-center text-[10px] text-white/18 mt-3 font-mono tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          drag · click arrows · or use dots to navigate
        </motion.p>
      </div>
    </section>
  )
}
