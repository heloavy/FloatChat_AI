"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  MessageSquare,
  BarChart3,
  Users,
  GraduationCap,
  Database,
  Waves,
  TrendingUp,
  AlertTriangle,
  Anchor,
  Fish,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    {
      href: "/",
      icon: BarChart3,
      label: "Data Dashboard",
      color: "hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20",
    },
    {
      href: "/chat",
      icon: MessageSquare,
      label: "Chat Interface",
      color: "hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-cyan-500/20",
    },
    {
      href: "/collaboration",
      icon: Users,
      label: "Collaboration",
      color: "hover:bg-gradient-to-r hover:from-green-500/20 hover:to-emerald-500/20",
    },
    {
      href: "/education",
      icon: GraduationCap,
      label: "Education",
      color: "hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-red-500/20",
    },
  ]

  return (
    <aside className="w-64 bg-gradient-to-b from-sidebar to-sidebar/80 border-r border-sidebar-border/50 p-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/5 rounded-full translate-y-12 -translate-x-12"></div>

      <div className="mb-6 relative z-10">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
            <Anchor className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-sidebar-foreground">FloatChat</h2>
            <p className="text-xs text-muted-foreground">Ocean Intelligence</p>
          </div>
        </div>
      </div>

      <nav className="space-y-2 relative z-10">
        {navItems.map((item) => {
          const IconComponent = item.icon
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={`w-full justify-start gap-3 h-12 transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-primary/20 to-accent/20 text-primary border border-primary/30 shadow-md"
                    : `${item.color} border border-transparent hover:border-primary/20 hover:shadow-sm`
                }`}
              >
                <IconComponent className={`h-4 w-4 ${isActive ? "text-primary" : ""}`} />
                <span className="font-medium">{item.label}</span>
              </Button>
            </Link>
          )
        })}
      </nav>

      <div className="mt-8 relative z-10">
        <h3 className="text-sm font-semibold text-sidebar-foreground mb-4 flex items-center gap-2">
          <Fish className="h-4 w-4 text-primary" />
          Ocean Metrics
        </h3>
        <div className="space-y-3">
          <Card className="p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/20 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Database className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold text-blue-600">47,382</div>
                <div className="text-xs text-muted-foreground">ARGO Profiles</div>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-r from-teal-500/10 to-emerald-500/10 border-teal-500/20 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
                <Waves className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold text-teal-600">2.3 hrs</div>
                <div className="text-xs text-muted-foreground">Processing Time</div>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-r from-green-500/10 to-lime-500/10 border-green-500/20 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-lime-500 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold text-green-600">85%</div>
                <div className="text-xs text-muted-foreground">Pipeline Complete</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-6 relative z-10">
        <Card className="p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/30 hover:shadow-lg transition-all duration-300 animate-pulse-slow">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
              <AlertTriangle className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="text-sm font-semibold text-orange-600">System Alert</div>
              <div className="text-xs text-muted-foreground">3 floats offline</div>
              <Button
                size="sm"
                variant="outline"
                className="mt-2 h-6 text-xs border-orange-500/30 hover:bg-orange-500/10 bg-transparent"
              >
                View Details
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </aside>
  )
}
