import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const TIMING = {
  total: 3800,
  steps: [0, 220, 440, 660, 880, 1100, 1300],
  progressComplete: 2600,
  launchDone: 2600,
} as const

const BOOT_STEPS = [
  { cmd: 'initializing portfolio...', status: null },
  { cmd: 'loading dependencies', status: 'done' },
  { cmd: 'connecting to docker', status: 'done' },
  { cmd: 'starting kubernetes cluster', status: 'done' },
  { cmd: 'initializing AI engine', status: 'done' },
  { cmd: 'compiling projects...', status: 'done' },
  { cmd: 'launching portfolio', status: null },
] as const

const EASE = [0.16, 1, 0.3, 1] as const

function progressAt(elapsed: number): number {
  const launchAt = TIMING.steps[TIMING.steps.length - 1]

  if (elapsed <= launchAt) {
    return (elapsed / launchAt) * 85
  }
  if (elapsed <= TIMING.progressComplete) {
    const t = (elapsed - launchAt) / (TIMING.progressComplete - launchAt)
    return 85 + t * 15
  }
  return 100
}

const FADE_MS = 550

interface LoaderProps {
  onComplete: () => void
}

export default function Loader({ onComplete }: LoaderProps) {
  const [visibleSteps, setVisibleSteps] = useState(0)
  const [progress, setProgress] = useState(0)
  const [launchDone, setLaunchDone] = useState(false)
  const [exiting, setExiting] = useState(false)
  const onCompleteRef = useRef(onComplete)
  const finishedRef = useRef(false)
  onCompleteRef.current = onComplete

  const finish = () => {
    if (finishedRef.current) return
    finishedRef.current = true
    onCompleteRef.current()
  }

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = []
    let raf = 0
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      setProgress(Math.round(progressAt(elapsed)))

      if (elapsed < TIMING.total) {
        raf = requestAnimationFrame(tick)
      }
    }

    raf = requestAnimationFrame(tick)

    TIMING.steps.forEach((delay, i) => {
      timeouts.push(window.setTimeout(() => setVisibleSteps(i + 1), delay))
    })

    timeouts.push(window.setTimeout(() => setLaunchDone(true), TIMING.launchDone))
    timeouts.push(window.setTimeout(() => setExiting(true), TIMING.total))
    timeouts.push(window.setTimeout(finish, TIMING.total + FADE_MS + 80))

    return () => {
      cancelAnimationFrame(raf)
      timeouts.forEach(window.clearTimeout)
    }
  }, [])

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${exiting ? 'opacity-0' : 'opacity-100'}`}
      onTransitionEnd={(e) => {
        if (exiting && e.target === e.currentTarget && e.propertyName === 'opacity') finish()
      }}
    >
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 grid-bg opacity-30" />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 42%, rgba(59,130,246,0.18) 0%, rgba(6,182,212,0.06) 28%, transparent 62%)',
        }}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
      />

      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(59,130,246,0.08) 0%, rgba(168,85,247,0.04) 50%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.45, 0.75, 0.45] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 w-full max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="mb-4 text-center"
        >
          <img
            src="/logo.png"
            alt="Dolev Atik"
            className="w-72 h-72 mx-auto object-contain mix-blend-screen drop-shadow-lg drop-shadow-blue-500/30"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08, ease: EASE }}
          className="rounded-2xl overflow-hidden border border-white/[0.06] shadow-2xl shadow-blue-500/5"
          style={{ background: 'rgba(10,10,12,0.95)' }}
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.04]">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="ml-3 text-xs font-mono text-white/20">portfolio.sh</span>
          </div>

          <div className="p-6 space-y-2 min-h-[180px]">
            <div className="text-xs font-mono text-white/20 mb-4">
              bash-5.2$ ./launch-portfolio.sh
            </div>

            {BOOT_STEPS.slice(0, visibleSteps).map((step, i) => {
              const isLaunchStep = i === BOOT_STEPS.length - 1
              const isDone =
                step.status === 'done' ||
                (i === 0 && visibleSteps > 1) ||
                (isLaunchStep && launchDone)
              const isActive =
                i === visibleSteps - 1 && !isDone && step.status === null

              return (
                <div
                  key={step.cmd}
                  className="flex items-center gap-3 text-xs font-mono loader-step-in"
                >
                  <span
                    className={
                      isDone
                        ? 'text-emerald-400'
                        : isActive
                          ? 'text-blue-400'
                          : 'text-white/20'
                    }
                  >
                    {isDone ? '✓' : isActive ? '▸' : '·'}
                  </span>
                  <span className={isDone ? 'text-white/60' : 'text-white/90'}>{step.cmd}</span>
                  {isDone && <span className="ml-auto text-emerald-400/50">done</span>}
                  {isActive && (
                    <span className="ml-1 w-1.5 h-3 bg-blue-400 animate-blink inline-block" />
                  )}
                </div>
              )
            })}
          </div>
        </motion.div>

        <div className="mt-6">
          <div className="flex justify-between text-xs font-mono text-white/20 mb-2">
            <span>{launchDone ? 'ready' : 'loading'}</span>
            <span>{progress}%</span>
          </div>
          <div className="h-px bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-[width] duration-300 ease-out"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #3b82f6, #06b6d4, #a855f7)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
