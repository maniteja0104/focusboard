import { PRIORITIES } from '../data/sampleTasks';
export default function PriorityFilter({ value, onChange }) {
  return (
    <select className="select" value={value} onChange={(e) => onChange(e.target.value)} aria-label="Filter by priority">
      <option>All Priorities</option>{PRIORITIES.map((p) => <option key={p}>{p}</option>)}</select>
  );
}
