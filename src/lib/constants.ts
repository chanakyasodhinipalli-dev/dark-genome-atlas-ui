// Application constants
export const APP_NAME = "Deep Genome Atlas";
export const COMPANY_NAME = "AI.MeD";

// Resource paths - update these if you move the images
export const RESOURCES = {
  background: "/resources/new-common-background.png",
  aimedLogo: "/resources/aimed-logo.svg",
  darkGenomeAtlasLogo: "/resources/dark-genome-atlas-logo.png",
  darkGenomeAtlasLogoOnly: "/resources/dark-genome-atlas-logo-only.png",
  poweredByLogo: "/resources/dark-genome-atlas-powered-by-aimed.svg",
  dashboardBackground: "/resources/new-common-background.png",
} as const;

// API endpoints (to be configured)
export const API_ENDPOINTS = {
  auth: {
    login: "/api/auth/login",
    logout: "/api/auth/logout",
    google: "/api/auth/google",
    enterprise: "/api/auth/enterprise",
  },
  analytics: {
    dashboard: "http://localhost:8000/analytics/dashboard",
  },
  chat: {
    run: "http://localhost:8000/api/chat/run",
  },
  localStructure: {
    baseUrl: "http://localhost:8000",
    pdbPath: "/structures/pdb",
    imagePath: "/structures/images",
  },
} as const;

// Session limits for pay-per-view model
export const SESSION_LIMITS = {
  freeDownloadsPerSession: 3,
  freeViewsPerSession: 3,
} as const;
