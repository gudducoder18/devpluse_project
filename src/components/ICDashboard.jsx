import { useState } from "react";
import { useMetrics, useDevelopers } from "../hooks/useApi";
import { interpretMetrics, getStatus, BENCHMARKS } from "../utils/metrics";

const METRIC_META = {
  avgLeadTime:         { label: "Lead Time",        unit: "days",    icon: "⟳", desc: "PR open → production deploy" },
  avgCycleTime:        { label: "Cycle Time",        unit: "days",    icon: "⏱", desc: "Issue started → done" },
  bugRate:             { label: "Bug Rate",          unit: "ratio",   icon: "⚠", desc: "Escaped bugs ÷ issues completed" },
  deploymentFrequency: { label: "Deploy Frequency",  unit: "deploys", icon: "🚀", desc: "Successful prod deploys this month" },
  prThroughput:        { label: "PR Throughput",     unit: "PRs",     icon: "⬆", desc: "Merged pull requests this month" },
};

const MKEYS = Object.keys(METRIC_META);

function StatusDot({ status }) {
  return <span className={`status-dot status-${status}`} />;
}

function SkeletonCard() {
  return (
    <div className="metric-card skeleton-card">
      <div className="sk-icon" />
      <div className="sk-value" />
      <div className="sk-label" />
    </div>
  );
}

function LoadingState() {
  return (
    <div className="ic-main">
      <div className="dev-header skeleton-header">
        <div className="sk-avatar" />
        <div>
          <div className="sk-name" />
          <div className="sk-meta" />
        </div>
      </div>
      <div className="metrics-grid">
        {MKEYS.map((k) => <SkeletonCard key={k} />)}
      </div>
      <div className="loading-msg">
        <span className="loading-dot" />
        Fetching metrics from API...
      </div>
    </div>
  );
}

function MetricCard({ metricKey, value, onClick, active }) {
  const meta = METRIC_META[metricKey];
  const status = getStatus(metricKey, value);
  return (
    <button
      className={`metric-card ${active ? "metric-card--active" : ""} metric-card--${status}`}
      onClick={onClick}
    >
      <div className="mc-header">
        <span className="mc-icon">{meta.icon}</span>
        <StatusDot status={status} />
      </div>
      <div className="mc-value">{value}</div>
      <div className="mc-label">{meta.label}</div>
      <div className="mc-unit">{meta.unit}</div>
    </button>
  );
}

function SparkBar({ values }) {
  const max = Math.max(...values, 1);
  return (
    <div className="sparkbar">
      {values.map((v, i) => (
        <div key={i} className="sparkbar-bar"
          style={{ height: `${Math.max(4, (v / max) * 100)}%` }}
          title={`${v} days`}
        />
      ))}
    </div>
  );
}

function MetricDetail({ metricKey, metrics }) {
  const meta = METRIC_META[metricKey];
  const value = metrics[metricKey];
  const status = getStatus(metricKey, value);
  const b = BENCHMARKS[metricKey];
  const bars =
    metricKey === "avgLeadTime"  ? metrics.raw.leadTimes  :
    metricKey === "avgCycleTime" ? metrics.raw.cycleTimes : null;

  return (
    <div className={`metric-detail metric-detail--${status}`}>
      <div className="md-top">
        <div>
          <div className="md-label">{meta.label}</div>
          <div className="md-desc">{meta.desc}</div>
        </div>
        <div className={`md-badge md-badge--${status}`}>
          {status === "good" ? "Healthy" : status === "warn" ? "Watch" : "Needs Attention"}
        </div>
      </div>
      <div className="md-value-row">
        <span className="md-big-value">{value}</span>
        <span className="md-unit">{meta.unit}</span>
      </div>
      {bars && bars.length > 0 && (
        <div className="md-spark-section">
          <div className="md-spark-label">Per-task breakdown</div>
          <SparkBar values={bars} />
        </div>
      )}
      <div className="md-benchmark">
        <div className="bench-row"><span className="bench-label">Good ≤</span><span className="bench-val bench-good">{b.good} {meta.unit}</span></div>
        <div className="bench-row"><span className="bench-label">Warning ≤</span><span className="bench-val bench-warn">{b.warn} {meta.unit}</span></div>
        <div className="bench-row"><span className="bench-label">Your value</span><span className={`bench-val bench-${status}`}>{value} {meta.unit}</span></div>
      </div>
    </div>
  );
}

function DevSidebarItem({ dev, selected, onClick }) {
  const { data: metrics, loading } = useMetrics(dev.id);
  const good = metrics ? MKEYS.filter(k => getStatus(k, metrics[k]) === "good").length : 0;
  const bad  = metrics ? MKEYS.filter(k => getStatus(k, metrics[k]) === "bad").length  : 0;

  return (
    <button
      className={`dev-item ${dev.id === selected ? "dev-item--active" : ""}`}
      onClick={onClick}
    >
      <div className="dev-avatar">{dev.name.split(" ").map(n => n[0]).join("")}</div>
      <div className="dev-info">
        <div className="dev-name">{dev.name}</div>
        <div className="dev-role">{dev.role}</div>
      </div>
      <div className="dev-health">
        {loading ? <span className="hp-loading">···</span> : (
          <>
            {bad > 0 && <span className="health-pill health-bad">{bad}</span>}
            <span className="health-pill health-good">{good}</span>
          </>
        )}
      </div>
    </button>
  );
}

export default function ICDashboard({ selectedDev, onSelectDev }) {
  const [activeMetric, setActiveMetric] = useState("avgLeadTime");
  const { data: developers, loading: devsLoading } = useDevelopers();
  const { data: metrics, loading: metricsLoading } = useMetrics(selectedDev);

  const dev = developers?.find(d => d.id === selectedDev);
  const interpretation = metrics ? interpretMetrics(metrics) : null;
  const healthyCount = metrics
    ? MKEYS.filter(k => getStatus(k, metrics[k]) === "good").length
    : 0;

  return (
    <div className="ic-dashboard">
      <aside className="dev-sidebar">
        <div className="sidebar-title">Team Members</div>
        {devsLoading ? (
          <div className="sidebar-loading">Loading team...</div>
        ) : (
          developers.map(d => (
            <DevSidebarItem key={d.id} dev={d} selected={selectedDev} onClick={() => onSelectDev(d.id)} />
          ))
        )}
        <div className="api-status">
          <span className="api-dot" />
          <span>Mock API · Active</span>
        </div>
      </aside>

      {metricsLoading || !metrics || !dev ? (
        <LoadingState />
      ) : (
        <div className="ic-main">
          <div className="dev-header">
            <div className="dh-avatar">{dev.name.split(" ").map(n => n[0]).join("")}</div>
            <div>
              <div className="dh-name">{dev.name}</div>
              <div className="dh-meta">{dev.role} · {dev.team} team · {dev.tenure_months} months</div>
            </div>
            <div className="dh-health-summary">
              <span className="hs-number">{healthyCount}/{MKEYS.length}</span>
              <span className="hs-label">metrics healthy</span>
            </div>
            <div className="endpoint-tag">
              <span className="endpoint-method">GET</span>
              <span className="endpoint-path">/api/metrics/{selectedDev}</span>
            </div>
          </div>

          <div className="metrics-grid">
            {MKEYS.map(k => (
              <MetricCard key={k} metricKey={k} value={metrics[k]}
                active={activeMetric === k} onClick={() => setActiveMetric(k)} />
            ))}
          </div>

          <div className="detail-row">
            <MetricDetail metricKey={activeMetric} metrics={metrics} />
            <div className="interpretation-panel">
              <div className="ip-title"><span className="ip-icon">◈</span> What's happening</div>
              <div className="ip-story">{interpretation.story}</div>
              {interpretation.strengths.length > 0 && (
                <div className="ip-section">
                  <div className="ip-section-title good-title">✓ Strengths</div>
                  {interpretation.strengths.map((s, i) => <div key={i} className="ip-item ip-item--good">{s}</div>)}
                </div>
              )}
              {interpretation.issues.length > 0 && (
                <div className="ip-section">
                  <div className="ip-section-title warn-title">⚠ Signals to watch</div>
                  {interpretation.issues.map((s, i) => <div key={i} className="ip-item ip-item--warn">{s}</div>)}
                </div>
              )}
              {interpretation.suggestions.length > 0 && (
                <div className="ip-section">
                  <div className="ip-section-title action-title">→ Next steps</div>
                  {interpretation.suggestions.map((s, i) => <div key={i} className="ip-item ip-item--action">{s}</div>)}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
