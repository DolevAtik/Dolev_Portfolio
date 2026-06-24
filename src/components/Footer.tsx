import { motion } from 'framer-motion'
import { Mail, Heart } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './SocialIcons'
import { personalInfo } from '../data/portfolio'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/[0.04] py-12 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-blue-600/5 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="Dolev Atik"
              className="h-8 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-200"
            />
          </div>

          {/* Center: copyright */}
          <p className="text-xs text-white/25 flex items-center gap-1.5">
            © {year} Dolev Atik. Built with{' '}
            <Heart size={11} className="text-blue-400 fill-blue-400" />
            {' '}React, TypeScript & Framer Motion.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-2">
            {[
              { icon: GithubIcon, href: personalInfo.github, label: 'GitHub' },
              { icon: LinkedinIcon, href: personalInfo.linkedin, label: 'LinkedIn' },
              { icon: Mail, href: `mailto:${personalInfo.email}`, label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2 rounded-lg text-white/30 hover:text-white hover:bg-white/[0.05] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={15} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
