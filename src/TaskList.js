import Add from './images/MyTask.svg';
import './myTask.css';

function TaskList() {
  return (
    <div className="task">
        <img src={Add} className="Task-Add" alt="Add task" />
        <p>
          Liste des tâches 
        </p>
    </div>
  );
}

export default TaskList;
