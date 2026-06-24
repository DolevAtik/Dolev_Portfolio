import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { projects } from '../data/portfolio'
import { ExternalLink, ArrowRight, X, CheckCircle2 } from 'lucide-react'
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

function ProjectModal({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{
          background: '#0d0d0f',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header gradient bar */}
        <div className={`h-1.5 w-full bg-gradient-to-r ${project.gradient} rounded-t-2xl`} />

        <div className="p-8">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            <X size={18} />
          </button>

          {/* Title */}
          <div className="mb-6">
            <div className="text-4xl mb-3">{project.icon}</div>
            <h3 className="text-2xl font-bold text-white mb-1">{project.title}</h3>
            <p className="text-sm text-white/40">{project.subtitle}</p>
          </div>

          {/* Problem / Solution */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10">
              <div className="text-xs font-mono text-red-400 uppercase tracking-widest mb-2">Problem</div>
              <p className="text-sm text-white/60 leading-relaxed">{project.problem}</p>
            </div>
            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-2">Solution</div>
              <p className="text-sm text-white/60 leading-relaxed">{project.solution}</p>
            </div>
          </div>

          {/* Features */}
          <div className="mb-6">
            <div className="text-xs font-mono text-white/30 uppercase tracking-widest mb-3">Key Features</div>
            <ul className="space-y-2">
              {project.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-white/60">
                  <CheckCircle2 size={14} className="text-blue-400 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech */}
          <div className="mb-8">
            <div className="text-xs font-mono text-white/30 uppercase tracking-widest mb-3">Tech Stack</div>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-lg text-xs font-medium bg-white/[0.04] border border-white/[0.06] text-white/70"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/70 hover:text-white text-sm font-medium transition-colors"
            >
              <GithubIcon size={16} />
              View on GitHub
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-500 text-white text-sm font-medium hover:bg-blue-400 transition-colors"
              >
                <ExternalLink size={16} />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        className="group relative rounded-2xl overflow-hidden cursor-pointer"
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)',
        }}
        whileHover={{ y: -6, scale: 1.005 }}
        transition={{ duration: 0.7, delay: index * 0.1 }}
        onClick={() => setOpen(true)}
      >
        {/* Gradient top bar */}
        <div className={`h-1 w-full bg-gradient-to-r ${project.gradient}`} />

        {/* Hover glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: 'radial-gradient(circle at 50% 0%, rgba(59,130,246,0.05), transparent 60%)' }}
        />

        <div className="p-6">
          {/* Category badge */}
          <div className="flex items-start justify-between mb-4">
            <span className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-white/[0.04] text-white/40 border border-white/[0.04]">
              {project.category}
            </span>
            {project.featured && (
              <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Featured
              </span>
            )}
          </div>

          {/* Icon + Title */}
          <div className="flex items-start gap-3 mb-3">
            <div className="text-2xl">{project.icon}</div>
            <div>
              <h3 className="font-bold text-white text-lg leading-tight">{project.title}</h3>
              <p className="text-xs text-white/40 mt-0.5">{project.subtitle}</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-white/50 leading-relaxed mb-5 line-clamp-3">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tech.slice(0, 5).map((t) => (
              <span key={t} className="px-2 py-0.5 rounded text-xs text-white/40 bg-white/[0.03] border border-white/[0.04]">
                {t}
              </span>
            ))}
            {project.tech.length > 5 && (
              <span className="px-2 py-0.5 rounded text-xs text-white/30">+{project.tech.length - 5}</span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
            <div className="flex gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.06] transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <GithubIcon size={15} />
              </a>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.06] transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={15} />
                </a>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-white/30 group-hover:text-blue-400 transition-colors">
              View details
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </div>
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
        <div className="absolute right-0 top-1/3 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px]" />
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
          <p className="text-white/40 text-base mb-16 max-w-xl">
            Click any project to see the full breakdown — problem, solution, tech stack and features.
          </p>
        </FadeIn>

        {/* Featured */}
        <div className="grid md:grid-cols-2 gap-5 mb-5">
          {featured.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

        {/* Others */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5">
          {rest.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={featured.length + i} />
          ))}
        </div>
      </div>
    </section>
  )
}
