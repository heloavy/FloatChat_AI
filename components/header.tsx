"use client"

import { Button } from "@/components/ui/button"
import { Settings, User, Moon, Sun, Bell, Search, Waves } from "lucide-react"
import { useTheme } from "next-themes"
import { Input } from "@/components/ui/input"

export function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="border-b border-border/50 bg-gradient-to-r from-card/80 to-card/60 backdrop-blur-sm px-6 py-4 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-20 h-20 bg-primary/5 rounded-full -translate-y-10"></div>
      <div className="absolute top-0 right-1/3 w-16 h-16 bg-accent/5 rounded-full -translate-y-8"></div>

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-accent to-primary shadow-lg flex items-center justify-center animate-float">
              <Waves className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">FloatChat</h1>
              <div className="text-xs text-muted-foreground">AI-Powered Ocean Discovery</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 ml-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search ocean data..."
                className="pl-10 w-64 bg-background/50 border-primary/20 focus:border-primary/60 transition-all duration-300"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gradient-to-r hover:from-yellow-500/20 hover:to-orange-500/20 transition-all duration-300 hover:scale-110"
          >
            <Bell className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-300 hover:scale-110"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gradient-to-r hover:from-green-500/20 hover:to-teal-500/20 transition-all duration-300 hover:scale-110"
          >
            <Settings className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300 hover:scale-110"
          >
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
