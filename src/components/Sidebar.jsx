import { LayoutDashboard, ListChecks, CalendarDays, Settings, Target, X } from 'lucide-react';
const items = [
  { id: 'dashboard', label: 'Dashboard', Icon: LayoutDashboard },
  { id: 'tasks', label: 'My tasks', Icon: ListChecks },
  { id: 'calendar', label: 'Calendar', Icon: CalendarDays },
  { id: 'settings', label: 'Settings', Icon: Settings },
];
export default function Sidebar({ active, onSelect, open, onClose }) {
  return (
    <>
      {open && <div className="scrim" onClick={onClose} aria-hidden="true" />}
      <aside className={`sidebar ${open ? 'open' : ''}`} aria-label="Primary">
        <div className="brand"><Target aria-hidden="true" /><span>FocusBoard</span>
          <button className="icon-btn mobile-only" onClick={onClose} aria-label="Close menu"><X /></button></div>
        <nav><ul>{items.map(({ id, label, Icon }) => (
          <li key={id}><button className={`nav-item ${active === id ? 'active' : ''}`} aria-current={active === id ? 'page' : undefined}
            onClick={() => { onSelect(id); onClose(); }}><Icon aria-hidden="true" />{label}</button></li>))}</ul></nav>
      </aside>
    </>
  );
}
