import { ChatInterface } from "@/components/chat/chat-interface"
import { Header } from "@/components/header"

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">AI Travel Assistant</h1>
            <p className="text-muted-foreground">
              Tell me what you'd like to do in Jharkhand, and I'll handle everything from planning to booking
            </p>
          </div>
          <ChatInterface />
        </div>
      </main>
    </div>
  )
}
