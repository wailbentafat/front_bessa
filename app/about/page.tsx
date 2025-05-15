import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FadeIn from "@/components/animations/fade-in";
import StaggerIn from "@/components/animations/stagger-in";
import ParallaxScroll from "@/components/animations/parallax-scroll";
// Assuming 'team' and 'values' data structures have fields that would need translation
// The content of 'team' and 'values' arrays themselves are not translated here.
import { team } from "@/data/team";
import { values } from "@/data/values";





export default function AboutPage() {
  return (
    <div className="min-h-screen ">
      <section className="relative h-[50vh]  w-full overflow-hidden">
        <ParallaxScroll speed={0.2}>
          <Image
            src="https://sjc.microlink.io/Np39p-7dlVvRx3akUxAb4yqZMEzHQkFc0OT79-CqJqNG-TV7dA1ixG8Z8i67sCoB2uOj_qxqIuyVjGDFuiuPbg.jpeg"
            alt="sopimem Immobilier" // Translated alt text
            fill
            className="object-cover"
            priority
          />
        </ParallaxScroll>
        <div className="absolute  inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <FadeIn direction="up">
              <h1 className="text-4xl font-bold text-white mb-4 p-5">À propos de sopimem Real Estate</h1>
              {/* Translated Heading */}
              <h1 className="text-4xl font-bold text-white mb-4 p-5">À propos de sopimem Immobilier</h1>
              {/* Translated Paragraph */}
              <p className="text-xl text-white/90 max-w-2xl p-5">
                Construire des propriétés exceptionnelles et créer des expériences de vie de luxe depuis 2003
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-16 p-5">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn direction="right">
              <div>
                <h2 className="text-3xl font-bold mb-6">Notre histoire</h2>
                <p className="text-muted-foreground mb-4">
                  Fondée en 2003, sopimem Real Estate est devenue l'un des principaux développeurs de propriétés de luxe au Liban. Ce qui a commencé comme une petite entreprise familiale est devenu un nom respecté dans l'industrie immobilière, reconnu pour notre engagement envers la qualité, l'innovation et la satisfaction des clients.
                </p>
                {/* Translated Paragraph 2 */}
                <p className="text-muted-foreground mb-6">
                  Au cours des deux dernières décennies, nous avons réussi à livrer plus de 30 projets résidentiels et commerciaux au Liban, créant des maisons et des espaces qui reflètent notre passion pour le design exceptionnel et l'artisanat.
                </p>
                <div className="flex gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600">20+</div>
                    <div className="text-sm text-muted-foreground">Années d'expérience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600">30+</div>
                    <div className="text-sm text-muted-foreground">Projets terminés</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600">6,000+</div>
                    <div className="text-sm text-muted-foreground">Résidents satisfaits</div>
                  </div>
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="left" delay={200}>
              <div className="relative h-[500px] rounded-lg overflow-hidden">
                <Image
                  src="main.webp"
                  alt="Équipe de sopimem Immobilier" // Translated alt text
                  fill
                  className="object-cover"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Nos valeurs</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Chez sopimem Real Estate, nos valeurs fondamentales guident tout ce que nous faisons, du design et de la construction au service client et à l'engagement communautaire.
              </p>
            </div>
          </FadeIn>

          <StaggerIn baseDelay={100} staggerDelay={150}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/*
                Note: value.title and value.description here come from an external 'values' array.
                These strings need to be translated within your 'values' data structure or using
                an internationalization (i18n) library in your application.
              */}
              {values.map((value, index) => (
                <Card key={index} className="border-none shadow-sm hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-4">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </StaggerIn>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <FadeIn>
            <div className="text-center mb-12">
              {/* Translated Heading */}
              <h2 className="text-3xl font-bold mb-4">Notre Équipe de Direction</h2>
              {/* Translated Paragraph */}
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Découvrez les professionnels expérimentés qui dirigent sopimem Immobilier et font avancer notre vision.
              </p>
            </div>
          </FadeIn>

          <StaggerIn baseDelay={100} staggerDelay={150}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {/*
                Note: member.name, member.position, and member.bio here come from an external 'team' array.
                These strings need to be translated within your 'team' data structure or using
                an internationalization (i18n) library in your application.
              */}
              {team.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="relative h-64 w-64 mx-auto rounded-lg overflow-hidden mb-4">
                    <Image
                      src={member.image || "/placeholder.svg?height=300&width=300"}
                      alt={member.name} // Alt text should ideally be translated too
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-red-600 mb-2">{member.position}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </div>
              ))}
            </div>
          </StaggerIn>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container">
          <FadeIn>
            <div className="text-center mb-12">
              {/* Translated Heading */}
              <h2 className="text-3xl font-bold mb-4">Notre Approche</h2>
           
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Découvrez comment nous donnons vie à des propriétés exceptionnelles, du concept à la réalisation.
              </p>
            </div>
          </FadeIn>

          {/* Translated Tab Triggers */}
          <Tabs defaultValue="design" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="design">Conception</TabsTrigger>
              <TabsTrigger value="construction">Construction</TabsTrigger>
              <TabsTrigger value="quality">Contrôle Qualité</TabsTrigger>
              <TabsTrigger value="service">Service Client</TabsTrigger>
            </TabsList>
            {/* Translated Tab Content - Design */}
            <TabsContent value="design" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  {/* Translated Heading */}
                  <h3 className="text-2xl font-bold mb-4">Conception Innovante</h3>
                  {/* Translated Paragraph 1 */}
                  <p className="text-muted-foreground mb-4">
                    Notre philosophie de conception vise à créer des espaces à la fois beaux et fonctionnels. Nous collaborons avec des architectes et designers renommés qui partagent notre vision d&apos;environnements de vie exceptionnels.
                  </p>
                  {/* Translated Paragraph 2 */}
                  <p className="text-muted-foreground">
                    Chaque projet commence par une compréhension approfondie du lieu, de l&apos;environnement et des besoins des futurs résidents. Cette approche réfléchie garantit que nos propriétés sont non seulement magnifiques, mais améliorent également la qualité de vie de ceux qui y résident.
                  </p>
                </div>
                <div className="relative h-80 rounded-lg overflow-hidden">
                  <Image
                    src="design.webp"
                    alt="Processus de Conception" // Translated alt text
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </TabsContent>
             {/* Translated Tab Content - Construction */}
            <TabsContent value="construction" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  {/* Translated Heading */}
                  <h3 className="text-2xl font-bold mb-4">Construction Supérieure</h3>
                  {/* Translated Paragraph 1 */}
                  <p className="text-muted-foreground mb-4">
                    Nous nous associons aux meilleurs entrepreneurs et n&apos;utilisons que des matériaux de première qualité pour garantir que nos bâtiments résistent à l&apos;épreuve du temps. Nos processus de construction respectent les normes internationales et intègrent les dernières technologies de construction.
                  </p>
                  {/* Translated Paragraph 2 */}
                  <p className="text-muted-foreground">
                    La sécurité, la durabilité et l&apos;efficacité sont au premier plan de notre approche de construction. Nous surveillons attentivement chaque phase de développement pour nous assurer que chaque détail répond à nos normes rigoureuses.
                  </p>
                </div>
                <div className="relative h-80 rounded-lg overflow-hidden">
                  <Image
                    src="construction.webp"
                    alt="Processus de Construction" // Translated alt text
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </TabsContent>
             {/* Translated Tab Content - Quality Control */}
            <TabsContent value="quality" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  {/* Translated Heading */}
                  <h3 className="text-2xl font-bold mb-4">Contrôle Qualité Rigoureux</h3>
                  {/* Translated Paragraph 1 */}
                  <p className="text-muted-foreground mb-4">
                    La qualité n&apos;est jamais compromise chez sopimem Immobilier. Notre équipe dédiée au contrôle qualité effectue des inspections approfondies à chaque étape de la construction pour s&apos;assurer que tous les travaux respectent nos normes élevées.
                  </p>
                  {/* Translated Paragraph 2 */}
                  <p className="text-muted-foreground">
                    Des fondations aux touches finales, nous accordons une attention méticuleuse à chaque détail. Cet engagement envers l&apos;excellence explique pourquoi nos propriétés conservent leur valeur et leur attrait pendant des générations.
                  </p>
                </div>
                <div className="relative h-80 rounded-lg overflow-hidden">
                  <Image
                    src="constructionundersite.webp"
                    alt="Contrôle Qualité" // Translated alt text
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </TabsContent>
            {/* Translated Tab Content - Customer Service */}
            <TabsContent value="service" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                   {/* Translated Heading */}
                  <h3 className="text-2xl font-bold mb-4">Service Client Exceptionnel</h3>
                  {/* Translated Paragraph 1 */}
                  <p className="text-muted-foreground mb-4">
                    Notre relation avec les clients ne s&apos;arrête pas à la vente. Nous offrons un service après-vente complet pour garantir que nos résidents bénéficient d&apos;une expérience de vie fluide dans leurs nouvelles maisons.
                  </p>
                   {/* Translated Paragraph 2 */}
                  <p className="text-muted-foreground">
                    Du support de maintenance à la gestion communautaire, notre équipe dédiée au service client est toujours disponible pour répondre à toutes les préoccupations et garantir que nos propriétés continuent de dépasser les attentes.
                  </p>
                </div>
                <div className="relative h-80 rounded-lg overflow-hidden">
                  <Image
                    src="customerservice.webp"
                    alt="Service Client" // Translated alt text
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="py-16 bg-red-600 text-white">
        <div className="container">
          <div className="text-center">
            {/* Translated Heading */}
            <h2 className="text-3xl font-bold mb-6">Prêt à trouver la maison de vos rêves ?</h2>
            {/* Translated Paragraph */}
            <p className="max-w-2xl mx-auto mb-8">
              Explorez notre portefeuille de propriétés exceptionnelles ou contactez notre équipe pour discuter de vos besoins spécifiques.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {/* Translated Button Text */}
              <Button className="bg-white text-red-600 hover:bg-gray-100">Voir les propriétés</Button>
               {/* Translated Button Text */}
              <Button variant="outline" className="border-white text-white hover:bg-red-700">
                Nous contacter
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}