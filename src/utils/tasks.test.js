import { describe, expect, it } from "vitest";
import { filterTasks, getTaskStats, isTask } from "./tasks.js";

const tasks = [
  { id: "1", title: "Design landing page", description: "", category: "Design", status: "In progress", priority: "High", dueDate: "2026-11-29" },
  { id: "2", title: "Review copy", description: "", category: "Content", status: "Completed", priority: "Low", dueDate: "" },
  { id: "3", title: "Plan usability test", description: "", category: "Research", status: "To do", priority: "High", dueDate: "2026-12-02" },
];

describe("task utilities", () => {
  it("derives all summary values and handles an empty task list", () => {
    expect(getTaskStats(tasks)).toEqual({ total: 3, inProgress: 1, completed: 1, completionRate: 33 });
    expect(getTaskStats([])).toEqual({ total: 0, inProgress: 0, completed: 0, completionRate: 0 });
  });

  it("combines case-insensitive title search, status, and priority filters", () => {
    expect(filterTasks(tasks, { query: "DESIGN", status: "In progress", priority: "High" })).toEqual([tasks[0]]);
    expect(filterTasks(tasks, { status: "Completed", priority: "High" })).toEqual([]);
  });

  it("validates stored task shape and status values", () => {
    expect(isTask(tasks[0])).toBe(true);
    expect(isTask({ ...tasks[0], status: "Done" })).toBe(false);
    expect(isTask({ ...tasks[0], dueDate: "not-a-date" })).toBe(false);
    expect(isTask({ ...tasks[0], dueDate: "2026-02-31" })).toBe(false);
  });
});
