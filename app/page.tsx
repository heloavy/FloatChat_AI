import { DataVisualizationDashboard } from "@/components/data-visualization-dashboard"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

export default function HomePage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto">
          <DataVisualizationDashboard />
        </main>
      </div>
    </div>
  )
}
