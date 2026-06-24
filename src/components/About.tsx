import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { personalInfo } from '../data/portfolio'
import { Zap, Server, Brain, Shield } from 'lucide-react'

const highlights = [
  { icon: Brain, label: 'AI & LLMs', desc: 'RAG systems, vector DBs, local models', color: 'blue' },
  { icon: Server, label: 'Backend & APIs', desc: 'Flask, Node.js, REST, scalable services', color: 'cyan' },
  { icon: Shield, label: 'DevOps & Cloud', desc: 'Docker, K8s, CI/CD, GitHub Actions', color: 'purple' },
  { icon: Zap, label: 'Full Stack', desc: 'React, TypeScript, Tailwind, modern UX', color: 'blue' },
]

const colorMap: Record<string, string> = {
  blue: 'from-blue-500/10 to-blue-600/5 border-blue-500/20 text-blue-400',
  cyan: 'from-cyan-500/10 to-cyan-600/5 border-cyan-500/20 text-cyan-400',
  purple: 'from-purple-500/10 to-purple-600/5 border-purple-500/20 text-purple-400',
}

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
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

export default function About() {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-blue-600/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-purple-600/5 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section label */}
        <FadeIn>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-blue-400 uppercase tracking-widest">01 — About</span>
            <div className="flex-1 h-px bg-gradient-to-r from-blue-500/30 to-transparent" />
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left: text */}
          <div>
            <FadeIn delay={0.1}>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-8">
                <span className="text-white">Building software</span>
                <br />
                <span className="text-gradient-blue">that actually matters.</span>
              </h2>
            </FadeIn>

            <div className="space-y-5">
              {personalInfo.bio.map((p, i) => (
                <FadeIn key={i} delay={0.15 + i * 0.1}>
                  <p className="text-white/60 leading-relaxed text-base">{p}</p>
                </FadeIn>
              ))}
            </div>

            {/* Quick stats */}
            <FadeIn delay={0.4}>
              <div className="mt-10 grid grid-cols-3 gap-4">
                {[
                  { value: '93', unit: 'GPA', sub: 'Computer Science' },
                  { value: '20+', unit: 'Sites', sub: 'Shipped to production' },
                  { value: '3+', unit: 'Years', sub: 'Building software' },
                ].map((stat) => (
                  <div
                    key={stat.unit}
                    className="p-4 rounded-2xl glass-card border border-white/[0.04] text-center"
                  >
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs font-semibold text-blue-400 mt-0.5">{stat.unit}</div>
                    <div className="text-xs text-white/30 mt-0.5">{stat.sub}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right: highlight cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((h, i) => {
              const Icon = h.icon
              return (
                <FadeIn key={h.label} delay={0.2 + i * 0.1}>
                  <motion.div
                    className={`p-5 rounded-2xl bg-gradient-to-br border ${colorMap[h.color]} backdrop-blur-sm cursor-default`}
                    whileHover={{ scale: 1.02, y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-4 ${
                      h.color === 'blue' ? 'bg-blue-500/15' : h.color === 'cyan' ? 'bg-cyan-500/15' : 'bg-purple-500/15'
                    }`}>
                      <Icon size={18} className={
                        h.color === 'blue' ? 'text-blue-400' : h.color === 'cyan' ? 'text-cyan-400' : 'text-purple-400'
                      } />
                    </div>
                    <h3 className="font-semibold text-white text-sm mb-1">{h.label}</h3>
                    <p className="text-xs text-white/40 leading-relaxed">{h.desc}</p>
                  </motion.div>
                </FadeIn>
              )
            })}

            {/* Web4You callout */}
            <FadeIn delay={0.5}>
              <motion.div
                className="sm:col-span-2 p-5 rounded-2xl relative overflow-hidden border border-blue-500/10"
                style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.06), rgba(168,85,247,0.06))' }}
                whileHover={{ scale: 1.01 }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
                <div className="relative z-10">
                  <div className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-2">Co-Founder</div>
                  <div className="font-bold text-white text-lg mb-1">Web4You</div>
                  <p className="text-sm text-white/50">
                    Software agency delivering production websites and custom solutions to real clients across Israel.
                  </p>
                </div>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
