import { Task } from "../models/task.model";

export interface ITaskRepository {
    createTask(task: Task): Promise<Task>;
    getAllTasks(): Promise<Task[]>;
    getTaskById(id: string): Promise<Task | undefined>;
    updateTask(id: string, updatedTask: Partial<Task>): Promise<Task | null>;
    deleteTask(id: string): Promise<boolean>;
}
