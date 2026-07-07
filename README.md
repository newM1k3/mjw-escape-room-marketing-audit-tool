<div align="center">

![MJW Design](https://mjwdesign.ca/wp-content/uploads/2024/01/mjw-design-logo.png)

**Built with [MJW Design](https://mjwdesign.ca) — AI-Powered Development**

---

</div>

# MJW Escape Room Marketing Audit Tool

A premium marketing audit and self-assessment platform built for escape room businesses. It helps owners and operators analyze their digital presence, score their marketing performance across key categories, access a guided playbook library, and take action on audit recommendations — with optional **PocketBase cloud authentication**, optional **Stripe-powered upgrade flows**, and optional **Google PageSpeed Insights** integration for live site performance data.

## Screenshots

| Audit Dashboard | Playbook Library |
| :---- | :---- |
| MJW Escape Room Marketing Audit Tool — audit dashboard and scorecard view | MJW Escape Room Marketing Audit Tool — playbook library and reader view |

## What It Does

Unlike generic marketing audit tools, this platform is built around the specific channels, conversion points, and customer journeys that matter to escape room businesses.

| Section | Purpose |
| :---- | :---- |
| **Hero Input** | Enter a business URL to trigger a live or simulated audit run. |
| **Scorecard** | View an overall marketing health score broken down by category. |
| **Category Cards** | Drill into per-category scores with actionable findings and priority flags. |
| **Self-Assessment** | Answer guided questions to supplement automated audit data. |
| **Playbook Library** | Browse and read step-by-step marketing playbooks matched to audit findings. |
| **Lock Screen** | Paywall gate for premium playbooks and advanced audit features via Stripe. |
| **Auth** | PocketBase-backed sign-in and registration for saved audits and library access. |

**Key interactions:**

- Enter a website URL in the Hero Input to run an audit.
- Review the Scorecard for an at-a-glance marketing health score.
- Expand Category Cards to read findings and recommended actions per channel.
- Complete the Self-Assessment to refine and personalise audit results.
- Browse the Playbook Library and open playbooks matched to your lowest-scoring areas.
- Upgrade via Stripe to unlock premium playbooks and gated features.
- Sign in or register through PocketBase to save audit history and library progress.

## How to Use

The app opens on the audit entry screen. Enter your escape room website URL and run an audit to generate a scored report across marketing categories. Each category card surfaces specific issues and prioritised recommendations. Use the Self-Assessment to fill in context the automated scan cannot detect — such as offline marketing activities and booking-conversion tactics. Navigate to the Playbook Library to access structured guides for your highest-priority improvement areas. Premium content is gated behind a Stripe upgrade flow.

The tool is designed for desktop use, but the layout is responsive for review on smaller screens.

## Stack

| Layer | Technology |
| :---- | :---- |
| UI framework | React 18 + TypeScript |
| Build tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| Icons | Lucide React |
| Auth + cloud persistence | PocketBase |
| Payments | Stripe (publishable key / upgrade flow) |
| PageSpeed data | Google PageSpeed Insights API |
| Hosting | Netlify |

## Local Development

npm install

npm run dev

The app works in a limited mode with **no environment variables**. Without `VITE_PAGESPEED_API_KEY`, the audit runner falls back to a simulated audit. Without `VITE_STRIPE_PUBLISHABLE_KEY`, payment and upgrade flows are unavailable. Without a PocketBase instance, auth and saved-audit features are disabled.

## Quality Checks

npm run typecheck

npm run lint

npm run build

## Available Scripts

npm run dev        # Start development server (http://localhost:5173)

npm run build      # Production build → dist/

npm run preview    # Preview production build locally

npm run lint       # ESLint check

npm run typecheck  # TypeScript type check (no emit)

## Environment Variables

All environment variables are optional unless you enable the related feature. The app remains usable in a simulated/local mode with no configured variables.

| Variable | Required? | Scope | Enables | Description |
| :---- | :---- | :---- | :---- | :---- |
| `VITE_PAGESPEED_API_KEY` | Optional | Frontend/public | Live Google PageSpeed Insights audit data | Public API key for the Google PageSpeed Insights API. Without this, the audit runner uses simulated data. Example key obtained from the Google Cloud Console. |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Optional | Frontend/public | Stripe upgrade and payment flows | Public Stripe publishable key used to initialise the Stripe client for upgrade flows and premium content gating. Never use a secret key here. |

PocketBase connection is configured inside `src/lib` or at the component level. See the PocketBase section below.

## PocketBase Auth and Cloud Saves

The app supports optional PocketBase authentication for user accounts, saved audit history, and library access state. When a PocketBase URL is configured, users can register, sign in, and have their audit results and playbook progress persisted across sessions.

Without PocketBase, the audit tool and self-assessment run fully in-browser, and the Playbook Library is accessible to the extent permitted without an authenticated session.

### Recommended PocketBase Collections

The following collections support the current feature set.

**`users` (built-in PocketBase auth collection)**

| Field | Type | Notes |
| :---- | :---- | :---- |
| `email` | email | Standard PocketBase auth field. |
| `name` | text | Display name shown in the app UI. |

**`audits`**

| Field | Type | Notes |
| :---- | :---- | :---- |
| `owner` | relation to `users` | The authenticated user who ran the audit. |
| `url` | text | The website URL that was audited. |
| `score_json` | json | Stores the full category scorecard output. |
| `self_assessment_json` | json | Stores self-assessment question responses. |
| `created` | system field | Managed by PocketBase. |
| `updated` | system field | Managed by PocketBase. |

**`playbooks`**

| Field | Type | Notes |
| :---- | :---- | :---- |
| `title` | text | Playbook display name in the Library. |
| `category` | text or select | Maps to an audit category for matched recommendations. |
| `content` | editor or text | Full playbook body rendered in the PlaybookReader. |
| `is_premium` | bool | When true, playbook is gated behind the Stripe upgrade flow. |
| `created` | system field | Managed by PocketBase. |

Recommended collection rules should allow authenticated users to create and access their own `audits` records and allow all authenticated users to read `playbooks`. A practical rule pattern is `@request.auth.id != "" && owner = @request.auth.id` for user-scoped audit list/view/update/delete rules.

## Stripe Upgrade Flow

Premium playbooks and advanced audit features are gated behind a Stripe-powered upgrade flow. The Stripe publishable key (`VITE_STRIPE_PUBLISHABLE_KEY`) is used client-side to initialise the Stripe instance. The `LockScreen` component renders the paywall gate and triggers the upgrade flow when a user attempts to access premium content.

Configure the Stripe publishable key in your Netlify environment variables or local `.env` file. Stripe secret keys must never be placed in frontend code or `VITE_` variables; any server-side payment processing should be handled through a secure backend function.

## Netlify Deployment

The `netlify.toml` at the project root configures the Vite build and static routing. To deploy on Netlify, connect this GitHub repository and use the following production settings.

| Setting | Value |
| :---- | :---- |
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node/package install | Netlify default Node environment with `npm install` |

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Deploy first with no environment variables to confirm the simulated audit mode works, then add `VITE_PAGESPEED_API_KEY` for live PageSpeed data and `VITE_STRIPE_PUBLISHABLE_KEY` for the upgrade flow.

## Accessibility and Production Readiness

The release UI includes accessible labels on audit controls, category cards, self-assessment inputs, playbook navigation, auth forms, and upgrade/lock-screen actions. Empty states and no-configuration states are intentionally explicit so the tool remains understandable before optional services are configured. The simulated audit fallback ensures the app is always demonstrable without API credentials.

## Project Structure

```
src/
  components/
    CategoryCard.tsx          # Per-category score card with findings and actions
    HeroInput.tsx             # URL entry and audit trigger
    Layout.tsx                # App shell and navigation wrapper
    LoadingState.tsx          # Audit loading/progress indicator
    LockScreen.tsx            # Stripe paywall gate for premium content
    PlaybookCard.tsx          # Playbook preview card in the Library
    Scorecard.tsx             # Overall marketing health score display
    SelfAssessment.tsx        # Guided self-assessment question flow
  lib/
    stripe.ts                 # Stripe client initialisation
  pages/
    Auth.tsx                  # PocketBase sign-in and registration
    Library.tsx               # Playbook library browser
    PlaybookReader.tsx        # Full playbook content reader
  types/
    audit.ts                  # Shared audit result and category types
  utils/
    runAudit.ts               # Live audit runner (PageSpeed + analysis)
    simulateAudit.ts          # Simulated audit fallback for local/demo use
  App.tsx                     # Root layout + routing
  main.tsx                    # Entry point
netlify.toml                  # Netlify build and redirect configuration
```

## Changelog

### v1.0.0 — Production Readiness Release

- Added Hero Input audit entry, Scorecard, and Category Cards with per-channel findings and prioritised recommendations.
- Added Self-Assessment flow to supplement automated audit data with operator-provided context.
- Added Playbook Library with PlaybookReader and premium content gating via LockScreen and Stripe.
- Added PocketBase authentication for saved audits and library access state.
- Added Google PageSpeed Insights integration with simulated audit fallback.
- Added Netlify deployment configuration, environment variable documentation, and this changelog.

### Previous Build Milestones

- Established React + TypeScript + Vite + Tailwind CSS project scaffold with Netlify SPA routing.
- Wired PocketBase client for auth and optional cloud persistence of audit results.
- Built audit type system, simulated audit runner, and category scoring logic.

---

Part of the **MJW Personal App Platform**.