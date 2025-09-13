'use server'

import { unstable_noStore as noStore } from 'next/cache'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { rateLimit } from '@/lib/rate-limit'
import { z } from 'zod'

const schema = z.object({
  email: z.email({ message: 'Valid email address is required.' })
})

export async function sendMagicLink(formData: z.infer<typeof schema>) {
  noStore()
  const parse = schema.safeParse(formData)

  if (!parse.success) {
    return {
      data: null,
      error:
        z.treeifyError(parse.error).properties?.email?.toString() ??
        'Invalid email address.'
    }
  }

  const { email } = parse.data

  const headersList = await headers()
  const ip = headersList.get('x-real-ip') || '127.0.0.1'

  try {
    const rateLimitResult = await rateLimit({
      actionType: 'auth.magicLink',
      identifier: ip
    })

    if (!rateLimitResult.success) {
      return {
        data: null,
        error: `Too many requests. Try again in ${Math.ceil(
          (rateLimitResult.reset - Date.now()) / 1000 / 60
        )} mins.`
      }
    }

    const result = await auth.api.signInMagicLink({
      body: { email, callbackURL: '/playground' },
      headers: headersList,
      asResponse: true
    })

    if (!result.ok) {
      return {
        data: null,
        error: 'Failed to send magic link. Please try again.'
      }
    }

    return {
      data: 'Magic link sent! Check your email to sign in.',
      error: null
    }
  } catch {
    return {
      data: null,
      error: 'Something went wrong. Please try again.'
    }
  }
}

export async function deleteAccount() {
  try {
    const headersList = await headers()
    const ip = headersList.get('x-real-ip') || '127.0.0.1'

    const rateLimitResult = await rateLimit({
      actionType: 'auth.deleteAccount',
      identifier: ip
    })

    if (!rateLimitResult.success) {
      return {
        data: null,
        error: `Too many requests. Try again in ${Math.ceil(
          (rateLimitResult.reset - Date.now()) / 1000 / 60
        )} mins.`
      }
    }

    const session = await auth.api.getSession({ headers: headersList })

    if (!session?.user?.email) {
      return {
        data: null,
        error: 'You must be signed in to delete your account.'
      }
    }

    const result = await auth.api.deleteUser({
      body: { callbackURL: '/playground' },
      headers: headersList,
      asResponse: true
    })

    if (!result.ok) {
      return {
        data: null,
        error: 'Failed to delete account. Please try again.'
      }
    }

    return {
      data: 'Account deletion initiated. Please check your email to confirm.',
      error: null
    }
  } catch {
    return {
      data: null,
      error: 'Something went wrong. Please try again.'
    }
  }
}
