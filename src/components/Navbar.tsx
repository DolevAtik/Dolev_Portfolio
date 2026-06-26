import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Tech Stack', href: '#skills' },
  { label: 'Education', href: '#education' },
]

const sectionIds = navLinks.map((link) => link.href.slice(1))

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState(sectionIds[0])
  const headerRef = useRef<HTMLElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map())

  const updateActiveSection = useCallback(() => {
    const navHeight = headerRef.current?.offsetHeight ?? 64
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
    const nav = navRef.current
    const activeLink = linkRefs.current.get(activeSection)
    if (!nav || !activeLink || nav.scrollWidth <= nav.clientWidth) return

    const linkLeft = activeLink.offsetLeft
    const linkWidth = activeLink.offsetWidth
    const targetLeft = linkLeft - nav.clientWidth / 2 + linkWidth / 2

    nav.scrollTo({ left: targetLeft, behavior: 'smooth' })
  }, [activeSection])

  const handleNav = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-[100] bg-[#070707] transition-shadow duration-500 border-b border-white/[0.06] pt-[env(safe-area-inset-top,0px)] ${
        scrolled ? 'shadow-[0_8px_32px_rgba(0,0,0,0.45)]' : ''
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-2 md:px-8">
        <div className="flex items-center justify-between h-12 md:h-16 gap-2">
          <nav
            ref={navRef}
            className="flex flex-1 min-w-0 items-center justify-center gap-0 md:gap-2"
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
                  className={`relative shrink-0 px-1.5 md:px-4 py-2 text-[10px] md:text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isActive ? 'text-white' : 'text-white/50 hover:text-white/90'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/[0.06] rounded-lg border border-white/[0.08] pointer-events-none"
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
            className="shrink-0 px-2 md:px-4 py-1.5 md:py-2 text-[10px] md:text-sm font-medium rounded-lg bg-blue-500 text-white hover:bg-blue-400 transition-colors duration-200 shadow-lg shadow-blue-500/20"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
          >
            Let's Talk
          </motion.a>
        </div>
      </div>
    </header>
  )
}
