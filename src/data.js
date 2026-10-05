export const profile = {
  name: "Brendan Akudo",
  location: "Kisumu, Kenya",
  timezone: "EAT, UTC+3",
  links: { email: "", github: "", devto: "" }
};

export const groups = [
  { label: "Languages and frameworks", tags: ["Go", "Gin", "Java", "Spring Boot"] },
  { label: "Data", tags: ["PostgreSQL", "PostGIS"] },
  { label: "Payments", tags: ["Lightning", "LND", "L402", "M-Pesa"] },
  { label: "Mobile and realtime", tags: ["React Native", "WebSockets", "Docker"] }
];

export const projects = [
  {
    id: "gateway",
    title: "Lightning Payment Gateway",
    line: "Multi-tenant API for accepting Lightning payments",
    status: "Building",
    tone: "active",
    summary: "A multi-tenant gateway that lets Kenyan businesses take Lightning payments through a single API, and monetize their own endpoints.",
    points: [
      "L402 middleware issues Lightning Service Authentication Tokens, which protects endpoints from abuse and lets an API charge per request.",
      "Talks to LND over gRPC, using AddInvoice to create invoices and LookupInvoice to confirm payment.",
      "PostgreSQL stores used preimages so a paid token can't be replayed."
    ],
    tags: ["Go", "Gin", "PostgreSQL", "Lightning", "LND", "L402"]
  },
  {
    id: "chama",
    title: "Chama Treasury",
    line: "Treasury app for savings groups",
    status: "Building",
    tone: "active",
    summary: "A treasury app for chamas, the savings groups many Kenyans use to pool and lend money, built on the same Lightning stack as the gateway.",
    points: [
      "Go and Gin backend with PostgreSQL for group and contribution records.",
      "React Native mobile client for members.",
      "Uses LND for Lightning settlement."
    ],
    tags: ["Go", "Gin", "PostgreSQL", "React Native", "Lightning", "LND"]
  },
  {
    id: "transit",
    title: "Matatu and boda boda micropayments",
    line: "Lightning and M-Pesa fares for public transit",
    status: "Architecture designed",
    tone: "",
    summary: "A hybrid payment system where conductors collect fares from passengers over Lightning or M-Pesa.",
    points: [
      "Phase 1 covers the PostgreSQL schema and the Gin API surface.",
      "React Native conductor app for collecting fares on the road.",
      "Reuses the Go, Gin and LND foundation from the gateway."
    ],
    tags: ["Go", "Gin", "PostgreSQL", "React Native", "Lightning", "LND", "M-Pesa"]
  },
  {
    id: "flexiride",
    title: "FlexiRide",
    line: "County-to-county ride-sharing",
    status: "Building",
    tone: "active",
    summary: "Long-distance ride-sharing for travel between Kenyan counties, built by a small team.",
    points: [
      "Backend moved from Go and Gin to Spring Boot to match the team's skills.",
      "Maven multi-module monorepo with 12 services, from booking and matching to payments and notifications, behind separate web and mobile gateways.",
      "PostGIS for geospatial data, WebSockets for live tracking and M-Pesa for payments.",
      "Currently building GraalVM native images for every service."
    ],
    tags: ["Java", "Spring Boot", "PostGIS", "PostgreSQL", "M-Pesa", "React Native", "WebSockets", "Docker"]
  },
  {
    id: "weather",
    title: "Farmer weather app",
    line: "Official alerts plus reports from the field",
    status: "Early",
    tone: "",
    summary: "A weather app for smallholder farmers that combines official alerts with crowdsourced ground-truth reports from nearby farms.",
    points: [
      "Official forecasts say what's expected, farmer reports say what actually happened.",
      "Backend in Java and Spring Boot."
    ],
    tags: ["Java", "Spring Boot"]
  },
  {
    id: "greencompass",
    title: "GreenCompass",
    line: "Write-up coming soon",
    status: "",
    tone: "",
    summary: "Write-up coming soon.",
    points: [],
    tags: []
  }
];

export const articles = [
  { title: "Ruby on Rails is underrated", note: "Argued from fintech and backend work in Kenya", href: "" },
  { title: "A developer's guide to LND and the Lightning Network", note: "Building applications on a Lightning node", href: "" },
  { title: "Goroutines and channels for beginners", note: "Go concurrency, explained from scratch", href: "" },
  { title: "Next.js Server Components, in depth", note: "How server and client components fit together", href: "" },
  { title: "A survey of RPC in Python", note: "Comparing the options for remote procedure calls", href: "" },
  { title: "The cat command", note: "A close look at a Unix staple", href: "" }
];

export const facts = [
  ["Software engineering apprenticeship", "Zone01 Kisumu"],
  ["Diploma in IT", "KCA University"],
  ["Networking Basics certificate", "Cisco"]
];
