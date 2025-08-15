"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Menu, Bell } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface TopNavbarProps {
  moduleName: string
  onToggleSidebar: () => void
}

export function TopNavbar({ moduleName, onToggleSidebar }: TopNavbarProps) {
  const [isAuthed, setIsAuthed] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check token on mount
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
    setIsAuthed(!!token)
    // Listen to storage changes across tabs
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'auth_token') setIsAuthed(!!e.newValue)
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  function handleLogout() {
    localStorage.removeItem('auth_token')
    setIsAuthed(false)
    router.push('/sign-in')
  }
  return (
    <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onToggleSidebar} className="lg:hidden">
          <Menu className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold text-foreground">{moduleName}</h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-10 w-64" />
        </div>

        <Button variant="ghost" size="sm">
          <Bell className="h-4 w-4" />
        </Button>

        {/* Auth actions */}
        <div className="hidden sm:flex items-center gap-2">
          {isAuthed ? (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link href="/profile">Profile</Link>
              </Button>
              <Button size="sm" variant="destructive" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/sign-in">Sign in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/sign-up">Sign up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Avatar removed as requested */}
      </div>
    </header>
  )
}
