import { useEffect, useState } from 'react'

/**
 * Tracks the section currently under an imaginary line ~38% down the viewport.
 * Rect-based rather than intersection-ratio based, so it stays correct even when
 * a section is much taller than the viewport.
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    let ticking = false

    const update = () => {
      ticking = false
      const line = window.innerHeight * 0.38
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const { top } = el.getBoundingClientRect()
        if (top - line <= 0) current = id
      }
      // Snap to last section when near the bottom of the page.
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
        current = ids[ids.length - 1]
      }
      setActive(current)
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids])

  return active
}
