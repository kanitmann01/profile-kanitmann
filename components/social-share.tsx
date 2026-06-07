"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Linkedin, Twitter, Copy, Check } from "lucide-react"

interface SocialShareProps {
  title: string
  description: string
  url: string
}

export function SocialShare({ title, description, url }: SocialShareProps) {
  const [copied, setCopied] = useState(false)

  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${title} by Kanit Mann\n${description}`)}&url=${encodeURIComponent(url)}`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        asChild
        aria-label="Share on LinkedIn"
      >
        <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
          <Linkedin className="h-4 w-4" />
        </a>
      </Button>
      <Button
        variant="outline"
        size="sm"
        asChild
        aria-label="Share on Twitter"
      >
        <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
          <Twitter className="h-4 w-4" />
        </a>
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopy}
        aria-label={copied ? "Link copied" : "Copy link"}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
      {copied && (
        <span className="text-sm text-muted-foreground animate-in fade-in duration-200">
          Link copied!
        </span>
      )}
    </div>
  )
}
