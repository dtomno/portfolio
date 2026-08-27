import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { setScrollLock } from '../hooks/useLenis'

type Props = {
  images: string[]
  title: string
  start?: number
  onClose: () => void
}

export function Lightbox({ images, title, start = 0, onClose }: Props) {
  const [i, setI] = useState(start)
  const many = images.length > 1

  const next = useCallback(() => setI((v) => (v + 1) % images.length), [images.length])
  const prev = useCallback(() => setI((v) => (v === 0 ? images.length - 1 : v - 1)), [images.length])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    setScrollLock(true)
    return () => {
      window.removeEventListener('keydown', onKey)
      setScrollLock(false)
    }
  }, [next, prev, onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md sm:p-10"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-2xl text-white/80 transition hover:border-signal hover:text-signal"
      >
        ✕
      </button>

      <div
        className="relative flex w-full max-w-5xl flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-white/60">{title}</div>

        <div className="relative flex w-full items-center justify-center">
          {many && (
            <button
              onClick={prev}
              aria-label="Previous"
              className="absolute left-0 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-signal/85 text-3xl text-white transition hover:scale-110 hover:bg-signal sm:-left-6"
            >
              ‹
            </button>
          )}

          <AnimatePresence mode="wait">
            <motion.img
              key={i}
              src={images[i]}
              alt={`${title} — screenshot ${i + 1}`}
              className="max-h-[74vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
            />
          </AnimatePresence>

          {many && (
            <button
              onClick={next}
              aria-label="Next"
              className="absolute right-0 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-signal/85 text-3xl text-white transition hover:scale-110 hover:bg-signal sm:-right-6"
            >
              ›
            </button>
          )}
        </div>

        {many && (
          <div className="mt-5 flex items-center gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Go to image ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  idx === i ? 'w-8 bg-signal' : 'w-1.5 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
