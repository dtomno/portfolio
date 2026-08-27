import { useLenis } from './hooks/useLenis'
import { useTheme } from './hooks/useTheme'
import { useActiveSection } from './hooks/useActiveSection'
import { Cursor } from './components/Cursor'
import { Nav } from './components/Nav'
import { SideRail } from './components/SideRail'
import { Hero } from './components/Hero'
import { Ticker } from './components/Ticker'
import { About } from './components/About'
import { Work } from './components/Work'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { SECTIONS } from './data/content'

const SECTION_IDS = SECTIONS.map((s) => s.id)

export default function App() {
  useLenis()
  const { theme, toggle } = useTheme()
  const active = useActiveSection(SECTION_IDS)

  return (
    <>
      <Cursor />
      <Nav theme={theme} toggleTheme={toggle} active={active} />
      <SideRail active={active} />

      <main>
        <Hero theme={theme} />
        <Ticker />
        <About />
        <Work />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
