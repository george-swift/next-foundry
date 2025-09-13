'use client'

import { useState } from 'react'
import {
  ActivityIcon,
  BellIcon,
  CalendarIcon,
  MailIcon,
  MapPinIcon,
  SearchIcon,
  SettingsIcon,
  UserIcon
} from 'lucide-react'
import { motion } from 'motion/react'

const ICONS = [
  { Icon: UserIcon, name: 'User' },
  { Icon: SettingsIcon, name: 'Settings' },
  { Icon: SearchIcon, name: 'Search' },
  { Icon: BellIcon, name: 'Bell' },
  { Icon: MailIcon, name: 'Mail' },
  { Icon: CalendarIcon, name: 'Calendar' },
  { Icon: MapPinIcon, name: 'MapPin' },
  { Icon: ActivityIcon, name: 'Activity' }
]

export function Lucide() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="px-0.75 pb-0.75 flex size-full flex-col items-center justify-center gap-3">
      <div className="grid grid-cols-4 gap-2">
        {ICONS.map(({ Icon, name }, index) => (
          <motion.div
            key={name}
            className="bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground flex size-8 items-center justify-center rounded-md transition-colors"
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon className="size-4" />
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <motion.p
          className="text-muted-foreground text-xs"
          animate={{ opacity: hoveredIndex !== null ? 1 : 0.7 }}
        >
          {hoveredIndex !== null ? ICONS[hoveredIndex].name : '1600+ icons'}
        </motion.p>
      </div>
    </div>
  )
}
