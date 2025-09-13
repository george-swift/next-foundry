import { Fragment } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  CalendarClockIcon,
  ChartColumnBigIcon,
  DoorOpenIcon,
  FingerprintIcon,
  LeafIcon,
  LibraryIcon,
  Link2Icon,
  MailIcon,
  ShieldCheckIcon,
  SparklesIcon,
  TriangleIcon
} from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import { MotionIcon, ShadcnIcon } from '@/app/playground/_components/icons'
import { ThemeSwitcher } from '@/app/playground/_components/theme-switcher'
import { AIChat } from '@/app/playground/_widgets/ai-sdk'
import { Login } from '@/app/playground/_widgets/auth'
import { DateTime } from '@/app/playground/_widgets/datetime'
import { Lucide } from '@/app/playground/_widgets/lucide'
import { Map } from '@/app/playground/_widgets/map'
import { Metadata } from '@/app/playground/_widgets/metadata'
import { Motion } from '@/app/playground/_widgets/motion'
import { Nuqs } from '@/app/playground/_widgets/nuqs'
import { RateLimit } from '@/app/playground/_widgets/rate-limit'
import { ChartArea } from '@/app/playground/_widgets/rechart'
import { Email } from '@/app/playground/_widgets/resend'
import { ShadcnUI } from '@/app/playground/_widgets/shadcn'
import {
  Widget,
  WidgetBody,
  WidgetHeader
} from '@/app/playground/_widgets/shell'

interface PlaygroundWidgetMeta {
  id: string
  size?: 'lg'
  icon: React.ReactNode
  title: string
  subtitle: string
  body: React.ReactNode
}

interface WidgetRowPairMeta {
  type: 'pair'
  widgets: PlaygroundWidgetMeta[] // exactly two
}

interface WidgetRowSingleMeta {
  type: 'single'
  widget: PlaygroundWidgetMeta
}

type WidgetRowMeta = WidgetRowPairMeta | WidgetRowSingleMeta

// Column 1 configuration (left)
const column1: WidgetRowMeta[] = [
  {
    type: 'pair',
    widgets: [
      {
        id: 'datetime',
        icon: <CalendarClockIcon className="size-3" />,
        title: 'day.js',
        subtitle: 'Datetime',
        body: <DateTime />
      },
      {
        id: 'metadata',
        icon: <TriangleIcon className="fill-foreground size-3" />,
        title: 'vercel',
        subtitle: 'Metadata',
        body: <Metadata />
      }
    ]
  },
  {
    type: 'single',
    widget: {
      id: 'login',
      size: 'lg',
      icon: <FingerprintIcon className="size-3" />,
      title: 'better-auth',
      subtitle: 'Authentication Framework',
      body: <Login />
    }
  },
  {
    type: 'pair',
    widgets: [
      {
        id: 'email',
        icon: <MailIcon className="size-3" />,
        title: 'resend',
        subtitle: 'Email Service',
        body: <Email />
      },
      {
        id: 'rate-limit',
        icon: <ShieldCheckIcon className="size-3" />,
        title: 'upstash',
        subtitle: 'Rate Limiter',
        body: <RateLimit />
      }
    ]
  }
]

// Column 2 configuration (middle)
const column2: WidgetRowMeta[] = [
  {
    type: 'single',
    widget: {
      id: 'ai-chat',
      icon: <SparklesIcon className="size-3" />,
      title: 'ai-sdk',
      subtitle: 'AI Toolkit',
      body: <AIChat />
    }
  },
  {
    type: 'single',
    widget: {
      id: 'chart',
      icon: <ChartColumnBigIcon className="size-3" />,
      title: 'recharts',
      subtitle: 'Chart Library',
      body: <ChartArea />
    }
  },
  {
    type: 'single',
    widget: {
      id: 'shadcn',
      size: 'lg',
      icon: <ShadcnIcon />,
      title: 'shadcn',
      subtitle: 'Accessible Components',
      body: <ShadcnUI />
    }
  }
]

// Column 3 configuration (right)
const column3: WidgetRowMeta[] = [
  {
    type: 'single',
    widget: {
      id: 'motion',
      size: 'lg',
      icon: <MotionIcon />,
      title: 'motion',
      subtitle: 'Animation Library',
      body: <Motion />
    }
  },
  {
    type: 'single',
    widget: {
      id: 'nuqs',
      icon: <Link2Icon className="size-3" />,
      title: 'nuqs',
      subtitle: 'URL State Manager',
      body: <Nuqs />
    }
  },
  {
    type: 'pair',
    widgets: [
      {
        id: 'lucide',
        icon: <LibraryIcon className="size-3" />,
        title: 'lucide',
        subtitle: 'Icon Library',
        body: <Lucide />
      },
      {
        id: 'map',
        icon: <LeafIcon className="size-3" />,
        title: 'leaflet',
        subtitle: 'Maps',
        body: <Map />
      }
    ]
  }
]

function renderWidget(meta: PlaygroundWidgetMeta) {
  return (
    <Widget key={meta.id} size={meta.size}>
      <WidgetHeader>
        {meta.icon}
        <h3 className="text-xs font-medium">{meta.title}</h3>
        <p className="text-muted-foreground ml-auto text-xs">{meta.subtitle}</p>
      </WidgetHeader>
      <WidgetBody>{meta.body}</WidgetBody>
    </Widget>
  )
}

function renderColumn(rows: WidgetRowMeta[]) {
  return rows.map(row => {
    if (row.type === 'single') {
      return <Fragment key={row.widget.id}>{renderWidget(row.widget)}</Fragment>
    }
    // pair
    return (
      <div
        key={row.widgets.map(w => w.id).join('-')}
        className="lg:gap-5.5 grid grid-cols-2 gap-2.5"
      >
        {row.widgets.map(w => renderWidget(w))}
      </div>
    )
  })
}

export default function Playground() {
  return (
    <div className="flex min-h-screen justify-center max-lg:pt-5">
      <ThemeSwitcher />

      <div className="w-full max-w-[1140px] p-2.5 lg:p-5">
        <div className="lg:gap-5.5 grid grid-cols-1 grid-rows-[60px_1fr] gap-3.5">
          {/* Header */}
          <header className="bg-background sticky top-0 z-[9999] flex h-full items-center justify-between gap-4 border-b py-2.5">
            <hgroup>
              <h2 className="text-md font-bold">Next Foundry Playground</h2>
              <p className="text-muted-foreground hidden text-xs sm:block">
                Experiment with auth, email, rate limits, UI, and more.
              </p>
            </hgroup>

            <Link
              href="/"
              className={cn(
                buttonVariants({
                  variant: 'outline',
                  size: 'sm',
                  className: 'rounded-2xl'
                })
              )}
            >
              <DoorOpenIcon /> Back to Home
            </Link>
          </header>

          {/* Main bento area */}
          <main className="lg:gap-5.5 grid size-full grid-cols-1 gap-3.5 lg:grid-cols-3">
            {/* Column 1 */}
            <div className="lg:gap-5.5 grid size-full gap-2.5">
              <div className="lg:gap-5.5 col-span-1 grid gap-2.5">
                {renderColumn(column1)}
              </div>
            </div>

            {/* Column 2 */}
            <div className="lg:gap-5.5 col-span-1 grid gap-2.5">
              {renderColumn(column2)}
            </div>

            {/* Column 3 */}
            <div className="lg:gap-5.5 grid size-full gap-2.5">
              {renderColumn(column3)}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
