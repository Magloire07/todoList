import img from './images/delete.svg';
import './delete.css';

function DeleteTask() {
  return (
    <div className="delete">
        <img src={img} className="Del-img" alt="Delete task" />
        <p>
          Suprimer des tâches 
        </p>
    </div>
  );
}

export default DeleteTask;
