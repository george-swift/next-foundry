'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { MapPinIcon } from 'lucide-react'

const MapContainer = dynamic(() => import('../_components/map'), { ssr: false })

interface AnalyticsData {
  ip?: string
  city?: string
  country?: string
  flag?: string
  latitude?: string
  longitude?: string
  browser?: string
  os?: string
  device?: string
}

// NOTE:
// 1. We try (in order): server-provided analytics geo -> browser geolocation API -> DEFAULT_LOCATION.
// 2. Geolocation is OPTIONAL. If blocked it or it's unavailable (SSR, bots, privacy mode),
//    we gracefully fall back to a neutral default so the map always renders.
// 3. Widget is kept predictable for a starter template while illustrating progressive enhancement.
const DEFAULT_LOCATION: AnalyticsData = {
  latitude: '37.7749',
  longitude: ' -122.4194',
  city: 'San Francisco',
  country: 'US',
  flag: '🇺🇸'
}

export function Map() {
  const [location, setLocation] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    const resolveWith = (loc: AnalyticsData) => {
      if (!cancelled) setLocation(loc)
    }

    const hydrate = async () => {
      try {
        const response = await fetch('/api/analytics')
        const data: AnalyticsData = await response.json()
        if (data.latitude && data.longitude) {
          resolveWith(data)
          return
        }
        // Attempt browser geolocation only if analytics lacked coords
        if (typeof navigator !== 'undefined' && navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            pos => {
              resolveWith({
                latitude: pos.coords.latitude.toString(),
                longitude: pos.coords.longitude.toString(),
                city: 'Your Location',
                country: 'Unknown'
              })
            },
            () => resolveWith(DEFAULT_LOCATION),
            { timeout: 6000 }
          )
        } else {
          resolveWith(DEFAULT_LOCATION)
        }
      } catch {
        // Any network / parsing issue -> default fallback (privacy-friendly & resilient)
        resolveWith(DEFAULT_LOCATION)
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }
    hydrate()
    return () => {
      cancelled = true
    }
  }, [])

  if (isLoading) {
    return (
      <div className="flex size-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <MapPinIcon className="text-muted-foreground size-6 animate-pulse" />
          <p className="text-muted-foreground text-xs">Loading map...</p>
        </div>
      </div>
    )
  }

  if (!location?.latitude || !location?.longitude) {
    return (
      <div className="flex size-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <MapPinIcon className="text-muted-foreground size-6" />
          <p className="text-muted-foreground text-xs">Location unavailable</p>
        </div>
      </div>
    )
  }

  const lat = parseFloat(location.latitude)
  const lng = parseFloat(location.longitude)

  return (
    <div className="size-full overflow-hidden rounded-md">
      <MapContainer lat={lat} lng={lng} />
    </div>
  )
}
