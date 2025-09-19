"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Share2, MessageCircle, FileText, Plus, Eye, Download, Clock, Star } from "lucide-react"

// Mock data for collaborative projects
const projects = [
  {
    id: 1,
    title: "Arabian Sea Temperature Analysis",
    description: "Collaborative study on temperature variations in the Arabian Sea over the past decade",
    members: [
      { name: "Dr. Sarah Chen", avatar: "/placeholder.svg?height=32&width=32", role: "Lead Researcher" },
      { name: "Prof. Raj Patel", avatar: "/placeholder.svg?height=32&width=32", role: "Data Analyst" },
      { name: "Dr. Maria Santos", avatar: "/placeholder.svg?height=32&width=32", role: "Oceanographer" },
    ],
    status: "active",
    lastUpdated: "2 hours ago",
    insights: 15,
    datasets: 8,
  },
  {
    id: 2,
    title: "Bay of Bengal Salinity Patterns",
    description: "Multi-institutional research on salinity distribution patterns during monsoon seasons",
    members: [
      { name: "Dr. James Wilson", avatar: "/placeholder.svg?height=32&width=32", role: "Principal Investigator" },
      { name: "Dr. Priya Sharma", avatar: "/placeholder.svg?height=32&width=32", role: "Marine Biologist" },
    ],
    status: "review",
    lastUpdated: "1 day ago",
    insights: 23,
    datasets: 12,
  },
  {
    id: 3,
    title: "ARGO Float Trajectory Optimization",
    description: "Developing improved algorithms for predicting and optimizing ARGO float trajectories",
    members: [
      { name: "Dr. Alex Kumar", avatar: "/placeholder.svg?height=32&width=32", role: "Data Scientist" },
      { name: "Prof. Lisa Zhang", avatar: "/placeholder.svg?height=32&width=32", role: "Computational Oceanographer" },
      { name: "Dr. Ahmed Hassan", avatar: "/placeholder.svg?height=32&width=32", role: "Research Fellow" },
    ],
    status: "planning",
    lastUpdated: "3 days ago",
    insights: 7,
    datasets: 5,
  },
]

const sharedInsights = [
  {
    id: 1,
    title: "Unusual Temperature Spike in Arabian Sea",
    author: "Dr. Sarah Chen",
    project: "Arabian Sea Temperature Analysis",
    timestamp: "3 hours ago",
    likes: 12,
    comments: 5,
    content:
      "Observed a significant temperature anomaly at 15.2°N, 68.5°E. Surface temperature reached 31.2°C, which is 2.8°C above seasonal average.",
  },
  {
    id: 2,
    title: "Correlation Between Monsoon Intensity and Salinity",
    author: "Dr. Priya Sharma",
    project: "Bay of Bengal Salinity Patterns",
    timestamp: "6 hours ago",
    likes: 18,
    comments: 8,
    content:
      "Strong negative correlation (-0.78) found between monsoon rainfall intensity and surface salinity levels in the northern Bay of Bengal.",
  },
  {
    id: 3,
    title: "Machine Learning Model Performance Update",
    author: "Dr. Alex Kumar",
    project: "ARGO Float Trajectory Optimization",
    timestamp: "1 day ago",
    likes: 9,
    comments: 3,
    content:
      "Latest neural network model shows 23% improvement in trajectory prediction accuracy compared to traditional methods.",
  },
]

export function CollaborativeWorkspace() {
  const [selectedProject, setSelectedProject] = useState(projects[0])

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Collaborative Workspace</h1>
          <p className="text-muted-foreground">Share insights, collaborate on research, and build knowledge together</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>Start a new collaborative research project with your team.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Project Title</Label>
                <Input id="title" placeholder="Enter project title" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe your research project" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Project Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="temperature">Temperature Analysis</SelectItem>
                    <SelectItem value="salinity">Salinity Research</SelectItem>
                    <SelectItem value="trajectory">Float Trajectory</SelectItem>
                    <SelectItem value="ecosystem">Marine Ecosystem</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Create Project</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="projects" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="projects">Active Projects</TabsTrigger>
          <TabsTrigger value="insights">Shared Insights</TabsTrigger>
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Project List */}
            <div className="lg:col-span-1 space-y-4">
              <h3 className="text-lg font-semibold">Your Projects</h3>
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className={`cursor-pointer transition-colors ${
                    selectedProject.id === project.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedProject(project)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">{project.title}</CardTitle>
                      <Badge
                        variant={
                          project.status === "active"
                            ? "default"
                            : project.status === "review"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <CardDescription className="text-xs">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex -space-x-2">
                        {project.members.slice(0, 3).map((member, index) => (
                          <Avatar key={index} className="h-6 w-6 border-2 border-background">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="text-xs">
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">{project.members.length} members</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{project.insights} insights</span>
                      <span>{project.lastUpdated}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Project Details */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{selectedProject.title}</CardTitle>
                      <CardDescription>{selectedProject.description}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Team Members */}
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Team Members
                    </h4>
                    <div className="space-y-2">
                      {selectedProject.members.map((member, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 rounded-lg border">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="text-sm font-medium">{member.name}</div>
                            <div className="text-xs text-muted-foreground">{member.role}</div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <MessageCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Recent Activity
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">SC</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm">
                            <strong>Dr. Sarah Chen</strong> uploaded new temperature data from ARGO float #2847
                          </p>
                          <p className="text-xs text-muted-foreground">2 hours ago</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">RP</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm">
                            <strong>Prof. Raj Patel</strong> added analysis comments on temperature anomaly patterns
                          </p>
                          <p className="text-xs text-muted-foreground">5 hours ago</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">MS</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm">
                            <strong>Dr. Maria Santos</strong> shared visualization dashboard with the team
                          </p>
                          <p className="text-xs text-muted-foreground">1 day ago</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project Statistics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 rounded-lg border">
                      <div className="text-2xl font-bold text-primary">{selectedProject.datasets}</div>
                      <div className="text-xs text-muted-foreground">Datasets</div>
                    </div>
                    <div className="text-center p-3 rounded-lg border">
                      <div className="text-2xl font-bold text-chart-2">{selectedProject.insights}</div>
                      <div className="text-xs text-muted-foreground">Insights</div>
                    </div>
                    <div className="text-center p-3 rounded-lg border">
                      <div className="text-2xl font-bold text-chart-3">{selectedProject.members.length}</div>
                      <div className="text-xs text-muted-foreground">Members</div>
                    </div>
                    <div className="text-center p-3 rounded-lg border">
                      <div className="text-2xl font-bold text-chart-4">94%</div>
                      <div className="text-xs text-muted-foreground">Progress</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Community Insights</h3>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Share Insight
              </Button>
            </div>

            {sharedInsights.map((insight) => (
              <Card key={insight.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {insight.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{insight.title}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{insight.author}</span>
                          <span>•</span>
                          <span>{insight.project}</span>
                          <span>•</span>
                          <span>{insight.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">{insight.content}</p>
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Star className="h-4 w-4" />
                      {insight.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <MessageCircle className="h-4 w-4" />
                      {insight.comments}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="marketplace" className="space-y-4">
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">TratonAI Marketplace</h3>
            <p className="text-muted-foreground mb-4">
              Share and discover specialized data models, visualization scripts, and analytical modules
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Coming Soon
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
