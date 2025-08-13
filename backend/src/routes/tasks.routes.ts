import { FastifyInstance } from "fastify";
import { TaskService } from "../services/task.service";
import { CreateTask, ApiResponse, Task, CreateTaskSchema, UpdateTaskStatus, UpdateTaskSchema } from "../types/task";



export async function taskRoutes(fastify: FastifyInstance) {
    const taskService = TaskService.getInstance();
    //GET /tasks
    fastify.get('/tasks', async(_request, reply) => {
        try{

            const tasks = taskService.getAllTasks();
           
            reply.code(200).send({
                success: true,
                data: tasks,
            });
        }catch(error){
            reply.code(500).send({
                success: false,
                error: 'An error occurred while fetching tasks',
            });
        }
    });


    //GET /tasks/:id
    fastify.get('/task/:id', async(request, reply) => {
        try{
            const { id } = request.params as { id: string };
            const task = taskService.getTasksById(id);

            if (!task) {
                return reply.code(404).send({
                    success: false,
                    error: 'Task not found',
                });
            }
            reply.code(200).send({
                success: true,
                data: task,
            });

        }catch(error){
            reply.code(500).send({
                success: false,
                error: 'An error occurred while fetching the task',
            });
        }
    })

    //POST /tasks
    fastify.post<{
        Body: CreateTask; 
        Reply: ApiResponse<Task> 
    }>
    ('/tasks', async(request, reply) => {
        try{

            //valider les inputs avec zod
            const validatedData = CreateTaskSchema.parse(request.body);
            const newTask = taskService.createTask(validatedData);
            reply.code(201).send({
                success: true,
                data: newTask,
            });

        }catch(error){
            if (error instanceof Error) {
                reply.code(400).send({
                    success: false,
                    error: error.message,
                });
            } else {
                reply.code(500).send({
                    success: false,
                    error: 'An unexpected error occurred while creating the task',
                });
            }

        }
    });

    fastify.delete('/tasks/:id', async (request, reply) => {

        try{
            const { id } = request.params as { id: string };
            const deletedTask = taskService.deleteTask(id);

            if(!deletedTask){
                reply.code(404).send({
                    success: false,
                    error: 'Task not found',
                }); 
                return;
            }

            reply.code(200).send({
                success: true,
                message: 'Task deleted successfully',
            });

        }catch(error){
            reply.code(500).send({
                success: false,
                error: 'An error occurred while deleting the task',
            })
        }
    })


    //PATCH /tasks/:id
    fastify.patch<{
        Params: { id: string };
        Body: UpdateTaskStatus;
        Reply: ApiResponse<Task> 

    }>('/tasks/:id', async (request, reply) => {
        try{
            
            const { id } = request.params as { id: string };
            const statusData = request.body;

            //valider les inputs avec zod
            const validatedStatusData = UpdateTaskSchema.parse(statusData);

            const updatedTask = taskService.updateTaskStatus(id, validatedStatusData);

            if (!updatedTask) {
                return reply.code(404).send({
                    success: false,
                    error: 'Task not found',
                });
            }

            reply.code(200).send({
                success: true,
                data: updatedTask,
            });

        }catch(error){
            reply.code(500).send({
                success: false,
                error: 'An error occurred while updating the task status',
            });
        }
    })


    //PATCH /tasks/:id/toggle
    fastify.patch<{ Params: { id: string }; Reply: ApiResponse<Task> }>(
        '/tasks/:id/toggle',
        async (request, reply) => {
            try {
                const { id } = request.params as { id: string };
                const toggledTask = taskService.toggleTaskStatus(id);

                if (!toggledTask) {
                    return reply.code(404).send({
                        success: false,
                        error: 'Task not found',
                    });
                }

                reply.code(200).send({
                    success: true,
                    data: toggledTask,
                });
            } catch (error) {
                reply.code(500).send({
                    success: false,
                    error: 'An error occurred while toggling the task status',
                });
            }
        }
    );

    


}