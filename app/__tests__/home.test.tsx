import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"

vi.mock("next/image", () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    const { unoptimized, ...rest } = props as any
    return <img {...rest} />
  },
}))

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode
    href: string
  }) => <a href={href} {...props}>{children}</a>,
}))

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
    li: ({ children, ...props }: any) => <li {...props}>{children}</li>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}))

import Home from "@/app/page"

describe("Home page", () => {
  it("displays GPA of 3.75 in hero quick stats", () => {
    render(<Home />)
    expect(screen.getByText("3.75")).toBeInTheDocument()
  })
})
