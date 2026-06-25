import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform, animate } from 'framer-motion'
import { MILESTONES, JOURNEY_STATS, type Milestone } from '../data/journey'

const EASE = [0.16, 1, 0.3, 1] as const
const TAG_LIMIT = 4

function AnimatedCounter({
  value,
  suffix = '',
  className = '',
  duration = 1.4,
}: {
  value: number
  suffix?: string
  className?: string
  duration?: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration,
      ease: EASE,
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value, duration])

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  )
}

function CollapsibleTags({ tags, accent }: { tags: string[]; accent: string }) {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? tags : tags.slice(0, TAG_LIMIT)
  const hasMore = tags.length > TAG_LIMIT

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {visible.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-lg text-[11px] font-medium"
            style={{
              background: `${accent}0d`,
              border: `1px solid ${accent}22`,
              color: `${accent}cc`,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 text-[11px] font-medium"
          style={{ color: `${accent}99` }}
        >
          {expanded ? 'Show less' : `+${tags.length - TAG_LIMIT} more`}
        </button>
      )}
    </div>
  )
}

function ProjectChips({ accent }: { accent: string }) {
  const projects = ['AI SOC Analyst', 'AI Agent RAG PDF', 'MentConnect', 'Client Projects']
  return (
    <div className="flex flex-wrap gap-2">
      {projects.map((label) => (
        <span
          key={label}
          className="px-2.5 py-1 rounded-lg text-[11px] font-medium"
          style={{
            background: `${accent}0d`,
            border: `1px solid ${accent}22`,
            color: `${accent}cc`,
          }}
        >
          {label}
        </span>
      ))}
    </div>
  )
}

function MilestoneNode({
  m,
  isActive,
  isLit,
}: {
  m: Milestone
  isActive: boolean
  isLit: boolean
}) {
  return (
    <div className="absolute -left-[25px] top-6 z-10">
      <motion.div
        className="rounded-full"
        style={{
          width: isActive ? 14 : 12,
          height: isActive ? 14 : 12,
          background: isLit ? m.accent : 'rgba(255,255,255,0.15)',
          border: `2px solid ${isLit ? m.accent : 'rgba(255,255,255,0.2)'}`,
        }}
        animate={
          isActive
            ? {
                boxShadow: [
                  `0 0 6px ${m.accent}40`,
                  `0 0 14px ${m.accent}80`,
                  `0 0 6px ${m.accent}40`,
                ],
              }
            : isLit
              ? { boxShadow: `0 0 8px ${m.accent}35` }
              : { boxShadow: 'none' }
        }
        transition={{ duration: 1.6, repeat: isActive ? Infinity : 0, ease: 'easeInOut' }}
      />
      {m.isFuture && isLit && (
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ border: `1px solid ${m.accent}55` }}
          animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
        />
      )}
    </div>
  )
}

function MilestoneCard({
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
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.04, ease: EASE }}
      className="relative rounded-2xl p-4"
      style={{
        background: `radial-gradient(ellipse at top left, ${isActive ? m.glow : 'transparent'}, transparent 65%), rgba(255,255,255,0.025)`,
        border: `1px solid ${isActive ? m.border : m.isFuture ? m.border : 'rgba(255,255,255,0.06)'}`,
        borderStyle: m.isFuture ? 'dashed' : 'solid',
        boxShadow: isActive ? `0 0 32px ${m.glow}` : 'none',
      }}
    >
      <MilestoneNode m={m} isActive={isActive} isLit={isLit} />

      <div className="flex items-start gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
          style={{ background: `${m.accent}14`, border: `1px solid ${m.accent}28` }}
        >
          <span role="img" aria-hidden="true">{m.emoji}</span>
        </div>
        <div className="min-w-0">
          <h3 className="font-bold text-white text-base leading-tight">{m.title}</h3>
          <p className="text-sm mt-0.5 font-medium leading-snug" style={{ color: `${m.accent}bb` }}>
            {m.subtitle}
          </p>
        </div>
      </div>

      <p className="text-sm text-white/45 leading-relaxed mb-4">{m.description}</p>

      {m.variant === 'gpa' && m.gpa !== undefined && (
        <div
          className="inline-flex items-baseline gap-2 mb-4 px-3 py-2 rounded-xl"
          style={{ background: `${m.accent}10`, border: `1px solid ${m.accent}25` }}
        >
          <span className="text-xs font-mono uppercase tracking-widest text-white/40">GPA</span>
          <span className="text-2xl font-extrabold tabular-nums" style={{ color: m.accent }}>
            <AnimatedCounter value={m.gpa} duration={1.2} />
          </span>
        </div>
      )}

      {m.variant === 'production' ? (
        <ProjectChips accent={m.accent} />
      ) : m.highlights.length > TAG_LIMIT ? (
        <CollapsibleTags tags={m.highlights} accent={m.accent} />
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
    </motion.article>
  )
}

function StatsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: EASE }}
      className="mt-16 pt-10 border-t border-white/[0.06]"
    >
      <div className="text-center mb-8">
        <p className="font-mono text-xs text-white/30 uppercase tracking-widest mb-2">By the numbers</p>
        <h3 className="text-2xl font-bold text-white">
          The journey, <span className="text-gradient-full">quantified.</span>
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {JOURNEY_STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={`rounded-2xl p-4 text-center ${i === JOURNEY_STATS.length - 1 ? 'col-span-2' : ''}`}
            style={{
              background: `radial-gradient(ellipse at top, ${stat.accent}10, transparent 70%), rgba(255,255,255,0.02)`,
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <span className="text-xl mb-1.5 block" role="img" aria-hidden="true">
              {stat.emoji}
            </span>
            <div className="text-2xl font-extrabold tabular-nums mb-0.5" style={{ color: stat.accent }}>
              <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={1.2} />
            </div>
            <p className="text-[11px] text-white/40 leading-snug">{stat.label}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function JourneyMobile() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [litCount, setLitCount] = useState(1)

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 85%', 'end 20%'],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      setLitCount(Math.min(MILESTONES.length, Math.max(1, Math.ceil(v * MILESTONES.length))))
      setActiveIndex(Math.min(MILESTONES.length - 1, Math.max(0, Math.floor(v * MILESTONES.length))))
    })
    return unsubscribe
  }, [scrollYProgress])

  return (
    <section id="journey" aria-label="Professional journey" className="relative py-20 overflow-hidden">
      <div
        className="absolute top-1/4 left-0 w-[280px] h-[280px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.05), transparent)' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-blue-400 uppercase tracking-widest">02 — Journey</span>
            <div className="flex-1 h-px bg-gradient-to-r from-blue-500/30 to-transparent" />
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight leading-tight mb-3 text-white">Journey</h2>
          <p className="text-white/40 text-base max-w-xl leading-relaxed">
            Every project, challenge, and milestone shaped the engineer I am today.
          </p>
        </div>

        <div ref={timelineRef} className="relative mt-12">
          {/* Progress pill */}
          <div className="flex justify-center mb-6">
            <span className="font-mono text-[10px] px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/35 tabular-nums">
              {activeIndex + 1} / {MILESTONES.length}
            </span>
          </div>

          {/* Timeline track + growing line */}
          <div className="relative pl-6">
            <div
              className="absolute left-0 top-0 bottom-0 w-px"
              style={{
                background: 'linear-gradient(to bottom, rgba(59,130,246,0.12), rgba(168,85,247,0.06), transparent)',
              }}
            />
            <motion.div
              className="absolute left-0 top-0 w-px origin-top"
              style={{
                height: lineHeight,
                background: 'linear-gradient(to bottom, #60a5fa, #06b6d4, #a855f7)',
                boxShadow: '0 0 8px rgba(96,165,250,0.45)',
              }}
            />

            <div className="space-y-6">
              {MILESTONES.map((m, i) => (
                <MilestoneCard
                  key={m.id}
                  m={m}
                  index={i}
                  isActive={i === activeIndex}
                  isLit={i < litCount}
                />
              ))}
            </div>
          </div>
        </div>

        <StatsSection />
      </div>
    </section>
  )
}
