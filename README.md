# EasyAIStack

Static site for filtering and ranking AI tools for small businesses, with a free planner, article hub, sample plans, and a paid-plan funnel.

## What It Does

- Filters AI tools by business type, team size, bottleneck, goal, budget, tech comfort, and workload signals.
- Shows a recommended starter stack above the ranked results.
- Includes a browse page for tool collections and a small article section that links back into filtered planner states.
- Includes sample-plan pages that help explain the paid offer.
- Runs as a plain static site with no build step.

## Pages

- `index.html` - main planner
- `browse.html` - tool database and collections
- `articles.html` - article hub
- `instructions.html` - about and stack methodology
- `sample-ai-stack-plans.html` - example paid-plan previews
- `sample-local-service-ai-stack-plan.html` - full product-style sample plan
- `sample-agency-ai-stack-plan.html` - full product-style agency sample plan
- `ai-stack-plan.html` - paid-plan offer page
- `plan-fulfillment.html` - internal generator for turning Shopify intake into a client-ready plan
- `shopify-theme/` - Shopify theme starter with a real product template for the `$29` plan

## Run

Open `index.html` in a browser.

Optional local server:

```powershell
py -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## Data

The dataset lives in:

- `tool-data.js`

Shared scoring, rendering, and browse helpers live in:

- `tool-utils.js`

Fulfillment generator and printable plan logic live in:

- `plan-generator.js`
- `plan-fulfillment.js`

Homepage logic:

- `app.js`

Browse page logic:

- `browse.js`
