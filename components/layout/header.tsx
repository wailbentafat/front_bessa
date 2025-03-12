"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { ChevronDown, Globe, Menu, Moon, Sun, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export default function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm"
          : "bg-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
            <div className="bg-red-600 p-2 rounded">
              <span className="font-bold text-white">BESSA</span>
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <NavLink href="/" isActive={pathname === "/"}>
            Home
          </NavLink>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-red-600"
              >
                Projects <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem asChild>
                <Link href="/projects">All Projects</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/projects?status=Ready to Move">Ready Properties</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/projects?status=Under Construction">Under Construction</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/projects?status=Coming Soon">Coming Soon</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <NavLink href="/map" isActive={pathname === "/map"}>
            Map
          </NavLink>
          <NavLink href="/recruitment" isActive={pathname === "/recruitment"}>
            Careers
          </NavLink>
          <NavLink href="/sell-your-land" isActive={pathname === "/sell-your-land"}>
            Sell Your Land
          </NavLink>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-red-600"
              >
                More <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem asChild>
                <Link href="/about">About Us</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/contact">Contact</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/#app">Buy Bessa App</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Globe className="h-4 w-4" />
              <span className="sr-only">Language</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-x-0 top-16 z-50 border-b border-t bg-background md:hidden transition-all duration-300 ease-in-out",
          isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0",
        )}
      >
        <div className="container py-4">
          <nav className="flex flex-col gap-4">
            <Link
              href="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-red-600 p-2 rounded-md",
                pathname === "/" && "bg-red-50 text-red-600",
              )}
            >
              Home
            </Link>
            <div className="border-t my-1"></div>
            <div className="pl-2 text-sm font-medium text-muted-foreground">Projects</div>
            <Link
              href="/projects"
              className={cn(
                "text-sm font-medium transition-colors hover:text-red-600 p-2 rounded-md pl-4",
                pathname === "/projects" && "bg-red-50 text-red-600",
              )}
            >
              All Projects
            </Link>
            <Link
              href="/projects?status=Ready to Move"
              className="text-sm font-medium transition-colors hover:text-red-600 p-2 rounded-md pl-4"
            >
              Ready Properties
            </Link>
            <Link
              href="/projects?status=Under Construction"
              className="text-sm font-medium transition-colors hover:text-red-600 p-2 rounded-md pl-4"
            >
              Under Construction
            </Link>
            <Link
              href="/projects?status=Coming Soon"
              className="text-sm font-medium transition-colors hover:text-red-600 p-2 rounded-md pl-4"
            >
              Coming Soon
            </Link>
            <div className="border-t my-1"></div>
            <Link
              href="/map"
              className={cn(
                "text-sm font-medium transition-colors hover:text-red-600 p-2 rounded-md",
                pathname === "/map" && "bg-red-50 text-red-600",
              )}
            >
              Map
            </Link>
            <Link
              href="/recruitment"
              className={cn(
                "text-sm font-medium transition-colors hover:text-red-600 p-2 rounded-md",
                pathname === "/recruitment" && "bg-red-50 text-red-600",
              )}
            >
              Careers
            </Link>
            <Link
              href="/sell-your-land"
              className={cn(
                "text-sm font-medium transition-colors hover:text-red-600 p-2 rounded-md",
                pathname === "/sell-your-land" && "bg-red-50 text-red-600",
              )}
            >
              Sell Your Land
            </Link>
            <Link
              href="/about"
              className={cn(
                "text-sm font-medium transition-colors hover:text-red-600 p-2 rounded-md",
                pathname === "/about" && "bg-red-50 text-red-600",
              )}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className={cn(
                "text-sm font-medium transition-colors hover:text-red-600 p-2 rounded-md",
                pathname === "/contact" && "bg-red-50 text-red-600",
              )}
            >
              Contact
            </Link>
            <Link href="/#app" className="text-sm font-medium transition-colors hover:text-red-600 p-2 rounded-md">
              Buy Bessa App
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

interface NavLinkProps {
  href: string
  isActive: boolean
  children: React.ReactNode
}

function NavLink({ href, isActive, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-colors relative group",
        isActive ? "text-red-600" : "hover:text-red-600",
      )}
    >
      {children}
      <span
        className={cn(
          "absolute -bottom-1 left-0 h-0.5 bg-red-600 transition-all duration-300",
          isActive ? "w-full" : "w-0 group-hover:w-full",
        )}
      />
    </Link>
  )
}

