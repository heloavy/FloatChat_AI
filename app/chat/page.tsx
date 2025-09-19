import ChatInterface from "/components/chat-interface"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

export default function ChatPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-hidden">
          <ChatInterface />
        </main>
      </div>
    </div>
  )
}
