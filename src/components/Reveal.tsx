import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  /** seconds */
  delay?: number
  y?: number
  className?: string
  once?: boolean
}

/**
 * Scroll-reveal driven by IntersectionObserver + CSS transitions. Deliberately
 * avoids a JS animation loop so content can't get stuck mid-tween. Anything
 * already on screen at mount reveals immediately, so content is never hidden
 * behind a missed observer callback.
 */
export function Reveal({ children, delay = 0, y = 26, className, once = true }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const inViewNow = rect.top < window.innerHeight * 0.92 && rect.bottom > 0
    if (inViewNow || typeof IntersectionObserver === 'undefined') {
      setShown(true)
      if (once && inViewNow) return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          if (once) io.disconnect()
        } else if (!once) {
          setShown(false)
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [once])

  const style = {
    '--reveal-delay': `${delay * 1000}ms`,
    '--reveal-y': `${y}px`,
  } as CSSProperties

  return (
    <div
      ref={ref}
      style={style}
      className={`reveal${shown ? ' in' : ''}${className ? ` ${className}` : ''}`}
    >
      {children}
    </div>
  )
}
