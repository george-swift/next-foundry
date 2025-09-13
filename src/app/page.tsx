import Link from 'next/link'
import { cn } from '@/lib/utils'
import { BookOpenTextIcon, BoxIcon } from 'lucide-react'
import { Variants } from 'motion'
import * as motion from 'motion/react-client'

import { buttonVariants } from '@/components/ui/button'

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3
    }
  }
}

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' }
  }
}

export default function Home() {
  return (
    <div className="dark min-h-full bg-black">
      <main className="flex h-screen w-screen flex-col items-center justify-center gap-8 p-8 pb-20 sm:p-20">
        <motion.hgroup
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h1
            variants={item}
            className="text-muted-foreground text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl"
          >
            What&apos;s in{' '}
            <motion.span variants={item} className="text-foreground">
              Next Foundry?
            </motion.span>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-muted-foreground mt-4 max-w-2xl text-lg font-medium max-lg:text-balance sm:text-xl"
          >
            Production-ready Next.js + TypeScript starter to build and launch
            faster. Best practices baked in. Ship an MVP in{' '}
            <span className="italic line-through">weeks</span> days.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex w-full max-w-2xl items-center gap-3"
          >
            <Link
              href="/playground"
              className={cn(buttonVariants({ size: 'lg' }))}
            >
              <BoxIcon />
              Playground
            </Link>
            <a
              href="https://github.com/george-swift/next-foundry"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ size: 'lg', variant: 'outline' }),
                'text-foreground'
              )}
            >
              <BookOpenTextIcon />
              Documentation
            </a>
          </motion.div>
        </motion.hgroup>
      </main>
    </div>
  )
}
