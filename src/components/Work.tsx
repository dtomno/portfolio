import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Reveal } from './Reveal'
import { ProjectRow } from './ProjectRow'
import { Lightbox } from './Lightbox'
import { PROJECTS } from '../data/content'

export function Work() {
  const [gallery, setGallery] = useState<{ images: string[]; title: string } | null>(null)

  return (
    <section id="work" className="scroll-mt-24 mb-5 mt-20">
      <div className="shell">
        <Reveal>
          <p className="eyebrow mb-4 text-base">/ 02 — Selected work</p>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-tight tracking-tight">
              Things I&apos;ve <span className="text-signal">built</span> &amp; shipped
            </h2>
            <p className="max-w-xs font-mono text-xs uppercase leading-relaxed tracking-wider text-bone/45 [html:not(.dark)_&]:text-ink/45">
              {PROJECTS.length} projects · click any preview for the full gallery
            </p>
          </div>
        </Reveal>

        <div className="mt-6 divide-y divide-ink-line/60 [html:not(.dark)_&]:divide-bone-line/70">
          {PROJECTS.map((p, i) => (
            <ProjectRow
              key={p.id}
              project={p}
              reversed={i % 2 === 1}
              onOpen={(images, title) => setGallery({ images, title })}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {gallery && (
          <Lightbox
            images={gallery.images}
            title={gallery.title}
            onClose={() => setGallery(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
