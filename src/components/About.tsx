import { Reveal } from './Reveal'
import { ABOUT, SKILLS, STATS } from '../data/content'
import portrait from '../assets/DennisTomno.png'

export function About() {
  return (
    <section id="about" className="shell scroll-mt-24 mb-5">
      <Reveal>
        <p className="eyebrow mb-4 text-base">/ 01 — About</p>
        <h2 className="max-w-3xl font-display text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-tight tracking-tight">
          Engineer with a bias for <span className="text-signal">shipping</span> and a soft spot for
          the details users feel.
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <div>
          <div className="space-y-5 text-lg leading-relaxed text-bone/75 [html:not(.dark)_&]:text-ink/70">
            {ABOUT.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-line/70 bg-ink-line/40 sm:grid-cols-4 [html:not(.dark)_&]:border-bone-line/70 [html:not(.dark)_&]:bg-bone-line/50">
            {STATS.map((s) => (
              <div key={s.label} className="bg-ink px-4 py-6 [html:not(.dark)_&]:bg-bone">
                <div className="font-display text-2xl font-semibold text-signal">{s.value}</div>
                <div className="mt-1 font-mono text-[11px] uppercase leading-tight tracking-wider text-bone/50 [html:not(.dark)_&]:text-ink/50">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 space-y-6">
            {SKILLS.map((group, gi) => (
              <Reveal key={group.category} delay={gi * 0.06}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <span className="w-24 shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-bone/45 [html:not(.dark)_&]:text-ink/45">
                    {group.category}
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {group.items.map((skill) => (
                      <a
                        key={skill.name}
                        href={skill.href}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor="↗"
                        className="group flex items-center gap-2 rounded-full border border-ink-line/80 px-3.5 py-1.5 text-sm transition-colors hover:border-signal hover:text-signal [html:not(.dark)_&]:border-bone-line"
                      >
                        <img src={skill.icon} alt="" className="h-4 w-4 opacity-80 transition group-hover:opacity-100" />
                        {skill.name}
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.1} className="relative">
          <div className="grain relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-ink-line/70 [html:not(.dark)_&]:border-bone-line">
            <img
              src={portrait}
              alt="Dennis Tomno"
              className="h-full w-full object-cover grayscale transition duration-700 hover:grayscale-0"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-signal/25 via-transparent to-transparent mix-blend-color" />
          </div>
          <div className="absolute -bottom-5 -left-3 rounded-2xl border border-ink-line/70 bg-ink px-5 py-3 font-mono text-xs [html:not(.dark)_&]:border-bone-line [html:not(.dark)_&]:bg-bone">
            <span className="text-signal">●</span> Open to opportunities
          </div>
        </Reveal>
      </div>
    </section>
  )
}
