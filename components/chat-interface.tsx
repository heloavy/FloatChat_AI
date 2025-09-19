"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Send, Mic, Image, MapPin, BarChart3, Waves, Fish } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  hasChart?: boolean
  chartData?: any
  chartType?: "line" | "bar"
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Welcome to TratonAI! I can help you explore ARGO oceanographic data, analyze marine patterns, and answer questions about ocean conditions. What would you like to discover today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    const scrollToBottom = () => {
      if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
      }
    }

    const timeoutId = setTimeout(scrollToBottom, 100)
    return () => clearTimeout(timeoutId)
  }, [messages, isTyping])

  // Enhanced ARGO data simulation function with cleaner formatting
  const generateArgoResponse = (query: string): { content: string; hasChart?: boolean; chartData?: any; chartType?: "line" | "bar" } => {
    const lowerQuery = query.toLowerCase()
    
    // Salinity queries - cleaned up formatting
    if (lowerQuery.includes("salinity") && lowerQuery.includes("equator") && lowerQuery.includes("march") && lowerQuery.includes("2023")) {
      const salinityData = [
        { ocean: "Pacific", salinity: 34.65, region: "140°W-160°E" },
        { ocean: "Atlantic", salinity: 36.1, region: "40°W-10°E" },
        { ocean: "Indian", salinity: 34.95, region: "40°E-100°E" }
      ]

      const depthData = [
        { depth: "Surface", salinity: 35.0 },
        { depth: "Mixed Layer", salinity: 35.2 },
        { depth: "Thermocline", salinity: 35.15 }
      ]

      return {
        content: `Salinity Levels at the Equator - March 2023

What is Salinity?
Salinity measures how "salty" ocean water is in PSU (Practical Salinity Units).

Ocean Comparison:
• Pacific Ocean: 34.65 PSU (least salty)
• Atlantic Ocean: 36.1 PSU (most salty)  
• Indian Ocean: 34.95 PSU (medium)

Why Different Saltiness?
- Atlantic: High evaporation leaves more salt behind
- Pacific: Heavy tropical rains dilute the salt
- Indian: Mix of both conditions

Depth Analysis:
Surface waters show variation due to rainfall and evaporation, while deeper layers remain more stable.

Data Source:
847 ARGO floats collected measurements along the equator, diving to 2000m depth every 10 days.`,
        hasChart: true,
        chartData: { salinity: salinityData, depth: depthData },
        chartType: "bar"
      }
    }

    // Temperature queries - cleaned up formatting
    if (lowerQuery.includes("temperature") && (lowerQuery.includes("pacific") || lowerQuery.includes("bay of bengal"))) {
      const tempData = [
        { month: "Sep", temperature: 28.5 },
        { month: "Oct", temperature: 29.2 },
        { month: "Nov", temperature: 29.8 },
        { month: "Dec", temperature: 30.1 },
        { month: "Jan", temperature: 29.6 },
        { month: "Feb", temperature: 28.9 }
      ]

      return {
        content: `Ocean Temperature Trends - Last 6 Months

Current Temperature Range: 26.8°C - 30.2°C (80°F - 86°F)

Temperature Changes:
Ocean warming trend: +0.3°C above normal seasonal average.
El Niño climate pattern contributing to increased heat retention.

Measurement System:
1,247 robotic ARGO floats continuously monitor temperature while drifting with ocean currents, providing real-time data coverage.`,
        hasChart: true,
        chartData: tempData,
        chartType: "line"
      }
    }

    // Ocean currents - cleaned up
    if (lowerQuery.includes("current") && lowerQuery.includes("atlantic")) {
      return {
        content: `Atlantic Ocean Currents - Ocean Highway System

Major Current Systems:
• Gulf Stream: Warm water moving north at 3-4 mph
• North Atlantic Current: Extension toward Europe
• Equatorial Counter Current: Opposite direction flow

Temperature Zones:
- Warm currents: 26-32°C
- Cool currents: 18-24°C

Tracking Method:
2,134 floating robots follow currents, diving 2000m every 10 days to map three-dimensional ocean movement patterns.

Function: These currents act as Earth's heat distribution system, moving warm tropical water to cooler regions.`
      }
    }

    // Marine life/ecosystem queries - cleaned up
    if (lowerQuery.includes("marine") && lowerQuery.includes("ecosystem")) {
      return {
        content: `Ocean Temperature & Marine Ecosystem Health

Temperature Impact on Marine Life:

Phytoplankton (Ocean Plants):
Optimal temperature: 18-24°C
These microscopic plants form the base of ocean food webs.

Fish Migration Patterns:
Fish follow the 20°C comfort zone, migrating when temperatures shift beyond optimal ranges.

Coral Reef Health:
Stress threshold: 29°C sustained temperature
Extended heat exposure causes coral bleaching and mortality.

Monitoring System:
892 specialized ARGO floats with bio-optical sensors track:
- Dissolved oxygen levels
- Ocean acidity (pH)
- Chlorophyll concentration
- Food web productivity

Current ocean health status monitored 24/7 through autonomous underwater monitoring network.`
      }
    }

    // Default response - cleaned up
    return {
      content: `TratonAI Ocean Data Assistant

Available Data Services:
- Ocean temperature analysis
- Salinity level mapping  
- Current pattern tracking
- Climate impact assessment

Data Sources:
3,800+ ARGO robotic floats operating globally
- 10-day measurement cycles
- 0-2000m depth profiling
- Temperature, salinity, pressure sensors
- Advanced models include biogeochemical sensors

Coverage: Millions of ocean profiles collected since 2000

Example Queries:
- "Pacific Ocean temperature trends"
- "Atlantic salinity patterns"  
- "Current systems near Japan"
- "Marine ecosystem changes"

Ready to analyze ocean data and explain findings in clear, accessible terms.`
    }
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = input
    setInput("")
    setIsTyping(true)

    // Generate ARGO-based response
    setTimeout(() => {
      const response = generateArgoResponse(currentInput)
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: response.content,
        timestamp: new Date(),
        hasChart: response.hasChart,
        chartData: response.chartData,
        chartType: response.chartType
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const quickActions = [
    {
      icon: MapPin,
      label: "Temperature",
      query: "Show me the current sea surface temperature in the Pacific Ocean",
      color: "bg-gradient-to-r from-orange-400 to-red-500",
    },
    {
      icon: BarChart3,
      label: "Salinity",
      query: "Show me salinity levels at the equator in March 2023",
      color: "bg-gradient-to-r from-blue-400 to-cyan-500",
    },
    {
      icon: Waves,
      label: "Currents",
      query: "Show me the current patterns in the Atlantic Ocean",
      color: "bg-gradient-to-r from-teal-400 to-blue-500",
    },
    {
      icon: Fish,
      label: "Ecosystems",
      query: "What marine ecosystems are affected by temperature changes?",
      color: "bg-gradient-to-r from-green-400 to-emerald-500",
    },
  ]

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Chat Messages - More compact */}
      <div className="flex-1 overflow-hidden">
        <div 
          ref={scrollAreaRef}
          className="h-full overflow-y-auto p-3"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(59, 130, 246, 0.3) transparent'
          }}
        >
          <div className="space-y-3 max-w-5xl mx-auto">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <Card
                  className={`${message.hasChart && message.chartData ? 'max-w-[95%]' : 'max-w-[90%]'} p-3 transition-all duration-200 ${
                    message.type === "user"
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md"
                      : "bg-white/90 dark:bg-slate-800/90 backdrop-blur border border-slate-200 dark:border-slate-700"
                  }`}
                >
                  {/* Layout: Text and Chart Side by Side for Better Screenshot */}
                  <div className={`${message.hasChart && message.chartData ? 'grid grid-cols-1 xl:grid-cols-2 gap-4' : ''}`}>
                    <div className="text-sm leading-relaxed whitespace-pre-line font-medium">{message.content}</div>
                    
                    {/* Chart Display - Always Visible with Text */}
                    {message.hasChart && message.chartData && (
                      <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-md border">
                        {message.chartType === "bar" && message.chartData.salinity ? (
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-xs font-semibold mb-2 text-center text-slate-600 dark:text-slate-300">
                                Salinity by Ocean Basin (PSU)
                              </h4>
                              <ResponsiveContainer width="100%" height={160}>
                                <BarChart data={message.chartData.salinity} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                                  <CartesianGrid strokeDasharray="2 2" stroke="#cbd5e1" opacity={0.3} />
                                  <XAxis dataKey="ocean" stroke="#64748b" fontSize={11} />
                                  <YAxis stroke="#64748b" fontSize={11} domain={['dataMin - 0.1', 'dataMax + 0.1']} />
                                  <Tooltip 
                                    contentStyle={{ 
                                      backgroundColor: '#1e293b', 
                                      border: '1px solid #475569', 
                                      borderRadius: '6px',
                                      fontSize: '12px'
                                    }} 
                                    formatter={(value) => [`${value} PSU`, 'Salinity']}
                                  />
                                  <Bar dataKey="salinity" fill="#3b82f6" radius={[3, 3, 0, 0]} />
                                </BarChart>
                              </ResponsiveContainer>
                            </div>
                            
                            <div>
                              <h4 className="text-xs font-semibold mb-2 text-center text-slate-600 dark:text-slate-300">
                                Salinity by Depth Layer (PSU)
                              </h4>
                              <ResponsiveContainer width="100%" height={160}>
                                <BarChart data={message.chartData.depth} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                                  <CartesianGrid strokeDasharray="2 2" stroke="#cbd5e1" opacity={0.3} />
                                  <XAxis dataKey="depth" stroke="#64748b" fontSize={10} />
                                  <YAxis stroke="#64748b" fontSize={11} domain={['dataMin - 0.05', 'dataMax + 0.05']} />
                                  <Tooltip 
                                    contentStyle={{ 
                                      backgroundColor: '#1e293b', 
                                      border: '1px solid #475569', 
                                      borderRadius: '6px',
                                      fontSize: '12px'
                                    }}
                                    formatter={(value) => [`${value} PSU`, 'Salinity']}
                                  />
                                  <Bar dataKey="salinity" fill="#10b981" radius={[3, 3, 0, 0]} />
                                </BarChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        ) : message.chartType === "line" ? (
                          <div>
                            <h4 className="text-xs font-semibold mb-2 text-center text-slate-600 dark:text-slate-300">
                              Temperature Trends (°C)
                            </h4>
                            <ResponsiveContainer width="100%" height={250}>
                              <LineChart data={message.chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="2 2" stroke="#cbd5e1" opacity={0.3} />
                                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                                <YAxis stroke="#64748b" fontSize={11} domain={['dataMin - 0.5', 'dataMax + 0.5']} />
                                <Tooltip 
                                  contentStyle={{ 
                                    backgroundColor: '#1e293b', 
                                    border: '1px solid #475569', 
                                    borderRadius: '6px',
                                    fontSize: '12px'
                                  }} 
                                  formatter={(value) => [`${value}°C`, 'Temperature']}
                                />
                                <Line 
                                  type="monotone" 
                                  dataKey="temperature" 
                                  stroke="#f59e0b" 
                                  strokeWidth={2.5}
                                  dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                                  activeDot={{ r: 6, fill: '#f59e0b' }}
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        ) : null}
                      </div>
                    )}
                  </div>
                  
                  <div
                    className={`text-xs mt-2 opacity-60 ${
                      message.type === "user" ? "text-white/80" : "text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </Card>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur border border-slate-200 dark:border-slate-700 p-3">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
                      <div
                        className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Analyzing ARGO data...</span>
                  </div>
                </Card>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Compact Input Area */}
      <div className="border-t border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur p-3">
        <div className="max-w-5xl mx-auto">
          {/* Quick Actions - Compact */}
          <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className={`flex items-center gap-1.5 whitespace-nowrap border-0 text-white font-medium text-xs px-3 py-1.5 h-auto transition-all duration-200 hover:scale-105 ${action.color}`}
                onClick={() => setInput(action.query)}
              >
                <action.icon className="h-3 w-3" />
                {action.label}
              </Button>
            ))}
          </div>

          {/* Input Area - Compact */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about ocean data, salinity, temperature..."
                className="pr-16 bg-slate-50 dark:bg-slate-900 border-slate-300 dark:border-slate-600 focus:border-blue-400 dark:focus:border-blue-500 text-sm h-9"
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
              />
              <div className="absolute right-1 top-1/2 -translate-y-1/2 flex gap-1">
                <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-slate-200 dark:hover:bg-slate-700">
                  <Mic className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-slate-200 dark:hover:bg-slate-700">
                  <Image className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <Button
              onClick={handleSend}
              disabled={!input.trim()}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 h-9 px-3"
            >
              <Send className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
