import { Pencil, Trash2, CircleDashed, Loader, CheckCircle2, CalendarDays } from 'lucide-react';
import { STATUSES } from '../data/sampleTasks';
const icons = { 'To do': CircleDashed, 'In progress': Loader, Completed: CheckCircle2 };
const cls = (s) => s.toLowerCase().replace(' ', '-');
export default function TaskCard({ task, onEdit, onDelete, onStatus }) {
  const SI = icons[task.status] || CircleDashed;
  return (
    <li className="task">
      <div className="task-main">
        <h3 className={task.status === 'Completed' ? 'done' : ''}>{task.title}</h3>
        {task.description && <p className="muted">{task.description}</p>}
        <div className="meta">
          <span className={`badge s-${cls(task.status)}`}><SI size={14} aria-hidden="true" />{task.status}</span>
          <span className={`badge p-${String(task.priority).toLowerCase()}`}>{task.priority} priority</span>
          {task.category && <span className="badge">{task.category}</span>}
          <span className="muted small due"><CalendarDays size={14} aria-hidden="true" />{task.dueDate}</span>
        </div>
      </div>
      <div className="task-actions">
        <select className="select" value={task.status} onChange={(e) => onStatus(task.id, e.target.value)} aria-label={`Status for ${task.title}`}>
          {STATUSES.map((s) => <option key={s}>{s}</option>)}</select>
        <button className="icon-btn" onClick={() => onEdit(task)} aria-label={`Edit ${task.title}`}><Pencil size={18} /></button>
        <button className="icon-btn danger" onClick={() => onDelete(task)} aria-label={`Delete ${task.title}`}><Trash2 size={18} /></button>
      </div>
    </li>
  );
}
