import { Menu, Plus, Bell } from 'lucide-react';
export default function Header({ onMenu, onAdd }) {
  return (
    <header className="header">
      <button className="icon-btn mobile-only" onClick={onMenu} aria-label="Open menu"><Menu /></button>
      <div className="grow"><h1>Dashboard</h1><p className="muted">Plan the day, finish what matters.</p></div>
      <button className="icon-btn" aria-label="Notifications"><Bell /></button>
      <button className="btn primary" onClick={onAdd}><Plus aria-hidden="true" />Add task</button>
    </header>
  );
}
