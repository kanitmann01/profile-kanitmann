"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Volume2, VolumeX } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { TapRipple } from "@/components/tap-ripple"
import { useTactileFeedback } from "@/components/tactile-feedback-provider"
import { useState, useEffect } from "react"

export function Navigation() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { isMuted, toggleMute } = useTactileFeedback()

  const navItems = [
    { href: "/projects", label: "WORK" },
    { href: "/about", label: "ABOUT" },
    { href: "/articles", label: "ARTICLES" },
    { href: "/contact", label: "CONTACT" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen])

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300 h-16",
          isScrolled
            ? "bg-background/95 border-b border-border/50 shadow-sm"
            : "bg-background/80 border-b border-border/20"
        )}
      >
        <div className="container mx-auto h-full px-6 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 active:scale-95"
          >
            <span className="font-serif text-2xl text-foreground hover:text-primary transition-colors">KANIT</span>
            <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full border border-primary/30 font-mono text-[10px] uppercase tracking-wider text-primary">
              Seeking Summer 2026
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <TapRipple key={item.href}>
                <NavLink
                  href={item.href}
                  label={item.label}
                  isActive={pathname === item.href}
                />
              </TapRipple>
            ))}
            <button
              onClick={toggleMute}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={isMuted ? "Enable sounds" : "Mute sounds"}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <ThemeToggle />
          </div>

          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleMute}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={isMuted ? "Enable sounds" : "Mute sounds"}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <ThemeToggle />
            <TapRipple>
              <button
                onClick={toggleMobileMenu}
                className="p-2 text-foreground hover:text-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-95"
                aria-label="Toggle mobile menu"
              >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
              </button>
            </TapRipple>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background md:hidden"
          >
            <div className="flex flex-col h-full items-center justify-center">
              <nav className="flex flex-col items-center gap-8" aria-label="Mobile navigation">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      onClick={closeMobileMenu}
                      className={cn(
                        "font-serif text-4xl transition-colors hover:text-primary active:scale-95 min-h-[44px] inline-flex items-center",
                        pathname === item.href ? "text-primary" : "text-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function NavLink({ href, label, isActive }: { href: string; label: string; isActive: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "relative font-mono text-xs uppercase tracking-wider transition-colors py-2 active:scale-95",
        isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
      )}
    >
      {label}
      <span
        className={cn(
          "absolute bottom-0 left-0 right-0 h-0.5 bg-primary transition-transform duration-300 ease-out origin-left",
          isActive ? "scale-x-100" : "scale-x-0 hover:scale-x-100"
        )}
      />
    </Link>
  )
}
