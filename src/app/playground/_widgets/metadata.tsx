'use client'

import { useEffect, useState } from 'react'
import {
  ActivityIcon,
  AppleIcon,
  ChromeIcon,
  GlobeIcon,
  MapPinIcon,
  MonitorIcon,
  SmartphoneIcon,
  TabletIcon,
  WifiIcon
} from 'lucide-react'

interface Metadata {
  ip: string
  city: string
  country: string
  flag: string
  browser: string
  os: string
  device: string
}

export function Metadata() {
  const [metadata, setMetadata] = useState<Metadata | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchMetadata() {
      try {
        const response = await fetch('/api/metadata')
        if (!response.ok) {
          throw new Error('Failed to fetch metadata')
        }
        const data = await response.json()
        setMetadata(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchMetadata()
  }, [])

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType.toLowerCase()) {
      case 'mobile':
        return <SmartphoneIcon className="text-muted-foreground size-3" />
      case 'tablet':
        return <TabletIcon className="text-muted-foreground size-3" />
      default:
        return <MonitorIcon className="text-muted-foreground size-3" />
    }
  }

  const getBrowserIcon = (browserName: string) => {
    const name = browserName.toLowerCase()
    if (name.includes('chrome') || name.includes('chromium')) {
      return <ChromeIcon className="text-muted-foreground size-3" />
    }
    if (name.includes('safari')) {
      return <AppleIcon className="text-muted-foreground size-3" />
    }
    return <GlobeIcon className="text-muted-foreground size-3" />
  }

  if (loading) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2">
        <ActivityIcon className="size-4 animate-pulse" />
        <span className="text-xs">Loading analytics...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-muted-foreground flex h-full w-full flex-col items-center justify-center gap-2">
        <ActivityIcon className="mx-auto size-4" />
        <p className="text-xs">Analytics unavailable</p>
      </div>
    )
  }

  if (!metadata) return null

  return (
    <div className="flex size-full flex-col justify-center gap-2.5 font-mono text-xs">
      {/* Location */}
      <div className="flex items-center gap-1.5">
        <MapPinIcon className="text-muted-foreground size-3 shrink-0" />
        <div className="flex min-w-0 items-center gap-1">
          <span className="truncate">{metadata.city}</span>
          <span className="text-muted-foreground">{metadata.flag}</span>
        </div>
      </div>

      {/* IP Address */}
      <div className="flex items-center gap-1.5">
        <WifiIcon className="text-muted-foreground size-3 shrink-0" />
        <span>{metadata.ip}</span>
      </div>

      {/* Browser */}
      <div className="flex items-center gap-1.5">
        {getBrowserIcon(metadata.browser)}
        <span className="text-xs">{metadata.browser}</span>
      </div>

      {/* Device & OS */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          {getDeviceIcon(metadata.device)}
          <span className="capitalize">{metadata.device}</span>
          <span>{metadata.os}</span>
        </div>
      </div>
    </div>
  )
}
