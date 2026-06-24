import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { experiences } from '../data/portfolio'
import { CheckCircle2, ExternalLink } from 'lucide-react'

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

export default function Experience() {
  return (
    <section id="experience" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-1/2 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">02 — Experience</span>
            <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/30 to-transparent" />
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-16">
            <span className="text-white">Where I've been</span>
            <br />
            <span className="text-gradient-blue">and what I built.</span>
          </h2>
        </FadeIn>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/30 via-cyan-500/20 to-transparent" />

          <div className="space-y-16">
            {experiences.map((exp, i) => (
              <FadeIn key={exp.id} delay={0.15 + i * 0.1}>
                <div className="relative flex gap-8 md:gap-16">
                  {/* Timeline dot */}
                  <div className="relative flex-shrink-0 w-0 md:w-16 flex justify-center">
                    <motion.div
                      className="absolute top-1 w-4 h-4 rounded-full bg-blue-500 border-2 border-blue-400 shadow-lg shadow-blue-500/50"
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>

                  {/* Content card */}
                  <motion.div
                    className="flex-1 rounded-2xl overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(59,130,246,0.04), rgba(6,182,212,0.03))',
                      border: '1px solid rgba(59,130,246,0.1)',
                    }}
                    whileHover={{ scale: 1.005, y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Card header */}
                    <div className="p-6 pb-4 border-b border-white/[0.04]">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-1">
                        <div>
                          <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-blue-400 font-semibold">{exp.company}</span>
                            <ExternalLink size={13} className="text-blue-400/50" />
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                            {exp.period}
                          </span>
                        </div>
                      </div>
                      <p className="text-white/50 text-sm leading-relaxed mt-3">{exp.description}</p>
                    </div>

                    <div className="p-6 grid md:grid-cols-2 gap-6">
                      {/* Achievements */}
                      <div>
                        <div className="text-xs font-mono text-white/30 uppercase tracking-widest mb-3">Highlights</div>
                        <ul className="space-y-2">
                          {exp.achievements.map((a) => (
                            <li key={a} className="flex items-start gap-2.5 text-sm text-white/60">
                              <CheckCircle2 size={14} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                              {a}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech */}
                      <div>
                        <div className="text-xs font-mono text-white/30 uppercase tracking-widest mb-3">Technologies</div>
                        <div className="flex flex-wrap gap-2">
                          {exp.tech.map((t) => (
                            <span
                              key={t}
                              className="px-2.5 py-1 rounded-md text-xs font-medium text-white/70 bg-white/[0.04] border border-white/[0.06]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </FadeIn>
            ))}

            {/* "Currently Building" node */}
            <FadeIn delay={0.3}>
              <div className="relative flex gap-8 md:gap-16">
                <div className="relative flex-shrink-0 w-0 md:w-16 flex justify-center">
                  <motion.div
                    className="absolute top-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-emerald-400 shadow-lg shadow-emerald-500/40"
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>
                <div className="flex-1 py-2">
                  <div className="inline-flex items-center gap-2 text-sm text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Currently open to new opportunities
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
