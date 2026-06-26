import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ArrowRight, Code2, Briefcase, User, GraduationCap, Mail, FileDown, Terminal } from 'lucide-react'
import { GithubIcon } from './SocialIcons'

interface Command {
  id: string
  label: string
  description: string
  icon: React.ReactNode
  action: () => void
  category: string
  keywords: string[]
}

const EASTER_EGG_COMMANDS: Record<string, string> = {
  'sudo hire dolev': '🔓 Access Granted\n\nWelcome to the team.\nYou just made an excellent decision.',
  'whoami': '> Software Engineer\n> AI Developer\n> Backend Builder\n> DevOps Enthusiast\n> Problem Solver',
  'kubectl get jobs': 'NAME                    STATUS\ndream-job               Pending 👀\ncurrent-position        Running\nWeb4You                 Running',
  'ls -la skills/': 'drwxr-xr-x  python/\ndrwxr-xr-x  docker/\ndrwxr-xr-x  react/\ndrwxr-xr-x  kubernetes/\ndrwxr-xr-x  ai-ml/\n-rw-r--r--  coffee.txt (critical)',
  'cat /etc/motd': 'Welcome to Dolev\'s Portfolio v2.0\nBuilt with React + TypeScript + Framer Motion\nAll systems operational ✓',
  'ping dolev': 'PING dolev.dev: 64 bytes\nReply from dolev: time=1ms ttl=64\nPacket loss: 0%\nConclusion: He\'s very responsive.',
  'git log --oneline': 'a3f2b1c Ship AI SOC Analyst to production\n7e8d9f0 Add RAG pipeline with ChromaDB\n2c4a1b3 Kubernetes deployment configured\n9f1e2d7 Launch MentConnect platform\n4b8c3a1 Co-found Web4You agency',
}

function scrollTo(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
}

function getCommands(): Command[] {
  return [
    { id: 'projects', label: 'View Projects', description: 'AI SOC Analyst, MentConnect & more', icon: <Code2 size={16} />, action: () => scrollTo('#projects'), category: 'Navigate', keywords: ['projects', 'work', 'portfolio'] },
    { id: 'about', label: 'About Dolev', description: 'CS student, Co-Founder of Web4You', icon: <User size={16} />, action: () => scrollTo('#about'), category: 'Navigate', keywords: ['about', 'bio', 'me'] },
    { id: 'journey', label: 'Journey', description: 'Web4You — Co-Founder & Developer', icon: <Briefcase size={16} />, action: () => scrollTo('#journey'), category: 'Navigate', keywords: ['journey', 'experience', 'job', 'work'] },
    { id: 'skills', label: 'Skills & Stack', description: 'Python, Docker, React, K8s, AI/LLMs', icon: <Terminal size={16} />, action: () => scrollTo('#skills'), category: 'Navigate', keywords: ['skills', 'tech', 'stack', 'languages'] },
    { id: 'education', label: 'Education', description: 'CS Degree, GPA 93 + DevOps Training', icon: <GraduationCap size={16} />, action: () => scrollTo('#education'), category: 'Navigate', keywords: ['education', 'degree', 'university', 'gpa'] },
    { id: 'contact', label: 'Contact', description: 'dolev5454@gmail.com', icon: <Mail size={16} />, action: () => scrollTo('#contact'), category: 'Navigate', keywords: ['contact', 'email', 'hire', 'reach'] },
    { id: 'github', label: 'GitHub Profile', description: 'github.com/Dolev-Atik', icon: <GithubIcon size={16} />, action: () => window.open('https://github.com/Dolev-Atik', '_blank'), category: 'Links', keywords: ['github', 'code', 'repos'] },
    { id: 'resume', label: 'Download Resume', description: 'Download PDF resume', icon: <FileDown size={16} />, action: () => { const a = document.createElement('a'); a.href = '/cv.pdf'; a.download = 'Dolev_Atik_CV.pdf'; a.click() }, category: 'Links', keywords: ['resume', 'cv', 'download', 'pdf'] },
    { id: 'email', label: 'Send Email', description: 'dolev5454@gmail.com', icon: <Mail size={16} />, action: () => window.location.href = 'mailto:dolev5454@gmail.com', category: 'Links', keywords: ['email', 'mail', 'contact'] },
  ]
}

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/.test(navigator.platform)
const shortcutLabel = isMac ? '⌘K' : 'Ctrl+K'

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const [easterResult, setEasterResult] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const commands = getCommands()

  const filtered = query.trim()
    ? commands.filter(c =>
        c.label.toLowerCase().includes(query.toLowerCase()) ||
        c.description.toLowerCase().includes(query.toLowerCase()) ||
        c.keywords.some(k => k.includes(query.toLowerCase()))
      )
    : commands

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
        setQuery('')
        setEasterResult(null)
      }
      if (e.key === 'Escape') {
        setOpen(false)
        setEasterResult(null)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50)
    else { setQuery(''); setSelected(0); setEasterResult(null) }
  }, [open])

  useEffect(() => { setSelected(0) }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, filtered.length - 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)) }
    if (e.key === 'Enter') {
      e.preventDefault()
      // Check easter eggs first
      const easterKey = Object.keys(EASTER_EGG_COMMANDS).find(k => query.trim().toLowerCase() === k)
      if (easterKey) {
        setEasterResult(EASTER_EGG_COMMANDS[easterKey])
        return
      }
      if (filtered[selected]) {
        filtered[selected].action()
        setOpen(false)
      }
    }
  }

  const categoryGroups = filtered.reduce<Record<string, Command[]>>((acc, cmd) => {
    acc[cmd.category] = [...(acc[cmd.category] || []), cmd]
    return acc
  }, {})

  return (
    <>
      {/* Trigger hint */}
      <button
        type="button"
        aria-label="Open command palette"
        className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2 px-3 py-2 min-h-[44px] rounded-lg glass border border-white/[0.08] text-xs text-white/45 cursor-pointer hover:text-white/70 transition-colors"
        onClick={() => setOpen(true)}
      >
        <span className="font-mono">{shortcutLabel}</span>
        <span>Command</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 bg-black/60 backdrop-blur-md"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: -10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/10"
              style={{ background: '#0d0d10', border: '1px solid rgba(255,255,255,0.07)' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06]">
                <Search size={16} className="text-white/30 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setEasterResult(null) }}
                  onKeyDown={handleKeyDown}
                  placeholder="Search or type a command..."
                  className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-white/40 font-mono"
                />
                <kbd className="px-2 py-0.5 rounded text-xs font-mono text-white/40 border border-white/[0.08]">ESC</kbd>
              </div>

              {/* Easter egg result */}
              <AnimatePresence>
                {easterResult && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-b border-white/[0.06]"
                  >
                    <div className="p-4 font-mono text-xs text-emerald-400 whitespace-pre-line leading-relaxed"
                      style={{ background: 'rgba(16,185,129,0.03)' }}>
                      {easterResult}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Results */}
              <div className="max-h-80 overflow-y-auto py-2">
                {filtered.length === 0 && !easterResult ? (
                  <div className="px-4 py-8 text-center text-sm text-white/45 font-mono">
                    No results for "{query}"
                    <div className="text-xs mt-2 text-white/35">try: sudo hire dolev</div>
                  </div>
                ) : (
                  Object.entries(categoryGroups).map(([cat, cmds]) => (
                    <div key={cat}>
                      <div className="px-4 py-1.5 text-xs font-mono text-white/40 uppercase tracking-widest">{cat}</div>
                      {cmds.map((cmd) => {
                        const globalIdx = filtered.indexOf(cmd)
                        return (
                          <motion.button
                            key={cmd.id}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors"
                            style={globalIdx === selected ? { background: 'rgba(59,130,246,0.08)' } : {}}
                            onMouseEnter={() => setSelected(globalIdx)}
                            onClick={() => { cmd.action(); setOpen(false) }}
                          >
                            <span className={globalIdx === selected ? 'text-blue-400' : 'text-white/30'}>
                              {cmd.icon}
                            </span>
                            <div className="flex-1 min-w-0">
                              <div className={`text-sm font-medium truncate ${globalIdx === selected ? 'text-white' : 'text-white/70'}`}>
                                {cmd.label}
                              </div>
                              <div className="text-xs text-white/30 truncate">{cmd.description}</div>
                            </div>
                            {globalIdx === selected && <ArrowRight size={14} className="text-blue-400 flex-shrink-0" />}
                          </motion.button>
                        )
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer hint */}
              <div className="px-4 py-2.5 border-t border-white/[0.04] flex items-center justify-between">
                <span className="text-xs text-white/40 font-mono">
                  Try: sudo hire dolev
                </span>
                <div className="flex items-center gap-3 text-xs text-white/40">
                  <span><kbd className="font-mono">↑↓</kbd> navigate</span>
                  <span><kbd className="font-mono">↵</kbd> select</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
