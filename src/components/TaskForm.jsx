import { useState } from 'react';
import Modal from './Modal';
import { STATUSES, PRIORITIES } from '../data/sampleTasks';
const blank = { title: '', description: '', category: '', status: 'To do', priority: 'Medium', dueDate: '' };
export default function TaskForm({ task, onSave, onCancel }) {
  const [v, setV] = useState(task ? { ...blank, ...task } : blank);
  const [err, setErr] = useState({});
  const set = (k) => (e) => setV((p) => ({ ...p, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!v.title.trim()) errors.title = 'Enter a task title.';
    if (!v.dueDate) errors.dueDate = 'Choose a due date.';
    setErr(errors);
    if (Object.keys(errors).length) return;
    onSave({ ...v, title: v.title.trim(), description: v.description.trim(), category: v.category.trim() });
  };
  return (
    <Modal title={task ? 'Edit task' : 'Add task'} onClose={onCancel} labelId="task-form-title">
      <form onSubmit={submit} noValidate className="form">
        <label>Title
          <input value={v.title} onChange={set('title')} aria-invalid={!!err.title} aria-describedby={err.title ? 'e-title' : undefined} required />
          {err.title && <span id="e-title" className="error" role="alert">{err.title}</span>}</label>
        <label>Description<textarea rows="3" value={v.description} onChange={set('description')} /></label>
        <label>Category<input value={v.category} onChange={set('category')} /></label>
        <div className="row">
          <label>Status<select value={v.status} onChange={set('status')}>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select></label>
          <label>Priority<select value={v.priority} onChange={set('priority')}>{PRIORITIES.map((p) => <option key={p}>{p}</option>)}</select></label>
        </div>
        <label>Due date
          <input type="date" value={v.dueDate} onChange={set('dueDate')} aria-invalid={!!err.dueDate} aria-describedby={err.dueDate ? 'e-due' : undefined} required />
          {err.dueDate && <span id="e-due" className="error" role="alert">{err.dueDate}</span>}</label>
        <div className="actions"><button type="button" className="btn" onClick={onCancel}>Cancel</button>
          <button type="submit" className="btn primary">{task ? 'Save changes' : 'Add task'}</button></div>
      </form>
    </Modal>
  );
}
