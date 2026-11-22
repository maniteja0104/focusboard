import TaskCard from './TaskCard';
export default function TaskList({ tasks, ...handlers }) {
  return <ul className="task-list" aria-label="Tasks">{tasks.map((t) => <TaskCard key={t.id} task={t} {...handlers} />)}</ul>;
}
