import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import FadeIn from "@/components/animations/fade-in"
import StaggerIn from "@/components/animations/stagger-in"
import ContactForm from "@/components/contact/contactform"

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <section className="relative h-[40vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 " />
        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <FadeIn direction="up">
              <h1 className="text-4xl font-bold text-white mb-4 p-5">Nous contacter</h1>
              <p className="text-xl text-white/90 max-w-2xl p-5">
                Contactez notre équipe pour toute question concernant nos propriétés ou services
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 p-5">
            <div className="lg:col-span-1">
              <FadeIn>
                <h2 className="text-2xl font-bold mb-6">Nous contacter</h2>
                <p className="text-muted-foreground mb-8">
                  Notre équipe d'experts est prête à vous aider avec toutes vos questions ou demandes concernant nos
                  properties or services.
                </p>

                <StaggerIn baseDelay={100} staggerDelay={150}>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 h-12 w-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-medium">Visit Us</h3>
                        <p className="text-sm text-muted-foreground">alger algeria</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 h-12 w-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                        <Phone className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-medium">Call Us</h3>
                        <p className="text-sm text-muted-foreground">+961 1 234 567</p>
                        <p className="text-sm text-muted-foreground">+961 3 987 654</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 h-12 w-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-medium">Email Us</h3>
                        <p className="text-sm text-muted-foreground">info@bessarealestate.com</p>
                        <p className="text-sm text-muted-foreground">sales@bessarealestate.com</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 h-12 w-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                        <Clock className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-medium">Working Hours</h3>
                        <p className="text-sm text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p className="text-sm text-muted-foreground">Saturday: 10:00 AM - 4:00 PM</p>
                      </div>
                    </div>
                  </div>
                </StaggerIn>

                <div className="mt-8">
                  <h3 className="font-medium mb-4">Follow Us</h3>
                  <div className="flex gap-4">
                    <a
                      href="#"
                      className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-red-100 hover:text-red-600 transition-colors"
                    >
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
                    <a
                      href="#"
                      className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-red-100 hover:text-red-600 transition-colors"
                    >
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
                    <a
                      href="#"
                      className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-red-100 hover:text-red-600 transition-colors"
                    >
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
                    <a
                      href="#"
                      className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-red-100 hover:text-red-600 transition-colors"
                    >
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
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                  </div>
                </div>
              </FadeIn>
            </div>

          <ContactForm />
          </div>
        </div>
      </section>
    </div>
  )
}

