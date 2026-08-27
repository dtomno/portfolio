import { useEffect, useRef, useState } from 'react'

/**
 * Two-part custom cursor: an instant dot and a trailing ring that swells over
 * interactive elements. Only mounts on fine-pointer devices.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  const [label, setLabel] = useState<string | null>(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!fine.matches || reduced.matches) return

    setEnabled(true)
    document.body.classList.add('custom-cursor')

    const pos = { x: -100, y: -100 }
    const ringPos = { ...pos }
    let hovering = false
    let down = false
    let raf = 0

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX
      pos.y = e.clientY
      if (dot.current) {
        dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`
      }
      const el = (e.target as HTMLElement)?.closest<HTMLElement>(
        'a, button, [data-cursor], input, textarea, label[for]',
      )
      hovering = Boolean(el)
      setLabel(el?.dataset.cursor ?? null)
    }

    const onDown = () => (down = true)
    const onUp = () => (down = false)

    const render = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.18
      ringPos.y += (pos.y - ringPos.y) * 0.18
      const scale = (hovering ? 1.9 : 1) * (down ? 0.8 : 1)
      if (ring.current) {
        ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%) scale(${scale})`
        ring.current.style.opacity = hovering ? '1' : '0.6'
      }
      raf = requestAnimationFrame(render)
    }
    raf = requestAnimationFrame(render)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.body.classList.remove('custom-cursor')
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-signal"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[100] flex h-9 w-9 items-center justify-center rounded-full border border-signal/70 text-[9px] font-mono uppercase tracking-widest text-bone"
        style={{ willChange: 'transform', transition: 'opacity 0.2s ease' }}
      >
        {label}
      </div>
    </>
  )
}
