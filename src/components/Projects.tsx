import { useRef, useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { projects } from '../data/portfolio'
import { ExternalLink, ArrowRight, X, CheckCircle2, ArrowDown, Lock, AlertTriangle, Lightbulb, Smartphone } from 'lucide-react'
import { GithubIcon } from './SocialIcons'
import { useMobileViewport } from '../lib/mobile'
import FadeIn from './FadeIn'

const architectures: Record<number, string[]> = {
  1: ['User / Browser', 'React Frontend', 'Flask REST API', 'Auth Middleware', 'Ollama LLM', 'ChromaDB Vectors', 'MongoDB Storage', 'AI Response'],
  2: ['User', 'React Frontend', 'Flask Backend', 'PDF Processing', 'Embedding Model', 'ChromaDB', 'Ollama', 'AI Response'],
  3: ['Visitor', 'React + Vite', 'Tailwind CSS', 'Framer Motion', 'Contact Form', 'Email Service', 'Business Result'],
  4: ['Mobile App', 'Backend API', 'Authentication', 'Database', 'Rewards Engine', 'Progress Tracking', 'Notifications', 'Analytics'],
}

function CompactArchFlow({ nodes }: { nodes: string[] }) {
  return (
    <div className="flex flex-col items-center w-full">
      {nodes.map((node, i) => (
        <div key={i} className="flex flex-col items-center w-full">
          <motion.div
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="w-full px-3 py-1.5 rounded-lg text-[11px] font-mono text-center leading-tight"
            style={{
              background: i === 0 ? 'rgba(59,130,246,0.12)' : i === nodes.length - 1 ? 'rgba(16,185,129,0.08)' : 'rgba(255,255,255,0.025)',
              border: i === 0 ? '1px solid rgba(59,130,246,0.25)' : i === nodes.length - 1 ? '1px solid rgba(16,185,129,0.18)' : '1px solid rgba(255,255,255,0.05)',
              color: i === 0 ? '#60a5fa' : i === nodes.length - 1 ? '#34d399' : 'rgba(255,255,255,0.55)',
            }}
          >
            {node}
          </motion.div>
          {i < nodes.length - 1 && (
            <div className="h-3 flex items-center justify-center">
              <ArrowDown size={8} className="text-white/[0.12]" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

type Project = typeof projects[0]

const storeBtnSm = 'inline-flex items-center gap-0.5 px-1.5 py-1 rounded-md text-[8px] font-medium border text-amber-400/70 border-amber-500/25'
const storeBtnMd = 'inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-amber-400/70 border border-amber-500/25'
const storeBtnStyle = { background: 'rgba(245,158,11,0.06)' }

function StoreLinks({
  appStore,
  googlePlay,
  size = 'sm',
  onClick,
}: {
  appStore?: string | null
  googlePlay?: string | null
  size?: 'sm' | 'md'
  onClick?: (e: React.MouseEvent) => void
}) {
  const cls = size === 'sm' ? storeBtnSm : storeBtnMd
  const iconSize = size === 'sm' ? 9 : 12
  const stores = [
    { href: appStore, label: size === 'sm' ? 'App Store' : 'App Store', aria: 'App Store' },
    { href: googlePlay, label: size === 'sm' ? 'Google Play' : 'Google Play', aria: 'Google Play' },
  ] as const

  return (
    <>
      {stores.map(({ href, label, aria }) =>
        href ? (
          <a
            key={aria}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={aria}
            className={cls}
            style={storeBtnStyle}
            onClick={onClick}
          >
            <Smartphone size={iconSize} />
            {label}
          </a>
        ) : (
          <span
            key={aria}
            aria-label={`${aria} — available soon`}
            className={`${cls} opacity-45 cursor-not-allowed`}
            style={storeBtnStyle}
            onClick={onClick}
          >
            <Smartphone size={iconSize} />
            {label}
          </span>
        ),
      )}
    </>
  )
}

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
      transition={{ duration: isMobile ? 0.12 : 0.18 }}
      className="fixed inset-0 z-[110] flex items-center justify-center p-3"
      style={{ background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(20px)' }}
      onClick={onClose}
      role="presentation"
    >
      <motion.div
        initial={isMobile ? { opacity: 0 } : { scale: 0.96, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={isMobile ? { opacity: 0 } : { scale: 0.96, opacity: 0, y: 10 }}
        transition={isMobile ? { duration: 0.12 } : { type: 'spring', bounce: 0.08, duration: 0.38 }}
        className="relative w-full max-w-[1400px] rounded-2xl overflow-hidden"
        style={{ background: '#0c0c10', border: '1px solid rgba(255,255,255,0.07)' }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`project-modal-title-${project.id}`}
      >
        {/* Gradient bar */}
        <div className={`h-0.5 w-full bg-gradient-to-r ${project.gradient}`} />

        {/* Close */}
        <motion.button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute top-3 right-3 z-20 p-2 rounded-xl text-white/30 hover:text-white hover:bg-white/[0.06] transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={16} />
        </motion.button>

        {/* ── MOBILE ── */}
        <div className="md:hidden p-4 space-y-3">
          <div className="flex items-center gap-3 pr-8">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 border ${isSoon ? 'border-amber-500/20' : 'border-white/[0.07]'}`}
              style={{ background: isSoon ? 'rgba(245,158,11,0.1)' : 'rgba(255,255,255,0.04)' }}>
              {project.icon}
            </div>
            <div className="min-w-0">
              <h3 id={`project-modal-title-${project.id}`}
                className={`font-bold text-[15px] leading-tight ${isSoon ? 'text-amber-50' : 'text-white'}`}>
                {project.title}
              </h3>
              <p className={`text-[10px] truncate mt-0.5 ${isSoon ? 'text-amber-400/50' : 'text-white/40'}`}>{project.subtitle}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="p-2.5 rounded-xl" style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.1)' }}>
              <div className="text-[8px] font-mono text-red-400/70 uppercase tracking-widest mb-1">Problem</div>
              <p className="text-[10px] text-white/60 leading-relaxed line-clamp-3">{project.problem}</p>
            </div>
            <div className="p-2.5 rounded-xl" style={{ background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.1)' }}>
              <div className="text-[8px] font-mono text-emerald-400/70 uppercase tracking-widest mb-1">Solution</div>
              <p className="text-[10px] text-white/60 leading-relaxed line-clamp-3">{project.solution}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1">
            {project.features.slice(0, 4).map((f) => (
              <div key={f} className="flex items-start gap-1.5 text-[10px] text-white/55">
                <CheckCircle2 size={9} className="text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="leading-tight line-clamp-2">{f}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1">
            {project.tech.map((t) => (
              <span key={t} className="px-1.5 py-0.5 rounded-md text-[9px] text-white/45 border border-white/[0.07]"
                style={{ background: 'rgba(255,255,255,0.03)' }}>{t}</span>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 pt-2 border-t border-white/[0.05]">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-white/60 hover:text-white transition-colors"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <GithubIcon size={12} /> Source
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-white"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)' }}>
                <ExternalLink size={12} /> Demo
              </a>
            )}
            {isSoon && (
              <StoreLinks
                appStore={'appStore' in project ? project.appStore : null}
                googlePlay={'googlePlay' in project ? project.googlePlay : null}
                size="md"
              />
            )}
          </div>
        </div>

        {/* ── DESKTOP ── */}
        <div className="hidden md:grid md:grid-cols-[1fr_380px]">

          {/* LEFT — narrative */}
          <div className="p-7 flex flex-col gap-5 border-r border-white/[0.04]">

            {/* Header */}
            <div className="flex items-center gap-4 pr-10">
              <div className={`w-13 h-13 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 border ${isSoon ? 'border-amber-500/20' : 'border-white/[0.06]'}`}
                style={{ background: isSoon ? 'rgba(245,158,11,0.08)' : 'rgba(255,255,255,0.04)', width: '52px', height: '52px' }}>
                {project.icon}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 id={`project-modal-title-${project.id}`}
                    className={`font-bold text-xl leading-tight ${isSoon ? 'text-amber-50' : 'text-white'}`}>
                    {project.title}
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono text-white/35 border border-white/[0.06]"
                    style={{ background: 'rgba(255,255,255,0.02)' }}>
                    {project.category}
                  </span>
                  {isSoon && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium text-amber-400 border border-amber-500/25"
                      style={{ background: 'rgba(245,158,11,0.08)' }}>
                      <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }}
                        className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
                      In Dev
                    </span>
                  )}
                </div>
                <p className={`text-xs ${isSoon ? 'text-amber-400/50' : 'text-white/40'}`}>{project.subtitle}</p>
              </div>
            </div>

            {/* Problem + Solution */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl" style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.09)' }}>
                <div className="text-[10px] font-mono text-red-400/70 uppercase tracking-widest mb-2">Problem</div>
                <p className="text-xs text-white/65 leading-relaxed line-clamp-4">{project.problem}</p>
              </div>
              <div className="p-4 rounded-xl" style={{ background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.09)' }}>
                <div className="text-[10px] font-mono text-emerald-400/70 uppercase tracking-widest mb-2">Solution</div>
                <p className="text-xs text-white/65 leading-relaxed line-clamp-4">{project.solution}</p>
              </div>
            </div>

            {/* Key Features */}
            <div>
              <div className="text-[10px] font-mono text-white/25 uppercase tracking-widest mb-2.5">Key Features</div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                {project.features.slice(0, 8).map((f) => (
                  <div key={f} className="flex items-start gap-2 text-xs text-white/60">
                    <CheckCircle2 size={11} className="text-blue-400 flex-shrink-0 mt-0.5" />
                    <span className="leading-tight">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Insights */}
            {(project.challenges || project.learned) && (
              <div className="grid grid-cols-2 gap-4">
                {project.challenges && (
                  <div className="p-4 rounded-xl" style={{ background: 'rgba(245,158,11,0.04)', border: '1px solid rgba(245,158,11,0.08)' }}>
                    <div className="flex items-center gap-1.5 mb-2">
                      <AlertTriangle size={10} className="text-amber-400/70" />
                      <span className="text-[10px] font-mono text-amber-400/70 uppercase tracking-widest">Challenge</span>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed line-clamp-3">{project.challenges}</p>
                  </div>
                )}
                {project.learned && (
                  <div className="p-4 rounded-xl" style={{ background: 'rgba(168,85,247,0.04)', border: '1px solid rgba(168,85,247,0.08)' }}>
                    <div className="flex items-center gap-1.5 mb-2">
                      <Lightbulb size={10} className="text-purple-400/70" />
                      <span className="text-[10px] font-mono text-purple-400/70 uppercase tracking-widest">Learned</span>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed line-clamp-3">{project.learned}</p>
                  </div>
                )}
              </div>
            )}

            {/* Links */}
            <div className="mt-auto flex flex-wrap gap-2.5 pt-4 border-t border-white/[0.04]">
              {project.github ? (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white transition-colors"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <GithubIcon size={14} />
                  View Source
                </motion.a>
              ) : null}
              {project.live ? (
                <motion.a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white"
                  style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)' }}
                  whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(59,130,246,0.3)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  <ExternalLink size={14} />
                  Live Demo
                </motion.a>
              ) : isSoon ? (
                <StoreLinks
                  appStore={'appStore' in project ? project.appStore : null}
                  googlePlay={'googlePlay' in project ? project.googlePlay : null}
                  size="md"
                />
              ) : null}
            </div>
          </div>

          {/* RIGHT — technical */}
          <div className="p-7 flex flex-col gap-5">
            {arch && (
              <div className="flex-1">
                <div className="text-[10px] font-mono text-white/25 uppercase tracking-widest mb-4 text-center">Architecture</div>
                <CompactArchFlow nodes={arch} />
              </div>
            )}
            <div className="pt-4 border-t border-white/[0.04]">
              <div className="text-[10px] font-mono text-white/25 uppercase tracking-widest mb-2.5">Tech Stack</div>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span key={t}
                    className="px-2 py-0.5 rounded-md text-[11px] font-medium text-white/50 border border-white/[0.06]"
                    style={{ background: 'rgba(255,255,255,0.025)' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
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
        className="group relative rounded-2xl overflow-hidden cursor-pointer flex flex-col h-full aspect-square md:aspect-auto md:min-h-[400px] lg:min-h-[440px]"
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

        <div className="p-3 md:p-7 flex flex-col flex-1 min-w-0 h-full">
        {/* Mobile: visual tile — icon-first, minimal text */}
        <div className="md:hidden flex flex-col h-full relative">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isSoon
                ? 'radial-gradient(circle at 50% 20%, rgba(245,158,11,0.12), transparent 65%)'
                : 'radial-gradient(circle at 50% 20%, rgba(59,130,246,0.08), transparent 65%)',
            }}
          />

          <div className="relative z-10 flex items-center justify-between gap-1 mb-1">
            <span className={`text-[8px] font-mono uppercase tracking-widest truncate ${isSoon ? 'text-amber-400/45' : 'text-white/30'}`}>
              {project.category.split('/')[0].trim()}
            </span>
            {isSoon ? (
              <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[7px] font-bold text-amber-300/90 border border-amber-500/30"
                style={{ background: 'rgba(245,158,11,0.12)' }}>
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                  className="w-1 h-1 rounded-full bg-amber-400"
                />
                SOON
              </span>
            ) : project.live ? (
              <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[7px] font-semibold text-cyan-300/90 border border-cyan-500/25"
                style={{ background: 'rgba(6,182,212,0.1)' }}>
                <span className="w-1 h-1 rounded-full bg-cyan-400" />
                ON AIR
              </span>
            ) : 'localOnly' in project && project.localOnly ? (
              <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[7px] font-semibold text-purple-300/90 border border-purple-500/25"
                style={{ background: 'rgba(168,85,247,0.1)' }}>
                <span className="w-1 h-1 rounded-full bg-purple-400" />
                Locally
              </span>
            ) : project.featured ? (
              <span className="text-[8px] text-blue-400/70">★</span>
            ) : null}
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-1 py-1">
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center text-2xl mb-2 border ${isSoon ? 'border-amber-500/20' : 'border-white/[0.06]'}`}
              style={{
                background: isSoon
                  ? 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(251,146,60,0.05))'
                  : 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
                boxShadow: isSoon ? '0 8px 24px rgba(245,158,11,0.12)' : '0 8px 24px rgba(0,0,0,0.2)',
              }}
            >
              {project.icon}
            </div>
            <h3 className={`font-bold text-[13px] leading-snug line-clamp-2 ${isSoon ? 'text-amber-50' : 'text-white'}`}>
              {project.title}
            </h3>
            <p className={`text-[9px] leading-tight line-clamp-1 mt-1 max-w-[95%] ${isSoon ? 'text-amber-400/50' : 'text-white/35'}`}>
              {project.subtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-1 mt-2 max-w-full px-0.5">
              {project.tech.slice(0, 2).map((t) => (
                <span
                  key={t}
                  className={`px-1.5 py-0.5 rounded-md text-[8px] font-medium border truncate max-w-[78px] ${isSoon ? 'text-amber-400/60 border-amber-500/20 bg-amber-500/[0.06]' : 'text-white/45 border-white/[0.07] bg-white/[0.03]'}`}
                >
                  {t}
                </span>
              ))}
              {project.tech.length > 2 && (
                <span className={`px-1 py-0.5 text-[8px] font-mono ${isSoon ? 'text-amber-400/35' : 'text-white/25'}`}>
                  +{project.tech.length - 2}
                </span>
              )}
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between gap-1 pt-2 mt-auto border-t border-white/[0.05]">
            <div className="flex items-center gap-1 min-w-0 flex-wrap">
              {isSoon ? (
                <StoreLinks
                  appStore={'appStore' in project ? project.appStore : null}
                  googlePlay={'googlePlay' in project ? project.googlePlay : null}
                  size="sm"
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Live demo: ${project.title}`}
                      className="inline-flex items-center gap-0.5 px-1.5 py-1 rounded-md text-[8px] font-medium text-cyan-300/90 border border-cyan-500/25"
                      style={{ background: 'rgba(6,182,212,0.08)' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={9} />
                      Live
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`GitHub: ${project.title}`}
                      className="inline-flex items-center gap-0.5 px-1.5 py-1 rounded-md text-[8px] font-medium border text-white/45 border-white/[0.08]"
                      style={{ background: 'rgba(255,255,255,0.03)' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <GithubIcon size={9} />
                      GitHub
                    </a>
                  )}
                </>
              )}
            </div>
            <span className={`flex items-center gap-0.5 text-[8px] font-mono shrink-0 ${isSoon ? 'text-amber-400/40' : 'text-white/25'}`}>
              Open
              <ArrowRight size={9} />
            </span>
          </div>
        </div>

          {/* Desktop — unchanged */}
          <div className="hidden md:flex md:flex-col md:flex-1">
            <div className="flex items-center justify-between mb-4 gap-1">
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

            <div className="flex items-start gap-4 mb-4">
              <span className={large ? 'text-4xl' : 'text-3xl'}>{project.icon}</span>
              <div>
                <h3 className={`font-bold leading-tight ${isSoon ? 'text-amber-100' : 'text-white'} ${large ? 'text-2xl' : 'text-xl'}`}>{project.title}</h3>
                <p className={`text-sm mt-1 ${isSoon ? 'text-amber-400/60' : 'text-white/50'}`}>{project.subtitle}</p>
              </div>
            </div>

            {isSoon && (
              <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg border border-amber-500/15"
                style={{ background: 'rgba(245,158,11,0.06)' }}>
                <Lock size={11} className="text-amber-400/60 flex-shrink-0" />
                <span className="text-sm text-amber-400/70 font-mono">Confidential Client Project</span>
              </div>
            )}

            <p className={`text-sm leading-relaxed mb-6 flex-1 ${isSoon ? 'text-white/60' : 'text-white/55'}`}>
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.slice(0, large ? 3 : 2).map((t) => (
                <span key={t} className={`px-2 py-0.5 rounded text-[10px] border ${isSoon ? 'text-amber-400/40 border-amber-500/15' : 'text-white/35 border-white/[0.05]'}`}
                  style={{ background: isSoon ? 'rgba(245,158,11,0.04)' : 'rgba(255,255,255,0.02)' }}>
                  {t}
                </span>
              ))}
              {project.tech.slice(large ? 3 : 2, large ? 7 : 5).map((t) => (
                <span key={t} className={`px-2 py-0.5 rounded text-[10px] border ${isSoon ? 'text-amber-400/40 border-amber-500/15' : 'text-white/35 border-white/[0.05]'}`}
                  style={{ background: isSoon ? 'rgba(245,158,11,0.04)' : 'rgba(255,255,255,0.02)' }}>
                  {t}
                </span>
              ))}
              {project.tech.length > (large ? 7 : 5) && (
                <span className="px-2 py-0.5 text-[10px] text-white/20">+{project.tech.length - (large ? 7 : 5)}</span>
              )}
            </div>

            <div className={`flex items-center justify-between pt-4 border-t ${isSoon ? 'border-amber-500/10' : 'border-white/[0.04]'}`}>
              <div className="flex gap-2 items-center flex-wrap">
                {isSoon ? (
                  <StoreLinks
                    appStore={'appStore' in project ? project.appStore : null}
                    googlePlay={'googlePlay' in project ? project.googlePlay : null}
                    size="md"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`GitHub: ${project.title}`}
                        className="p-2 rounded-lg text-white/30 hover:text-white hover:bg-white/[0.05] transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <GithubIcon size={14} />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Live demo: ${project.title}`}
                        className="p-2 rounded-lg text-white/30 hover:text-white hover:bg-white/[0.05] transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </>
                )}
              </div>
              <span className={`flex items-center gap-1 text-xs transition-colors ${isSoon ? 'text-amber-400/55 group-hover:text-amber-400' : 'text-white/40 group-hover:text-blue-400'}`}>
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
    <section id="projects" aria-labelledby="projects-heading" className="relative py-20 md:py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-1/4 w-[500px] h-[500px] rounded-full blur-[130px]"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.05), transparent)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-purple-400 uppercase tracking-widest">02 — Projects</span>
            <div className="flex-1 h-px bg-gradient-to-r from-purple-500/30 to-transparent" />
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 id="projects-heading" className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            <span className="text-white">Things I've</span>
            <br />
            <span className="text-gradient-purple">shipped.</span>
          </h2>
          <p className="text-white/50 text-sm mb-8 md:mb-10 max-w-xl">
            Click any project for a full case study — architecture, problem, solution and stack.
          </p>
        </FadeIn>

        {/* Row 1: 2 featured large cards */}
        <div className="grid grid-cols-2 gap-3 md:gap-5 lg:gap-6 mb-3 md:mb-6 lg:mb-8">
          {projects.slice(0, 2).map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} large />
          ))}
        </div>
        {/* Row 2: remaining cards — 3-col on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 lg:gap-6">
          {projects.slice(2).map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i + 2} />
          ))}
        </div>
      </div>
    </section>
  )
}
