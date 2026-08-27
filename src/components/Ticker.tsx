import { TICKER } from '../data/content'

/** Infinite marquee of technologies — doubled content for a seamless loop. */
export function Ticker() {
  const row = [...TICKER, ...TICKER]
  return (
    <div className="relative flex overflow-hidden border-y border-ink-line/70 py-5 [html:not(.dark)_&]:border-bone-line/70">
      <div className="flex shrink-0 animate-marquee items-center gap-8 pr-8 motion-reduce:animate-none">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-8 font-mono text-sm uppercase tracking-[0.2em] text-bone/55 [html:not(.dark)_&]:text-ink/50">
            {item}
            <span className="text-signal">✦</span>
          </span>
        ))}
      </div>
      <div aria-hidden className="flex shrink-0 animate-marquee items-center gap-8 pr-8 motion-reduce:animate-none">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-8 font-mono text-sm uppercase tracking-[0.2em] text-bone/55 [html:not(.dark)_&]:text-ink/50">
            {item}
            <span className="text-signal">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
