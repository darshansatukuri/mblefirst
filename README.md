# FocusBoard

A responsive, single-user task dashboard built for the MobileFirst frontend assignment. Tasks can be created, edited, deleted, searched, filtered, and updated without a backend; changes are saved in the current browser.

## Features

- Six seeded example tasks, each with a unique ID, category, status, priority, and due date.
- Create and edit form with a required, trimmed title and an accessible validation message.
- Delete confirmation and per-task status updates.
- Combined case-insensitive title search, status tabs, and priority filter.
- Task totals, in-progress and completed counts, and completion rate derived from task data.
- Three-slide Focus Notes carousel with previous/next controls and direct slide indicators.
- Responsive desktop sidebar and mobile bottom navigation.
- Browser persistence using `localStorage`; saved tasks are loaded before sample data is considered.
- Accessible names, semantic sections, keyboard focus styling, dialog focus management, and reduced-motion support.

## Technology and architecture

- React 18 with Vite; JavaScript and CSS.
- `src/App.jsx` composes the dashboard and owns transient search/filter/dialog UI state.
- `src/hooks/useTasks.js` is the single source of truth for task data and persistence.
- `src/data/tasks.js` contains the sample records and allowed status/priority values.
- `src/utils/tasks.js` contains pure validation, filtering, date formatting, and statistics helpers.
- `src/components/` contains the sidebar, task list/form, statistics, and carousel UI.

React hooks are sufficient for this single-page, single-user scope: `useState` keeps UI and task state predictable, `useMemo` derives filtered tasks and metrics, and an effect persists task updates. No state library, backend, database, login, API, or environment configuration is needed.

## Requirements and implementation notes

- New tasks use the `General` category because the supplied create-form requirements do not include a category field. Editing preserves the task's existing category.
- Calendar and Settings are intentionally non-interactive visual placeholders; those screens are outside the assignment scope.
- The provided desktop/mobile dashboard images and all three Focus Notes references informed the UI. The live Figma editor was not fully inspectable in this environment, so exact measurements and color values remain approximations.
- The separate Notion reference text was not available in readable form during implementation.

## Getting started

Requirements: Node.js 20.19+ or 22.12+ (Vite 6), and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To create a production build:

```bash
npm run build
npm run preview
```

### Environment variables

No environment variables are required. `.env.example` is included to make this explicit.

## Testing

Run the focused unit tests and production build:

```bash
npm test
npm run build
```

The unit tests cover derived statistics, empty-state arithmetic, combined filters, and validation of persisted task shapes.

### Results from this implementation

- `npm test`: 3 tests passed.
- `npm run build`: passed.
- `npm audit`: 0 vulnerabilities.
- Browser viewport checks at 390 px, 768 px, and 1440 px: no horizontal overflow.
- Browser interaction checks: blank-title error, task create/edit/delete, combined search and priority filtering, status-derived counts, save/restore after refresh, and carousel next/previous navigation all behaved as expected.

## API

There is no API or backend in this frontend-only assignment. Task data stays in browser `localStorage` under `focusboard.tasks.v1`.

## Screenshots and submission

Captured browser screenshots of the running application are included:

- Desktop, 1440 × 1000: [`screenshots/desktop.png`](./screenshots/desktop.png)
- Mobile, 390 × 1128: [`screenshots/mobile.png`](./screenshots/mobile.png)

- Hosted URL: not deployed yet.
- Public GitHub repository: not created in this workspace.

Deployment can use Vercel, Netlify, or another static host: connect the public repository, use `npm run build`, and publish the generated `dist/` directory. No server-side environment variables are needed.
