import { TASK_PRIORITIES, TASK_STATUSES } from "../data/tasks.js";

export function isTask(value) {
  const validDueDate =
    value?.dueDate === "" ||
    (typeof value?.dueDate === "string" &&
      /^\d{4}-\d{2}-\d{2}$/.test(value.dueDate) &&
      (() => {
        const [year, month, day] = value.dueDate.split("-").map(Number);
        const parsed = new Date(Date.UTC(year, month - 1, day));
        return (
          parsed.getUTCFullYear() === year &&
          parsed.getUTCMonth() === month - 1 &&
          parsed.getUTCDate() === day
        );
      })());

  return (
    value !== null &&
    typeof value === "object" &&
    typeof value.id === "string" &&
    value.id.length > 0 &&
    typeof value.title === "string" &&
    typeof value.description === "string" &&
    typeof value.category === "string" &&
    TASK_STATUSES.includes(value.status) &&
    TASK_PRIORITIES.includes(value.priority) &&
    validDueDate
  );
}

export function getTaskStats(tasks) {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.status === "Completed").length;
  return {
    total,
    inProgress: tasks.filter((task) => task.status === "In progress").length,
    completed,
    completionRate: total === 0 ? 0 : Math.round((completed / total) * 100),
  };
}

export function filterTasks(tasks, { query = "", status = "All", priority = "All" } = {}) {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  return tasks.filter((task) => {
    const matchesQuery = task.title.toLocaleLowerCase().includes(normalizedQuery);
    const matchesStatus = status === "All" || task.status === status;
    const matchesPriority = priority === "All" || task.priority === priority;
    return matchesQuery && matchesStatus && matchesPriority;
  });
}

export function formatDueDate(value) {
  if (!value) return "No due date";
  const [year, month, day] = value.split("-").map(Number);
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(
    new Date(year, month - 1, day),
  );
}

export function createTaskId() {
  return globalThis.crypto?.randomUUID?.() ??
    `task-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
