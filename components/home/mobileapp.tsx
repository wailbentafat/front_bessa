import { ChevronRight, Download } from "lucide-react";
import FadeIn from "../animations/fade-in";
import { Button } from "../ui/button";
import Image from "next/image";

export default function MobileApp() {
    return(
         <section id="app" className="bg-slate-50 py-16 md:py-24">
                <div className="container">
                  <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
                    <FadeIn direction="right" delay={200}>
                      <div className="flex justify-center">
                        <div className="relative h-[500px] w-[250px] transition-transform hover:scale-105 duration-700">
                          <Image src="mobile.jpeg" alt="Bessa Mobile App" fill className="object-cover rounded-3xl shadow-xl" />
                        </div>
                      </div>
                    </FadeIn>
        
                    <FadeIn direction="left" delay={400}>
                      <div>
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">Buy Bessa App</h2>
                        <p className="text-muted-foreground mb-8">
                          Experience the convenience of browsing our properties, receiving real-time updates, and connecting
                          with our team directly from your smartphone.
                        </p>
                        <ul className="space-y-4 mb-8">
                          {appFeatures.map((feature, index) => (
                            <li key={index} className="flex items-start group">
                              <div className="mr-4 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                                <ChevronRight className="h-4 w-4" />
                              </div>
                              <p>{feature}</p>
                            </li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-4">
                          <Button className="bg-black hover:bg-gray-800 text-white transition-transform hover:scale-105">
                            <Download className="mr-2 h-4 w-4" />
                            App Store
                          </Button>
                          <Button className="bg-black hover:bg-gray-800 text-white transition-transform hover:scale-105">
                            <Download className="mr-2 h-4 w-4" />
                            Google Play
                          </Button>
                        </div>
                      </div>
                    </FadeIn>
                  </div>
                </div>
              </section>
    )
}
const appFeatures = [
    "Browse exclusive properties in real-time",
    "Receive instant notifications on new listings",
    "Virtual tours of properties from your device",
    "Direct messaging with our sales team",
    "Secure document submission and verification",
  ]
  