import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import FadeIn from "@/components/animations/fade-in"
import StaggerIn from "@/components/animations/stagger-in"

export default function SellYourLandPage() {
  return (
    <div className="min-h-screen">
      <section className="relative h-[40vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <FadeIn direction="up">
              <h1 className="text-4xl font-bold text-white mb-4">Sell Your Land to Bessa</h1>
              <p className="text-xl text-white/90 max-w-2xl">
                We're interested in acquiring prime land for our future developments. Submit your property details and
                we'll get back to you with an offer.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <FadeIn>
                <div className="sticky top-24">
                  <h2 className="text-2xl font-bold mb-4">Why Sell to Bessa?</h2>
                  <p className="text-muted-foreground mb-6">
                    Selling your land to Bessa Real Estate offers numerous advantages and a seamless experience.
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
                    <h3 className="font-bold mb-3">Have Questions?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Our land acquisition team is ready to assist you with any questions about selling your property.
                    </p>
                    <div className="flex items-center gap-2">
                      <Button className="bg-red-600 hover:bg-red-700 text-white">Contact Us</Button>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            <div className="lg:col-span-2">
              <FadeIn delay={200}>
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6">Land Submission Form</h2>
                    <form className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Owner Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="first-name">First Name</Label>
                            <Input id="first-name" placeholder="Enter your first name" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="last-name">Last Name</Label>
                            <Input id="last-name" placeholder="Enter your last name" />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="Enter your email" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" placeholder="Enter your phone number" />
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-6 space-y-2">
                        <h3 className="text-lg font-medium">Property Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" placeholder="City, District" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="area">Land Area (sqm)</Label>
                            <Input id="area" type="number" placeholder="Enter land area" />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="zoning">Zoning Type</Label>
                            <Select>
                              <SelectTrigger id="zoning">
                                <SelectValue placeholder="Select zoning type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="residential">Residential</SelectItem>
                                <SelectItem value="commercial">Commercial</SelectItem>
                                <SelectItem value="mixed">Mixed Use</SelectItem>
                                <SelectItem value="agricultural">Agricultural</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="price">Asking Price (USD)</Label>
                            <Input id="price" type="number" placeholder="Enter asking price" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="description">Property Description</Label>
                          <Textarea
                            id="description"
                            placeholder="Describe your land, including topography, access roads, utilities, etc."
                            className="min-h-32"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Property Features</Label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {propertyFeatures.map((feature, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <Checkbox id={`feature-${index}`} />
                                <label
                                  htmlFor={`feature-${index}`}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {feature}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-6 space-y-2">
                        <h3 className="text-lg font-medium">Documents</h3>
                        <div className="space-y-2">
                          <Label htmlFor="title-deed">Title Deed</Label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <input type="file" id="title-deed" className="hidden" accept=".pdf,.doc,.docx,.jpg,.png" />
                            <label
                              htmlFor="title-deed"
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
                                Click to upload title deed (PDF, DOC, DOCX, JPG, PNG)
                              </span>
                            </label>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="photos">Property Photos</Label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <input type="file" id="photos" className="hidden" accept=".jpg,.jpeg,.png" multiple />
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
                                Click to upload property photos (JPG, PNG)
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox id="terms" />
                        <div className="grid gap-1.5 leading-none">
                          <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            I agree to the terms and conditions
                          </label>
                          <p className="text-sm text-muted-foreground">
                            By submitting this form, you agree to our privacy policy and allow us to contact you
                            regarding your property.
                          </p>
                        </div>
                      </div>

                      <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
                        Submit Property
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Land Acquisition Process</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We've streamlined our process to make selling your land as simple and transparent as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, index) => (
              <div key={index} className="relative">
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
    title: "Competitive Offers",
    description: "We provide fair market value offers based on thorough property assessments.",
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
    title: "Quick Process",
    description: "Our streamlined acquisition process ensures timely transactions and closings.",
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
    title: "Secure Transactions",
    description: "All transactions are handled with the utmost security and legal compliance.",
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
    title: "No Hidden Fees",
    description: "We cover all transaction costs, with no hidden fees or unexpected charges.",
  },
]

const propertyFeatures = [
  "Road Access",
  "Water Supply",
  "Electricity",
  "Flat Terrain",
  "Sloped Terrain",
  "Sea View",
  "Mountain View",
  "Near Urban Area",
  "Near Schools",
  "Near Shopping Centers",
  "Existing Structure",
  "Fenced Property",
]

const process = [
  {
    title: "Submit Your Property",
    description: "Fill out our form with details about your land and upload relevant documents.",
  },
  {
    title: "Property Assessment",
    description: "Our team will evaluate your property and schedule a site visit if necessary.",
  },
  {
    title: "Receive an Offer",
    description: "We'll present you with a fair market value offer based on our assessment.",
  },
  {
    title: "Close the Deal",
    description: "Once you accept, we'll handle all paperwork and complete the transaction.",
  },
]

