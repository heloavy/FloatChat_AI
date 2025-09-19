import { CollaborativeWorkspace } from "@/components/collaborative-workspace"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

export default function CollaborationPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto">
          <CollaborativeWorkspace />
        </main>
      </div>
    </div>
  )
}
