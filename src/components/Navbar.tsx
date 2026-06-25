import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { isMobileViewport } from '../lib/mobile'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Journey', href: '#journey' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

const sectionIds = navLinks.map((link) => link.href.slice(1))

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState(sectionIds[0])
  const navRef = useRef<HTMLElement>(null)
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map())

  const updateActiveSection = useCallback(() => {
    const navHeight = navRef.current?.offsetHeight ?? 64
    const scrollPosition = window.scrollY + navHeight + window.innerHeight * 0.25

    let current = sectionIds[0]
    for (const id of sectionIds) {
      const section = document.getElementById(id)
      if (section && section.offsetTop <= scrollPosition) {
        current = id
      }
    }
    setActiveSection(current)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      updateActiveSection()
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [updateActiveSection])

  useEffect(() => {
    const observer = new IntersectionObserver(
      () => updateActiveSection(),
      { rootMargin: '-20% 0px -55% 0px', threshold: 0 }
    )

    const observed = new WeakSet<Element>()
    const observeSections = () => {
      sectionIds.forEach((id) => {
        const section = document.getElementById(id)
        if (section && !observed.has(section)) {
          observer.observe(section)
          observed.add(section)
        }
      })
    }

    observeSections()
    const mutationObserver = new MutationObserver(observeSections)
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [updateActiveSection])

  useEffect(() => {
    const activeLink = linkRefs.current.get(activeSection)
    activeLink?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [activeSection])

  const handleNav = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      initial={isMobileViewport() ? false : { y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: isMobileViewport() ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#070707]/80 backdrop-blur-xl border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-2 md:px-8">
        <div className="flex items-center justify-between h-12 md:h-16 gap-2">
          <nav
            ref={navRef}
            className="flex flex-1 min-w-0 items-center overflow-x-auto scrollbar-none gap-0.5 md:gap-1 md:justify-between"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => {
              const id = link.href.slice(1)
              const isActive = activeSection === id

              return (
                <motion.a
                  key={link.href}
                  ref={(el) => {
                    if (el) linkRefs.current.set(id, el)
                    else linkRefs.current.delete(id)
                  }}
                  href={link.href}
                  data-nav-link={id}
                  onClick={(e) => { e.preventDefault(); handleNav(link.href) }}
                  className={`relative shrink-0 px-1.5 md:px-4 py-1.5 md:py-2 text-[11px] md:text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isActive ? 'text-white' : 'text-white/50 hover:text-white/90'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/[0.06] rounded-lg border border-white/[0.08]"
                      transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </motion.a>
              )
            })}

          </nav>

          <motion.a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNav('#contact') }}
            className="shrink-0 px-2.5 md:px-4 py-1.5 md:py-2 text-[11px] md:text-sm font-medium rounded-lg bg-blue-500 text-white hover:bg-blue-400 transition-colors duration-200 shadow-lg shadow-blue-500/20"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
          >
            Let's Talk
          </motion.a>
        </div>
      </div>
    </motion.header>
  )
}
