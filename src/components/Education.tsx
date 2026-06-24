import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { education } from '../data/portfolio'
import { GraduationCap, Award, CheckCircle2 } from 'lucide-react'

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

const icons = [GraduationCap, Award]

export default function Education() {
  return (
    <section id="education" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-cyan-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest">05 — Education</span>
            <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/30 to-transparent" />
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-16">
            <span className="text-white">Academic</span>
            <br />
            <span className="text-gradient-blue">foundation.</span>
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6">
          {education.map((edu, i) => {
            const Icon = icons[i]
            return (
              <FadeIn key={edu.id} delay={0.15 + i * 0.1}>
                <motion.div
                  className="h-full rounded-2xl overflow-hidden"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                  whileHover={{ scale: 1.01, y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Header */}
                  <div className="p-6 pb-4 border-b border-white/[0.04]">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(6,182,212,0.1))', border: '1px solid rgba(59,130,246,0.2)' }}>
                        <Icon size={20} className="text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-white leading-tight mb-1">{edu.degree}</h3>
                        <p className="text-sm text-blue-400">{edu.institution}</p>
                        <p className="text-xs font-mono text-white/30 mt-1">{edu.period}</p>
                      </div>
                    </div>

                    {edu.gpa && (
                      <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <span className="text-xs text-white/40">GPA</span>
                        <span className="text-sm font-bold text-gradient-blue">{edu.gpa}</span>
                        <span className="text-xs text-white/20">/ 100</span>
                      </div>
                    )}
                  </div>

                  {/* Highlights */}
                  <div className="p-6">
                    <div className="text-xs font-mono text-white/30 uppercase tracking-widest mb-3">Coursework & Topics</div>
                    <ul className="space-y-2">
                      {edu.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2.5 text-sm text-white/55">
                          <CheckCircle2 size={13} className="text-cyan-400 flex-shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
