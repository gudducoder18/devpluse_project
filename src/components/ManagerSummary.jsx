import { useTeamMetrics } from "../hooks/useApi";
import { getStatus } from "../utils/metrics";

const MKEYS = ["avgLeadTime","avgCycleTime","bugRate","deploymentFrequency","prThroughput"];
const LABELS = {
  avgLeadTime:"Lead Time", avgCycleTime:"Cycle Time",
  bugRate:"Bug Rate", deploymentFrequency:"Deploys", prThroughput:"PR Thrpt"
};

function StatusCell({ status, value }) {
  return (
    <td className={`table-cell cell-${status}`}>
      <span className="cell-val">{value}</span>
    </td>
  );
}

function LoadingRow() {
  return (
    <tr className="table-row">
      <td colSpan={9} style={{padding:"20px",textAlign:"center",color:"var(--muted)"}}>
        <span className="loading-dot" /> Fetching team data from API...
      </td>
    </tr>
  );
}

export default function ManagerSummary() {
  
  const { data, loading, error } = useTeamMetrics();

  if (error) return <div className="manager-view" style={{color:"var(--bad)"}}>API Error: {error}</div>;

  const devMetrics = data?.developers || [];
  const teamAvg   = data?.teamAverage || {};

  return (
    <div className="manager-view">
      <div className="manager-header">
        <div className="mh-title">Team Overview</div>
        <div className="mh-sub">
          May 2024 · {loading ? "..." : `${devMetrics.length} contributors`}
          <span className="endpoint-tag" style={{marginLeft:12}}>
            <span className="endpoint-method">GET</span>
            <span className="endpoint-path">/api/team/metrics</span>
          </span>
        </div>
      </div>

      
      <div className="summary-cards">
        {MKEYS.map(k => {
          const status = loading ? "neutral" : getStatus(k, teamAvg[k]);
          return (
            <div key={k} className={`summary-card sc-${status}`}>
              <div className="sc-label">{LABELS[k]}</div>
              <div className="sc-value">{loading ? "—" : teamAvg[k]}</div>
              <div className="sc-tag">team avg</div>
            </div>
          );
        })}
      </div>

      <div className="table-wrapper">
        <table className="metrics-table">
          <thead>
            <tr>
              <th className="th-name">Developer</th>
              <th>Team</th>
              {MKEYS.map(k => <th key={k}>{LABELS[k]}</th>)}
              <th>Health</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <LoadingRow />
            ) : (
              <>
                {devMetrics.map(({ id, name, team, role, metrics }) => {
                  const badCount  = MKEYS.filter(k => getStatus(k, metrics[k]) === "bad").length;
                  const overallSt = badCount >= 3 ? "b" : badCount >= 1 ? "w" : "g";
                  const lbl       = badCount === 0 ? "Healthy" : badCount >= 3 ? "At Risk" : "Watch";
                  return (
                    <tr key={id} className="table-row">
                      <td className="td-name">
                        <div className="td-avatar">{name.split(" ").map(n=>n[0]).join("")}</div>
                        <span>{name}</span>
                      </td>
                      <td className="td-team">{team}</td>
                      {MKEYS.map(k => (
                        <StatusCell key={k} status={getStatus(k, metrics[k])} value={metrics[k]} />
                      ))}
                      <td className="td-health">
                        <span className={`health-badge hb-${overallSt}`}>{lbl}</span>
                      </td>
                    </tr>
                  );
                })}
                <tr className="table-row avg-row">
                  <td className="td-name avg-label">Team Average</td>
                  <td />
                  {MKEYS.map(k => (
                    <StatusCell key={k} status={getStatus(k, teamAvg[k])} value={teamAvg[k]} />
                  ))}
                  <td />
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>

    
      {!loading && (
        <div className="flags-section">
          <div className="flags-title">⚑ Signals requiring attention</div>
          <div className="flags-grid">
            {devMetrics.flatMap(({ id, name, metrics }) =>
              MKEYS.filter(k => getStatus(k, metrics[k]) === "bad").map(k => (
                <div key={`${id}-${k}`} className="flag-card">
                  <div className="flag-dev">{name}</div>
                  <div className="flag-metric">{LABELS[k]}</div>
                  <div className="flag-val">{metrics[k]}</div>
                </div>
              ))
            )}
            {devMetrics.every(({ metrics }) => MKEYS.every(k => getStatus(k, metrics[k]) !== "bad")) && (
              <div className="no-flags">No critical signals this month. Team is performing well.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
