import { useEffect, useRef, useState } from "react";
import { TASK_PRIORITIES, TASK_STATUSES } from "../data/tasks.js";
import { createTaskId } from "../utils/tasks.js";

const EMPTY_FORM = {
  title: "",
  description: "",
  status: "To do",
  priority: "Medium",
  dueDate: "",
};

export default function TaskFormDialog({ task, onClose, onSave }) {
  const [form, setForm] = useState(task ? { ...task } : { ...EMPTY_FORM });
  const [error, setError] = useState("");
  const titleRef = useRef(null);
  const openerRef = useRef(null);

  useEffect(() => {
    openerRef.current = document.activeElement;
    titleRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      openerRef.current?.focus?.();
    };
  }, []);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (name === "title" && value.trim()) setError("");
  }

  function submitForm(event) {
    event.preventDefault();
    const title = form.title.trim();
    if (!title) {
      setError("Enter a task title to continue.");
      titleRef.current?.focus();
      return;
    }

    onSave({
      ...form,
      title,
      description: form.description.trim(),
      category: task?.category ?? "General",
      id: task?.id ?? createTaskId(),
    });
  }

  return (
    <div className="dialog-backdrop" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section
        className="task-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        onKeyDown={(event) => {
          if (event.key === "Tab") {
            const focusable = [...event.currentTarget.querySelectorAll(
              'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled])',
            )];
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault();
              last?.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault();
              first?.focus();
            }
          }
        }}
      >
        <header className="dialog-header">
          <div>
            <p className="dialog-kicker">{task ? "KEEP YOUR WORK IN FOCUS" : "PLAN YOUR NEXT WIN"}</p>
            <h2 id="dialog-title">{task ? "Edit task" : "Create new task"}</h2>
            <p>Add your task details to stay on top of your work.</p>
          </div>
          <button className="icon-button close-button" type="button" onClick={onClose} aria-label="Close task form">
            <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 5l10 10M15 5L5 15" /></svg>
          </button>
        </header>
        <form onSubmit={submitForm} noValidate>
          <div className="form-body">
            <label className="field" htmlFor="task-title">
              <span className="field-label">Task title <b aria-hidden="true">*</b></span>
              <input
                ref={titleRef}
                id="task-title"
                name="title"
                value={form.title}
                onChange={updateField}
                maxLength={120}
                placeholder="e.g. Update pricing page"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "title-error" : undefined}
                required
              />
              {error && <span className="field-error" id="title-error" role="alert">{error}</span>}
            </label>
            <label className="field" htmlFor="task-description">
              <span className="field-label">Description</span>
              <textarea
                id="task-description"
                name="description"
                value={form.description}
                onChange={updateField}
                maxLength={500}
                placeholder="Add notes about this task"
                rows="4"
              />
            </label>
            <div className="field-row">
              <label className="field" htmlFor="task-status">
                <span className="field-label">Status</span>
                <select id="task-status" name="status" value={form.status} onChange={updateField}>
                  {TASK_STATUSES.map((status) => <option key={status}>{status}</option>)}
                </select>
              </label>
              <label className="field" htmlFor="task-priority">
                <span className="field-label">Priority</span>
                <select id="task-priority" name="priority" value={form.priority} onChange={updateField}>
                  {TASK_PRIORITIES.map((priority) => <option key={priority}>{priority}</option>)}
                </select>
              </label>
            </div>
            <label className="field" htmlFor="task-date">
              <span className="field-label">Due date</span>
              <input id="task-date" name="dueDate" type="date" value={form.dueDate} onChange={updateField} />
            </label>
            <p className="required-note"><b aria-hidden="true">*</b> Required field</p>
          </div>
          <footer className="dialog-footer">
            <button className="button secondary-button" type="button" onClick={onClose}>Cancel</button>
            <button className="button primary-button" type="submit">{task ? "Save changes" : "Create task"}</button>
          </footer>
        </form>
      </section>
    </div>
  );
}
