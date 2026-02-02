# Deep Genome Atlas UI

A multi-page web application for the Deep Genome Atlas platform, powered by AI.MeD.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) primitives
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query)
- **3D Visualization**: [Molstar](https://molstar.org/) (for protein structures)
- **API Mocking**: [MSW](https://mswjs.io/) (Mock Service Worker)
- **Unit Testing**: [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/)
- **E2E Testing**: [Playwright](https://playwright.dev/)

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm 9.x or later

### Installation

\`\`\`bash
npm install
\`\`\`

### Development

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Testing

### Unit Tests

\`\`\`bash
# Run tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
\`\`\`

### End-to-End Tests

\`\`\`bash
# Install Playwright browsers (first time)
npx playwright install

# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui
\`\`\`

## Project Structure

\`\`\`
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/          # Dashboard page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home/Login page
│   └── providers.tsx       # App providers (React Query, etc.)
├── components/
│   ├── auth/               # Authentication components
│   ├── layout/             # Layout components
│   └── ui/                 # Reusable UI components
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities and constants
├── mocks/                  # MSW mock handlers
│   └── handlers/           # API mock handlers
├── services/               # API services
├── stores/                 # Zustand stores
└── types/                  # TypeScript type definitions

public/
└── resources/              # Configurable images and logos
    ├── aimed-logo.svg
    ├── background.svg
    ├── dark-genome-atlas-logo.svg
    └── dark-genome-atlas-powered-by-aimed.svg

tests/
├── e2e/                    # Playwright E2E tests
└── unit/                   # Vitest unit tests
\`\`\`

## Customizing Branding

The application branding can be customized by replacing the SVG files in \`public/resources/\`:

- \`background.svg\` - Login page background with DNA helix pattern
- \`aimed-logo.svg\` - AI.MeD logo displayed in the login card
- \`dark-genome-atlas-logo.svg\` - Deep Genome Atlas title logo
- \`dark-genome-atlas-powered-by-aimed.svg\` - Footer branding

## Available Scripts

| Command | Description |
|---------|-------------|
| \`npm run dev\` | Start development server |
| \`npm run build\` | Build for production |
| \`npm start\` | Start production server |
| \`npm run lint\` | Run ESLint |
| \`npm test\` | Run unit tests |
| \`npm run test:ui\` | Run unit tests with UI |
| \`npm run test:coverage\` | Run tests with coverage report |
| \`npm run test:e2e\` | Run Playwright E2E tests |
| \`npm run test:e2e:ui\` | Run E2E tests with UI |

## Authentication

The application supports multiple authentication methods:

1. **Google OAuth** - "Continue with Google" button
2. **Enterprise/Institutional SSO** - For university and organization accounts
3. **Email/Password** - Traditional email login (optional)

Authentication state is managed with Zustand and persisted to localStorage.

## License

Proprietary - AI.MeD
