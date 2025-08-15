"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type User = { id: string; name: string; email: string }

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("auth_token")
    if (!token) {
      router.replace("/sign-in")
      return
    }
    const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"
    fetch(`${base}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        const data = await res.json()
        if (!res.ok) throw new Error(data?.error || "Failed to load profile")
        setUser(data.user)
      })
      .catch((e) => setError(e.message))
  }, [router])

  function handleLogout() {
    localStorage.removeItem("auth_token")
    router.push("/sign-in")
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Profile</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
          {user ? (
            <div className="space-y-3">
              <div>
                <div className="text-sm text-muted-foreground">Name</div>
                <div className="text-base font-medium">{user.name}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Email</div>
                <div className="text-base font-medium">{user.email}</div>
              </div>
              <Button variant="destructive" onClick={handleLogout}>Logout</Button>
            </div>
          ) : (
            !error && <p>Loading...</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
