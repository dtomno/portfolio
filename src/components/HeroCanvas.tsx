import { useEffect, useRef } from 'react'

type Props = { theme: 'dark' | 'light' }

type P = { x: number; y: number; vx: number; vy: number; life: number; maxLife: number }

/**
 * A pointer-reactive flow field. Particles drift along a smoothly evolving
 * pseudo-noise field and are pushed away from the cursor, leaving fading trails.
 */
export function HeroCanvas({ theme }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const themeRef = useRef(theme)

  useEffect(() => {
    themeRef.current = theme
  }, [theme])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    const pointer = { x: -9999, y: -9999, active: false }
    let particles: P[] = []
    let raf = 0
    let t = 0
    let running = true

    const palette = () =>
      themeRef.current === 'dark'
        ? { fade: 'rgba(11, 11, 13, 0.09)', a: '35, 206, 107', b: '120, 180, 255' }
        : { fade: 'rgba(244, 241, 234, 0.10)', a: '20, 154, 76', b: '40, 90, 180' }

    function resize() {
      const parent = canvas!.parentElement!
      width = parent.clientWidth
      height = parent.clientHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas!.width = width * dpr
      canvas!.height = height * dpr
      canvas!.style.width = `${width}px`
      canvas!.style.height = `${height}px`
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

      const target = reduced ? 0 : Math.round(Math.min(240, (width * height) / 5200))
      particles = Array.from({ length: target }, spawn)
      ctx!.clearRect(0, 0, width, height)
    }

    function spawn(): P {
      const maxLife = 120 + Math.random() * 260
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0,
        vy: 0,
        life: Math.random() * maxLife,
        maxLife,
      }
    }

    // Cheap divergence-free-ish flow field from layered trig.
    function field(x: number, y: number) {
      const s1 = 0.0016
      const s2 = 0.0041
      return (
        Math.sin(x * s1 + t) * 1.4 +
        Math.cos(y * s1 - t * 0.8) * 1.4 +
        Math.sin((x + y) * s2 + t * 0.5) * 0.9
      )
    }

    function frame() {
      if (!running) return
      t += 0.0025
      const { fade, a, b } = palette()

      ctx!.fillStyle = fade
      ctx!.fillRect(0, 0, width, height)

      for (const p of particles) {
        const angle = field(p.x, p.y)
        p.vx += Math.cos(angle) * 0.14
        p.vy += Math.sin(angle) * 0.14

        if (pointer.active) {
          const dx = p.x - pointer.x
          const dy = p.y - pointer.y
          const dist2 = dx * dx + dy * dy
          if (dist2 < 26000) {
            const force = (26000 - dist2) / 26000
            const d = Math.max(Math.sqrt(dist2), 0.001)
            p.vx += (dx / d) * force * 1.9
            p.vy += (dy / d) * force * 1.9
          }
        }

        p.vx *= 0.92
        p.vy *= 0.92
        p.x += p.vx
        p.y += p.vy
        p.life++

        const speed = Math.min(Math.hypot(p.vx, p.vy), 3)
        const mix = Math.min(speed / 3, 1)
        const alpha = 0.12 + mix * 0.5
        ctx!.strokeStyle = `rgba(${mix > 0.55 ? b : a}, ${alpha})`
        ctx!.lineWidth = 1
        ctx!.beginPath()
        ctx!.moveTo(p.x, p.y)
        ctx!.lineTo(p.x - p.vx * 3, p.y - p.vy * 3)
        ctx!.stroke()

        if (
          p.life > p.maxLife ||
          p.x < -20 ||
          p.x > width + 20 ||
          p.y < -20 ||
          p.y > height + 20
        ) {
          Object.assign(p, spawn(), { life: 0 })
        }
      }

      raf = requestAnimationFrame(frame)
    }

    function drawStatic() {
      const { a } = palette()
      ctx!.clearRect(0, 0, width, height)
      const gap = 46
      for (let x = gap; x < width; x += gap) {
        for (let y = gap; y < height; y += gap) {
          ctx!.fillStyle = `rgba(${a}, 0.18)`
          ctx!.beginPath()
          ctx!.arc(x, y, 1.1, 0, Math.PI * 2)
          ctx!.fill()
        }
      }
    }

    const onPointerMove = (e: PointerEvent) => {
      const r = canvas!.getBoundingClientRect()
      pointer.x = e.clientX - r.left
      pointer.y = e.clientY - r.top
      pointer.active = true
    }
    const onPointerLeave = () => (pointer.active = false)
    const onVisibility = () => {
      running = !document.hidden
      if (running && !reduced) {
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(frame)
      }
    }

    resize()
    if (reduced) {
      drawStatic()
    } else {
      raf = requestAnimationFrame(frame)
    }

    const ro = new ResizeObserver(() => {
      resize()
      if (reduced) drawStatic()
    })
    ro.observe(canvas.parentElement!)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerout', onPointerLeave)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerout', onPointerLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  )
}
