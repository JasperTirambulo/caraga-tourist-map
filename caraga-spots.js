const touristSpots = [
  {
    id: 1,
    name: "Cloud 9 Beach, Siargao",
    category: "Beaches & Islands",
    lat: 9.8123,
    lng: 126.1642,
    image: "images/cloud9.jpg",
    description: "Famous surfing boardwalk offering scenic ocean views and seaside relaxing spots.",
    entrance_fee: "₱50 per head",
    base_fee: 50,
    rating: "⭐ 4.9",
    badge: "Popular",
    requires_ferry: true,
    best_season: "March to October",
    family_friendly: "Safe viewing boardwalks, beachfront cafes, and shallow swim areas."
  },
  {
    id: 2,
    name: "Britania Group of Islands",
    category: "Beaches & Islands",
    lat: 8.6322,
    lng: 126.2361,
    image: "images/britania.jpg",
    description: "24 tropical islets featuring fine white sand and clear turquoise waters.",
    entrance_fee: "₱1,500 - ₱2,000 (Boat rental)",
    base_fee: 1500,
    rating: "⭐ 4.8",
    badge: "Must Visit",
    requires_ferry: false,
    best_season: "November to May",
    family_friendly: "Calm waters ideal for kids during boat stops."
  },
  {
    id: 3,
    name: "Guyam, Daku, & Naked Islands",
    category: "Beaches & Islands",
    lat: 9.7583,
    lng: 126.1611,
    image: "images/guyam.jpg",
    description: "The classic island-hopping trio in General Luna with palm-fringed shores.",
    entrance_fee: "₱100 Environmental Fee + Boat",
    base_fee: 100,
    rating: "⭐ 4.8",
    badge: "Popular",
    requires_ferry: true,
    best_season: "March to October",
    family_friendly: "Daku Island has shaded cottages for family picnic lunches."
  },
  {
    id: 4,
    name: "Baganito White Sand Beach",
    category: "Beaches & Islands",
    lat: 10.1211,
    lng: 125.6083,
    image: "images/baganito.jpg",
    description: "A serene white sand cove in Dinagat Islands with unique rock formations.",
    entrance_fee: "₱30 per head",
    base_fee: 30,
    rating: "⭐ 4.6",
    badge: "Hidden Gem",
    requires_ferry: true,
    best_season: "March to May",
    family_friendly: "Quiet environment away from crowds with shallow shores."
  },
  {
    id: 5,
    name: "Tinuy-an Falls",
    category: "Waterfalls & Rivers",
    lat: 8.1783,
    lng: 126.2289,
    image: "images/tinuyan.jpg",
    description: "A wide 95-meter curtain waterfall known as the Niagara Falls of the Philippines.",
    entrance_fee: "₱50 per head",
    base_fee: 50,
    rating: "⭐ 4.9",
    badge: "Must Visit",
    requires_ferry: false,
    best_season: "November to May",
    family_friendly: "Paved pathways, bamboo raft rides, and spacious cottages."
  },
  {
    id: 6,
    name: "Hinatuan Enchanted River",
    category: "Waterfalls & Rivers",
    lat: 8.3129,
    lng: 126.3547,
    image: "images/enchanted-river.jpg",
    description: "A deep blue river renowned for its crystal clarity and daily fish feeding.",
    entrance_fee: "₱30 per head",
    base_fee: 30,
    rating: "⭐ 4.9",
    badge: "Top Rated",
    requires_ferry: false,
    best_season: "All year round",
    family_friendly: "Life vests provided; safe child swimming zones available."
  },
  {
    id: 7,
    name: "Laswitan Lagoon & Falls",
    category: "Waterfalls & Rivers",
    lat: 8.0167,
    lng: 126.3833,
    image: "images/laswitan.jpg",
    description: "A geological ocean spillway where Pacific waves splash over a 20ft rock wall.",
    entrance_fee: "₱30 per head",
    base_fee: 30,
    rating: "⭐ 4.7",
    badge: "Adventure",
    requires_ferry: false,
    best_season: "October to February",
    family_friendly: "Natural splash basin pools with mandatory life vests."
  },
  {
    id: 8,
    name: "Tagnote Falls",
    category: "Waterfalls & Rivers",
    lat: 9.0833,
    lng: 125.6833,
    image: "images/tagnote.jpg",
    description: "A refreshing multi-tier waterfall tucked in the highlands of RTR.",
    entrance_fee: "₱20 per head",
    base_fee: 20,
    rating: "⭐ 4.5",
    badge: "Family Favorite",
    requires_ferry: false,
    best_season: "November to May",
    family_friendly: "Easy short trek with shallow natural pools for family bathing."
  },
  {
    id: 9,
    name: "Sohoton Cove & Caves",
    category: "Mountains & Nature",
    lat: 9.6190,
    lng: 125.9220,
    image: "images/sohoton.jpg",
    description: "Protected sea sanctuary with stingless jellyfish lakes and limestone caves.",
    entrance_fee: "₱100 + Guide fees",
    base_fee: 100,
    rating: "⭐ 4.9",
    badge: "Top Rated",
    requires_ferry: true,
    best_season: "March to May",
    family_friendly: "Guided boat tours equipped with safety gear suitable for all ages."
  },
  {
    id: 10,
    name: "Agusan Marsh Wildlife Sanctuary",
    category: "Mountains & Nature",
    lat: 8.2415,
    lng: 125.8821,
    image: "images/agusan-marsh.jpg",
    description: "Vast wetland eco-sanctuary showcasing unique bird species and floating villages.",
    entrance_fee: "Free / Environmental Permit",
    base_fee: 0,
    rating: "⭐ 4.6",
    badge: "Eco Tour",
    requires_ferry: false,
    best_season: "November to April",
    family_friendly: "Educational floating community boat tours."
  },
  {
    id: 11,
    name: "Mount Hilong-Hilong",
    category: "Mountains & Nature",
    lat: 9.1167,
    lng: 125.7167,
    image: "images/hilong-hilong.jpg",
    description: "Highest peak in Caraga Region, rich in biodiversity and waterfalls.",
    entrance_fee: "Guide fees apply",
    base_fee: 300,
    rating: "⭐ 4.7",
    badge: "Hiking",
    requires_ferry: false,
    best_season: "March to May",
    family_friendly: "Base camp trails are great for nature walks and family picnics."
  },
  {
    id: 12,
    name: "Lake Mainit Highlands",
    category: "Mountains & Nature",
    lat: 9.4333,
    lng: 125.5333,
    image: "images/lake-mainit.jpg",
    description: "Fourth largest lake in the Philippines featuring hot springs and scenic views.",
    entrance_fee: "Free access",
    base_fee: 0,
    rating: "⭐ 4.5",
    badge: "Relaxing",
    requires_ferry: false,
    best_season: "All year round",
    family_friendly: "Lakeside resorts offer relaxing hot spring baths."
  },
  {
    id: 13,
    name: "Balanghai Shrine Museum",
    category: "Heritage & Culture",
    lat: 8.9567,
    lng: 125.5186,
    image: "images/balanghai.jpg",
    description: "Archaeological site in Butuan preserving ancient pre-colonial wooden Balangay boats.",
    entrance_fee: "₱20 - ₱50",
    base_fee: 30,
    rating: "⭐ 4.7",
    badge: "Historic",
    requires_ferry: false,
    best_season: "All year round",
    family_friendly: "Accessible educational park grounds and indoor museum displays."
  },
  {
    id: 14,
    name: "National Museum - Butuan",
    category: "Heritage & Culture",
    lat: 8.9472,
    lng: 125.5398,
    image: "images/museum-butuan.jpg",
    description: "Exhibiting pre-colonial artifacts, gold relics, and cultural treasures of Caraga.",
    entrance_fee: "Free",
    base_fee: 0,
    rating: "⭐ 4.8",
    badge: "Free Entrance",
    requires_ferry: false,
    best_season: "All year round",
    family_friendly: "Air-conditioned galleries accessible for strollers."
  },
  {
    id: 15,
    name: "Banza Church Ruins",
    category: "Heritage & Culture",
    lat: 8.9611,
    lng: 125.5583,
    image: "images/banza.jpg",
    description: "The oldest stone church ruin in Mindanao (1625), enveloped by a banyan tree.",
    entrance_fee: "Free",
    base_fee: 0,
    rating: "⭐ 4.6",
    badge: "Historic",
    requires_ferry: false,
    best_season: "All year round",
    family_friendly: "Open-air historical site with shaded grounds."
  },
  {
    id: 16,
    name: "Magellan's Anchorage Marker (Masao)",
    category: "Heritage & Culture",
    lat: 8.9500,
    lng: 125.4333,
    image: "images/masao.jpg",
    description: "Historical coastal site marking where Ferdinand Magellan anchored in 1521.",
    entrance_fee: "Free",
    base_fee: 0,
    rating: "⭐ 4.4",
    badge: "Seaside",
    requires_ferry: false,
    best_season: "All year round",
    family_friendly: "Seaside promenade with local food stalls."
  }
];

const caragaGeoJSON = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Agusan del Norte" },
      geometry: {
        type: "Polygon",
        coordinates: [[[125.3, 8.8], [125.7, 8.8], [125.7, 9.3], [125.3, 9.3], [125.3, 8.8]]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Agusan del Sur" },
      geometry: {
        type: "Polygon",
        coordinates: [[[125.4, 7.8], [126.1, 7.8], [126.1, 8.7], [125.4, 8.7], [125.4, 7.8]]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Surigao del Norte" },
      geometry: {
        type: "Polygon",
        coordinates: [[[125.4, 9.4], [126.2, 9.4], [126.2, 10.1], [125.4, 10.1], [125.4, 9.4]]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Surigao del Sur" },
      geometry: {
        type: "Polygon",
        coordinates: [[[125.9, 8.0], [126.5, 8.0], [126.5, 9.3], [125.9, 9.3], [125.9, 8.0]]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Dinagat Islands" },
      geometry: {
        type: "Polygon",
        coordinates: [[[125.5, 9.8], [125.7, 9.8], [125.7, 10.4], [125.5, 10.4], [125.5, 9.8]]]
      }
    }
  ]
};