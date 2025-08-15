"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Heart, Brain, Activity, Smile, TrendingUp, Calendar, MessageCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const mockWellnessData = [
  { date: "2024-01-01", stress: 6, mood: 7, energy: 6, sleep: 7 },
  { date: "2024-01-02", stress: 5, mood: 8, energy: 7, sleep: 8 },
  { date: "2024-01-03", stress: 7, mood: 6, energy: 5, sleep: 6 },
  { date: "2024-01-04", stress: 4, mood: 8, energy: 8, sleep: 8 },
  { date: "2024-01-05", stress: 6, mood: 7, energy: 7, sleep: 7 },
  { date: "2024-01-06", stress: 3, mood: 9, energy: 8, sleep: 9 },
  { date: "2024-01-07", stress: 5, mood: 7, energy: 6, sleep: 7 },
]

const mockEmployeeWellness = [
  {
    id: 1,
    name: "Sarah Johnson",
    department: "Engineering",
    wellnessScore: 78,
    trend: "improving",
    lastCheckIn: "2 hours ago",
    riskLevel: "low",
    recommendations: [
      "Take regular breaks during coding sessions",
      "Try the new meditation app integration",
      "Consider joining the walking group",
    ],
  },
  {
    id: 2,
    name: "Mike Chen",
    department: "Sales",
    wellnessScore: 65,
    trend: "stable",
    lastCheckIn: "1 day ago",
    riskLevel: "medium",
    recommendations: [
      "Schedule stress management workshop",
      "Reduce overtime hours this week",
      "Book a session with wellness coach",
    ],
  },
  {
    id: 3,
    name: "Lisa Rodriguez",
    department: "Marketing",
    wellnessScore: 45,
    trend: "declining",
    lastCheckIn: "3 days ago",
    riskLevel: "high",
    recommendations: [
      "Immediate check-in with HR recommended",
      "Consider flexible work arrangements",
      "Access to mental health resources",
    ],
  },
]

export function WellnessTracker() {
  const [wellnessData, setWellnessData] = useState(mockWellnessData)
  const [employees, setEmployees] = useState(mockEmployeeWellness)
  const [checkInData, setCheckInData] = useState({
    mood: [7],
    stress: [5],
    energy: [6],
    sleep: [7],
    comments: "",
  })
  const { toast } = useToast()

  const handleCheckIn = () => {
    toast({
      title: "Wellness check-in submitted",
      description: "Thank you for sharing your wellness data. AI recommendations generated.",
    })
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "declining":
        return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />
      default:
        return <Activity className="h-4 w-4 text-yellow-600" />
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "text-green-600"
      case "medium":
        return "text-yellow-600"
      case "high":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "low":
        return "default"
      case "medium":
        return "secondary"
      case "high":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Employee Wellness Tracker</h1>
          <p className="text-muted-foreground">AI-powered mental health monitoring and personalized wellness tips</p>
        </div>
        <Button onClick={handleCheckIn}>
          <Heart className="h-4 w-4 mr-2" />
          Quick Check-in
        </Button>
      </div>

      {/* Wellness Check-in Form */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Wellness Check-in</CardTitle>
          <CardDescription>Share how you're feeling today for personalized recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Smile className="h-4 w-4" />
                  Mood (1-10): {checkInData.mood[0]}
                </Label>
                <Slider
                  value={checkInData.mood}
                  onValueChange={(value) => setCheckInData({ ...checkInData, mood: value })}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  Stress Level (1-10): {checkInData.stress[0]}
                </Label>
                <Slider
                  value={checkInData.stress}
                  onValueChange={(value) => setCheckInData({ ...checkInData, stress: value })}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Energy Level (1-10): {checkInData.energy[0]}
                </Label>
                <Slider
                  value={checkInData.energy}
                  onValueChange={(value) => setCheckInData({ ...checkInData, energy: value })}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Sleep Quality (1-10): {checkInData.sleep[0]}
                </Label>
                <Slider
                  value={checkInData.sleep}
                  onValueChange={(value) => setCheckInData({ ...checkInData, sleep: value })}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Additional Comments</Label>
                <Textarea
                  placeholder="How are you feeling today? Any specific concerns or highlights?"
                  value={checkInData.comments}
                  onChange={(e) => setCheckInData({ ...checkInData, comments: e.target.value })}
                  className="min-h-[120px]"
                />
              </div>

              <div className="space-y-2">
                <Label>Work Environment</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="How's your work environment today?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent - Very supportive</SelectItem>
                    <SelectItem value="good">Good - Generally positive</SelectItem>
                    <SelectItem value="neutral">Neutral - No major issues</SelectItem>
                    <SelectItem value="challenging">Challenging - Some difficulties</SelectItem>
                    <SelectItem value="stressful">Stressful - Need support</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full" onClick={handleCheckIn}>
                <MessageCircle className="h-4 w-4 mr-2" />
                Submit Check-in
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Wellness Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Your Wellness Trends</CardTitle>
          <CardDescription>Track your wellness metrics over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={wellnessData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Line type="monotone" dataKey="mood" stroke="#10b981" strokeWidth={2} name="Mood" />
              <Line type="monotone" dataKey="stress" stroke="#ef4444" strokeWidth={2} name="Stress" />
              <Line type="monotone" dataKey="energy" stroke="#3b82f6" strokeWidth={2} name="Energy" />
              <Line type="monotone" dataKey="sleep" stroke="#8b5cf6" strokeWidth={2} name="Sleep" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Team Wellness Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Team Wellness Overview</CardTitle>
          <CardDescription>Monitor team wellness and identify employees who may need support</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {employees.map((employee) => (
              <div key={employee.id} className="border border-border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold">{employee.name}</h3>
                    <p className="text-sm text-muted-foreground">{employee.department}</p>
                    <p className="text-xs text-muted-foreground">Last check-in: {employee.lastCheckIn}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl font-bold">{employee.wellnessScore}</span>
                      {getTrendIcon(employee.trend)}
                    </div>
                    <Badge variant={getRiskBadge(employee.riskLevel)}>{employee.riskLevel.toUpperCase()} RISK</Badge>
                  </div>
                </div>

                <div className="mb-3">
                  <Label className="text-sm font-medium">Wellness Score</Label>
                  <Progress value={employee.wellnessScore} className="mt-1" />
                </div>

                <div className="mb-3">
                  <Label className="text-sm font-medium">AI Recommendations</Label>
                  <div className="mt-2 space-y-1">
                    {employee.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <Heart className="h-3 w-3 text-blue-600" />
                        <span>{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Check-in
                  </Button>
                  <Button size="sm">Send Resources</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Wellness Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Avg Wellness</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk Employees</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Need immediate attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Check-in Rate</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground">This week participation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wellness Programs</CardTitle>
            <Smile className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Active wellness initiatives</p>
          </CardContent>
        </Card>
      </div>

      {/* AI Wellness Insights */}
      <Card>
        <CardHeader>
          <CardTitle>AI Wellness Insights</CardTitle>
          <CardDescription>Intelligent analysis of team wellness patterns</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Stress Pattern Alert</h4>
              <p className="text-sm text-blue-700 dark:text-blue-200">
                Engineering team shows elevated stress levels on Mondays. Consider implementing "Mindful Monday"
                sessions.
              </p>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
              <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">Positive Trend</h4>
              <p className="text-sm text-green-700 dark:text-green-200">
                Overall team wellness improved 12% since implementing flexible work hours. Continue current policies.
              </p>
            </div>

            <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg">
              <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-2">Sleep Quality Concern</h4>
              <p className="text-sm text-amber-700 dark:text-amber-200">
                25% of employees report poor sleep quality. Consider sleep hygiene workshop and ergonomic assessments.
              </p>
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
              <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2">Engagement Opportunity</h4>
              <p className="text-sm text-purple-700 dark:text-purple-200">
                Employees who participate in wellness programs show 30% higher job satisfaction. Expand program reach.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
