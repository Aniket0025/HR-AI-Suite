"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

type Links = { linkedin?: string; slack?: string; website?: string }
type User = {
  id: string
  name: string
  email: string
  title?: string
  bio?: string
  location?: string
  experienceYears?: number
  department?: string
  reportsTo?: string
  skills?: string[]
  badges?: string[]
  links?: Links
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()
  const [tab, setTab] = useState<string>("overview")

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

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!user) return
    const form = e.currentTarget
    const fd = new FormData(form)

    const payload: Partial<User> = {
      name: String(fd.get("name") || user.name),
      title: String(fd.get("title") || ""),
      bio: String(fd.get("bio") || ""),
      location: String(fd.get("location") || ""),
      experienceYears: fd.get("experienceYears") ? Number(fd.get("experienceYears")) : undefined,
      department: String(fd.get("department") || ""),
      reportsTo: String(fd.get("reportsTo") || ""),
      links: {
        linkedin: String(fd.get("linkedin") || ""),
        slack: String(fd.get("slack") || ""),
        website: String(fd.get("website") || ""),
      },
    }

    const token = localStorage.getItem("auth_token")
    const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"
    try {
      const res = await fetch(`${base}/api/users/me`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Failed to save profile")
      setUser(data.user)
      toast({ title: "Profile updated" })
      setTab("overview")
    } catch (err: any) {
      toast({ title: "Update failed", description: err?.message || String(err) })
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/professional-avatar.png" alt={user?.name || "User"} />
              <AvatarFallback>
                {user?.name?.split(" ").map(n => n[0]).slice(0,2).join("") || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-semibold leading-none tracking-tight">{user?.name || "Your Name"}</h1>
              <p className="text-sm text-muted-foreground">{user?.email || "name@example.com"}</p>
              {user?.title && <p className="text-sm text-muted-foreground">{user.title}</p>}
              <div className="mt-2 flex flex-wrap gap-2">
                {(user?.badges?.length ? user.badges : ["HR Specialist", "Open to opportunities"]).map((b) => (
                  <Badge key={b} variant={b === "Open to opportunities" ? "outline" : "secondary"}>{b}</Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push("/")}>Back to Home</Button>
            <Button variant="destructive" onClick={handleLogout}>Logout</Button>
          </div>
        </div>

        <Separator />

        {error && (
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-red-600">{error}</p>
            </CardContent>
          </Card>
        )}

        {!user && !error && (
          <Card>
            <CardContent className="pt-6">
              <p>Loading profile...</p>
            </CardContent>
          </Card>
        )}

        {user && (
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>About</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      {user.bio || "Add a short professional summary in Settings."}
                    </p>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <div className="text-xs text-muted-foreground">Location</div>
                        <div className="text-sm font-medium">{user.location || "—"}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Experience</div>
                        <div className="text-sm font-medium">{user.experienceYears != null ? `${user.experienceYears}+ years` : "—"}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Department</div>
                        <div className="text-sm font-medium">{user.department || "—"}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Reports To</div>
                        <div className="text-sm font-medium">{user.reportsTo || "—"}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {(user.skills?.length ? user.skills : [
                        "Talent Sourcing",
                        "Interviewing",
                        "HR Analytics",
                        "L&D",
                        "Compliance",
                        "Employer Branding",
                      ]).map((s) => (
                        <Badge key={s} variant="secondary">{s}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-1">
                  <CardHeader>
                    <CardTitle>Contact</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <div className="text-xs text-muted-foreground">Email</div>
                      <div className="text-sm font-medium break-all">{user.email}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Slack</div>
                      <div className="text-sm font-medium">{user.links?.slack ? `@${user.links.slack}` : `@${user.name?.split(" ")[0]?.toLowerCase() || "user"}`}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">LinkedIn</div>
                      <div className="text-sm font-medium">{user.links?.linkedin || "linkedin.com/in/your-profile"}</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                      {[
                        { label: "Open Roles", value: 12 },
                        { label: "Hires this Q", value: 8 },
                        { label: "Interviews", value: 34 },
                        { label: "NPS", value: "78" },
                      ].map((stat) => (
                        <div key={stat.label} className="rounded-md border p-4 text-center">
                          <div className="text-2xl font-semibold">{stat.value}</div>
                          <div className="text-xs text-muted-foreground">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSave} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" name="name" defaultValue={user.name} placeholder="Your full name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input id="title" name="title" defaultValue={user.title || ""} placeholder="e.g., HR Specialist" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" name="location" defaultValue={user.location || ""} placeholder="City, Country" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experienceYears">Experience (years)</Label>
                      <Input id="experienceYears" name="experienceYears" type="number" min={0} max={60} defaultValue={user.experienceYears ?? ""} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input id="department" name="department" defaultValue={user.department || ""} placeholder="People & Culture" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reportsTo">Reports To</Label>
                      <Input id="reportsTo" name="reportsTo" defaultValue={user.reportsTo || ""} placeholder="Manager's name" />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea id="bio" name="bio" defaultValue={user.bio || ""} placeholder="A short professional summary" rows={4} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input id="linkedin" name="linkedin" defaultValue={user.links?.linkedin || ""} placeholder="linkedin.com/in/username" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="slack">Slack</Label>
                      <Input id="slack" name="slack" defaultValue={user.links?.slack || ""} placeholder="your-slack-handle" />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="website">Website</Label>
                      <Input id="website" name="website" defaultValue={user.links?.website || ""} placeholder="https://example.com" />
                    </div>
                    <div className="sm:col-span-2 flex justify-end gap-2">
                      <Button type="reset" variant="outline">Cancel</Button>
                      <Button type="submit">Save Changes</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}
