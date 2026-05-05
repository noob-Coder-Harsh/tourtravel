"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Calendar,
  Users,
  Search,
  Star,
  Clock,
  CheckCircle2,
  ChevronRight,
  X,
  Menu,
  ArrowRight,
  Camera,
  Mail,
  Phone,
  Filter,
  Heart,
  Info,
  Navigation,
  Compass,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- TYPES ---
interface Destination {
  id: string;
  name: string;
  state: string;
  category: string;
  description: string;
  image: string;
  popular: boolean;
  highlights: string[];
}

interface Package {
  id: string;
  title: string;
  destinationId: string;
  duration: string;
  price: number;
  rating: number;
  type: string;
  highlights: string[];
  images: string[];
  itinerary: { day: number; title: string; description: string }[];
  included: string[];
  excluded: string[];
}

interface SearchResults {
  destinations: Destination[];
  packages: Package[];
}

interface SearchBarProps {
  onSelect: (type: string, id: string) => void;
  isNavbar?: boolean;
}

interface NavbarProps {
  currentPage: string;
  navigate: (path: string) => void;
  onSearchSelect: (type: string, id: string) => void;
}

interface HomePageProps {
  navigate: (path: string) => void;
  onSearchSelect: (type: string, id: string) => void;
}

interface DestinationsListPageProps {
  navigate: (path: string) => void;
}

interface DestinationDetailPageProps {
  id: string;
  navigate: (path: string) => void;
}

interface PackageDetailPageProps {
  id: string;
  navigate: (path: string) => void;
}

// --- DATA LAYER ---
const DESTINATIONS: Destination[] = [
  {
    id: "goa",
    name: "Goa",
    state: "Goa",
    category: "Beach",
    description:
      "India's pocket-sized paradise, known for its pristine beaches, vibrant nightlife, and Portuguese heritage architecture.",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=800",
    popular: true,
    highlights: ["Water Sports", "Old Goa Churches", "Beach Shacks"],
  },
  {
    id: "manali",
    name: "Manali",
    state: "Himachal Pradesh",
    category: "Mountain",
    description: "A high-altitude Himalayan resort town known as a backpacking center and honeymoon destination.",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=800",
    popular: true,
    highlights: ["Rohtang Pass", "Solang Valley", "Hidimba Temple"],
  },
  {
    id: "jaipur",
    name: "Jaipur",
    state: "Rajasthan",
    category: "City",
    description:
      "The 'Pink City' of India, famous for its grand palaces, historic forts, and colorful traditional markets.",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80&w=800",
    popular: true,
    highlights: ["Hawa Mahal", "Amer Fort", "City Palace"],
  },
  {
    id: "leh",
    name: "Leh-Ladakh",
    state: "Ladakh",
    category: "Mountain",
    description:
      "A land of high passes, crystal clear lakes, and ancient Buddhist monasteries set against a stark desert landscape.",
    image: "https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800",
    popular: true,
    highlights: ["Pangong Lake", "Nubra Valley", "Khardung La"],
  },
  {
    id: "kerala-alleppey",
    name: "Alleppey",
    state: "Kerala",
    category: "Beach",
    description: "The Venice of the East, famous for its serene backwaters and traditional houseboat stays.",
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=800",
    popular: true,
    highlights: ["Houseboat Cruise", "Backwater Canals", "Vembanad Lake"],
  },
  {
    id: "varanasi",
    name: "Varanasi",
    state: "Uttar Pradesh",
    category: "Spiritual",
    description:
      "One of the oldest continuously inhabited cities in the world, considered the spiritual capital of India.",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=800",
    popular: false,
    highlights: ["Ganga Aarti", "Kashi Vishwanath", "Sarnath"],
  },
  {
    id: "rishikesh",
    name: "Rishikesh",
    state: "Uttarakhand",
    category: "Spiritual",
    description:
      "The world capital of Yoga, offering a blend of spiritual tranquility and adrenaline-pumping river rafting.",
    image: "https://images.unsplash.com/photo-1545630593-c15c772420f0?auto=format&fit=crop&q=80&w=800",
    popular: true,
    highlights: ["Laxman Jhula", "White Water Rafting", "Yoga Ashrams"],
  },
  {
    id: "andaman",
    name: "Andaman",
    state: "Andaman & Nicobar",
    category: "Beach",
    description: "Tropical paradise with white sandy beaches and world-class scuba diving spots in the Bay of Bengal.",
    image: "https://images.unsplash.com/photo-1589135325905-3c9633f93544?auto=format&fit=crop&q=80&w=800",
    popular: true,
    highlights: ["Havelock Island", "Radhanagar Beach", "Cellular Jail"],
  },
  {
    id: "udaipur",
    name: "Udaipur",
    state: "Rajasthan",
    category: "City",
    description: "The City of Lakes, renowned for its romantic palaces reflecting in the calm waters of Lake Pichola.",
    image: "https://images.unsplash.com/photo-1590393963400-344449830509?auto=format&fit=crop&q=80&w=800",
    popular: true,
    highlights: ["Lake Palace", "Jagdish Temple", "Fateh Sagar Lake"],
  },
  {
    id: "jaisalmer",
    name: "Jaisalmer",
    state: "Rajasthan",
    category: "Desert",
    description:
      "The Golden City, rising out of the heart of the Thar Desert with its magnificent sandstone architecture.",
    image: "https://images.unsplash.com/photo-1545051905-392d9b7144b6?auto=format&fit=crop&q=80&w=800",
    popular: false,
    highlights: ["Sam Sand Dunes", "Golden Fort", "Camel Safari"],
  },
  {
    id: "hampi",
    name: "Hampi",
    state: "Karnataka",
    category: "Spiritual",
    description: "An open-air museum of boulders and ruins belonging to the ancient Vijayanagara Empire.",
    image: "https://images.unsplash.com/photo-1582230005393-2794f316689d?auto=format&fit=crop&q=80&w=800",
    popular: false,
    highlights: ["Virupaksha Temple", "Stone Chariot", "Tungabhadra River"],
  },
  {
    id: "amritsar",
    name: "Amritsar",
    state: "Punjab",
    category: "Spiritual",
    description: "Home to the sacred Golden Temple and the heart of Sikh culture and hospitality.",
    image: "https://images.unsplash.com/photo-1588096344316-f702239d3ca0?auto=format&fit=crop&q=80&w=800",
    popular: false,
    highlights: ["Golden Temple", "Wagah Border", "Jallianwala Bagh"],
  },
  {
    id: "shimla",
    name: "Shimla",
    state: "Himachal Pradesh",
    category: "Mountain",
    description: "The former summer capital of British India, offering colonial charm and stunning ridge views.",
    image: "https://images.unsplash.com/photo-1623492701902-47dc207df5dc?auto=format&fit=crop&q=80&w=800",
    popular: false,
    highlights: ["The Mall Road", "Jakhu Temple", "Kalka-Shimla Toy Train"],
  },
  {
    id: "spiti",
    name: "Spiti Valley",
    state: "Himachal Pradesh",
    category: "Mountain",
    description:
      "A cold desert mountain valley, offering some of the most rugged and beautiful landscapes in the world.",
    image: "https://images.unsplash.com/photo-1571401835393-8c5f35328320?auto=format&fit=crop&q=80&w=800",
    popular: false,
    highlights: ["Key Monastery", "Chandratal Lake", "Kaza"],
  },
  {
    id: "darjeeling",
    name: "Darjeeling",
    state: "West Bengal",
    category: "Mountain",
    description: "Famous for its emerald green tea gardens and the spectacular sunrise views of Kanchenjunga.",
    image: "https://images.unsplash.com/photo-1544460411-1bc32531396b?auto=format&fit=crop&q=80&w=800",
    popular: false,
    highlights: ["Tiger Hill", "Tea Estates", "Himalayan Mountaineering Institute"],
  },
  {
    id: "coorg",
    name: "Coorg",
    state: "Karnataka",
    category: "Mountain",
    description: "The Scotland of India, known for its coffee plantations and misty hills.",
    image: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&q=80&w=800",
    popular: false,
    highlights: ["Abbey Falls", "Coffee Tours", "Madikeri Fort"],
  },
  {
    id: "ooty",
    name: "Ooty",
    state: "Tamil Nadu",
    category: "Mountain",
    description: "The Queen of Hill Stations, known for its sprawling botanical gardens and Nilgiri Mountain Railway.",
    image: "https://images.unsplash.com/photo-1580191947416-62d35a55e71d?auto=format&fit=crop&q=80&w=800",
    popular: false,
    highlights: ["Ooty Lake", "Doddabetta Peak", "Rose Garden"],
  },
  {
    id: "agra",
    name: "Agra",
    state: "Uttar Pradesh",
    category: "City",
    description: "Home to the Taj Mahal, an eternal symbol of love and a masterpiece of Mughal architecture.",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=800",
    popular: true,
    highlights: ["Taj Mahal", "Agra Fort", "Mehtab Bagh"],
  },
  {
    id: "mumbai",
    name: "Mumbai",
    state: "Maharashtra",
    category: "City",
    description: "The city of dreams, a fast-paced metropolis blending colonial history with modern glam.",
    image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&q=80&w=800",
    popular: false,
    highlights: ["Gateway of India", "Marine Drive", "Elephanta Caves"],
  },
  {
    id: "delhi",
    name: "Delhi",
    state: "Delhi",
    category: "City",
    description: "India's capital city, where ancient history meets modern government in a culinary paradise.",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=800",
    popular: false,
    highlights: ["Red Fort", "India Gate", "Chandni Chowk"],
  },
];

const PACKAGES: Package[] = [
  {
    id: "pkg-goa-1",
    title: "Goa Beach Party & Relax",
    destinationId: "goa",
    duration: "4 Days / 3 Nights",
    price: 18500,
    rating: 4.8,
    type: "Beach",
    highlights: ["Nightlife", "Private Cruise", "Luxury Villa"],
    images: ["https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=800"],
    itinerary: [
      {
        day: 1,
        title: "Arrival in North Goa",
        description: "Check-in at luxury beach villa and evening at Calangute.",
      },
      { day: 2, title: "South Goa Cultural Tour", description: "Visit Old Goa churches and Mangeshi temple." },
      { day: 3, title: "Private Yacht Session", description: "Sunset cruise with dinner and music." },
      { day: 4, title: "Departure", description: "Shopping at Flea Market and transfer to airport." },
    ],
    included: ["3 Star Hotel Stay", "Breakfast & Dinner", "Airport Transfers"],
    excluded: ["Lunch", "Flight Tickets", "Personal Expenses"],
  },
  {
    id: "pkg-manali-1",
    title: "Manali Snowy Retreat",
    destinationId: "manali",
    duration: "5 Days / 4 Nights",
    price: 22000,
    rating: 4.9,
    type: "Mountain",
    highlights: ["Snow Activities", "River Rafting", "Apple Orchards"],
    images: ["https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=800"],
    itinerary: [
      { day: 1, title: "Arrive in Manali", description: "Pick up and check-in. Evening at Mall Road." },
      { day: 2, title: "Solang Valley", description: "Adventure sports like paragliding and zorbing." },
      { day: 3, title: "Rohtang Pass", description: "Full day excursion to snow point." },
      { day: 4, title: "Local Sightseeing", description: "Hidimba Temple and Vashisht Hot Springs." },
      { day: 5, title: "Departure", description: "Transfer to bus stand/airport." },
    ],
    included: ["Deluxe Room", "Private Cab", "Adventure Gear"],
    excluded: ["Rohtang Pass Permit", "Alcohol"],
  },
  {
    id: "pkg-jaipur-1",
    title: "Royal Rajasthan Heritage",
    destinationId: "jaipur",
    duration: "3 Days / 2 Nights",
    price: 14999,
    rating: 4.7,
    type: "City",
    highlights: ["Elephant Ride", "Palace Stay", "Light Show"],
    images: ["https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80&w=800"],
    itinerary: [
      { day: 1, title: "Forts of Jaipur", description: "Amer Fort and Jaigarh Fort visit." },
      { day: 2, title: "City Tour", description: "City Palace, Jantar Mantar and local market." },
      { day: 3, title: "Breakfast and Checkout", description: "Farewell gift and drop-off." },
    ],
    included: ["Palace Stay", "Guide", "Monument Fees"],
    excluded: ["Shopping Cost", "Meals other than Breakfast"],
  },
];

// --- FAKE BACKEND UTILITIES ---
const api = {
  getDestinations: async (): Promise<Destination[]> => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return DESTINATIONS;
  },
  getPackages: async (): Promise<Package[]> => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return PACKAGES;
  },
  getDestinationById: async (id: string): Promise<Destination | undefined> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return DESTINATIONS.find((d) => d.id === id);
  },
  getPackageById: async (id: string): Promise<Package | undefined> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return PACKAGES.find((p) => p.id === id);
  },
};

// --- COMPONENTS ---

const SearchBar: React.FC<SearchBarProps> = ({ onSelect, isNavbar = false }) => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<SearchResults>({ destinations: [], packages: [] });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.length > 1) {
        const dResults = DESTINATIONS.filter(
          (d) =>
            d.name.toLowerCase().includes(query.toLowerCase()) || d.state.toLowerCase().includes(query.toLowerCase()),
        ).slice(0, 4);

        const pResults = PACKAGES.filter((p) => p.title.toLowerCase().includes(query.toLowerCase())).slice(0, 4);

        setResults({ destinations: dResults, packages: pResults });
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full ${isNavbar ? "max-w-md" : "max-w-3xl"}`}>
      <div
        className={`flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-2xl transition-all ${isNavbar ? "py-1" : "py-2 px-2"}`}>
        <div className="pl-4 pr-2 text-white/50">
          <Search size={20} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Where are you dreaming of going?"
          className="bg-transparent border-none focus:ring-0 text-white placeholder-white/50 w-full py-3"
        />
      </div>

      <AnimatePresence>
        {isOpen && (results.destinations.length > 0 || results.packages.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl overflow-hidden z-[100] border border-gray-100">
            {results.destinations.length > 0 && (
              <div className="p-4">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 px-2">Destinations</p>
                {results.destinations.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => {
                      onSelect("destination", d.id);
                      setIsOpen(false);
                      setQuery("");
                    }}
                    className="w-full flex items-center space-x-4 p-2 hover:bg-teal-50 rounded-xl transition-colors group text-left">
                    <img src={d.image} className="w-10 h-10 rounded-lg object-cover" alt="" />
                    <div>
                      <p className="font-bold text-gray-900 group-hover:text-teal-600">{d.name}</p>
                      <p className="text-xs text-gray-500">{d.state}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {results.packages.length > 0 && (
              <div className="p-4 border-t border-gray-50 bg-gray-50/50">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 px-2">Packages</p>
                {results.packages.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onSelect("package", p.id);
                      setIsOpen(false);
                      setQuery("");
                    }}
                    className="w-full flex items-center space-x-4 p-2 hover:bg-teal-50 rounded-xl transition-colors group text-left">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600">
                      <Compass size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 group-hover:text-teal-600">{p.title}</p>
                      <p className="text-xs text-gray-500">
                        {p.duration} • ₹{p.price.toLocaleString()}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SkeletonCard = () => <div className="bg-gray-100 animate-pulse rounded-3xl h-[400px] w-full" />;

const Navbar: React.FC<NavbarProps> = ({ currentPage, navigate, onSearchSelect }) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "Destinations", id: "destinations" },
    { name: "Packages", id: "packages" },
    { name: "Gallery", id: "gallery" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-md py-3" : "bg-transparent py-6"}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("home")}>
          <div className="bg-teal-600 p-1.5 rounded-lg">
            <Navigation className="text-white w-6 h-6" />
          </div>
          <span className={`text-2xl font-bold tracking-tight ${isScrolled ? "text-gray-900" : "text-white"}`}>
            LuxeVoyage
          </span>
        </div>

        <div className="hidden lg:block flex-1 mx-12">
          {isScrolled && <SearchBar onSelect={onSearchSelect} isNavbar={true} />}
        </div>

        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => navigate(link.id)}
              className={`text-sm font-bold transition-all relative ${
                currentPage.startsWith(link.id) ? "text-teal-600" : isScrolled ? "text-gray-600" : "text-white/90"
              }`}>
              {link.name}
              {currentPage.startsWith(link.id) && (
                <motion.div
                  layoutId="navline"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-teal-600 rounded-full"
                />
              )}
            </button>
          ))}
        </div>

        <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? (
            <X className={isScrolled ? "text-gray-900" : "text-white"} />
          ) : (
            <Menu className={isScrolled ? "text-gray-900" : "text-white"} />
          )}
        </button>
      </div>
    </nav>
  );
};

// --- PAGES ---

const HomePage: React.FC<HomePageProps> = ({ navigate, onSearchSelect }) => {
  const [featured, setFeatured] = useState<Destination[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    api.getDestinations().then((data) => {
      setFeatured(data.filter((d) => d.popular).slice(0, 6));
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <section className="relative h-screen flex items-center justify-center text-white text-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover"
            alt=""
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black mb-8">
            Explore India.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mx-auto flex justify-center">
            <SearchBar onSelect={onSearchSelect} />
          </motion.div>
        </div>
      </section>

      <section className="py-24 container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black text-gray-900 mb-2">Popular Destinations</h2>
            <p className="text-gray-500">Most loved spots by our community this season.</p>
          </div>
          <button
            onClick={() => navigate("destinations")}
            className="text-teal-600 font-bold flex items-center hover:gap-2 transition-all">
            Browse All <ChevronRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? [1, 2, 3].map((i) => <SkeletonCard key={i} />)
            : featured.map((dest) => (
                <motion.div
                  key={dest.id}
                  whileHover={{ y: -10 }}
                  onClick={() => navigate(`destination-detail/${dest.id}`)}
                  className="group relative h-[450px] rounded-[32px] overflow-hidden cursor-pointer">
                  <img
                    src={dest.image}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt=""
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                  <div className="absolute bottom-0 p-8 w-full">
                    <span className="text-teal-400 font-bold text-xs uppercase tracking-widest mb-2 block">
                      {dest.state}
                    </span>
                    <h3 className="text-3xl font-bold text-white mb-4">{dest.name}</h3>
                    <button className="bg-white/10 backdrop-blur-md text-white px-6 py-2 rounded-full font-bold border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore
                    </button>
                  </div>
                </motion.div>
              ))}
        </div>
      </section>

      <section className="bg-gray-900 py-24 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-16">Why Travel With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { icon: Info, title: "Expert Guides", desc: "Local storytellers for every destination." },
              { icon: Heart, title: "Curated Stays", desc: "Handpicked hotels for absolute comfort." },
              { icon: Navigation, title: "Seamless Transit", desc: "End-to-end luxury transportation." },
              { icon: CheckCircle2, title: "Fixed Prices", desc: "No hidden costs, no surprises." },
            ].map((item, i) => (
              <div key={i}>
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 text-teal-400">
                  <item.icon size={32} />
                </div>
                <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const DestinationsListPage: React.FC<DestinationsListPageProps> = ({ navigate }) => {
  const [list, setList] = useState<Destination[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>("All");

  useEffect(() => {
    api.getDestinations().then((data) => {
      setList(data);
      setLoading(false);
    });
  }, []);

  const filtered = filter === "All" ? list : list.filter((d) => d.category === filter);

  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
          <h1 className="text-5xl font-black text-gray-900">Explore India</h1>
          <div className="flex space-x-2 bg-white p-2 rounded-2xl shadow-sm overflow-x-auto max-w-full">
            {["All", "Mountain", "Beach", "City", "Spiritual", "Desert"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${filter === cat ? "bg-teal-600 text-white shadow-lg" : "text-gray-500 hover:bg-gray-100"}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? [1, 2, 3, 4, 5, 6].map((i) => <SkeletonCard key={i} />)
            : filtered.map((dest) => (
                <motion.div
                  key={dest.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => navigate(`destination-detail/${dest.id}`)}
                  className="bg-white rounded-[32px] overflow-hidden group shadow-sm hover:shadow-xl cursor-pointer">
                  <div className="h-64 relative overflow-hidden">
                    <img
                      src={dest.image}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt=""
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                      {dest.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-teal-600 font-bold text-[10px] uppercase tracking-widest mb-1">{dest.state}</p>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{dest.name}</h3>
                    <p className="text-gray-500 text-xs line-clamp-2">{dest.description}</p>
                  </div>
                </motion.div>
              ))}
        </div>
      </div>
    </div>
  );
};

const DestinationDetailPage: React.FC<DestinationDetailPageProps> = ({ id, navigate }) => {
  const [dest, setDest] = useState<Destination | undefined>(undefined);
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const d = await api.getDestinationById(id);
      const p = await api.getPackages();
      setDest(d);
      setPackages(p.filter((pkg) => pkg.destinationId === id));
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center text-teal-600">
        <Loader2 className="animate-spin" size={48} />
      </div>
    );
  if (!dest) return <div className="h-screen flex items-center justify-center">Destination not found</div>;

  return (
    <div className="bg-white">
      <section className="relative h-[70vh]">
        <img src={dest.image} className="w-full h-full object-cover" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        <div className="absolute bottom-12 left-0 w-full">
          <div className="container mx-auto px-6">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              <span className="bg-teal-600 text-white text-xs px-4 py-1.5 rounded-full font-bold uppercase mb-4 inline-block">
                {dest.state}
              </span>
              <h1 className="text-6xl font-black text-gray-900">{dest.name}</h1>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-6">About {dest.name}</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-12">{dest.description}</p>

            <h3 className="text-2xl font-bold mb-8">What to Expect</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dest.highlights.map((h) => (
                <div key={h} className="flex items-center space-x-4 bg-gray-50 p-6 rounded-2xl">
                  <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center text-teal-600">
                    <CheckCircle2 />
                  </div>
                  <span className="font-bold text-gray-700">{h}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-900 rounded-[32px] p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Interested?</h3>
              <p className="text-gray-400 text-sm mb-8">
                Let our destination experts help you plan the perfect trip to {dest.name}.
              </p>
              <button
                onClick={() => navigate("contact")}
                className="w-full bg-teal-600 py-4 rounded-2xl font-bold hover:bg-teal-500 transition-all">
                Enquire Now
              </button>
            </div>
          </div>
        </div>

        {packages.length > 0 && (
          <div className="mt-32">
            <h2 className="text-4xl font-bold mb-12">Available Packages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="border border-gray-100 rounded-[32px] p-6 hover:shadow-2xl transition-all group">
                  <div className="h-56 rounded-2xl overflow-hidden mb-6">
                    <img
                      src={pkg.images[0]}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      alt=""
                    />
                  </div>
                  <h4 className="text-xl font-bold mb-2">{pkg.title}</h4>
                  <p className="text-teal-600 font-bold mb-6">₹{pkg.price.toLocaleString()}</p>
                  <button
                    onClick={() => navigate(`package-detail/${pkg.id}`)}
                    className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-teal-600 transition-all">
                    View Package
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

const PackageDetailPage: React.FC<PackageDetailPageProps> = ({ id, navigate }) => {
  const [pkg, setPkg] = useState<Package | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    api.getPackageById(id).then((data) => {
      setPkg(data);
      setLoading(false);
    });
  }, [id]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center text-teal-600">
        <Loader2 className="animate-spin" size={48} />
      </div>
    );
  if (!pkg) return <div>Package not found</div>;

  return (
    <div className="bg-white min-h-screen">
      <section className="relative h-[60vh]">
        <img src={pkg.images[0]} className="w-full h-full object-cover" alt="" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="container mx-auto px-6">
            <span className="text-teal-400 font-bold text-sm uppercase tracking-widest mb-4 block">{pkg.duration}</span>
            <h1 className="text-6xl font-black text-white">{pkg.title}</h1>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-16">
            <div>
              <h2 className="text-3xl font-bold mb-8">Itinerary</h2>
              <div className="space-y-12">
                {pkg.itinerary.map((step, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="flex flex-col items-center">
                      <div className="w-14 h-14 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 font-bold border-2 border-teal-100 group-hover:bg-teal-600 group-hover:text-white transition-all">
                        {step.day}
                      </div>
                      {i !== pkg.itinerary.length - 1 && <div className="w-0.5 h-full bg-gray-100 my-4" />}
                    </div>
                    <div className="pb-4">
                      <h4 className="text-xl font-bold mb-2">
                        Day {step.day}: {step.title}
                      </h4>
                      <p className="text-gray-500 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-green-50 p-8 rounded-[32px]">
                <h3 className="text-green-800 font-bold mb-6 flex items-center">
                  <CheckCircle2 className="mr-2" /> What's Included
                </h3>
                <ul className="space-y-3">
                  {pkg.included.map((item) => (
                    <li key={item} className="text-green-700 text-sm flex items-start">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50 p-8 rounded-[32px]">
                <h3 className="text-red-800 font-bold mb-6 flex items-center">
                  <X className="mr-2" /> Not Included
                </h3>
                <ul className="space-y-3">
                  {pkg.excluded.map((item) => (
                    <li key={item} className="text-red-700 text-sm flex items-start">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-gray-50 border border-gray-100 rounded-[40px] p-10 shadow-sm">
              <div className="mb-10">
                <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest mb-2">Starting from</p>
                <div className="flex items-baseline space-x-2">
                  <span className="text-5xl font-black text-gray-900">₹{pkg.price.toLocaleString()}</span>
                  <span className="text-gray-400">/ person</span>
                </div>
              </div>
              <div className="space-y-6 mb-10">
                <div className="flex justify-between items-center text-sm py-4 border-b border-gray-200">
                  <span className="text-gray-500 font-bold">Duration</span>
                  <span className="font-bold text-gray-900">{pkg.duration}</span>
                </div>
                <div className="flex justify-between items-center text-sm py-4 border-b border-gray-200">
                  <span className="text-gray-500 font-bold">Rating</span>
                  <span className="font-bold text-gray-900 flex items-center">
                    <Star size={14} className="text-yellow-500 mr-1" fill="currentColor" /> {pkg.rating}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="w-full bg-teal-600 text-white py-5 rounded-[24px] font-bold text-lg hover:bg-teal-700 transition-all shadow-xl shadow-teal-600/20">
                Book Package
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white rounded-[40px] w-full max-w-lg p-12 text-center shadow-2xl">
              <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-8 text-teal-600">
                <CheckCircle2 size={48} />
              </div>
              <h3 className="text-3xl font-bold mb-4">Request Received</h3>
              <p className="text-gray-500 mb-10 leading-relaxed">
                Our concierge for <strong>{pkg.title}</strong> will contact you on your registered mobile number
                shortly.
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold">
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ContactPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="bg-white rounded-[40px] shadow-sm overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/3 bg-teal-600 p-12 text-white">
            <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
            <div className="space-y-8">
              <div className="flex space-x-4">
                <Mail className="shrink-0" />
                <div>
                  <p className="text-xs text-white/50 font-bold uppercase mb-1">Email</p>
                  <p className="font-bold">hello@luxevoyage.in</p>
                </div>
              </div>
              <div className="flex space-x-4">
                <Phone className="shrink-0" />
                <div>
                  <p className="text-xs text-white/50 font-bold uppercase mb-1">Call</p>
                  <p className="font-bold">+91 99999 88888</p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-2/3 p-12">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-bold mb-6">Send an Inquiry</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    required
                    placeholder="Name"
                    className="w-full bg-gray-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-teal-500"
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    className="w-full bg-gray-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <textarea
                  rows={4}
                  placeholder="Your Message"
                  className="w-full bg-gray-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-teal-500"></textarea>
                <button
                  disabled={isSubmitting}
                  className="w-full bg-teal-600 text-white py-4 rounded-2xl font-bold hover:bg-teal-700 transition-all flex items-center justify-center">
                  {isSubmitting ? <Loader2 className="animate-spin" /> : "Send Message"}
                </button>
              </form>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-2">Message Sent</h3>
                <p className="text-gray-500">We'll get back to you within 24 hours.</p>
                <button onClick={() => setSubmitted(false)} className="mt-8 text-teal-600 font-bold">
                  Send another message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- APP CORE ---

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [params, setParams] = useState<string | null>(null);

  const navigate = (path: string) => {
    const [page, id] = path.split("/");
    setCurrentPage(page);
    setParams(id || null);
    window.scrollTo(0, 0);
  };

  const handleSearchSelect = (type: string, id: string) => {
    if (type === "destination") navigate(`destination-detail/${id}`);
    else navigate(`package-detail/${id}`);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage navigate={navigate} onSearchSelect={handleSearchSelect} />;
      case "destinations":
        return <DestinationsListPage navigate={navigate} />;
      case "destination-detail":
        return <DestinationDetailPage id={params!} navigate={navigate} />;
      case "packages":
        return <DestinationsListPage navigate={navigate} />; // Reusing list view for demo
      case "package-detail":
        return <PackageDetailPage id={params!} navigate={navigate} />;
      case "contact":
        return <ContactPage />;
      default:
        return <HomePage navigate={navigate} onSearchSelect={handleSearchSelect} />;
    }
  };

  return (
    <div className="font-sans antialiased bg-white selection:bg-teal-100">
      <Navbar currentPage={currentPage} navigate={navigate} onSearchSelect={handleSearchSelect} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage + (params || "")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}>
          {renderPage()}
        </motion.div>
      </AnimatePresence>

      <footer className="bg-gray-950 text-white pt-24 pb-12 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="bg-teal-600 p-1.5 rounded-lg">
                  <Navigation className="text-white w-5 h-5" />
                </div>
                <span className="text-2xl font-bold">LuxeVoyage</span>
              </div>
              <p className="text-gray-400 max-w-sm mb-8">
                Redefining luxury travel across the Indian subcontinent. Experience culture, heritage, and comfort like
                never before.
              </p>
              <div className="flex space-x-4">
                {["Instagram", "Twitter", "LinkedIn"].map((s) => (
                  <div
                    key={s}
                    className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors cursor-pointer text-xs">
                    {s[0]}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-gray-500 text-sm">
                <li onClick={() => navigate("home")} className="hover:text-teal-400 cursor-pointer">
                  Home
                </li>
                <li onClick={() => navigate("destinations")} className="hover:text-teal-400 cursor-pointer">
                  Destinations
                </li>
                <li onClick={() => navigate("packages")} className="hover:text-teal-400 cursor-pointer">
                  Packages
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Legal</h4>
              <ul className="space-y-4 text-gray-500 text-sm">
                <li className="hover:text-teal-400 cursor-pointer">Privacy Policy</li>
                <li className="hover:text-teal-400 cursor-pointer">Terms of Use</li>
                <li className="hover:text-teal-400 cursor-pointer">Refund Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-12 text-center text-gray-600 text-xs">
            © 2024 LuxeVoyage India Pvt Ltd. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
