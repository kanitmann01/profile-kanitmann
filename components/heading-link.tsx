import Link from "next/link"
import { LinkChip } from "@/components/link-chip"

interface HeadingLinkProps {
  href: string
  chip: string
  external?: boolean
  children: React.ReactNode
}

export function HeadingLink({ href, chip, external = false, children }: HeadingLinkProps) {
  const heading = (
    <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">
      {children}
    </h3>
  )

  const link = external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="group inline-block">
      {heading}
    </a>
  ) : (
    <Link href={href} className="group inline-block">
      {heading}
    </Link>
  )

  return (
    <div className="flex items-baseline gap-2 mb-4">
      {link}
      <LinkChip path={chip} />
    </div>
  )
}
