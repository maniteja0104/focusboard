import { useMemo, useState, useCallback } from 'react';
import { ListTodo, Loader, CheckCircle2, Percent } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatCard from './components/StatCard';
import FocusNotes from './components/FocusNotes';
import SearchBar from './components/SearchBar';
import FilterTabs from './components/FilterTabs';
import PriorityFilter from './components/PriorityFilter';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import DeleteConfirmation from './components/DeleteConfirmation';
import EmptyState from './components/EmptyState';
import useLocalStorage from './hooks/useLocalStorage';
import { sampleTasks } from './data/sampleTasks';

const newId = () => (crypto.randomUUID ? crypto.randomUUID() : `task-${Date.now()}-${Math.random().toString(36).slice(2)}`);

export default function App() {
  const [tasks, setTasks] = useLocalStorage('focusboard_tasks', sampleTasks);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');
  const [priority, setPriority] = useState('All Priorities');
  const [form, setForm] = useState(null); // null | 'new' | task
  const [deleting, setDeleting] = useState(null);
  const [nav, setNav] = useState('dashboard');
  const [menu, setMenu] = useState(false);

  const stats = useMemo(() => {
    const total = tasks.length;
    const inProgress = tasks.filter((t) => t.status === 'In progress').length;
    const completed = tasks.filter((t) => t.status === 'Completed').length;
    return { total, inProgress, completed, pct: total === 0 ? 0 : Math.round((completed / total) * 100) };
  }, [tasks]);

  // Always derived from the full task list.
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tasks
      .filter((t) => t.title.toLowerCase().includes(q))
      .filter((t) => status === 'All' || t.status === status)
      .filter((t) => priority === 'All Priorities' || t.priority === priority);
  }, [tasks, query, status, priority]);

  const filtersActive = query.trim() !== '' || status !== 'All' || priority !== 'All Priorities';
  const reset = () => { setQuery(''); setStatus('All'); setPriority('All Priorities'); };

  const save = (data) => {
    if (form && form !== 'new') setTasks((p) => p.map((t) => (t.id === form.id ? { ...t, ...data, id: t.id } : t)));
    else setTasks((p) => [{ ...data, id: newId() }, ...p]);
    setForm(null);
  };
  const changeStatus = useCallback((id, s) => setTasks((p) => p.map((t) => (t.id === id ? { ...t, status: s } : t))), [setTasks]);
  const confirmDelete = () => { setTasks((p) => p.filter((t) => t.id !== deleting.id)); setDeleting(null); };

  return (
    <div className="layout">
      <Sidebar active={nav} onSelect={setNav} open={menu} onClose={() => setMenu(false)} />
      <main className="main">
        <Header onMenu={() => setMenu(true)} onAdd={() => setForm('new')} />
        <section className="stats" aria-label="Overview">
          <StatCard label="Total tasks" value={stats.total} Icon={ListTodo} />
          <StatCard label="In progress" value={stats.inProgress} Icon={Loader} />
          <StatCard label="Completed" value={stats.completed} Icon={CheckCircle2} />
          <StatCard label="Completion" value={`${stats.pct}%`} Icon={Percent} />
        </section>
        <FocusNotes />
        <section aria-label="Task list">
          <div className="toolbar">
            <SearchBar value={query} onChange={setQuery} />
            <PriorityFilter value={priority} onChange={setPriority} />
            {filtersActive && <button className="btn" onClick={reset}>Reset filters</button>}
          </div>
          <FilterTabs value={status} onChange={setStatus} />
          <p className="muted small" aria-live="polite">{visible.length} of {tasks.length} tasks shown</p>
          {visible.length ? (
            <TaskList tasks={visible} onEdit={setForm} onDelete={setDeleting} onStatus={changeStatus} />
          ) : (
            <EmptyState filtered={tasks.length > 0} onReset={reset} onAdd={() => setForm('new')} />
          )}
        </section>
      </main>
      {form && <TaskForm task={form === 'new' ? null : form} onSave={save} onCancel={() => setForm(null)} />}
      {deleting && <DeleteConfirmation task={deleting} onConfirm={confirmDelete} onCancel={() => setDeleting(null)} />}
    </div>
  );
}
