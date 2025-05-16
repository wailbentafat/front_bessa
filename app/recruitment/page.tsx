'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import FadeIn from "@/components/animations/fade-in"
import StaggerIn from "@/components/animations/stagger-in"

type FormData = {
  nom: string
  email: string
  telephone: string
  poste: string
  message: string
}

export default function PageRecrutement() {
  const [form, setForm] = useState<FormData>({
    nom: '',
    email: '',
    telephone: '',
    poste: '',
    message: '',
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSelect = (value: string) => {
    setForm({ ...form, poste: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/recrutement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Erreur lors de la soumission.')
      setSuccess(true)
      setForm({ nom: '', email: '', telephone: '', poste: '', message: '' })
    } catch (error) {
      console.error(error)
      setSuccess(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <section className="relative h-[40vh] w-full overflow-hidden">
        <img
          loading='lazy'
          src="/welcome.jpg"
          alt="Équipe sopimem"
          className="absolute inset-0 w-full h-full object-cover"
          
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <FadeIn direction="up">
              <h1 className="text-4xl font-bold text-white mb-4 p-5">Rejoignez Notre Équipe</h1>
              <p className="text-xl text-white/90 max-w-2xl p-5">
                Faites partie de sopimem Real Estate et contribuez à façonner l’avenir du luxe immobilier au Liban.
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
                  <h2 className="text-2xl font-bold mb-4">Pourquoi rejoindre sopimem ?</h2>
                  <p className="text-muted-foreground mb-6">
                    Chez sopimem Real Estate, nous sommes une famille de professionnels engagés vers l’excellence.
                  </p>

                  <StaggerIn baseDelay={100} staggerDelay={150}>
                    <div className="space-y-6">
                      {avantages.map((item, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                            {item.icon}
                          </div>
                          <div>
                            <h3 className="font-medium">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </StaggerIn>
                </div>
              </FadeIn>
            </div>

            <div className="lg:col-span-2">
              <FadeIn delay={200}>
                <div className="bg-white p-8 rounded-lg shadow-sm border">
                  <h2 className="text-2xl font-bold mb-6">Postulez maintenant</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label>Nom complet</Label>
                      <Input name="nom" value={form.nom} onChange={handleChange} required />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input type="email" name="email" value={form.email} onChange={handleChange} required />
                    </div>
                    <div>
                      <Label>Téléphone</Label>
                      <Input name="telephone" value={form.telephone} onChange={handleChange} required />
                    </div>
                    <div>
                      <Label>Poste souhaité</Label>
                      <Select onValueChange={handleSelect} value={form.poste}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choisissez un poste" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="agent">Agent Immobilier</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="support">Support Client</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Message</Label>
                      <Textarea name="message" value={form.message} onChange={handleChange} />
                    </div>
                    <Button type="submit" disabled={loading}>
                      {loading ? 'Envoi en cours...' : 'Envoyer la candidature'}
                    </Button>
                    {success && <p className="text-green-600 mt-2">Votre demande a été envoyée avec succès.</p>}
                  </form>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const avantages = [
  {
    icon: <span>📈</span>,
    title: "Évolution professionnelle",
    description: "Des opportunités continues d’apprentissage et d’avancement.",
  },
  {
    icon: <span>🤝</span>,
    title: "Environnement collaboratif",
    description: "Travaillez avec des professionnels talentueux dans une ambiance innovante.",
  },
  {
    icon: <span>💰</span>,
    title: "Rémunération compétitive",
    description: "Salaire attractif, primes et bonus selon vos performances.",
  },
  {
    icon: <span>🌍</span>,
    title: "Exposition internationale",
    description: "Participez à des projets globaux et élargissez votre réseau.",
  },
]
