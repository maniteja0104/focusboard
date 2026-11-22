# FocusBoard

A responsive personal task dashboard built with React, Vite, plain CSS and localStorage.

## Features
Create, edit and delete tasks (with confirmation) · status changes · live search by title · status and priority filters that combine · reset filters · dynamic stats and completion % · three-slide Focus Notes carousel (circular, indicators) · localStorage persistence · responsive at 390 / 768 / 1440px · keyboard-accessible modals.

## Stack
React 18, Vite, JavaScript ES6+, CSS3, React Hooks, localStorage, lucide-react.

## Structure
`src/components` (Sidebar, Header, StatCard, FocusNotes, TaskList, TaskCard, TaskForm, Modal, SearchBar, FilterTabs, PriorityFilter, DeleteConfirmation, EmptyState) · `src/hooks/useLocalStorage.js` · `src/data/sampleTasks.js` · `src/App.jsx` · `src/index.css`

## Run
```
npm install
npm run dev      # development
npm run build    # outputs dist/
npm run preview  # test the production build
```

## State management
`App.jsx` owns the full `tasks` array (via `useLocalStorage`) plus UI state: search, status, priority, open form and delete target. Stats and the visible list are derived with `useMemo` from the complete array, so filtering never loses data. Updates use `map`/`filter`/spread, never mutation.

## localStorage
Key `focusboard_tasks`. On start the hook parses saved JSON; if it is missing, invalid or not an array, sample tasks load instead. Every change to the full task list is saved with `JSON.stringify`.

## Manual test checklist
Create (valid, empty title, spaces-only title, cancel) · edit · delete (cancel/confirm) · status changes · search `react`/`REACT`/`Rea` · filter combos · carousel wrap-around · refresh after each change · invalid JSON (`localStorage.setItem('focusboard_tasks','x')`, reload) · 390/768/1440px widths.

## Links
Deployment URL: _add after deploying_ · GitHub: _add repository URL_

## Known limitations
No Figma file was available when this was built, so the design is an original interpretation and not pixel-matched. Sidebar items other than Dashboard are visual only. Automated tests are not included.

## Publish
```
git init && git add . && git commit -m "Initial FocusBoard"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```
Deploy on Vercel or Netlify: build command `npm run build`, output directory `dist`.
