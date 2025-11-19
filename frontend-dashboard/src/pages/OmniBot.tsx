import { useState, useRef, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar } from '@/components/ui/avatar'
import { useAuthStore } from '@/stores/auth'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: "Hi! I'm OmniBot, your AI assistant for KASH_INFO. I can help you find resources, connect with members, answer questions about AI tools, and more. How can I assist you today?",
    timestamp: new Date(),
  },
]

export function OmniBot() {
  const user = useAuthStore((state) => state.user)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    // Mock AI responses based on keywords
    if (lowerMessage.includes('resource') || lowerMessage.includes('course') || lowerMessage.includes('tool')) {
      return "I can help you find resources! We have an extensive library of courses, tools, templates, and guides. Check out the Resources page for AI courses, productivity tools, and more. What specific type of resource are you looking for?"
    }

    if (lowerMessage.includes('member') || lowerMessage.includes('network') || lowerMessage.includes('connect')) {
      return "Our community has amazing professionals across various industries! You can connect with members through our network directory, participate in discussions, and attend exclusive webinars. Would you like me to suggest some members with similar interests?"
    }

    if (lowerMessage.includes('help') || lowerMessage.includes('how') || lowerMessage.includes('?')) {
      return "I'm here to help! I can assist you with:\n\n• Finding resources and courses\n• Connecting with other members\n• Answering questions about AI tools\n• Navigating the platform\n• Providing personalized recommendations\n\nWhat would you like to know more about?"
    }

    if (lowerMessage.includes('chatgpt') || lowerMessage.includes('claude') || lowerMessage.includes('ai')) {
      return "Great question about AI! We have several resources on this topic. I recommend checking out our 'AI Prompt Engineering Masterclass' course and the 'Complete Guide to AI Tools 2025'. Would you like me to provide more specific information?"
    }

    if (lowerMessage.includes('profile') || lowerMessage.includes('account') || lowerMessage.includes('subscription')) {
      return "You can manage your profile, account settings, and subscription in the Profile section. From there, you can update your personal information, change your password, and manage your membership. Need help with something specific?"
    }

    // Default response
    return "That's an interesting question! While I'm still learning, I'm here to help you navigate KASH_INFO and maximize your membership. Could you provide more details about what you're looking for?"
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateResponse(input),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-5xl h-[calc(100vh-8rem)]">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">OmniBot</h1>
          <p className="text-muted-foreground">
            Your AI assistant that knows your community, resources, and preferences
          </p>
        </div>

        {/* Chat Container */}
        <Card className="flex-1 flex flex-col overflow-hidden">
          {/* Messages */}
          <ScrollArea className="flex-1 p-6" ref={scrollRef}>
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-4 ${
                    message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <Avatar className="h-10 w-10 flex-shrink-0">
                    <div
                      className={`h-full w-full flex items-center justify-center text-sm font-bold ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-accent text-accent-foreground'
                      }`}
                    >
                      {message.role === 'user'
                        ? user?.user_metadata?.full_name?.charAt(0).toUpperCase() || 'U'
                        : '🤖'}
                    </div>
                  </Avatar>

                  <div
                    className={`flex-1 space-y-1 ${
                      message.role === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`inline-block max-w-[80%] rounded-lg px-4 py-3 ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-accent'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                    <p className="text-xs text-muted-foreground px-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-4">
                  <Avatar className="h-10 w-10 flex-shrink-0">
                    <div className="h-full w-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold">
                      🤖
                    </div>
                  </Avatar>
                  <div className="bg-accent rounded-lg px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <CardContent className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isTyping}
                className="flex-1"
              />
              <Button onClick={handleSend} disabled={!input.trim() || isTyping}>
                Send
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Press Enter to send, Shift + Enter for new line
            </p>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-4 flex gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setInput('Show me AI courses')}
          >
            AI Courses
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setInput('How do I connect with other members?')}
          >
            Connect with Members
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setInput('What resources do you recommend?')}
          >
            Recommended Resources
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setInput('Tell me about ChatGPT vs Claude')}
          >
            AI Tools Comparison
          </Button>
        </div>
      </div>
    </div>
  )
}
