import { motion } from 'framer-motion'
import { education } from '../data/portfolio'
import { GraduationCap, Award, CheckCircle2 } from 'lucide-react'
import FadeIn from './FadeIn'

const icons = [GraduationCap, Award]

export default function Education() {
  return (
    <section id="education" aria-labelledby="education-heading" className="relative py-32 overflow-hidden">
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
          <h2 id="education-heading" className="text-4xl md:text-5xl font-extrabold tracking-tight mb-16">
            <span className="text-white">Academic</span>
            <br />
            <span className="text-gradient-blue">foundation.</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-2 gap-3 md:gap-6">
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
                  <div className="p-3 md:p-6 pb-3 md:pb-4 border-b border-white/[0.04]">
                    <div className="flex items-start gap-2 md:gap-4">
                      <div className="w-8 h-8 md:w-11 md:h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(6,182,212,0.1))', border: '1px solid rgba(59,130,246,0.2)' }}>
                        <Icon size={15} className="text-blue-400 md:hidden" />
                        <Icon size={20} className="text-blue-400 hidden md:block" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-white leading-tight mb-0.5 text-xs md:text-base">{edu.degree}</h3>
                        <p className="text-[11px] md:text-sm text-blue-400 truncate">{edu.institution}</p>
                        <p className="text-[10px] md:text-xs font-mono text-white/30 mt-0.5">{edu.period}</p>
                      </div>
                    </div>

                    {edu.gpa && (
                      <div className="mt-2 md:mt-4 inline-flex items-center gap-1.5 px-2 md:px-3 py-1 md:py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <span className="text-[10px] md:text-xs text-white/40">GPA</span>
                        <span className="text-xs md:text-sm font-bold text-gradient-blue">{edu.gpa}</span>
                        <span className="text-[10px] md:text-xs text-white/20 hidden md:inline">/ 100</span>
                      </div>
                    )}
                  </div>

                  {/* Highlights */}
                  <div className="p-3 md:p-6">
                    <div className="text-[10px] md:text-xs font-mono text-white/30 uppercase tracking-widest mb-2 md:mb-3">Coursework</div>
                    <ul className="space-y-1.5 md:space-y-2">
                      {edu.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-1.5 md:gap-2.5 text-[11px] md:text-sm text-white/55">
                          <CheckCircle2 size={11} className="text-cyan-400 flex-shrink-0 md:hidden" />
                          <CheckCircle2 size={13} className="text-cyan-400 flex-shrink-0 hidden md:block" />
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
