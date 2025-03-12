"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { BedDouble, Bath, Ruler, ZoomIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface FloorPlan {
  id: string
  name: string
  image: string
  size: string
  bedrooms: number
  bathrooms: number
  description: string
}

interface FloorPlanViewerProps {
  floorPlans: FloorPlan[]
}

export default function FloorPlanViewer({ floorPlans }: FloorPlanViewerProps) {
  const [selectedPlan, setSelectedPlan] = useState<FloorPlan | null>(null)
  const [openDialog, setOpenDialog] = useState(false)

  const handleSelectPlan = (plan: FloorPlan) => {
    setSelectedPlan(plan)
  }

  const handleOpenDialog = (plan: FloorPlan) => {
    setSelectedPlan(plan)
    setOpenDialog(true)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {floorPlans.map((plan) => (
          <div
            key={plan.id}
            className={`border rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
              selectedPlan?.id === plan.id ? "ring-2 ring-red-600" : "hover:shadow-md"
            }`}
            onClick={() => handleSelectPlan(plan)}
          >
            <div className="relative h-48">
              <Image src={plan.image || "/placeholder.svg"} alt={plan.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-medium">{plan.name}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedPlan && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-slate-50 rounded-lg p-6 mt-6"
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-2/3 relative">
                <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
                  <Image
                    src={selectedPlan.image || "/placeholder.svg"}
                    alt={selectedPlan.name}
                    fill
                    className="object-contain"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    onClick={() => handleOpenDialog(selectedPlan)}
                  >
                    <ZoomIn className="h-5 w-5" />
                    <span className="sr-only">Zoom in</span>
                  </Button>
                </div>
              </div>
              <div className="md:w-1/3">
                <h3 className="text-xl font-bold mb-3">{selectedPlan.name}</h3>
                <p className="text-muted-foreground mb-4">{selectedPlan.description}</p>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <Ruler className="h-5 w-5 text-red-600 mr-2" />
                    <span className="text-sm">Size: {selectedPlan.size}</span>
                  </div>
                  <div className="flex items-center">
                    <BedDouble className="h-5 w-5 text-red-600 mr-2" />
                    <span className="text-sm">Bedrooms: {selectedPlan.bedrooms}</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-5 w-5 text-red-600 mr-2" />
                    <span className="text-sm">Bathrooms: {selectedPlan.bathrooms}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Download Floor Plan</Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedPlan?.name}</DialogTitle>
          </DialogHeader>
          <div className="relative h-[70vh]">
            <Image
              src={selectedPlan?.image || "/placeholder.svg"}
              alt={selectedPlan?.name || "Floor plan"}
              fill
              className="object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

