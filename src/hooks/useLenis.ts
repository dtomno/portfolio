import { useEffect } from 'react'
import Lenis from 'lenis'

/** Smooth momentum scrolling. Respects reduced-motion by simply not initializing. */
export function useLenis() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.6,
    })

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    // Let hash links / buttons request a scroll.
    const onScrollTo = (e: Event) => {
      const target = (e as CustomEvent<string>).detail
      const el = document.querySelector(target)
      if (el) lenis.scrollTo(el as HTMLElement, { offset: -40 })
    }
    // Let overlays (mobile menu, lightbox) freeze/unfreeze scrolling.
    const onLock = (e: Event) => {
      ;(e as CustomEvent<boolean>).detail ? lenis.stop() : lenis.start()
    }
    window.addEventListener('lenis:scroll-to', onScrollTo as EventListener)
    window.addEventListener('lenis:lock', onLock as EventListener)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('lenis:scroll-to', onScrollTo as EventListener)
      window.removeEventListener('lenis:lock', onLock as EventListener)
      lenis.start()
      lenis.destroy()
    }
  }, [])
}

export function scrollToId(id: string) {
  const selector = `#${id}`
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) {
    document.querySelector(selector)?.scrollIntoView({ behavior: 'auto', block: 'start' })
    return
  }
  window.dispatchEvent(new CustomEvent('lenis:scroll-to', { detail: selector }))
  // Fallback if Lenis isn't running.
  setTimeout(() => {
    const el = document.querySelector(selector)
    if (el && Math.abs(el.getBoundingClientRect().top) > window.innerHeight) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, 60)
}

/**
 * Freeze/unfreeze page scrolling for full-screen overlays. Stops Lenis (which
 * ignores `body { overflow: hidden }`) and hard-locks the document for the
 * reduced-motion / no-Lenis path.
 */
export function setScrollLock(locked: boolean) {
  window.dispatchEvent(new CustomEvent('lenis:lock', { detail: locked }))
  const { documentElement: html, body } = document
  html.classList.toggle('scroll-locked', locked)
  if (locked) {
    body.style.overflow = 'hidden'
    html.style.overflow = 'hidden'
  } else {
    body.style.overflow = ''
    html.style.overflow = ''
  }
}
