import { motion, useScroll, useSpring } from 'framer-motion'
import { scrollToId } from '../hooks/useLenis'
import { SECTIONS } from '../data/content'

export function SideRail({ active }: { active: string }) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  return (
    <>
      {/* top progress bar */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-signal"
        style={{ scaleX }}
      />

      {/* vertical section rail (desktop) */}
      <nav className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-4 lg:flex">
        {SECTIONS.map((s) => {
          const on = active === s.id
          return (
            <button
              key={s.id}
              onClick={() => scrollToId(s.id)}
              className="group flex items-center gap-3"
              aria-label={`Go to ${s.label}`}
            >
              <span
                className={`h-px transition-all duration-300 ${
                  on ? 'w-8 bg-signal' : 'w-4 bg-bone/30 group-hover:w-6 group-hover:bg-bone/60 [html:not(.dark)_&]:bg-ink/25'
                }`}
              />
              <span
                className={`font-mono text-[12px] uppercase tracking-[0.2em] transition-all duration-300 ${
                  on
                    ? 'text-signal opacity-100'
                    : 'text-bone/40 opacity-0 group-hover:opacity-100 [html:not(.dark)_&]:text-ink/40'
                }`}
              >
                {s.label}
              </span>
            </button>
          )
        })}
      </nav>
    </>
  )
}
