import { Inbox } from 'lucide-react';
export default function EmptyState({ filtered, onReset, onAdd }) {
  return (
    <div className="empty"><Inbox aria-hidden="true" size={36} />
      <h3>{filtered ? 'No tasks match these filters' : 'No tasks yet'}</h3>
      <p className="muted">{filtered ? 'Try a different search or reset the filters.' : 'Add your first task to get started.'}</p>
      {filtered ? <button className="btn" onClick={onReset}>Reset filters</button> : <button className="btn primary" onClick={onAdd}>Add task</button>}</div>
  );
}
