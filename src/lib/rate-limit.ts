import { headers } from 'next/headers'
import type { Duration } from '@upstash/ratelimit'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

export type RateLimitAction =
  | 'auth.magicLink'
  | 'auth.deleteAccount'
  | 'email.test'
  | 'rateLimit.test'

interface SlidingWindowConfig {
  limit: number
  duration: Duration
}

interface RateLimitProps {
  actionType?: RateLimitAction
  identifier?: string
}

const redisEnv = Redis.fromEnv()
const rateLimits = new Map()

const getSlidingWindow = (actionType: RateLimitAction): SlidingWindowConfig => {
  switch (actionType) {
    case 'email.test':
      return {
        limit: 2,
        duration: '1h'
      }

    case 'auth.magicLink':
    case 'auth.deleteAccount':
      return {
        limit: 3,
        duration: '1h'
      }

    case 'rateLimit.test':
      return {
        limit: 3,
        duration: '15m'
      }

    default:
      return { limit: 2, duration: '10s' }
  }
}

const getRateLimit = (actionType: RateLimitAction) => {
  if (rateLimits.has(actionType)) {
    return rateLimits.get(actionType)
  }

  const config = getSlidingWindow(actionType)

  const rateLimit = new Ratelimit({
    redis: redisEnv,
    limiter: Ratelimit.slidingWindow(config.limit, config.duration),
    analytics: true,
    prefix: `@next-foundry/ratelimit_${actionType}`
  })

  rateLimits.set(actionType, rateLimit)
  return rateLimit
}

export const rateLimit = async ({
  actionType = 'rateLimit.test',
  identifier
}: RateLimitProps) => {
  const headersList = await headers()
  const ip = headersList.get('x-real-ip') || '127.0.0.1'

  const _rateLimit = getRateLimit(actionType)
  const result = await _rateLimit.limit(identifier ?? ip)

  return result
}
