"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Briefcase, Star, ExternalLink, Filter, Globe, Zap, Bot, TrendingUp } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const mockProfiles = [
  {
    id: 1,
    name: "Alex Thompson",
    title: "Senior Full Stack Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    experience: "6 years",
    skills: ["React", "Node.js", "Python", "AWS", "Docker"],
    rating: 4.8,
    availability: "Open to opportunities",
    profileUrl: "https://linkedin.com/in/alexthompson",
    avatar: "/professional-male-developer.png",
    source: "LinkedIn",
    lastActive: "2 days ago",
    salaryRange: "$140k - $160k",
  },
  {
    id: 2,
    name: "Maria Garcia",
    title: "DevOps Engineer",
    company: "CloudSystems Ltd.",
    location: "Austin, TX",
    experience: "4 years",
    skills: ["Kubernetes", "Terraform", "Jenkins", "AWS", "Python"],
    rating: 4.9,
    availability: "Actively looking",
    profileUrl: "https://linkedin.com/in/mariagarcia",
    avatar: "/professional-female-engineer.png",
    source: "GitHub",
    lastActive: "1 day ago",
    salaryRange: "$120k - $140k",
  },
  {
    id: 3,
    name: "David Kim",
    title: "Data Scientist",
    company: "Analytics Pro",
    location: "Seattle, WA",
    experience: "5 years",
    skills: ["Python", "TensorFlow", "SQL", "R", "Machine Learning"],
    rating: 4.7,
    availability: "Open to opportunities",
    profileUrl: "https://linkedin.com/in/davidkim",
    avatar: "/professional-male-data-scientist.png",
    source: "Stack Overflow",
    lastActive: "5 hours ago",
    salaryRange: "$130k - $150k",
  },
  {
    id: 4,
    name: "Jennifer Liu",
    title: "UX/UI Designer",
    company: "Design Studio",
    location: "New York, NY",
    experience: "7 years",
    skills: ["Figma", "Adobe Creative Suite", "Prototyping", "User Research", "Design Systems"],
    rating: 4.9,
    availability: "Actively looking",
    profileUrl: "https://linkedin.com/in/jenniferliu",
    avatar: "/professional-female-designer.png",
    source: "Dribbble",
    lastActive: "3 hours ago",
    salaryRange: "$110k - $130k",
  },
]

export function TalentSourcing() {
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("")
  const [experience, setExperience] = useState("")
  const [profiles, setProfiles] = useState(mockProfiles)
  const [isSearching, setIsSearching] = useState(false)
  const [webScrapingActive, setWebScrapingActive] = useState(false)
  const { toast } = useToast()

  const handleSearch = async () => {
    setIsSearching(true)
    setWebScrapingActive(true)

    // Simulate AI-powered web scraping and parsing
    setTimeout(() => {
      setIsSearching(false)
      toast({
        title: "AI Web Scraping Complete",
        description: `Found ${profiles.length} candidates across LinkedIn, GitHub, Stack Overflow, and more`,
      })
    }, 3000)
  }

  const activateWebScraping = () => {
    setWebScrapingActive(true)
    toast({
      title: "Web Scraping Module Activated",
      description: "AI is now scanning public profiles across multiple platforms",
    })
  }

  const getRatingStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
      />
    ))
  }

  const getAvailabilityColor = (availability: string) => {
    return availability === "Actively looking" ? "text-emerald-600" : "text-blue-600"
  }

  const getSourceBadge = (source: string) => {
    const colors = {
      LinkedIn: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      GitHub: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
      "Stack Overflow": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      Dribbble: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
    }
    return colors[source as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="gradient-card rounded-xl p-8 shadow-premium">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">Smart Talent Sourcing</h1>
            <p className="text-muted-foreground text-lg">
              AI-powered web scraping + parsing from LinkedIn, GitHub, Stack Overflow & more
            </p>
          </div>
          <div className="flex gap-3">
            <Button onClick={activateWebScraping} variant="outline" className="glass-effect bg-transparent">
              <Globe className="h-4 w-4 mr-2" />
              Web Scraping
            </Button>
            <Button onClick={handleSearch} disabled={isSearching} className="gradient-primary">
              <Zap className="h-4 w-4 mr-2" />
              {isSearching ? "AI Searching..." : "AI Search"}
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Search Filters */}
      <Card className="shadow-premium">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            Advanced Search Criteria
          </CardTitle>
          <CardDescription>AI-powered candidate discovery with multi-platform integration</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label htmlFor="role" className="font-semibold">
                Role/Keywords
              </Label>
              <Input
                id="role"
                placeholder="e.g., Full Stack Developer"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="font-semibold">
                Location
              </Label>
              <Input
                id="location"
                placeholder="e.g., San Francisco, CA"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label className="font-semibold">Experience Level</Label>
              <Select value={experience} onValueChange={setExperience}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                  <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                  <SelectItem value="senior">Senior Level (6-10 years)</SelectItem>
                  <SelectItem value="lead">Lead/Principal (10+ years)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="font-semibold">Skills</Label>
              <Input placeholder="e.g., React, Python, AWS" className="h-11" />
            </div>
          </div>

          {/* Platform Selection */}
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg">
            <Label className="font-semibold mb-3 block">Data Sources (AI Web Scraping)</Label>
            <div className="flex flex-wrap gap-3">
              {["LinkedIn", "GitHub", "Stack Overflow", "Dribbble", "AngelList", "Behance"].map((platform) => (
                <Badge
                  key={platform}
                  variant="outline"
                  className="px-3 py-1 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {platform}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button onClick={handleSearch} disabled={isSearching} className="gradient-primary">
              <Search className="h-4 w-4 mr-2" />
              {isSearching ? "AI Searching..." : "Smart Search"}
            </Button>
            <Button variant="outline" className="glass-effect bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
          </div>

          {/* Web Scraping Status */}
          {webScrapingActive && (
            <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-950 rounded-lg border border-emerald-200 dark:border-emerald-800">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="h-4 w-4 text-emerald-600 animate-pulse" />
                <span className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">
                  Web Scraping Active
                </span>
              </div>
              <p className="text-xs text-emerald-700 dark:text-emerald-300">
                AI is scanning LinkedIn, GitHub, Stack Overflow, and other platforms for matching profiles
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Enhanced Search Results */}
      <Card className="shadow-premium">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <TrendingUp className="h-6 w-6 text-primary" />
                AI-Sourced Candidate Profiles
              </CardTitle>
              <CardDescription className="text-base">
                Multi-platform candidate discovery with AI parsing and analysis
              </CardDescription>
            </div>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              {profiles.length} candidates found
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {profiles.map((profile) => (
              <div
                key={profile.id}
                className="border border-border rounded-xl p-6 gradient-card hover:shadow-premium transition-all"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={profile.avatar || "/placeholder.svg"}
                    alt={profile.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-lg">{profile.name}</h3>
                        <p className="text-sm text-muted-foreground font-medium">{profile.title}</p>
                        <Badge className={`text-xs mt-1 ${getSourceBadge(profile.source)}`}>{profile.source}</Badge>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          {getRatingStars(profile.rating)}
                          <span className="text-sm text-muted-foreground ml-1">{profile.rating}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Last active: {profile.lastActive}</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Briefcase className="h-4 w-4" />
                        <span>
                          {profile.company} • {profile.experience}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{profile.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <TrendingUp className="h-4 w-4" />
                        <span>{profile.salaryRange}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {profile.skills.slice(0, 4).map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs px-2 py-1">
                            {skill}
                          </Badge>
                        ))}
                        {profile.skills.length > 4 && (
                          <Badge variant="outline" className="text-xs px-2 py-1">
                            +{profile.skills.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className={`text-sm font-semibold ${getAvailabilityColor(profile.availability)}`}>
                        {profile.availability}
                      </span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="glass-effect bg-transparent">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Profile
                        </Button>
                        <Button size="sm" className="gradient-primary">
                          <Star className="h-4 w-4 mr-2" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced AI Insights */}
      <Card className="shadow-premium">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            AI Market Intelligence & Insights
          </CardTitle>
          <CardDescription>Real-time market analysis and sourcing recommendations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-xl">
              <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-3 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Market Demand
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-200 mb-2">
                High demand for Full Stack Developers in your area
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-300">
                Average salary: $120k-$150k • 23% increase from last year
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 rounded-xl">
              <h4 className="font-bold text-emerald-900 dark:text-emerald-100 mb-3 flex items-center gap-2">
                <Star className="h-5 w-5" />
                Top Skills
              </h4>
              <p className="text-sm text-emerald-700 dark:text-emerald-200 mb-2">
                React, Node.js, and AWS are most sought-after
              </p>
              <p className="text-xs text-emerald-600 dark:text-emerald-300">
                87% of candidates have these skills in your search results
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 rounded-xl">
              <h4 className="font-bold text-purple-900 dark:text-purple-100 mb-3 flex items-center gap-2">
                <Bot className="h-5 w-5" />
                AI Recommendation
              </h4>
              <p className="text-sm text-purple-700 dark:text-purple-200 mb-2">
                Expand search to include remote candidates
              </p>
              <p className="text-xs text-purple-600 dark:text-purple-300">
                Could increase talent pool by 340% with similar quality
              </p>
            </div>
          </div>

          {/* Platform Analytics */}
          <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 rounded-xl">
            <h4 className="font-bold mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Platform Performance Analytics
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">47%</p>
                <p className="text-xs text-muted-foreground">LinkedIn Success</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-600">23%</p>
                <p className="text-xs text-muted-foreground">GitHub Profiles</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">18%</p>
                <p className="text-xs text-muted-foreground">Stack Overflow</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-pink-600">12%</p>
                <p className="text-xs text-muted-foreground">Other Platforms</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
