'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

function AnimateNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(value)
  const motionValue = useMotionValue(value)

  const spring = useSpring(motionValue, {
    stiffness: 80,
    damping: 20,
    mass: 0.8
  })

  useEffect(() => {
    motionValue.set(value)
  }, [value, motionValue])

  useEffect(() => {
    const unsubscribe = spring.on('change', latest => {
      setDisplayValue(Math.round(latest))
    })
    return unsubscribe
  }, [spring])

  return <span className="text-[96px] font-medium">${displayValue}</span>
}

export function Motion() {
  const [isYearly, setIsYearly] = useState(false)

  const monthlyPrice = 19
  const yearlyPrice = 199
  const currentPrice = isYearly ? yearlyPrice : monthlyPrice

  const yearlySavings = Math.round(
    ((monthlyPrice * 12 - yearlyPrice) / (monthlyPrice * 12)) * 100
  )

  return (
    <div className="flex size-full flex-col items-center justify-center">
      {/* Savings Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{
          opacity: isYearly ? 1 : 0,
          y: isYearly ? 0 : 10,
          scale: isYearly ? 1 : 0.9
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 25,
          mass: 0.8,
          duration: 0.4
        }}
        className="mb-2.5 rounded-full bg-blue-100 px-3 py-1.5 text-blue-600 dark:bg-blue-200"
        style={{
          pointerEvents: isYearly ? 'auto' : 'none'
        }}
      >
        <span className="text-[12px] font-medium">Save {yearlySavings}%</span>
      </motion.div>

      {/* Price Display */}
      <div className="leading-none tracking-[-0.01em]">
        <AnimateNumber value={currentPrice} />
        <motion.span
          className="text-muted-foreground text-[32px]"
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut'
          }}
          key={isYearly ? 'yearly' : 'monthly'}
        >
          /{isYearly ? 'yr' : 'mo'}
        </motion.span>
      </div>

      {/* Price Toggle */}
      <div className="mt-5 flex flex-col items-center gap-3">
        <div className="ring-muted-foreground/20 relative grid h-10 w-[160px] grid-cols-2 gap-2.5 rounded-[100px] bg-white/5 p-1.5 ring *:outline-0">
          {[
            { label: 'Monthly', value: false },
            { label: 'Yearly', value: true }
          ].map(({ label, value }) => (
            <motion.button
              key={label}
              className="relative z-[2] flex select-none justify-center px-3 py-2 text-[13px] leading-none"
              animate={{
                color:
                  isYearly === value
                    ? 'var(--background)'
                    : 'var(--muted-foreground)'
              }}
              transition={{
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1]
              }}
              onClick={() => setIsYearly(value)}
            >
              {label}
            </motion.button>
          ))}

          <motion.span
            className="bg-foreground absolute inset-1.5 z-[1] w-[69px] rounded-[94px]"
            animate={{ x: isYearly ? 79 : 0 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              mass: 0.8
            }}
          />
        </div>
      </div>
    </div>
  )
}
