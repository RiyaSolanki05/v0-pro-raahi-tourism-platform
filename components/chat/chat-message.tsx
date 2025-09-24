import { Card } from "@/components/ui/card"
import { Bot, User, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  isLoading?: boolean
}

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  return (
    <div className={cn("flex gap-3", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-primary" />
        </div>
      )}

      <Card className={cn("max-w-[80%] p-3", isUser ? "bg-primary text-primary-foreground" : "bg-muted/50")}>
        {message.isLoading ? (
          <div className="flex items-center space-x-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm text-muted-foreground">AI is thinking...</span>
          </div>
        ) : (
          <p className="text-sm leading-relaxed">{message.content}</p>
        )}
      </Card>

      {isUser && (
        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-primary" />
        </div>
      )}
    </div>
  )
}
