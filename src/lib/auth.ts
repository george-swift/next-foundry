import { env } from '@/env'
import prisma from '@/lib/prisma'
import { resend } from '@/lib/resend'
import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { nextCookies } from 'better-auth/next-js'
import { magicLink } from 'better-auth/plugins'

import { DeleteAccountTemplate } from '@/app/playground/_components/email-templates/delete-account'
import { MagicLinkTemplate } from '@/app/playground/_components/email-templates/magic-link'

export const auth = betterAuth({
  appName: 'Next Foundry',
  socialProviders: {
    google: {
      prompt: 'select_account',
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET
    }
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60
    }
  },
  user: {
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ user, url }) => {
        await resend.emails.send({
          from: `Next Foundry <noreply@${env.EMAIL_FROM}>`,
          to: user.email,
          subject: 'Verify Account Deletion on Next Foundry',
          headers: {
            'X-Entity-Ref-ID': `${new Date().getTime()}`
          },
          react: DeleteAccountTemplate({ url })
        })
      }
    }
  },
  database: prismaAdapter(prisma, {
    provider: 'postgresql'
  }),
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        await resend.emails.send({
          from: `Next Foundry <noreply@${env.EMAIL_FROM}>`,
          to: email,
          subject: 'Sign in to Next Foundry',
          headers: {
            'X-Entity-Ref-ID': `${new Date().getTime()}`
          },
          react: MagicLinkTemplate({ magicLink: url })
        })
      }
    }),
    nextCookies()
  ]
})
