import { NextResponse, userAgent, type NextRequest } from 'next/server'
import { geolocation, ipAddress } from '@vercel/functions'

export async function GET(request: NextRequest) {
  const ip = ipAddress(request)
  const { city, country, flag, latitude, longitude } = geolocation(request)
  const { device, browser, os } = userAgent(request)

  const visitorInfo = {
    ip: ip || 'Unknown',
    city: city || 'Unknown ',
    country: country || 'Unknown',
    flag,
    latitude,
    longitude,
    browser: browser.name + ' ' + (browser.version || '') || 'Unknown',
    os: os.name || 'Unknown',
    device: device.type ?? device.vendor
  }

  return NextResponse.json(visitorInfo)
}
