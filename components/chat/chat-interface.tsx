"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Loader2, Mic, MicOff, Volume2 } from "lucide-react"
import { ChatMessage } from "./chat-message"
import { QuickActions } from "./quick-actions"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  isLoading?: boolean
  language?: string
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello! Welcome to Jharkhand Tourism Assistant. How can I help you explore the beautiful state of Jharkhand? 🌿",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [isRecording, setIsRecording] = useState(false)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
    { code: "bn", name: "বাংলা", flag: "🇧🇩" },
    { code: "or", name: "ଓଡ଼ିଆ", flag: "🇮🇳" },
    { code: "ur", name: "اردو", flag: "🇵🇰" },
  ]

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (content: string, language?: string) => {
    if (!content.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
      language: language || selectedLanguage,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Add loading message
    const loadingMessage: Message = {
      id: `loading-${Date.now()}`,
      role: "assistant",
      content: "",
      timestamp: new Date(),
      isLoading: true,
    }
    setMessages((prev) => [...prev, loadingMessage])

    try {
      console.log("[v0] Sending message to API:", content, "Language:", language || selectedLanguage)

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: content,
          language: language || selectedLanguage,
          session_id: "user-session-" + Date.now(),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get AI response")
      }

      const data = await response.json()
      const aiResponse = data.response

      console.log("[v0] Received response:", aiResponse.substring(0, 100) + "...", "Mode:", data.processing_mode)

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingMessage.id
            ? { ...msg, content: aiResponse, isLoading: false, language: data.language }
            : msg,
        ),
      )

      if ("speechSynthesis" in window && aiResponse) {
        setTimeout(() => playTextToSpeech(aiResponse, data.language || selectedLanguage), 500)
      }
    } catch (error) {
      console.error("[v0] Chat error:", error)
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingMessage.id
            ? {
                ...msg,
                content: "I apologize, but I'm having trouble processing your request right now. Please try again.",
                isLoading: false,
              }
            : msg,
        ),
      )
    } finally {
      setIsLoading(false)
    }
  }

  const playTextToSpeech = (text: string, language: string) => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel() // Cancel any ongoing speech

      const utterance = new SpeechSynthesisUtterance(text)

      // Language mapping for TTS
      const languageMap: { [key: string]: string } = {
        en: "en-US",
        hi: "hi-IN",
        bn: "bn-IN",
        or: "or-IN",
        ur: "ur-PK",
      }

      const targetLang = languageMap[language] || "en-US"

      // Set voice properties
      utterance.rate = 0.9
      utterance.pitch = 1.0
      utterance.volume = 1.0

      // Try to find appropriate voice
      const voices = speechSynthesis.getVoices()
      let voice = voices.find((v) => v.lang === targetLang)
      if (!voice) {
        const langFamily = targetLang.split("-")[0]
        voice = voices.find((v) => v.lang.startsWith(langFamily))
      }
      if (voice) {
        utterance.voice = voice
      }

      speechSynthesis.speak(utterance)
    }
  }

  const toggleRecording = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const recorder = new MediaRecorder(stream)
        const audioChunks: BlobPart[] = []

        recorder.ondataavailable = (event) => {
          audioChunks.push(event.data)
        }

        recorder.onstop = async () => {
          const audioBlob = new Blob(audioChunks, { type: "audio/wav" })
          await processAudioInput(audioBlob)
          stream.getTracks().forEach((track) => track.stop())
        }

        recorder.start()
        setMediaRecorder(recorder)
        setIsRecording(true)
      } catch (error) {
        console.error("[v0] Error accessing microphone:", error)
        alert("Could not access microphone. Please check permissions.")
      }
    } else {
      if (mediaRecorder && mediaRecorder.state !== "inactive") {
        mediaRecorder.stop()
      }
      setIsRecording(false)
      setMediaRecorder(null)
    }
  }

  const processAudioInput = async (audioBlob: Blob) => {
    // For now, we'll use browser's speech recognition as fallback
    // In production, this would send to the Flask backend's speech-to-text endpoint
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      const recognition = new SpeechRecognition()

      recognition.lang =
        selectedLanguage === "en"
          ? "en-US"
          : selectedLanguage === "hi"
            ? "hi-IN"
            : selectedLanguage === "bn"
              ? "bn-IN"
              : "en-US"
      recognition.continuous = false
      recognition.interimResults = false

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInput(transcript)
        handleSendMessage(transcript)
      }

      recognition.onerror = (event: any) => {
        console.error("[v0] Speech recognition error:", event.error)
        alert("Speech recognition failed. Please try again.")
      }

      recognition.start()
    } else {
      alert("Speech recognition is not supported in your browser.")
    }
  }

  const handleQuickAction = (action: string) => {
    handleSendMessage(action)
  }

  const getPlaceholder = () => {
    const placeholders: { [key: string]: string } = {
      en: "Ask me about Jharkhand tourism, itinerary planning, or cultural sites...",
      hi: "झारखंड पर्यटन, यात्रा योजना या सांस्कृतिक स्थलों के बारे में पूछें...",
      bn: "ঝাড়খণ্ড পর্যটন, ভ্রমণ পরিকল্পনা বা সাংস্কৃতিক স্থান সম্পর্কে জিজ্ঞাসা করুন...",
      or: "ଝାଡ଼ଖଣ୍ଡ ପର୍ଯ୍ୟଟନ, ଯାତ୍ରା ଯୋଜନା କିମ୍ବା ସାଂସ୍କୃତିକ ସ୍ଥାନ ବିଷୟରେ ପଚାରନ୍ତୁ...",
      ur: "جھارکھنڈ ٹورزم، سفری منصوبہ بندی یا ثقافتی مقامات کے بارے میں پوچھیں...",
    }
    return placeholders[selectedLanguage] || placeholders["en"]
  }

  return (
    <Card className="h-[700px] flex flex-col bg-gradient-to-br from-warm-50 to-cream-50 border-warm-200">
      <div className="border-b border-warm-200 p-4 bg-gradient-to-r from-terracotta-500 to-warm-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-forest-500 rounded-full flex items-center justify-center text-white font-bold">
              🏔️
            </div>
            <div>
              <h3 className="font-semibold text-white">Tourism Assistant</h3>
              <span className="text-xs text-warm-100">Online & Ready to Help</span>
            </div>
          </div>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-white/20 text-white border border-white/30 rounded-lg px-3 py-1 text-sm backdrop-blur-sm"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code} className="text-gray-800">
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="flex items-start space-x-3">
              <ChatMessage message={message} />
              {message.role === "assistant" && !message.isLoading && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => playTextToSpeech(message.content, message.language || selectedLanguage)}
                  className="mt-1 p-1 h-8 w-8 text-terracotta-600 hover:text-terracotta-700 hover:bg-terracotta-50"
                >
                  <Volume2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="border-t border-warm-200 p-4 space-y-4 bg-gradient-to-r from-cream-50 to-warm-50">
        <QuickActions onAction={handleQuickAction} disabled={isLoading} />

        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={getPlaceholder()}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage(input)}
            disabled={isLoading}
            className="flex-1 border-warm-300 focus:border-terracotta-400 focus:ring-terracotta-400"
          />
          <Button
            onClick={toggleRecording}
            disabled={isLoading}
            variant={isRecording ? "destructive" : "outline"}
            size="icon"
            className={
              isRecording ? "animate-pulse" : "border-warm-300 hover:bg-terracotta-50 hover:border-terracotta-400"
            }
          >
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>
          <Button
            onClick={() => handleSendMessage(input)}
            disabled={isLoading || !input.trim()}
            size="icon"
            className="bg-terracotta-500 hover:bg-terracotta-600 text-white"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>

        {isRecording && (
          <div className="flex items-center justify-center space-x-2 text-sm text-terracotta-600">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span>Recording... Click microphone to stop</span>
          </div>
        )}
      </div>
    </Card>
  )
}
