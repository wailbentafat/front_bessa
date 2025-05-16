"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Building, Home, Key, Shield, Star, Users } from "lucide-react"
import ScrollReveal from "./scrollreveal"

const features = [
  {
    icon: <Building className="h-10 w-10" />,
    title: "Propriétés de luxe",
    description: "Des résidences exclusives dans les quartiers les plus prestigieux",
  },
  {
    icon: <Home className="h-10 w-10" />,
    title: "Design moderne",
    description: "Architecture contemporaine et finitions haut de gamme",
  },
  {
    icon: <Key className="h-10 w-10" />,
    title: "Clé en main",
    description: "Des solutions complètes pour votre emménagement",
  },
  {
    icon: <Shield className="h-10 w-10" />,
    title: "Sécurité garantie",
    description: "Systèmes de sécurité avancés pour votre tranquillité",
  },
  {
    icon: <Star className="h-10 w-10" />,
    title: "Service premium",
    description: "Un accompagnement personnalisé tout au long du processus",
  },
  {
    icon: <Users className="h-10 w-10" />,
    title: "Communauté exclusive",
    description: "Rejoignez une communauté de propriétaires distingués",
  },
]

export default function FeatureScroll() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"])

  return (
    <section ref={containerRef} className="py-16 md:py-24 overflow-hidden bg-slate-50">
      <div className="container mb-12">
        <ScrollReveal direction="up">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-center">Nos services exceptionnels</h2>
          <p className="mt-4 text-center text-muted-foreground max-w-2xl mx-auto">
            Découvrez ce qui fait de nous le choix privilégié pour l'immobilier de luxe
          </p>
        </ScrollReveal>
      </div>

      <motion.div style={{ x }} className="flex gap-8 pl-[calc(50vw-11rem)] pb-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex-none w-80 bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="h-16 w-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
