import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { personalInfo } from '../data/portfolio'
import { Zap, Server, Brain, Shield, ArrowRight } from 'lucide-react'

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

const pillars = [
  {
    icon: Brain,
    label: 'AI Engineering',
    desc: 'RAG pipelines, vector databases, local LLM integration with Ollama',
    color: 'blue',
  },
  {
    icon: Server,
    label: 'Backend Systems',
    desc: 'Flask, Node.js, REST APIs built to handle real production load',
    color: 'cyan',
  },
  {
    icon: Shield,
    label: 'DevOps & Security',
    desc: 'Docker, Kubernetes, CI/CD — and an AI SOC analyst to prove it',
    color: 'purple',
  },
  {
    icon: Zap,
    label: 'Full Product',
    desc: '20+ sites delivered end-to-end: design, dev, deploy, maintain',
    color: 'blue',
  },
]

const colorMap: Record<string, { card: string; icon: string; iconBg: string }> = {
  blue: {
    card: 'from-blue-500/[0.06] to-transparent border-blue-500/[0.12]',
    icon: 'text-blue-400',
    iconBg: 'bg-blue-500/10',
  },
  cyan: {
    card: 'from-cyan-500/[0.06] to-transparent border-cyan-500/[0.12]',
    icon: 'text-cyan-400',
    iconBg: 'bg-cyan-500/10',
  },
  purple: {
    card: 'from-purple-500/[0.06] to-transparent border-purple-500/[0.12]',
    icon: 'text-purple-400',
    iconBg: 'bg-purple-500/10',
  },
}

const bioHighlights = [
  'I don\'t just write code — I ship software.',
  'Co-Founder of Web4You. 20+ production websites. Real clients, real pressure.',
  'Currently at the intersection of backend engineering and AI systems.',
]

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[400px] rounded-full blur-[130px]"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.05), transparent)' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full blur-[100px]"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.04), transparent)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-blue-400 uppercase tracking-widest">01 — About</span>
            <div className="flex-1 h-px bg-gradient-to-r from-blue-500/30 to-transparent" />
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-start">
          {/* Left */}
          <div>
            <FadeIn delay={0.1}>
              <h2 id="about-heading" className="text-4xl md:text-5xl font-extrabold tracking-tight mb-8 leading-tight">
                <span className="text-white">Building software</span>
                <br />
                <span className="text-gradient-blue">that actually ships.</span>
              </h2>
            </FadeIn>

            {/* Highlighted quote lines */}
            <div className="space-y-4 mb-8">
              {bioHighlights.map((line, i) => (
                <FadeIn key={i} delay={0.15 + i * 0.08}>
                  <div className="flex items-start gap-3">
                    <div className="w-1 h-full min-h-[1.5rem] rounded-full bg-gradient-to-b from-blue-500 to-cyan-500 flex-shrink-0 mt-1" />
                    <p className="text-white/65 leading-relaxed font-medium">{line}</p>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Bio paragraphs */}
            <div className="space-y-4">
              {personalInfo.bio.map((p, i) => (
                <FadeIn key={i} delay={0.3 + i * 0.1}>
                  <p className="text-white/45 leading-relaxed text-sm">{p}</p>
                </FadeIn>
              ))}
            </div>

            {/* CTA to journey */}
            <FadeIn delay={0.55}>
              <motion.a
                href="#journey"
                onClick={(e) => { e.preventDefault(); document.querySelector('#journey')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="inline-flex items-center gap-2 mt-8 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors group"
              >
                See my full story
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </FadeIn>
          </div>

          {/* Right: cards + stats */}
          <div>
            <div className="grid grid-cols-2 gap-3 mb-5">
              {pillars.map((p, i) => {
                const c = colorMap[p.color]
                const Icon = p.icon
                return (
                  <FadeIn key={p.label} delay={0.2 + i * 0.1}>
                    <motion.div
                      className={`p-5 rounded-2xl bg-gradient-to-br border ${c.card} h-full`}
                      whileHover={{ scale: 1.03, y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${c.iconBg}`}>
                        <Icon size={16} className={c.icon} />
                      </div>
                      <div className="font-semibold text-white text-sm mb-1">{p.label}</div>
                      <p className="text-xs text-white/35 leading-relaxed">{p.desc}</p>
                    </motion.div>
                  </FadeIn>
                )
              })}
            </div>

            {/* Stats card */}
            <FadeIn delay={0.45}>
              <div
                className="p-5 rounded-2xl border border-white/[0.05] relative overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.02)' }}
              >
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at 80% 0%, rgba(59,130,246,0.06), transparent 60%)' }} />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-xs font-mono text-white/25 uppercase tracking-widest">At a glance</div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { val: '93', label: 'GPA', sub: 'CS Degree' },
                      { val: '20+', label: 'Sites', sub: 'Production' },
                      { val: '3+', label: 'Years', sub: 'Experience' },
                    ].map((s) => (
                      <div key={s.label} className="text-center">
                        <div className="text-2xl font-black text-white">{s.val}</div>
                        <div className="text-xs font-semibold text-blue-400 mt-0.5">{s.label}</div>
                        <div className="text-[10px] text-white/25">{s.sub}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/[0.04] flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs text-white/30">Co-Founder, <span className="text-white/60">Web4You</span> — Active</span>
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
