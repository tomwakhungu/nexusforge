# NexusForge Architecture

## Overview

NexusForge is a monorepo-based SaaS platform for CI/CD pipeline security and supply chain risk management. It consists of:

- **Frontend** (Next.js 15 + React 19 + TypeScript)
- **CLI** (Go open-source component)
- **Shared Libraries** (Monorepo packages for types, validation, business logic)
- **Backend** (Supabase + edge functions)

## Directory Structure

```
nexusforge/
├── apps/
│   ├── web/                      # Next.js SaaS platform
│   │   ├── src/
│   │   │   ├── app/              # App Router pages & layouts
│   │   │   ├── components/       # Reusable React components
│   │   │   ├── lib/              # Utilities, helpers
│   │   │   └── styles/           # Global styles
│   │   ├── public/               # Static assets
│   │   ├── next.config.ts        # Next.js config
│   │   └── tailwind.config.ts    # Tailwind theming
│   │
│   └── cli/                       # Open-source Go CLI
│       ├── main.go               # Entry point
│       ├── cmd/                  # Command implementations
│       ├── pkg/                  # Reusable packages
│       └── go.mod                # Go module definition
│
├── packages/
│   ├── shared/                   # Shared TypeScript types & utilities
│   │   ├── src/
│   │   │   ├── types.ts          # PBOM, scan result types
│   │   │   ├── validators.ts     # Zod schemas
│   │   │   └── constants.ts      # Shared constants
│   │   └── package.json
│   │
│   └── sbom/                     # PBOM generation logic
│       └── src/
│
├── supabase/
│   ├── migrations/               # SQL migrations
│   ├── functions/                # Edge functions
│   └── config.toml               # Supabase config
│
├── docs/                         # Documentation
│   ├── ARCHITECTURE.md          # This file
│   ├── API.md                   # API reference
│   ├── CLI.md                   # CLI documentation
│   └── DEPLOYMENT.md            # Deployment guides
│
├── docker/                       # Docker configurations
│   ├── Dockerfile.web           # Web app container
│   └── Dockerfile.cli           # CLI container
│
├── .github/workflows/            # GitHub Actions CI/CD
│   └── ci.yml                   # Lint, test, build
│
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore rules
├── docker-compose.yml           # Local development composition
├── package.json                 # Monorepo root metadata
├── turbo.json                   # Turbo caching config
├── tsconfig.json                # Shared TypeScript config
└── README.md                    # Getting started
```

## Core Concepts

### Pipeline Bill of Materials (PBOM)

A PBOM is a complete inventory of all components, dependencies, and integrations in a CI/CD pipeline:

- **Build tools** (Docker, Maven, Gradle, npm, etc.)
- **Version control** (Git hosting, branches, webhooks)
- **CI/CD platforms** (GitHub Actions, GitLab CI, Jenkins, etc.)
- **Container registries** (Docker Hub, ECR, etc.)
- **Dependency managers** (npm, pip, Maven, etc.)
- **IaC tools** (Terraform, CloudFormation, Helm)
- **AI/LLM components** (Models, embeddings, RAG pipelines)
- **Custom plugins & webhooks**

Each component has:
- Metadata (name, version, source)
- Sigstore signature (for verification)
- Risk score (0-100)
- Last validation timestamp
- Associated vulnerabilities

### Attack Path Graphs

Attack paths show how vulnerabilities can chain through the supply chain:

```
┌─────────────┐    ┌──────────────┐    ┌──────────────┐
│ Compromised │───→│ Build Docker │───→│ Push to ECR  │
│   Webhook   │    │   Image      │    │              │
└─────────────┘    └──────────────┘    └──────────────┘
      ↑                                      ↓
      └──────────────────────────────────────┘
           Risk Score: 85 (Critical Path)
```

### Drift Detection

Continuous validation detects unauthorized changes:
- Tool version updates
- New dependencies added
- Removed security controls
- Webhook modifications
- IaC configuration changes

## Technology Stack

### Frontend

- **Next.js 15** App Router for file-based routing
- **React 19** with TypeScript for type safety
- **Tailwind CSS** + **shadcn/ui** for styling
- **Framer Motion** for smooth animations
- **React Flow** for interactive graphs
- **TanStack Query** for server state management
- **Zustand** for client state management
- **Supabase Auth** for authentication

### Backend

- **Supabase** PostgreSQL + auth + real-time
- **Edge Functions** (Deno) for serverless computing
- **Row-Level Security (RLS)** for multi-tenancy
- **Row triggers** for audit logging

### CLI

- **Go 1.22+** for minimal, portable binaries
- **Cobra** CLI framework
- **Sigstore cosign** for artifact signing
- **yaml/toml** parsers for config reading

## Key Design Decisions

### 1. Monorepo Approach

**Why**: Enables code sharing between web app and CLI (types, validators), consistent versioning, single CI/CD pipeline, faster iteration.

**How**: Turbo for task orchestration and caching, npm workspaces for dependency management.

### 2. Supabase as Backend

**Why**: Reduces infrastructure complexity, built-in auth, real-time subscriptions, PostgreSQL reliability.

**How**: Edge Functions for custom logic, RLS policies for multi-tenancy, PostgREST API.

### 3. Open-source CLI

**Why**: Users can run locally without SaaS, builds trust, enables self-hosted deployments.

**How**: Minimal dependencies, single binary distribution, full scan capabilities offline (with pre-downloaded

 threat intel).

### 4. Sigstore Integration

**Why**: Industry-standard artifact signing, supply chain SLSA provenance, keyless signing.

**How**: OIDC-based signing, transparency logs, certificate-based verification.

### 5. Dark-first UI

**Why**: Cyber security aesthetic, reduces eye strain for long sessions, makes glowing elements pop.

**How**: Tailwind dark mode, CSS animations, glassmorphism effects.

## Data Flow

```
┌──────────┐
│   CLI    │ ──scan─→ PBOM (JSON)
└──────────┘              ↓
                   ┌──────────────┐
                   │   Upload to  │
                   │   Dashboard  │
                   └──────────────┘
                         ↓
                   ┌──────────────┐
                   │   Supabase   │
                   │   PostgreSQL │
                   └──────────────┘
                         ↓
                   ┌──────────────┐
                   │   Risk Score │
                   │  Calculation │
                   └──────────────┘
                         ↓
                   ┌──────────────┐
                   │   Dashboard  │
                   │   Rendering  │
                   └──────────────┘
```

## Deployment

### Vercel (Frontend)
```bash
vercel deploy
```

### Supabase (Backend)
```bash
supabase link --project-ref <project-id>
supabase db push
```

### Docker (Self-hosted option)
```bash
docker build -f docker/Dockerfile.web -t nexusforge:latest .
docker run -p 3000:3000 nexusforge:latest
```

## Environment Configuration

See `.env.example` for all required variables:
- Supabase credentials
- Stripe keys
- GitHub App credentials
- Sigstore endpoints

## Next Steps

1. ✅ Monorepo structure
2. ⏳ Database schema & migrations
3. ⏳ Authentication flow
4. ⏳ PBOM discovery engine (CLI)
5. ⏳ Risk scoring algorithm
6. ⏳ Attack graph visualization
7. ⏳ Slack/Teams integrations
8. ⏳ Compliance report generation
