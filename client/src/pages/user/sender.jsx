import { Button } from "@/components/ui/button"
import { Image as ImageIcon, Music } from "lucide-react"

export default function SenderPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-6 text-foreground sm:px-6">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Send Message Section */}
        <section className="rounded-3xl border border-border/60 bg-card/80 p-6 shadow-sm">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Send Anonymous Message</h2>
            <div className="space-y-4">
              <textarea
                placeholder="Write your anonymous message..."
                className="w-full min-h-[120px] rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none resize-none"
              />
              <div className="flex gap-2">
                <Button className="flex-1">
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Add Image
                </Button>
                <Button className="flex-1" variant="secondary">
                  <Music className="mr-2 h-4 w-4" />
                  Add Music
                </Button>
              </div>
              <Button className="w-full">Send Message</Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}