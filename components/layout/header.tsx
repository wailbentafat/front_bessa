"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { ChevronDown, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import Image from "next/image"

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
        "sticky top-0 z-50 w-full transition-all duration-300 h-[80px]",
        isScrolled
          ? "border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm"
          : "bg-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
            <div className="bg-red-600 p-2 rounded">
              <span className="font-bold text-white">BESSA</span>
            </div>
          </Link>
        </div> */}
        <div className=" ml-5">
          <Image src={"/logo.webp"} alt="Logo" width={150} height={150} />
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <NavLink href="/" isActive={pathname === "/"}>
            <span className="font-bold">Accueil</span>
          </NavLink>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-1 text-sm font-bold transition-colors hover:text-red-600"
              >
                Projets <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem asChild>
                <Link href="/projects" className="font-bold">Tous les Projets</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/projects?status=Ready to Move" className="font-bold">Propriétés Prêtes</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/projects?status=Under Construction" className="font-bold">En Construction</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/projects?status=Coming Soon" className="font-bold">Coming Soon</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <NavLink href="/map" isActive={pathname === "/map"}>
          <span className="font-bold">Map</span>
          </NavLink>
          <NavLink href="/recruitment" isActive={pathname === "/recruitment"}>
            <span className="font-bold">Recruitment</span>
          </NavLink>
          <NavLink href="/sell-your-land" isActive={pathname === "/sell-your-land"} >
            <span className="font-bold">vendre votre terrain</span>
          </NavLink>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex  items-center gap-1 text-sm font-bold transition-colors hover:text-red-600"
              >
                Plus <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem asChild>
                <Link href="/about" className="font-bold">À propos de nous</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/contact" className="font-bold">Contact</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/#app" className="font-bold">Acheter l'application SOPIMEM</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only font-bold">Toggle menu</span>
        </Button>
      </div>

      <div
        className={cn(
          "fixed inset-x-0 top-[80px] z-50 border-b border-t bg-background md:hidden transition-all duration-300 ease-in-out max-h-[calc(100vh-80px)] overflow-y-auto",
          isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none",
        )}
      >
        <div className="container py-4">
          <nav className="flex flex-col gap-4 pb-6">
            <Link
              href="/"
              className={cn(
                "text-sm font-bold transition-colors hover:text-red-600 p-2 rounded-md",
                pathname === "/" && "bg-red-50 text-red-600",
              )}
            >
              Accueil
            </Link>
            <div className="border-t my-1"></div>
            <div className="pl-2 text-sm font-bold text-muted-foreground">Projets</div>
            <Link
              href="/projects"
              className={cn(
                "text-sm font-bold transition-colors hover:text-red-600 p-2 rounded-md pl-4",
                pathname === "/projects" && "bg-red-50 text-red-600",
              )}
            >
              Tous les Projets
            </Link>
            <Link
              href="/projects?status=Ready to Move"
              className="text-sm font-bold transition-colors hover:text-red-600 p-2 rounded-md pl-4"
            >
              Propriétés Prêtes
            </Link>
            <Link
              href="/projects?status=Under Construction"
              className="text-sm font-bold transition-colors hover:text-red-600 p-2 rounded-md pl-4"
            >
              En Construction
            </Link>
            <Link
              href="/projects?status=Coming Soon"
              className="text-sm font-bold transition-colors hover:text-red-600 p-2 rounded-md pl-4"
            >
              À venir
            </Link>
            <div className="border-t my-1"></div>
            <Link
              href="/map"
              className={cn(
                "text-sm font-bold transition-colors hover:text-red-600 p-2 rounded-md",
                pathname === "/map" && "bg-red-50 text-red-600",
              )}
            >
              Carte
            </Link>
            <Link
              href="/recruitment"
              className={cn(
                "text-sm font-bold transition-colors hover:text-red-600 p-2 rounded-md",
                pathname === "/recruitment" && "bg-red-50 text-red-600",
              )}
            >
              Carrières
            </Link>
            <Link
              href="/sell-your-land"
              className={cn(
                "text-sm font-bold transition-colors hover:text-red-600 p-2 rounded-md",
                pathname === "/sell-your-land" && "bg-red-50 text-red-600",
              )}
            >
              Vendre votre terrain
            </Link>
            <Link
              href="/about"
              className={cn(
                "text-sm font-bold transition-colors hover:text-red-600 p-2 rounded-md",
                pathname === "/about" && "bg-red-50 text-red-600",
              )}
            >
              À propos de nous
            </Link>
            <Link
              href="/contact"
              className={cn(
                "text-sm font-bold transition-colors hover:text-red-600 p-2 rounded-md",
                pathname === "/contact" && "bg-red-50 text-red-600",
              )}
            >
              Contact
            </Link>
            <Link href="/#app" className="text-sm font-bold transition-colors hover:text-red-600 p-2 rounded-md">
              Acheter l'application Bessa
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

