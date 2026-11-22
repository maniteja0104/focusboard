import { Search, X } from 'lucide-react';
export default function SearchBar({ value, onChange }) {
  return (
    <div className="search"><Search aria-hidden="true" />
      <input type="search" value={value} onChange={(e) => onChange(e.target.value)} placeholder="Search tasks by title" aria-label="Search tasks by title" />
      {value && <button className="icon-btn" onClick={() => onChange('')} aria-label="Clear search"><X size={16} /></button>}</div>
  );
}
