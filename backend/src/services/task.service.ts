import { Task, TaskStatus, CreateTask, UpdateTaskStatus } from '../types/task';

export class TaskService {
    private static instance: TaskService;

    tasks: Task[] = [

        {
            id: '1',
            title: 'Task 1',
            description: 'Description for Task 1',
            status: TaskStatus.PENDING
        },
        {
            id: '2',
            title: 'Task 2',
            description: 'Description for Task 2',
            status: TaskStatus.DONE
        },
        {
            id: '3',
            title: 'Task 3',
            description: 'Description for Task 3',
            status: TaskStatus.PENDING
        }
    ];

    private constructor() {}
    
    public static getInstance(): TaskService {
        if (!TaskService.instance) {
            TaskService.instance = new TaskService();
        }
        return TaskService.instance;
    }

    //Méthode pour récupérer toutes les tâches

    getAllTasks(): Task[] {
        return this.tasks;
    }

    //fonction supplémentaire pour récupérer une tache par son id (non demandé)
    getTasksById(id: string): Task | undefined{
        return this.tasks.find(task => task.id === id);
    }

    //fonction pour Crée une nouvelle tâche
    createTask(task: CreateTask): Task {
        const newTask: Task = {
            id: (this.tasks.length + 1).toString(),
            title: task.title,
            description: task.description,
            status: TaskStatus.PENDING
        };
        this.tasks.push(newTask);
        return newTask;
    }

    //fonction pour supprimer une tache
    deleteTask(id: string): boolean {
        const index = this.tasks.findIndex(task => task.id === id);
        if (index === -1) {
            return false; // Tâche non trouvée
        }
        this.tasks.splice(index, 1);
        return true
    }

    //fonction pour mettre à jour le statut d'une tâche
    updateTaskStatus(id: string, statusData: UpdateTaskStatus): Task | null {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        
        if (taskIndex === -1) {
          return null;
        }
    
        this.tasks[taskIndex] = {
          ...this.tasks[taskIndex],
          status: statusData.status,
        };
    
        return this.tasks[taskIndex];
      }


    //Bonus (toggle function)
      toggleTaskStatus(id: string): Task | null {
        const task = this.tasks.findIndex(task => task.id === id);
        
        if (task === -1) {
          return null;
        }
    
        const currentStatus = this.tasks[task].status;
        const newStatus = currentStatus === TaskStatus.PENDING ? TaskStatus.DONE : TaskStatus.PENDING;
        
        return this.updateTaskStatus(id, { status: newStatus });
        

      }
}