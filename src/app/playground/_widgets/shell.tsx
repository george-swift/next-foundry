import React, { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type WidgetSize = 'sm' | 'lg'

interface WidgetProps {
  children?: ReactNode
  size?: WidgetSize
  className?: string
}

function Widget({ children, size = 'sm', className = '' }: WidgetProps) {
  return (
    <div
      className={cn(
        'bg-white/4 flex flex-col rounded-lg border p-[10px] text-xs',
        size === 'sm' ? 'h-[165px]' : 'h-[352px]',
        className
      )}
    >
      {children}
    </div>
  )
}

interface WidgetHeaderProps {
  children?: ReactNode
  className?: string
}

function WidgetHeader({ children, className = '' }: WidgetHeaderProps) {
  if (!children) return null

  return (
    <div
      className={cn('mb-2 flex items-center gap-1 border-b pb-2', className)}
    >
      {children}
    </div>
  )
}

interface WidgetBodyProps {
  children?: ReactNode
  className?: string
}

function WidgetBody({ children, className = '' }: WidgetBodyProps) {
  return (
    <div className={cn('h-full overflow-y-auto', className)}>{children}</div>
  )
}

export { Widget, WidgetHeader, WidgetBody }
