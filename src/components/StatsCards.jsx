export default function StatsCards({ stats }) {
  return (
    <section className="stats-grid" aria-label="Task overview">
      <article className="stat-card">
        <span className="stat-icon total-icon" aria-hidden="true">☷</span>
        <div><strong>{stats.total}</strong><span>Total tasks</span></div>
        <small>Across all projects</small>
      </article>
      <article className="stat-card">
        <span className="stat-icon progress-icon" aria-hidden="true">◷</span>
        <div><strong>{stats.inProgress}</strong><span>In progress</span></div>
        <small>Keep the momentum</small>
      </article>
      <article className="stat-card">
        <span className="stat-icon complete-icon" aria-hidden="true">✓</span>
        <div><strong>{stats.completed}</strong><span>Completed</span></div>
        <small>{stats.completionRate}% of all tasks</small>
      </article>
      <p className="mobile-extra-stats">
        <span><strong>{stats.inProgress}</strong> in progress</span>
        <span><strong>{stats.completionRate}%</strong> complete</span>
      </p>
    </section>
  );
}
