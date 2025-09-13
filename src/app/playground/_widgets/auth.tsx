'use client'

import { useState, useTransition } from 'react'
import { signIn, signOut, useSession } from '@/lib/auth-client'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  GalleryVerticalEndIcon,
  Loader2Icon,
  LogOutIcon,
  TrashIcon,
  UserIcon
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { GoogleIcon } from '@/app/playground/_components/icons'
import { deleteAccount, sendMagicLink } from '@/app/playground/actions/auth'

const FormSchema = z.object({
  email: z.email({ message: 'Valid email address is required.' })
})

export function Login() {
  const [isPending, startTransition] = useTransition()

  const { data: session, isPending: sessionLoading } = useSession()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { email: '' }
  })

  const handleMagicLink = async (formData: z.infer<typeof FormSchema>) => {
    startTransition(async () => {
      try {
        const { data, error } = await sendMagicLink(formData)

        if (data) {
          toast.success(data)
          sessionStorage.setItem('magicLinkEmail', formData.email)
          form.reset()
        } else {
          toast.error(error)
        }
      } catch {
        toast.error('Something went wrong. Please try again.')
      }
    })
  }

  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn.social({
        provider: 'google',
        callbackURL: '/playground'
      })
    } catch {
      toast.error('Failed to sign in with Google. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = async () => {
    startTransition(async () => {
      try {
        await signOut({
          fetchOptions: {
            onSuccess: () => {
              toast.success('Signed out successfully')
            }
          }
        })
      } catch {
        toast.error('Failed to sign out. Please try again.')
      }
    })
  }

  const handleDeleteAccount = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await deleteAccount()

      if (data) {
        toast.success(data)
      } else {
        toast.error(error)
      }
    } catch {
      toast.error('Failed to delete account. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (sessionLoading) {
    return (
      <div className="flex size-full items-center justify-center">
        <Loader2Icon className="size-6 animate-spin" />
      </div>
    )
  }

  if (session?.user) {
    const user = session.user

    return (
      <Card className="w-full">
        <CardHeader className="pb-3">
          <div className="flex flex-col items-center justify-between gap-3">
            <Avatar className="size-16">
              <AvatarImage
                src={user.image || undefined}
                alt={user.name || user.email}
              />
              <AvatarFallback>
                <UserIcon className="size-6" />
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1 space-y-0.5 text-center">
              {user.name && (
                <p className="line-clamp-1 truncate text-sm font-medium">
                  {user.name}
                </p>
              )}
              <p className="text-muted-foreground line-clamp-1 truncate text-sm">
                {user.email}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="w-full"
            size="sm"
          >
            {isPending ? (
              <Loader2Icon className="animate-spin" aria-hidden="true" />
            ) : (
              <>
                <LogOutIcon />
                Sign Out
              </>
            )}
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full" size="sm">
                <TrashIcon />
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  disabled={isLoading}
                  className="bg-red-600 text-white hover:bg-red-700"
                >
                  {isLoading ? (
                    <Loader2Icon className="animate-spin" aria-hidden="true" />
                  ) : (
                    <>
                      <LogOutIcon />
                      Delete Account
                    </>
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="px-0.75 pb-0.75 flex size-full flex-col justify-center gap-4 pt-1">
      <div className="flex flex-col items-center gap-2">
        <a href="#" className="flex flex-col items-center gap-2 font-medium">
          <div className="flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEndIcon className="size-6" />
          </div>
          <span className="sr-only">the Foundry.</span>
        </a>
        <h1 className="text-xl font-bold">Sign in to your account</h1>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleMagicLink)}
          className="space-y-3"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" disabled={isPending || isLoading}>
            {isPending ? (
              <Loader2Icon className="animate-spin" aria-hidden="true" />
            ) : (
              'Continue with Email'
            )}
          </Button>
        </form>
      </Form>

      <div className="relative flex items-center">
        <div className="border-border flex-1 border-t"></div>
        <span className="text-muted-foreground px-2 text-sm uppercase">Or</span>
        <div className="border-border flex-1 border-t"></div>
      </div>

      <Button
        variant="outline"
        type="button"
        className="w-full"
        onClick={handleGoogleSignIn}
        disabled={isLoading}
      >
        <GoogleIcon />
        Continue with Google
      </Button>
    </div>
  )
}
