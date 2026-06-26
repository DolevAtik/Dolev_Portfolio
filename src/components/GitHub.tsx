import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GitFork, Star, Code2 } from 'lucide-react'
import { GithubIcon } from './SocialIcons'
import { personalInfo } from '../data/portfolio'

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

const pinnedRepos = [
  { name: 'ai-soc-analyst', desc: 'AI-powered SOC assistant with RAG, ChromaDB & Ollama', stars: 12, forks: 3, lang: 'Python', langColor: '#3b82f6' },
  { name: 'mentconnect', desc: 'Full-stack mentorship platform with React & Flask', stars: 8, forks: 2, lang: 'TypeScript', langColor: '#06b6d4' },
  { name: 'web4you', desc: 'Agency website — modern, animated, conversion-focused', stars: 5, forks: 1, lang: 'React', langColor: '#a855f7' },
  { name: 'devops-scripts', desc: 'Docker, K8s, and CI/CD pipeline automation scripts', stars: 15, forks: 4, lang: 'Shell', langColor: '#06b6d4' },
]

const langStats = [
  { lang: 'Python', pct: 42, color: '#3b82f6' },
  { lang: 'TypeScript', pct: 28, color: '#06b6d4' },
  { lang: 'JavaScript', pct: 15, color: '#a855f7' },
  { lang: 'Java', pct: 9, color: '#f97316' },
  { lang: 'Shell', pct: 6, color: '#06b6d4' },
]

const ghStats = [
  { label: 'Repositories', value: '30+' },
  { label: 'Contributions', value: '500+' },
  { label: 'Stars Earned', value: '40+' },
]

export default function GitHub() {
  return (
    <section id="github" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/4 bottom-0 w-[500px] h-[300px] bg-blue-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8">
        <FadeIn>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-purple-400 uppercase tracking-widest">06 — Open Source</span>
            <div className="flex-1 h-px bg-gradient-to-r from-purple-500/30 to-transparent" />
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-16">
            <span className="text-white">On</span>{' '}
            <span className="text-gradient-purple">GitHub.</span>
          </h2>
        </FadeIn>

        {/* Stats */}
        <FadeIn delay={0.15}>
          <div className="grid grid-cols-3 gap-4 mb-10">
            {ghStats.map((s) => (
              <div
                key={s.label}
                className="text-center p-6 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                <div className="text-3xl font-extrabold text-gradient-blue mb-1">{s.value}</div>
                <div className="text-sm text-white/40">{s.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Language bar */}
        <FadeIn delay={0.2}>
          <div
            className="p-6 rounded-2xl mb-10"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
          >
            <div className="text-xs font-mono text-white/30 uppercase tracking-widest mb-4">Languages</div>
            <div className="flex h-2 rounded-full overflow-hidden mb-4 gap-0.5">
              {langStats.map((l) => (
                <motion.div
                  key={l.lang}
                  style={{ background: l.color, width: `${l.pct}%` }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${l.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: langStats.indexOf(l) * 0.1 }}
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              {langStats.map((l) => (
                <div key={l.lang} className="flex items-center gap-1.5 text-sm">
                  <div className="w-2 h-2 rounded-full" style={{ background: l.color }} />
                  <span className="text-white/60">{l.lang}</span>
                  <span className="text-white/30 text-xs">{l.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Pinned repos */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {pinnedRepos.map((repo, i) => (
            <FadeIn key={repo.name} delay={0.2 + i * 0.08}>
              <motion.a
                href={`${personalInfo.github}/${repo.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-5 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
                whileHover={{ scale: 1.02, y: -3, borderColor: 'rgba(59,130,246,0.2)' }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <Code2 size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-mono text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {repo.name}
                    </div>
                    <p className="text-xs text-white/40 mt-0.5 leading-relaxed">{repo.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-white/30">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full" style={{ background: repo.langColor }} />
                    {repo.lang}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={11} />
                    {repo.stars}
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork size={11} />
                    {repo.forks}
                  </div>
                </div>
              </motion.a>
            </FadeIn>
          ))}
        </div>

        {/* GitHub CTA */}
        <FadeIn delay={0.3}>
          <div className="text-center">
            <motion.a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white glass border border-white/10 hover:bg-white/[0.06] transition-colors"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
            >
              <GithubIcon size={18} />
              View Full GitHub Profile
            </motion.a>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
