import { lazy, Suspense, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import JourneyMobile from './components/JourneyMobile'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CursorGlow from './components/CursorGlow'
import { isMobileViewport } from './lib/mobile'
import { SiteReadyContext, REVEAL_EASE, REVEAL_DURATION } from './context/SiteReadyContext'

const JourneyDesktop = lazy(() => import('./components/JourneyDesktop'))
const CommandPalette = lazy(() => import('./components/CommandPalette'))

function Journey() {
  if (isMobileViewport()) return <JourneyMobile />
  return (
    <Suspense fallback={null}>
      <JourneyDesktop />
    </Suspense>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const [revealed, setRevealed] = useState(false)
  const [showPalette, setShowPalette] = useState(() => !isMobileViewport())

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])

  useEffect(() => {
    if (!loading) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [loading])

  useEffect(() => {
    if (showPalette) return
    const id = window.setTimeout(() => setShowPalette(true), 800)
    return () => window.clearTimeout(id)
  }, [showPalette])

  return (
    <SiteReadyContext.Provider value={revealed}>
      {loading && (
        <Loader
          onExitStart={() => setRevealed(true)}
          onComplete={() => setLoading(false)}
        />
      )}

      <motion.div
        initial={false}
        animate={{
          opacity: revealed ? 1 : 0,
          scale: revealed ? 1 : 1.04,
          filter: revealed ? 'blur(0px)' : 'blur(14px)',
        }}
        transition={{
          duration: REVEAL_DURATION,
          ease: REVEAL_EASE,
          opacity: { duration: REVEAL_DURATION * 0.9, delay: 0.06 },
          scale: { duration: REVEAL_DURATION, delay: 0.04 },
          filter: { duration: REVEAL_DURATION * 0.75, delay: 0.02 },
        }}
        className="min-h-screen bg-[#070707] text-white relative origin-center"
        style={{ willChange: revealed ? 'auto' : 'opacity, transform, filter' }}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-blue-500 focus:text-white focus:font-medium focus:text-sm"
        >
          Skip to main content
        </a>
        {revealed && !isMobileViewport() && <CursorGlow />}
        {showPalette && revealed && (
          <Suspense fallback={null}>
            <CommandPalette />
          </Suspense>
        )}
        <Navbar />
        <main id="main-content" aria-label="Dolev Atik portfolio sections">
          <Hero />
          <About />
          <Journey />
          <Projects />
          <Skills />
          <Education />
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </SiteReadyContext.Provider>
  )
}
