import { useEffect } from 'react'

const useSmoothScroll = () => {
  useEffect(() => {
    const handleClick = (e) => {
      const target = e.target.closest('a[href^="#"]')
      if (!target) return

      e.preventDefault()
      const targetId = target.getAttribute('href').substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])
}

export default useSmoothScroll
