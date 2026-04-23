import { useState } from "react";
import ICDashboard from "./components/ICDashboard";
import ManagerSummary from "./components/ManagerSummary";
import { developers } from "./data/mockData";

export default function App() {
  const [view, setView] = useState("ic");
  const [selectedDev, setSelectedDev] = useState(developers[0].id);

  return (
    <div className="app-shell">
      <header className="top-nav">
        <div className="nav-brand">
          <span className="brand-icon">◈</span>
          <span className="brand-name">DevPulse</span>
          <span className="brand-tag">Developer Productivity</span>
        </div>
        <nav className="nav-tabs">
          <button
            className={`nav-tab ${view === "ic" ? "active" : ""}`}
            onClick={() => setView("ic")}
          >
            <span className="tab-icon">⬡</span> IC Profile
          </button>
          <button
            className={`nav-tab ${view === "manager" ? "active" : ""}`}
            onClick={() => setView("manager")}
          >
            <span className="tab-icon">⬢</span> Manager View
          </button>
        </nav>
        <div className="nav-period">May 2024</div>
      </header>

      <main className="main-content">
        {view === "ic" ? (
          <ICDashboard
            developers={developers}
            selectedDev={selectedDev}
            onSelectDev={setSelectedDev}
          />
        ) : (
          <ManagerSummary developers={developers} />
        )}
      </main>
    </div>
  );
}
