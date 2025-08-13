
import { useEffect, useState } from 'react'
import './App.css'
import TaskList from './components/TaskList'
import type { Task } from '../../backend/src/types/task'
import AddTaskForm from './components/AddTaskForm'
function App() {

  //Définir le useState pour gérer les tâches
  const [tasks, setTasks] = useState<Task[]>([])

  //Fonction pour récupérer les tâches depuis l'API
  const fetchTasks = async () => {
    try{

      const response = await fetch('http://localhost:3000/api/tasks');
      const data = await response.json();
      if (data.success) {
        setTasks(data.data);
      }

    }catch(error){
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);



  //Fonction pour gérer l'ajout de tâches
  function handleTaskAdded(): void {
    fetchTasks(); // Rafraîchir la liste des tâches après l'ajout
  }

  //Fonction pour gérer la suppression de tâches
  const handleTaskDeleted = async (id: string): Promise<void> => {
    try{
      await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: 'DELETE',

      });
      fetchTasks(); // Rafraîchir la liste des tâches après la suppression


    }catch(error){
      console.error('Error deleting task:', error);
    }

  }

   //Fonction pour gérer le changement de statut des tâches
  const handleToggleStatus = async(id: string) => {
    try{

      await fetch(`http://localhost:3000/api/tasks/${id}/toggle`, {
        method: 'PATCH',
      });
      fetchTasks(); // Rafraîchir la liste des tâches après le changement de statut

    }catch(error){

      console.error('Error toggling task status:', error);
    }

  }

  return (
    <div className="app">
      <div className="header-container">
        <h1 className="app-title">Task Manager</h1>
      </div>
      <AddTaskForm onTaskAdded={handleTaskAdded} />
      <TaskList 
        tasks={tasks}
        onDeleteTask={handleTaskDeleted} 
        onToggleStatus={handleToggleStatus} 
      />
    </div>
  );
}

export default App
