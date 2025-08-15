"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, Star, Download, Eye, Filter, MessageCircle, Mic, Bot, Zap, Target } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const mockCandidates = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    experience: "5 years",
    skills: ["React", "TypeScript", "Node.js", "AWS", "Python"],
    education: "MS Computer Science - Stanford University",
    matchScore: 92,
    status: "shortlisted",
    resumeUrl: "/sample-resume-1.pdf",
    aiInsights: "Strong technical background with excellent problem-solving skills. Leadership experience evident.",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "+1 (555) 987-6543",
    experience: "7 years",
    skills: ["JavaScript", "React", "MongoDB", "Docker", "GraphQL"],
    education: "BS Software Engineering - MIT",
    matchScore: 88,
    status: "shortlisted",
    resumeUrl: "/sample-resume-2.pdf",
    aiInsights: "Extensive full-stack experience with modern technologies. Great cultural fit indicators.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    phone: "+1 (555) 456-7890",
    experience: "3 years",
    skills: ["Vue.js", "Python", "PostgreSQL", "Git", "Agile"],
    education: "BS Computer Science - UC Berkeley",
    matchScore: 76,
    status: "under-review",
    resumeUrl: "/sample-resume-3.pdf",
    aiInsights: "Solid foundation with growth potential. Shows adaptability and learning mindset.",
  },
]

export function ResumeScreening() {
  const [jobDescription, setJobDescription] = useState("")
  const [candidates, setCandidates] = useState(mockCandidates)
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [chatbotActive, setChatbotActive] = useState(false)
  const [voicebotActive, setVoicebotActive] = useState(false)
  const { toast } = useToast()

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles((prev) => [...prev, ...files])
    toast({
      title: "Files uploaded successfully",
      description: `${files.length} resume(s) added for AI processing`,
    })
  }

  const processResumes = async () => {
    if (!jobDescription.trim()) {
      toast({
        title: "Job description required",
        description: "Please provide a job description to match candidates against",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    // Simulate AI processing with detailed steps
    setTimeout(() => {
      setIsProcessing(false)
      toast({
        title: "AI Processing Complete",
        description: `${candidates.length} candidates analyzed with advanced ML algorithms`,
      })
    }, 3000)
  }

  const activateChatbot = () => {
    setChatbotActive(true)
    toast({
      title: "AI Chatbot Activated",
      description: "Ready to help with resume parsing and candidate queries",
    })
  }

  const activateVoicebot = () => {
    setVoicebotActive(true)
    toast({
      title: "AI Voicebot Activated",
      description: "Voice-powered resume screening is now active",
    })
  }

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-emerald-600"
    if (score >= 70) return "text-amber-600"
    return "text-red-600"
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      shortlisted: "default",
      "under-review": "secondary",
      rejected: "destructive",
    }
    return variants[status as keyof typeof variants] || "secondary"
  }

  return (
    <div className="space-y-8">
      {/* Enhanced Header with Gradient */}
      <div className="gradient-card rounded-xl p-8 shadow-premium">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">AI Resume Screening</h1>
            <p className="text-muted-foreground text-lg">
              Advanced AI-powered resume parsing with chatbot and voicebot integration
            </p>
          </div>
          <div className="flex gap-3">
            <Button onClick={activateChatbot} variant="outline" className="glass-effect bg-transparent">
              <MessageCircle className="h-4 w-4 mr-2" />
              AI Chatbot
            </Button>
            <Button onClick={activateVoicebot} variant="outline" className="glass-effect bg-transparent">
              <Mic className="h-4 w-4 mr-2" />
              AI Voicebot
            </Button>
            <Button onClick={processResumes} disabled={isProcessing} className="gradient-primary">
              <Zap className="h-4 w-4 mr-2" />
              {isProcessing ? "Processing..." : "AI Process"}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Enhanced Upload Section */}
        <Card className="lg:col-span-1 shadow-premium">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              Smart Upload System
            </CardTitle>
            <CardDescription>AI-powered PDF/DOCX parsing with OCR support</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-2 border-dashed border-primary/30 rounded-xl p-8 text-center bg-gradient-to-br from-primary/5 to-secondary/5 hover:from-primary/10 hover:to-secondary/10 transition-all">
              <Upload className="h-12 w-12 mx-auto mb-4 text-primary" />
              <Label htmlFor="resume-upload" className="cursor-pointer">
                <span className="text-sm text-muted-foreground block mb-2">Drag & drop or click to upload</span>
                <span className="text-xs text-muted-foreground">Supports PDF, DOC, DOCX with AI OCR</span>
                <Input
                  id="resume-upload"
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </Label>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="space-y-3">
                <Label className="text-sm font-semibold flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Uploaded Files ({uploadedFiles.length})
                </Label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg">
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="truncate text-sm font-medium">{file.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {(file.size / 1024 / 1024).toFixed(1)}MB
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Processing Status */}
            {chatbotActive && (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950 rounded-lg border border-emerald-200 dark:border-emerald-800">
                <div className="flex items-center gap-2 mb-2">
                  <Bot className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-medium text-emerald-800 dark:text-emerald-200">AI Chatbot Active</span>
                </div>
                <p className="text-xs text-emerald-700 dark:text-emerald-300">
                  Ready to parse resumes and answer candidate queries
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Enhanced Job Description */}
        <Card className="lg:col-span-2 shadow-premium">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Job Requirements & AI Matching
            </CardTitle>
            <CardDescription>Define criteria for intelligent candidate scoring</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Enter detailed job description including:
• Required technical skills and experience level
• Soft skills and cultural fit requirements  
• Educational background preferences
• Industry experience needed
• Team collaboration requirements

AI will analyze resumes against these criteria for precise matching..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="min-h-[240px] text-sm leading-relaxed"
            />
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <p className="text-xs text-blue-700 dark:text-blue-300">
                💡 <strong>AI Tip:</strong> More detailed job descriptions lead to better candidate matching accuracy
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Processing Status */}
      {isProcessing && (
        <Card className="shadow-premium">
          <CardContent className="pt-6">
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary animate-pulse" />
                  AI Processing Pipeline Active
                </h3>
                <Progress value={66} className="w-full h-3 mb-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Parsing documents...</span>
                  <span>Analyzing skills match...</span>
                  <span>Generating insights...</span>
                </div>
              </div>
              <div className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg">
                <div className="space-y-1">
                  <div>✓ OCR text extraction</div>
                  <div>⚡ NLP skill analysis</div>
                  <div>🎯 JD matching algorithm</div>
                  <div>🧠 AI scoring model</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enhanced Results Dashboard */}
      <Card className="shadow-premium">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Star className="h-6 w-6 text-primary" />
                AI-Scored Candidate Dashboard
              </CardTitle>
              <CardDescription className="text-base">
                Advanced ML algorithms ranked candidates by job fit and potential
              </CardDescription>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="glass-effect bg-transparent">
                <Filter className="h-4 w-4 mr-2" />
                Smart Filter
              </Button>
              <Button variant="outline" size="sm" className="glass-effect bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {candidates.map((candidate) => (
              <div
                key={candidate.id}
                className="border border-border rounded-xl p-6 gradient-card hover:shadow-premium transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-xl mb-1">{candidate.name}</h3>
                    <p className="text-muted-foreground">{candidate.email}</p>
                    <p className="text-muted-foreground">{candidate.phone}</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-3xl font-bold ${getScoreColor(candidate.matchScore)} mb-1`}>
                      {candidate.matchScore}%
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(candidate.matchScore / 20)
                              ? "fill-amber-400 text-amber-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      AI Confidence: {Math.floor(candidate.matchScore * 0.9)}%
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <Label className="text-sm font-semibold text-primary">Experience</Label>
                    <p className="text-sm mt-1">{candidate.experience}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-primary">Education</Label>
                    <p className="text-sm mt-1">{candidate.education}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <Label className="text-sm font-semibold text-primary mb-2 block">Skills Analysis</Label>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs px-3 py-1">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* AI Insights */}
                <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg">
                  <Label className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2 block flex items-center gap-2">
                    <Bot className="h-4 w-4" />
                    AI Insights
                  </Label>
                  <p className="text-sm text-blue-700 dark:text-blue-300">{candidate.aiInsights}</p>
                </div>

                <div className="flex justify-between items-center">
                  <Badge variant={getStatusBadge(candidate.status)} className="px-3 py-1">
                    {candidate.status.replace("-", " ").toUpperCase()}
                  </Badge>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="glass-effect bg-transparent">
                      <Eye className="h-4 w-4 mr-2" />
                      View Resume
                    </Button>
                    <Button size="sm" className="gradient-primary">
                      <Star className="h-4 w-4 mr-2" />
                      Shortlist
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
