"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, TrendingUp, Target, FileText, Calendar, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const mockAppraisals = [
  {
    id: 1,
    employeeName: "John Smith",
    department: "Engineering",
    period: "Q4 2024",
    overallScore: 4.2,
    categories: {
      technical: 4.5,
      communication: 3.8,
      teamwork: 4.3,
      leadership: 3.9,
      innovation: 4.1,
    },
    feedback: "Excellent technical skills and consistent delivery. Shows great potential for leadership roles.",
    goals: ["Improve presentation skills", "Lead a cross-functional project", "Mentor 2 junior developers"],
    status: "completed",
    aiSummary: "High performer with strong technical capabilities. Recommended for senior role consideration.",
  },
  {
    id: 2,
    employeeName: "Emma Wilson",
    department: "Marketing",
    period: "Q4 2024",
    overallScore: 4.6,
    categories: {
      creativity: 4.8,
      strategy: 4.5,
      execution: 4.4,
      collaboration: 4.7,
      analytics: 4.2,
    },
    feedback: "Outstanding creative vision and strategic thinking. Consistently exceeds targets.",
    goals: [
      "Develop team management skills",
      "Complete digital marketing certification",
      "Launch new campaign strategy",
    ],
    status: "in-progress",
    aiSummary: "Top performer ready for promotion. Strong candidate for marketing manager role.",
  },
]

export function AIAppraisals() {
  const [appraisals, setAppraisals] = useState(mockAppraisals)
  const [selectedEmployee, setSelectedEmployee] = useState("")
  const [feedbackData, setFeedbackData] = useState({
    technical: "",
    communication: "",
    teamwork: "",
    leadership: "",
    comments: "",
  })
  const { toast } = useToast()

  const handleGenerateAppraisal = () => {
    toast({
      title: "AI Appraisal Generated",
      description: "Performance summary and recommendations have been created",
    })
  }

  const getRatingStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "default",
      "in-progress": "secondary",
      pending: "outline",
    }
    return variants[status as keyof typeof variants] || "outline"
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI-Driven Appraisals</h1>
          <p className="text-muted-foreground">Intelligent performance evaluation and feedback generation</p>
        </div>
        <Button onClick={handleGenerateAppraisal}>
          <Star className="h-4 w-4 mr-2" />
          Generate AI Appraisal
        </Button>
      </div>

      {/* Performance Input Form */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Evaluation</CardTitle>
          <CardDescription>Input performance data for AI-powered appraisal generation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Employee</Label>
                <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="john-smith">John Smith - Engineering</SelectItem>
                    <SelectItem value="emma-wilson">Emma Wilson - Marketing</SelectItem>
                    <SelectItem value="mike-johnson">Mike Johnson - Sales</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Technical Skills (1-5)</Label>
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={feedbackData.technical}
                    onChange={(e) => setFeedbackData({ ...feedbackData, technical: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Communication (1-5)</Label>
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={feedbackData.communication}
                    onChange={(e) => setFeedbackData({ ...feedbackData, communication: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Teamwork (1-5)</Label>
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={feedbackData.teamwork}
                    onChange={(e) => setFeedbackData({ ...feedbackData, teamwork: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Leadership (1-5)</Label>
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={feedbackData.leadership}
                    onChange={(e) => setFeedbackData({ ...feedbackData, leadership: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Additional Comments</Label>
                <Textarea
                  placeholder="Provide specific examples of achievements, challenges, and observations..."
                  value={feedbackData.comments}
                  onChange={(e) => setFeedbackData({ ...feedbackData, comments: e.target.value })}
                  className="min-h-[120px]"
                />
              </div>
              <Button className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Generate AI Appraisal
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appraisal Results */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Appraisals</CardTitle>
          <CardDescription>AI-generated performance summaries and recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {appraisals.map((appraisal) => (
              <div key={appraisal.id} className="border border-border rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{appraisal.employeeName}</h3>
                    <p className="text-sm text-muted-foreground">
                      {appraisal.department} • {appraisal.period}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl font-bold">{appraisal.overallScore}</span>
                      <div className="flex">{getRatingStars(appraisal.overallScore)}</div>
                    </div>
                    <Badge variant={getStatusBadge(appraisal.status)}>
                      {appraisal.status.replace("-", " ").toUpperCase()}
                    </Badge>
                  </div>
                </div>

                {/* Performance Categories */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                  {Object.entries(appraisal.categories).map(([category, score]) => (
                    <div key={category} className="text-center">
                      <div className="text-sm font-medium capitalize mb-1">{category}</div>
                      <div className="text-lg font-bold text-primary">{score}</div>
                      <Progress value={score * 20} className="h-2" />
                    </div>
                  ))}
                </div>

                {/* AI Summary */}
                <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-2">
                    <Star className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">AI Summary</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-200">{appraisal.aiSummary}</p>
                    </div>
                  </div>
                </div>

                {/* Feedback */}
                <div className="mb-4">
                  <Label className="text-sm font-medium">Manager Feedback</Label>
                  <p className="text-sm mt-1">{appraisal.feedback}</p>
                </div>

                {/* Goals */}
                <div className="mb-4">
                  <Label className="text-sm font-medium">Goals for Next Period</Label>
                  <div className="mt-2 space-y-1">
                    {appraisal.goals.map((goal, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <Target className="h-4 w-4 text-green-600" />
                        <span>{goal}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    View Full Report
                  </Button>
                  <Button size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Review
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.4</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+0.2</span> from last quarter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Appraisals</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">156 of 179 employees</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Performers</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Employees with 4.5+ rating</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
