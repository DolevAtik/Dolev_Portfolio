import { motion } from 'framer-motion'
import { personalInfo } from '../data/portfolio'
import { Zap, Server, Brain, Shield } from 'lucide-react'
import FadeIn from './FadeIn'

const pillars = [
  {
    icon: Brain,
    label: 'AI Engineering',
    desc: 'Building intelligent applications with RAG architectures, local LLMs, vector databases, and production AI workflows.',
    color: 'blue',
  },
  {
    icon: Server,
    label: 'Backend Systems',
    desc: 'Designing scalable REST APIs, backend services, authentication, and database architectures for real-world applications.',
    color: 'cyan',
  },
  {
    icon: Shield,
    label: 'DevOps & Cloud',
    desc: 'Automating deployments with Docker, Kubernetes, GitHub Actions and GitOps workflows using ArgoCD.',
    color: 'purple',
  },
  {
    icon: Zap,
    label: 'Full Product development',
    desc: 'Taking products from idea to production — planning, development, deployment, and long-term maintenance.',
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
  'Co-Founder of Web4You. 20+ production websites. Real clients, real pressure.',
  'Backend engineering with scalable APIs, authentication, and database design.',
  'Cloud-native deployments with Docker, Kubernetes, GitHub Actions, and ArgoCD.',
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

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8">
        <FadeIn>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-blue-400 uppercase tracking-widest">01 — About</span>
            <div className="flex-1 h-px bg-gradient-to-r from-blue-500/30 to-transparent" />
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-start">
          {/* Left */}
          <div>
            <FadeIn delay={0.05}>
              <h2 id="about-heading" className="text-4xl md:text-5xl font-extrabold tracking-tight mb-8 leading-tight">
                <span className="text-white">Building software</span>
                <br />
                <span className="text-gradient-blue">that makes an impact.</span>
              </h2>
            </FadeIn>

            {/* Highlighted quote lines */}
            <div className="space-y-4 mb-8">
              {bioHighlights.map((line, i) => (
                <FadeIn key={i} delay={0.08 + i * 0.04}>
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
                <FadeIn key={i} delay={0.1 + i * 0.04}>
                  <p className="text-white/45 leading-relaxed text-sm">{p}</p>
                </FadeIn>
              ))}
            </div>

          </div>

          {/* Right: cards + stats — hidden on mobile */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-2 gap-5">
              {pillars.map((p, i) => {
                const c = colorMap[p.color]
                const Icon = p.icon
                return (
                  <FadeIn key={p.label} delay={0.05 + i * 0.04}>
                    <motion.div
                      className={`p-8 rounded-2xl bg-gradient-to-br border ${c.card} h-full flex flex-col items-center text-center`}
                      whileHover={{ scale: 1.03, y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${c.iconBg}`}>
                        <Icon size={22} className={c.icon} />
                      </div>
                      <div className="font-semibold text-white text-base mb-2">{p.label}</div>
                      <p className="text-sm text-white/40 leading-relaxed">{p.desc}</p>
                    </motion.div>
                  </FadeIn>
                )
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
