import type { Task } from '../../../backend/src/types/task';

interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

function TaskList({ tasks, onDeleteTask, onToggleStatus }: TaskListProps) {
  return (
    <div className="task-list">
      <h2>Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks available. Add a task to get started!</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className={`task-item ${task.status}`}>
              <div className="task-content">
                <h3>{task.title}</h3>
                {task.description && <p>{task.description}</p>}
                <p>Status: {task.status}</p>
              </div>
              <div className="task-actions">
                <button 
                  onClick={() => onToggleStatus(task.id)}
                  className="toggle-btn"
                >
                  Toggle Status
                </button>
                <button 
                  onClick={() => onDeleteTask(task.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;