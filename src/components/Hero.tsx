import { useEffect, useRef, useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import { Mail, ChevronDown, Download, ExternalLink } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './SocialIcons'
import { personalInfo } from '../data/portfolio'

const TYPING_SPEED = 80
const DELETE_SPEED = 40
const PAUSE_DURATION = 2000

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
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 3 === 0
              ? 'rgba(59,130,246,0.6)'
              : i % 3 === 1
              ? 'rgba(6,182,212,0.6)'
              : 'rgba(168,85,247,0.6)',
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

function AnimatedIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Outer glow ring */}
      <motion.div
        className="absolute w-80 h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)',
          border: '1px solid rgba(59,130,246,0.1)',
        }}
        animate={{ scale: [1, 1.05, 1], rotate: [0, 360] }}
        transition={{ scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' }, rotate: { duration: 30, repeat: Infinity, ease: 'linear' } }}
      />

      {/* Middle ring */}
      <motion.div
        className="absolute w-56 h-56 rounded-full"
        style={{
          border: '1px dashed rgba(6,182,212,0.2)',
        }}
        animate={{ rotate: [0, -360] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      {/* Core */}
      <motion.div
        className="relative z-10 w-32 h-32 rounded-2xl flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(168,85,247,0.15))',
          border: '1px solid rgba(59,130,246,0.3)',
          backdropFilter: 'blur(20px)',
        }}
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="text-center">
          <div className="font-mono text-xs text-blue-400 leading-relaxed">
            <div className="text-purple-400">{'<'}<span className="text-blue-400">AI</span>{'>'}</div>
            <div className="text-cyan-400 text-lg font-bold">{'{ }'}</div>
            <div className="text-purple-400">{'</'}<span className="text-blue-400">AI</span>{'>'}</div>
          </div>
        </div>
      </motion.div>

      {/* Orbiting nodes */}
      {[
        { icon: '🐍', label: 'Python', color: '#3b82f6', angle: 0, radius: 120 },
        { icon: '⚛️', label: 'React', color: '#06b6d4', angle: 72, radius: 120 },
        { icon: '🐳', label: 'Docker', color: '#a855f7', angle: 144, radius: 120 },
        { icon: '☸️', label: 'K8s', color: '#3b82f6', angle: 216, radius: 120 },
        { icon: '🤖', label: 'AI', color: '#06b6d4', angle: 288, radius: 120 },
      ].map((node, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            x: Math.cos((node.angle * Math.PI) / 180) * node.radius,
            y: Math.sin((node.angle * Math.PI) / 180) * node.radius,
          }}
          animate={{
            x: [
              Math.cos(((node.angle) * Math.PI) / 180) * node.radius,
              Math.cos(((node.angle + 360) * Math.PI) / 180) * node.radius,
            ],
            y: [
              Math.sin(((node.angle) * Math.PI) / 180) * node.radius,
              Math.sin(((node.angle + 360) * Math.PI) / 180) * node.radius,
            ],
          }}
          transition={{ duration: 15 + i * 2, repeat: Infinity, ease: 'linear' }}
        >
          <motion.div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-lg"
            style={{
              background: `rgba(${node.color === '#3b82f6' ? '59,130,246' : node.color === '#06b6d4' ? '6,182,212' : '168,85,247'}, 0.15)`,
              border: `1px solid ${node.color}40`,
              backdropFilter: 'blur(8px)',
            }}
            whileHover={{ scale: 1.3 }}
          >
            {node.icon}
          </motion.div>
        </motion.div>
      ))}

      {/* Code lines floating */}
      {[
        { code: 'def deploy():', color: 'text-blue-400', x: 180, y: -80 },
        { code: 'kubectl apply', color: 'text-cyan-400', x: -160, y: 40 },
        { code: 'model.predict()', color: 'text-purple-400', x: 140, y: 100 },
        { code: 'docker build .', color: 'text-blue-300', x: -120, y: -60 },
      ].map((line, i) => (
        <motion.div
          key={i}
          className={`absolute font-mono text-xs ${line.color} opacity-50`}
          style={{ x: line.x, y: line.y }}
          animate={{ opacity: [0.3, 0.7, 0.3], y: [line.y, line.y - 10, line.y] }}
          transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.8 }}
        >
          {line.code}
        </motion.div>
      ))}
    </div>
  )
}

export default function Hero() {
  const typedText = useTypingEffect(personalInfo.roles)

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  }
  const childVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px]" />
      </div>

      <FloatingParticles />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={childVariants} className="inline-flex items-center gap-2 mb-8">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-blue-500/20 text-xs font-medium text-blue-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for opportunities
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={childVariants} className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[0.95] mb-6">
              <span className="text-white">{personalInfo.name}</span>
            </motion.h1>

            {/* Typing role */}
            <motion.div variants={childVariants} className="h-10 mb-6 flex items-center">
              <span className="text-xl md:text-2xl font-semibold text-gradient-blue">
                {typedText}
              </span>
              <span className="ml-0.5 w-0.5 h-7 bg-blue-400 animate-blink inline-block" />
            </motion.div>

            {/* Tagline */}
            <motion.p variants={childVariants} className="text-lg text-white/50 leading-relaxed max-w-xl mb-10">
              {personalInfo.tagline}
            </motion.p>

            {/* Stats row */}
            <motion.div variants={childVariants} className="flex items-center gap-8 mb-10">
              {[
                { label: 'GPA', value: '93' },
                { label: 'Production Sites', value: '20+' },
                { label: 'Projects Shipped', value: '25+' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-white/40 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={childVariants} className="flex flex-wrap gap-3">
              <motion.a
                href="#projects"
                onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 text-white font-semibold text-sm hover:bg-blue-400 transition-all duration-200 shadow-lg shadow-blue-500/25"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <ExternalLink size={16} />
                View Projects
              </motion.a>

              <motion.a
                href="/cv.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-white/10 text-white font-semibold text-sm hover:bg-white/[0.06] transition-all duration-200"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download size={16} />
                Download CV
              </motion.a>

              <motion.a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl glass border border-white/10 text-white/70 hover:text-white font-semibold text-sm hover:bg-white/[0.06] transition-all duration-200"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <GithubIcon size={16} />
              </motion.a>

              <motion.a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl glass border border-white/10 text-white/70 hover:text-white font-semibold text-sm hover:bg-white/[0.06] transition-all duration-200"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <LinkedinIcon size={16} />
              </motion.a>

              <motion.a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl glass border border-white/10 text-white/70 hover:text-white font-semibold text-sm hover:bg-white/[0.06] transition-all duration-200"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail size={16} />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right: Animated illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex items-center justify-center h-[500px]"
          >
            <AnimatedIllustration />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
      >
        <span className="text-xs font-mono">scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  )
}
