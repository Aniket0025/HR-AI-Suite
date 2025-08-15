"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Target, TrendingUp, BookOpen, ExternalLink, AlertTriangle, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const mockAnalysis = [
  {
    id: 1,
    employeeName: "Alex Johnson",
    department: "Engineering",
    role: "Frontend Developer",
    currentSkills: ["React", "JavaScript", "CSS", "HTML", "Git"],
    requiredSkills: ["React", "TypeScript", "Node.js", "AWS", "Docker", "GraphQL"],
    skillGaps: [
      { skill: "TypeScript", priority: "High", proficiency: 0, required: 80 },
      { skill: "Node.js", priority: "High", proficiency: 20, required: 70 },
      { skill: "AWS", priority: "Medium", proficiency: 10, required: 60 },
      { skill: "Docker", priority: "Medium", proficiency: 0, required: 50 },
      { skill: "GraphQL", priority: "Low", proficiency: 15, required: 40 },
    ],
    recommendations: [
      {
        skill: "TypeScript",
        course: "TypeScript Fundamentals",
        provider: "TechLearn",
        duration: "4 weeks",
        url: "#",
      },
      {
        skill: "Node.js",
        course: "Node.js Backend Development",
        provider: "CodeAcademy",
        duration: "6 weeks",
        url: "#",
      },
    ],
    overallScore: 65,
  },
  {
    id: 2,
    employeeName: "Maria Santos",
    department: "Marketing",
    role: "Digital Marketing Specialist",
    currentSkills: ["Social Media", "Content Creation", "Google Ads", "Analytics"],
    requiredSkills: ["SEO", "Data Analysis", "Marketing Automation", "A/B Testing", "CRM"],
    skillGaps: [
      { skill: "SEO", priority: "High", proficiency: 30, required: 85 },
      { skill: "Data Analysis", priority: "High", proficiency: 25, required: 75 },
      { skill: "Marketing Automation", priority: "Medium", proficiency: 10, required: 65 },
    ],
    recommendations: [
      {
        skill: "SEO",
        course: "Advanced SEO Strategies",
        provider: "MarketingPro",
        duration: "5 weeks",
        url: "#",
      },
    ],
    overallScore: 72,
  },
]

const EMPLOYEES = [
  { id: "alex-johnson", name: "Alex Johnson", department: "Engineering", role: "Frontend Developer" },
  { id: "maria-santos", name: "Maria Santos", department: "Marketing", role: "Digital Marketing Specialist" },
  { id: "john-doe", name: "John Doe", department: "Data", role: "Data Analyst" },
]

export function SkillGapAnalysis() {
  const [analyses, setAnalyses] = useState<any[]>([])
  const [selectedEmployee, setSelectedEmployee] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const { toast } = useToast()
  const [currentSkillsInput, setCurrentSkillsInput] = useState("")
  const [targetRole, setTargetRole] = useState("")
  const [employeeName, setEmployeeName] = useState("")

  // Load last two analyses from backend
  useEffect(() => {
    const load = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem("auth_token") : null
        if (!token) {
          // Not signed in: show mock
          setAnalyses(mockAnalysis)
          return
        }
        const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"
        const res = await fetch(`${base}/api/skills`, { headers: { Authorization: `Bearer ${token}` } })
        const data = await res.json()
        if (!res.ok) throw new Error(data?.error || "Failed to load analyses")
        const list = (data?.items || data?.analyses || data) as any[]
        const mapped = (list || []).slice(0, 2).map((a) => ({
          id: a.id || a._id,
          employeeName: a.employeeName,
          department: "",
          role: a.targetRole,
          currentSkills: a.currentSkills || [],
          requiredSkills: a.requiredSkills || [],
          skillGaps: a.gaps || [],
          recommendations: a.recommendations || [],
          overallScore: a.overallScore ?? 0,
        }))
        if (mapped.length) setAnalyses(mapped)
        else setAnalyses(mockAnalysis)
      } catch (e) {
        // Fallback to mock if API fails
        setAnalyses(mockAnalysis)
      }
    }
    load()
  }, [])

  const handleAnalyze = async () => {
    try {
      setIsAnalyzing(true)
      const token = typeof window !== 'undefined' ? localStorage.getItem("auth_token") : null
      if (!token) {
        toast({ title: "Not signed in", description: "Please sign in to analyze skills." })
        setIsAnalyzing(false)
        return
      }

      const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"
      const currentSkills = currentSkillsInput
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)

      const body = {
        employeeName: employeeName || EMPLOYEES.find((e) => e.id === selectedEmployee)?.name || "",
        currentSkills,
        targetRole,
        jobRequirements: jobDescription,
      }

      const res = await fetch(`${base}/api/skills/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Failed to analyze skills")

      const a = data.analysis
      const ui = {
        id: a.id,
        employeeName: a.employeeName || body.employeeName,
        department: "", // optional
        role: a.targetRole || targetRole,
        currentSkills: a.currentSkills || [],
        requiredSkills: a.requiredSkills || [],
        skillGaps: a.gaps || [],
        recommendations: a.recommendations || [],
        overallScore: a.overallScore ?? 0,
      }
      setAnalyses((prev) => [ui, ...prev])
      toast({ title: "Analysis complete", description: "Saved to your account." })
    } catch (err: any) {
      toast({ title: "Analyze failed", description: err?.message || String(err) })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI-Based Skill Gap Analysis</h1>
          <p className="text-muted-foreground">Identify skill gaps and get personalized upskilling recommendations</p>
        </div>
        <Button onClick={handleAnalyze} disabled={isAnalyzing}>
          {isAnalyzing ? "Analyzing..." : "Run Analysis"}
        </Button>
      </div>

      {/* Analysis Input */}
      <Card>
        <CardHeader>
          <CardTitle>Skill Gap Assessment</CardTitle>
          <CardDescription>Compare employee skills against job requirements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Select Employee</Label>
                <Select
                  value={selectedEmployee}
                  onValueChange={(v) => {
                    setSelectedEmployee(v)
                    const emp = EMPLOYEES.find((e) => e.id === v)
                    if (emp) {
                      setEmployeeName(emp.name)
                      if (!targetRole) setTargetRole(emp.role)
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose employee to analyze" />
                  </SelectTrigger>
                  <SelectContent>
                    {EMPLOYEES.map((e) => (
                      <SelectItem key={e.id} value={e.id}>
                        {e.name} - {e.role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Current Skills</Label>
                <Input
                  placeholder="e.g., React, JavaScript, CSS"
                  value={currentSkillsInput}
                  onChange={(e) => setCurrentSkillsInput(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Target Role</Label>
                <Input
                  placeholder="e.g., Senior Frontend Developer"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Job Requirements</Label>
                <Textarea
                  placeholder="Paste job description or list required skills and competencies..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="min-h-[120px]"
                />
              </div>
              <Button className="w-full" onClick={handleAnalyze} disabled={isAnalyzing}>
                <Target className="h-4 w-4 mr-2" />
                {isAnalyzing ? "Analyzing Skills..." : "Analyze Skill Gaps"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      <div className="space-y-6">
        {analyses.map((analysis) => (
          <Card key={analysis.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{analysis.employeeName}</CardTitle>
                  <CardDescription>
                    {analysis.role} • {analysis.department}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getScoreColor(analysis.overallScore)}`}>
                    {analysis.overallScore}%
                  </div>
                  <div className="text-sm text-muted-foreground">Skill Match</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Current vs Required Skills */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium text-green-700 dark:text-green-400 mb-2 block">
                    Current Skills
                  </Label>
                  <div className="flex flex-wrap gap-1">
                    {analysis.currentSkills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="border-green-200 text-green-700 dark:border-green-800 dark:text-green-400"
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-blue-700 dark:text-blue-400 mb-2 block">
                    Required Skills
                  </Label>
                  <div className="flex flex-wrap gap-1">
                    {analysis.requiredSkills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-400"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Skill Gaps */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Identified Skill Gaps</Label>
                <div className="space-y-3">
                  {analysis.skillGaps.map((gap, index) => (
                    <div key={index} className="border border-border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{gap.skill}</h4>
                          {/* Priority hidden as requested */}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {gap.proficiency}% / {gap.required}% required
                        </div>
                      </div>
                      <Progress value={(gap.proficiency / gap.required) * 100} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Current: {gap.proficiency}%</span>
                        <span>Target: {gap.required}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Upskilling Recommendations</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analysis.recommendations.map((rec, index) => (
                    <div key={index} className="border border-border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{rec.course}</h4>
                        <Badge variant="outline">{rec.skill}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {rec.provider} • {rec.duration}
                      </p>
                      <Button size="sm" variant="outline" className="w-full bg-transparent">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Course
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Plan */}
              <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">Recommended Learning Path</h4>
                    <div className="text-sm text-blue-700 dark:text-blue-200 space-y-1">
                      <div>1. Start with high-priority skills: TypeScript, Node.js</div>
                      <div>2. Estimated completion time: 10-12 weeks</div>
                      <div>3. Expected skill match improvement: +25%</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Employees Analyzed</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12</span> this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Skill Match</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5%</span> from last quarter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Gaps</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">High priority skills needed</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
