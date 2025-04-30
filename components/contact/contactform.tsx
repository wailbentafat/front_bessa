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
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                  <Input {...register("name")} id="name" placeholder="Enter your full name" />
                  {errors.name && <p className="text-red-500 text-sm">{String(errors.name.message)}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input {...register("email")} id="email" type="email" placeholder="Enter your email" />
                  {errors.email && <p className="text-red-500 text-sm">{String(errors.email.message)}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                  <Input {...register("phone")} id="phone" placeholder="Enter your phone number" />
                  {errors.phone && <p className="text-red-500 text-sm">{String(errors.phone.message)}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                  <Input {...register("subject")} id="subject" placeholder="Enter message subject" />
                  {errors.subject && <p className="text-red-500 text-sm">{String(errors.subject.message)}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <Textarea {...register("message")} id="message" placeholder="Enter your message" className="min-h-32" />
                {errors.message?.message && <p className="text-red-500 text-sm">{String(errors.message.message)}</p>}
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full bg-red-600 hover:bg-red-700 text-white">
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 h-80 w-full rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3196.2347936343663!2d2.974255975382949!3d36.76493446968753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fb03536394345%3A0xaf895312364887d0!2sSopimem%20Promotion!5e0!3m2!1sen!2sdz!4v1742569922101!5m2!1sen!2sdz"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="Sopimem Real Estate Location"
          ></iframe>
        </div>
      </FadeIn>
    </div>
  );
}
