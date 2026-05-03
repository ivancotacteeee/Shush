import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Share2, X } from "lucide-react"

export default function Test() {
  const [selectedMessage, setSelectedMessage] = useState(null)

  const messages = Array.from({ length: 21 }).map((_, i) => ({
    id: i,
    sender: {
      name: `User ${i + 1}`,
      username: `@user${i + 1}`,
    },
    content: "This is an anonymous message. You can reply to this question privately.",
    date: "2 days ago",
  }))

  return (
      <main className="min-h-screen bg-background px-4 py-6 text-foreground sm:px-6">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Profile Section */}
        <section className="rounded-3xl border border-border/60 bg-card/80 p-6 shadow-sm">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="h-20 w-20 rounded-full bg-muted/30" />
            <div>
              <p className="text-2xl font-semibold">Private Inbox</p>
              <p className="text-sm text-muted-foreground">shush.app/user/username</p>
            </div>
            <Button variant="secondary" size="sm" className="inline-flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        </section>

        {/* Messages Section */}
        <div className="space-y-2 sm:space-y-3 md:space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Messages</h2>
            <span className="text-sm text-muted-foreground">{messages.length}</span>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {messages.map((message) => (
              <div
                key={message.id}
                onClick={() => setSelectedMessage(message)}
                className="rounded-xl bg-card/50 p-3 backdrop-blur-sm border border-border/50 sm:rounded-2xl sm:p-4 md:p-5 cursor-pointer transition-all hover:bg-card/70 hover:border-border/80"
              >
                <div className="flex flex-col gap-3">
                  <p className="text-sm text-foreground/80 md:text-base">{message.content.slice(0, 50)}...</p>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs text-muted-foreground">{message.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Message Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="flex w-full max-w-md flex-col gap-4 rounded-3xl bg-card/95 p-6 shadow-lg backdrop-blur-sm border border-border sm:max-w-lg md:max-w-xl md:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold sm:text-xl md:text-2xl">Message</h2>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="rounded-lg hover:bg-muted p-2 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl bg-muted/30 p-4 sm:p-5">
                <p className="text-sm text-foreground/80 sm:text-base md:text-lg leading-relaxed">
                  {selectedMessage.content}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground sm:text-sm">Received: {selectedMessage.date}</p>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" className="flex-1" onClick={() => setSelectedMessage(null)}>
                Close
              </Button>
              <Button className="flex-1">Reply</Button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}