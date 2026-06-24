import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { skills, techStack } from '../data/portfolio'

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

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-white/80">{name}</span>
        <span className="text-xs font-mono text-white/30">{level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #3b82f6, #06b6d4)' }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  )
}

const categoryColors: Record<string, string> = {
  Languages: 'text-blue-400 border-blue-500/20 bg-blue-500/10',
  Backend: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/10',
  Frontend: 'text-purple-400 border-purple-500/20 bg-purple-500/10',
  DevOps: 'text-blue-400 border-blue-500/20 bg-blue-500/10',
  AI: 'text-purple-400 border-purple-500/20 bg-purple-500/10',
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/4 w-[600px] h-[400px] bg-blue-600/5 -translate-x-1/2 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-blue-400 uppercase tracking-widest">04 — Skills</span>
            <div className="flex-1 h-px bg-gradient-to-r from-blue-500/30 to-transparent" />
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-16">
            <span className="text-white">Tools of</span>
            <br />
            <span className="text-gradient-blue">the craft.</span>
          </h2>
        </FadeIn>

        {/* Skill categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {Object.entries(skills).map(([category, items], catIdx) => (
            <FadeIn key={category} delay={0.1 + catIdx * 0.08}>
              <div
                className="p-6 rounded-2xl h-full"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <div className={`inline-flex px-2.5 py-1 rounded-md text-xs font-mono font-semibold border mb-5 ${categoryColors[category]}`}>
                  {category}
                </div>
                <div className="space-y-4">
                  {items.map((skill, i) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      delay={0.15 + catIdx * 0.05 + i * 0.07}
                    />
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Tech Stack */}
        <FadeIn>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">Tech Stack</span>
            <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/30 to-transparent" />
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h3 className="text-2xl font-bold text-white mb-10">Everything in the arsenal.</h3>
        </FadeIn>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {techStack.map((tech, i) => (
            <FadeIn key={tech.name} delay={i * 0.04}>
              <motion.div
                className="group flex flex-col items-center gap-2 p-4 rounded-xl cursor-default"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
                whileHover={{
                  scale: 1.08,
                  y: -4,
                  background: `rgba(${tech.color === '#3b82f6' ? '59,130,246' : tech.color === '#06b6d4' ? '6,182,212' : tech.color === '#a855f7' ? '168,85,247' : '249,115,22'}, 0.08)`,
                  borderColor: `${tech.color}40`,
                  boxShadow: `0 8px 30px ${tech.color}20`,
                }}
                transition={{ duration: 0.2 }}
                animate={{ y: [0, i % 2 === 0 ? -4 : 4, 0] }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: tech.color, boxShadow: `0 0 8px ${tech.color}80` }}
                />
                <span className="text-xs font-medium text-white/50 group-hover:text-white/90 transition-colors text-center leading-tight">
                  {tech.name}
                </span>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
