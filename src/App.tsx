import { lazy, Suspense, useEffect, useState } from 'react'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CursorGlow from './components/CursorGlow'
import ScrollProgress from './components/ScrollProgress'
import { useMobileViewport } from './lib/mobile'

const CommandPalette = lazy(() => import('./components/CommandPalette'))

export default function App() {
  const [loading, setLoading] = useState(true)
  const isMobile = useMobileViewport()
  const [showPalette, setShowPalette] = useState(false)

  useEffect(() => {
    setShowPalette(true)
  }, [])

  useEffect(() => {
    if (!loading) return

    const prev = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    }
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = '0'
    document.body.style.width = '100%'

    return () => {
      document.body.style.overflow = prev.overflow
      document.body.style.position = prev.position
      document.body.style.top = prev.top
      document.body.style.width = prev.width
    }
  }, [loading])

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      {!loading && <ScrollProgress />}

      <Navbar />

      <div className="min-h-screen bg-[#070707] text-white relative">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-blue-500 focus:text-white focus:font-medium focus:text-sm"
        >
          Skip to main content
        </a>
        {!loading && !isMobile && <CursorGlow />}
        {showPalette && !loading && (
          <Suspense fallback={null}>
            <CommandPalette />
          </Suspense>
        )}
        <main id="main-content" className="pt-[var(--nav-height)]" aria-label="Dolev Atik portfolio sections">
          <Hero />
          <About />
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
