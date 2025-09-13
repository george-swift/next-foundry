'use server'

import { headers } from 'next/headers'
import { env } from '@/env'
import { rateLimit } from '@/lib/rate-limit'
import { resend } from '@/lib/resend'
import { z } from 'zod'

import { ServiceTestTemplate } from '@/app/playground/_components/email-templates/service-test'

const schema = z.object({
  email: z.email({ message: 'Valid email address is required.' })
})

export async function sendTestEmail(formData: z.infer<typeof schema>) {
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
      actionType: 'email.test',
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

    const { error } = await resend.emails.send({
      from: `Next Foundry <noreply@${env.EMAIL_FROM}>`,
      to: email,
      subject: 'Test Email from the Playground',
      headers: {
        'X-Entity-Ref-ID': `${new Date().getTime()}`
      },
      react: ServiceTestTemplate()
    })

    if (error) {
      return { data: null, error: error.message }
    }

    return {
      data: 'Email sent! Kindly check your inbox.',
      error: null
    }
  } catch {
    return {
      data: null,
      error: 'Failed to send email.'
    }
  }
}
