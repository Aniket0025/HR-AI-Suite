"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Star, Play, BookOpen, Award, Users, Target, Zap } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const mockCourses = [
  {
    id: 1,
    title: "Leadership Fundamentals",
    description: "Master the basics of effective leadership",
    duration: "4 weeks",
    xpReward: 500,
    difficulty: "Beginner",
    progress: 75,
    enrolled: 234,
    rating: 4.8,
    badges: ["Leadership", "Management"],
    thumbnail: "/leadership-course.png",
  },
  {
    id: 2,
    title: "Advanced Data Analytics",
    description: "Deep dive into data science and analytics",
    duration: "6 weeks",
    xpReward: 750,
    difficulty: "Advanced",
    progress: 30,
    enrolled: 156,
    rating: 4.9,
    badges: ["Data Science", "Analytics"],
    thumbnail: "/data-analytics-course.png",
  },
  {
    id: 3,
    title: "Digital Marketing Mastery",
    description: "Complete guide to modern digital marketing",
    duration: "5 weeks",
    xpReward: 600,
    difficulty: "Intermediate",
    progress: 0,
    enrolled: 189,
    rating: 4.7,
    badges: ["Marketing", "Digital"],
    thumbnail: "/digital-marketing-course.png",
  },
]

const mockLeaderboard = [
  { rank: 1, name: "Sarah Johnson", xp: 2450, avatar: "/professional-female.png" },
  { rank: 2, name: "Mike Chen", xp: 2380, avatar: "/professional-male.png" },
  { rank: 3, name: "Lisa Rodriguez", xp: 2290, avatar: "/professional-hispanic-woman.png" },
  { rank: 4, name: "David Kim", xp: 2150, avatar: "/professional-asian-man.png" },
  { rank: 5, name: "Emma Wilson", xp: 2080, avatar: "/professional-blonde-woman.png" },
]

const mockBadges = [
  { name: "Quick Learner", description: "Complete 3 courses in a month", icon: Zap, earned: true },
  { name: "Team Player", description: "Participate in 5 group activities", icon: Users, earned: true },
  { name: "Goal Crusher", description: "Achieve 10 learning objectives", icon: Target, earned: false },
  { name: "Knowledge Master", description: "Score 95%+ on 5 assessments", icon: Trophy, earned: false },
]

export function GamifiedLearning() {
  const [courses, setCourses] = useState(mockCourses)
  const [userXP, setUserXP] = useState(1850)
  const [userLevel, setUserLevel] = useState(7)
  const { toast } = useToast()

  const handleEnrollCourse = (courseId: number) => {
    toast({
      title: "Enrolled successfully!",
      description: "You've been enrolled in the course. Start learning to earn XP!",
    })
  }

  const handleContinueCourse = (courseId: number) => {
    toast({
      title: "Course resumed",
      description: "Continue where you left off and earn more XP!",
    })
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return "🥇"
      case 2:
        return "🥈"
      case 3:
        return "🥉"
      default:
        return `#${rank}`
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gamified Learning Platform</h1>
          <p className="text-muted-foreground">Interactive courses with XP, badges, and leaderboards</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{userXP} XP</div>
          <div className="text-sm text-muted-foreground">Level {userLevel}</div>
        </div>
      </div>

      {/* User Progress Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total XP</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userXP}</div>
            <Progress value={85} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">150 XP to next level</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses Completed</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+3</span> this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">2 more available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leaderboard Rank</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#6</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">↑2</span> from last week
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Available Courses */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Available Courses</CardTitle>
              <CardDescription>Earn XP and badges by completing courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courses.map((course) => (
                  <div key={course.id} className="border border-border rounded-lg p-4">
                    <div className="flex gap-4">
                      <img
                        src={course.thumbnail || "/placeholder.svg"}
                        alt={course.title}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold">{course.title}</h3>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{course.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{course.description}</p>

                        <div className="flex items-center gap-4 mb-2">
                          <Badge className={getDifficultyColor(course.difficulty)}>{course.difficulty}</Badge>
                          <span className="text-sm text-muted-foreground">{course.duration}</span>
                          <span className="text-sm font-medium text-primary">+{course.xpReward} XP</span>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {course.badges.map((badge, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {badge}
                            </Badge>
                          ))}
                        </div>

                        {course.progress > 0 ? (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} />
                            <Button size="sm" onClick={() => handleContinueCourse(course.id)} className="w-full">
                              <Play className="h-4 w-4 mr-2" />
                              Continue Course
                            </Button>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEnrollCourse(course.id)}
                            className="w-full"
                          >
                            Enroll Now
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard & Badges */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Leaderboard</CardTitle>
              <CardDescription>Top learners this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockLeaderboard.map((user) => (
                  <div key={user.rank} className="flex items-center gap-3">
                    <div className="text-lg font-bold w-8">{getRankIcon(user.rank)}</div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.xp} XP</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Achievement Badges</CardTitle>
              <CardDescription>Unlock badges by completing challenges</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockBadges.map((badge, index) => {
                  const Icon = badge.icon
                  return (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-2 rounded-lg ${badge.earned ? "bg-green-50 dark:bg-green-950" : "bg-gray-50 dark:bg-gray-950"}`}
                    >
                      <Icon className={`h-6 w-6 ${badge.earned ? "text-green-600" : "text-gray-400"}`} />
                      <div className="flex-1">
                        <div
                          className={`font-medium text-sm ${badge.earned ? "text-green-900 dark:text-green-100" : "text-gray-600 dark:text-gray-400"}`}
                        >
                          {badge.name}
                        </div>
                        <div
                          className={`text-xs ${badge.earned ? "text-green-700 dark:text-green-200" : "text-gray-500"}`}
                        >
                          {badge.description}
                        </div>
                      </div>
                      {badge.earned && (
                        <Badge variant="default" className="text-xs">
                          Earned
                        </Badge>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
