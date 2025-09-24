"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from "recharts"
import { MapPin, Thermometer, Droplets, Gauge, TrendingUp, Download, RefreshCw, ZoomIn, ZoomOut } from "lucide-react"

// Mock data for ARGO profiles
const temperatureData = [
  { month: "Jan", surface: 24.2, depth100: 18.5, depth500: 12.3 },
  { month: "Feb", surface: 24.8, depth100: 19.1, depth500: 12.8 },
  { month: "Mar", surface: 26.1, depth100: 20.2, depth500: 13.5 },
  { month: "Apr", surface: 27.5, depth100: 21.8, depth500: 14.2 },
  { month: "May", surface: 28.9, depth100: 23.1, depth500: 15.1 },
  { month: "Jun", surface: 29.8, depth100: 24.5, depth500: 16.2 },
]

const salinityData = [
  { depth: 0, salinity: 35.2 },
  { depth: 50, salinity: 35.4 },
  { depth: 100, salinity: 35.6 },
  { depth: 200, salinity: 35.8 },
  { depth: 500, salinity: 34.9 },
  { depth: 1000, salinity: 34.7 },
  { depth: 1500, salinity: 34.6 },
  { depth: 2000, salinity: 34.5 },
]

const floatLocations = [
  { lat: 15.2, lon: 73.8, temp: 28.5, status: "active", ocean: "indian" },
  { lat: 12.5, lon: 75.2, temp: 27.8, status: "active", ocean: "indian" },
  { lat: 18.7, lon: 72.1, temp: 29.2, status: "inactive", ocean: "indian" },
  { lat: 16.8, lon: 74.5, temp: 28.1, status: "active", ocean: "indian" },
  { lat: 14.3, lon: 76.2, temp: 27.5, status: "active", ocean: "indian" },
  { lat: 23.5, lon: 120.5, temp: 26.7, status: "active", ocean: "pacific" },
  { lat: 40.5, lon: -74.5, temp: 25.3, status: "active", ocean: "atlantic" },
  { lat: 71.5, lon: -100.5, temp: 24.8, status: "active", ocean: "arctic" },
  { lat: -40.5, lon: 140.5, temp: 23.9, status: "active", ocean: "southern" },
]

const anomalyData = [
  { time: "00:00", temperature: 0.2, salinity: -0.1 },
  { time: "04:00", temperature: 0.5, salinity: 0.3 },
  { time: "08:00", temperature: 1.2, salinity: 0.8 },
  { time: "12:00", temperature: 2.1, salinity: 1.5 },
  { time: "16:00", temperature: 1.8, salinity: 1.2 },
  { time: "20:00", temperature: 0.9, salinity: 0.4 },
]

// Interactive Earth Map Component
const EarthMap = ({ floats, selectedOcean }) => {
  const [zoom, setZoom] = useState(1)
  const [panX, setPanX] = useState(0)
  const [panY, setPanY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const filteredFloats = floats.filter((float) => selectedOcean === "all" || float.ocean === selectedOcean)

  const handleZoomIn = () => setZoom(prev => Math.min(prev * 1.5, 4))
  const handleZoomOut = () => setZoom(prev => Math.max(prev / 1.5, 0.5))

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - panX, y: e.clientY - panY })
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    setPanX(e.clientX - dragStart.x)
    setPanY(e.clientY - dragStart.y)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Convert lat/lon to screen coordinates
  const getScreenPosition = (lat, lon) => {
    const x = ((lon + 180) / 360) * 400
    const y = ((90 - lat) / 180) * 200
    return { x, y }
  }

  // Generate world map as solid shapes
  const generateWorldMap = () => {
    return (
      <g>
        {/* North America */}
        <path
          d="M 40 40 L 45 35 L 50 30 L 60 25 L 80 30 L 100 35 L 120 40 L 140 45 L 150 50 L 155 60 L 150 70 L 140 75 L 120 80 L 100 85 L 80 80 L 60 75 L 50 70 L 45 60 L 40 50 Z"
          fill="#94a3b8"
          opacity="0.8"
        />
        
        {/* South America */}
        <path
          d="M 120 110 L 130 105 L 140 110 L 145 120 L 150 140 L 145 160 L 140 170 L 135 175 L 125 180 L 120 175 L 115 165 L 110 150 L 115 130 L 120 110 Z"
          fill="#94a3b8"
          opacity="0.8"
        />
        
        {/* Europe */}
        <path
          d="M 190 45 L 200 40 L 220 42 L 240 45 L 245 55 L 240 65 L 220 70 L 200 68 L 190 60 L 185 50 Z"
          fill="#94a3b8"
          opacity="0.8"
        />
        
        {/* Africa */}
        <path
          d="M 180 80 L 200 75 L 220 80 L 240 85 L 250 100 L 255 120 L 250 140 L 240 155 L 220 160 L 200 155 L 180 150 L 170 130 L 175 110 L 180 90 Z"
          fill="#94a3b8"
          opacity="0.8"
        />
        
        {/* Asia */}
        <path
          d="M 245 30 L 280 25 L 320 30 L 360 35 L 380 40 L 390 50 L 385 70 L 370 80 L 350 85 L 320 80 L 280 75 L 250 70 L 245 50 Z"
          fill="#94a3b8"
          opacity="0.8"
        />
        
        {/* Australia */}
        <path
          d="M 320 140 L 340 135 L 360 140 L 370 150 L 365 160 L 350 165 L 330 160 L 320 150 Z"
          fill="#94a3b8"
          opacity="0.8"
        />
        
        {/* Greenland */}
        <path
          d="M 160 20 L 170 15 L 180 20 L 175 35 L 165 40 L 155 35 L 160 25 Z"
          fill="#94a3b8"
          opacity="0.8"
        />
      </g>
    )
  }

  return (
    <div className="relative w-full h-[350px] bg-gradient-to-b from-blue-100 to-blue-50 dark:from-blue-900 dark:to-blue-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      {/* Zoom Controls */}
      <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
        <Button size="sm" variant="outline" onClick={handleZoomIn} className="w-8 h-8 p-0 bg-white/80 hover:bg-white">
          <ZoomIn className="h-3 w-3" />
        </Button>
        <Button size="sm" variant="outline" onClick={handleZoomOut} className="w-8 h-8 p-0 bg-white/80 hover:bg-white">
          <ZoomOut className="h-3 w-3" />
        </Button>
      </div>

      {/* Map Container */}
      <div
        className="w-full h-full cursor-move"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 400 200"
          className="w-full h-full"
          style={{
            transform: `scale(${zoom}) translate(${panX / zoom}px, ${panY / zoom}px)`,
            transformOrigin: 'center center'
          }}
        >
          {/* World map continents */}
          {generateWorldMap()}
          
          {/* Ocean grid lines */}
          <defs>
            <pattern id="oceanGrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="0.5" fill="#0ea5e9" opacity="0.2" />
            </pattern>
          </defs>
          <rect width="400" height="200" fill="url(#oceanGrid)" />
          
          {/* Equator line */}
          <line x1="0" y1="100" x2="400" y2="100" stroke="#64748b" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.5" />
          
          {/* Prime meridian */}
          <line x1="200" y1="0" x2="200" y2="200" stroke="#64748b" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.5" />
          
          {/* ARGO Float markers */}
          {filteredFloats.map((float, index) => {
            const pos = getScreenPosition(float.lat, float.lon)
            return (
              <g key={index}>
                {/* Float marker */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="4"
                  fill={float.status === "active" ? "#10b981" : "#f59e0b"}
                  stroke="white"
                  strokeWidth="1.5"
                  className="drop-shadow-sm"
                />
                {/* Pulse animation for active floats */}
                {float.status === "active" && (
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="6"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="1"
                    opacity="0.6"
                  >
                    <animate
                      attributeName="r"
                      values="4;8;4"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.6;0;0.6"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
                {/* Temperature label */}
                <text
                  x={pos.x}
                  y={pos.y - 8}
                  textAnchor="middle"
                  className="text-xs font-semibold fill-gray-700 dark:fill-gray-300"
                  fontSize="3"
                >
                  {float.temp}°C
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="absolute bottom-2 left-2 bg-white/90 dark:bg-gray-800/90 p-2 rounded border text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Active</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span>Inactive</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function DataVisualizationDashboard() {
  const [selectedOcean, setSelectedOcean] = useState("all")

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <p className="font-medium">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.name}: ${entry.value}${entry.name?.includes('Temperature') || entry.name?.includes('°C') ? '°C' : entry.name?.includes('Salinity') ? ' PSU' : ''}`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900">
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Ocean Data Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg mt-2">
              Real-time ARGO float data and oceanographic insights
            </p>
          </div>
          <div className="flex gap-3">
            <Select value={selectedOcean} onValueChange={setSelectedOcean}>
              <SelectTrigger className="w-[220px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <SelectValue placeholder="Select Ocean" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">🌊 All Oceans</SelectItem>
                <SelectItem value="indian">🌊 Indian Ocean</SelectItem>
                <SelectItem value="pacific">🌊 Pacific Ocean</SelectItem>
                <SelectItem value="atlantic">🌊 Atlantic Ocean</SelectItem>
                <SelectItem value="arctic">🌊 Arctic Ocean</SelectItem>
                <SelectItem value="southern">🌊 Southern Ocean</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="bg-white dark:bg-gray-800">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Data Sources Card */}
        <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border-blue-200 dark:border-blue-800 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
              <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                Data Sources
              </Badge>
              Transparency & Credibility
            </CardTitle>
            <CardDescription className="text-blue-700 dark:text-blue-300">
              FloatChat integrates high-quality oceanographic data from multiple trusted sources
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: "✅", title: "ARGO Floats", desc: "Real-time & delayed-mode data", color: "blue" },
                { icon: "🚢", title: "Ship-based Readings", desc: "Research vessel measurements", color: "teal" },
                { icon: "🛰️", title: "Satellite Observations", desc: "Oceanographic remote sensing", color: "green" },
                { icon: "👩‍🔬", title: "Research Publications", desc: "Peer-reviewed contributions", color: "purple" }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                  <div className={`w-10 h-10 rounded-full bg-${item.color}-100 dark:bg-${item.color}-900 flex items-center justify-center text-lg`}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-gray-900 dark:text-gray-100">{item.title}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: "Active Floats",
              value: selectedOcean === "all" ? "1,247" : selectedOcean === "pacific" ? "487" : selectedOcean === "atlantic" ? "312" : selectedOcean === "indian" ? "298" : selectedOcean === "southern" ? "89" : "61",
              change: selectedOcean === "all" ? "+12% from last month" : `in ${selectedOcean} ocean`,
              icon: MapPin,
              color: "from-blue-500 to-blue-600"
            },
            {
              title: "Avg Temperature",
              value: "28.4°C",
              change: "+0.8°C from seasonal avg",
              icon: Thermometer,
              color: "from-orange-500 to-red-500"
            },
            {
              title: "Salinity Level",
              value: "35.2 PSU",
              change: "Within normal range",
              icon: Droplets,
              color: "from-cyan-500 to-blue-500"
            },
            {
              title: "Data Quality",
              value: "94.7%",
              change: "Excellent data integrity",
              icon: Gauge,
              color: "from-green-500 to-emerald-500"
            }
          ].map((metric, index) => (
            <Card key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">{metric.title}</CardTitle>
                <div className={`p-2 rounded-lg bg-gradient-to-r ${metric.color}`}>
                  <metric.icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{metric.value}</div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{metric.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Visualization Tabs */}
        <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur border border-gray-200 dark:border-gray-700 shadow-xl">
          <Tabs defaultValue="temperature" className="space-y-6 p-6">
            <TabsList className="grid w-full grid-cols-4 bg-gray-100 dark:bg-gray-700">
              <TabsTrigger value="temperature" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600">Temperature Trends</TabsTrigger>
              <TabsTrigger value="salinity" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600">Salinity Profiles</TabsTrigger>
              <TabsTrigger value="floats" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600">Float Locations</TabsTrigger>
              <TabsTrigger value="anomalies" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600">Anomaly Detection</TabsTrigger>
            </TabsList>

            <TabsContent value="temperature" className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Sea Temperature by Depth</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Temperature variations across different ocean depths over the past 6 months</p>
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={temperatureData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                      <YAxis stroke="#6b7280" fontSize={12} />
                      <Tooltip content={<CustomTooltip />} />
                      <Line
                        type="monotone"
                        dataKey="surface"
                        stroke="#f59e0b"
                        strokeWidth={3}
                        name="Surface (0m)"
                        dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="depth100"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        name="100m depth"
                        dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="depth500"
                        stroke="#10b981"
                        strokeWidth={3}
                        name="500m depth"
                        dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="salinity" className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Salinity Depth Profile</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Salinity measurements at various ocean depths</p>
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={salinityData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="depth" stroke="#6b7280" fontSize={12} />
                      <YAxis stroke="#6b7280" fontSize={12} domain={['dataMin - 0.1', 'dataMax + 0.1']} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="salinity"
                        stroke="#06b6d4"
                        fill="#06b6d4"
                        fillOpacity={0.3}
                        strokeWidth={3}
                        name="Salinity (PSU)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="floats" className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">ARGO Float Distribution</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Current locations and status of active ARGO floats</p>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <EarthMap floats={floatLocations} selectedOcean={selectedOcean} />
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Float Status Summary</h4>
                    <div className="max-h-80 overflow-y-auto space-y-2 pr-2">
                      {floatLocations
                        .filter((float) => selectedOcean === "all" || float.ocean === selectedOcean)
                        .map((float, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3">
                              <Badge variant={float.status === "active" ? "default" : "secondary"} className={float.status === "active" ? "bg-green-100 text-green-800" : ""}>
                                {float.status}
                              </Badge>
                              <div>
                                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Float {index + 1}</div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                  {float.lat}°N, {Math.abs(float.lon)}°{float.lon < 0 ? 'W' : 'E'}
                                </div>
                              </div>
                            </div>
                            <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">{float.temp}°C</div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="anomalies" className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Anomaly Detection</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Real-time detection of unusual patterns in ocean data</p>
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={anomalyData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
                      <YAxis stroke="#6b7280" fontSize={12} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="temperature" fill="#f59e0b" name="Temperature Anomaly (°C)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="salinity" fill="#06b6d4" name="Salinity Anomaly (PSU)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        {/* AI Insights */}
        <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur border border-gray-200 dark:border-gray-700 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              AI-Generated Insights
            </CardTitle>
            <CardDescription>Latest patterns and predictions from TratonAI analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  type: "Temperature",
                  title: "Warming trend detected",
                  description: "Sea surface temperatures in the Arabian Sea have increased by 0.8°C above seasonal average, indicating potential El Niño influence.",
                  confidence: 87,
                  time: "2 hours ago",
                  color: "orange"
                },
                {
                  type: "Salinity",
                  title: "Freshwater influx",
                  description: "Decreased salinity levels near the Bay of Bengal suggest increased monsoon runoff affecting coastal waters.",
                  confidence: 92,
                  time: "4 hours ago",
                  color: "blue"
                },
                {
                  type: "Prediction",
                  title: "Float trajectory forecast",
                  description: "ARGO float #2847 is predicted to drift southeast, reaching optimal sampling position within 72 hours.",
                  confidence: 78,
                  time: "6 hours ago",
                  color: "green"
                }
              ].map((insight, index) => (
                <div key={index} className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className={`mt-1 bg-${insight.color}-100 text-${insight.color}-800 dark:bg-${insight.color}-900 dark:text-${insight.color}-200`}>
                      {insight.type}
                    </Badge>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-gray-100">
                        <strong>{insight.title}:</strong> {insight.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Confidence: {insight.confidence}%
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Generated {insight.time}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}