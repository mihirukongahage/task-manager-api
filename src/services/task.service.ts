import { Task, TaskStatus } from '../models/task.model';
import { ITaskRepository } from '../repositories/task.repository.interface';
import { generateUUID } from '../utils/uuid.util';

export class TaskService {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  public async create(taskData: { title: string; description: string }) {
    try {
      const currentDate = new Date().toISOString();
      const newTask: Task = {
        id: generateUUID(),
        ...taskData,
        status: TaskStatus.PENDING,
        createdAt: currentDate,
        updatedAt: currentDate,
      };
      return this.taskRepository.createTask(newTask);
    } catch (error) {
      throw new Error('Failed to create task');
    }
  }

  public async getAll() {
    return this.taskRepository.getAllTasks();
  }

  public async getById(id: string) {
    return this.taskRepository.getTaskById(id);
  }

  public async update(id: string, taskData: { title?: string; description?: string; status?: TaskStatus }) {
    return this.taskRepository.updateTask(id, { ...taskData, updatedAt: new Date().toISOString() });
  }

  public async delete(id: string) {
    return this.taskRepository.deleteTask(id);
  }
}
