export interface Destination {
  id: string;
  name: string;
  state: string;
  category: "Beach" | "Mountain" | "City" | "Spiritual" | "Desert";
  description: string;
  image: string;
  highlights: string[];
  popular?: boolean;
}

export interface TourPackage {
  id: string;
  title: string;
  destinationId: string;
  duration: string;
  price: number;
  rating: number;
  type: string;
  tagline: string;
  highlights: string[];
  image: string;
}

export const DESTINATIONS: Destination[] = [
  {
    id: "goa",
    name: "Goa",
    state: "Goa",
    category: "Beach",
    description: "Sunset cruises, old Portuguese lanes, and beachside cafes built for slow mornings.",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=1400",
    highlights: ["Calangute beach trails", "Sunset cruise", "Old Goa heritage walk"],
    popular: true,
  },
  {
    id: "manali",
    name: "Manali",
    state: "Himachal Pradesh",
    category: "Mountain",
    description: "Cool mountain air, pine forests, and adventure routes for every kind of traveler.",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=1400",
    highlights: ["Solang valley", "Snowline viewpoints", "Old Manali cafes"],
    popular: true,
  },
  {
    id: "jaipur",
    name: "Jaipur",
    state: "Rajasthan",
    category: "City",
    description: "Pink facades, royal courtyards, and artisan markets that feel like living museums.",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80&w=1400",
    highlights: ["Amer Fort", "City Palace", "Bazaar hopping"],
    popular: true,
  },
  {
    id: "leh",
    name: "Leh-Ladakh",
    state: "Ladakh",
    category: "Mountain",
    description: "High-altitude lakes, winding roads, and cinematic skies over stark landscapes.",
    image: "https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=1400",
    highlights: ["Pangong lake", "Monastery circuit", "Nubra valley drive"],
    popular: true,
  },
  {
    id: "rishikesh",
    name: "Rishikesh",
    state: "Uttarakhand",
    category: "Spiritual",
    description: "Riverside yoga retreats and adventure activities with a mindful, peaceful rhythm.",
    image: "https://images.unsplash.com/photo-1545630593-c15c772420f0?auto=format&fit=crop&q=80&w=1400",
    highlights: ["Ganga Aarti", "Rafting", "Ashram sessions"],
    popular: true,
  },
  {
    id: "jaisalmer",
    name: "Jaisalmer",
    state: "Rajasthan",
    category: "Desert",
    description: "Golden sandstone, desert camps, and stargazing nights in the heart of Thar.",
    image: "https://images.unsplash.com/photo-1545051905-392d9b7144b6?auto=format&fit=crop&q=80&w=1400",
    highlights: ["Desert safari", "Fort town", "Folk performances"],
  },
];

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: "goa-coastal-escape",
    title: "Goa Coastal Escape",
    destinationId: "goa",
    duration: "4D / 3N",
    price: 18999,
    rating: 4.8,
    type: "Beach",
    tagline: "A laid-back beach break with curated nightlife and heritage walks.",
    highlights: ["Beachfront stay", "Cruise dinner", "Local host support"],
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1400",
  },
  {
    id: "manali-snow-retreat",
    title: "Manali Snow Retreat",
    destinationId: "manali",
    duration: "5D / 4N",
    price: 22499,
    rating: 4.9,
    type: "Mountain",
    tagline: "Mountain views, adventure sports, and cozy evenings by the valley.",
    highlights: ["Valley activities", "Private transfers", "Guided sightseeing"],
    image: "https://images.unsplash.com/photo-1589708532758-dddb07657c13?auto=format&fit=crop&q=80&w=1400",
  },
  {
    id: "jaipur-royal-weekend",
    title: "Jaipur Royal Weekend",
    destinationId: "jaipur",
    duration: "3D / 2N",
    price: 14999,
    rating: 4.7,
    type: "City",
    tagline: "A short cultural reset through forts, craft streets, and palace courtyards.",
    highlights: ["Heritage hotel", "City guide", "Monument entries"],
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=1400",
  },
  {
    id: "ladakh-high-pass-trail",
    title: "Ladakh High Pass Trail",
    destinationId: "leh",
    duration: "6D / 5N",
    price: 32999,
    rating: 4.9,
    type: "Adventure",
    tagline: "Road-trip style exploration across iconic mountain passes and lakes.",
    highlights: ["Altitude support", "4x4 transfers", "Camp experience"],
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=1400",
  },
];

export const TRAVEL_STORIES = [
  {
    name: "Ritika S.",
    location: "Rishikesh",
    text: "I booked a solo river retreat and came back calmer, clearer, and surprisingly confident.",
  },
  {
    name: "Aman & Neha",
    location: "Goa",
    text: "The itinerary gave us free time and structure in the perfect balance for our anniversary trip.",
  },
  {
    name: "Kabir P.",
    location: "Ladakh",
    text: "Every day looked unreal. The team kept logistics seamless even at high altitude.",
  },
];
