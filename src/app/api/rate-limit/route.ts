import { NextResponse } from 'next/server'
import { rateLimit } from '@/lib/rate-limit'

export async function POST() {
  try {
    const result = await rateLimit({ actionType: 'rateLimit.test' })

    return NextResponse.json(
      {
        success: result.success,
        limit: result.limit,
        remaining: result.remaining,
        reset: Math.floor(result.reset / 1000)
      },
      {
        status: result.success ? 200 : 429
      }
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        limit: 3,
        remaining: 0,
        reset: Math.floor(Date.now() / 1000) + 900,
        message: (error as Error).message
      },
      { status: 500 }
    )
  }
}
