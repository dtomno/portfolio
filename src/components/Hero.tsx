import { HeroCanvas } from './HeroCanvas'
import { ScrambleText } from './ScrambleText'
import { Reveal } from './Reveal'
import { Magnetic } from './Magnetic'
import { scrollToId } from '../hooks/useLenis'
import { PROFILE, SOCIALS } from '../data/content'

export function Hero({ theme }: { theme: 'dark' | 'light' }) {
  return (
    <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden">
      <HeroCanvas theme={theme} />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            theme === 'dark'
              ? 'radial-gradient(120% 90% at 50% 0%, transparent 40%, #0b0b0d 92%)'
              : 'radial-gradient(120% 90% at 50% 0%, transparent 40%, #f4f1ea 92%)',
        }}
      />

      <div className="shell relative z-10 pt-28">
        <Reveal y={12}>
          <p className="eyebrow mb-6 flex items-center gap-3 text-base">
            <span className="inline-block h-px w-10 bg-signal" />
            {PROFILE.role} · {PROFILE.location}
          </p>
        </Reveal>

        <h1 className="font-display text-[clamp(2.8rem,9vw,7.5rem)] font-semibold leading-[0.95] tracking-tight">
          <ScrambleText text="Dennis" speed={34} className="block" />
          <ScrambleText text="Tomno." speed={34} className="block text-signal" />
        </h1>

        <Reveal delay={0.5} y={16}>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-bone/75 [html:not(.dark)_&]:text-ink/70">
            {PROFILE.tagline}
          </p>
        </Reveal>

        <Reveal delay={0.62} y={16}>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Magnetic strength={0.4}>
              <button
                onClick={() => scrollToId('work')}
                data-cursor="see"
                className="group inline-flex items-center gap-3 rounded-full bg-signal px-7 py-3.5 font-mono text-xs font-medium uppercase tracking-[0.18em] text-white transition-[filter] hover:brightness-95"
              >
                View work
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </Magnetic>
            <button
              onClick={() => scrollToId('contact')}
              className="link-underline font-mono text-xs uppercase tracking-[0.18em] text-bone/80 [html:not(.dark)_&]:text-ink/70"
            >
              Get in touch
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.74} y={12}>
          <div className="mt-14 flex items-center gap-6 font-mono text-xs uppercase tracking-[0.2em] text-bone/55 [html:not(.dark)_&]:text-ink/50">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="link-underline hover:text-signal"
              >
                {s.label}
              </a>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/40 [html:not(.dark)_&]:text-ink/40">
        <span className="flex flex-col items-center gap-2">
          Scroll
          <span className="h-8 w-px animate-pulse bg-current" />
        </span>
      </div>
    </section>
  )
}
