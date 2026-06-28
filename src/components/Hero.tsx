import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, type Variants } from 'framer-motion'
import { Mail, Download, ExternalLink, Code2, Atom, Container, Network, Bot, FlaskConical, Database, GitBranch, Briefcase, type LucideIcon } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './SocialIcons'
import { personalInfo } from '../data/portfolio'
import { useMobileViewport } from '../lib/mobile'

const TYPING_SPEED = 75
const DELETE_SPEED = 35
const PAUSE_DURATION = 2200

function useTypingEffect(words: string[]) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const currentWord = words[wordIndex]
    const tick = () => {
      if (!isDeleting) {
        if (text.length < currentWord.length) {
          setText(currentWord.slice(0, text.length + 1))
          timeout.current = setTimeout(tick, TYPING_SPEED)
        } else {
          timeout.current = setTimeout(() => setIsDeleting(true), PAUSE_DURATION)
        }
      } else {
        if (text.length > 0) {
          setText(currentWord.slice(0, text.length - 1))
          timeout.current = setTimeout(tick, DELETE_SPEED)
        } else {
          setIsDeleting(false)
          setWordIndex((i) => (i + 1) % words.length)
        }
      }
    }
    timeout.current = setTimeout(tick, isDeleting ? DELETE_SPEED : TYPING_SPEED)
    return () => { if (timeout.current) clearTimeout(timeout.current) }
  }, [text, isDeleting, wordIndex, words])

  return text
}

function FloatingParticles() {
  const particles = useRef(
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      duration: 5 + Math.random() * 6,
      delay: Math.random() * 5,
      color: i % 3 === 0 ? 'rgba(59,130,246,0.7)' : i % 3 === 1 ? 'rgba(6,182,212,0.7)' : 'rgba(168,85,247,0.5)',
    }))
  )

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.current.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%`, background: p.color }}
          animate={{ y: [0, -40, 0], opacity: [0.1, 0.8, 0.1], scale: [1, 1.6, 1] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

function TechOrbit() {
  const nodes: { Icon: LucideIcon; label: string; r: number; startAngle: number; speed: number; color: string }[] = [
    { Icon: Code2, label: 'Python', r: 130, startAngle: 0, speed: 18, color: '#60a5fa' },
    { Icon: Atom, label: 'React', r: 130, startAngle: 72, speed: 18, color: '#22d3ee' },
    { Icon: Container, label: 'Docker', r: 130, startAngle: 144, speed: 18, color: '#60a5fa' },
    { Icon: Network, label: 'K8s', r: 130, startAngle: 216, speed: 18, color: '#a78bfa' },
    { Icon: Bot, label: 'AI', r: 130, startAngle: 288, speed: 18, color: '#c084fc' },
    { Icon: FlaskConical, label: 'Flask', r: 75, startAngle: 0, speed: -12, color: '#34d399' },
    { Icon: Database, label: 'MongoDB', r: 75, startAngle: 120, speed: -12, color: '#22d3ee' },
    { Icon: GitBranch, label: 'CI/CD', r: 75, startAngle: 240, speed: -12, color: '#60a5fa' },
  ]

  return (
    <div className="relative w-[340px] h-[340px] flex items-center justify-center">
      {/* Rings */}
      <motion.div className="absolute w-64 h-64 rounded-full" style={{ border: '1px solid rgba(59,130,246,0.08)' }}
        animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }} />
      <motion.div className="absolute w-40 h-40 rounded-full" style={{ border: '1px dashed rgba(6,182,212,0.12)' }}
        animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }} />

      {/* Glow core */}
      <motion.div
        className="absolute w-40 h-40 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.12), transparent 70%)' }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Core */}
      <motion.div
        className="relative z-10 w-28 h-28 rounded-2xl flex flex-col items-center justify-center gap-1"
        style={{
          background: 'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(168,85,247,0.08))',
          border: '1px solid rgba(59,130,246,0.25)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 0 40px rgba(59,130,246,0.15)',
        }}
        animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="font-mono text-xs text-blue-400">{'<DA/>'}</span>
        <span className="text-xs text-white/45 font-mono">engineer</span>
      </motion.div>

      {/* Orbiting nodes */}
      {nodes.map((node, i) => (
        <motion.div
          key={node.label}
          className="absolute"
          animate={{ rotate: [node.startAngle, node.startAngle + (node.speed > 0 ? 360 : -360)] }}
          transition={{ duration: Math.abs(node.speed), repeat: Infinity, ease: 'linear' }}
          style={{ width: node.r * 2, height: node.r * 2 }}
        >
          <div
            className="absolute"
            style={{
              top: 0,
              left: '50%',
              transform: `translateX(-50%)`,
            }}
          >
            <motion.div
              className="flex items-center justify-center w-9 h-9 rounded-xl cursor-default"
              style={{
                background: 'rgba(15,15,20,0.8)',
                border: '1px solid rgba(59,130,246,0.15)',
                backdropFilter: 'blur(8px)',
              }}
              animate={{ rotate: node.speed > 0 ? [-node.startAngle, -node.startAngle - 360] : [-node.startAngle, -node.startAngle + 360] }}
              transition={{ duration: Math.abs(node.speed), repeat: Infinity, ease: 'linear' }}
              whileHover={{ scale: 1.3, borderColor: 'rgba(59,130,246,0.5)' }}
              title={node.label}
            >
              <node.Icon size={16} style={{ color: node.color }} aria-hidden />
            </motion.div>
          </div>
        </motion.div>
      ))}

      {/* Floating code snippets */}
      {[
        { text: 'def train_model():', color: '#60a5fa', x: 190, y: -70 },
        { text: 'kubectl apply -f', color: '#34d399', x: -175, y: 30 },
        { text: 'rag.query(prompt)', color: '#a78bfa', x: 160, y: 115 },
        { text: 'docker push', color: '#22d3ee', x: -150, y: -85 },
      ].map((snip, i) => (
        <motion.div
          key={i}
          className="absolute font-mono text-xs font-medium pointer-events-none select-none"
          style={{ color: snip.color, x: snip.x, y: snip.y, opacity: 0.55 }}
          animate={{ opacity: [0.3, 0.7, 0.3], y: [snip.y, snip.y - 8, snip.y] }}
          transition={{ duration: 3 + i * 0.8, repeat: Infinity, delay: i * 0.9 }}
        >
          {snip.text}
        </motion.div>
      ))}
    </div>
  )
}

function MouseGlow() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { damping: 25, stiffness: 120 })
  const springY = useSpring(y, { damping: 25, stiffness: 120 })

  const handleMouseMove = useCallback((e: MouseEvent) => {
    x.set(e.clientX)
    y.set(e.clientY)
  }, [x, y])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  return (
    <motion.div
      className="fixed pointer-events-none z-0"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        width: 500,
        height: 500,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, rgba(168,85,247,0.03) 40%, transparent 70%)',
      }}
    />
  )
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const childVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
}

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/.test(navigator.platform)
const shortcutLabel = isMac ? '⌘K' : 'Ctrl+K'

export default function Hero() {
  const typedText = useTypingEffect(personalInfo.roles)
  const isMobile = useMobileViewport()

  const heroContent = (
    <>
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 mb-8">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-medium"
                style={{ background: 'rgba(16,185,129,0.05)', borderColor: 'rgba(16,185,129,0.2)', color: '#34d399' }}>
                {!isMobile ? (
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                    animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                )}
                Available for opportunities
              </div>
            </div>

            {/* Headline */}
            <div className="mb-3">
              <div className="flex items-center gap-4">
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight leading-[1.05]">
                  <span className="text-white">Dolev </span>
                  <span style={{
                    background: 'linear-gradient(135deg, #60a5fa 0%, #06b6d4 50%, #a855f7 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    backgroundSize: '200% 200%',
                  }}>
                    Atik
                  </span>
                </h1>
                <div className="flex-shrink-0 p-[2px] rounded-full" style={{ background: 'linear-gradient(135deg, #60a5fa, #06b6d4, #a855f7)' }}>
                  <img
                    src="/about.jpg"
                    alt="Dolev Atik"
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full object-cover block"
                    style={{ background: '#0f0f14' }}
                  />
                </div>
              </div>
            </div>

            {/* Typing role */}
            <div className="flex items-center gap-2 h-9 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
              <span className="text-lg md:text-xl font-semibold text-white/80">
                {typedText}
              </span>
              <span className="w-0.5 h-6 bg-blue-400 animate-blink flex-shrink-0" />
            </div>

            {/* Tagline */}
            <p className="text-base md:text-lg text-white/45 leading-relaxed max-w-lg mb-8">
              {personalInfo.tagline}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 justify-items-center sm:flex sm:flex-wrap items-center gap-y-6 gap-x-4 sm:gap-6 mb-10 py-5 border-y border-white/[0.04]">
              {[
                { emoji: '🎓', val: '93', unit: 'GPA', desc: 'Computer Science' },
                { emoji: '🚀', val: '20+', unit: 'Production Projects', desc: 'Shipped to clients' },
                { emoji: '🤖', val: 'Multiple', unit: 'AI & RAG Systems', desc: 'LangChain · LLMs', mid: true },
                { emoji: '☁️', val: 'Docker · K8s · GitOps', unit: 'Cloud & DevOps', desc: 'Cloud-native', wide: true },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className={`${s.wide ? 'text-sm' : s.mid ? 'text-lg' : 'text-2xl'} font-black text-white leading-tight`}>{s.val}</div>
                  <div className="text-xs font-bold text-blue-400 mt-0.5">{s.emoji} {s.unit}</div>
                  <div className="text-[10px] text-white/30 mt-0.5">{s.desc}</div>
                </div>
              ))}
              <div className="hidden sm:block w-px h-10 bg-white/[0.06] mx-2" />
              <a
                href="https://web4-you.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Web4You website"
                className="group col-span-2 w-full sm:w-auto flex items-center gap-3 px-5 py-3 rounded-xl sm:flex-1 min-w-0 sm:min-w-[260px] transition-all hover:-translate-y-0.5 hover:border-blue-400/40"
                style={{ background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.12)' }}
              >
                <div
                  className="flex items-center justify-center w-9 h-9 rounded-lg flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, rgba(96,165,250,0.15), rgba(168,85,247,0.12))', border: '1px solid rgba(59,130,246,0.2)' }}
                >
                  <Briefcase size={16} className="text-blue-400" />
                </div>
                <div className="leading-tight flex-shrink-0">
                  <div className="text-[10px] uppercase tracking-wider text-white/35 font-semibold">Co-Founder</div>
                  <div className="text-sm font-bold">
                    <span style={{
                      background: 'linear-gradient(135deg, #60a5fa, #a855f7)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>Web4You</span>
                    <span className="text-white/40 font-medium"> Agency</span>
                  </div>
                </div>
                <p className="hidden md:block flex-1 pl-4 ml-1 border-l border-white/[0.08] text-xs text-white/40 leading-snug">
                  Designing & shipping custom, production-grade web apps for growing businesses.
                </p>
                <span
                  className="ml-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold text-xs text-white flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
                    boxShadow: '0 4px 16px rgba(59,130,246,0.25)',
                  }}
                >
                  Visit Site
                  <ExternalLink size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </a>
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-3">
              {/* Primary actions — one row */}
              <div className="flex gap-3">
                <a
                  href="/cv.pdf"
                  download
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                    boxShadow: '0 0 0 0 rgba(59,130,246,0.3)',
                  }}
                >
                  <Download size={15} />
                  Download Resume
                </a>

                <a
                  href="#projects"
                  onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) }}
                  className="group flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white/80 hover:text-white transition-colors"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <ExternalLink size={15} />
                  View Projects
                </a>
              </div>

              {/* Social icons — separate row */}
              <div className="flex gap-3">
                {[
                  { icon: <GithubIcon size={16} />, href: personalInfo.github, label: 'GitHub' },
                  { icon: <LinkedinIcon size={16} />, href: personalInfo.linkedin, label: 'LinkedIn' },
                  { icon: <Mail size={16} />, href: `mailto:${personalInfo.email}`, label: 'Email' },
                ].map(({ icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex-1 inline-flex items-center justify-center h-12 rounded-xl text-white/50 hover:text-white transition-colors"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {!isMobile && (
              <div className="mt-6 flex items-center gap-2 text-xs text-white/20">
                <kbd className="px-2 py-0.5 rounded border border-white/[0.08] font-mono text-white/25">{shortcutLabel}</kbd>
                <span>to open command palette</span>
              </div>
            )}
    </>
  )

  return (
    <section
      id="hero"
      aria-label="Introduction — Dolev Atik, Software Engineer"
      className="relative min-h-[calc(100dvh-var(--nav-height))] overflow-hidden grid-bg"
    >
      {!isMobile && <MouseGlow />}

      {/* Layered background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[140px]"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.08), transparent)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.07), transparent)' }} />
        <div className="absolute top-3/4 left-1/3 w-[300px] h-[300px] rounded-full blur-[100px]"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.05), transparent)' }} />
      </div>

      {!isMobile && <FloatingParticles />}

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8 py-8 md:py-10 pb-20 lg:pb-10">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* Left: Text */}
          {isMobile ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {heroContent}
            </motion.div>
          ) : (
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            {/* Status badge */}
            <motion.div variants={childVariants} className="inline-flex items-center gap-2 mb-4">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-medium"
                style={{ background: 'rgba(16,185,129,0.05)', borderColor: 'rgba(16,185,129,0.2)', color: '#34d399' }}>
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                  animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                Available for opportunities
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div variants={childVariants} className="mb-3">
              <div className="flex items-center gap-4">
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight leading-[1.05]">
                  <span className="text-white">Dolev </span>
                  <span style={{
                    background: 'linear-gradient(135deg, #60a5fa 0%, #06b6d4 50%, #a855f7 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    backgroundSize: '200% 200%',
                  }}>
                    Atik
                  </span>
                </h1>
                <div className="flex-shrink-0 p-[2px] rounded-full" style={{ background: 'linear-gradient(135deg, #60a5fa, #06b6d4, #a855f7)' }}>
                  <img
                    src="/about.jpg"
                    alt="Dolev Atik"
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full object-cover block"
                    style={{ background: '#0f0f14' }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Typing role */}
            <motion.div variants={childVariants} className="flex items-center gap-2 h-9 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
              <span className="text-lg md:text-xl font-semibold text-white/80">
                {typedText}
              </span>
              <span className="w-0.5 h-6 bg-blue-400 animate-blink flex-shrink-0" />
            </motion.div>

            {/* Tagline */}
            <motion.p variants={childVariants} className="text-base md:text-lg text-white/45 leading-relaxed max-w-lg mb-5">
              {personalInfo.tagline}
            </motion.p>

            {/* Stats */}
            <motion.div variants={childVariants} className="grid grid-cols-2 justify-items-center sm:flex sm:flex-wrap items-center gap-y-6 gap-x-4 sm:gap-6 mb-5 py-3 border-y border-white/[0.04]">
              {[
                { emoji: '🎓', val: '93', unit: 'GPA', desc: 'Computer Science' },
                { emoji: '🚀', val: '20+', unit: 'Production Projects', desc: 'Shipped to clients' },
                { emoji: '🤖', val: 'Multiple', unit: 'AI & RAG Systems', desc: 'LangChain · LLMs', mid: true },
                { emoji: '☁️', val: 'Docker · K8s · GitOps', unit: 'Cloud & DevOps', desc: 'Cloud-native', wide: true },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className={`${s.wide ? 'text-sm' : s.mid ? 'text-lg' : 'text-2xl'} font-black text-white leading-tight`}>{s.val}</div>
                  <div className="text-xs font-bold text-blue-400 mt-0.5">{s.emoji} {s.unit}</div>
                  <div className="text-[10px] text-white/30 mt-0.5">{s.desc}</div>
                </div>
              ))}
              <div className="hidden sm:block w-px h-10 bg-white/[0.06] mx-2" />
              <a
                href="https://web4-you.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Web4You website"
                className="group col-span-2 w-full sm:w-auto flex items-center gap-3 px-5 py-3 rounded-xl sm:flex-1 min-w-0 sm:min-w-[260px] transition-all hover:-translate-y-0.5 hover:border-blue-400/40"
                style={{ background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.12)' }}
              >
                <div
                  className="flex items-center justify-center w-9 h-9 rounded-lg flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, rgba(96,165,250,0.15), rgba(168,85,247,0.12))', border: '1px solid rgba(59,130,246,0.2)' }}
                >
                  <Briefcase size={16} className="text-blue-400" />
                </div>
                <div className="leading-tight flex-shrink-0">
                  <div className="text-[10px] uppercase tracking-wider text-white/35 font-semibold">Co-Founder</div>
                  <div className="text-sm font-bold">
                    <span style={{
                      background: 'linear-gradient(135deg, #60a5fa, #a855f7)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>Web4You</span>
                    <span className="text-white/40 font-medium"> Agency</span>
                  </div>
                </div>
                <p className="hidden md:block flex-1 pl-4 ml-1 border-l border-white/[0.08] text-xs text-white/40 leading-snug">
                  Designing & shipping custom, production-grade web apps for growing businesses.
                </p>
                <span
                  className="ml-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold text-xs text-white flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
                    boxShadow: '0 4px 16px rgba(59,130,246,0.25)',
                  }}
                >
                  Visit Site
                  <ExternalLink size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </a>
            </motion.div>

            {/* CTA */}
            <motion.div variants={childVariants} className="flex flex-wrap gap-3">
              <motion.a
                href="/cv.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                  boxShadow: '0 0 0 0 rgba(59,130,246,0.3)',
                }}
                whileHover={{ scale: 1.04, y: -2, boxShadow: '0 8px 30px rgba(59,130,246,0.35)' }}
                whileTap={{ scale: 0.97 }}
              >
                <Download size={15} />
                Download Resume
              </motion.a>

              <motion.a
                href="#projects"
                onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white/80 hover:text-white transition-colors"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                whileHover={{ scale: 1.04, y: -2, background: 'rgba(255,255,255,0.07)' }}
                whileTap={{ scale: 0.97 }}
              >
                <ExternalLink size={15} className="group-hover:rotate-12 transition-transform duration-200" />
                View Projects
              </motion.a>

              {[
                { icon: <GithubIcon size={16} />, href: personalInfo.github, label: 'GitHub' },
                { icon: <LinkedinIcon size={16} />, href: personalInfo.linkedin, label: 'LinkedIn' },
                { icon: <Mail size={16} />, href: `mailto:${personalInfo.email}`, label: 'Email' },
              ].map(({ icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex items-center justify-center w-11 h-11 rounded-xl text-white/50 hover:text-white transition-colors"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                  whileHover={{ scale: 1.1, y: -2, background: 'rgba(59,130,246,0.1)', borderColor: 'rgba(59,130,246,0.3)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  {icon}
                </motion.a>
              ))}
            </motion.div>

            {/* Keyboard shortcut hint */}
            <motion.div variants={childVariants} className="mt-5 flex items-center gap-2 text-xs text-white/20">
              <kbd className="px-2 py-0.5 rounded border border-white/[0.08] font-mono text-white/25">{shortcutLabel}</kbd>
              <span>to open command palette</span>
            </motion.div>
          </motion.div>
          )}

          {/* Right: Illustration — desktop only (not rendered on mobile) */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:flex items-center justify-center"
            >
              <TechOrbit />
            </motion.div>
          )}
        </div>
      </div>

      {/* Scroll indicator — desktop only */}
      {!isMobile && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20"
      >
        <motion.div
          className="w-5 h-8 rounded-full border border-white/[0.1] flex items-start justify-center pt-1.5"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-white/40"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
      )}
    </section>
  )
}
