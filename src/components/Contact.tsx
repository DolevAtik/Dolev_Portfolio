import { useState } from 'react'
import { motion } from 'framer-motion'
import { personalInfo } from '../data/portfolio'
import { Mail, Send, Download, Phone } from 'lucide-react'
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from './SocialIcons'
import FadeIn from './FadeIn'

const contactLinks = [
  { icon: Phone,         label: 'Phone',    value: '050-923-7173',                href: 'tel:0509237173',               color: 'green'    },
  { icon: WhatsAppIcon,  label: 'WhatsApp', value: '050-923-7173',                href: 'https://wa.me/972509237173',   color: 'whatsapp' },
  { icon: Mail,          label: 'Email',    value: personalInfo.email,            href: `mailto:${personalInfo.email}`, color: 'blue'     },
  { icon: LinkedinIcon,  label: 'LinkedIn', value: 'linkedin.com/in/dolev-atik', href: personalInfo.linkedin,          color: 'cyan'     },
  { icon: GithubIcon,    label: 'GitHub',   value: 'github.com/Dolev-Atik',      href: personalInfo.github,            color: 'purple'   },
]

const colorClasses: Record<string, string> = {
  blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
  cyan: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
  purple: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
  green: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
  whatsapp: 'bg-green-500/10 border-green-500/20 text-green-400',
}

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setError(null)
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          name: formState.name,
          email: formState.email,
          message: formState.message,
          subject: `Portfolio contact from ${formState.name}`,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setSent(true)
      } else {
        setError('Something went wrong. Please email me directly.')
      }
    } catch {
      setError('Network error. Please email me directly.')
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-600/[0.03] to-transparent" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-600/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: heading + links */}
          <div className="mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none">
            <FadeIn>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-blue-400 uppercase tracking-widest">05 — Contact</span>
                <div className="flex-1 h-px bg-gradient-to-r from-blue-500/30 to-transparent" />
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 id="contact-heading" className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                <span className="text-white">Let's build</span>
                <br />
                <span className="text-gradient-blue">something together.</span>
              </h2>
              <p className="text-white/40 text-base mb-10 max-w-lg">
                Open to new opportunities, freelance projects, and interesting collaborations.
              </p>
            </FadeIn>
            <div className="flex gap-3 mb-3">
              {contactLinks.map((link, i) => {
                const Icon = link.icon
                return (
                  <div key={link.label} className="flex-1">
                    <motion.a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className={`flex items-center justify-center p-3 md:p-4 rounded-xl border ${colorClasses[link.color]}`}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon size={20} />
                    </motion.a>
                  </div>
                )
              })}
            </div>

            <FadeIn delay={0.5}>
              <motion.a
                href="/cv.pdf"
                download
                className="flex items-center justify-center gap-3 p-4 rounded-xl text-sm font-semibold text-white w-full"
                style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(168,85,247,0.1))', border: '1px solid rgba(59,130,246,0.2)' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download size={18} className="text-blue-400" />
                Download Resume / CV
              </motion.a>
            </FadeIn>
          </div>

          {/* Right: form */}
          <FadeIn delay={0.2}>
            <div
              className="p-8 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                    <Send size={28} className="text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Message sent!</h3>
                  <p className="text-white/40 text-sm">I'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="text-sm font-semibold text-white mb-6">Send a message</div>

                  <div>
                    <label htmlFor="name" className="block text-xs font-mono text-white/30 uppercase tracking-widest mb-2">Name</label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-white/20 outline-none transition-colors"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                      onFocus={(e) => { e.target.style.borderColor = 'rgba(59,130,246,0.4)' }}
                      onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.08)' }}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-mono text-white/30 uppercase tracking-widest mb-2">Email</label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-white/20 outline-none transition-colors"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                      onFocus={(e) => { e.target.style.borderColor = 'rgba(59,130,246,0.4)' }}
                      onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.08)' }}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-mono text-white/30 uppercase tracking-widest mb-2">Message</label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                      placeholder="Tell me about your project..."
                      className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-white/20 outline-none resize-none transition-colors"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                      onFocus={(e) => { e.target.style.borderColor = 'rgba(59,130,246,0.4)' }}
                      onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.08)' }}
                    />
                  </div>

                  {error && (
                    <p className="text-xs text-red-400 text-center -mt-1">{error}</p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={sending}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm text-white transition-all disabled:opacity-60"
                    style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)' }}
                    whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(59,130,246,0.3)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {sending ? (
                      <>
                        <motion.div
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
