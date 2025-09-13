'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { useTheme } from 'next-themes'

import { buttonVariants } from '@/components/ui/button'

export function ThemeSwitcher() {
  const [open, setOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const themes = [
    { name: 'light', icon: SunIcon },
    { name: 'dark', icon: MoonIcon },
    { name: 'system', icon: MonitorIcon }
  ]

  return (
    <div className="text-foreground dark pointer-events-none fixed left-1/2 top-0 z-[10000] -translate-x-1/2">
      <motion.div
        className={cn(
          'bg-muted/90 pointer-events-auto flex min-w-[100px] flex-col items-center justify-center gap-1 overflow-hidden rounded-b-[15px] border-b border-l border-r pt-1.5'
        )}
        onClick={() => setOpen(s => !s)}
        role="button"
        aria-expanded={open}
        initial={false}
        animate={{ height: open ? 72 : 32 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      >
        <div className="select-none pb-1 text-xs font-medium">Switch Theme</div>

        {/* Options shown when open */}
        {open ? (
          <div className="bg-background flex items-center gap-2 rounded-[15px] px-1.5 py-1">
            {themes.map(t => (
              <motion.button
                key={t.name}
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'icon' }),
                  'rounded-full'
                )}
                onClick={() => {
                  setTheme(t.name)
                }}
                whileTap={{ scale: 0.95 }}
                disabled={theme === t.name}
              >
                <t.icon className="size-3" />
              </motion.button>
            ))}
          </div>
        ) : null}
      </motion.div>
    </div>
  )
}
