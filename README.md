# NexusForge

**The world's first AI-native Pipeline Bill of Materials (PBOM) + AIBOM Guardian**

Auto-discover, sign, validate, and risk-score every element of your CI/CD pipeline—tools, webhooks, build steps, IaC, dependencies, and AI/LLM components. Real-time attack-path graphs, drift detection, and developer-friendly feedback straight into GitHub/GitLab PRs.

## Vision

- **Premium UX**: Dark cyber-minimalist design (Tailwind + shadcn/ui + Magic UI), buttery-smooth React Flow graphs, glassmorphism accents in electric cyan/deep violet
- **Intelligent Discovery**: Auto-find all pipeline elements, AI components, supply chain risks
- **Signing & Validation**: Sigstore integration, continuous validation with attack-path correlation
- **Developer Experience**: Slack/Teams/Discord alerts, IDE integration, GitHub/GitLab PR feedback, co-pilot chat
- **Enterprise Ready**: Multi-org tenancy, role-based access, SOC 2/ISO/NIS2/CRA compliance reporting
- **Sustainable Model**: Open-source CLI + SaaS with usage-based credits (deep analysis, large scans, threat intel)

## Monorepo Structure

```
nexusforge/
├── apps/
│   ├── web/                 # Next.js 15 App Router frontend
│   └── cli/                 # Open-source Go CLI
├── packages/
│   ├── shared/              # Shared types, utilities, validators
│   └── sbom/                # PBOM/AIBOM generation logic
├── supabase/                # Supabase migrations, functions, RLS
├── docs/                    # Architecture docs, API references
├── docker/                  # Docker configurations
└── config/                  # Shared configs (tsconfig, tailwind, etc)
```

## Quick Start

### Prerequisites
- Node.js 20+
- Go 1.22+
- Docker (for Supabase local dev)
- Stripe CLI (for testing payments)

### Development

```bash
# Install dependencies
npm install

# Start Supabase locally
supabase start

# Copy .env.example to .env.local
cp .env.example .env.local

# Run web dev server
cd apps/web && npm run dev

# Build CLI
cd apps/cli && go build -o nexusforge ./cmd/main.go
```

## Tech Stack

### Frontend
- **Next.js 15** (App Router, Server Components)
- **React 19** + TypeScript
- **Tailwind CSS** + **shadcn/ui** + **Magic UI**
- **Framer Motion** (animations)
- **React Flow** (dependency graphs)
- **TanStack Query** (data fetching)
- **Zustand** (state management)

### Backend
- **Supabase** (PostgreSQL, auth, edge functions, real-time)
- **Stripe** (billing, usage-based credits)
- **Temporal** or **Bull** (async job processing)

### CLI
- **Go 1.22+** (minimal deps, single binary)
- **Cobra** (CLI framework)
- **Sigstore** (code signing)

### DevOps
- **Docker** + **Docker Compose**
- **Vercel** (frontend deployment)
- **Supabase** (backend hosting)

## Features (Roadmap)

### MVP (Phase 1)
- [x] Pipeline PBOM auto-discovery (demo engine in `packages/sbom`)
- [ ] Sigstore integration for artifact signing (CLI stub and placeholder)
- [x] GitHub Actions CI/CD scanning (demo detection in CLI and `/api/scan`)
- [x] Basic risk scoring (shared risk functions and report in PBOM)
- [x] GitHub PR feedback (simulated PR comment endpoint `/api/github-pr-comment`)

### Phase 2 (Implemented)
- [x] Supabase auth + multi-org RBAC (orgs, projects, user credits)
- [x] Stripe usage-based credits (checkout, webhooks, credit deduction on scans)
- [x] GitHub App real PR comment posting (API integration with token)
- [x] Attack graph React Flow visualizer (interactive nodes, edges, hover)


### Phase 3
- [ ] Usage-based credits system (Stripe)
- [ ] AI co-pilot analysis
- [ ] Compliance reporting (SOC 2, ISO, NIS2, CRA)
- [ ] IDE extensions
- [ ] Self-hosted offering

## Contributing

See [CONTRIBUTING.md](./docs/CONTRIBUTING.md)

## License

MIT (open-source components) + Proprietary (SaaS platform)

---

**Built by folks who've lived the DevSecOps nightmare and refuse to ship mediocre.**
