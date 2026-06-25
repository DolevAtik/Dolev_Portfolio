import { lazy, Suspense, useEffect, useState } from 'react'
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
import { useMobileViewport } from './lib/mobile'

const JourneyDesktop = lazy(() => import('./components/JourneyDesktop'))
const CommandPalette = lazy(() => import('./components/CommandPalette'))

function Journey() {
  const isMobile = useMobileViewport()
  if (isMobile) return <JourneyMobile />
  return (
    <Suspense fallback={null}>
      <JourneyDesktop />
    </Suspense>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const isMobile = useMobileViewport()
  const [showPalette, setShowPalette] = useState(false)

  useEffect(() => {
    if (!isMobile) {
      setShowPalette(true)
      return
    }
    const id = window.setTimeout(() => setShowPalette(true), 800)
    return () => window.clearTimeout(id)
  }, [isMobile])

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])

  useEffect(() => {
    if (!loading) return

    const prevBody = document.body.style.overflow
    const prevHtml = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = prevBody
      document.documentElement.style.overflow = prevHtml
    }
  }, [loading])

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}

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
