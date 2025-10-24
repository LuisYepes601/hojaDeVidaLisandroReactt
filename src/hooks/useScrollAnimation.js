import { useEffect } from 'react'

const useScrollAnimation = (selector, threshold = 0.1) => {
  useEffect(() => {
    const observerOptions = {
      threshold: threshold,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
        }
      })
    }, observerOptions)

    const elements = document.querySelectorAll(selector)
    elements.forEach(el => {
      observer.observe(el)
    })

    return () => {
      elements.forEach(el => {
        observer.unobserve(el)
      })
    }
  }, [selector, threshold])
}

export default useScrollAnimation
