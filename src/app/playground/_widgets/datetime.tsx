'use client'

import { useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs'

export function DateTime() {
  const rafRef = useRef<number | null>(null)
  const [angles, setAngles] = useState({ h: 0, m: 0, s: 0 })

  useEffect(() => {
    function update() {
      const now = dayjs()
      const hours = now.hour()
      const minutes = now.minute()
      const seconds = now.second()
      const ms = now.millisecond()

      const secondsFrac = seconds + ms / 1000
      const minutesFrac = minutes + secondsFrac / 60
      const hoursFrac = (hours % 12) + minutesFrac / 60

      // radians where 0 is at 12 o'clock and increases clockwise (clockRadians)
      const sRadClock = (secondsFrac / 60) * Math.PI * 2
      const mRadClock = (minutesFrac / 60) * Math.PI * 2
      const hRadClock = (hoursFrac / 12) * Math.PI * 2

      // store clock radians directly in state
      setAngles({ h: hRadClock, m: mRadClock, s: sRadClock })
      rafRef.current = requestAnimationFrame(update)
    }

    // Run an initial synchronous update so the clock renders correctly immediately
    update()

    // Then start the RAF loop
    rafRef.current = requestAnimationFrame(update)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [])

  const cx = 282.5
  const cy = 282.5
  const r = 200

  // compute end points for hands from angles which are stored in clock radians (0 at 12 o'clock, increasing clockwise)
  const hourLen = 90
  const minuteLen = 130
  const secondLen = 150
  // SVG coords: x = cx + len * sin(clockRad), y = cy - len * cos(clockRad)
  const hx = cx + hourLen * Math.sin(angles.h)
  const hy = cy - hourLen * Math.cos(angles.h)
  const mx = cx + minuteLen * Math.sin(angles.m)
  const my = cy - minuteLen * Math.cos(angles.m)
  const sx = cx + secondLen * Math.sin(angles.s)
  const sy = cy - secondLen * Math.cos(angles.s)

  return (
    <div className="flex h-full w-full items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 565 565"
        style={{ width: '100%', height: 'auto', color: 'currentColor' }}
        aria-label="Analog clock"
        role="img"
      >
        <g
          id="dial"
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          opacity={0.9}
          strokeMiterlimit={10}
        >
          <circle cx={cx} cy={cy} r={r} strokeWidth={0} fill="none" />

          {/* minute ticks (60) with emphasized 5-minute/hour marks*/}
          {Array.from({ length: 60 }).map((_, i) => {
            const angle = (i / 60) * Math.PI * 2
            const isHour = i % 5 === 0
            const inner = r - (isHour ? 50 : 20)
            const outer = r
            const x1 = cx + inner * Math.cos(angle - Math.PI / 2)
            const y1 = cy + inner * Math.sin(angle - Math.PI / 2)
            const x2 = cx + outer * Math.cos(angle - Math.PI / 2)
            const y2 = cy + outer * Math.sin(angle - Math.PI / 2)
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                strokeWidth={isHour ? 1.7 : 1}
                strokeOpacity={isHour ? 1 : 0.9}
              />
            )
          })}
        </g>

        <g
          id="clock-hands"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Hour hand */}
          <line x1={cx} y1={cy} x2={hx} y2={hy} strokeWidth={6} />

          {/* Minute hand */}
          <line x1={cx} y1={cy} x2={mx} y2={my} strokeWidth={5} />

          {/* Second hand */}
          <line x1={cx} y1={cy} x2={sx} y2={sy} strokeWidth={2} />
          <circle cx={cx} cy={cy} r={6} fill="currentColor" />
        </g>
      </svg>
    </div>
  )
}
