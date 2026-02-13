import { useEffect, useRef } from 'react'
import { useAppStore } from '../store/useAppStore'

const CHAPTER_COUNT = 6

export default function ScrollManager() {
  const containerRef = useRef<HTMLDivElement>(null)
  const setScrollProgress = useAppStore((s) => s.setScrollProgress)
  const setCurrentChapter = useAppStore((s) => s.setCurrentChapter)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(scrollY / docHeight, 1)
      setScrollProgress(progress)
      const chapter = Math.min(
        Math.floor(progress * CHAPTER_COUNT),
        CHAPTER_COUNT - 1
      )
      setCurrentChapter(chapter)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [setScrollProgress, setCurrentChapter])

  // Spacer divs to create scroll height - each chapter = 100vh
  return (
    <div ref={containerRef} className="relative">
      {Array.from({ length: CHAPTER_COUNT }).map((_, i) => (
        <div key={i} className="h-screen" id={`chapter-${i}`} />
      ))}
    </div>
  )
}
