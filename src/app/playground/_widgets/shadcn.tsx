'use client'

import Link from 'next/link'
import dayjs from 'dayjs'
import {
  BadgeCheckIcon,
  BellRingIcon,
  CheckCircle2Icon,
  Share2Icon
} from 'lucide-react'
import { toast } from 'sonner'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

export function ShadcnUI() {
  return (
    <div className="px-0.75 relative flex h-full flex-col gap-4">
      <div className="grid grid-cols-[1fr_32px_78px] items-center gap-2 *:data-[slot=avatar]:grayscale">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Playground</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <Badge
          variant="secondary"
          className="bg-blue-500 text-white dark:bg-blue-600"
        >
          <BadgeCheckIcon />
          Verified
        </Badge>
      </div>

      <Alert>
        <CheckCircle2Icon />
        <AlertTitle>Success! Changes have been saved</AlertTitle>
        <AlertDescription className="text-xs">
          This is an alert with icon, title, and description.
        </AlertDescription>
      </Alert>

      <div className="flex items-center justify-between gap-3">
        <Select>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Options </SelectLabel>
              <SelectItem value="option-1">Option 1</SelectItem>
              <SelectItem value="option-2">Option 2</SelectItem>
              <SelectItem value="option-3">Option 3</SelectItem>
              <SelectItem value="option-4">Option 4</SelectItem>
              <SelectItem value="option-5">Option 5</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="flex items-center space-x-2 *:text-xs">
          <Label htmlFor="airplane-mode">Airplane Mode</Label>
          <Switch id="airplane-mode" />
        </div>
      </div>

      <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
        <Checkbox
          defaultChecked
          className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
        />
        <div className="grid gap-1.5 font-normal">
          <p className="text-sm font-medium leading-none">
            Enable notifications
          </p>
          <p className="text-muted-foreground text-xs">
            You can enable or disable notifications any time.
          </p>
        </div>
      </Label>

      <div className="mt-auto grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          onClick={() =>
            toast('Event has been created', {
              description: dayjs().format('dddd, MMM DD, YYYY [at] h:mm A'),
              action: {
                label: 'Undo',
                onClick: () => toast.dismiss()
              }
            })
          }
        >
          <BellRingIcon />
          Show Toast
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Share2Icon /> Share Link
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Share link</DialogTitle>
              <DialogDescription>
                Anyone who has this link will be able to view this.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center gap-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                  Link
                </Label>
                <Input
                  defaultValue="https://next-foundry.vercel.app/playground"
                  readOnly
                />
              </div>
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
