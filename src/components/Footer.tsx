import { scrollToId } from '../hooks/useLenis'
import { PROFILE } from '../data/content'

export function Footer() {
  return (
    <footer className="border-t border-ink-line/70 py-10 [html:not(.dark)_&]:border-bone-line/70">
      <div className="shell flex flex-col items-center justify-between gap-4 font-mono text-sm uppercase tracking-[0.18em] text-bone/70 sm:flex-row [html:not(.dark)_&]:text-ink/45">
        <span>© {new Date().getFullYear()} {PROFILE.name}</span>
        <span className="hidden sm:block">Built with React · Vite · Framer Motion</span>
        <button onClick={() => scrollToId('home')} className="link-underline hover:text-signal">
          Back to top ↑
        </button>
      </div>
    </footer>
  )
}
