<div align="center">

![MJW Design](https://mjwdesign.ca/wp-content/uploads/2024/01/mjw-design-logo.png)

**Built with [MJW Design](https://mjwdesign.ca) — AI-Powered Development**

---

</div>

# MJW Escape Room Marketing Audit Tool

A premium web-based marketing audit platform purpose-built for escape room businesses. It analyses a venue's online marketing presence across key categories, produces a scored report, surfaces actionable recommendations via a playbook library, and optionally integrates **PocketBase cloud authentication**, **Google PageSpeed Insights** live data, and **Stripe** payment flows for upgrade and access gating.

## Screenshots

| Audit Input & Hero | Scorecard & Category Results |
| :---- | :---- |
| ![MJW Escape Room Marketing Audit Tool hero input screen — placeholder](public/screenshots/hero-input-placeholder.png) | ![MJW Escape Room Marketing Audit Tool scorecard results — placeholder](public/screenshots/scorecard-placeholder.png) |

| Playbook Library | Self-Assessment Panel |
| :---- | :---- |
| ![MJW Escape Room Marketing Audit Tool playbook library — placeholder](public/screenshots/library-placeholder.png) | ![MJW Escape Room Marketing Audit Tool self-assessment panel — placeholder](public/screenshots/self-assessment-placeholder.png) |

## What It Does

Unlike generic marketing audit tools, this platform uses scoring categories, benchmarks, and playbook content that escape room operators immediately recognise and can act on.

| Audit Category | What Is Checked | Why It Matters |
| :---- | :---- | :---- |
| **Page Speed & Core Web Vitals** | Google PageSpeed Insights scores for the venue URL | Slow sites lose bookings directly at the conversion moment. |
| **SEO Foundations** | Title tags, meta descriptions, structured data, local signals | Organic discovery for "escape room near me" searches. |
| **Google Business Profile** | Reviews count, recency, response rate, completeness | The first thing potential customers see before clicking. |
| **Social Media Presence** | Channel activity, visual quality, engagement signals | Audience trust-building and re-targeting fuel. |
| **Booking Funnel** | CTA clarity, friction points, mobile checkout experience | Directly converts interest into paid reservations. |
| **Email & Retention** | Opt-in capture, automation, repeat-visit nurturing | Lowest-cost route to recurring revenue. |

**Key capabilities:**

- Enter any escape room venue URL to trigger a full marketing audit.
- Receive a scored category breakdown with pass/fail indicators and priority flags.
- Browse a curated playbook library of escape-room-specific fix guides.
- Step through a self-assessment questionnaire to supplement automated scores.
- Gate premium playbooks and detailed recommendations behind authentication or payment.
- Optional live PageSpeed data via the Google PageSpeed Insights API.
- Optional Stripe-powered upgrade flow for unlocking premium content.

## How to Use

Open the app and enter your escape room website URL into the hero input. The audit engine runs immediately and returns a scorecard broken into marketing categories. Each category shows a score, a status indicator, and a link to the relevant playbook fix guide. Use the self-assessment panel to answer qualitative questions the automated scan cannot detect, such as email list size or booking system type. Authenticated users gain access to saved audit history and the full playbook library. Premium playbooks can be unlocked via the Stripe upgrade flow.

The tool is designed for desktop use where the full scorecard and playbook reader are most comfortable, but it is fully responsive and usable on mobile for quick checks in the field.

## Stack

| Layer | Technology |
| :---- | :---- |
| UI framework | React 18 \+ TypeScript |
| Build tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| Icons | Lucide React |
| Auth \& cloud persistence | PocketBase |
| Payments | Stripe (publishable-key client integration) |
| Live performance data | Google PageSpeed Insights API |
| Hosting | Netlify |

## Local Development

npm install

npm run dev

The app works with **no environment variables configured**. Without `VITE_PAGESPEED_API_KEY`, the audit engine falls back to a simulated audit mode (`simulateAudit.ts`) that produces realistic placeholder scores without making external API calls. Without `VITE_STRIPE_PUBLISHABLE_KEY`, upgrade and payment flows are hidden or disabled gracefully.

## Quality Checks

npm run typecheck

npm run lint

npm run build

## Available Scripts

npm run dev        \# Start development server (http://localhost:5173)

npm run build      \# Production build → dist/

npm run preview    \# Preview production build locally

npm run lint       \# ESLint check

npm run typecheck  \# TypeScript type check (no emit)

## Environment Variables

All environment variables are optional unless you need the related feature. The app is fully production-usable in simulation mode with no configured variables.

| Variable | Required? | Scope | Enables | Description |
| :---- | :---- | :---- | :---- | :---- |
| `VITE_PAGESPEED_API_KEY` | Optional | Frontend/public | Live Google PageSpeed Insights scoring | Public API key for PageSpeed Insights. Without this, the tool runs in simulated audit mode. Obtain a key from the Google Cloud Console with the PageSpeed Insights API enabled. |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Optional | Frontend/public | Stripe upgrade and payment flows | Publishable Stripe key used client-side to initiate checkout sessions for premium content access. Never use a secret key here. |

## Authentication and PocketBase

User authentication is handled through PocketBase. The `Auth.tsx` page manages sign-in and registration, and authenticated sessions gate access to saved audit history, the full playbook library, and any premium content not covered by a Stripe purchase.

To enable authentication, deploy a PocketBase instance (or use [PocketHost](https://pockethost.io)) and configure the PocketBase URL inside `src/lib` or as a build-time constant. No PocketBase URL variable is required in `.env.example` because the client URL is configured directly in the library layer, but update `src/lib` to point at your instance before deploying.

### Recommended PocketBase Collections

#### `audits`

| Field | Type | Notes |
| :---- | :---- | :---- |
| `owner` | relation to `users` | Authenticated user who ran the audit. |
| `url` | text | The venue URL that was audited. |
| `scores` | json | Full category score breakdown. |
| `created` | system field | Managed by PocketBase. |
| `updated` | system field | Managed by PocketBase. |

#### `playbooks`

| Field | Type | Notes |
| :---- | :---- | :---- |
| `title` | text | Display name shown in the library. |
| `category` | text | Maps to an audit category slug. |
| `content` | editor or text | Full playbook body rendered in PlaybookReader. |
| `is_premium` | bool | Gates content behind auth or Stripe payment. |
| `created` | system field | Managed by PocketBase. |

Recommended collection rules allow authenticated users to create and read their own audit records. Playbook records can be publicly listed but should gate `is_premium` content reads behind authentication or a verified Stripe entitlement.

## Stripe Upgrade Flow

The Stripe integration is implemented client-side through `src/lib/stripe.ts` using the publishable key. When a user attempts to access a premium playbook or feature tier, the upgrade flow is triggered. Configure `VITE_STRIPE_PUBLISHABLE_KEY` in your Netlify environment variables and redeploy. If no Stripe key is present, premium upsell UI is hidden or replaced with a contact/signup prompt.

For server-side Stripe webhook handling (confirming payment and unlocking access), implement a Netlify Function that reads the Stripe secret key from `process.env` only inside the function — never expose the secret key as a `VITE_` variable.

## Netlify Deployment

The `netlify.toml` at the project root configures the Vite build and static routing. To deploy on Netlify, connect this GitHub repository and use the following production settings.

| Setting | Value |
| :---- | :---- |
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node/package install | Netlify default Node environment with `npm install` |

\[build\]

  command \= "npm run build"

  publish \= "dist"

\[\[redirects\]\]

  from \= "/\*"

  to \= "/index.html"

  status \= 200

Deploy first with no environment variables to confirm the simulated-audit app works end to end, then add `VITE_PAGESPEED_API_KEY` for live scoring and `VITE_STRIPE_PUBLISHABLE_KEY` for payment flows.

## Project Structure

src/

  components/

    CategoryCard.tsx          \# Scored audit category result card

    HeroInput.tsx             \# URL entry and audit trigger hero section

    Layout.tsx                \# App shell and navigation wrapper

    LoadingState.tsx          \# Audit-in-progress loading indicator

    LockScreen.tsx            \# Auth/payment gate overlay for premium content

    PlaybookCard.tsx          \# Playbook library listing card

    Scorecard.tsx             \# Full audit scorecard with category breakdown

    SelfAssessment.tsx        \# Qualitative self-assessment questionnaire

  lib/

    stripe.ts                 \# Stripe client initialisation and upgrade helpers

  pages/

    Auth.tsx                  \# Sign-in and registration page

    Library.tsx               \# Playbook library browse page

    PlaybookReader.tsx        \# Full playbook content reader

  types/

    audit.ts                  \# Shared audit score and category types

  utils/

    runAudit.ts               \# Live audit engine (PageSpeed + checks)

    simulateAudit.ts          \# Fallback simulated audit for no-API-key mode

  App.tsx                     \# Root layout, routing, and auth context

  main.tsx                    \# Entry point

## Changelog

### v1.0.0 — Production Readiness Release

- Added hero URL input, full scorecard, and category card components with pass/fail indicators.
- Added self-assessment questionnaire to capture qualitative marketing signals.
- Added playbook library and full playbook reader with premium content gating via LockScreen.
- Added PocketBase authentication flow and user-scoped audit history.
- Added Stripe publishable-key integration for premium upgrade flows.
- Added Google PageSpeed Insights live audit mode with graceful fallback to simulation.
- Added Netlify deployment configuration, environment variable documentation, and this changelog.

### Previous Build Milestones

- Scaffolded audit engine with simulated scoring across six escape-room marketing categories.
- Established component library (CategoryCard, Scorecard, HeroInput, Layout, LoadingState).
- Integrated PocketBase client for auth and optional cloud persistence of audit results.

---

Part of the **MJW Personal App Platform**.