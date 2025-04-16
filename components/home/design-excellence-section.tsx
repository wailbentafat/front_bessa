
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FadeIn from "@/components/animations/fade-in"
import { MacbookScroll } from "../ui/macbook-scroll"

export default function OurDesignsSection() {
  return (
    <section className="py-16">
      <div className="container">
        <h2 className="text-3xl font-semibold text-center mb-8">Our Designs</h2>
        <Tabs defaultValue="architecture" className="w-full">
          
          <TabsContent value="architecture" className="mt-6">
            <div className="flex justify-center">
              <FadeIn direction="up">
                <div className="overflow-hidden dark:bg-[#0B0B0F] bg-white w-full rounded-xl shadow-lg">
                  <MacbookScroll
                    title={
                      <span>
                        Architectural Innovation <br />
                        <span className="text-lg font-normal">
                          Pushing boundaries with cutting-edge architectural concepts
                        </span>
                      </span>
                    }
                    image={[
                      "/placeholder.svg?height=800&width=1200",
                      "/placeholder.svg?height=800&width=1200&text=Design+2",
                      "/placeholder.svg?height=800&width=1200&text=Design+3",
                      "/placeholder.svg?height=800&width=1200&text=Design+4",
                    ]}
                    showGradient={false}
                  />
                </div>
              </FadeIn>
            </div>
          </TabsContent>
          <TabsContent value="interior">
            <p>Interior design content goes here.</p>
          </TabsContent>
          <TabsContent value="landscaping">
            <p>Landscaping content goes here.</p>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

