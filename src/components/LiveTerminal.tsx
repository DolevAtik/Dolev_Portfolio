import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'

interface TerminalLine {
  type: 'cmd' | 'output' | 'success' | 'error' | 'info' | 'blank'
  text: string
}

const SEQUENCES: TerminalLine[][] = [
  [
    { type: 'cmd', text: 'git push origin main' },
    { type: 'info', text: 'Enumerating objects: 23, done.' },
    { type: 'info', text: 'Delta compression using up to 8 threads.' },
    { type: 'success', text: '✓ Deployment triggered successfully' },
    { type: 'success', text: '✓ Pipeline running on GitHub Actions' },
  ],
  [
    { type: 'cmd', text: 'docker compose up --build' },
    { type: 'info', text: 'Building image... [████████████] 100%' },
    { type: 'success', text: '✓ api          Running on port 5000' },
    { type: 'success', text: '✓ chromadb     Running on port 8000' },
    { type: 'success', text: '✓ mongodb      Running on port 27017' },
  ],
  [
    { type: 'cmd', text: 'kubectl get pods -n production' },
    { type: 'blank', text: '' },
    { type: 'info', text: 'NAME                    READY   STATUS    AGE' },
    { type: 'output', text: 'api-deploy-7d4b9f       1/1     Running   2d' },
    { type: 'output', text: 'ai-worker-6c8f2e        1/1     Running   2d' },
    { type: 'output', text: 'ingress-nginx-abc12     1/1     Running   7d' },
  ],
  [
    { type: 'cmd', text: 'python rag_pipeline.py --query "CVE analysis"' },
    { type: 'info', text: 'Loading vector store from ChromaDB...' },
    { type: 'info', text: 'Retrieving context [████████] 8 chunks' },
    { type: 'info', text: 'Sending to Ollama (llama3)...' },
    { type: 'success', text: '✓ Analysis complete. Threats: 2 found' },
    { type: 'success', text: '✓ Remediation recommendations generated' },
  ],
  [
    { type: 'cmd', text: 'npm run build && npm run deploy' },
    { type: 'info', text: 'Vite v8.1.0 building for production...' },
    { type: 'info', text: '330 modules transformed.' },
    { type: 'success', text: '✓ Built in 296ms' },
    { type: 'success', text: '✓ Deployed to production — live in 3s' },
  ],
  [
    { type: 'cmd', text: 'gh workflow run ci.yml --ref main' },
    { type: 'info', text: '▸ lint        passed  (8s)' },
    { type: 'info', text: '▸ test        passed  (23s)' },
    { type: 'info', text: '▸ build       passed  (41s)' },
    { type: 'success', text: '✓ All checks passed — merging to main' },
  ],
]

const CHAR_SPEED = 35
const LINE_DELAY = 200
const SEQUENCE_PAUSE = 2500

export default function LiveTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([])
  const [typingLine, setTypingLine] = useState('')
  const [seqIdx, setSeqIdx] = useState(0)
  const [lineIdx, setLineIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [phase, setPhase] = useState<'typing' | 'displaying' | 'pause'>('typing')
  const bottomRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef(null)
  const inView = useInView(containerRef, { once: false, margin: '-100px' })
  const activeRef = useRef(true)

  const advance = useCallback(() => {
    if (!activeRef.current) return
    const seq = SEQUENCES[seqIdx]
    const curLine = seq[lineIdx]

    if (phase === 'typing') {
      if (curLine.type === 'cmd') {
        if (charIdx < curLine.text.length) {
          setTypingLine(curLine.text.slice(0, charIdx + 1))
          setTimeout(advance, CHAR_SPEED)
          setCharIdx(c => c + 1)
        } else {
          // Done typing command — add it as a line
          setLines(prev => [...prev.slice(-12), { ...curLine }])
          setTypingLine('')
          setPhase('displaying')
          setLineIdx(l => l + 1)
          setCharIdx(0)
          setTimeout(advance, LINE_DELAY)
        }
      } else {
        // Non-command line, just display instantly
        setPhase('displaying')
      }
    } else if (phase === 'displaying') {
      const remaining = seq.slice(lineIdx)
      if (remaining.length === 0) {
        // Sequence done
        setPhase('pause')
        setTimeout(() => {
          if (!activeRef.current) return
          setLines([])
          setTypingLine('')
          setSeqIdx(i => (i + 1) % SEQUENCES.length)
          setLineIdx(0)
          setCharIdx(0)
          setPhase('typing')
          setTimeout(advance, 300)
        }, SEQUENCE_PAUSE)
      } else {
        const next = remaining[0]
        setTimeout(() => {
          if (!activeRef.current) return
          if (next.type === 'blank') {
            setLines(prev => [...prev.slice(-12), next])
            setLineIdx(l => l + 1)
            setTimeout(advance, LINE_DELAY)
          } else if (next.type === 'cmd') {
            setPhase('typing')
            setTimeout(advance, 300)
          } else {
            setLines(prev => [...prev.slice(-12), next])
            setLineIdx(l => l + 1)
            setTimeout(advance, LINE_DELAY + 50)
          }
        }, LINE_DELAY)
      }
    }
  }, [seqIdx, lineIdx, charIdx, phase])

  useEffect(() => {
    if (!inView) return
    activeRef.current = true
    const t = setTimeout(advance, 400)
    return () => { activeRef.current = false; clearTimeout(t) }
  }, [inView, advance])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines, typingLine])

  const colorFor = (type: TerminalLine['type']) => {
    switch (type) {
      case 'cmd': return 'text-white'
      case 'success': return 'text-emerald-400'
      case 'error': return 'text-red-400'
      case 'info': return 'text-white/50'
      case 'output': return 'text-blue-300/80'
      default: return ''
    }
  }

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
    >
      <div
        ref={containerRef}
        className="rounded-2xl overflow-hidden border border-white/[0.06] shadow-2xl shadow-blue-500/5"
        style={{ background: 'rgba(8,8,10,0.95)', backdropFilter: 'blur(20px)' }}
      >
        {/* Window chrome */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.04]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <span className="text-xs font-mono text-white/20">dolev@portfolio ~ zsh</span>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-mono text-emerald-400/60">live</span>
          </div>
        </div>

        {/* Terminal body */}
        <div className="p-5 h-52 overflow-hidden relative font-mono text-sm leading-relaxed">
          {/* Glow overlay */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.04), transparent 60%)' }} />

          <div className="relative z-10 space-y-0.5">
            {lines.map((line, i) => (
              <div key={i} className={`${colorFor(line.type)} text-xs`}>
                {line.type === 'cmd' && (
                  <span className="text-blue-400 mr-2">❯</span>
                )}
                {line.text}
              </div>
            ))}

            {/* Currently typing command */}
            {typingLine !== '' && (
              <div className="text-white text-xs">
                <span className="text-blue-400 mr-2">❯</span>
                {typingLine}
                <span className="inline-block w-1.5 h-3 bg-blue-400 ml-0.5 animate-blink align-middle" />
              </div>
            )}

            {/* Idle cursor when between sequences */}
            {typingLine === '' && lines.length === 0 && (
              <div className="text-white text-xs">
                <span className="text-blue-400 mr-2">❯</span>
                <span className="inline-block w-1.5 h-3 bg-blue-400 animate-blink align-middle" />
              </div>
            )}
          </div>
          <div ref={bottomRef} />
        </div>
      </div>
    </motion.div>
  )
}
