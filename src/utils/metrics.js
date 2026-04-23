import { issues, pullRequests, deployments, escapedBugs } from '../data/mockData';

const daysBetween = (a, b) => {
  const ms = new Date(b) - new Date(a);
  return Math.round(ms / (1000 * 60 * 60 * 24));
};

export function computeMetrics(devId) {
  const devPRs = pullRequests.filter(p => p.dev_id === devId);
  const devIssues = issues.filter(i => i.dev_id === devId);
  const devDeployments = deployments.filter(d => d.dev_id === devId);
  const devBugs = escapedBugs.filter(b => b.dev_id === devId);

 
  const leadTimes = devPRs
    .filter(p => p.deployed)
    .map(p => daysBetween(p.opened, p.deployed));
  const avgLeadTime = leadTimes.length
    ? +(leadTimes.reduce((a, b) => a + b, 0) / leadTimes.length).toFixed(1)
    : 0;

  
  const cycleTimes = devIssues
    .filter(i => i.started && i.done)
    .map(i => daysBetween(i.started, i.done));
  const avgCycleTime = cycleTimes.length
    ? +(cycleTimes.reduce((a, b) => a + b, 0) / cycleTimes.length).toFixed(1)
    : 0;

 
  const bugRate = devIssues.length
    ? +(devBugs.length / devIssues.length).toFixed(2)
    : 0;

  const deploymentFrequency = devDeployments.length;


  const prThroughput = devPRs.filter(p => p.merged).length;

  return {
    avgLeadTime,
    avgCycleTime,
    bugRate,
    deploymentFrequency,
    prThroughput,
    raw: { leadTimes, cycleTimes, devBugs, devDeployments, devPRs, devIssues }
  };
}


export const BENCHMARKS = {
  avgLeadTime:         { good: 3,   warn: 6,   label: "days" },
  avgCycleTime:        { good: 3,   warn: 7,   label: "days" },
  bugRate:             { good: 0.05, warn: 0.15, label: "ratio" },
  deploymentFrequency: { good: 8,   warn: 4,   label: "deploys/mo" },
  prThroughput:        { good: 6,   warn: 3,   label: "PRs/mo" },
};

export function getStatus(metric, value) {
  const b = BENCHMARKS[metric];
  if (!b) return "neutral";
  const isHigherBetter = metric === "deploymentFrequency" || metric === "prThroughput";
  if (isHigherBetter) {
    if (value >= b.good) return "good";
    if (value >= b.warn) return "warn";
    return "bad";
  } else {
    if (metric === "bugRate") {
      if (value <= b.good) return "good";
      if (value <= b.warn) return "warn";
      return "bad";
    }
    if (value <= b.good) return "good";
    if (value <= b.warn) return "warn";
    return "bad";
  }
}


export function interpretMetrics(metrics) {
  const issues = [];
  const strengths = [];
  const suggestions = [];

  const { avgLeadTime, avgCycleTime, bugRate, deploymentFrequency, prThroughput } = metrics;

  if (avgLeadTime > 6) {
    issues.push("PRs are taking a long time to reach production — review bottlenecks in the merge and deploy pipeline.");
    suggestions.push("Break large PRs into smaller, reviewable chunks to reduce lead time.");
  } else if (avgLeadTime <= 3) {
    strengths.push("Code is moving to production quickly — excellent pipeline efficiency.");
  }

  
  if (avgCycleTime > 7) {
    issues.push("Issues are taking too long to complete — possible scope creep or blocking dependencies.");
    suggestions.push("Timebox tasks and flag blockers in standup before they stall progress.");
  } else if (avgCycleTime <= 3) {
    strengths.push("Issues are being resolved quickly — great focus and task sizing.");
  }


  if (bugRate > 0.15) {
    issues.push("High escaped bug rate suggests gaps in testing or review thoroughness.");
    suggestions.push("Add a pre-merge checklist or increase test coverage on high-risk areas.");
  } else if (bugRate === 0) {
    strengths.push("Zero escaped bugs this month — strong quality discipline.");
  }

  
  if (deploymentFrequency < 4) {
    issues.push("Low deployment frequency may indicate large batch releases or pipeline friction.");
    suggestions.push("Aim for smaller, more frequent deploys to reduce risk per release.");
  } else if (deploymentFrequency >= 8) {
    strengths.push("High deployment cadence — shipping often with confidence.");
  }


  if (prThroughput < 3) {
    issues.push("Low PR throughput — fewer changes are making it through review and merge.");
    suggestions.push("Check if PRs are stuck in review; consider pairing for faster feedback cycles.");
  } else if (prThroughput >= 6) {
    strengths.push("Strong PR throughput — consistently contributing and merging changes.");
  }

  
  let story = "";
  if (issues.length === 0 && strengths.length >= 3) {
    story = "You're having a great month — metrics are healthy across the board. Keep the momentum and consider mentoring teammates.";
  } else if (issues.length >= 3) {
    story = "Several signals indicate friction in your workflow this month. Focus on one bottleneck at a time rather than fixing everything at once.";
  } else if (issues.length === 1 && avgLeadTime > 6) {
    story = "Your productivity is solid but code is spending too long in the pipeline. The bottleneck is after you're done — not in the work itself.";
  } else if (bugRate > 0.1) {
    story = "Output volume looks good, but quality signals need attention. Slowing down slightly to improve review quality will pay dividends.";
  } else {
    story = "Your metrics show a mixed picture — some real strengths alongside one or two areas worth attention.";
  }

  return { story, strengths, issues, suggestions: suggestions.slice(0, 2) };
}
