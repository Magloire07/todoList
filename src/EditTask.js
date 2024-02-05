import img from './images/edit.svg';
import './editTask.css';

function EditTask() {
  return (
    <div className="edit">
        <img src={img} className="Edit-img" alt="Edit task" />
        <p>
          Modifier des tâches 
        </p>
    </div>
  );
}

export default EditTask;
