export default function StatCard({ label, value, Icon }) {
  return (
    <div className="stat"><Icon aria-hidden="true" /><div><p className="muted">{label}</p><strong>{value}</strong></div></div>
  );
}
