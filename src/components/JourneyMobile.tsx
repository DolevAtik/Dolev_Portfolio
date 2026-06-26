import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, animate } from 'framer-motion'
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
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: EASE }}
      className="h-full rounded-2xl p-4 flex flex-col"
      style={{
        background: `radial-gradient(ellipse at top left, ${isActive ? m.glow : 'transparent'}, transparent 65%), rgba(255,255,255,0.025)`,
        border: `1px solid ${isActive ? m.border : m.isFuture ? m.border : 'rgba(255,255,255,0.06)'}`,
        borderStyle: m.isFuture ? 'dashed' : 'solid',
        boxShadow: isActive ? `0 0 32px ${m.glow}` : 'none',
      }}
    >
      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-3">
        <div
          className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
          style={{
            background: isLit ? m.accent : 'rgba(255,255,255,0.1)',
            color: isLit ? '#000' : 'rgba(255,255,255,0.3)',
          }}
        >
          {index + 1}
        </div>
        {m.isFuture && (
          <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: `${m.accent}80` }}>
            Coming soon
          </span>
        )}
      </div>

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

      <div className="mt-auto">
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
      </div>
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
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.clientWidth - 48 // card width = container - padding
    const index = Math.round(el.scrollLeft / (cardWidth + 16)) // 16 = gap
    setActiveIndex(Math.min(MILESTONES.length - 1, Math.max(0, index)))
  }, [])

  const scrollTo = (index: number) => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.clientWidth - 48
    el.scrollTo({ left: index * (cardWidth + 16), behavior: 'smooth' })
  }

  return (
    <section id="journey" aria-label="Professional journey" className="relative py-20 overflow-hidden">
      <div
        className="absolute top-1/4 left-0 w-[280px] h-[280px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.05), transparent)' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="px-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-blue-400 uppercase tracking-widest">02 — Journey</span>
            <div className="flex-1 h-px bg-gradient-to-r from-blue-500/30 to-transparent" />
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight leading-tight mb-3 text-white">Journey</h2>
          <p className="text-white/40 text-base max-w-xl leading-relaxed">
            Every project, challenge, and milestone shaped the engineer I am today.
          </p>
        </div>

        {/* Counter */}
        <div className="flex justify-center mt-8 mb-4">
          <span className="font-mono text-[10px] px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/35 tabular-nums">
            {activeIndex + 1} / {MILESTONES.length}
          </span>
        </div>

        {/* Horizontal carousel */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 px-6"
          style={{ WebkitOverflowScrolling: 'touch', scrollPaddingLeft: '24px' }}
        >
          {MILESTONES.map((m, i) => (
            <div
              key={m.id}
              className="snap-start shrink-0"
              style={{ width: 'calc(100vw - 48px)' }}
            >
              <MilestoneCard
                m={m}
                index={i}
                isActive={i === activeIndex}
                isLit={i <= activeIndex}
              />
            </div>
          ))}
          {/* Trailing spacer so last card snaps flush */}
          <div className="shrink-0 w-px" />
        </div>

        {/* Dot navigation */}
        <div className="flex justify-center gap-2 mt-5 px-6">
          {MILESTONES.map((m, i) => (
            <button
              key={m.id}
              type="button"
              aria-label={`Go to ${m.title}`}
              onClick={() => scrollTo(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === activeIndex ? 20 : 6,
                height: 6,
                background: i === activeIndex ? m.accent : 'rgba(255,255,255,0.18)',
              }}
            />
          ))}
        </div>

        <div className="px-6">
          <StatsSection />
        </div>
      </div>
    </section>
  )
}
