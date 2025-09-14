'use client'

import { Button } from '@/components/ui/button'

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto flex h-screen w-full max-w-[1140px] flex-col items-center justify-center gap-4 p-2.5 pt-16 sm:pt-32 lg:p-5">
      <p className="text-4xl font-bold tracking-tight">Something went wrong!</p>
      <Button onClick={() => reset()} variant="outline">
        Try again
      </Button>
    </div>
  )
}
