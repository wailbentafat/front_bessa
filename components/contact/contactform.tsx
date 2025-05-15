"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FadeIn from "../animations/fade-in";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";


const contactSchema = z.object({
  name: z.string().min(3, "Full Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const res = await fetch("http://localhost:8000/api/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.detail || Object.values(errorData).join(", ") || "Failed"
        );
      }
  
      reset();
      alert("Message sent successfully!");
    } catch (error: any) {
      alert("Submission failed: " + error.message);
    }
  };
  

  return (
    <div className="lg:col-span-2">
    <FadeIn delay={200}>
      <Card>
        <CardContent className="p-6">
          {/* French Heading */}
          <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                {/* French Label */}
                <label htmlFor="name" className="text-sm font-medium">Nom complet</label>
                {/* French Placeholder */}
                <Input {...register("name")} id="name" placeholder="Entrez votre nom complet" />
                {errors.name && <p className="text-red-500 text-sm">{String(errors.name.message)}</p>}
              </div>
              <div className="space-y-2">
                {/* French Label */}
                <label htmlFor="email" className="text-sm font-medium">E-mail</label>
                {/* French Placeholder */}
                <Input {...register("email")} id="email" type="email" placeholder="Entrez votre adresse e-mail" />
                {errors.email && <p className="text-red-500 text-sm">{String(errors.email.message)}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                {/* French Label */}
                <label htmlFor="phone" className="text-sm font-medium">Téléphone</label>
                {/* French Placeholder */}
                <Input {...register("phone")} id="phone" placeholder="Entrez votre numéro de téléphone" />
                {errors.phone && <p className="text-red-500 text-sm">{String(errors.phone.message)}</p>}
              </div>
              <div className="space-y-2">
                {/* French Label */}
                <label htmlFor="subject" className="text-sm font-medium">Objet</label>
                 {/* French Placeholder */}
                <Input {...register("subject")} id="subject" placeholder="Entrez l'objet du message" />
                {errors.subject && <p className="text-red-500 text-sm">{String(errors.subject.message)}</p>}
              </div>
            </div>

            <div className="space-y-2">
              {/* French Label */}
              <label htmlFor="message" className="text-sm font-medium">Message</label>
               {/* French Placeholder */}
              <Textarea {...register("message")} id="message" placeholder="Entrez votre message" className="min-h-32" />
              {errors.message?.message && <p className="text-red-500 text-sm">{String(errors.message.message)}</p>}
            </div>

            {/* French Button Text */}
            <Button type="submit" disabled={isSubmitting} className="w-full bg-red-600 hover:bg-red-700 text-white">
              {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="mt-8 h-80 w-full rounded-lg overflow-hidden">
        <iframe
          // Note: This specific URL might not display a map correctly.
          // Typically you'd use an embed URL provided by Google Maps.
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3196.2347936343663!2d2.974255975382949!3d36.76493446968753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fb03536394345%3A0xaf895312364887d0!2sSopimem%20Promotion!5e0!3m2!1sen!2sdz!4v1742569922101!5m2!1sen!2sdz"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
         
          title="Localisation de Sopimem Immobilier"
        ></iframe>
      </div>
    </FadeIn>
  </div>
  );
}
