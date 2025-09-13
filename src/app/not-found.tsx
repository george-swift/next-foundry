import Link from 'next/link'
import { cn } from '@/lib/utils'

import { buttonVariants } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="mx-auto flex h-screen w-full max-w-[1140px] flex-col items-center justify-center gap-4 p-2.5 pt-16 sm:pt-32 lg:p-5">
      <p className="text-base font-semibold">404</p>
      <p className="text-4xl font-bold tracking-tight">Page not found</p>
      <p className="text-muted-foreground text-base">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <Link href="/" className={cn(buttonVariants({ variant: 'outline' }))}>
        Go back home
      </Link>
    </div>
  )
}
