"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { BookOpen, CheckCircle, Clock, Users, Award, Waves, Thermometer, Globe, ArrowRight, Star } from "lucide-react"

// Mock data for educational content
const courses = [
  {
    id: 1,
    title: "Introduction to Oceanography",
    description: "Learn the fundamentals of ocean science and marine data collection",
    level: "Beginner",
    duration: "2 hours",
    modules: 8,
    progress: 0,
    students: 1247,
    rating: 4.8,
    topics: ["Ocean Basics", "Water Properties", "Marine Life", "Data Collection"],
    videoUrl: "https://www.youtube.com/watch?v=Cq4G2ciXjZI", // Introduction to Oceanography
  },
  {
    id: 2,
    title: "Understanding ARGO Floats",
    description: "Deep dive into ARGO float technology and data interpretation",
    level: "Intermediate",
    duration: "3 hours",
    modules: 12,
    progress: 45,
    students: 892,
    rating: 4.9,
    topics: ["Float Technology", "Data Transmission", "Quality Control", "Analysis Methods"],
    videoUrl: "https://www.youtube.com/watch?v=qOW_RBhGhpE", // ARGO Floats Explained
  },
  {
    id: 3,
    title: "Climate Change and Ocean Data",
    description: "Explore how ocean data reveals climate change patterns",
    level: "Advanced",
    duration: "4 hours",
    modules: 15,
    progress: 0,
    students: 634,
    rating: 4.7,
    topics: ["Climate Indicators", "Long-term Trends", "Predictive Models", "Policy Implications"],
    videoUrl: "https://www.youtube.com/watch?v=ffjIyms1BX4", // Ocean and Climate Change
  },
]

const interactiveLessons = [
  {
    id: 1,
    title: "Ocean Temperature Layers",
    description: "Interactive visualization of ocean temperature stratification",
    type: "simulation",
    duration: "15 min",
    difficulty: "Beginner",
    completed: false,
  },
  {
    id: 2,
    title: "ARGO Float Journey",
    description: "Follow a virtual ARGO float as it collects data across the ocean",
    type: "interactive",
    duration: "20 min",
    difficulty: "Intermediate",
    completed: true,
  },
  {
    id: 3,
    title: "Salinity and Ocean Circulation",
    description: "Explore how salinity differences drive ocean currents",
    type: "visualization",
    duration: "25 min",
    difficulty: "Advanced",
    completed: false,
  },
]

const quizzes = [
  {
    id: 1,
    title: "Ocean Basics Quiz",
    questions: 10,
    timeLimit: "15 min",
    difficulty: "Beginner",
    bestScore: 85,
    attempts: 2,
  },
  {
    id: 2,
    title: "ARGO Data Interpretation",
    questions: 15,
    timeLimit: "20 min",
    difficulty: "Intermediate",
    bestScore: null,
    attempts: 0,
  },
  {
    id: 3,
    title: "Climate Science Assessment",
    questions: 20,
    timeLimit: "30 min",
    difficulty: "Advanced",
    bestScore: 92,
    attempts: 1,
  },
]

export function EducationalModule() {
  const [selectedCourse, setSelectedCourse] = useState(courses[0])

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Ocean Science Education</h1>
          <p className="text-muted-foreground">Learn oceanography through interactive lessons and real ARGO data</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">100K+</div>
            <div className="text-xs text-muted-foreground">Students Reached</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-chart-2">25</div>
            <div className="text-xs text-muted-foreground">Courses Available</div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="courses" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="interactive">Interactive Lessons</TabsTrigger>
          <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
          <TabsTrigger value="progress">My Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Course List */}
            <div className="lg:col-span-1 space-y-4">
              <h3 className="text-lg font-semibold">Available Courses</h3>
              {courses.map((course) => (
                <Card
                  key={course.id}
                  className={`cursor-pointer transition-colors ${
                    selectedCourse.id === course.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedCourse(course)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge
                        variant={
                          course.level === "Beginner"
                            ? "default"
                            : course.level === "Intermediate"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {course.level}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{course.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-sm">{course.title}</CardTitle>
                    <CardDescription className="text-xs">{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {course.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {course.students}
                        </span>
                      </div>
                      {course.progress > 0 && (
                        <div className="space-y-1">
                          <Progress value={course.progress} className="h-1" />
                          <div className="text-xs text-muted-foreground">{course.progress}% complete</div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Course Details */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{selectedCourse.title}</CardTitle>
                      <CardDescription className="mt-2">{selectedCourse.description}</CardDescription>
                    </div>
                    <Button>
                      {selectedCourse.progress > 0 ? "Continue" : "Start Course"}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Course Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 rounded-lg border">
                      <div className="text-lg font-bold text-primary">{selectedCourse.modules}</div>
                      <div className="text-xs text-muted-foreground">Modules</div>
                    </div>
                    <div className="text-center p-3 rounded-lg border">
                      <div className="text-lg font-bold text-chart-2">{selectedCourse.duration}</div>
                      <div className="text-xs text-muted-foreground">Duration</div>
                    </div>
                    <div className="text-center p-3 rounded-lg border">
                      <div className="text-lg font-bold text-chart-3">{selectedCourse.students}</div>
                      <div className="text-xs text-muted-foreground">Students</div>
                    </div>
                    <div className="text-center p-3 rounded-lg border">
                      <div className="text-lg font-bold text-chart-4">{selectedCourse.rating}</div>
                      <div className="text-xs text-muted-foreground">Rating</div>
                    </div>
                  </div>

                  {/* Course Topics */}
                  <div>
                    <h4 className="font-medium mb-3">What You'll Learn</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedCourse.topics.map((topic, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 rounded-lg border">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span className="text-sm">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Course Preview */}
                  <div>
                    <h4 className="font-medium mb-3">Course Preview</h4>
                    <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                      <iframe
                        src={`https://www.youtube.com/embed/${selectedCourse.videoUrl.split("v=")[1]?.split("&")[0]}`}
                        title={`${selectedCourse.title} - Course Preview`}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Watch this introduction video to get started with {selectedCourse.title}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="interactive" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {interactiveLessons.map((lesson) => (
              <Card key={lesson.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{lesson.type}</Badge>
                    {lesson.completed && <CheckCircle className="h-4 w-4 text-primary" />}
                  </div>
                  <CardTitle className="text-base">{lesson.title}</CardTitle>
                  <CardDescription className="text-sm">{lesson.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {lesson.duration}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {lesson.difficulty}
                    </Badge>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full" variant={lesson.completed ? "outline" : "default"}>
                        {lesson.completed ? "Review" : "Start Lesson"}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>{lesson.title}</DialogTitle>
                        <DialogDescription>{lesson.description}</DialogDescription>
                      </DialogHeader>
                      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          {lesson.type === "simulation" && <Waves className="h-12 w-12 text-primary mx-auto mb-2" />}
                          {lesson.type === "interactive" && <Globe className="h-12 w-12 text-primary mx-auto mb-2" />}
                          {lesson.type === "visualization" && (
                            <Thermometer className="h-12 w-12 text-primary mx-auto mb-2" />
                          )}
                          <p className="text-sm text-muted-foreground">Interactive lesson content would load here</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quizzes" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quizzes.map((quiz) => (
              <Card key={quiz.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={
                        quiz.difficulty === "Beginner"
                          ? "default"
                          : quiz.difficulty === "Intermediate"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {quiz.difficulty}
                    </Badge>
                    {quiz.bestScore && (
                      <div className="flex items-center gap-1">
                        <Award className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium">{quiz.bestScore}%</span>
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-base">{quiz.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{quiz.questions} questions</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {quiz.timeLimit}
                      </span>
                    </div>

                    {quiz.attempts > 0 && (
                      <div className="text-xs text-muted-foreground">Attempts: {quiz.attempts}</div>
                    )}

                    <Button className="w-full" variant={quiz.bestScore ? "outline" : "default"}>
                      {quiz.bestScore ? "Retake Quiz" : "Start Quiz"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Learning Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Learning Progress</CardTitle>
                <CardDescription>Your journey through ocean science education</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {courses.map((course) => (
                    <div key={course.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{course.title}</span>
                        <span className="text-sm text-muted-foreground">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
                <CardDescription>Badges and certifications earned</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-lg border">
                    <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="text-sm font-medium">First Course</div>
                    <div className="text-xs text-muted-foreground">Completed</div>
                  </div>

                  <div className="text-center p-4 rounded-lg border opacity-50">
                    <Award className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <div className="text-sm font-medium">Quiz Master</div>
                    <div className="text-xs text-muted-foreground">Locked</div>
                  </div>

                  <div className="text-center p-4 rounded-lg border opacity-50">
                    <Waves className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <div className="text-sm font-medium">Ocean Explorer</div>
                    <div className="text-xs text-muted-foreground">Locked</div>
                  </div>

                  <div className="text-center p-4 rounded-lg border opacity-50">
                    <Star className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <div className="text-sm font-medium">Data Analyst</div>
                    <div className="text-xs text-muted-foreground">Locked</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
