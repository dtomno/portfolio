import { useEffect, useRef, useState, type ElementType } from 'react'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/[]{}=+*#%$'

type Props = {
  text: string
  className?: string
  /** ms between scramble ticks */
  speed?: number
  start?: boolean
  as?: ElementType
}

/** Reveals text with a "decoding" scramble as characters resolve left to right. */
export function ScrambleText({ text, className, speed = 38, start = true, as: Tag = 'span' }: Props) {
  const [display, setDisplay] = useState(text)
  const timer = useRef<number>(0)
  const done = useRef(false)

  useEffect(() => {
    if (!start || done.current) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setDisplay(text)
      done.current = true
      return
    }

    let revealed = 0
    let tick = 0
    const step = () => {
      tick++
      if (tick % 2 === 0) revealed += 1
      const out = text
        .split('')
        .map((ch, i) => {
          if (ch === ' ') return ' '
          if (i < revealed) return ch
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        })
        .join('')
      setDisplay(out)
      if (revealed <= text.length) {
        timer.current = window.setTimeout(step, speed)
      } else {
        setDisplay(text)
        done.current = true
      }
    }
    step()
    return () => window.clearTimeout(timer.current)
  }, [text, speed, start])

  return (
    <Tag className={className} aria-label={text}>
      <span aria-hidden="true">{display}</span>
    </Tag>
  )
}
