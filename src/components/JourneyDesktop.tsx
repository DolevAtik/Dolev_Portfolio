import { useRef, useState, useEffect } from 'react'
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  animate,
  type MotionValue,
} from 'framer-motion'
import {
  ShieldCheck,
  FileSearch,
  Users,
  Briefcase,
} from 'lucide-react'
import { MILESTONES, type Milestone } from '../data/journey'

const EASE = [0.16, 1, 0.3, 1] as const

const STATS = [
  { emoji: '🎓', label: 'GPA', value: 93, suffix: '', accent: '#3b82f6' },
  { emoji: '🌐', label: 'Production Projects', value: 20, suffix: '+', accent: '#06b6d4' },
  { emoji: '🤖', label: 'AI Systems', value: 4, suffix: '+', accent: '#60a5fa' },
  { emoji: '☁️', label: 'DevOps & Cloud Projects', value: 10, suffix: '+', accent: '#a855f7' },
  { emoji: '💼', label: 'Years of Development', value: 3, suffix: '+', accent: '#f59e0b' },
]

function AnimatedCounter({
  value,
  suffix = '',
  className = '',
}: {
  value: number
  suffix?: string
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 2,
      ease: EASE,
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value])

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  )
}

function BackgroundParticles() {
  const particles = useRef(
    Array.from({ length: 28 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      duration: 6 + Math.random() * 8,
      delay: Math.random() * 4,
      color:
        i % 3 === 0
          ? 'rgba(59,130,246,0.5)'
          : i % 3 === 1
            ? 'rgba(6,182,212,0.5)'
            : 'rgba(168,85,247,0.4)',
    }))
  )

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.current.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: p.color,
          }}
          animate={{ y: [0, -30, 0], opacity: [0.08, 0.5, 0.08] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

function AINodes({ accent }: { accent: string }) {
  const nodes = ['LLM', 'RAG', 'Vec', 'AI', 'DB']
  return (
    <div className="absolute -inset-4 pointer-events-none overflow-visible hidden sm:block">
      {nodes.map((label, i) => {
        const angle = (i / nodes.length) * 360
        const r = 72
        return (
          <motion.div
            key={label}
            className="absolute left-1/2 top-1/2 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold"
            style={{
              background: `${accent}12`,
              border: `1px solid ${accent}33`,
              color: `${accent}cc`,
              x: '-50%',
              y: '-50%',
            }}
            animate={{
              x: [`calc(-50% + ${Math.cos((angle * Math.PI) / 180) * r}px)`, `calc(-50% + ${Math.cos(((angle + 360) * Math.PI) / 180) * r}px)`],
              y: [`calc(-50% + ${Math.sin((angle * Math.PI) / 180) * r}px)`, `calc(-50% + ${Math.sin(((angle + 360) * Math.PI) / 180) * r}px)`],
            }}
            transition={{ duration: 14 + i * 2, repeat: Infinity, ease: 'linear' }}
          >
            {label}
          </motion.div>
        )
      })}
    </div>
  )
}

function DevOpsGraphics({ accent }: { accent: string }) {
  const boxes = [
    { x: '8%', y: '12%', w: 28, h: 18, delay: 0 },
    { x: '72%', y: '8%', w: 32, h: 22, delay: 0.4 },
    { x: '78%', y: '68%', w: 24, h: 16, delay: 0.8 },
    { x: '12%', y: '72%', w: 30, h: 20, delay: 1.2 },
  ]
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
      {boxes.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-md"
          style={{
            left: b.x,
            top: b.y,
            width: b.w,
            height: b.h,
            border: `1px solid ${accent}28`,
            background: `${accent}08`,
          }}
          animate={{ opacity: [0.2, 0.55, 0.2], y: [0, -3, 0] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: b.delay, ease: 'easeInOut' }}
        />
      ))}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full"
        style={{ border: `1px dashed ${accent}25` }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}

const PROJECT_ICONS = [
  { icon: ShieldCheck, label: 'AI SOC', color: '#60a5fa' },
  { icon: FileSearch, label: 'RAG PDF', color: '#a855f7' },
  { icon: Users, label: 'MentConnect', color: '#06b6d4' },
  { icon: Briefcase, label: 'Clients', color: '#3b82f6' },
]

function ProjectIcons() {
  return (
    <div className="flex flex-wrap gap-3 mt-1">
      {PROJECT_ICONS.map(({ icon: Icon, label, color }, i) => (
        <motion.div
          key={label}
          className="flex items-center gap-2 px-3 py-2 rounded-xl"
          style={{
            background: `${color}10`,
            border: `1px solid ${color}22`,
          }}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 + i * 0.08, duration: 0.4, ease: EASE }}
          whileHover={{ y: -3, boxShadow: `0 8px 24px ${color}20` }}
        >
          <motion.div
            animate={{ boxShadow: [`0 0 8px ${color}00`, `0 0 14px ${color}55`, `0 0 8px ${color}00`] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
          >
            <Icon size={14} style={{ color }} />
          </motion.div>
          <span className="text-[11px] font-medium" style={{ color: `${color}cc` }}>
            {label}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

function MilestoneCard({
  m,
  index,
  isActive,
  side,
}: {
  m: Milestone
  index: number
  isActive: boolean
  side: 'left' | 'right'
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const slideX = side === 'left' ? -48 : 48

  return (
    <div
      ref={ref}
      className={`w-full md:w-[calc(50%-2.5rem)] ${side === 'left' ? 'md:pr-4 md:ml-0 md:mr-auto' : 'md:pl-4 md:ml-auto md:mr-0'}`}
    >
      <motion.div
        initial={{ opacity: 0, x: slideX, y: 24 }}
        animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.65, delay: index * 0.05, ease: EASE }}
        className="relative"
      >
        {m.variant === 'ai' && <AINodes accent={m.accent} />}
        {m.variant === 'devops' && <DevOpsGraphics accent={m.accent} />}

        <motion.div
          className="relative rounded-2xl p-6 md:p-7 cursor-default select-none overflow-hidden"
          style={{
            background: `radial-gradient(ellipse at top ${side === 'left' ? 'left' : 'right'}, ${m.glow}, transparent 60%), rgba(255,255,255,0.025)`,
            border: `1px solid ${isActive ? m.border : 'rgba(255,255,255,0.06)'}`,
            borderStyle: m.isFuture ? 'dashed' : 'solid',
            boxShadow: isActive ? `0 0 48px ${m.glow}, 0 20px 60px rgba(0,0,0,0.25)` : 'none',
          }}
          whileHover={{ y: -5, scale: 1.012 }}
          transition={{ duration: 0.22 }}
        >
          {/* Active gradient wash */}
          {isActive && (
            <motion.div
              className="absolute inset-0 pointer-events-none rounded-2xl"
              style={{
                background: `radial-gradient(ellipse at ${side === 'left' ? '20%' : '80%'} 0%, ${m.glow}, transparent 70%)`,
              }}
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}

          <div className="relative z-10">
            <div className="flex items-start gap-4 mb-4">
              <motion.div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
                style={{ background: `${m.accent}16`, border: `1px solid ${m.accent}28` }}
                animate={
                  isActive
                    ? {
                        boxShadow: [
                          `0 0 12px ${m.accent}30`,
                          `0 0 24px ${m.accent}60`,
                          `0 0 12px ${m.accent}30`,
                        ],
                      }
                    : {}
                }
                transition={{ duration: 2, repeat: isActive ? Infinity : 0, ease: 'easeInOut' }}
              >
                <span role="img" aria-hidden="true">{m.emoji}</span>
              </motion.div>
              <div className="min-w-0">
                <h3 className="font-bold text-white text-lg leading-tight">{m.title}</h3>
                <p className="text-sm mt-1 font-medium" style={{ color: `${m.accent}bb` }}>
                  {m.subtitle}
                </p>
              </div>
            </div>

            <p className="text-sm text-white/45 leading-relaxed mb-5">{m.description}</p>

            {m.variant === 'gpa' && m.gpa !== undefined && (
              <div
                className="inline-flex items-baseline gap-2 mb-5 px-4 py-2 rounded-xl"
                style={{ background: `${m.accent}10`, border: `1px solid ${m.accent}25` }}
              >
                <span className="text-xs font-mono uppercase tracking-widest text-white/40">GPA</span>
                <span className="text-3xl font-extrabold tabular-nums" style={{ color: m.accent }}>
                  <AnimatedCounter value={m.gpa} />
                </span>
              </div>
            )}

            {m.variant === 'production' ? (
              <ProjectIcons />
            ) : (
              <div className="flex flex-wrap gap-2">
                {m.highlights.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-medium"
                    style={{
                      background: `${m.accent}0d`,
                      border: `1px solid ${m.accent}22`,
                      color: `${m.accent}cc`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

function TimelineNode({
  m,
  isActive,
  isLit,
}: {
  m: Milestone
  isActive: boolean
  isLit: boolean
}) {
  return (
    <div className="relative z-20 flex-shrink-0 flex items-center justify-center w-10 md:w-12">
      <motion.div
        className="relative rounded-full"
        style={{
          width: isActive ? 18 : 14,
          height: isActive ? 18 : 14,
          background: isLit ? m.accent : 'rgba(255,255,255,0.12)',
          border: `2px solid ${isLit ? m.accent : 'rgba(255,255,255,0.15)'}`,
        }}
        animate={
          isActive
            ? {
                boxShadow: [
                  `0 0 8px ${m.accent}50`,
                  `0 0 22px ${m.accent}90`,
                  `0 0 8px ${m.accent}50`,
                ],
                scale: [1, 1.2, 1],
              }
            : isLit
              ? { boxShadow: `0 0 10px ${m.accent}40` }
              : {}
        }
        transition={{ duration: 1.8, repeat: isActive ? Infinity : 0, ease: 'easeInOut' }}
      />
      {m.isFuture && isLit && (
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ border: `1px solid ${m.accent}55` }}
          animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
        />
      )}
    </div>
  )
}

function MilestoneRow({
  m,
  index,
  isActive,
  isLit,
}: {
  m: Milestone
  index: number
  isActive: boolean
  isLit: boolean
}) {
  const side = index % 2 === 0 ? 'left' : 'right'
  const rowRef = useRef(null)
  const rowInView = useInView(rowRef, { margin: '-45% 0px -45% 0px' })

  return (
    <div ref={rowRef} className="relative flex flex-col md:flex-row md:items-center gap-6 md:gap-0 py-8 md:py-10">
      {/* Mobile: node + card stacked */}
      <div className="flex md:hidden items-start gap-4">
        <TimelineNode m={m} isActive={rowInView || isActive} isLit={isLit} />
        <MilestoneCard m={m} index={index} isActive={rowInView || isActive} side={side} />
      </div>

      {/* Desktop: alternating */}
      <div className="hidden md:flex w-full items-center">
        {side === 'left' ? (
          <>
            <MilestoneCard m={m} index={index} isActive={rowInView || isActive} side="left" />
            <TimelineNode m={m} isActive={rowInView || isActive} isLit={isLit} />
            <div className="w-[calc(50%-2.5rem)]" />
          </>
        ) : (
          <>
            <div className="w-[calc(50%-2.5rem)]" />
            <TimelineNode m={m} isActive={rowInView || isActive} isLit={isLit} />
            <MilestoneCard m={m} index={index} isActive={rowInView || isActive} side="right" />
          </>
        )}
      </div>
    </div>
  )
}

function StatsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE }}
      className="mt-20 pt-12 border-t border-white/[0.06]"
    >
      <div className="text-center mb-10">
        <p className="font-mono text-xs text-white/30 uppercase tracking-widest mb-2">By the numbers</p>
        <h3 className="text-2xl md:text-3xl font-bold text-white">
          The journey, <span className="text-gradient-full">quantified.</span>
        </h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-5">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
            className="relative rounded-2xl p-5 text-center overflow-hidden group"
            style={{
              background: `radial-gradient(ellipse at top, ${stat.accent}10, transparent 70%), rgba(255,255,255,0.02)`,
              border: '1px solid rgba(255,255,255,0.06)',
            }}
            whileHover={{ y: -4, borderColor: `${stat.accent}33` }}
          >
            <span className="text-2xl mb-2 block" role="img" aria-hidden="true">
              {stat.emoji}
            </span>
            <div
              className="text-3xl md:text-4xl font-extrabold tabular-nums mb-1"
              style={{ color: stat.accent }}
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </div>
            <p className="text-[11px] text-white/40 leading-snug">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function GrowingTimeline({ progress }: { progress: MotionValue<number> }) {
  const height = useTransform(progress, [0, 1], ['0%', '100%'])
  const glowOpacity = useTransform(progress, [0, 0.3, 1], [0.3, 0.7, 1])

  return (
    <div className="absolute left-[19px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px">
      {/* Static faint track */}
      <div
        className="absolute inset-0 w-px"
        style={{
          background: 'linear-gradient(to bottom, rgba(59,130,246,0.15), rgba(168,85,247,0.08), transparent)',
        }}
      />
      {/* Growing glow line */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px origin-top overflow-visible"
        style={{ height }}
      >
        <motion.div
          className="w-full h-full"
          style={{
            background: 'linear-gradient(to bottom, #60a5fa, #06b6d4, #a855f7)',
            opacity: glowOpacity,
            boxShadow: '0 0 12px rgba(96,165,250,0.6), 0 0 24px rgba(6,182,212,0.3)',
          }}
        />
      </motion.div>
    </div>
  )
}

export default function JourneyDesktop() {
  const sectionRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px 0px' })

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 20%'],
  })

  const [litCount, setLitCount] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const count = Math.min(MILESTONES.length, Math.max(1, Math.ceil(v * MILESTONES.length)))
      setLitCount(count)
      setActiveIndex(Math.min(MILESTONES.length - 1, Math.max(0, Math.floor(v * MILESTONES.length))))
    })
    return unsubscribe
  }, [scrollYProgress])

  const activeAccent = MILESTONES[activeIndex]?.accent ?? '#3b82f6'

  return (
    <section
      id="journey"
      ref={sectionRef}
      aria-label="Professional journey"
      className="relative py-32 overflow-hidden"
    >
      <BackgroundParticles />

      {/* Ambient glows — follow active milestone */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[140px]"
          animate={{
            background: `radial-gradient(circle, ${activeAccent}12, transparent)`,
          }}
          transition={{ duration: 0.8 }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.04), transparent)' }}
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8">
        <div ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs text-blue-400 uppercase tracking-widest">02 — Journey</span>
              <div className="flex-1 h-px bg-gradient-to-r from-blue-500/30 to-transparent" />
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4">
              <span className="text-white">Journey</span>
            </h2>

            <p className="text-white/40 text-base md:text-lg max-w-xl leading-relaxed">
              Every project, challenge, and milestone shaped the engineer I am today.
            </p>
          </motion.div>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative mt-16 md:mt-20">
          <GrowingTimeline progress={scrollYProgress} />

          <div className="relative">
            {MILESTONES.map((m, i) => (
              <MilestoneRow
                key={m.id}
                m={m}
                index={i}
                isActive={i === activeIndex}
                isLit={i < litCount}
              />
            ))}
          </div>
        </div>

        <StatsSection />
      </div>
    </section>
  )
}
