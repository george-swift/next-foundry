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

interface DeleteAccountTemplateProps {
  url: string
}

export function DeleteAccountTemplate({ url }: DeleteAccountTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>Confirm account deletion</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Section className="mx-auto my-[40px] w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Text className="text-[24px] font-normal text-black">
              Confirm account deletion on <strong>Next Foundry</strong>
            </Text>

            <Text className="text-[14px] leading-[24px] text-black">
              ⚠️ Hello there,
            </Text>

            <Text className="text-[14px] leading-[24px] text-black">
              We received a request to permanently delete your Next Foundry
              account. This action cannot be undone.
            </Text>

            <Text className="text-[14px] leading-[24px] text-black">
              If you&apos;re sure you want to proceed, click the button below to
              confirm the deletion of your account and all associated data.
            </Text>

            <Section className="my-[32px] text-center">
              <Button
                className="rounded bg-[#dc2626] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={url}
              >
                Confirm Account Deletion
              </Button>
            </Section>

            <Text className="text-[14px] leading-[24px] text-black">
              Or copy and paste this URL into your browser:{' '}
              <Link href={url} className="text-blue-600 no-underline">
                {url}
              </Link>
            </Text>

            <Text className="text-[14px] leading-[24px] text-black">
              This link will expire in 30 minutes and can only be used once.
            </Text>

            <Section className="my-[24px] rounded border border-solid border-[#fef3c7] bg-[#fffbeb] p-[16px]">
              <Text className="m-0 text-[14px] leading-[24px] text-[#92400e]">
                <strong>⚠️ Important:</strong> Once confirmed, this action
                cannot be reversed. All your data, including your profile,
                settings, and any associated content will be permanently removed
                from our servers.
              </Text>
            </Section>

            <Text className="text-[14px] leading-[24px] text-gray-500">
              If you didn&apos;t request this account deletion, please ignore
              this email and consider changing your password to secure your
              account.
            </Text>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  )
}
