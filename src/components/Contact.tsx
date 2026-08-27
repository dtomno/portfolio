import { useState } from 'react'
import { Reveal } from './Reveal'
import { Magnetic } from './Magnetic'
import { PROFILE, SOCIALS } from '../data/content'

export function Contact() {
  const [copied, setCopied] = useState(false)

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(PROFILE.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* ignore */
    }
  }

  return (
    <section id="contact" className="shell scroll-mt-24 mb-5">
      <Reveal>
        <p className="eyebrow mb-6 text-base">/ 03 — Contact</p>
        <h2 className="font-display text-[clamp(2.4rem,7vw,5.5rem)] font-semibold leading-[1.02] tracking-tight">
          Looking to build
          <br />
          something <span className="text-signal">great</span>?
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-8 max-w-md text-lg leading-relaxed text-bone/70 [html:not(.dark)_&]:text-ink/70">
          I&apos;m open to roles, collaborations, and interesting problems. The fastest way to reach
          me is email.
        </p>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mt-12 flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${PROFILE.email}`}
              data-cursor="mail"
              className="group relative inline-block overflow-hidden rounded-2xl border border-ink-line/70 px-6 py-5 font-display text-[clamp(1.4rem,4vw,2.4rem)] font-semibold tracking-tight [html:not(.dark)_&]:border-bone-line"
            >
              <span className="absolute inset-0 -z-0 translate-y-full bg-signal transition-transform duration-500 ease-swift group-hover:translate-y-0" />
              <span className="relative z-10 transition-colors duration-300 group-hover:text-[#04140b]">
                {PROFILE.email}
              </span>
            </a>
            <button
              onClick={copyEmail}
              className="rounded-full border border-ink-line/70 px-4 py-2 font-mono text-xs uppercase tracking-wider text-bone/80 transition hover:border-signal hover:text-signal [html:not(.dark)_&]:border-bone-line [html:not(.dark)_&]:text-ink/70"
            >
              {copied ? 'Copied ✓' : 'Copy'}
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-8 font-mono text-sm">
            <a href={`tel:${PROFILE.phone}`} className="link-underline text-bone/70 hover:text-signal [html:not(.dark)_&]:text-ink/70">
              {PROFILE.phone}
            </a>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="link-underline text-bone/70 hover:text-signal [html:not(.dark)_&]:text-ink/70"
              >
                {s.label} ↗
              </a>
            ))}
          </div>

          <Magnetic className="mt-4 w-fit">
            <a
              href={PROFILE.resume}
              target="_blank"
              rel="noreferrer"
              data-cursor="open"
              className="inline-flex items-center gap-3 rounded-full bg-signal px-7 py-3.5 font-mono text-xs font-medium uppercase tracking-[0.18em] text-white transition-[filter] hover:brightness-95"
            >
              Download résumé →
            </a>
          </Magnetic>
        </div>
      </Reveal>
    </section>
  )
}
