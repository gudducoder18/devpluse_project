# DevPulse — Developer Productivity MVP

A focused full-stack MVP that helps Individual Contributors move from raw DORA-style metrics to genuine understanding and actionable next steps.

---

## What it does

**IC Profile View (primary)**
- Selects any developer from the team sidebar
- Displays 5 metrics: Lead Time, Cycle Time, Bug Rate, Deployment Frequency, PR Throughput
- Each metric has a color-coded status (Good / Watch / Needs Attention) against defined benchmarks
- Click any metric card to see a detailed breakdown with sparkbar, benchmark comparison
- Interpretation panel tells the *story* behind the numbers and suggests 1–2 concrete next steps

**Manager View (bonus)**
- Team overview table with all 5 metrics per developer, color-coded
- Team averages row
- "Signals requiring attention" section flags at-risk individuals

---

## How metrics are calculated (from workbook definitions)

| Metric | Formula |
|---|---|
| Lead Time | avg(PR deployed date − PR opened date) in days |
| Cycle Time | avg(Issue done date − Issue started date) in days |
| Bug Rate | escaped bugs count ÷ issues completed count |
| Deployment Frequency | count of successful deploys in the month |
| PR Throughput | count of merged PRs in the month |

---

## Data sources

Mock data in `src/data/mockData.js` simulates 4 source tables:
- `developers` — developer dimension (id, name, team, role, tenure)
- `issues` — Jira-like issue table (started, done, type)
- `pullRequests` — PR table (opened, merged, deployed, size)
- `deployments` — CI/CD deploy records
- `escapedBugs` — post-release production bugs

---

## Tech stack

- **React 18** + Vite
- **Pure CSS** (no Tailwind, no component library) — custom design system
- **No external state library** — React useState only
- **No backend** — data layer is a pure JS module (easy to swap for API)

---

## Setup & run

```bash
npm install
npm run dev       # dev server at http://localhost:5173
npm run build     # production build → dist/
```

---

## Design decisions

1. **Metric cards are clickable** — clicking shows detail + sparkbar so users can drill down without leaving the page
2. **Interpretation is rule-based** — thresholds are explicit and defensible, not a black box
3. **Sidebar shows team health at a glance** — green/red pill counts help managers spot who needs attention
4. **Story-first language** — the interpretation panel leads with a narrative, not bullet points, because metrics without context mislead

---

## Interview talking points

- Why no backend? Mock data module has the same interface as a fetch() call — swap in one line
- Why these benchmarks? Calibrated to assignment workbook definitions; team-relative thresholds would be better in production
- What would you add next? PR review wait time breakdown, week-over-week trend lines, team comparison radar chart
