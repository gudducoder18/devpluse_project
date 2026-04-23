

export const developers = [
  { id: "D001", name: "Priya Sharma", team: "Platform", role: "Senior Engineer", tenure_months: 18 },
  { id: "D002", name: "Arjun Mehta", team: "Platform", role: "Engineer", tenure_months: 8 },
  { id: "D003", name: "Sarah Chen", team: "Frontend", role: "Senior Engineer", tenure_months: 24 },
  { id: "D004", name: "Marcus Williams", team: "Frontend", role: "Engineer", tenure_months: 5 },
  { id: "D005", name: "Neha Patel", team: "Backend", role: "Staff Engineer", tenure_months: 36 },
];


export const issues = [
  { id: "ISS-101", dev_id: "D001", title: "Refactor auth middleware", started: "2024-05-01", done: "2024-05-04", type: "feature" },
  { id: "ISS-102", dev_id: "D001", title: "Add rate limiting", started: "2024-05-05", done: "2024-05-09", type: "feature" },
  { id: "ISS-103", dev_id: "D001", title: "Fix token expiry bug", started: "2024-05-10", done: "2024-05-11", type: "bug" },
  { id: "ISS-104", dev_id: "D001", title: "Write unit tests for auth", started: "2024-05-12", done: "2024-05-16", type: "chore" },
  { id: "ISS-105", dev_id: "D001", title: "Implement OAuth2 flow", started: "2024-05-17", done: "2024-05-24", type: "feature" },
  { id: "ISS-106", dev_id: "D001", title: "Dashboard API integration", started: "2024-05-25", done: "2024-05-29", type: "feature" },

  { id: "ISS-201", dev_id: "D002", title: "Setup CI pipeline", started: "2024-05-01", done: "2024-05-07", type: "chore" },
  { id: "ISS-202", dev_id: "D002", title: "Add linting rules", started: "2024-05-08", done: "2024-05-10", type: "chore" },
  { id: "ISS-203", dev_id: "D002", title: "Fix build timeout", started: "2024-05-11", done: "2024-05-20", type: "bug" },
  { id: "ISS-204", dev_id: "D002", title: "Migrate to pnpm", started: "2024-05-21", done: "2024-05-29", type: "chore" },

  { id: "ISS-301", dev_id: "D003", title: "Redesign nav component", started: "2024-05-01", done: "2024-05-03", type: "feature" },
  { id: "ISS-302", dev_id: "D003", title: "Accessibility audit fixes", started: "2024-05-04", done: "2024-05-06", type: "chore" },
  { id: "ISS-303", dev_id: "D003", title: "Dark mode support", started: "2024-05-07", done: "2024-05-13", type: "feature" },
  { id: "ISS-304", dev_id: "D003", title: "Fix dropdown z-index", started: "2024-05-14", done: "2024-05-15", type: "bug" },
  { id: "ISS-305", dev_id: "D003", title: "Animation system", started: "2024-05-16", done: "2024-05-23", type: "feature" },
  { id: "ISS-306", dev_id: "D003", title: "Component library docs", started: "2024-05-24", done: "2024-05-29", type: "chore" },
  { id: "ISS-307", dev_id: "D003", title: "Perf optimization", started: "2024-05-29", done: "2024-05-31", type: "feature" },

  
  { id: "ISS-401", dev_id: "D004", title: "Fix mobile layout bug", started: "2024-05-01", done: "2024-05-08", type: "bug" },
  { id: "ISS-402", dev_id: "D004", title: "Build product card component", started: "2024-05-09", done: "2024-05-18", type: "feature" },
  { id: "ISS-403", dev_id: "D004", title: "Update Tailwind config", started: "2024-05-19", done: "2024-05-26", type: "chore" },

  
  { id: "ISS-501", dev_id: "D005", title: "Design new DB schema", started: "2024-05-01", done: "2024-05-02", type: "feature" },
  { id: "ISS-502", dev_id: "D005", title: "Build payment API", started: "2024-05-03", done: "2024-05-05", type: "feature" },
  { id: "ISS-503", dev_id: "D005", title: "Add caching layer", started: "2024-05-06", done: "2024-05-08", type: "feature" },
  { id: "ISS-504", dev_id: "D005", title: "Write integration tests", started: "2024-05-09", done: "2024-05-11", type: "chore" },
  { id: "ISS-505", dev_id: "D005", title: "Optimize slow queries", started: "2024-05-12", done: "2024-05-14", type: "feature" },
  { id: "ISS-506", dev_id: "D005", title: "Setup monitoring alerts", started: "2024-05-15", done: "2024-05-17", type: "chore" },
  { id: "ISS-507", dev_id: "D005", title: "Refactor auth service", started: "2024-05-18", done: "2024-05-19", type: "feature" },
  { id: "ISS-508", dev_id: "D005", title: "Add rate limiter", started: "2024-05-20", done: "2024-05-21", type: "feature" },
  { id: "ISS-509", dev_id: "D005", title: "Deploy to staging", started: "2024-05-22", done: "2024-05-23", type: "chore" },
];


export const pullRequests = [
  { id: "PR-501", dev_id: "D001", issue_id: "ISS-101", opened: "2024-05-01", merged: "2024-05-03", deployed: "2024-05-04", size: "M" },
  { id: "PR-502", dev_id: "D001", issue_id: "ISS-102", opened: "2024-05-05", merged: "2024-05-08", deployed: "2024-05-09", size: "L" },
  { id: "PR-503", dev_id: "D001", issue_id: "ISS-103", opened: "2024-05-10", merged: "2024-05-10", deployed: "2024-05-11", size: "S" },
  { id: "PR-504", dev_id: "D001", issue_id: "ISS-104", opened: "2024-05-12", merged: "2024-05-15", deployed: "2024-05-16", size: "M" },
  { id: "PR-505", dev_id: "D001", issue_id: "ISS-105", opened: "2024-05-17", merged: "2024-05-22", deployed: "2024-05-24", size: "XL" },
  { id: "PR-506", dev_id: "D001", issue_id: "ISS-106", opened: "2024-05-25", merged: "2024-05-28", deployed: "2024-05-29", size: "L" },

  { id: "PR-601", dev_id: "D002", issue_id: "ISS-201", opened: "2024-05-01", merged: "2024-05-06", deployed: "2024-05-07", size: "L" },
  { id: "PR-602", dev_id: "D002", issue_id: "ISS-202", opened: "2024-05-08", merged: "2024-05-09", deployed: "2024-05-10", size: "S" },
  { id: "PR-603", dev_id: "D002", issue_id: "ISS-203", opened: "2024-05-11", merged: "2024-05-18", deployed: "2024-05-20", size: "M" },
  { id: "PR-604", dev_id: "D002", issue_id: "ISS-204", opened: "2024-05-21", merged: "2024-05-27", deployed: "2024-05-29", size: "XL" },

  { id: "PR-701", dev_id: "D003", issue_id: "ISS-301", opened: "2024-05-01", merged: "2024-05-02", deployed: "2024-05-03", size: "M" },
  { id: "PR-702", dev_id: "D003", issue_id: "ISS-302", opened: "2024-05-04", merged: "2024-05-05", deployed: "2024-05-06", size: "S" },
  { id: "PR-703", dev_id: "D003", issue_id: "ISS-303", opened: "2024-05-07", merged: "2024-05-11", deployed: "2024-05-13", size: "L" },
  { id: "PR-704", dev_id: "D003", issue_id: "ISS-304", opened: "2024-05-14", merged: "2024-05-14", deployed: "2024-05-15", size: "S" },
  { id: "PR-705", dev_id: "D003", issue_id: "ISS-305", opened: "2024-05-16", merged: "2024-05-21", deployed: "2024-05-23", size: "XL" },
  { id: "PR-706", dev_id: "D003", issue_id: "ISS-306", opened: "2024-05-24", merged: "2024-05-27", deployed: "2024-05-29", size: "M" },
  { id: "PR-707", dev_id: "D003", issue_id: "ISS-307", opened: "2024-05-29", merged: "2024-05-30", deployed: "2024-05-31", size: "S" },

 
  { id: "PR-801", dev_id: "D004", issue_id: "ISS-401", opened: "2024-05-01", merged: "2024-05-07", deployed: "2024-05-08", size: "M" },
  { id: "PR-802", dev_id: "D004", issue_id: "ISS-402", opened: "2024-05-09", merged: "2024-05-16", deployed: "2024-05-18", size: "XL" },
  { id: "PR-803", dev_id: "D004", issue_id: "ISS-403", opened: "2024-05-19", merged: "2024-05-24", deployed: "2024-05-26", size: "S" },

 
  { id: "PR-901", dev_id: "D005", issue_id: "ISS-501", opened: "2024-05-01", merged: "2024-05-01", deployed: "2024-05-02", size: "M" },
  { id: "PR-902", dev_id: "D005", issue_id: "ISS-502", opened: "2024-05-03", merged: "2024-05-04", deployed: "2024-05-05", size: "L" },
  { id: "PR-903", dev_id: "D005", issue_id: "ISS-503", opened: "2024-05-06", merged: "2024-05-07", deployed: "2024-05-08", size: "M" },
  { id: "PR-904", dev_id: "D005", issue_id: "ISS-504", opened: "2024-05-09", merged: "2024-05-10", deployed: "2024-05-11", size: "S" },
  { id: "PR-905", dev_id: "D005", issue_id: "ISS-505", opened: "2024-05-12", merged: "2024-05-13", deployed: "2024-05-14", size: "L" },
  { id: "PR-906", dev_id: "D005", issue_id: "ISS-506", opened: "2024-05-15", merged: "2024-05-16", deployed: "2024-05-17", size: "S" },
  { id: "PR-907", dev_id: "D005", issue_id: "ISS-507", opened: "2024-05-18", merged: "2024-05-18", deployed: "2024-05-19", size: "M" },
  { id: "PR-908", dev_id: "D005", issue_id: "ISS-508", opened: "2024-05-20", merged: "2024-05-21", deployed: "2024-05-21", size: "S" },
  { id: "PR-909", dev_id: "D005", issue_id: "ISS-509", opened: "2024-05-22", merged: "2024-05-22", deployed: "2024-05-23", size: "M" },
];


export const deployments = [
  { id: "DEP-1", dev_id: "D001", pr_id: "PR-501", date: "2024-05-04", success: true },
  { id: "DEP-2", dev_id: "D001", pr_id: "PR-502", date: "2024-05-09", success: true },
  { id: "DEP-3", dev_id: "D001", pr_id: "PR-503", date: "2024-05-11", success: true },
  { id: "DEP-4", dev_id: "D001", pr_id: "PR-504", date: "2024-05-16", success: true },
  { id: "DEP-5", dev_id: "D001", pr_id: "PR-505", date: "2024-05-24", success: true },
  { id: "DEP-6", dev_id: "D001", pr_id: "PR-506", date: "2024-05-29", success: true },

  { id: "DEP-7",  dev_id: "D002", pr_id: "PR-601", date: "2024-05-07", success: true },
  { id: "DEP-8",  dev_id: "D002", pr_id: "PR-602", date: "2024-05-10", success: true },
  { id: "DEP-9",  dev_id: "D002", pr_id: "PR-603", date: "2024-05-20", success: true },
  { id: "DEP-10", dev_id: "D002", pr_id: "PR-604", date: "2024-05-29", success: true },

  { id: "DEP-11", dev_id: "D003", pr_id: "PR-701", date: "2024-05-03", success: true },
  { id: "DEP-12", dev_id: "D003", pr_id: "PR-702", date: "2024-05-06", success: true },
  { id: "DEP-13", dev_id: "D003", pr_id: "PR-703", date: "2024-05-13", success: true },
  { id: "DEP-14", dev_id: "D003", pr_id: "PR-704", date: "2024-05-15", success: true },
  { id: "DEP-15", dev_id: "D003", pr_id: "PR-705", date: "2024-05-23", success: true },
  { id: "DEP-16", dev_id: "D003", pr_id: "PR-706", date: "2024-05-29", success: true },
  { id: "DEP-17", dev_id: "D003", pr_id: "PR-707", date: "2024-05-31", success: true },

  
  { id: "DEP-18", dev_id: "D004", pr_id: "PR-801", date: "2024-05-08", success: true },
  { id: "DEP-19", dev_id: "D004", pr_id: "PR-802", date: "2024-05-18", success: true },
  { id: "DEP-20", dev_id: "D004", pr_id: "PR-803", date: "2024-05-26", success: true },


  { id: "DEP-21", dev_id: "D005", pr_id: "PR-901", date: "2024-05-02", success: true },
  { id: "DEP-22", dev_id: "D005", pr_id: "PR-902", date: "2024-05-05", success: true },
  { id: "DEP-23", dev_id: "D005", pr_id: "PR-903", date: "2024-05-08", success: true },
  { id: "DEP-24", dev_id: "D005", pr_id: "PR-904", date: "2024-05-11", success: true },
  { id: "DEP-25", dev_id: "D005", pr_id: "PR-905", date: "2024-05-14", success: true },
  { id: "DEP-26", dev_id: "D005", pr_id: "PR-906", date: "2024-05-17", success: true },
  { id: "DEP-27", dev_id: "D005", pr_id: "PR-907", date: "2024-05-19", success: true },
  { id: "DEP-28", dev_id: "D005", pr_id: "PR-908", date: "2024-05-21", success: true },
  { id: "DEP-29", dev_id: "D005", pr_id: "PR-909", date: "2024-05-23", success: true },
];


export const escapedBugs = [
  { id: "BUG-1", dev_id: "D001", pr_id: "PR-502", found_date: "2024-05-12", description: "Rate limit counter not reset on new day" },
  { id: "BUG-2", dev_id: "D002", pr_id: "PR-603", found_date: "2024-05-22", description: "Build timeout misconfigured for large repos" },
  { id: "BUG-3", dev_id: "D002", pr_id: "PR-604", found_date: "2024-05-30", description: "pnpm lockfile conflicts on Windows" },
  { id: "BUG-4", dev_id: "D004", pr_id: "PR-801", found_date: "2024-05-10", description: "Dropdown closes on outside click in Firefox" },
  { id: "BUG-5", dev_id: "D004", pr_id: "PR-802", found_date: "2024-05-20", description: "Mobile layout breaks at 375px viewport" },
];
