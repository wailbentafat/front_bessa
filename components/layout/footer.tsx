import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white p-4">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="bg-red-600 p-2 rounded">
                  <span className="font-bold text-white">SOPIMEM</span>
                </div>
              </Link>
            </div>
            <p className="text-slate-400 mb-4">
              SOPIMEM Real Estate est un développeur immobilier de luxe de premier plan au Liban, créant des espaces de vie exceptionnels depuis 2003.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-slate-400 hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-slate-400 hover:text-white transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/map" className="text-slate-400 hover:text-white transition-colors">
                  Map
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white transition-colors">
                  À propos de nous
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/recruitment" className="text-slate-400 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/sell-your-land" className="text-slate-400 hover:text-white transition-colors">
                  Sell Your Land
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Projects</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/projects?status=Ready to Move"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Ready to Move
                </Link>
              </li>
              <li>
                <Link
                  href="/projects?status=Under Construction"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Under Construction
                </Link>
              </li>
              <li>
                <Link href="/projects?status=Coming Soon" className="text-slate-400 hover:text-white transition-colors">
                  Coming Soon
                </Link>
              </li>
              <li>
                <Link href="/map" className="text-slate-400 hover:text-white transition-colors">
                  View on Map
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-slate-400 mb-4">
              Abonnez-vous à notre newsletter pour recevoir les dernières mises à jour sur les nouvelles propriétés et les offres exclusives.
            </p>
            <div className="flex gap-2">
              <Input placeholder="Votre email" className="bg-slate-800 border-slate-700 text-white" />
              <Button className="bg-red-600 hover:bg-red-700 text-white">S'abonner</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; {new Date().getFullYear()} SOPIMEM Real Estate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

