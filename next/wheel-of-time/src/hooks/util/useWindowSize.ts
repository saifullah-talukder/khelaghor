import { useEffect, useState } from 'react'

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 1280,
    height: 720,
  })

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth: width, innerHeight: height } = window
      setWindowSize({ width, height })
    }

    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}
