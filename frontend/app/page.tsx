"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { TopNavbar } from "@/components/top-navbar"
import { ResumeScreening } from "@/components/pages/resume-screening"
import { TalentSourcing } from "@/components/pages/talent-sourcing"
import { LeadershipPotential } from "@/components/pages/leadership-potential"
import { AIAppraisals } from "@/components/pages/ai-appraisals"
import { GamifiedLearning } from "@/components/pages/gamified-learning"
import { SkillGapAnalysis } from "@/components/pages/skill-gap-analysis"
import { WellnessTracker } from "@/components/pages/wellness-tracker"
import { HRInsights } from "@/components/pages/hr-insights"

export default function HomePage() {
  const [activeModule, setActiveModule] = useState("resume-screening")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const renderActiveModule = () => {
    console.log("[v0] Rendering module:", activeModule)
    switch (activeModule) {
      case "resume-screening":
        return <ResumeScreening />
      case "talent-sourcing":
        return <TalentSourcing />
      case "leadership-potential":
        return <LeadershipPotential />
      case "ai-appraisals":
        return <AIAppraisals />
      case "gamified-learning":
        return <GamifiedLearning />
      case "skill-gap-analysis":
        return <SkillGapAnalysis />
      case "wellness-tracker":
        return <WellnessTracker />
      case "hr-insights":
      default:
        return <HRInsights />
    }
  }

  const getModuleName = () => {
    const moduleNames = {
      "resume-screening": "AI for Resume Screening",
      "talent-sourcing": "Smart Talent Sourcing",
      "leadership-potential": "Leadership Potential Identifier",
      "ai-appraisals": "AI-Driven Appraisals",
      "gamified-learning": "Gamified Learning Platform",
      "skill-gap-analysis": "AI-Based Skill Gap Analysis",
      "wellness-tracker": "Employee Wellness Tracker",
      "hr-insights": "Unified HR Insights Dashboard",
    }
    return moduleNames[activeModule as keyof typeof moduleNames] || "HR AI Suite"
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Sidebar
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? "ml-16" : "ml-80"}`}>
        <TopNavbar moduleName={getModuleName()} onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <main className="flex-1 overflow-auto p-6">{renderActiveModule()}</main>
      </div>
    </div>
  )
}
