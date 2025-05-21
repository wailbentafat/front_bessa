"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronRight, Info, MapPin, Maximize, Home } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Import the Residence interface
// types/residence.ts (or data/residences.ts)

export interface Residence {
  id: string
  name: string
  location: string
  mainImage: string
  hoverImage: string
  description: string
  features: {
    title: string
    description: string
    image: string
  }[]
  details: {
    size: string
    bedrooms: number
    bathrooms: number
    amenities: string[]
  }
  galleryImages: string[] // Added for more comprehensive gallery
}

export const residencesData: Residence[] = [
  {
    id: "residence-1",
    name: "Résidence Les Massyles",
    location: "Chéraga, Grands Vents",
    mainImage: "/images/massyles-main.jpg",
    hoverImage: "/images/massyles-hover.jpg",
    description:
      "Une résidence de prestige située dans le quartier des Grands Vents à Chéraga. Cette résidence facilement accessible depuis l'autoroute se caractérise par son architecture moderne et raffinée.",
    features: [
      {
        title: "Architecture Moderne",
        description: "Façade contemporaine avec des finitions de haute qualité",
        image: "/images/massyles-feature-arch.jpg",
      },
      {
        title: "Espaces Verts",
        description: "Jardins paysagers et espaces de détente",
        image: "/images/massyles-feature-green.jpg",
      },
      {
        title: "Sécurité 24/7",
        description: "Système de surveillance et personnel de sécurité",
        image: "/images/massyles-feature-security.jpg",
      },
    ],
    details: {
      size: "80-150m²",
      bedrooms: 3,
      bathrooms: 2,
      amenities: ["Piscine", "Salle de sport", "Parking souterrain", "Aire de jeux"],
    },
    galleryImages: [
      "/images/massyles-gallery-1.jpg",
      "/images/massyles-gallery-2.jpg",
      "/images/massyles-gallery-3.jpg",
    ],
  },
  {
    id: "residence-2",
    name: "Résidence La Pinède",
    location: "Hydra, Alger",
    mainImage: "/images/pinede-main.jpg",
    hoverImage: "/images/pinede-hover.jpg",
    description:
      "Un havre de paix au cœur de la ville, offrant des appartements spacieux avec vue panoramique sur la baie d'Alger.",
    features: [
      {
        title: "Vue Panoramique",
        description: "Vue imprenable sur la baie d'Alger",
        image: "/images/pinede-feature-view.jpg",
      },
      {
        title: "Matériaux Premium",
        description: "Finitions haut de gamme et matériaux de qualité",
        image: "/images/pinede-feature-materials.jpg",
      },
      {
        title: "Emplacement Stratégique",
        description: "Proche des commerces et services essentiels",
        image: "/images/pinede-feature-location.jpg",
      },
    ],
    details: {
      size: "100-200m²",
      bedrooms: 4,
    bathrooms: 3,
      amenities: ["Terrasse privée", "Ascenseur", "Système domotique", "Conciergerie"],
    },
    galleryImages: [
      "/images/pinede-gallery-1.jpg",
      "/images/pinede-gallery-2.jpg",
      "/images/pinede-gallery-3.jpg",
    ],
  },
  {
    id: "residence-3",
    name: "Résidence Avena",
    location: "Oran, Front de mer",
    mainImage: "/images/avena-main.jpg",
    hoverImage: "/images/avena-hover.jpg",
    description:
      "Une résidence de standing sur le front de mer d'Oran, alliant luxe et confort dans un cadre exceptionnel.",
    features: [
      {
        title: "Front de Mer",
        description: "Accès direct à la plage et vue sur la Méditerranée",
        image: "/images/avena-feature-sea.jpg",
      },
      {
        title: "Design Intérieur",
        description: "Intérieurs conçus par des designers renommés",
        image: "/images/avena-feature-design.jpg",
      },
      {
        title: "Efficacité Énergétique",
        description: "Bâtiment à faible consommation d'énergie",
        image: "/images/avena-feature-energy.jpg",
      },
    ],
    details: {
      size: "120-250m²",
      bedrooms: 5,
      bathrooms: 3,
      amenities: ["Spa", "Restaurant", "Service de voiturier", "Plage privée"],
    },
    galleryImages: [
      "/images/avena-gallery-1.jpg",
      "/images/avena-gallery-2.jpg",
      "/images/avena-gallery-3.jpg",
    ],
  },
  {
    id: "residence-4",
    name: "Résidence Midelt",
    location: "Constantine, Centre-ville",
    mainImage: "/images/midelt-main.jpg",
    hoverImage: "/images/midelt-hover.jpg",
    description:
      "Au cœur de Constantine, cette résidence allie charme traditionnel et confort moderne pour une expérience de vie unique.",
    features: [
      {
        title: "Héritage Architectural",
        description: "Façade inspirée de l'architecture traditionnelle",
        image: "/images/midelt-feature-heritage.jpg",
      },
      {
        title: "Espaces Communs",
        description: "Salons communautaires et espaces de coworking",
        image: "/images/midelt-feature-common.jpg",
      },
      {
        title: "Technologie Smart Home",
        description: "Appartements équipés de technologies intelligentes",
        image: "/images/midelt-feature-smart.jpg",
      },
    ],
    details: {
      size: "90-180m²",
      bedrooms: 3,
      bathrooms: 2,
      amenities: ["Bibliothèque", "Jardin sur le toit", "Salle de réunion", "Sécurité biométrique"],
    },
    galleryImages: [
      "/images/midelt-gallery-1.jpg",
      "/images/midelt-gallery-2.jpg",
      "/images/midelt-gallery-3.jpg",
    ],
  },
]
export default function WhyChooseUs() {
  const [residences, setResidences] = useState<Residence[]>([])
  const [selectedResidence, setSelectedResidence] = useState<Residence | null>(null)
  const [hoveredResidence, setHoveredResidence] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchResidences = async () => {
      try {
        setLoading(true)
        const response = await fetch("endponit") 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data: Residence[] = await response.json()
        setResidences(data)
        if (data.length > 0) {
          setSelectedResidence(data[0]) 
        }
      } catch (e: any) {
        setError(e.message)
        console.error("Failed to fetch residences:", e)
      } finally {
        setLoading(false)
      }
    }

    fetchResidences()
  }, [])

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6 text-center">
          <p>Chargement des résidences...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6 text-center">
          <p className="text-red-500">Erreur lors du chargement des résidences: {error}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Pourquoi Nous Choisir</h2>
          <p className="mt-4 max-w-3xl text-muted-foreground">
            Découvrez notre collection exclusive de résidences de prestige conçues pour une vie moderne et raffinée
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left side - Residence List */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-xl font-semibold mb-6">Nos Résidences Références</h3>
            <div className="space-y-3">
              {residences.map((residence, idx) => (
                <motion.div
                  key={residence.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className={`p-4 rounded-lg transition-all duration-300 cursor-pointer ${
                    selectedResidence?.id === residence.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                  onMouseEnter={() => setHoveredResidence(residence.id)}
                  onMouseLeave={() => setHoveredResidence(null)}
                  onClick={() => setSelectedResidence(residence)}
                  whileHover={{
                    x: 5,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{residence.name}</h4>
                      <p className="text-sm flex items-center mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {residence.location}
                      </p>
                    </div>
                    <motion.div
                      animate={{
                        x: selectedResidence?.id === residence.id ? 5 : 0,
                        transition: { duration: 0.2, type: "spring" },
                      }}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right side - Residence Preview */}
          <div className="lg:col-span-2 rounded-xl overflow-hidden bg-muted">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedResidence?.id || "default"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                transition={{
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="h-full"
              >
                {selectedResidence ? (
                  <div className="relative h-full">
                    <motion.div
                      className="relative h-[300px] md:h-[400px] overflow-hidden"
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <motion.div
                        initial={{ scale: 1.1 }}
                        animate={{
                          scale: hoveredResidence === selectedResidence.id ? 1.05 : 1,
                          transition: { duration: 0.7, ease: "easeOut" },
                        }}
                        className="h-full w-full"
                      >
                        <Image
                          src={
                            hoveredResidence === selectedResidence.id
                              ? selectedResidence.hoverImage
                              : selectedResidence.mainImage
                          }
                          alt={selectedResidence.name}
                          fill
                          className="object-cover transition-all duration-700"
                        />
                      </motion.div>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      />
                    </motion.div>

                    <motion.div
                      className="p-6 relative -mt-16 bg-white/90 backdrop-blur-sm rounded-t-xl"
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.3,
                        type: "spring",
                        stiffness: 100,
                      }}
                    >
                      <motion.h3
                        className="text-2xl font-bold"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                      >
                        {selectedResidence.name}
                      </motion.h3>

                      <motion.p
                        className="text-sm flex items-center mt-1 text-muted-foreground"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                      >
                        <MapPin className="h-4 w-4 mr-1" />
                        {selectedResidence.location}
                      </motion.p>

                      <motion.p
                        className="mt-4"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.6 }}
                      >
                        {selectedResidence.description}
                      </motion.p>

                      <motion.div
                        className="mt-6 flex justify-between items-center"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.7 }}
                      >
                        <div className="flex space-x-2">
                          <div className="flex items-center text-sm">
                            <Maximize className="h-4 w-4 mr-1" />
                            <span>{selectedResidence.details.size}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Home className="h-4 w-4 mr-1" />
                            <span>{selectedResidence.details.bedrooms} Ch.</span>
                          </div>
                        </div>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="relative overflow-hidden group">
                              <motion.span
                                className="absolute inset-0 bg-primary/10 group-hover:bg-transparent"
                                initial={{ x: "100%" }}
                                whileHover={{ x: "-100%" }}
                                transition={{ duration: 0.4 }}
                              />
                              <Info className="h-4 w-4 mr-2" />
                              Plus de détails
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[900px]">
                            <DialogHeader>
                              <DialogTitle>{selectedResidence.name}</DialogTitle>
                              <DialogDescription>{selectedResidence.location}</DialogDescription>
                            </DialogHeader>

                            <Tabs defaultValue="features" className="mt-6">
                              <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="features">Caractéristiques</TabsTrigger>
                                <TabsTrigger value="gallery">Galerie</TabsTrigger>
                                <TabsTrigger value="details">Détails</TabsTrigger>
                              </TabsList>

                              <TabsContent value="features" className="mt-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                  {selectedResidence.features.map((feature, index) => (
                                    <motion.div
                                      key={index}
                                      className="border rounded-lg overflow-hidden"
                                      initial={{ opacity: 0, y: 20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ duration: 0.4, delay: index * 0.1 }}
                                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                    >
                                      <div className="relative h-48">
                                        <Image
                                          src={feature.image || "/placeholder.svg"}
                                          alt={feature.title}
                                          fill
                                          className="object-cover"
                                        />
                                      </div>
                                      <div className="p-4">
                                        <h4 className="font-medium">{feature.title}</h4>
                                        <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                                      </div>
                                    </motion.div>
                                  ))}
                                </div>
                              </TabsContent>

                              <TabsContent value="gallery" className="mt-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {[
                                    {
                                      src: selectedResidence.mainImage,
                                      alt: `${selectedResidence.name} - Vue principale`,
                                    },
                                    {
                                      src: selectedResidence.hoverImage,
                                      alt: `${selectedResidence.name} - Vue alternative`,
                                    },
                                    ...(selectedResidence.galleryImages || []).map((imgSrc) => ({
                                      src: imgSrc,
                                      alt: `${selectedResidence.name} - Galerie`,
                                    })),
                                    ...selectedResidence.features.map((feature) => ({
                                      src: feature.image,
                                      alt: feature.title,
                                    })),
                                  ].map((image, index) => (
                                    <motion.div
                                      key={index}
                                      className="relative h-80 rounded-lg overflow-hidden"
                                      initial={{ opacity: 0, scale: 0.9 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ duration: 0.4, delay: index * 0.1 }}
                                      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                                    >
                                      <Image
                                        src={image.src || "/placeholder.svg"}
                                        alt={image.alt}
                                        fill
                                        className="object-cover"
                                      />
                                    </motion.div>
                                  ))}
                                </div>
                              </TabsContent>

                              <TabsContent value="details" className="mt-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                  <div>
                                    <h4 className="text-lg font-medium mb-4">Spécifications</h4>
                                    <ul className="space-y-3">
                                      {[
                                        { label: "Surface", value: selectedResidence.details.size },
                                        { label: "Chambres", value: selectedResidence.details.bedrooms },
                                        { label: "Salles de bain", value: selectedResidence.details.bathrooms },
                                      ].map((spec, index) => (
                                        <motion.li
                                          key={index}
                                          className="flex justify-between"
                                          initial={{ opacity: 0, x: -20 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ duration: 0.3, delay: index * 0.1 }}
                                        >
                                          <span className="text-muted-foreground">{spec.label}</span>
                                          <span className="font-medium">{spec.value}</span>
                                        </motion.li>
                                      ))}
                                    </ul>
                                  </div>

                                  <div>
                                    <h4 className="text-lg font-medium mb-4">Équipements</h4>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                      {selectedResidence.details.amenities.map((amenity, index) => (
                                        <motion.li
                                          key={index}
                                          className="flex items-center"
                                          initial={{ opacity: 0, x: 20 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ duration: 0.3, delay: index * 0.1 }}
                                          whileHover={{ x: 5, transition: { duration: 0.2 } }}
                                        >
                                          <motion.div
                                            className="h-2 w-2 rounded-full bg-primary mr-2"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                                          />
                                          {amenity}
                                        </motion.li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>

                                <motion.div
                                  className="mt-8"
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.4, delay: 0.6 }}
                                >
                                  <Button
                                    className="w-full relative overflow-hidden"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <motion.span
                                      className="absolute inset-0 bg-primary/10"
                                      initial={{ x: "-100%" }}
                                      whileHover={{ x: "100%" }}
                                      transition={{ duration: 0.6 }}
                                    />
                                    Demander plus d'informations
                                  </Button>
                                </motion.div>
                              </TabsContent>
                            </Tabs>
                          </DialogContent>
                        </Dialog>
                      </motion.div>
                    </motion.div>
                  </div>
                ) : (
                  <motion.div
                    className="flex flex-col items-center justify-center h-full min-h-[400px] p-8 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.h3
                      className="text-xl font-medium mb-2"
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                      Découvrez nos résidences de prestige
                    </motion.h3>
                    <motion.p
                      className="text-muted-foreground mb-6"
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      Sélectionnez une résidence pour voir plus de détails et explorer ses caractéristiques uniques
                    </motion.p>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.5 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.3,
                        type: "spring",
                        stiffness: 100,
                      }}
                    >
                      <Image
                        src="/placeholder.svg?height=200&width=200&text=Select+a+Residence"
                        alt="Select a residence"
                        width={200}
                        height={200}
                      />
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}