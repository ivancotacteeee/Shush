import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Share2, X, Image as ImageIcon, Music } from "lucide-react"

export default function Test() {
  const [selectedMessage, setSelectedMessage] = useState(null)

  const messages = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    sender: {
      name: `User ${i + 1}`,
      username: `@user${i + 1}`,
    },
    content: "This is an anonymous message. You can reply to this question privately.",
    date: "2 days ago",
    image: i % 3 === 0 ? `/api/placeholder/400/300?id=${i}` : null,
    music: i % 2 === 1 ? { title: "Song Title", artist: "Artist Name" } : null,
    lyrics: i % 2 === 1 ? "These are the lyrics of the song...\nLine by line lyrics here..." : null,
  }))

  return (
    <>
      <div className="flex flex-1 flex-col gap-3 p-3 sm:gap-4 sm:p-4 md:gap-5 md:p-6">
        {/* Profile Section */}
        <div className="flex flex-col items-center gap-3 rounded-xl bg-card/50 p-3 backdrop-blur-sm border border-border/50 sm:rounded-2xl sm:p-4 md:p-5">
          <div className="h-24 w-24 rounded-full bg-muted/50 sm:h-32 sm:w-32 md:h-40 md:w-40" />
          <div className="space-y-1 text-center sm:space-y-2">
            <p className="text-xl font-semibold sm:text-2xl md:text-3xl">Full Name</p>
            <p className="text-xs text-muted-foreground sm:text-base md:text-lg">@username</p>
          </div>
        </div>

        {/* Share Link Section */}
        <div className="flex flex-col gap-2 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-4 border border-primary/20 sm:gap-3 sm:rounded-3xl sm:p-6 md:gap-4">
          <p className="text-center text-xs font-medium text-foreground sm:text-sm md:text-base">Share your link</p>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              readOnly
              value="shush.app/user/username"
              className="rounded-lg border border-border bg-background px-3 py-2 text-xs text-muted-foreground sm:rounded-xl sm:text-sm md:text-base"
            />
            <div className="flex gap-2">
              <Button className="flex-1" size="sm">
                <Copy className="h-4 w-4" />
                <span className="hidden sm:inline">Copy Link</span>
                <span className="sm:hidden">Copy</span>
              </Button>
              <Button variant="secondary" className="flex-1" size="sm">
                <Share2 className="h-4 w-4" />
                <span className="hidden sm:inline">Share</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Messages Section */}
        <div className="space-y-2 sm:space-y-3 md:space-y-4">
          <h3 className="text-base font-semibold sm:text-lg md:text-xl">Messages ({messages.length})</h3>
          <div className="space-y-2 max-h-[60vh] overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                onClick={() => setSelectedMessage(message)}
                className="rounded-xl bg-card/50 p-3 backdrop-blur-sm border border-border/50 sm:rounded-2xl sm:p-4 md:p-5 cursor-pointer transition-all hover:bg-card/70 hover:border-border/80"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-sm font-semibold text-foreground">{message.sender.name}</p>
                      <p className="text-xs text-muted-foreground">{message.sender.username}</p>
                    </div>
                    <p className="text-sm text-foreground/80 md:text-base">{message.content}</p>
                    <p className="mt-2 text-xs text-muted-foreground">{message.date}</p>
                  </div>
                  <div className="flex flex-shrink-0 gap-1">
                    {message.image && (
                      <div className="rounded-lg bg-muted/50 p-1.5">
                        <ImageIcon className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                    {message.music && (
                      <div className="rounded-lg bg-muted/50 p-1.5">
                        <Music className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
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
                <h2 className="text-lg font-semibold sm:text-xl md:text-2xl">{selectedMessage.sender.name}</h2>
                <p className="text-sm text-muted-foreground">{selectedMessage.sender.username}</p>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="rounded-lg hover:bg-muted p-2 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              {selectedMessage.image && (
                <div className="rounded-xl overflow-hidden bg-muted/30">
                  <img
                    src={selectedMessage.image}
                    alt="Message attachment"
                    className="w-full h-auto object-cover max-h-96"
                  />
                </div>
              )}
              {selectedMessage.music && (
                <div className="rounded-xl bg-muted/30 p-4 sm:p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/20 p-2.5">
                      <Music className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{selectedMessage.music.title}</p>
                      <p className="text-xs text-muted-foreground">{selectedMessage.music.artist}</p>
                    </div>
                  </div>
                  {selectedMessage.lyrics && (
                    <div className="border-t border-border/30 pt-3 mt-3">
                      <p className="text-xs font-medium text-muted-foreground mb-2">Lyrics</p>
                      <p className="text-xs text-foreground/80 whitespace-pre-line leading-relaxed">
                        {selectedMessage.lyrics}
                      </p>
                    </div>
                  )}
                </div>
              )}
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
    </>
  )
}