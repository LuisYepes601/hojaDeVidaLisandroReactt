import { useEffect, useState } from 'react'

const useAnimatedCounter = (target, duration = 2000) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const increment = target / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      if (start < target) {
        setCount(Math.floor(start))
      } else {
        setCount(target)
        clearInterval(timer)
      }
    }, 16)

    return () => clearInterval(timer)
  }, [target, duration])

  return count
}

export default useAnimatedCounter
