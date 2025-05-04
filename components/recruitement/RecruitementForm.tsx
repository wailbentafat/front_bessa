"use client"
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";


const formSchema = z.object({
    firstName: z.string().min(1, "Le prénom est requis"),
    lastName: z.string().min(1, "Le nom est requis"),
    email: z.string().email("Email invalide"),
    phone: z.string().min(1, "Le numéro de téléphone est requis"),
    position: z.string().min(1, "Le poste est requis"),
    experience: z.string().min(1, "Le niveau d'expérience est requis"),
    message: z.string().optional(),
    cv: z.any().refine((file) => file?.length > 0, "Le CV est requis"),
  });
export default function RecruitementForm() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
      } = useForm({ resolver: zodResolver(formSchema) });
   
      const onSubmit = (data:any) => {
        console.log("Form Data:", data);
        // Send to backend
      };
      return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom</Label>
              <Input id="firstName" {...register("firstName")} />
              {errors.firstName?.message && <p className="text-red-600">{String(errors.firstName.message)}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Nom</Label>
              <Input id="lastName" {...register("lastName")} />
              {errors.lastName && <p className="text-red-600">{String(errors.lastName.message)}</p>}
            </div>
          </div>
    
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && <p className="text-red-600">{String(errors.email.message)}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" {...register("phone")} />
              {errors.phone && <p className="text-red-600">{String(errors.phone.message)}</p>}
            </div>
          </div>
    
          <div className="space-y-2">
            <Label htmlFor="position">Position</Label>
            <Select onValueChange={(value) => setValue("position", value)}>
              <SelectTrigger id="position">
                <SelectValue placeholder="Sélectionnez un poste" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sales">Agent commercial</SelectItem>
                <SelectItem value="marketing">Spécialiste marketing</SelectItem>
                <SelectItem value="architecture">Architecte</SelectItem>
                <SelectItem value="interior">Designer d'intérieur</SelectItem>
                <SelectItem value="customer-service">Service client</SelectItem>
                <SelectItem value="other">Autre</SelectItem>
              </SelectContent>
            </Select>
            {errors.position && <p className="text-red-600">{String(errors.position.message)}</p>}
          </div>
    
          <div className="space-y-2">
            <Label htmlFor="experience">Années d'expérience</Label>
            <Select onValueChange={(value) => setValue("experience", value)}>
              <SelectTrigger id="experience">
                <SelectValue placeholder="Sélectionnez les années d'expérience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-1">0-1 an</SelectItem>
                <SelectItem value="1-3">1-3 ans</SelectItem>
                <SelectItem value="3-5">3-5 ans</SelectItem>
                <SelectItem value="5-10">5-10 ans</SelectItem>
                <SelectItem value="10+">10+ ans</SelectItem>
              </SelectContent>
            </Select>
            {errors.experience && <p className="text-red-600">{String(errors.experience.message)}</p>}
          </div>
    
          <div className="space-y-2">
            <Label htmlFor="message">Lettre de motivation</Label>
            <Textarea id="message" {...register("message")} className="min-h-32" />
          </div>
    
          <div className="space-y-2">
            <Label htmlFor="cv">Upload CV</Label>
            <input
              type="file"
              id="cv"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setValue("cv", e.target.files)}
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
            {errors.cv && <p className="text-red-600">{String(errors.cv.message)}</p>}
          </div>
    
          <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
            Submit Application
          </Button>
        </form>
      );
    
}