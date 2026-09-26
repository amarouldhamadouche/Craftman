export type CategoryItem = {
  id: string
  name: string
  icon: string
}

export type Review = {
  id: string
  author: string
  rating: number
  comment: string
}

export type Craftsman = {
  id: string
  name: string
  profession: string
  avatar: string
  coverImage: string
  location: string
  rating: number
  completedJobs: number
  startingPrice: number
  description: string
  categories: string[]
  services: string[]
  about: string
  portfolio: string[]
  reviews: Review[]
}

export type Post = {
  id: string
  user: {
    name: string
    avatar: string
    location: string
  }
  category: string
  createdAt: string
  content: string
  location: string
  budget?: string
  image?: string
  responses: number
  likes: number
  liked: boolean
}

export const categories: CategoryItem[] = [
  { id: "all", name: "All", icon: "grid" },
  { id: "plumbing", name: "Plumbing", icon: "sparkles" },
  { id: "electricity", name: "Electricity", icon: "bolt" },
  { id: "carpentry", name: "Carpentry", icon: "hammer" },
  { id: "painting", name: "Painting", icon: "paint" },
  { id: "mechanics", name: "Mechanics", icon: "wrench" },
  { id: "construction", name: "Construction", icon: "briefcase" },
  { id: "welding", name: "Welding", icon: "sparkles" },
  { id: "cleaning", name: "Cleaning", icon: "sparkles" },
]

export const craftsmen: Craftsman[] = [
  {
    id: "mohamed-benali",
    name: "Mohamed Benali",
    profession: "Electrician",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
    location: "Oran",
    rating: 4.9,
    completedJobs: 124,
    startingPrice: 3500,
    description: "Residential and industrial electrical installations.",
    categories: ["Electricity", "Construction"],
    services: ["Electrical wiring", "Panel upgrades", "Lighting design", "Emergency repair"],
    about:
      "Mohamed has been helping homes and shops in Oran with safe, modern electrical systems for more than a decade.",
    portfolio: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80",
    ],
    reviews: [
      { id: "r1", author: "Yasmine B.", rating: 5, comment: "Fast, transparent, and very professional." },
      { id: "r2", author: "Sami D.", rating: 5, comment: "He solved our electrical issue the same day." },
    ],
  },
  {
    id: "ahmed-woodworks",
    name: "Ahmed Woodworks",
    profession: "Carpenter",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    location: "Tiaret",
    rating: 4.8,
    completedJobs: 98,
    startingPrice: 2500,
    description: "Custom furniture and wood finishing for homes and businesses.",
    categories: ["Carpentry", "Construction"],
    services: ["Kitchen cabinetry", "Custom tables", "Wardrobes", "Wood repair"],
    about:
      "Ahmed crafts durable wood pieces with precise finishes and modern Algerian design sensibilities.",
    portfolio: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517705008122-361805f42e86?auto=format&fit=crop&w=900&q=80",
    ],
    reviews: [
      { id: "r3", author: "Nadia H.", rating: 4, comment: "Excellent craftsmanship and solid finishing." },
      { id: "r4", author: "Khaled M.", rating: 5, comment: "Beautiful custom dining table." },
    ],
  },
  {
    id: "samira-mazari",
    name: "Samira Mazari",
    profession: "Painter",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
    location: "Algiers",
    rating: 4.9,
    completedJobs: 156,
    startingPrice: 1800,
    description: "Interior and exterior painting with quality finishes.",
    categories: ["Painting", "Cleaning"],
    services: ["Wall painting", "Facade refresh", "Decorative finishes", "Color consultation"],
    about:
      "Samira transforms spaces with lasting colors, surface preparation, and neat finishing work.",
    portfolio: [
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80",
    ],
    reviews: [
      { id: "r5", author: "Imane A.", rating: 5, comment: "Clean job and very nice color advice." },
      { id: "r6", author: "Hakim R.", rating: 4, comment: "Great result within the promised timeline." },
    ],
  },
  {
    id: "yacine-bensalem",
    name: "Yacine Bensalem",
    profession: "Plumber",
    avatar:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=400&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=80",
    location: "Constantine",
    rating: 4.7,
    completedJobs: 143,
    startingPrice: 2200,
    description: "Bathroom, kitchen, and piping installations.",
    categories: ["Plumbing", "Construction"],
    services: ["Pipe repair", "Bathroom installation", "Water heater setup", "Leak detection"],
    about:
      "Yacine handles domestic plumbing and renovations with practical solutions built for long-term durability.",
    portfolio: [
      "https://images.unsplash.com/photo-1581580261971-5b7b6992a4d7?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=80",
    ],
    reviews: [
      { id: "r7", author: "Nour E.", rating: 5, comment: "Very reliable for urgent plumbing work." },
      { id: "r8", author: "Walid T.", rating: 4, comment: "Clean installation and fair pricing." },
    ],
  },
  {
    id: "malek-jabri",
    name: "Malek Jabri",
    profession: "Mechanic",
    avatar:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=400&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1200&q=80",
    location: "Annaba",
    rating: 4.8,
    completedJobs: 89,
    startingPrice: 3000,
    description: "Vehicle repair and maintenance for daily drivers and fleets.",
    categories: ["Mechanics"],
    services: ["Engine diagnostics", "Brake service", "Oil changes", "Fleet maintenance"],
    about:
      "Malek is trusted by local drivers for honest maintenance work and practical repair advice.",
    portfolio: [
      "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80",
    ],
    reviews: [
      { id: "r9", author: "Meriem S.", rating: 5, comment: "Excellent diagnosis and very honest pricing." },
      { id: "r10", author: "Salim Y.", rating: 4, comment: "He fixed my car quickly and efficiently." },
    ],
  },
  {
    id: "amina-ziani",
    name: "Amina Ziani",
    profession: "Builder",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
    location: "Setif",
    rating: 4.9,
    completedJobs: 201,
    startingPrice: 4200,
    description: "Construction and renovation works for homes and commercial spaces.",
    categories: ["Construction", "Carpentry"],
    services: ["Renovations", "Structural work", "Masonry", "Project supervision"],
    about:
      "Amina manages renovation projects from planning to execution with careful attention to quality and safety.",
    portfolio: [
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80",
    ],
    reviews: [
      { id: "r11", author: "Rania J.", rating: 5, comment: "Very organized and the workmanship is excellent." },
      { id: "r12", author: "Brahim K.", rating: 5, comment: "Our project finished on time and looked amazing." },
    ],
  },
]

export const posts: Post[] = [
  {
    id: "p1",
    user: {
      name: "Amine Benali",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      location: "Tiaret",
    },
    category: "Electricity",
    createdAt: "2h ago",
    content: "I need an electrician to install 4 ceiling lights in my apartment.",
    location: "Tiaret",
    budget: "5000 - 8000 DA",
    responses: 3,
    likes: 8,
    liked: false,
  },
  {
    id: "p2",
    user: {
      name: "Nadia Belkacem",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
      location: "Oran",
    },
    category: "Plumbing",
    createdAt: "1h ago",
    content: "Looking for someone who can repair a leaking bathroom pipe before it damages the wall.",
    location: "Oran",
    budget: "3000 - 6000 DA",
    responses: 5,
    likes: 12,
    liked: false,
  },
  {
    id: "p3",
    user: {
      name: "Sofiane Khelifi",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
      location: "Algiers",
    },
    category: "Carpentry",
    createdAt: "3h ago",
    content: "I need a carpenter to build a custom TV wall with shelves for my living room.",
    location: "Algiers",
    budget: "25000 - 40000 DA",
    responses: 2,
    likes: 6,
    liked: false,
  },
  {
    id: "p4",
    user: {
      name: "Meriem A.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
      location: "Tlemcen",
    },
    category: "Painting",
    createdAt: "4h ago",
    content: "Looking for a painter to repaint a 3-bedroom apartment, including ceilings and doors.",
    location: "Tlemcen",
    budget: "Contact for estimate",
    responses: 4,
    likes: 9,
    liked: false,
  },
  {
    id: "p5",
    user: {
      name: "Rachid Boudiaf",
      avatar: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=400&q=80",
      location: "Sidi Bel Abbès",
    },
    category: "Construction",
    createdAt: "6h ago",
    content: "Need help repairing a cracked exterior wall and repainting the front of our house.",
    location: "Sidi Bel Abbès",
    responses: 1,
    likes: 3,
    liked: false,
  },
  {
    id: "p6",
    user: {
      name: "Lina M.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      location: "Mostaganem",
    },
    category: "Air Conditioning",
    createdAt: "8h ago",
    content: "My split AC needs a check-up and cleaning before the next hot week. Please share availability.",
    location: "Mostaganem",
    budget: "4000 - 7000 DA",
    responses: 6,
    likes: 11,
    liked: false,
  },
  {
    id: "p7",
    user: {
      name: "Walid Cherif",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      location: "Chlef",
    },
    category: "Mechanics",
    createdAt: "10h ago",
    content: "Looking for a mechanic to diagnose a starting problem on my Renault Clio.",
    location: "Chlef",
    responses: 3,
    likes: 5,
    liked: false,
  },
  {
    id: "p8",
    user: {
      name: "Yasmine T.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
      location: "Mascara",
    },
    category: "Tiling",
    createdAt: "12h ago",
    content: "I need a tiler to replace the floor tiles in a small kitchen, about 12 square metres.",
    location: "Mascara",
    budget: "15000 - 25000 DA",
    responses: 2,
    likes: 7,
    liked: false,
  },
  {
    id: "p9",
    user: {
      name: "Farid Messaoudi",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
      location: "Oran",
    },
    category: "Welding",
    createdAt: "1d ago",
    content: "Need a welder to make and install a simple metal gate for our courtyard.",
    location: "Oran",
    budget: "Estimate requested",
    responses: 4,
    likes: 10,
    liked: false,
  },
  {
    id: "p10",
    user: {
      name: "Samia D.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
      location: "Tiaret",
    },
    category: "Cleaning",
    createdAt: "1d ago",
    content: "Searching for a reliable cleaner for a full apartment clean after renovation.",
    location: "Tiaret",
    responses: 7,
    likes: 14,
    liked: false,
  },
]

export const accountSections = [
  {
    title: "My Activity",
    items: ["My posts", "Saved craftsmen", "My requests"],
  },
  {
    title: "Account",
    items: ["Personal information", "Notifications", "Language", "Settings"],
  },
  {
    title: "Other",
    items: ["Help & Support", "About", "Logout"],
  },
]
