'use client'

import { useWindowSize } from '@/hooks/util/useWindowSize'
import { useLayoutEffect, useState } from 'react'

export default function BlurredBackground() {
  const [topLeftHeight, setTopLeftHeight] = useState(740)
  const [topLeftWidth, setTopLeftWidth] = useState(740)

  const [topRightHeight, setTopRightHeight] = useState(1120)
  const [topRightWidth, setTopRightWidth] = useState(1120)

  const [bottomLeftHeight, setBottomLeftHeight] = useState(1120)
  const [bottomLeftWidth, setBottomLeftWidth] = useState(1120)

  const [bottomRightHeight, setBottomRightHeight] = useState(1220)
  const [bottomRightWidth, setBottomRightWidth] = useState(1220)

  const { width, height } = useWindowSize()

  const initialHeight = 830
  const initialWidth = 1440

  useLayoutEffect(() => {
    setTopLeftHeight(Math.floor(740 * (height / initialHeight)))
    setTopLeftWidth(Math.floor(740 * (width / initialWidth)))

    setTopRightHeight(Math.floor(1120 * (height / initialHeight)))
    setTopRightWidth(Math.floor(1120 * (width / initialWidth)))

    setBottomLeftHeight(Math.floor(1120 * (height / initialHeight)))
    setBottomLeftWidth(Math.floor(1120 * (width / initialWidth)))

    setBottomRightHeight(Math.floor(1220 * (height / initialHeight)))
    setBottomRightWidth(Math.floor(1220 * (width / initialWidth)))
  }, [width, height])

  return (
    <div className="fixed h-screen w-screen" role="img" aria-label="Background Image">
      <div
        className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3 rounded-full bg-primary opacity-15 blur-[128px]"
        style={{ height: `${topLeftHeight}px`, width: `${topLeftWidth}px`, WebkitBackdropFilter: `blur(128px)` }}
      ></div>
      <div
        className="absolute top-0 right-0  h-[1120px] w-[1120px] -translate-y-1/3 translate-x-20 rounded-full bg-custom-purpleBlue opacity-15 blur-[128px]"
        style={{ height: `${topRightHeight}px`, width: `${topRightWidth}px`, WebkitBackdropFilter: `blur(128px)` }}
      ></div>
      <div
        className="absolute bottom-0 left-0 -translate-x-1/3 translate-y-1/2 rounded-full bg-custom-cyan opacity-15 blur-[128px]"
        style={{ height: `${bottomLeftHeight}px`, width: `${bottomLeftWidth}px`, WebkitBackdropFilter: `blur(128px)` }}
      ></div>
      <div
        className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/2 rounded-full bg-custom-red opacity-15 blur-[128px]"
        style={{
          height: `${bottomRightHeight}px`,
          width: `${bottomRightWidth}px`,
          WebkitBackdropFilter: `blur(128px)`,
        }}
      ></div>
    </div>
  )
}
