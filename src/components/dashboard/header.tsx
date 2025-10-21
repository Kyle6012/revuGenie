'use client'

import { Bell, Search, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useSession } from 'next-auth/react'

export function DashboardHeader() {
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center flex-1 gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search reviews, customers, or businesses..."
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Business
          </Button>
          
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          
          <Avatar>
            <AvatarImage src={session?.user?.image || ''} />
            <AvatarFallback>
              {session?.user?.name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}