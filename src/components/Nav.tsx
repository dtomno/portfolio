import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Magnetic } from './Magnetic'
import { scrollToId, setScrollLock } from '../hooks/useLenis'
import { PROFILE, SECTIONS } from '../data/content'

export function Nav({
  theme,
  toggleTheme,
  active,
}: {
  theme: 'dark' | 'light'
  toggleTheme: () => void
  active: string
}) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setScrollLock(open)
    return () => setScrollLock(false)
  }, [open])

  function go(id: string) {
    setOpen(false)
    scrollToId(id)
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-ink-line/70 bg-ink/70 backdrop-blur-xl dark:border-ink-line/70 dark:bg-ink/70 [html:not(.dark)_&]:border-bone-line/70 [html:not(.dark)_&]:bg-bone/70'
            : 'border-b border-transparent'
        }`}
      >
        <nav className="shell flex h-[68px] items-center justify-between">
          <button
            onClick={() => go('home')}
            className="font-mono text-sm font-medium tracking-tight text-bone [html:not(.dark)_&]:text-ink"
            data-cursor="top"
          >
            <span className="text-signal text-base">&lt;</span>Dennis&nbsp;Tomno<span className="text-signal">/&gt;</span>
          </button>

          <div className="hidden items-center gap-1 md:flex">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => go(s.id)}
                className="group relative px-4 py-2 font-mono text-sm uppercase tracking-[0.2em] text-bone/90 transition-colors hover:text-bone [html:not(.dark)_&]:text-ink/60 [html:not(.dark)_&]:hover:text-ink"
              >
                {s.label}
                <span
                  className={`absolute inset-x-4 -bottom-0.5 h-px origin-left bg-signal transition-transform duration-300 ${
                    active === s.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle theme={theme} toggle={toggleTheme} />
            <Magnetic className="hidden sm:block">
              <a
                href={PROFILE.resume}
                target="_blank"
                rel="noreferrer"
                data-cursor="open"
                className="inline-flex items-center gap-2 rounded-full bg-signal px-5 py-2 font-mono text-xs font-medium uppercase tracking-[0.16em] text-white transition-[filter] hover:brightness-95"
              >
                Résumé
              </a>
            </Magnetic>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="relative h-9 w-9 md:hidden"
            >
              <span
                className={`absolute left-1.5 right-1.5 top-3 h-px bg-current transition-all ${
                  open ? 'translate-y-1.5 rotate-45' : ''
                }`}
              />
              <span
                className={`absolute left-1.5 right-1.5 bottom-3 h-px bg-current transition-all ${
                  open ? '-translate-y-1.5 -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center gap-2 bg-ink px-8 md:hidden [html:not(.dark)_&]:bg-bone"
            initial={reduced ? { opacity: 0 } : { clipPath: 'circle(0% at 90% 5%)' }}
            animate={reduced ? { opacity: 1 } : { clipPath: 'circle(150% at 90% 5%)' }}
            exit={reduced ? { opacity: 0 } : { clipPath: 'circle(0% at 90% 5%)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {SECTIONS.map((s, i) => (
              <motion.button
                key={s.id}
                onClick={() => go(s.id)}
                className="py-3 text-left font-display text-4xl font-semibold tracking-tight"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
              >
                <span className="mr-3 font-mono text-sm text-signal">0{i + 1}</span>
                {s.label}
              </motion.button>
            ))}
            <a
              href={PROFILE.resume}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex w-fit rounded-full bg-signal px-6 py-3 font-mono text-sm uppercase tracking-widest text-white"
            >
              Résumé
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function ThemeToggle({ theme, toggle }: { theme: 'dark' | 'light'; toggle: () => void }) {
  return (
    <button
      onClick={toggle}
      aria-label="Toggle color theme"
      data-cursor={theme === 'dark' ? 'light' : 'dark'}
      className="relative h-9 w-9 overflow-hidden rounded-full border border-ink-line text-bone [html:not(.dark)_&]:border-bone-line [html:not(.dark)_&]:text-ink"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 14, opacity: 0, rotate: -30 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 30 }}
          transition={{ duration: 0.28 }}
          className="absolute inset-0 flex items-center justify-center text-sm"
        >
          {theme === 'dark' ? '☾' : '☀'}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
