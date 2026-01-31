export interface Package {
    slug: string;
    title: string;
    location: string;
    price: number;
    durationDays: number;
    type: string;
    rating: number;
    images: string[];
    highlights: string[];
    includes: string[];
    itinerary: { day: number; title: string; description: string }[];
    faqs: { question: string; answer: string }[];
}

export const packages: Package[] = [
    {
        slug: "bali-bliss-retreat",
        title: "Bali Bliss Retreat",
        location: "Bali, Indonesia",
        price: 1299,
        durationDays: 7,
        type: "Relaxation",
        rating: 4.8,
        images: ["https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1000&auto=format&fit=crop"],
        highlights: ["Ubud Monkey Forest", "Tegallalang Rice Terrace", "Seminyak Beach Sunset", "Traditional Balinese Massage"],
        includes: ["Accommodation", "Daily Breakfast", "Airport Transfers", "Guided Tours", "Spa Treatment"],
        itinerary: [
            { day: 1, title: "Arrival in Denpasar", description: "Welcome to Bali! Transfer to your hotel in Ubud." },
            { day: 2, title: "Ubud Culture Tour", description: "Visit the Monkey Forest and local art markets." },
            { day: 3, title: "Rice Terraces & Temples", description: "Explore Tegallalang and Tirta Empul Temple." },
            { day: 4, title: "Transfer to Seminyak", description: "Head to the coast for beach relaxation." },
            { day: 5, title: "Seminyak Leisure", description: "Free day for shopping and beach clubs." },
            { day: 6, title: "Sunset Dinner", description: "Farewell dinner on the beach." },
            { day: 7, title: "Departure", description: "Transfer to the airport for your flight home." }
        ],
        faqs: [
            { question: "Is airfare included?", answer: "No, flights are not included in the package price." },
            { question: "Do I need a visa?", answer: "Most nationalities can get a visa on arrival." }
        ]
    },
    {
        slug: "japanese-cultural-odyssey",
        title: "Japanese Cultural Odyssey",
        location: "Japan",
        price: 3499,
        durationDays: 10,
        type: "Culture",
        rating: 4.9,
        images: ["https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1000"],
        highlights: ["Tokyo Skytree", "Mount Fuji", "Kyoto Temples", "Bullet Train Experience", "Tea Ceremony"],
        includes: ["4-Star Hotels", "JR Rail Pass", "Breakfast & Some Dinners", "English Speaking Guide", "All Entrance Fees"],
        itinerary: [
            { day: 1, title: "Arrive in Tokyo", description: "Meet your guide and transfer to Shinjuku." },
            { day: 2, title: "Modern Tokyo", description: "Visit Shibuya Crossing and Akihabara." },
            { day: 3, title: "Mount Fuji Day Trip", description: "Scenic views of the iconic mountain." },
            { day: 4, title: "Bullet Train to Kyoto", description: "Experience the Shinkansen speed." },
            { day: 5, title: "Kyoto Temples", description: "Kinkaku-ji (Golden Pavilion) and Fushimi Inari." },
            { day: 6, title: "Nara Park", description: "Meet the friendly bowing deer." },
            { day: 7, title: "Osaka Food Tour", description: "Taste the best street food in Dotonbori." },
            { day: 8, title: "Hiroshima", description: "Visit the Peace Memorial Park." },
            { day: 9, title: "Return to Tokyo", description: "Last minute shopping in Ginza." },
            { day: 10, title: "Sayonara", description: "Airport transfer for departure." }
        ],
        faqs: [
            { question: "When is the best time for cherry blossoms?", answer: "Late March to early April." },
            { question: "Is the JR Pass included?", answer: "Yes, a 7-day JR Pass is included." }
        ]
    },
    {
        slug: "iceland-northern-lights",
        title: "Iceland Northern Lights Adventure",
        location: "Reykjavik, Iceland",
        price: 2199,
        durationDays: 5,
        type: "Adventure",
        rating: 4.7,
        images: ["https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=1000"],
        highlights: ["Blue Lagoon", "Golden Circle", "Northern Lights Hunt", "Black Sand Beach", "Waterfall Exploration"],
        includes: ["Boutique Hotel", "Aurora Hunting Tour", "Blue Lagoon Entry", "Jeep Tour", "Warm Clothing Rental"],
        itinerary: [
            { day: 1, title: "Arrival & Blue Lagoon", description: "Relax in the geothermal waters after your flight." },
            { day: 2, title: "Golden Circle", description: "See Gullfoss, Geysir, and Thingvellir National Park." },
            { day: 3, title: "South Coast", description: "Visit Seljalandsfoss and the black sands of Reynisfjara." },
            { day: 4, title: "Glacier Hike", description: "Walk on a glacier with expert guides." },
            { day: 5, title: "Reykjavik & Departure", description: "Explore the city before heading home." }
        ],
        faqs: [
            { question: "Is seeing the Northern Lights guaranteed?", answer: "They are a natural phenomenon, so sightings cannot be guaranteed, but we maximize your chances." },
            { question: "How cold will it be?", answer: "Expect temperatures around freezing or below in winter." }
        ]
    },
    // Short Stay Hotel Packages (2-4 nights)
    {
        slug: "port-of-spain-city-pulse",
        title: "Port of Spain City Pulse",
        location: "Port of Spain, Trinidad and Tobago",
        price: 650,
        durationDays: 3,
        type: "Hotel",
        rating: 4.6,
        images: ["/images/packages/port-of-spain-city-pulse-01.webp", "/images/packages/port-of-spain-city-pulse-02.webp", "/images/packages/port-of-spain-city-pulse-03.webp", "/images/packages/port-of-spain-city-pulse-04.webp"],
        highlights: ["Maracas Beach", "Queen's Park Savannah", "Royal Botanic Gardens", "Avenue Nightlife"],
        includes: ["3-Night Hotel Stay", "Airport Transfers", "City Tour", "Daily Breakfast"],
        itinerary: [
            { day: 1, title: "Arrival & Nightlife", description: "Check in and explore Ariapita Avenue." },
            { day: 2, title: "City & Beach", description: "Tour the Botanic Gardens and relax at Maracas Beach." },
            { day: 3, title: "Departure", description: "Last-minute souvenir shopping and airport transfer." }
        ],
        faqs: [
            { question: "Is hotel transport included?", answer: "Yes, airport transfers are included." },
            { question: "Is this suitable for families?", answer: "Yes, the hotel is family-friendly." }
        ]
    },
    {
        slug: "panama-city-canal-stopover",
        title: "Panama City Canal Stopover",
        location: "Panama City, Panama",
        price: 550,
        durationDays: 3,
        type: "Hotel",
        rating: 4.7,
        images: ["/images/packages/panama-city-canal-stopover-01.webp", "/images/packages/panama-city-canal-stopover-02.webp", "/images/packages/panama-city-canal-stopover-03.webp", "/images/packages/panama-city-canal-stopover-04.webp"],
        highlights: ["Panama Canal", "Casco Viejo", "Amador Causeway", "Biomuseo"],
        includes: ["3-Night Hotel Stay", "Canal Visitor Center Ticket", "Old Town Walking Tour", "Breakfast"],
        itinerary: [
            { day: 1, title: "Arrival in Panama", description: "Transfer to your hotel in the city center." },
            { day: 2, title: "Canal & Old Town", description: "Visit Miraflores Locks and walk through Casco Viejo." },
            { day: 3, title: "Departure", description: "Enjoy a morning coffee before your flight." }
        ],
        faqs: [
            { question: "Can I extend my stay?", answer: "Yes, additional nights can be added upon request." },
            { question: "Is the canal tour guided?", answer: "Yes, an English-speaking guide is provided." }
        ]
    },
    {
        slug: "caracas-weekend-retreat",
        title: "Caracas Weekend Retreat",
        location: "Caracas, Venezuela",
        price: 490,
        durationDays: 3,
        type: "Hotel",
        rating: 4.5,
        images: ["/images/packages/caracas-weekend-retreat-01.webp", "/images/packages/caracas-weekend-retreat-02.webp", "/images/packages/caracas-weekend-retreat-03.webp", "/images/packages/caracas-weekend-retreat-04.webp"],
        highlights: ["Avila National Park", "Cable Car Ride", "Historic Center", "Local Gastronomy"],
        includes: ["3-Night Luxury Hotel", "Private Driver", "Teleférico Ticket", "Breakfast"],
        itinerary: [
            { day: 1, title: "Welcome to Caracas", description: "Private transfer to your secured hotel." },
            { day: 2, title: "Avila Mountain", description: "Ride the cable car for panoramic views of the city." },
            { day: 3, title: "Departure", description: "Transfer to Maiquetía airport." }
        ],
        faqs: [
            { question: "Is it safe?", answer: "We use secure private transport and vetted areas." },
            { question: "What currency should I bring?", answer: "USD cash in small denominations is best." }
        ]
    },
    {
        slug: "basseterre-boutique-stay",
        title: "Basseterre Boutique Stay",
        location: "Basseterre, St Kitts and Nevis",
        price: 890,
        durationDays: 4,
        type: "Hotel",
        rating: 4.8,
        images: ["/images/packages/basseterre-boutique-stay-02.webp"],
        highlights: ["The Circus/Berkeley Memorial", "Brimstone Hill Fortress", "Scenic Railway", "South Friars Bay"],
        includes: ["4-Night Boutique Hotel", "Island Tour", "Welcome Drink", "Daily Breakfast"],
        itinerary: [
            { day: 1, title: "Arrival", description: "Welcome to St Kitts. Settle into your boutique hotel." },
            { day: 2, title: "Heritage Tour", description: "Explore Brimstone Hill and the capital." },
            { day: 3, title: "Beach Day", description: "Relax on the golden sands of South Friars Bay." },
            { day: 4, title: "Departure", description: "Transfer to the Robert L. Bradshaw International Airport." }
        ],
        faqs: [
            { question: "Is the railway tour included?", answer: "It can be added as an optional excursion." },
            { question: "Are beaches public?", answer: "Yes, all beaches on the island are public." }
        ]
    },
    // Long Stay Hotel Packages (7-14 nights)
    {
        slug: "tobago-beachfront-bliss",
        title: "Tobago Beachfront Bliss",
        location: "Tobago, Trinidad and Tobago",
        price: 1850,
        durationDays: 10,
        type: "Resort",
        rating: 4.9,
        images: ["/images/packages/tobago-beachfront-bliss-01.webp", "/images/packages/tobago-beachfront-bliss-03.webp"],
        highlights: ["Pigeon Point Heritage Park", "Nylon Pool", "Argyle Waterfall", "Glass Bottom Boat"],
        includes: ["10-Night Beachfront Resort", "All-Inclusive Meal Plan", "Airport Transfers", "Snorkeling Gear"],
        itinerary: [
            { day: 1, title: "Arrival in Paradise", description: "Transfer to your beachfront resort." },
            { day: 2, title: "Beach Day", description: "Unwind on the white sands of Pigeon Point." },
            { day: 3, title: "Buccoo Reef", description: "Glass bottom boat tour to the Nylon Pool." },
            { day: 4, title: "Leisure", description: "Resort amenities and spa." },
            { day: 5, title: "Rainforest Tour", description: "Visit the Main Ridge Forest Reserve." },
            { day: 6, title: "Waterfall Hike", description: "Short hike to Argyle Waterfall." },
            { day: 7, title: "Leisure", description: "Relax by the pool." },
            { day: 8, title: "Island Drive", description: "Scenic drive around the island coast." },
            { day: 9, title: "Sunset Cruise", description: "Romantic sunset catamaran cruise." },
            { day: 10, title: "Departure", description: "Farewell to Tobago." }
        ],
        faqs: [
            { question: "Is alcohol included?", answer: "Yes, local spirits and beers are included in the package." },
            { question: "Are watersports included?", answer: "Non-motorized watersports are included." }
        ]
    },
    {
        slug: "nevis-luxury-plantation",
        title: "Nevis Luxury Plantation",
        location: "Charlestown, St Kitts and Nevis",
        price: 2400,
        durationDays: 7,
        type: "Resort",
        rating: 4.9,
        images: ["/images/packages/nevis-luxury-plantation-01.webp"],
        highlights: ["Nevis Peak", "Pinney's Beach", "Botanical Gardens", "Hamilton House"],
        includes: ["7-Night Plantation Inn", "Daily Breakfast & Dinner", "Inter-island Ferry", "Spa Credit"],
        itinerary: [
            { day: 1, title: "Arrival", description: "Arrive in St Kitts and take the scenic water taxi to Nevis." },
            { day: 2, title: "Plantation History", description: "Tour the historic estate grounds." },
            { day: 3, title: "Pinney's Beach", description: "Famous beach with 'Killer Bee' cocktails." },
            { day: 4, title: "Nevis Peak", description: "Optional hike or view from the gardens." },
            { day: 5, title: "Charlestown", description: "Visit the birthplace of Alexander Hamilton." },
            { day: 6, title: "Relaxation", description: "Full day to enjoy the spa and pool." },
            { day: 7, title: "Departure", description: "Ferry back to St Kitts for departure." }
        ],
        faqs: [
            { question: "Is the ferry private?", answer: "It is a private water taxi arranged for guests." },
            { question: "Is dinner dress code formal?", answer: "Smart casual is required for dinner." }
        ]
    },
    {
        slug: "rio-copacabana-residency",
        title: "Rio Copacabana Residency",
        location: "Rio de Janeiro, Brazil",
        price: 2100,
        durationDays: 10,
        type: "Hotel",
        rating: 4.8,
        images: ["/images/packages/rio-copacabana-residency-01.webp", "/images/packages/rio-copacabana-residency-02.webp"],
        highlights: ["Christ the Redeemer", "Sugarloaf Mountain", "Copacabana Beach", "Selaron Steps"],
        includes: ["10-Night Hotel on Copacabana", "City Tour", "Samba Show", "Breakfast"],
        itinerary: [
            { day: 1, title: "Bem-vindo ao Rio", description: "Arrival and check-in to your ocean-view room." },
            { day: 2, title: "Corcovado", description: "Visit Christ the Redeemer." },
            { day: 3, title: "Sugarloaf", description: "Sunset cable car ride." },
            { day: 4, title: "Beach Day", description: "Soak up the sun on Copacabana." },
            { day: 5, title: "Historic Centre", description: "Visit Lapa and the Selaron Steps." },
            { day: 6, title: "Free Day", description: "Optional shopping or Tijuca Forest tour." },
            { day: 7, title: "Ipanema", description: "Walk to the neighboring Ipanema beach." },
            { day: 8, title: "Samba Night", description: "Dinner and a live Samba show." },
            { day: 9, title: "Leisure", description: "Last day to enjoy the Carioca vibe." },
            { day: 10, title: "Departure", description: "Transfer to GIG airport." }
        ],
        faqs: [
            { question: "Is the area safe?", answer: "Copacabana is generally safe for tourists, but standard caution applies." },
            { question: "Do you offer carnival packages?", answer: "This specific package is for non-carnival dates." }
        ]
    },
    {
        slug: "guanacaste-resort-getaway",
        title: "Guanacaste Resort Getaway",
        location: "Guanacaste, Costa Rica",
        price: 1950,
        durationDays: 7,
        type: "Resort",
        rating: 4.8,
        images: ["/images/packages/guanacaste-resort-getaway-01.webp"],
        highlights: ["Tamarindo Beach", "Rincon de la Vieja", "Surfing", "Sunset Sailing"],
        includes: ["7-Night All-Inclusive Resort", "Airport Transfers (LIR)", "Sunset Cruise", "Nature Walk"],
        itinerary: [
            { day: 1, title: "Pura Vida", description: "Arrival at Liberia Airport and transfer to resort." },
            { day: 2, title: "Beach & Pool", description: "Relax and enjoy the all-inclusive amenities." },
            { day: 3, title: "Volcano Day", description: "Excursion to Rincon de la Vieja Volcano." },
            { day: 4, title: "Surf or Turf", description: "Optional surfing lesson or horseback riding." },
            { day: 5, title: "Sunset Sail", description: "Open bar catamaran cruise." },
            { day: 6, title: "Recharge", description: "Spa day or beach lounging." },
            { day: 7, title: "Departure", description: "Transfer to airport." }
        ],
        faqs: [
            { question: "Which airport should I fly into?", answer: "LIR (Liberia) is closest." },
            { question: "Are tips included?", answer: "Gratuities are included in the package price." }
        ]
    },
    // Experience Packages
    {
        slug: "trinidad-carnival-culture",
        title: "Trinidad Carnival & Culture",
        location: "Port of Spain, Trinidad and Tobago",
        price: 1500,
        durationDays: 5,
        type: "Experience",
        rating: 4.9,
        images: ["/images/packages/trinidad-carnival-culture-01.webp", "/images/packages/trinidad-carnival-culture-02.webp"],
        highlights: ["Steel Pan Yard Access", "Costume Mas Camp", "Street Food Tour", "Calypso Tent"],
        includes: ["5-Night Hotel", "Cultural Guide", "Transport to Events", "Food Tasting"],
        itinerary: [
            { day: 1, title: "Touchdown", description: "Arrival and welcome 'lime' (social gathering)." },
            { day: 2, title: "Pan Yards", description: "Visit famous Steel Orchestras practicing." },
            { day: 3, title: "Mas Camp", description: "See how Carnival costumes are made." },
            { day: 4, title: "Taste of Trini", description: "Doubles, Roti, and Shark & Bake tour." },
            { day: 5, title: "Departure", description: "Leave with the rhythm in your soul." }
        ],
        faqs: [
            { question: "Is this only during Carnival?", answer: "This tour runs year-round focusing on the culture, but February is peak." },
            { question: "Is a costume included?", answer: "No, costume purchase is separate." }
        ]
    },
    {
        slug: "angel-falls-expedition",
        title: "Angel Falls Expedition",
        location: "Canaima National Park, Venezuela",
        price: 1200,
        durationDays: 5,
        type: "Adventure",
        rating: 4.9,
        images: ["/images/packages/angel-falls-expedition-01.webp"],
        highlights: ["Angel Falls Flight", "Canaima Lagoon", "Sapo Falls", "Indigenous Village"],
        includes: ["Flight from Caracas", "Camp Accommodation", "All Meals", "Indigenous Guide", "Canoe Trip"],
        itinerary: [
            { day: 1, title: "Flight to Canaima", description: "Fly over the Tepuis and land in the national park." },
            { day: 2, title: "Lagoon Tour", description: "Boat ride on Canaima Lagoon and walk behind Sapo Falls." },
            { day: 3, title: "River Journey", description: "Motorized canoe upriver to the base of Angel Falls." },
            { day: 4, title: "The Highest Falls", description: "Hike to the viewpoint of the world's highest waterfall." },
            { day: 5, title: "Return", description: "Flight back to Caracas." }
        ],
        faqs: [
            { question: "How difficult is the hike?", answer: "Moderate, requires good mobility." },
            { question: "Is malaria medication needed?", answer: "Consult your doctor, but it is generally recommended." }
        ]
    },
    {
        slug: "san-blas-islands-sailing",
        title: "San Blas Islands Sailing",
        location: "San Blas Islands, Panama",
        price: 1400,
        durationDays: 5,
        type: "Cruise",
        rating: 4.8,
        images: ["/images/packages/san-blas-islands-sailing-01.webp", "/images/packages/san-blas-islands-sailing-02.webp"],
        highlights: ["Island Hopping", "Guna Yala Culture", "Snorkeling Reefs", "Star Gazing"],
        includes: ["Catamaran Cabin", "All Meals & Drinks", "Snorkel Gear", "Fees"],
        itinerary: [
            { day: 1, title: "Set Sail", description: "Transfer from Panama City (4x4 + boat) to catamaran." },
            { day: 2, title: "Coco Bandero Cays", description: "Sail to pristine uninhabited islands." },
            { day: 3, title: "Guna Culture", description: "Visit a community island to learn about local traditions." },
            { day: 4, title: "Reef Snorkel", description: "Explore vibrant coral reefs." },
            { day: 5, title: "Back to Mainland", description: "Morning sail and transfer back to the city." }
        ],
        faqs: [
            { question: "Is there WiFi?", answer: "No, this is a digital detox experience." },
            { question: "Do I get seasick?", answer: "We stay inside the reef where waters are calm." }
        ]
    },
    {
        slug: "machu-picchu-sacred-valley",
        title: "Machu Picchu & Sacred Valley",
        location: "Cusco, Peru",
        price: 1600,
        durationDays: 6,
        type: "History",
        rating: 4.9,
        images: ["/images/packages/machu-picchu-sacred-valley-01.webp", "/images/packages/machu-picchu-sacred-valley-02.webp", "/images/packages/machu-picchu-sacred-valley-03.webp"],
        highlights: ["Machu Picchu", "Cusco City", "Ollantaytambo", "Pisac Market"],
        includes: ["Hotels", "Train Tickets", "Entry Permits", "Guided Tours", "Breakfast"],
        itinerary: [
            { day: 1, title: "Cusco Arrival", description: "Acclimatize to altitude and relax." },
            { day: 2, title: "City Tour", description: "Visit Sacsayhuaman and Qorikancha." },
            { day: 3, title: "Sacred Valley", description: "Pisac Market and Ollantaytambo ruins." },
            { day: 4, title: "Machu Picchu", description: "Scenic train and tour of the Lost City." },
            { day: 5, title: "Maras & Moray", description: "Salt mines and agricultural terraces." },
            { day: 6, title: "Departure", description: "Transfer to CUZ airport." }
        ],
        faqs: [
            { question: "How high is the altitude?", answer: "Cusco is at 3,400m (11,000ft)." },
            { question: "Is the train luxury?", answer: "We use the Vistadome panoramic train." }
        ]
    }
];
