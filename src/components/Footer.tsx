import { motion } from 'framer-motion'
import { Mail, Heart, ArrowUp, MapPin } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './SocialIcons'
import { personalInfo } from '../data/portfolio'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Tech Stack', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

const socials = [
  { icon: GithubIcon, href: personalInfo.github, label: 'GitHub' },
  { icon: LinkedinIcon, href: personalInfo.linkedin, label: 'LinkedIn' },
  { icon: Mail, href: `mailto:${personalInfo.email}`, label: 'Email' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  const handleNav = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-white/[0.06] overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-blue-600/[0.07] rounded-full blur-[100px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <img
              src="/logo.png"
              alt="Dolev Atik"
              className="h-9 w-auto object-contain self-start opacity-90"
            />
            <p className="text-sm leading-relaxed text-white/45 max-w-sm">
              Software, AI & DevOps engineer building production-ready systems —
              from intelligent applications to cloud-native infrastructure.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-white/35">
              <MapPin size={13} className="text-blue-400/70" />
              {personalInfo.location} · Available for opportunities
            </div>
          </div>

          {/* Navigate */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/35">
              Navigate
            </h3>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNav(link.href) }}
                    className="group inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-200"
                  >
                    <span className="h-px w-0 group-hover:w-4 bg-blue-400 transition-all duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/35">
              Let's Connect
            </h3>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-sm text-white/60 hover:text-blue-300 transition-colors duration-200 w-fit"
            >
              {personalInfo.email}
            </a>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-white/[0.07] bg-white/[0.02] text-white/50 hover:text-white hover:border-blue-400/40 hover:bg-blue-500/10 transition-all duration-200"
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40 flex items-center gap-1.5 order-2 sm:order-1">
            © {year} Dolev Atik. Built with
            <Heart size={11} className="text-blue-400 fill-blue-400" />
            React, TypeScript & Framer Motion.
          </p>

          <motion.button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="order-1 sm:order-2 group inline-flex items-center gap-2 text-xs font-medium text-white/45 hover:text-white transition-colors duration-200"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Back to top
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-white/[0.08] bg-white/[0.02] group-hover:border-blue-400/40 group-hover:bg-blue-500/10 transition-all duration-200">
              <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform duration-200" />
            </span>
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
