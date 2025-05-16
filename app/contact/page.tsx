import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Linkedin } from "lucide-react"; // Import necessary icons, assuming Facebook, Instagram, Twitter, and Linkedin are used
import FadeIn from "@/components/animations/fade-in";
import StaggerIn from "@/components/animations/stagger-in";
import ContactForm from "@/components/contact/contactform"; // Assuming this component handles the form itself


const whatsappSvgPath = "M16.6 14c-.2-.1-1.5-.7-1.7-.8c-.2-.1-.4-.1-.6.1c-.2.2-.6.8-.8 1c-.1.2-.3.2-.5.1c-.7-.3-1.4-.7-2-1.2c-.5-.5-1-1.1-1.4-1.7c-.1-.2 0-.4.1-.5c.1-.1.2-.3.4-.4c.1-.1.2-.3.2-.4c.1-.1.1-.3 0-.4c-.1-.1-.6-1.3-.8- WhatsApp Icons examples. See what this icon looks like in some mockup designs. Related icons in Unicons. Resources. Search. Other products. PNG Logo."; // Replace with actual SVG path data

// Assuming a simple custom component for WhatsApp icon if not using a library
const WhatsappIcon = ({ size = 24, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Replace with actual WhatsApp SVG path */}
    <path d="M12.035 2.004c-5.463 0-9.916 4.45-9.916 9.917 0 3.184 1.528 6.074 3.904 7.977l-1.49 4.582 4.767-1.245c1.885.99 4.016 1.561 6.115 1.561 5.464 0 9.917-4.452 9.917-9.916 0-5.465-4.453-9.917-9.917-9.917zm0 1.67a8.252 8.252 0 0 1 8.25 8.247c0 4.55-3.7 8.25-8.25 8.25a8.24 8.24 0 0 1-4.3-.973l-.305-.183-3.177.829.84-3.087-.2-.314a8.236 8.236 0 0 1-1.29-4.305c0-4.548 3.7-8.247 8.25-8.247zm-4.958 5.28a2.267 2.267 0 0 0-1.612.75c-.16.18-.31.35-.438.54a.74.74 0 0 0-.08.66c.09.31.37.69.66.99.38.4.78.74 1.2.92.7.32 1.36.53 2.07.66a4.187 4.187 0 0 0 1.05.11c.35 0 .66-.05.96-.18a1.52 1.52 0 0 0 .66-.45c.2-.22.68-.8.74-.9a.466.466 0 0 0 .01-.47c-.03-.08-.1-.12-.21-.17-.11-.05-.62-.23-.72-.26a.415.415 0 0 0-.35.07c-.1.09-.36.42-.44.52-.09.1-.18.12-.31.07-.4-.16-.82-.3-.27-.56-.54-.26-.6-.29-.68-.34-.08-.06-.25-.09-.39-.03a.71.71 0 0 0-.24.2c-.15.15-.32.35-.48.53z"/>
  </svg>
);


export default function ContactPage() {
  // Replace with your actual WhatsApp number in international format, without '+' or leading zeros.
  const whatsappNumber = "213557621956"; // Example: For Algeria +213 555 123 456, use "213555123456"

  return (
    <div className="min-h-screen">
      <section className="relative h-[40vh] w-full overflow-hidden">
        {/* Consider adding a background image here if desired */}
        <img src="/nous.jpg" alt="Contact Us Background" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 " />
        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <FadeIn direction="up">
              <h1 className="text-4xl font-bold text-white mb-4 p-5">Nous contacter</h1>
              <p className="text-xl text-white/90 max-w-2xl p-5">
                Contactez notre équipe pour toute question concernant nos propriétés ou services
              <h1 className="text-4xl font-bold text-white mb-4 p-5">Contactez-nous</h1> {/* Translated to French */}
              <p className="text-xl text-white/90 max-w-2xl p-5"> {/* Translated to French */}
                Prenez contact avec notre équipe pour toute question concernant nos propriétés ou services.
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
                <h2 className="text-2xl font-bold mb-6">Prenez Contact</h2> {/* Translated to French */}
                <p className="text-muted-foreground mb-8"> {/* Translated to French */}
                  Notre équipe d'experts est prête à vous aider pour toutes vos questions ou demandes
                  concernant nos propriétés ou services.
                </p>

                <StaggerIn baseDelay={100} staggerDelay={150}>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 h-12 w-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-medium">Visitez-nous</h3> {/* Translated to French */}
                        <p className="text-sm text-muted-foreground">Alger, Algérie</p> {/* Translated to French */}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 h-12 w-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                        <Phone className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-medium">Appelez-nous</h3> {/* Translated to French */}
                        <p className="text-sm text-muted-foreground">+961 1 234 567</p> {/* Consider updating with actual Algerian numbers */}
                        <p className="text-sm text-muted-foreground">+961 3 987 654</p> {/* Consider updating with actual Algerian numbers */}
                         {/* Add WhatsApp link here if desired, or in the social media section */}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 h-12 w-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-medium">Envoyez-nous un e-mail</h3> {/* Translated to French */}
                        <p className="text-sm text-muted-foreground">sopmimem.com</p> {/* Update with correct email */}
                        <p className="text-sm text-muted-foreground">sopimme.comm</p> {/* Update with correct email */}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 h-12 w-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                        <Clock className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-medium">Heures d'ouverture</h3> {/* Translated to French */}
                        <p className="text-sm text-muted-foreground">Lundi - Vendredi: 9h00 - 18h00</p> {/* Translated to French */}
                        <p className="text-sm text-muted-foreground">Samedi: 10h00 - 16h00</p> {/* Translated to French */}
                      </div>
                    </div>
                  </div>
                </StaggerIn>

                <div className="mt-8">
                  <h3 className="font-medium mb-4">Suivez-nous</h3> {/* Translated to French */}
                  <div className="flex gap-4">
                    {/* Facebook */}
                    <a
                      href="#" // Replace with your Facebook page URL
                      className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-red-100 hover:text-red-600 transition-colors"
                      aria-label="Follow us on Facebook"
                    >
                     <Facebook className="h-5 w-5" /> {/* Using Lucide React Facebook icon */}
                    </a>
                    {/* Instagram */}
                    <a
                      href="#" // Replace with your Instagram profile URL
                      className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-red-100 hover:text-red-600 transition-colors"
                       aria-label="Follow us on Instagram"
                    >
                      <Instagram className="h-5 w-5" /> {/* Using Lucide React Instagram icon */}
                    </a>
                    {/* Twitter */}
                    <a
                      href="#" // Replace with your Twitter profile URL
                      className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-red-100 hover:text-red-600 transition-colors"
                       aria-label="Follow us on Twitter"
                    >
                      <Twitter className="h-5 w-5" /> {/* Using Lucide React Twitter icon */}
                    </a>
                     {/* Linkedin */}
                    <a
                      href="#" // Replace with your Linkedin profile URL
                      className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-red-100 hover:text-red-600 transition-colors"
                       aria-label="Follow us on Linkedin"
                    >
                      <Linkedin className="h-5 w-5" /> {/* Using Lucide React Linkedin icon */}
                    </a>
                     {/* WhatsApp - Added functionality */}
                     {whatsappNumber && (
                       <a
                         href={`https://wa.me/${whatsappNumber}`}
                         className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-green-100 hover:text-green-600 transition-colors" // Changed hover color for WhatsApp
                         aria-label="Chat with us on WhatsApp"
                         target="_blank" // Opens in a new tab
                         rel="noopener noreferrer" // Recommended for target="_blank"
                       >
                        {/* Use the custom WhatsappIcon component or an imported one */}
                         <WhatsappIcon size={20} color="currentColor" />
                       </a>
                     )}
                  </div>
                </div>
              </FadeIn>
            </div>

          {/* Assuming ContactForm component is already translated internally or handles translation */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
          </div>
        </div>
      </section>
    </div>
  );
}