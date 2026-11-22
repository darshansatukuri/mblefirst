const navItems = [
  { label: "Overview", href: "#overview", icon: "grid" },
  { label: "My tasks", href: "#tasks", icon: "list" },
];

function NavIcon({ name }) {
  if (name === "list") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

export function Brand() {
  return (
    <a className="brand" href="#overview" aria-label="FocusBoard home">
      <span className="brand-mark" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
      <span>FocusBoard</span>
    </a>
  );
}

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <Brand />
      <p className="sidebar-label">Workspace</p>
      <nav aria-label="Main navigation" className="sidebar-nav">
        {navItems.map((item, index) => (
          <a className={`nav-link${index === 0 ? " active" : ""}`} href={item.href} key={item.label}>
            <NavIcon name={item.icon} />
            <span>{item.label}</span>
          </a>
        ))}
        <span className="nav-link nav-placeholder" aria-label="Calendar, not included in this assessment">
          <span className="nav-placeholder-icon" aria-hidden="true">▦</span>
          <span>Calendar</span>
        </span>
        <span className="nav-link nav-placeholder" aria-label="Settings, not included in this assessment">
          <span className="nav-placeholder-icon" aria-hidden="true">⚙</span>
          <span>Settings</span>
        </span>
      </nav>
      <div className="sidebar-foot">
        <span className="avatar">JD</span>
        <span><strong>Jamie Doe</strong><small>Personal workspace</small></span>
      </div>
    </aside>
  );
}
