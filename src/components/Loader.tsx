import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BOOT_STEPS = [
  { cmd: 'initializing portfolio...', status: null, delay: 0 },
  { cmd: 'loading dependencies', status: 'done', delay: 300 },
  { cmd: 'connecting to docker', status: 'done', delay: 600 },
  { cmd: 'starting kubernetes cluster', status: 'done', delay: 900 },
  { cmd: 'initializing AI engine', status: 'done', delay: 1200 },
  { cmd: 'compiling projects...', status: 'done', delay: 1500 },
  { cmd: 'launching portfolio', status: null, delay: 1800 },
]

interface LoaderProps {
  onComplete: () => void
}

export default function Loader({ onComplete }: LoaderProps) {
  const [visibleSteps, setVisibleSteps] = useState<number>(0)
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    BOOT_STEPS.forEach((_, i) => {
      setTimeout(() => {
        setVisibleSteps(i + 1)
        setProgress(Math.round(((i + 1) / BOOT_STEPS.length) * 100))
      }, _.delay)
    })

    setTimeout(() => {
      setExiting(true)
      setTimeout(onComplete, 700)
    }, 2400)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#070707] overflow-hidden"
        >
          {/* Animated grid background */}
          <div className="absolute inset-0 grid-bg opacity-30" />

          {/* Glowing orb */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, rgba(168,85,247,0.04) 50%, transparent 70%)',
            }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="relative z-10 w-full max-w-lg px-6">
            {/* Logo mark */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 text-center"
            >
              <div className="inline-flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <span className="font-bold text-white text-lg font-mono">D</span>
                </div>
                <div>
                  <div className="font-bold text-white text-lg tracking-tight">Dolev Atik</div>
                  <div className="text-xs text-white/30 font-mono">Software Engineer</div>
                </div>
              </div>
            </motion.div>

            {/* Terminal window */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl overflow-hidden border border-white/[0.06] shadow-2xl shadow-blue-500/5"
              style={{ background: 'rgba(10,10,12,0.95)' }}
            >
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.04]">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-3 text-xs font-mono text-white/20">portfolio.sh</span>
              </div>

              {/* Terminal body */}
              <div className="p-6 space-y-2 min-h-[200px]">
                <div className="text-xs font-mono text-white/20 mb-4">
                  bash-5.2$ ./launch-portfolio.sh
                </div>

                {BOOT_STEPS.slice(0, visibleSteps).map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3 text-xs font-mono"
                  >
                    <span className={
                      step.status === 'done'
                        ? 'text-emerald-400'
                        : i === visibleSteps - 1
                        ? 'text-blue-400 animate-pulse'
                        : 'text-white/20'
                    }>
                      {step.status === 'done' ? '✓' : i === visibleSteps - 1 ? '▸' : '·'}
                    </span>
                    <span className={step.status === 'done' ? 'text-white/60' : 'text-white/90'}>
                      {step.cmd}
                    </span>
                    {step.status === 'done' && (
                      <span className="ml-auto text-emerald-400/50">done</span>
                    )}
                    {i === visibleSteps - 1 && step.status === null && (
                      <span className="ml-1 w-1.5 h-3 bg-blue-400 animate-blink inline-block" />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Progress bar */}
            <div className="mt-6">
              <div className="flex justify-between text-xs font-mono text-white/20 mb-2">
                <span>loading</span>
                <span>{progress}%</span>
              </div>
              <div className="h-px bg-white/[0.06] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #3b82f6, #06b6d4, #a855f7)' }}
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
