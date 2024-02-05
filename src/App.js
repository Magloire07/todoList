import Add from './images/addTask.svg';
import brain from './images/brain.svg';
import done from './images/done.svg';
import grow from './images/grow.svg';
import plan from './images/plan.svg';
import rocket from './images/rocket.svg';

import './App.css';
import TaskList from './TaskList';
import EditTask from './EditTask';
import DeleteTask from './DeleteTask';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div class="menu">
          <TaskList/>
          <EditTask/>
          <DeleteTask/>
        </div>
        <h2 class="title">MA LISTE DES TACHES </h2>
        <p class="plan">S'organiser , c'est doublé sa productivité, alors planifies tes journées</p>
        <img src={Add} className="Task-Add" alt="Add task" />

        <img src={brain} className="brain" alt="" />
        <img src={done} className="done" alt="" />
        <img src={grow} className="grow" alt="" />
        <img src={plan} className="planimg" alt="" />
        <img src={rocket} className="rocket" alt="" />

        <p class="ajout">
          Ajouter une tâche
        </p>
      </header>
    </div>
  );
}

export default App;
