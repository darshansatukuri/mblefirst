import { useEffect, useState } from "react";
import { INITIAL_TASKS } from "../data/tasks.js";
import { isTask } from "../utils/tasks.js";

const STORAGE_KEY = "focusboard.tasks.v1";

function readTasks() {
  if (typeof window === "undefined") return { tasks: INITIAL_TASKS, error: "" };

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === null) return { tasks: INITIAL_TASKS, error: "" };

    const parsed = JSON.parse(saved);
    if (
      Array.isArray(parsed) &&
      parsed.every(isTask) &&
      new Set(parsed.map((task) => task.id)).size === parsed.length
    ) {
      return { tasks: parsed, error: "" };
    }

    return {
      tasks: INITIAL_TASKS,
      error: "Saved tasks were invalid, so the sample tasks were restored.",
    };
  } catch {
    return {
      tasks: INITIAL_TASKS,
      error: "Saved tasks could not be read. Your sample tasks are available for this session.",
    };
  }
}

export function useTasks() {
  const [initialState] = useState(readTasks);
  const [tasks, setTasks] = useState(initialState.tasks);
  const [storageMessage, setStorageMessage] = useState(initialState.error);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      setStorageMessage("");
    } catch {
      setStorageMessage("Changes could not be saved in this browser. Keep this tab open to retain them.");
    }
  }, [tasks]);

  function addTask(task) {
    setTasks((current) => [task, ...current]);
  }

  function updateTask(updatedTask) {
    setTasks((current) =>
      current.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
  }

  function deleteTask(id) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  function updateStatus(id, status) {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, status } : task)),
    );
  }

  return { tasks, storageMessage, addTask, updateTask, deleteTask, updateStatus };
}
