import {
  Body,
  Button,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text
} from '@react-email/components'

interface MagicLinkTemplateProps {
  magicLink: string
}

export function MagicLinkTemplate({ magicLink }: MagicLinkTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>Use this secure sign-in link (expires in 10 min)</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Section className="mx-auto my-[40px] w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Text className="text-[24px] font-normal text-black">
              Sign in to <strong>Next Foundry</strong>
            </Text>

            <Text className="text-[14px] leading-[24px] text-black">
              👋 Hello there,
            </Text>

            <Text className="text-[14px] leading-[24px] text-black">
              Click the button below to sign in to your Next Foundry account.
            </Text>

            <Section className="my-[32px] text-center">
              <Button
                className="rounded bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={magicLink}
              >
                Sign In
              </Button>
            </Section>

            <Text className="text-[14px] leading-[24px] text-black">
              Or copy and paste this URL into your browser:{' '}
              <Link href={magicLink} className="text-blue-600 no-underline">
                {magicLink}
              </Link>
            </Text>

            <Text className="text-[14px] leading-[24px] text-black">
              This link will expire in 5 minutes and can only be used once.
            </Text>

            <Text className="text-[14px] leading-[24px] text-gray-500">
              If you didn&apos;t request this email, you can safely ignore it.
            </Text>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  )
}
