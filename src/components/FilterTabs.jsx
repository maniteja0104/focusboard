const tabs = ['All', 'To do', 'In progress', 'Completed'];
export default function FilterTabs({ value, onChange }) {
  return (
    <div className="tabs" role="group" aria-label="Filter by status">{tabs.map((t) => (
      <button key={t} className={`tab ${value === t ? 'on' : ''}`} aria-pressed={value === t} onClick={() => onChange(t)}>{t}</button>))}</div>
  );
}
