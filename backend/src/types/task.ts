import { z } from 'zod';

export const TaskStatus = {
    PENDING: 'pending',
    DONE: 'done',
}as const;

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];

export const TaskSTatusSchema = z.enum(['pending', 'done']);
export const CreateTaskSchema = z.object({

    title: z.string().min(1, 'Title is required').trim(), // trim() pour supprimer les espaces inutiles
    description: z.string().max(500, 'Description must be less than 500 characters').trim().optional().default(''),
    status: TaskSTatusSchema.default('pending'), // par défaut, le statut est "pending"
})

export const UpdateTaskSchema = z.object({
    title: z.string().min(1, 'Title is required').trim().optional(),
    description: z.string().max(500, 'Description must be less than 500 characters').trim().optional(),
    status: TaskSTatusSchema,
})

export const TaskIdSchema = z.string().uuid('Invalid task ID format');

export interface Task {
    id: string;
    title: string;
    description?: string | undefined;
    status: TaskStatus;
}

export type CreateTask = z.infer<typeof CreateTaskSchema>;
export type UpdateTaskStatus = z.infer<typeof UpdateTaskSchema>;

export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
  }
  
  export interface ApiError {
    statusCode: number;
    message: string;
    code?: string;
  }