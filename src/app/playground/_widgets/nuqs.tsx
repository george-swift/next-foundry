'use client'

import { Link2OffIcon, MousePointerClickIcon } from 'lucide-react'
import { parseAsInteger, useQueryState } from 'nuqs'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function formatNumber(num: number): string {
  if (num < 1000) return num.toString()
  if (num < 1000000) {
    const k = num / 1000
    return k % 1 === 0 ? `${k}K` : `${k.toFixed(1)}K`
  }
  if (num < 1000000000) {
    const m = num / 1000000
    return m % 1 === 0 ? `${m}M` : `${m.toFixed(1)}M`
  }
  const b = num / 1000000000
  return b % 1 === 0 ? `${b}B` : `${b.toFixed(1)}B`
}

export function Nuqs() {
  const [search, setSearch] = useQueryState('search', { defaultValue: '' })
  const [clicks, setClicks] = useQueryState(
    'clicks',
    parseAsInteger.withDefault(0)
  )

  const handleReset = () => {
    setSearch(null)
    setClicks(0)
  }

  return (
    <div className="px-0.75 pb-0.75 flex h-full w-full flex-col gap-2">
      <span className="text-muted-foreground text-balance">
        Enter a value in the search field and/or press the button labelled
        &quot;Clicks&quot; below. Then look at the URL.
      </span>

      <Input
        value={search}
        placeholder="Search..."
        onChange={e => setSearch(e.target.value || null)}
      />

      <div className="grid w-full grid-cols-2 gap-3">
        <Button onClick={() => setClicks(c => c + 1)} size="sm">
          <MousePointerClickIcon />
          Clicks: {formatNumber(clicks)}
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          size="sm"
          disabled={!search && clicks === 0}
        >
          <Link2OffIcon />
          Reset params
        </Button>
      </div>
    </div>
  )
}
