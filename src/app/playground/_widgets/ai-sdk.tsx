'use client'

import { useTransition } from 'react'
import { cn } from '@/lib/utils'
import { useChat } from '@ai-sdk/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { BotIcon, SendIcon, UserIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'

const FormSchema = z.object({
  message: z.string().min(1, {
    message: 'Message must be at least 1 character.'
  })
})

export function AIChat() {
  const { messages, sendMessage } = useChat()

  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
    reset
  } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: { message: '' }
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (isPending) return

    startTransition(async () => {
      await sendMessage({ text: data.message })
      reset()
    })
  }

  return (
    <div className="px-0.75 pb-0.75 flex h-full w-full flex-col">
      {/* Messages area */}
      <div className="min-h-0 flex-1">
        <ScrollArea className="h-full">
          <div className="space-y-2 pb-2">
            {messages.length === 0 ? (
              <div className="text-muted-foreground flex h-16 items-center justify-center">
                <div className="text-center">
                  <BotIcon className="mx-auto mb-2 size-6 opacity-50" />
                  <p className="text-sm">Start a conversation...</p>
                </div>
              </div>
            ) : (
              messages.map(message => (
                <div
                  key={message.id}
                  className={cn(
                    'flex gap-2',
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      'max-w-[80%] rounded-lg p-2 text-xs',
                      message.role === 'user'
                        ? 'bg-secondary text-secondary-foreground'
                        : 'bg-muted/50 border backdrop-blur-sm'
                    )}
                  >
                    <div className="mb-1 flex items-start gap-1">
                      {message.role === 'user' ? (
                        <UserIcon className="mt-0.5 size-3 shrink-0" />
                      ) : (
                        <BotIcon className="mt-0.5 size-3 shrink-0" />
                      )}
                      <span className="text-xs font-medium">
                        {message.role === 'user' ? 'You' : 'AI'}
                      </span>
                    </div>
                    <div className="whitespace-pre-wrap text-xs leading-relaxed">
                      {message.parts.map((part, i) => {
                        switch (part.type) {
                          case 'text':
                            return (
                              <span key={`${message.id}-${i}`}>
                                {part.text}
                              </span>
                            )
                          default:
                            return null
                        }
                      })}
                    </div>
                  </div>
                </div>
              ))
            )}
            {isPending && (
              <div className="flex justify-start">
                <div className="bg-muted/50 rounded-lg border p-2 backdrop-blur-sm">
                  <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
                    <BotIcon className="size-3 animate-pulse" />
                    <span>Thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Input area */}
      <div className="bg-background/50 backdrop-blur-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-1.5">
          <Input
            {...register('message')}
            placeholder="Ask me anything..."
            className="text-xs"
            disabled={isPending}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!isDirty || !isValid || isPending}
          >
            <SendIcon />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  )
}
