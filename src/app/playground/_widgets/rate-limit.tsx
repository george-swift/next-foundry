'use client'

import { useEffect, useState, useTransition } from 'react'
import { cn } from '@/lib/utils'
import dayjs from 'dayjs'
import { ArrowRightLeftIcon, Loader2Icon, TimerIcon } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

interface RateLimitStatus {
  success: boolean
  limit: number
  remaining: number
  reset: number
}

export function RateLimit() {
  const [status, setStatus] = useState<RateLimitStatus | null>(null)
  const [isPending, startTransition] = useTransition()
  const [currentTime, setCurrentTime] = useState(dayjs())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const testRateLimit = () => {
    startTransition(async () => {
      try {
        const response = await fetch('/api/rate-limit', {
          method: 'POST'
        })
        const data = await response.json()
        setStatus(data)
      } catch {
        toast.error('Rate limit test failed')
      }
    })
  }

  const progressValue = status
    ? ((status.limit - status.remaining) / status.limit) * 100
    : 0
  const used = status ? status.limit - status.remaining : 0
  const limit = status?.limit || 3

  const resetTime = status ? dayjs.unix(status.reset) : null
  const timeUntilReset =
    resetTime && resetTime.isAfter(currentTime)
      ? resetTime.diff(currentTime, 'minute') + 1
      : null

  return (
    <div className="px-0.75 pb-0.75 flex size-full flex-col items-center justify-end gap-3">
      {timeUntilReset && timeUntilReset > 0 && (
        <div className="text-muted-foreground flex items-center justify-center gap-1 text-xs">
          <TimerIcon className="size-3" />
          <span>Resets in {timeUntilReset}m</span>
        </div>
      )}

      <div className="w-full space-y-2 text-center">
        <div className="text-muted-foreground flex items-center justify-between text-xs">
          <span>Requests</span>
          <span
            className={cn(
              'font-mono',
              status?.success === false && 'text-red-600'
            )}
          >
            {used}/{limit}
          </span>
        </div>

        <Progress value={progressValue} />

        <Button
          onClick={testRateLimit}
          disabled={isPending || status?.success === false}
          size="sm"
          className="w-full"
        >
          {isPending ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <>
              <ArrowRightLeftIcon />
              Test Limit
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
