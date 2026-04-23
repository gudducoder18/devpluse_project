

import {
  developers,
  issues,
  pullRequests,
  deployments,
  escapedBugs,
} from "../data/mockData";


const fakeDelay = (ms = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms));

async function fakeFetch(data, delay = 300) {
  await fakeDelay(delay);
  return {
    ok: true,
    status: 200,
    json: async () => data,
  };
}


export async function getDevelopers() {
  const res = await fakeFetch(developers, 250);
  if (!res.ok) throw new Error("Failed to fetch developers");
  return res.json();
}


export async function getDeveloperById(id) {
  const dev = developers.find((d) => d.id === id);
  if (!dev) throw new Error(`Developer ${id} not found`);
  const res = await fakeFetch(dev, 200);
  return res.json();
}


export async function getIssuesByDev(devId) {
  const data = issues.filter((i) => i.dev_id === devId);
  const res = await fakeFetch(data, 200);
  return res.json();
}

export async function getPullRequestsByDev(devId) {
  const data = pullRequests.filter((p) => p.dev_id === devId);
  const res = await fakeFetch(data, 200);
  return res.json();
}

export async function getDeploymentsByDev(devId) {
  const data = deployments.filter((d) => d.dev_id === devId);
  const res = await fakeFetch(data, 200);
  return res.json();
}


export async function getBugsByDev(devId) {
  const data = escapedBugs.filter((b) => b.dev_id === devId);
  const res = await fakeFetch(data, 200);
  return res.json();
}


export async function getMetricsByDev(devId) {
  const daysBetween = (a, b) =>
    Math.round((new Date(b) - new Date(a)) / 86400000);

  const [devPRs, devIssues, devDeps, devBugs] = await Promise.all([
    getPullRequestsByDev(devId),
    getIssuesByDev(devId),
    getDeploymentsByDev(devId),
    getBugsByDev(devId),
  ]);

  const leadTimes = devPRs
    .filter((p) => p.deployed)
    .map((p) => daysBetween(p.opened, p.deployed));

  const cycleTimes = devIssues
    .filter((i) => i.started && i.done)
    .map((i) => daysBetween(i.started, i.done));

  const avg = (arr) =>
    arr.length
      ? +(arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1)
      : 0;

  const metrics = {
    devId,
    avgLeadTime: avg(leadTimes),
    avgCycleTime: avg(cycleTimes),
    bugRate: devIssues.length
      ? +(devBugs.length / devIssues.length).toFixed(2)
      : 0,
    deploymentFrequency: devDeps.length,
    prThroughput: devPRs.filter((p) => p.merged).length,
    raw: { leadTimes, cycleTimes, devBugs, devDeps, devPRs, devIssues },
  };

  const res = await fakeFetch(metrics, 150);
  return res.json();
}

export async function getTeamMetrics() {
  const allMetrics = await Promise.all(
    developers.map((d) => getMetricsByDev(d.id))
  );

  const MKEYS = [
    "avgLeadTime",
    "avgCycleTime",
    "bugRate",
    "deploymentFrequency",
    "prThroughput",
  ];

  const teamAvg = {};
  MKEYS.forEach((k) => {
    const vals = allMetrics.map((m) => m[k]);
    teamAvg[k] = +(vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1);
  });

  return {
    developers: developers.map((d, i) => ({
      ...d,
      metrics: allMetrics[i],
    })),
    teamAverage: teamAvg,
  };
}
