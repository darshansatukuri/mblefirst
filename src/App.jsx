import { useMemo, useState } from "react";
import FocusNotes from "./components/FocusNotes.jsx";
import Sidebar, { Brand } from "./components/Sidebar.jsx";
import StatsCards from "./components/StatsCards.jsx";
import TaskFormDialog from "./components/TaskFormDialog.jsx";
import TaskList from "./components/TaskList.jsx";
import { TASK_PRIORITIES } from "./data/tasks.js";
import { useTasks } from "./hooks/useTasks.js";
import { filterTasks, getTaskStats } from "./utils/tasks.js";

const tabs = ["All", "In progress", "Completed"];

function MobileNavigation() {
  return (
    <nav className="mobile-nav" aria-label="Main navigation">
      <a className="active" href="#overview"><span aria-hidden="true">▦</span><span>Overview</span></a>
      <a href="#tasks"><span aria-hidden="true">☷</span><span>Tasks</span></a>
      <span aria-disabled="true" title="Calendar is not included in this assessment"><span aria-hidden="true">▣</span><span>Calendar</span></span>
      <span aria-disabled="true" title="Settings are not included in this assessment"><span aria-hidden="true">⚙</span><span>Settings</span></span>
    </nav>
  );
}

export default function App() {
  const { tasks, storageMessage, addTask, updateTask, deleteTask, updateStatus } = useTasks();
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [dialogTask, setDialogTask] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const stats = useMemo(() => getTaskStats(tasks), [tasks]);
  const visibleTasks = useMemo(
    () => filterTasks(tasks, { query: search, status: statusFilter, priority: priorityFilter }),
    [tasks, search, statusFilter, priorityFilter],
  );
  const openNewTask = () => {
    setDialogTask(null);
    setDialogOpen(true);
  };
  const closeDialog = () => setDialogOpen(false);

  function saveTask(task) {
    if (dialogTask) updateTask(task);
    else addTask(task);
    closeDialog();
  }

  function confirmDelete(task) {
    if (window.confirm(`Delete "${task.title}"? This action cannot be undone.`)) {
      deleteTask(task.id);
    }
  }

  function selectTab(tab) {
    setStatusFilter(tab);
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-column">
        <header className="topbar">
          <div className="mobile-brand"><Brand /></div>
          <div className="breadcrumbs"><span>Workspace</span><b aria-hidden="true">/</b><strong>Overview</strong></div>
          <button className="profile-button" type="button" aria-label="Profile: Jamie Doe"><span>JD</span></button>
        </header>
        <main className="dashboard-content">
          <section className="welcome" id="overview">
            <div>
              <p className="welcome-kicker">YOUR PERSONAL WORKSPACE</p>
              <h1>Your work,<br className="mobile-break" /> in focus.</h1>
              <p className="desktop-welcome">Plan your day, stay organized, and celebrate small wins.</p>
              <p className="mobile-welcome">Stay organized and keep moving forward.</p>
            </div>
            <button className="new-task-button" type="button" aria-label="Create task" onClick={openNewTask}>
              <span aria-hidden="true">+</span><span className="button-label">New task</span>
            </button>
          </section>

          <FocusNotes tasks={tasks} completionRate={stats.completionRate} />

          <section className="overview-section" aria-labelledby="overview-title">
            <div className="section-heading">
              <div><p className="section-kicker">AT A GLANCE</p><h2 id="overview-title">Overview</h2></div>
            </div>
            <StatsCards stats={stats} />
          </section>

          <section className="tasks-section" id="tasks" aria-labelledby="tasks-title">
            <header className="tasks-header">
              <div>
                <p className="section-kicker">STAY ON TRACK</p>
                <h2 id="tasks-title">My tasks</h2>
                <p className="section-description">
                  <span className="desktop-description">Manage and track everything in one place.</span>
                  <span className="mobile-description">Your priorities for this week.</span>
                </p>
              </div>
              <button className="text-link" type="button" onClick={() => { setStatusFilter("All"); setPriorityFilter("All"); setSearch(""); }}>
                View all tasks
              </button>
            </header>
            <div className="task-toolbar">
              <div className="task-tabs" role="tablist" aria-label="Filter tasks by status">
                {tabs.map((tab) => {
                  const count = tab === "All" ? tasks.length : tasks.filter((task) => task.status === tab).length;
                  return (
                    <button
                      type="button"
                      role="tab"
                      aria-selected={statusFilter === tab}
                      className={statusFilter === tab ? "active" : ""}
                      key={tab}
                      onClick={() => selectTab(tab)}
                    >
                      {tab} <span className="tab-count">{count}</span>
                    </button>
                  );
                })}
              </div>
              <div className="task-filters">
                <label className="search-box">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="5.5" /><path d="M15.5 15.5L20 20" /></svg>
                  <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find a task..." aria-label="Search task titles" />
                </label>
                <label className="priority-filter">
                  <span>Priority:</span>
                  <select aria-label="Filter by priority" value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value)}>
                    <option value="All">All</option>
                    {TASK_PRIORITIES.map((priority) => <option key={priority}>{priority}</option>)}
                  </select>
                </label>
              </div>
            </div>
            <TaskList
              tasks={visibleTasks}
              onEdit={(task) => { setDialogTask(task); setDialogOpen(true); }}
              onDelete={confirmDelete}
              onStatusChange={updateStatus}
            />
          </section>
          {storageMessage && <p className="storage-message" role="status">{storageMessage}</p>}
        </main>
      </div>
      <MobileNavigation />
      {dialogOpen && <TaskFormDialog key={dialogTask?.id ?? "new-task"} task={dialogTask} onClose={closeDialog} onSave={saveTask} />}
    </div>
  );
}
