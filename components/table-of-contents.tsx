"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

interface Heading {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  containerId?: string
}

export function TableOfContents({ containerId }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>("")
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const container = containerId
      ? document.getElementById(containerId)
      : document.querySelector("article") || document.querySelector("main")

    if (!container) return

    const headingElements = container.querySelectorAll("h2, h3")
    const extractedHeadings: Heading[] = Array.from(headingElements).map((el) => {
      const id = el.id || el.textContent?.toLowerCase().replace(/\s+/g, "-") || ""
      if (!el.id) el.id = id
      return { id, text: el.textContent || "", level: parseInt(el.tagName.charAt(1)) }
    })

    setHeadings(extractedHeadings)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-100px 0px -66%", threshold: 0.5 }
    )

    headingElements.forEach((el) => {
      if (el.id) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [containerId])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  if (headings.length === 0) {
    return null
  }

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden mb-6">
        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full justify-between"
        >
          <span>Table of Contents</span>
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
        {isExpanded && (
          <nav className="mt-4 p-4 border rounded-lg bg-muted/30">
            <ul className="space-y-2">
              {headings.map((heading) => (
                <li
                  key={heading.id}
                  className={heading.level === 3 ? "ml-4" : ""}
                >
                  <button
                    onClick={() => scrollToHeading(heading.id)}
                    className={`text-left text-sm hover:text-primary transition-colors ${
                      activeId === heading.id
                        ? "text-primary font-semibold"
                        : "text-muted-foreground"
                    }`}
                  >
                    {heading.text}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed right-8 top-32 w-64 max-h-[calc(100vh-8rem)] overflow-y-auto">
        <nav className="p-4 border rounded-lg bg-background">
          <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-4">Table of Contents</h3>
          <ul className="space-y-2">
            {headings.map((heading) => (
              <li
                key={heading.id}
                className={heading.level === 3 ? "ml-4" : ""}
              >
                <button
                  onClick={() => scrollToHeading(heading.id)}
                  className={`text-left font-mono text-xs uppercase tracking-wider hover:text-primary transition-colors border-l-2 pl-3 ${
                    activeId === heading.id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:border-muted-foreground/50"
                  }`}
                >
                  {heading.text}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  )
}
