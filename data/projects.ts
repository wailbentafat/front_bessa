import type { ProjectType } from "@/types/project"

export const projects: ProjectType[] = [
  {
    id: "grand-residence",
    name: "The Grand Residence",
    location: "Algiers, Algeria",
    description: "Luxury apartments with panoramic sea views and premium amenities.",
    fullDescription:
      "The Grand Residence offers an unparalleled luxury living experience in the heart of Algiers. Featuring spacious, elegantly designed apartments with floor-to-ceiling windows that frame breathtaking views of the Mediterranean Sea. Each residence is meticulously crafted with premium materials and finishes, creating a sophisticated and comfortable living environment.",
    aboutText:
      "Developed by Bessa Real Estate, The Grand Residence represents the pinnacle of urban luxury living. The building's striking architecture makes it a landmark in Algiers' skyline, while its prime location provides residents with easy access to the city's finest dining, shopping, and cultural attractions.",
    image:
      "https://sjc.microlink.io/Np39p-7dlVvRx3akUxAb4yqZMEzHQkFc0OT79-CqJqNG-TV7dA1ixG8Z8i67sCoB2uOj_qxqIuyVjGDFuiuPbg.jpeg",
    gallery: [
      "https://sjc.microlink.io/Np39p-7dlVvRx3akUxAb4yqZMEzHQkFc0OT79-CqJqNG-TV7dA1ixG8Z8i67sCoB2uOj_qxqIuyVjGDFuiuPbg.jpeg",
      "https://sjc.microlink.io/jvJHQBuNEqKEmIXuzK-XHAPPaA1KzMRN_IUUM7mM64ywoGvcGu3eqZTIz1JdDyqigwlVdBJbPKcbNkbjLZD9fA.jpeg"
    ],
    price: 1250000,
    propertyType: "Apartment",
    size: 185,
    bedrooms: 3,
    bathrooms: 2,
    status: "Ready to Move",
    tags: ["Sea View", "Luxury", "City Center"],
    features: [
      "Floor-to-ceiling windows",
      "Private balcony",
      "Italian marble flooring",
      "Smart home technology"
    ],
    amenities: [
      "24/7 concierge service",
      "Rooftop infinity pool",
      "Fully equipped fitness center"
    ],
    nearbyAmenities: [
      "5 minutes to premium shopping centers",
      "10 minutes to international schools",
      "15 minutes to Algiers Central District"
    ],
    floorPlans: [
      {
        id: "floor-1",
        name: "Type A - 2 Bedroom",
        image: "/placeholder.svg?height=800&width=1200",
        size: "120 sqm",
        bedrooms: 2,
        bathrooms: 2,
        description: "Spacious 2-bedroom apartment with open living area and private balcony."
      }
    ],
    mapPosition: {
      lat: 36.7538,
      lng: 3.058756
    },
    agent: {
      name: "Sarah Khoury",
      title: "Senior Sales Consultant",
      phone: "+213 3 123 456",
      email: "sarah.k@bessarealestate.com",
      image: "/placeholder.svg?height=100&width=100"
    }
  },
  {
    id: "azure-heights",
    name: "Azure Heights",
    location: "Oran, Algeria",
    description: "Modern living spaces with smart home technology and private terraces.",
    fullDescription:
      "Azure Heights is a premium residential development offering contemporary living spaces with stunning views of Oran Bay. These modern apartments combine elegant design with cutting-edge technology to create homes that are both beautiful and functional. Each unit features private terraces where residents can enjoy the spectacular Mediterranean sunsets.",
    aboutText:
      "Azure Heights represents the future of residential living in Algeria. With its focus on sustainability and smart technology, this development sets a new standard for modern homes.",
    image:
      "https://sjc.microlink.io/jvJHQBuNEqKEmIXuzK-XHAPPaA1KzMRN_IUUM7mM64ywoGvcGu3eqZTIz1JdDyqigwlVdBJbPKcbNkbjLZD9fA.jpeg",
    gallery: [
      "https://sjc.microlink.io/jvJHQBuNEqKEmIXuzK-XHAPPaA1KzMRN_IUUM7mM64ywoGvcGu3eqZTIz1JdDyqigwlVdBJbPKcbNkbjLZD9fA.jpeg",
      "https://sjc.microlink.io/Np39p-7dlVvRx3akUxAb4yqZMEzHQkFc0OT79-CqJqNG-TV7dA1ixG8Z8i67sCoB2uOj_qxqIuyVjGDFuiuPbg.jpeg"
    ],
    price: 950000,
    propertyType: "Apartment",
    size: 160,
    bedrooms: 2,
    bathrooms: 2,
    status: "Under Construction",
    tags: ["Bay View", "Smart Home", "Eco-Friendly"],
    features: ["Smart home automation system", "Energy-efficient appliances"],
    amenities: ["Infinity edge swimming pool", "Landscaped gardens"],
    nearbyAmenities: [
      "5 minutes to Oran waterfront",
      "10 minutes to major shopping centers"
    ],
    mapPosition: {
      lat: 35.697654,
      lng: -0.634313
    },
    agent: {
      name: "Michel Haddad",
      title: "Property Consultant",
      phone: "+213 3 789 012",
      email: "michel.h@bessarealestate.com"
    }
  }
]
