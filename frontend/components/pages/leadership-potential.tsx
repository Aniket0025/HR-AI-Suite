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
import { TrendingUp, Users, Target, Award, Eye, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const mockEmployees = [
  {
    id: 1,
    name: "Sarah Mitchell",
    department: "Engineering",
    role: "Senior Developer",
    leadershipScore: 87,
    potential: "High",
    strengths: ["Technical Excellence", "Team Collaboration", "Problem Solving"],
    growthAreas: ["Public Speaking", "Strategic Thinking"],
    recommendations: [
      "Enroll in Executive Leadership Program",
      "Lead cross-functional project",
      "Mentor junior developers",
    ],
    avatar: "/placeholder-igi7r.png",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    department: "Sales",
    role: "Account Manager",
    leadershipScore: 92,
    potential: "High",
    strengths: ["Communication", "Client Relations", "Strategic Vision"],
    growthAreas: ["Technical Knowledge", "Data Analysis"],
    recommendations: ["Shadow VP of Sales", "Complete MBA program", "Lead regional sales team"],
    avatar: "/professional-male-sales.png",
  },
  {
    id: 3,
    name: "Lisa Chen",
    department: "Marketing",
    role: "Marketing Specialist",
    leadershipScore: 74,
    potential: "Medium",
    strengths: ["Creativity", "Digital Marketing", "Analytics"],
    growthAreas: ["Team Management", "Budget Planning"],
    recommendations: ["Take leadership workshop", "Manage marketing campaign", "Develop presentation skills"],
    avatar: "/professional-female-marketing.png",
  },
]

export function LeadershipPotential() {
  const [employees, setEmployees] = useState(mockEmployees)
  const [selectedEmployee, setSelectedEmployee] = useState<string>("")
  const [surveyData, setSurveyData] = useState({
    teamwork: "",
    communication: "",
    problemSolving: "",
    initiative: "",
    adaptability: "",
  })
  const { toast } = useToast()

  const handleAnalyze = () => {
    toast({
      title: "Analysis complete",
      description: "Leadership potential scores have been updated",
    })
  }

  const getPotentialColor = (potential: string) => {
    switch (potential) {
      case "High":
        return "text-green-600"
      case "Medium":
        return "text-yellow-600"
      case "Low":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getPotentialBadge = (potential: string) => {
    switch (potential) {
      case "High":
        return "default"
      case "Medium":
        return "secondary"
      case "Low":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Leadership Potential Identifier</h1>
          <p className="text-muted-foreground">AI-powered assessment of employee leadership capabilities</p>
        </div>
        <Button onClick={handleAnalyze}>
          <TrendingUp className="h-4 w-4 mr-2" />
          Analyze All
        </Button>
      </div>

      {/* Assessment Form */}
      <Card>
        <CardHeader>
          <CardTitle>Leadership Assessment</CardTitle>
          <CardDescription>Evaluate employee performance across key leadership dimensions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Select Employee</Label>
                <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((emp) => (
                      <SelectItem key={emp.id} value={emp.id.toString()}>
                        {emp.name} - {emp.role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Teamwork (1-10)</Label>
                  <Input
                    type="number"
                    min="1"
                    max="10"
                    value={surveyData.teamwork}
                    onChange={(e) => setSurveyData({ ...surveyData, teamwork: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Communication (1-10)</Label>
                  <Input
                    type="number"
                    min="1"
                    max="10"
                    value={surveyData.communication}
                    onChange={(e) => setSurveyData({ ...surveyData, communication: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Problem Solving (1-10)</Label>
                  <Input
                    type="number"
                    min="1"
                    max="10"
                    value={surveyData.problemSolving}
                    onChange={(e) => setSurveyData({ ...surveyData, problemSolving: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Initiative (1-10)</Label>
                  <Input
                    type="number"
                    min="1"
                    max="10"
                    value={surveyData.initiative}
                    onChange={(e) => setSurveyData({ ...surveyData, initiative: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Additional Comments</Label>
                <Textarea
                  placeholder="Provide specific examples of leadership behavior, achievements, or areas for improvement..."
                  className="min-h-[120px]"
                />
              </div>
              <Button className="w-full">
                <Award className="h-4 w-4 mr-2" />
                Submit Assessment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leadership Dashboard */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Leadership Potential Results</CardTitle>
              <CardDescription>AI-analyzed leadership scores and recommendations</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {employees.map((employee) => (
              <div key={employee.id} className="border border-border rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <img
                    src={employee.avatar || "/placeholder.svg"}
                    alt={employee.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{employee.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {employee.role} • {employee.department}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{employee.leadershipScore}</div>
                        <Badge variant={getPotentialBadge(employee.potential)}>{employee.potential} Potential</Badge>
                      </div>
                    </div>

                    <div className="mb-4">
                      <Label className="text-sm font-medium">Leadership Score</Label>
                      <Progress value={employee.leadershipScore} className="mt-2" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-sm font-medium text-green-700 dark:text-green-400">Key Strengths</Label>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {employee.strengths.map((strength, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs border-green-200 text-green-700 dark:border-green-800 dark:text-green-400"
                            >
                              {strength}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-amber-700 dark:text-amber-400">Growth Areas</Label>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {employee.growthAreas.map((area, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs border-amber-200 text-amber-700 dark:border-amber-800 dark:text-amber-400"
                            >
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Label className="text-sm font-medium">AI-Generated Growth Plan</Label>
                      <div className="mt-2 space-y-2">
                        {employee.recommendations.map((rec, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <Target className="h-4 w-4 text-blue-600" />
                            <span>{rec}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button size="sm">Create Development Plan</Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Potential Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Ready for leadership roles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Leadership Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5%</span> from last quarter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Development Programs</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Active leadership programs</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
