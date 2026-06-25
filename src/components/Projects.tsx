import { useRef, useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { projects } from '../data/portfolio'
import { ExternalLink, ArrowRight, X, CheckCircle2, ArrowDown, Lock, AlertTriangle, Lightbulb } from 'lucide-react'
import { GithubIcon } from './SocialIcons'
import { useMobileViewport } from '../lib/mobile'
import FadeIn from './FadeIn'

const architectures: Record<number, string[]> = {
  1: ['User / Browser', 'React Frontend', 'Flask REST API', 'Auth Middleware', 'Ollama LLM', 'ChromaDB Vectors', 'MongoDB Storage', 'AI Response'],
  2: ['User', 'React Frontend', 'Flask Backend', 'PDF Processing', 'Embedding Model', 'ChromaDB', 'Ollama', 'AI Response'],
  3: ['Visitor', 'React + Vite', 'Tailwind CSS', 'Framer Motion', 'Contact Form', 'Email Service', 'Business Result'],
  4: ['Mobile App', 'Backend API', 'Authentication', 'Database', 'Rewards Engine', 'Progress Tracking', 'Notifications', 'Analytics'],
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
            className="px-2.5 py-1.5 rounded-lg text-[11px] md:text-xs font-mono font-medium text-center min-w-[120px] md:min-w-[140px]"
            style={{
              background: i === 0 ? 'rgba(59,130,246,0.15)' : i === nodes.length - 1 ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.04)',
              border: i === 0 ? '1px solid rgba(59,130,246,0.3)' : i === nodes.length - 1 ? '1px solid rgba(16,185,129,0.2)' : '1px solid rgba(255,255,255,0.06)',
              color: i === 0 ? '#60a5fa' : i === nodes.length - 1 ? '#34d399' : 'rgba(255,255,255,0.75)',
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

type Project = typeof projects[0]

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const arch = architectures[project.id]
  const isSoon = project.isComingSoon
  const isMobile = useMobileViewport()
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const scrollY = window.scrollY
    const prev = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    }
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'

    closeRef.current?.focus({ preventScroll: true })

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = prev.overflow
      document.body.style.position = prev.position
      document.body.style.top = prev.top
      document.body.style.width = prev.width
      window.scrollTo(0, scrollY)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose])

  const modal = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: isMobile ? 0.12 : 0.2 }}
      className="fixed inset-0 z-[110] flex items-center justify-center p-2 sm:p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(16px)' }}
      onClick={onClose}
      role="presentation"
    >
      <motion.div
        initial={isMobile ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.93, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={isMobile ? { opacity: 0 } : { scale: 0.93, opacity: 0, y: 16 }}
        transition={isMobile ? { duration: 0.12 } : { type: 'spring', bounce: 0.15, duration: 0.45 }}
        className="relative w-full max-w-3xl rounded-2xl"
        style={{ background: '#0c0c10', border: '1px solid rgba(255,255,255,0.07)' }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`project-modal-title-${project.id}`}
      >
        {/* Color bar */}
        <div className={`h-1 w-full bg-gradient-to-r ${project.gradient} rounded-t-2xl`} />

        <div className="p-3 md:p-5">
          {/* Close */}
          <motion.button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="absolute top-2 right-2 md:top-4 md:right-4 p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/[0.06] transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={15} />
          </motion.button>

          {/* Header */}
          <div className="mb-2 md:mb-3 pr-8 flex items-center gap-2.5">
            <div className="text-2xl md:text-3xl flex-shrink-0">{project.icon}</div>
            <div>
              <div className="flex items-center flex-wrap gap-1.5 mb-0.5">
                <h3 id={`project-modal-title-${project.id}`} className="text-base md:text-xl font-extrabold text-white leading-tight">{project.title}</h3>
                <span className="px-1.5 py-0.5 rounded text-[9px] md:text-[10px] font-mono font-medium bg-white/[0.04] text-white/50 border border-white/[0.08]">
                  {project.category}
                </span>
                {isSoon && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-medium text-amber-400 border border-amber-500/30"
                    style={{ background: 'rgba(245,158,11,0.08)' }}>
                    In Development
                  </span>
                )}
              </div>
              <p className="text-[11px] md:text-xs text-white/50">{project.subtitle}</p>
            </div>
          </div>

          {/* Problem + Solution + Architecture */}
          <div className="grid md:grid-cols-5 gap-2 md:gap-3 mb-2 md:mb-3">
            <div className="md:col-span-3 space-y-1.5">
              <div className="p-2 md:p-3 rounded-xl border border-white/[0.06]" style={{ background: 'rgba(239,68,68,0.04)' }}>
                <div className="text-[9px] font-mono text-red-400/80 uppercase tracking-widest mb-1">Problem</div>
                <p className="text-[11px] md:text-xs text-white/65 leading-relaxed line-clamp-2">{project.problem}</p>
              </div>
              <div className="p-2 md:p-3 rounded-xl border border-white/[0.06]" style={{ background: 'rgba(16,185,129,0.04)' }}>
                <div className="text-[9px] font-mono text-emerald-400/80 uppercase tracking-widest mb-1">Solution</div>
                <p className="text-[11px] md:text-xs text-white/65 leading-relaxed line-clamp-2">{project.solution}</p>
              </div>
            </div>
            {arch && (
              <div className="hidden md:block md:col-span-2 p-3 rounded-xl border border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <div className="text-[9px] font-mono text-white/50 uppercase tracking-widest mb-2 text-center">Architecture</div>
                <ArchFlow nodes={arch} />
              </div>
            )}
          </div>

          {/* Features */}
          <div className="mb-2 md:mb-3">
            <div className="text-[9px] font-mono text-white/50 uppercase tracking-widest mb-1.5">Key Features</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-1.5">
              {project.features.map((f) => (
                <div key={f} className="flex items-center gap-1.5 text-[10px] md:text-[11px] text-white/65">
                  <CheckCircle2 size={10} className="text-blue-400 flex-shrink-0" />
                  <span className="leading-tight">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Challenges + What I Learned — desktop only */}
          {(project.challenges || project.learned) && (
            <div className="hidden md:grid md:grid-cols-2 gap-2 mb-2 md:mb-3">
              {project.challenges && (
                <div className="p-2 md:p-3 rounded-xl border border-white/[0.06]" style={{ background: 'rgba(245,158,11,0.04)' }}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <AlertTriangle size={10} className="text-amber-400/80" />
                    <div className="text-[9px] font-mono text-amber-400/80 uppercase tracking-widest">Challenges</div>
                  </div>
                  <p className="text-[11px] text-white/65 leading-relaxed line-clamp-3">{project.challenges}</p>
                </div>
              )}
              {project.learned && (
                <div className="p-2 md:p-3 rounded-xl border border-white/[0.06]" style={{ background: 'rgba(168,85,247,0.04)' }}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <Lightbulb size={10} className="text-purple-400/80" />
                    <div className="text-[9px] font-mono text-purple-400/80 uppercase tracking-widest">What I Learned</div>
                  </div>
                  <p className="text-[11px] text-white/65 leading-relaxed line-clamp-3">{project.learned}</p>
                </div>
              )}
            </div>
          )}

          {/* Tech */}
          <div className="mb-2 md:mb-3">
            <div className="text-[9px] font-mono text-white/50 uppercase tracking-widest mb-1.5">Tech Stack</div>
            <div className="flex flex-wrap gap-1 md:gap-1.5">
              {project.tech.map((t) => (
                <span key={t}
                  className="px-2 py-0.5 rounded-lg text-[10px] md:text-[11px] font-medium border text-white/70"
                  style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-2 pt-2 border-t border-white/[0.04]">
            {project.github ? (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-white/60 hover:text-white transition-colors"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <GithubIcon size={13} />
                View Source
              </motion.a>
            ) : isSoon ? (
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-amber-400/60 cursor-default"
                style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.15)' }}>
                <Lock size={12} />
                Coming Soon
              </div>
            ) : null}

            {project.live ? (
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-white"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)' }}
                whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(59,130,246,0.3)' }}
                whileTap={{ scale: 0.97 }}
              >
                <ExternalLink size={13} />
                Live Demo
              </motion.a>
            ) : isSoon ? (
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-white/35 cursor-default"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <Lock size={12} />
                Private Project
              </div>
            ) : null}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )

  return createPortal(modal, document.body)
}

function ProjectCard({ project, index, large }: { project: Project; index: number; large?: boolean }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const isMobile = useMobileViewport()
  const isSoon = project.isComingSoon
  const visible = isMobile || inView
  const closeModal = useCallback(() => setOpen(false), [])

  return (
    <>
      <motion.div
        ref={ref}
        initial={isMobile ? false : { opacity: 0, y: 40 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: isMobile ? 0 : 0.65, delay: isMobile ? 0 : index * 0.09 }}
        className="group relative rounded-2xl overflow-hidden cursor-pointer flex flex-col md:h-full"
        style={
          isSoon
            ? { background: 'rgba(20,10,0,0.6)', border: '1.5px solid rgba(245,158,11,0.35)' }
            : { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }
        }
        onClick={() => setOpen(true)}
        whileHover={{ y: -6 }}
      >
        {/* Top gradient bar — thicker for Coming Soon */}
        <div className={`${isSoon ? 'h-[5px]' : 'h-[3px]'} w-full bg-gradient-to-r ${project.gradient} flex-shrink-0`} />

        {/* Coming Soon — strong pulsing border glow */}
        {isSoon && (
          <>
            <motion.div
              className="absolute inset-0 pointer-events-none rounded-2xl"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ boxShadow: 'inset 0 0 50px rgba(245,158,11,0.12), 0 0 60px rgba(245,158,11,0.14), 0 0 120px rgba(251,146,60,0.07)' }}
            />
            {/* subtle warm background sweep */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.07) 0%, transparent 65%)' }} />
          </>
        )}

        {/* Hover glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
          style={
            isSoon
              ? { background: 'radial-gradient(ellipse at 50% -10%, rgba(245,158,11,0.14), transparent 60%)' }
              : { background: 'radial-gradient(ellipse at 50% -20%, rgba(59,130,246,0.06), transparent 60%)' }
          }
          transition={{ duration: 0.3 }}
        />

        <div className="p-4 md:p-6 flex flex-col flex-1">
          {/* Mobile: horizontal header — wider, less tall */}
          <div className="flex items-start gap-3 mb-3 md:hidden">
            <span className={`flex-shrink-0 text-2xl ${isSoon ? 'text-amber-100' : ''}`}>{project.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center flex-wrap gap-1.5 mb-1">
                <h3 className={`font-bold leading-tight ${isSoon ? 'text-amber-100' : 'text-white'} text-base`}>{project.title}</h3>
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open live demo: ${project.title}`}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-medium text-cyan-400 border border-cyan-500/25"
                    style={{ background: 'rgba(6,182,212,0.07)' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={9} />
                    Live
                  </a>
                )}
                {project.featured && !isSoon && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-medium text-blue-400 border border-blue-500/20"
                    style={{ background: 'rgba(59,130,246,0.08)' }}>
                    Featured
                  </span>
                )}
                {isSoon && (
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold text-amber-300 border border-amber-500/40"
                    style={{ background: 'rgba(245,158,11,0.15)' }}>
                    <motion.span
                      animate={{ opacity: [1, 0.2, 1], scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.4, repeat: Infinity }}
                      className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400"
                    />
                    SOON
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-mono ${isSoon ? 'text-amber-400/50' : 'text-white/35'}`}>{project.category}</span>
            </div>
          </div>

          {/* Desktop badges row */}
          <div className="hidden md:flex items-center justify-between mb-4 gap-1">
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono border ${isSoon ? 'text-amber-400/50 border-amber-500/20' : 'text-white/30 border-white/[0.05]'}`}>
              {project.category}
            </span>
            <div className="flex items-center gap-1.5 shrink-0">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open live demo: ${project.title}`}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium text-cyan-400 border border-cyan-500/25 hover:border-cyan-400/50 hover:text-cyan-300 transition-colors"
                  style={{ background: 'rgba(6,182,212,0.07)' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={10} />
                  Live
                </a>
              )}
              {project.featured && !isSoon && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-medium text-blue-400 border border-blue-500/20"
                  style={{ background: 'rgba(59,130,246,0.08)' }}>
                  Featured
                </span>
              )}
              {isSoon && (
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide text-amber-300 border border-amber-500/40"
                  style={{ background: 'rgba(245,158,11,0.15)' }}>
                  <motion.span
                    animate={{ opacity: [1, 0.2, 1], scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400"
                  />
                  IN DEVELOPMENT
                </span>
              )}
            </div>
          </div>

          {/* Desktop icon + title */}
          <div className="hidden md:flex items-start gap-3 mb-3">
            <span className={large ? 'text-3xl' : 'text-2xl'}>{project.icon}</span>
            <div>
              <h3 className={`font-bold leading-tight ${isSoon ? 'text-amber-100' : 'text-white'} ${large ? 'text-xl' : 'text-lg'}`}>{project.title}</h3>
              <p className={`text-sm mt-0.5 ${isSoon ? 'text-amber-400/60' : 'text-white/50'}`}>{project.subtitle}</p>
            </div>
          </div>

          {/* Confidential banner — desktop only */}
          {isSoon && (
            <div className="hidden md:flex items-center gap-2 mb-3 px-2 py-1.5 rounded-lg border border-amber-500/15"
              style={{ background: 'rgba(245,158,11,0.06)' }}>
              <Lock size={10} className="text-amber-400/60 flex-shrink-0" />
              <span className="text-sm text-amber-400/70 font-mono">Confidential Client Project</span>
            </div>
          )}

          <p className={`text-sm leading-relaxed mb-3 md:mb-5 md:flex-1 line-clamp-2 md:line-clamp-3 ${isSoon ? 'text-white/60' : 'text-white/55'}`}>
            {project.description}
          </p>

          {/* Tech + footer — side by side on mobile for a wider feel */}
          <div className="flex items-end justify-between gap-3 mt-auto md:block">
            <div className="flex flex-wrap gap-1 md:gap-1.5 mb-0 md:mb-5 flex-1 min-w-0">
              {project.tech.slice(0, large ? 3 : 2).map((t) => (
                <span key={t} className={`px-1.5 md:px-2 py-0.5 rounded text-[9px] md:text-[10px] border ${isSoon ? 'text-amber-400/40 border-amber-500/15' : 'text-white/35 border-white/[0.05]'}`}
                  style={{ background: isSoon ? 'rgba(245,158,11,0.04)' : 'rgba(255,255,255,0.02)' }}>
                  {t}
                </span>
              ))}
              {project.tech.length > (large ? 3 : 2) && (
                <span className="px-1.5 py-0.5 text-[9px] md:text-[10px] text-white/20 md:hidden">+{project.tech.length - (large ? 3 : 2)}</span>
              )}
              {project.tech.slice(large ? 3 : 2, large ? 7 : 5).map((t) => (
                <span key={t} className={`hidden md:inline px-2 py-0.5 rounded text-[10px] border ${isSoon ? 'text-amber-400/40 border-amber-500/15' : 'text-white/35 border-white/[0.05]'}`}
                  style={{ background: isSoon ? 'rgba(245,158,11,0.04)' : 'rgba(255,255,255,0.02)' }}>
                  {t}
                </span>
              ))}
              {project.tech.length > (large ? 7 : 5) && (
                <span className="hidden md:inline px-2 py-0.5 text-[10px] text-white/20">+{project.tech.length - (large ? 7 : 5)}</span>
              )}
            </div>

            {/* Footer */}
            <div className={`flex items-center gap-1 shrink-0 md:justify-between md:pt-4 md:border-t md:w-full ${isSoon ? 'md:border-amber-500/10' : 'md:border-white/[0.04]'}`}>
              <div className="flex gap-1 md:gap-2 items-center">
              {project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`GitHub: ${project.title}`}
                  className="p-1.5 md:p-2 rounded-lg text-white/30 hover:text-white hover:bg-white/[0.05] transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <GithubIcon size={12} className="md:hidden" />
                  <GithubIcon size={14} className="hidden md:block" />
                </a>
              ) : isSoon ? (
                <span className="flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] md:text-[10px] text-amber-400/50 border border-amber-500/15"
                  style={{ background: 'rgba(245,158,11,0.04)' }}>
                  <Lock size={9} />
                  <span className="hidden md:inline">Private</span>
                </span>
              ) : null}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Live demo: ${project.title}`}
                  className="p-1.5 md:p-2 rounded-lg text-white/30 hover:text-white hover:bg-white/[0.05] transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={12} className="md:hidden" />
                  <ExternalLink size={14} className="hidden md:block" />
                </a>
              )}
            </div>
            <span className={`hidden md:flex items-center gap-1 text-xs transition-colors ${isSoon ? 'text-amber-400/55 group-hover:text-amber-400' : 'text-white/40 group-hover:text-blue-400'}`}>
              Case study
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </span>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && <ProjectModal project={project} onClose={closeModal} />}
      </AnimatePresence>
    </>
  )
}

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="relative py-32 overflow-hidden">
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
          <h2 id="projects-heading" className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            <span className="text-white">Things I've</span>
            <br />
            <span className="text-gradient-purple">shipped.</span>
          </h2>
          <p className="text-white/50 text-sm mb-14 max-w-xl">
            Click any project for a full case study — architecture, problem, solution and stack.
          </p>
        </FadeIn>

        {/* Full-width cards until large screens — avoids narrow columns on tablet */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} large={i < 2} />
          ))}
        </div>
      </div>
    </section>
  )
}
