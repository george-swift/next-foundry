import {
  Body,
  Head,
  Html,
  Preview,
  Section,
  Tailwind,
  Text
} from '@react-email/components'

export function ServiceTestTemplate() {
  return (
    <Html>
      <Head />
      <Preview>Email service test verification</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Section className="mx-auto my-[40px] w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Text className="text-[24px] font-normal text-black">
              Email service test on <strong>Next Foundry</strong>
            </Text>

            <Text className="text-[14px] leading-[24px] text-black">
              🧪 Hello there,
            </Text>

            <Text className="text-[14px] leading-[24px] text-black">
              This is a test email to verify that email delivery on Next Foundry
              is working properly.
            </Text>

            <Text className="text-[14px] leading-[24px] text-black">
              If you&apos;re reading this, then this test confirms that:
            </Text>

            <Text className="ml-4 text-[14px] leading-[24px] text-black">
              • Email templates are rendering properly
              <br />
              • SMTP configuration is working
              <br />
              • Rate limiting is in place
              <br />• Delivery tracking is active
            </Text>

            <Text className="text-[14px] leading-[24px] text-gray-500">
              You can safely ignore this email. No action is required on your
              part.
            </Text>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  )
}
