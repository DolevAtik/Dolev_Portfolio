import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { projects } from '../data/portfolio'
import { ExternalLink, ArrowRight, X, CheckCircle2, ArrowDown } from 'lucide-react'
import { GithubIcon } from './SocialIcons'

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

const architectures: Record<number, string[]> = {
  1: ['User / Browser', 'React Frontend', 'Flask REST API', 'Auth Middleware', 'Ollama LLM', 'ChromaDB Vectors', 'MongoDB Storage', 'AI Response'],
  2: ['User', 'React SPA', 'Flask API', 'JWT Auth', 'SQLite DB', 'Match Engine', 'Session Manager'],
  3: ['Visitor', 'React + Vite', 'Tailwind CSS', 'Framer Motion', 'Contact API', 'Email Service'],
  4: ['Client', 'Next.js / React', 'Node.js Backend', 'Content API', 'Domain + CDN', 'Analytics'],
}

function ArchFlow({ nodes }: { nodes: string[] }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      {nodes.map((node, i) => (
        <div key={i} className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.07 }}
            className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-center min-w-[140px]"
            style={{
              background: i === 0 ? 'rgba(59,130,246,0.15)' : i === nodes.length - 1 ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.04)',
              border: i === 0 ? '1px solid rgba(59,130,246,0.3)' : i === nodes.length - 1 ? '1px solid rgba(16,185,129,0.2)' : '1px solid rgba(255,255,255,0.06)',
              color: i === 0 ? '#60a5fa' : i === nodes.length - 1 ? '#34d399' : 'rgba(255,255,255,0.6)',
            }}
          >
            {node}
          </motion.div>
          {i < nodes.length - 1 && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ delay: i * 0.07 + 0.05 }}
            >
              <ArrowDown size={10} className="text-white/15 my-0" />
            </motion.div>
          )}
        </div>
      ))}
    </div>
  )
}

function ProjectModal({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) {
  const arch = architectures[project.id]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(16px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.93, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.93, opacity: 0, y: 16 }}
        transition={{ type: 'spring', bounce: 0.15, duration: 0.45 }}
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl"
        style={{ background: '#0c0c10', border: '1px solid rgba(255,255,255,0.07)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Color bar */}
        <div className={`h-1 w-full bg-gradient-to-r ${project.gradient} rounded-t-2xl`} />

        <div className="p-7">
          {/* Close */}
          <motion.button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-lg text-white/30 hover:text-white hover:bg-white/[0.06] transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={17} />
          </motion.button>

          {/* Header */}
          <div className="mb-5 pr-12 flex items-center gap-4">
            <div className="text-4xl flex-shrink-0">{project.icon}</div>
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <h3 className="text-2xl font-extrabold text-white leading-tight">{project.title}</h3>
                <span className="px-2.5 py-1 rounded text-[10px] font-mono font-medium bg-white/[0.04] text-white/35 border border-white/[0.06]">
                  {project.category}
                </span>
              </div>
              <p className="text-sm text-white/35">{project.subtitle}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-5 gap-5 mb-5">
            {/* Left: problem + solution */}
            <div className="md:col-span-3 space-y-3">
              <div className="p-4 rounded-xl border border-white/[0.04]" style={{ background: 'rgba(239,68,68,0.04)' }}>
                <div className="text-[10px] font-mono text-red-400/70 uppercase tracking-widest mb-1.5">Problem</div>
                <p className="text-sm text-white/55 leading-relaxed">{project.problem}</p>
              </div>
              <div className="p-4 rounded-xl border border-white/[0.04]" style={{ background: 'rgba(16,185,129,0.04)' }}>
                <div className="text-[10px] font-mono text-emerald-400/70 uppercase tracking-widest mb-1.5">Solution</div>
                <p className="text-sm text-white/55 leading-relaxed">{project.solution}</p>
              </div>
            </div>

            {/* Right: architecture */}
            {arch && (
              <div className="md:col-span-2">
                <div className="text-[10px] font-mono text-white/25 uppercase tracking-widest mb-3 text-center">Architecture</div>
                <ArchFlow nodes={arch} />
              </div>
            )}
          </div>

          {/* Features */}
          <div className="mb-5">
            <div className="text-[10px] font-mono text-white/25 uppercase tracking-widest mb-2.5">Key Features</div>
            <div className="grid sm:grid-cols-2 gap-2">
              {project.features.map((f) => (
                <div key={f} className="flex items-center gap-2.5 text-sm text-white/55">
                  <CheckCircle2 size={13} className="text-blue-400 flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* Tech */}
          <div className="mb-5">
            <div className="text-[10px] font-mono text-white/25 uppercase tracking-widest mb-2.5">Tech Stack</div>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium border text-white/60"
                  style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)' }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-3 pt-4 border-t border-white/[0.04]">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white transition-colors"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <GithubIcon size={15} />
              View Source
            </motion.a>
            {project.live && (
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)' }}
                whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(59,130,246,0.3)' }}
                whileTap={{ scale: 0.97 }}
              >
                <ExternalLink size={15} />
                Live Demo
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ProjectCard({ project, index, large }: { project: typeof projects[0]; index: number; large?: boolean }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, delay: index * 0.09 }}
        className="group relative rounded-2xl overflow-hidden cursor-pointer h-full flex flex-col"
        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
        onClick={() => setOpen(true)}
        whileHover={{ y: -6 }}
      >
        {/* Top gradient bar */}
        <div className={`h-[3px] w-full bg-gradient-to-r ${project.gradient} flex-shrink-0`} />

        {/* Hover glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
          style={{ background: 'radial-gradient(ellipse at 50% -20%, rgba(59,130,246,0.06), transparent 60%)' }}
          transition={{ duration: 0.3 }}
        />

        <div className="p-6 flex flex-col flex-1">
          {/* Badges */}
          <div className="flex items-center justify-between mb-4">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono text-white/30 border border-white/[0.05]">
              {project.category}
            </span>
            {project.featured && (
              <span className="px-2 py-0.5 rounded text-[10px] font-medium text-blue-400 border border-blue-500/20"
                style={{ background: 'rgba(59,130,246,0.08)' }}>
                Featured
              </span>
            )}
          </div>

          {/* Icon + title */}
          <div className="flex items-start gap-3 mb-3">
            <span className={large ? 'text-3xl' : 'text-2xl'}>{project.icon}</span>
            <div>
              <h3 className={`font-bold text-white leading-tight ${large ? 'text-xl' : 'text-lg'}`}>{project.title}</h3>
              <p className="text-xs text-white/35 mt-0.5">{project.subtitle}</p>
            </div>
          </div>

          <p className="text-sm text-white/45 leading-relaxed mb-5 flex-1 line-clamp-3">
            {project.description}
          </p>

          {/* Tech */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tech.slice(0, large ? 7 : 5).map((t) => (
              <span key={t} className="px-2 py-0.5 rounded text-[10px] text-white/35 border border-white/[0.05]"
                style={{ background: 'rgba(255,255,255,0.02)' }}>
                {t}
              </span>
            ))}
            {project.tech.length > (large ? 7 : 5) && (
              <span className="px-2 py-0.5 text-[10px] text-white/20">+{project.tech.length - (large ? 7 : 5)}</span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
            <div className="flex gap-2">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-white/30 hover:text-white hover:bg-white/[0.05] transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <GithubIcon size={14} />
              </a>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-white/30 hover:text-white hover:bg-white/[0.05] transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
            <span className="flex items-center gap-1 text-xs text-white/20 group-hover:text-blue-400 transition-colors">
              Case study
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && <ProjectModal project={project} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  )
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-1/4 w-[500px] h-[500px] rounded-full blur-[130px]"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.05), transparent)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-purple-400 uppercase tracking-widest">03 — Projects</span>
            <div className="flex-1 h-px bg-gradient-to-r from-purple-500/30 to-transparent" />
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            <span className="text-white">Things I've</span>
            <br />
            <span className="text-gradient-purple">shipped.</span>
          </h2>
          <p className="text-white/35 text-sm mb-14 max-w-xl">
            Click any project for a full case study — architecture, problem, solution and stack.
          </p>
        </FadeIn>

        {/* Featured grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {featured.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} large />
          ))}
        </div>

        {/* Secondary grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {rest.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={featured.length + i} />
          ))}
        </div>
      </div>
    </section>
  )
}
