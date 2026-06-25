import { lazy, Suspense } from 'react'
import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
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
  const [showPalette, setShowPalette] = useState(() => !isMobileViewport())

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])

  useEffect(() => {
    if (showPalette) return
    const id = window.setTimeout(() => setShowPalette(true), 800)
    return () => window.clearTimeout(id)
  }, [showPalette])

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div className="min-h-screen bg-[#070707] text-white relative">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-blue-500 focus:text-white focus:font-medium focus:text-sm"
        >
          Skip to main content
        </a>
        {!isMobileViewport() && <CursorGlow />}
        {showPalette && (
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
      </div>
    </>
  )
}
