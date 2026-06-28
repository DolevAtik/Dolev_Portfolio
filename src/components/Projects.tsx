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

// Per-project accent — drives tech-badge color so tags pop in line with each screenshot
const accents: Record<number, string> = {
  1: '#38bdf8', // AI SOC Analyst — sky
  5: '#22d3ee', // Cloud-Native CI/CD — cyan
  2: '#a78bfa', // AI Agent RAG PDF — violet
  3: '#60a5fa', // Liel Edri Baking — blue
  4: '#fbbf24', // Coming Soon — amber
}

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
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    closeRef.current?.focus({ preventScroll: true })

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = prevOverflow
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

/* ── Card preview (hero image / CSS mockup fallback) ───────────────── */

function mockUrl(p: Project) {
  if (p.live) return p.live.replace(/^https?:\/\//, '').replace(/\/$/, '')
  return `${p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}.app`
}

function BrowserChrome({ url, gradient, children }: { url: string; gradient: string; children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="flex items-center gap-1.5 px-3 h-7 flex-shrink-0 border-b border-white/[0.05]" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <span className="w-2 h-2 rounded-full bg-red-400/40" />
        <span className="w-2 h-2 rounded-full bg-amber-400/40" />
        <span className="w-2 h-2 rounded-full bg-emerald-400/40" />
        <div className="ml-2 flex-1 h-4 rounded-md flex items-center px-2 border border-white/[0.04]" style={{ background: 'rgba(255,255,255,0.03)' }}>
          <span className="text-[8px] font-mono text-white/30 truncate">{url}</span>
        </div>
        <div className={`w-3.5 h-1.5 rounded-full bg-gradient-to-r ${gradient} opacity-50`} />
      </div>
      <div className="relative flex-1 overflow-hidden">{children}</div>
    </div>
  )
}

function DashboardMock({ gradient }: { gradient: string }) {
  return (
    <div className="absolute inset-0 flex">
      <div className="w-1/4 p-2 space-y-1.5 border-r border-white/[0.05]" style={{ background: 'rgba(255,255,255,0.012)' }}>
        <div className={`h-3 w-3 rounded-md bg-gradient-to-br ${gradient} opacity-70 mb-2`} />
        {[72, 60, 64, 52, 58].map((w, i) => (
          <div key={i} className="h-1.5 rounded bg-white/[0.07]" style={{ width: `${w}%` }} />
        ))}
      </div>
      <div className="flex-1 p-2.5 space-y-2">
        <div className="grid grid-cols-3 gap-1.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-md p-1.5 border border-white/[0.05]" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <div className={`h-1.5 w-2/3 rounded bg-gradient-to-r ${gradient} opacity-70`} />
              <div className="h-2.5 w-1/2 rounded bg-white/[0.1] mt-1.5" />
            </div>
          ))}
        </div>
        <div className="rounded-md p-2 h-[58%] flex items-end gap-1 border border-white/[0.05]" style={{ background: 'rgba(255,255,255,0.02)' }}>
          {[42, 66, 50, 82, 60, 92, 70, 56].map((h, i) => (
            <div key={i} className={`flex-1 rounded-sm bg-gradient-to-t ${gradient} opacity-60`} style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ChatMock({ gradient }: { gradient: string }) {
  return (
    <div className="absolute inset-0 p-3 flex flex-col gap-2 justify-end">
      <div className="self-start max-w-[70%] rounded-xl rounded-bl-sm px-2 py-1.5 space-y-1 border border-white/[0.05]" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <div className="h-1.5 w-24 rounded bg-white/[0.14]" />
        <div className="h-1.5 w-16 rounded bg-white/[0.08]" />
      </div>
      <div className={`self-end max-w-[70%] rounded-xl rounded-br-sm px-2 py-1.5 space-y-1 bg-gradient-to-r ${gradient} opacity-80`}>
        <div className="h-1.5 w-20 rounded bg-white/45" />
        <div className="h-1.5 w-28 rounded bg-white/25" />
      </div>
      <div className="self-start max-w-[78%] rounded-xl rounded-bl-sm px-2 py-1.5 space-y-1 border border-white/[0.05]" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <div className="h-1.5 w-32 rounded bg-white/[0.14]" />
        <div className="h-1.5 w-24 rounded bg-white/[0.08]" />
        <div className="h-1.5 w-20 rounded bg-white/[0.06]" />
      </div>
      <div className="mt-1 h-5 rounded-lg flex items-center px-2 border border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="h-1.5 w-20 rounded bg-white/[0.07]" />
        <div className={`ml-auto w-3.5 h-3.5 rounded-md bg-gradient-to-r ${gradient}`} />
      </div>
    </div>
  )
}

function WebsiteMock({ gradient }: { gradient: string }) {
  return (
    <div className="absolute inset-0 flex flex-col">
      <div className={`h-1/2 flex flex-col items-center justify-center gap-1.5 bg-gradient-to-br ${gradient}`} style={{ opacity: 0.28 }}>
        <div className="h-2.5 w-28 rounded bg-white/60" />
        <div className="h-1.5 w-20 rounded bg-white/35" />
        <div className="h-3 w-14 rounded-full bg-white/80 mt-1" />
      </div>
      <div className="flex-1 p-2.5 grid grid-cols-3 gap-1.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-md overflow-hidden border border-white/[0.05]" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <div className={`h-6 bg-gradient-to-br ${gradient}`} style={{ opacity: 0.22 }} />
            <div className="p-1 space-y-1">
              <div className="h-1.5 w-full rounded bg-white/[0.1]" />
              <div className="h-1.5 w-2/3 rounded bg-white/[0.06]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function MobileMock({ project }: { project: Project }) {
  const [imgOk, setImgOk] = useState(true)
  const showImg = Boolean(project.image) && imgOk
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 35%, rgba(245,158,11,0.13), transparent 65%)' }} />
      <div
        className="relative w-[40%] aspect-[9/19] rounded-[1.1rem] overflow-hidden border border-amber-500/25"
        style={{ background: '#0d0a05', boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 40px rgba(245,158,11,0.1)' }}
      >
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-black/60 z-10" />
        {/* confidential app preview — real screenshot, lightly blurred to protect the client */}
        {showImg ? (
          <img
            src={project.image as string}
            alt={`${project.title} preview`}
            loading="lazy"
            onError={() => setImgOk(false)}
            className="absolute inset-0 w-full h-full object-cover object-top blur-[3px] scale-105 opacity-90"
          />
        ) : (
          <div className="absolute inset-0 blur-[6px] scale-110 opacity-80">
            <div className="h-1/3 bg-gradient-to-br from-amber-500/40 via-orange-500/30 to-rose-500/30" />
            <div className="p-2 space-y-1.5">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-4 rounded-lg bg-white/[0.06]" />
              ))}
            </div>
          </div>
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5" style={{ background: 'rgba(0,0,0,0.32)' }}>
          <div className="w-7 h-7 rounded-full flex items-center justify-center border border-amber-500/30" style={{ background: 'rgba(245,158,11,0.12)' }}>
            <Lock size={13} className="text-amber-300/80" />
          </div>
          <span className="text-[7px] font-mono text-amber-300/70 uppercase tracking-wider">Confidential</span>
        </div>
      </div>
    </div>
  )
}

function PreviewMock({ project }: { project: Project }) {
  switch (project.preview) {
    case 'mobile':
      return <MobileMock project={project} />
    case 'chat':
      return (
        <BrowserChrome url={mockUrl(project)} gradient={project.gradient}>
          <ChatMock gradient={project.gradient} />
        </BrowserChrome>
      )
    case 'website':
      return (
        <BrowserChrome url={mockUrl(project)} gradient={project.gradient}>
          <WebsiteMock gradient={project.gradient} />
        </BrowserChrome>
      )
    default:
      return (
        <BrowserChrome url={mockUrl(project)} gradient={project.gradient}>
          <DashboardMock gradient={project.gradient} />
        </BrowserChrome>
      )
  }
}

function ProjectPreview({ project }: { project: Project }) {
  const [imgOk, setImgOk] = useState(true)
  // 'mobile' = confidential client app → always render the blurred phone mock, never the raw screenshot
  const showImg = project.preview !== 'mobile' && Boolean(project.image) && imgOk
  return (
    <div className="absolute inset-0">
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} style={{ opacity: 0.06 }} />
      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.05]">
        {showImg ? (
          <img
            src={project.image as string}
            alt={`${project.title} preview`}
            loading="lazy"
            onError={() => setImgOk(false)}
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        ) : (
          <PreviewMock project={project} />
        )}
      </div>
      {/* fade into the meta panel below */}
      <div className="absolute inset-x-0 bottom-0 h-14 pointer-events-none" style={{ background: 'linear-gradient(to top, #0b0b0f, transparent)' }} />
    </div>
  )
}

function StatusBadge({ project }: { project: Project }) {
  const base = 'flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] md:text-[10px] font-semibold backdrop-blur-md border'
  if (project.isComingSoon) {
    return (
      <span className={`${base} text-amber-200 border-amber-400/40`} style={{ background: 'rgba(245,158,11,0.18)' }}>
        <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-amber-300" />
        In Development
      </span>
    )
  }
  if (project.live) {
    return (
      <span className={`${base} text-cyan-200 border-cyan-400/30`} style={{ background: 'rgba(6,182,212,0.18)' }}>
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-300" />
        Live
      </span>
    )
  }
  if ('localOnly' in project && project.localOnly) {
    return (
      <span className={`${base} text-purple-200 border-purple-400/30`} style={{ background: 'rgba(168,85,247,0.18)' }}>
        <span className="w-1.5 h-1.5 rounded-full bg-purple-300" />
        Local
      </span>
    )
  }
  if (project.featured) {
    return (
      <span className={`${base} text-blue-200 border-blue-400/30`} style={{ background: 'rgba(59,130,246,0.18)' }}>
        ★ Featured
      </span>
    )
  }
  return null
}

function QuickLinks({ project, accent }: { project: Project; accent: string }) {
  const stop = (e: React.MouseEvent) => e.stopPropagation()

  if (project.isComingSoon) {
    return (
      <div className="flex items-center gap-1.5" onClick={stop}>
        <StoreLinks
          appStore={'appStore' in project ? project.appStore : null}
          googlePlay={'googlePlay' in project ? project.googlePlay : null}
          size="md"
          onClick={stop}
        />
      </div>
    )
  }

  const btn = 'inline-flex items-center justify-center w-10 h-10 rounded-xl border transition-all'
  return (
    <div className="flex items-center gap-2" onClick={stop}>
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`GitHub: ${project.title}`}
          title="View source on GitHub"
          className={`${btn} text-white/55 border-white/[0.1] hover:text-white hover:border-white/25 hover:scale-105`}
          style={{ background: 'rgba(255,255,255,0.04)' }}
          onClick={stop}
        >
          <GithubIcon size={17} />
        </a>
      )}
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Live demo: ${project.title}`}
          title="Open live demo"
          className={`${btn} hover:scale-105`}
          style={{ color: accent, borderColor: `${accent}66`, background: `${accent}22` }}
          onClick={stop}
        >
          <ExternalLink size={17} />
        </a>
      )}
    </div>
  )
}

function ProjectCard({ project, index, large }: { project: Project; index: number; large?: boolean }) {
  const accent = accents[project.id] ?? '#60a5fa'
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
        transition={{ duration: isMobile ? 0 : 0.6, delay: isMobile ? 0 : index * 0.09 }}
        className={`group relative rounded-2xl cursor-pointer h-full ${large ? 'min-h-[380px] md:min-h-[460px] lg:min-h-[500px]' : 'min-h-[340px] md:min-h-[420px] lg:min-h-[460px]'}`}
        onClick={() => setOpen(true)}
        whileHover={{ y: -8 }}
        role="button"
        tabIndex={0}
        aria-label={`${project.title} — open case study`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setOpen(true)
          }
        }}
      >
        {/* Soft outer glow on hover */}
        <div
          aria-hidden
          className={`absolute -inset-2 rounded-[1.4rem] bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-25 blur-2xl transition-opacity duration-500 pointer-events-none`}
        />

        {/* Coming Soon — gentle persistent glow */}
        {isSoon && (
          <motion.div
            aria-hidden
            className="absolute -inset-1.5 rounded-[1.3rem] bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 blur-xl pointer-events-none"
            animate={{ opacity: [0.12, 0.24, 0.12] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        {/* Animated gradient border ring (hover) */}
        <motion.div
          aria-hidden
          className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${project.gradient} transition-opacity duration-500 pointer-events-none ${isSoon ? 'opacity-60' : 'opacity-0 group-hover:opacity-100'}`}
          style={{
            padding: '1px',
            backgroundSize: '200% 200%',
            WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />

        {/* Card body */}
        <div
          className="relative h-full rounded-2xl overflow-hidden flex flex-col"
          style={
            isSoon
              ? { background: 'rgba(20,10,0,0.6)', border: '1px solid rgba(245,158,11,0.25)' }
              : { background: '#0b0b0f', border: '1px solid rgba(255,255,255,0.06)' }
          }
        >
          {/* Top gradient bar */}
          <div className={`${isSoon ? 'h-[4px]' : 'h-[3px]'} w-full bg-gradient-to-r ${project.gradient} flex-shrink-0`} />

          {/* HERO PREVIEW — grows to fill the card */}
          <div className="relative w-full flex-1 min-h-[180px] overflow-hidden">
            <ProjectPreview project={project} />

            {/* Status badge */}
            <div className="absolute top-2.5 left-2.5 z-10">
              <StatusBadge project={project} />
            </div>

            {/* Category chip */}
            <div className="absolute top-2.5 right-2.5 z-10">
              <span
                className="px-2 py-0.5 rounded-full text-[9px] font-mono font-medium backdrop-blur-md border"
                style={{ background: 'rgba(0,0,0,0.4)', color: accent, borderColor: `${accent}40` }}
              >
                {project.category}
              </span>
            </div>
          </div>

          {/* META */}
          <div className="relative z-10 p-4 md:p-5 flex flex-col flex-shrink-0 min-w-0">
            <h3 className={`font-bold leading-tight ${isSoon ? 'text-amber-50' : 'text-white'} ${large ? 'text-lg md:text-2xl' : 'text-base md:text-lg'}`}>
              {project.title}
            </h3>
            <p className={`text-xs md:text-sm mt-1 truncate ${isSoon ? 'text-amber-400/60' : 'text-white/45'}`}>
              {project.subtitle}
            </p>

            {/* Tech badges — accent-tinted so they pop with the screenshot */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {project.tech.slice(0, large ? 4 : 3).map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded-md text-[10px] font-semibold border"
                  style={{ color: accent, borderColor: `${accent}38`, background: `${accent}14` }}
                >
                  {t}
                </span>
              ))}
              {project.tech.length > (large ? 4 : 3) && (
                <span className="px-1.5 py-0.5 text-[10px] font-mono" style={{ color: `${accent}99` }}>
                  +{project.tech.length - (large ? 4 : 3)}
                </span>
              )}
            </div>

            {/* Bottom row — View Case Study + quick-open links */}
            <div className={`flex items-center justify-between gap-2 mt-4 pt-3 border-t ${isSoon ? 'border-amber-500/10' : 'border-white/[0.05]'}`}>
              <span className={`flex items-center gap-1.5 text-xs md:text-sm font-semibold transition-colors ${isSoon ? 'text-amber-400/70 group-hover:text-amber-200' : 'text-white/55 group-hover:text-white'}`}>
                View Case Study
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" style={{ color: accent }} />
              </span>
              <QuickLinks project={project} accent={accent} />
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

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-5 lg:gap-6 mb-3 md:mb-5 lg:mb-6">
          {projects.slice(0, 2).map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} large />
          ))}
        </div>
        {/* Row 2: remaining cards — 3-col on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 lg:gap-6">
          {projects.slice(2).map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i + 2} />
          ))}
        </div>
      </div>
    </section>
  )
}
