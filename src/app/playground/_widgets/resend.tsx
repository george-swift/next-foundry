'use client'

import { useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderIcon, MailPlusIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { buttonVariants } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { sendTestEmail } from '@/app/playground/actions/email'

const FormSchema = z.object({
  email: z.email({ message: 'Valid email address is required.' })
})

export function Email() {
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { email: '' }
  })

  const onSubmit = (formData: z.infer<typeof FormSchema>) => {
    startTransition(async () => {
      try {
        const { data, error } = await sendTestEmail(formData)

        if (error) {
          toast.error(error)
        } else {
          toast.success(data || 'Email sent successfully!')
          form.reset()
        }
      } catch {
        toast.error('Something went wrong. Please try again.')
      }
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="px-0.75 pb-0.75 flex size-full flex-col justify-end gap-2 pt-2.5"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="m@example.com" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <motion.button
            type="submit"
            disabled={isPending || !form.formState.isValid}
            className={buttonVariants({ className: 'w-full', size: 'sm' })}
            whileTap={{ scale: 0.95 }}
          >
            {isPending ? (
              <LoaderIcon className="animate-spin" />
            ) : (
              <>
                <MailPlusIcon />
                Send Email
              </>
            )}
          </motion.button>
        </div>
      </form>
    </Form>
  )
}
