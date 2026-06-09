"use client"

import { useEffect, useState } from "react"

interface AboutNavProps {
  sections: { id: string; label: string }[]
}

export function AboutNav({ sections }: AboutNavProps) {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-100px 0px -50%", threshold: 0.3 }
    )

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sections])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <nav className="p-4 border rounded-lg bg-background">
      <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-4">
        On this page
      </h3>
      <ul className="space-y-2">
        {sections.map(({ id, label }) => (
          <li key={id}>
            <button
              onClick={() => scrollTo(id)}
              className={`text-left font-mono text-xs uppercase tracking-wider hover:text-primary transition-colors border-l-2 pl-3 ${
                activeId === id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:border-muted-foreground/50"
              }`}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
