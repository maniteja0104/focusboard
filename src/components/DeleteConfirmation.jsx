import Modal from './Modal';
export default function DeleteConfirmation({ task, onConfirm, onCancel }) {
  return (
    <Modal title="Delete this task?" onClose={onCancel} labelId="del-title">
      <p>“{task.title}” will be permanently deleted. This can’t be undone.</p>
      <div className="actions"><button className="btn" onClick={onCancel}>Cancel</button>
        <button className="btn danger-fill" onClick={onConfirm}>Delete task</button></div>
    </Modal>
  );
}
