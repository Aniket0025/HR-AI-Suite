"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { FileText, Users, TrendingUp, Star, GraduationCap, Target, Heart, BarChart3, Menu, X, Zap } from "lucide-react"

interface SidebarProps {
  activeModule: string
  setActiveModule: (module: string) => void
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

const menuItems = [
  {
    id: "resume-screening",
    label: "AI for Resume Screening",
    icon: FileText,
    description: "Smart resume parsing & scoring",
  },
  {
    id: "talent-sourcing",
    label: "Smart Talent Sourcing",
    icon: Users,
    description: "Web scraping + AI discovery",
  },
  {
    id: "leadership-potential",
    label: "Leadership Potential Identifier",
    icon: TrendingUp,
    description: "Employee growth assessment",
  },
  {
    id: "ai-appraisals",
    label: "AI-Driven Appraisals",
    icon: Star,
    description: "Performance evaluation system",
  },
  {
    id: "gamified-learning",
    label: "Gamified Learning Platform",
    icon: GraduationCap,
    description: "Interactive skill development",
  },
  {
    id: "skill-gap-analysis",
    label: "AI-Based Skill Gap Analysis",
    icon: Target,
    description: "Competency mapping & upskilling",
  },
  {
    id: "wellness-tracker",
    label: "Employee Wellness Tracker",
    icon: Heart,
    description: "Mental health monitoring",
  },
  {
    id: "hr-insights",
    label: "Unified HR Insights Dashboard",
    icon: BarChart3,
    description: "Centralized analytics hub",
  },
]

export function Sidebar({ activeModule, setActiveModule, collapsed, setCollapsed }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {!collapsed && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setCollapsed(true)} />}

      <div
        className={cn(
          "h-screen fixed left-0 top-0 z-50 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 transition-all duration-300 flex flex-col",
          collapsed ? "w-16" : "w-72", // Increased width from w-64 to w-72 for better text visibility
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500 rounded-lg">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white">HR AI Suite</h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">Intelligent HR Platform</p>
              </div>
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)} className="h-8 w-8 p-0">
            {collapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>

        <nav className="flex-1 p-3 overflow-y-auto scrollbar-hide">
          <div className="flex flex-col space-y-2 h-full">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = activeModule === item.id

              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 px-4 py-4 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex-1", // Added flex-1 to distribute space evenly
                    collapsed ? "h-12" : "min-h-[72px]", // Increased min-height for better text spacing
                    isActive && "bg-emerald-500 text-white hover:bg-emerald-600",
                  )}
                  onClick={() => {
                    console.log("[v0] Switching to module:", item.id)
                    setActiveModule(item.id)
                  }}
                >
                  <Icon className="h-6 w-6 flex-shrink-0" /> {/* Increased icon size from h-5 w-5 to h-6 w-6 */}
                  {!collapsed && (
                    <div className="flex-1 text-left min-w-0">
                      {" "}
                      {/* Added min-w-0 to prevent text overflow */}
                      <div className="text-sm font-bold leading-tight mb-1 text-wrap">
                        {" "}
                        {/* Changed to font-bold and added text-wrap */}
                        {item.label}
                      </div>
                      <div
                        className={cn(
                          "text-xs leading-relaxed text-wrap", // Added text-wrap to ensure full text visibility
                          isActive ? "text-white/90" : "text-slate-600 dark:text-slate-300",
                        )}
                      >
                        {item.description}
                      </div>
                    </div>
                  )}
                </Button>
              )
            })}
          </div>
        </nav>

        {!collapsed && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex-shrink-0 bg-slate-50 dark:bg-slate-800/50">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">AI Systems Active</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">8 modules running efficiently</p>
          </div>
        )}
      </div>

      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  )
}
