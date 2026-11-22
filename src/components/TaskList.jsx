import { TASK_STATUSES } from "../data/tasks.js";
import { formatDueDate } from "../utils/tasks.js";

function getPriorityClass(priority) {
  return priority.toLowerCase();
}

function DueDate({ value }) {
  return (
    <time className="due-date" dateTime={value || undefined}>
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <rect x="3" y="4" width="14" height="13" rx="2" />
        <path d="M6 2v4M14 2v4M3 8h14" />
      </svg>
      <span>{formatDueDate(value)}</span>
    </time>
  );
}

export default function TaskList({ tasks, onEdit, onDelete, onStatusChange }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state" role="status">
        <span className="empty-icon" aria-hidden="true">⌕</span>
        <h4>No tasks match these filters</h4>
        <p>Try a different search or filter, or create a new task.</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <article className={`task-row${task.status === "Completed" ? " is-complete" : ""}`} key={task.id}>
          <label className={`status-control${task.status === "Completed" ? " completed" : ""}`}>
            <span className="sr-only">Status for {task.title}</span>
            <select
              value={task.status}
              onChange={(event) => onStatusChange(task.id, event.target.value)}
              aria-label={`Status for ${task.title}`}
            >
              {TASK_STATUSES.map((status) => <option key={status}>{status}</option>)}
            </select>
            <span className="status-check" aria-hidden="true">{task.status === "Completed" ? "✓" : ""}</span>
          </label>
          <div className="task-copy">
            <h4>{task.title}</h4>
            {task.description && <p>{task.description}</p>}
            <div className="task-meta task-meta-mobile">
              <span className={`tag category-tag ${task.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>{task.category}</span>
              <span className={`tag priority-tag ${getPriorityClass(task.priority)}`}>{task.priority}</span>
              <DueDate value={task.dueDate} />
            </div>
          </div>
          <span className={`tag category-tag desktop-category ${task.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>{task.category}</span>
          <span className={`tag priority-tag desktop-priority ${getPriorityClass(task.priority)}`}>{task.priority}</span>
          <div className="desktop-date"><DueDate value={task.dueDate} /></div>
          <div className="task-actions">
            <button type="button" className="icon-button" aria-label={`Edit ${task.title}`} onClick={() => onEdit(task)}>
              <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 13.5L13.5 4l2.5 2.5-9.5 9.5L3 17zM11.5 6l2.5 2.5" /></svg>
            </button>
            <button type="button" className="icon-button delete-action" aria-label={`Delete ${task.title}`} onClick={() => onDelete(task)}>
              <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 6h12M8 6V4h4v2m-6 0 1 10h6l1-10M8.5 9v4M11.5 9v4" /></svg>
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
