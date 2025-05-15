"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import FadeIn from "@/components/animations/fade-in"
import StaggerIn from "@/components/animations/stagger-in"
import { useToast } from "@/components/ui/use-toast"
import { z } from "zod"

// Define the form data type
type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  area: string;
  zoning: string;
  price: string;
  description: string;
  features: string[];
  titleDeed: File | null;
  photos: File[] | null;
  agreeToTerms: boolean;
}

export default function SellYourLandPage() {
  const { toast } = useToast()
  
  // Form state
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    area: "",
    zoning: "",
    price: "",
    description: "",
    features: [],
    titleDeed: null,
    photos: null,
    agreeToTerms: false
  })
  
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  // File upload state
  const [titleDeedName, setTitleDeedName] = useState<string>("")
  const [photoNames, setPhotoNames] = useState<string[]>([])
  
  // Form validation schema
  const formSchema = z.object({
    firstName: z.string().min(1, "Le prénom est requis"),
    lastName: z.string().min(1, "Le nom est requis"),
    email: z.string().email("Adresse e-mail invalide"),
    phone: z.string().min(5, "Numéro de téléphone invalide"),
    location: z.string().min(1, "L'emplacement est requis"),
    area: z.string().min(1, "La superficie est requise"),
    zoning: z.string().min(1, "Le type de zonage est requis"),
    price: z.string().min(1, "Le prix demandé est requis"),
    agreeToTerms: z.literal(true, {
      errorMap: () => ({ message: "Vous devez accepter les conditions" }),
    }),
  })
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  // Handle checkbox changes
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }))
  }
  
  // Handle feature checkboxes
  const handleFeatureChange = (feature: string, checked: boolean) => {
    setFormData(prev => {
      const features = [...prev.features]
      if (checked && !features.includes(feature)) {
        features.push(feature)
      } else if (!checked && features.includes(feature)) {
        const index = features.indexOf(feature)
        features.splice(index, 1)
      }
      return { ...prev, features }
    })
  }
  
  // Handle file uploads
  const handleTitleDeedUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData(prev => ({ ...prev, titleDeed: e.target.files?.[0] || null }))
      setTitleDeedName(e.target.files[0].name)
    }
  }
  
  const handlePhotosUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files)
      setFormData(prev => ({ ...prev, photos: filesArray }))
      setPhotoNames(filesArray.map(file => file.name))
    }
  }
  
  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Validate form data
      formSchema.parse(formData)
      
      setLoading(true)
      setErrors({})
      
      // Create FormData for file uploads
      const formDataToSend = new FormData()
      
      // Add text fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "titleDeed" && key !== "photos" && key !== "features") {
          formDataToSend.append(key, String(value))
        }
      })
      
      // Add features as an array
      formData.features.forEach((feature, index) => {
        formDataToSend.append(`features[${index}]`, feature)
      })
      
      // Add files
      if (formData.titleDeed) {
        formDataToSend.append("titleDeed", formData.titleDeed)
      }
      
      if (formData.photos) {
        formData.photos.forEach((photo, index) => {
          formDataToSend.append(`photos[${index}]`, photo)
        })
      }
      
      // Send to server
      // Replace with your actual API endpoint
      const response = await fetch("/api/submit-land", {
        method: "POST",
        body: formDataToSend,
      })
      
      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du formulaire")
      }
      
      // Success message
      toast({
        title: "Formulaire soumis avec succès",
        description: "Nous vous contacterons bientôt concernant votre propriété.",
      })
      
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        location: "",
        area: "",
        zoning: "",
        price: "",
        description: "",
        features: [],
        titleDeed: null,
        photos: null,
        agreeToTerms: false
      })
      setTitleDeedName("")
      setPhotoNames([])
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMap: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            errorMap[err.path[0].toString()] = err.message
          }
        })
        setErrors(errorMap)
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Une erreur s'est produite lors de la soumission du formulaire.",
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <section className="relative h-[40vh] w-full overflow-hidden">
        <img 
          loading='lazy'
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
          alt="Terrain à vendre" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <FadeIn direction="up">
              <h1 className="text-4xl font-bold text-white mb-4 p-5">Vendez Votre Terrain à Bessa</h1>
              <p className="text-xl text-white/90 max-w-2xl p-5">
                Nous sommes intéressés par l'acquisition de terrains de qualité pour nos futurs développements. Soumettez 
                les détails de votre propriété et nous vous contacterons avec une offre.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-16 p-5">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <FadeIn>
                <div className="sticky top-24">
                  <h2 className="text-2xl font-bold mb-4">Pourquoi Vendre à Bessa ?</h2>
                  <p className="text-muted-foreground mb-6">
                    La vente de votre terrain à Bessa Immobilier offre de nombreux avantages et une expérience sans tracas.
                  </p>

                  <StaggerIn baseDelay={100} staggerDelay={150}>
                    <div className="space-y-6">
                      {benefits.map((benefit, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex-shrink-0 h-12 w-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                            {benefit.icon}
                          </div>
                          <div>
                            <h3 className="font-medium">{benefit.title}</h3>
                            <p className="text-sm text-muted-foreground">{benefit.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </StaggerIn>

                  <div className="mt-8 bg-slate-50 p-6 rounded-lg">
                    <h3 className="font-bold mb-3">Des Questions ?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Notre équipe d'acquisition de terrains est prête à vous aider pour toute question concernant la vente de votre propriété.
                    </p>
                    <div className="flex items-center gap-2">
                      <Button className="bg-red-600 hover:bg-red-700 text-white">Contactez-Nous</Button>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            <div className="lg:col-span-2">
              <FadeIn delay={200}>
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6">Formulaire de Soumission de Terrain</h2>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Informations du Propriétaire</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">Prénom</Label>
                            <Input 
                              id="firstName" 
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              placeholder="Entrez votre prénom" 
                            />
                            {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Nom</Label>
                            <Input 
                              id="lastName" 
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              placeholder="Entrez votre nom"
                            />
                            {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                              id="email" 
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              type="email" 
                              placeholder="Entrez votre email" 
                            />
                            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Téléphone</Label>
                            <Input 
                              id="phone" 
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="Entrez votre numéro de téléphone" 
                            />
                            {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-6 space-y-2">
                        <h3 className="text-lg font-medium">Informations sur la Propriété</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="location">Emplacement</Label>
                            <Input 
                              id="location" 
                              name="location"
                              value={formData.location}
                              onChange={handleChange}
                              placeholder="Ville, District" 
                            />
                            {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="area">Superficie du Terrain (m²)</Label>
                            <Input 
                              id="area" 
                              name="area"
                              value={formData.area}
                              onChange={handleChange}
                              type="number" 
                              placeholder="Entrez la superficie" 
                            />
                            {errors.area && <p className="text-sm text-red-500">{errors.area}</p>}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="zoning">Type de Zonage</Label>
                            <Select onValueChange={(value) => handleSelectChange("zoning", value)}>
                              <SelectTrigger id="zoning">
                                <SelectValue placeholder="Sélectionnez le type de zonage" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="residential">Résidentiel</SelectItem>
                                <SelectItem value="commercial">Commercial</SelectItem>
                                <SelectItem value="mixed">Usage Mixte</SelectItem>
                                <SelectItem value="agricultural">Agricole</SelectItem>
                                <SelectItem value="other">Autre</SelectItem>
                              </SelectContent>
                            </Select>
                            {errors.zoning && <p className="text-sm text-red-500">{errors.zoning}</p>}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="price">Prix Demandé (EUR)</Label>
                            <Input 
                              id="price" 
                              name="price"
                              value={formData.price}
                              onChange={handleChange}
                              type="number" 
                              placeholder="Entrez le prix demandé" 
                            />
                            {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="description">Description de la Propriété</Label>
                          <Textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Décrivez votre terrain, incluant la topographie, les routes d'accès, les services publics, etc."
                            className="min-h-32"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Caractéristiques de la Propriété</Label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {propertyFeatures.map((feature, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={`feature-${index}`} 
                                  checked={formData.features.includes(feature.value)}
                                  onCheckedChange={(checked) => 
                                    handleFeatureChange(feature.value, checked === true)
                                  }
                                />
                                <label
                                  htmlFor={`feature-${index}`}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {feature.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-6 space-y-2">
                        <h3 className="text-lg font-medium">Documents</h3>
                        <div className="space-y-2">
                          <Label htmlFor="titleDeed">Titre de Propriété</Label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <input 
                              type="file" 
                              id="titleDeed" 
                              className="hidden" 
                              onChange={handleTitleDeedUpload}
                              accept=".pdf,.doc,.docx,.jpg,.png" 
                            />
                            <label
                              htmlFor="titleDeed"
                              className="cursor-pointer flex flex-col items-center justify-center gap-2"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-8 h-8 text-muted-foreground"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                                />
                              </svg>
                              <span className="text-sm text-muted-foreground">
                                {titleDeedName ? titleDeedName : "Cliquez pour télécharger le titre de propriété (PDF, DOC, DOCX, JPG, PNG)"}
                              </span>
                            </label>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="photos">Photos de la Propriété</Label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <input 
                              type="file" 
                              id="photos" 
                              className="hidden" 
                              onChange={handlePhotosUpload}
                              accept=".jpg,.jpeg,.png" 
                              multiple 
                            />
                            <label
                              htmlFor="photos"
                              className="cursor-pointer flex flex-col items-center justify-center gap-2"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-8 h-8 text-muted-foreground"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                />
                              </svg>
                              <span className="text-sm text-muted-foreground">
                                {photoNames.length > 0 
                                  ? `${photoNames.length} fichier(s) sélectionné(s)` 
                                  : "Cliquez pour télécharger des photos de la propriété (JPG, PNG)"}
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox 
                          id="agreeToTerms" 
                          checked={formData.agreeToTerms}
                          onCheckedChange={(checked) => 
                            handleCheckboxChange("agreeToTerms", checked === true)
                          }
                        />
                        <div className="grid gap-1.5 leading-none">
                          <label
                            htmlFor="agreeToTerms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            J'accepte les conditions générales
                          </label>
                          <p className="text-sm text-muted-foreground">
                            En soumettant ce formulaire, vous acceptez notre politique de confidentialité et nous autorisez à vous contacter
                            concernant votre propriété.
                          </p>
                        </div>
                      </div>
                      {errors.agreeToTerms && <p className="text-sm text-red-500">{errors.agreeToTerms}</p>}

                      <Button 
                        type="submit" 
                        className="w-full bg-red-600 hover:bg-red-700 text-white"
                        disabled={loading}
                      >
                        {loading ? "Envoi en cours..." : "Soumettre la Propriété"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 p-5 bg-slate-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Notre Processus d'Acquisition de Terrains</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nous avons simplifié notre processus pour rendre la vente de votre terrain aussi simple et transparente que possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, index) => (
              <div key={index} className="relative">
              
                <img 
                  src={`/api/placeholder/120/120`}
                  alt={step.title}
                  className="absolute right-2 top-2 w-12 h-12 object-cover rounded-md opacity-80"
                />
                <div className="bg-white rounded-lg p-6 h-full shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="absolute -top-4 -left-4 h-12 w-12 rounded-full bg-red-600 text-white flex items-center justify-center text-xl font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold mt-4 mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 w-6 h-2 bg-red-200 transform translate-x-3"></div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center mb-8">Types de Terrains Recherchés</h3>
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {landImages.map((image, index) => (
                <div key={index} className="relative overflow-hidden rounded-lg h-64 group">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <p className="text-white font-medium p-4">{image.alt}</p>
                  </div>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </section>
    </div>
  )
}
const benefits = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Offres Compétitives",
    description: "Nous proposons des offres à la juste valeur marchande basées sur des évaluations approfondies de la propriété.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Processus Rapide",
    description: "Notre processus d'acquisition simplifié garantit des transactions et des clôtures rapides.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
        />
      </svg>
    ),
    title: "Transactions Sécurisées",
    description: "Toutes les transactions sont traitées avec la plus grande sécurité et conformité légale.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
        />
      </svg>
    ),
    title: "Aucuns Frais Cachés",
    description: "Nous prenons en charge tous les frais de transaction, sans frais cachés ni charges inattendues.",
  },
]

const propertyFeatures = [
  { label: "Accès Routier", value: "Accès Routier" },
  { label: "Alimentation en Eau", value: "Alimentation en Eau" },
  { label: "Électricité", value: "Électricité" },
  { label: "Terrain Plat", value: "Terrain Plat" },
  { label: "Terrain en Pente", value: "Terrain en Pente" },
  { label: "Vue sur la Mer", value: "Vue sur la Mer" },
  { label: "Vue sur la Montagne", value: "Vue sur la Montagne" },
  { label: "Proche Zone Urbaine", value: "Proche Zone Urbaine" },
  { label: "Proche des Écoles", value: "Proche des Écoles" },
  { label: "Proche des Centres Commerciaux", value: "Proche des Centres Commerciaux" },
  { label: "Structure Existante", value: "Structure Existante" },
  { label: "Terrain Clôturé", value: "Terrain Clôturé" },
];


const process = [
  {
    title: "Soumettez Votre Propriété",
    description: "Remplissez notre formulaire avec des détails sur votre terrain et téléchargez les documents pertinents.",
  },
  {
    title: "Evaluation de la Propriété",
    description: "Notre équipe évaluera votre propriété et planifiera une visite sur site si nécessaire.",
  },
  {
    title: "Recevez une Offre",
    description: "Nous vous présenterons une offre de valeur marchande équitable basée sur notre évaluation.",
  },
  {
    title: "Finalisez l'Accord",
    description: "Une fois que vous accepterez, nous nous chargerons de toutes les formalités et complèterons la transaction.",
  },
]

