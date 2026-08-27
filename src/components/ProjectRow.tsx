import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion, useTransform } from 'framer-motion'
import { Reveal } from './Reveal'
import type { Project } from '../data/content'

type Props = {
  project: Project
  reversed?: boolean
  onOpen: (images: string[], title: string) => void
}

export function ProjectRow({ project, reversed, onOpen }: Props) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLButtonElement>(null)
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), { stiffness: 200, damping: 20 })
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-9, 9]), { stiffness: 200, damping: 20 })

  function onMove(e: React.PointerEvent) {
    if (reduced || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }
  function reset() {
    px.set(0)
    py.set(0)
  }

  return (
    <div className="grid items-center gap-8 py-14 md:grid-cols-12 md:gap-12 md:py-20">
      {/* Visual */}
      <Reveal
        y={40}
        className={`md:col-span-7 ${reversed ? 'md:order-2 md:col-start-6' : ''}`}
      >
        <button
          ref={ref}
          onPointerMove={onMove}
          onPointerLeave={reset}
          onPointerCancel={reset}
          onPointerUp={reset}
          onClick={() => onOpen(project.images, project.title)}
          data-cursor={`view ${project.images.length}`}
          className="group relative block w-full"
          style={{ perspective: 1000 }}
        >
          <motion.div
            style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
            className="relative overflow-hidden rounded-2xl border border-ink-line/70 bg-ink-card [html:not(.dark)_&]:border-bone-line [html:not(.dark)_&]:bg-bone-card"
          >
            <div className="aspect-[16/10] w-full overflow-hidden">
              <img
                src={project.images[0]}
                alt={project.title}
                loading="lazy"
                className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute bottom-4 left-4 flex translate-y-2 items-center gap-2 rounded-full bg-signal px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-widest text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              View gallery · {project.images.length}
            </div>
          </motion.div>
          <span
            className={`pointer-events-none absolute -top-9 font-display text-6xl font-bold tracking-tight text-transparent md:-top-12 md:text-8xl ${
              reversed ? 'right-0 md:-right-6' : 'left-0 md:-left-6'
            }`}
            style={{ WebkitTextStroke: '1.5px rgba(35,206,107,0.55)' }}
          >
            {project.index}
          </span>
        </button>
      </Reveal>

      {/* Text */}
      <Reveal
        delay={0.1}
        y={24}
        className={`md:col-span-5 ${reversed ? 'md:order-1 md:col-start-1 md:row-start-1' : ''}`}
      >
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-bone/45 [html:not(.dark)_&]:text-ink/45">
          <span>{project.year}</span>
          {project.status && (
            <span className="rounded-full border border-signal/40 px-2 py-0.5 text-signal">{project.status}</span>
          )}
        </div>
        <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight md:text-3xl">{project.title}</h3>
        <p className="mt-3 text-base leading-relaxed text-bone/75 [html:not(.dark)_&]:text-ink/70">
          {project.summary}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-bone/55 [html:not(.dark)_&]:text-ink/55">
          {project.description}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <li
              key={t}
              className="rounded-full border border-ink-line/80 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-bone/60 [html:not(.dark)_&]:border-bone-line [html:not(.dark)_&]:text-ink/60"
            >
              {t}
            </li>
          ))}
        </ul>

        {project.links.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-5">
            {project.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                data-cursor="open"
                className="link-underline inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.16em] text-bone hover:text-signal [html:not(.dark)_&]:text-ink"
              >
                {l.label} <span>↗</span>
              </a>
            ))}
          </div>
        )}
      </Reveal>
    </div>
  )
}
