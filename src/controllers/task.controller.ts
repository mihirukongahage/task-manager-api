import { NextFunction, Request, Response } from "express";
import { TaskService } from "../services/task.service";
import { FileUploadService } from "../services/file-upload.service";
import { DynamoDBTaskRepository } from "../repositories/dynamodb-task.repository";

const taskRepository = new DynamoDBTaskRepository();
const taskService = new TaskService(taskRepository);
const fileUploadService = new FileUploadService();

export class TaskController {
  /**
   * Creates a new task.
   *
   * @param {Request} req - The HTTP request object containing the task data in the body.
   * @param {Response} res - The HTTP response object used to send the response.
   * @param {NextFunction} next - The next middleware function in the Express pipeline.
   * @returns {Promise<void>} - A promise that resolves when the response is sent.
   */
  public async createTask(req: Request, res: Response, next: NextFunction) {
    try {
      const task = await taskService.create(req.body);
      res.status(201).json({
        message: "Task created successfully",
        data: task,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieves all tasks.
   *
   * @param {Request} req - The HTTP request object.
   * @param {Response} res - The HTTP response object used to send the response.
   * @param {NextFunction} next - The next middleware function in the Express pipeline.
   * @returns {Promise<void>} - A promise that resolves when the response is sent.
   */
  public async getAllTasks(req: Request, res: Response, next: NextFunction) {
    try {
      const tasks = await taskService.getAll();

      if (tasks.length === 0) {
        res.status(200).json({
          message: "No tasks found",
          data: [],
        });

        return;
      }

      res.status(200).json({
        message: "Tasks fetched successfully",
        data: tasks,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieves a task by its ID.
   *
   * @param {Request} req - The HTTP request object containing the task ID in the URL parameters.
   * @param {Response} res - The HTTP response object used to send the response.
   * @param {NextFunction} next - The next middleware function in the Express pipeline.
   * @returns {Promise<void>} - A promise that resolves when the response is sent.
   */
  public async getTaskById(req: Request, res: Response, next: NextFunction) {
    try {
      const task = await taskService.getById(req.params.id);

      if (!task) {
        res.status(404).json({
          message: `Task not found for id: ${req.params.id}`,
        });

        return;
      }
      res.status(200).json({
        message: "Task fetched successfully",
        data: task,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Updates an existing task.
   *
   * @param {Request} req - The HTTP request object containing the task ID in the URL parameters and the updated task data in the body.
   * @param {Response} res - The HTTP response object used to send the response.
   * @param {NextFunction} next - The next middleware function in the Express pipeline.
   * @returns {Promise<void>} - A promise that resolves when the response is sent.
   */
  public async updateTask(req: Request, res: Response, next: NextFunction) {
    try {
      const taskIsAvailable = await taskService.getById(req.params.id);

      if (!taskIsAvailable) {
        res.status(404).json({
          message: `Task not found for id: ${req.params.id}. Unable to update.`,
        });

        return;
      }

      const updatedTask = await taskService.update(req.params.id, req.body);
      res.status(200).json({
        message: "Task updated successfully",
        data: updatedTask,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Deletes a task by its ID.
   *
   * @param {Request} req - The HTTP request object containing the task ID in the URL parameters.
   * @param {Response} res - The HTTP response object used to send the response.
   * @param {NextFunction} next - The next middleware function in the Express pipeline.
   * @returns {Promise<void>} - A promise that resolves when the response is sent.
   */
  public async deleteTask(req: Request, res: Response, next: NextFunction) {
    try {
      const taskIsAvailable = await taskService.getById(req.params.id);

      if (!taskIsAvailable) {
        res.status(404).json({
          message: `Task not found for id: ${req.params.id}. Unable to delete.`,
        });

        return;
      }

      await taskService.delete(req.params.id);
      res.status(200).send({
        message: `Task with id: ${req.params.id} deleted successfully`,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles file uploads.
   *
   * @param {Request} req - The HTTP request object containing the file to be uploaded.
   * @param {Response} res - The HTTP response object used to send the response.
   * @param {NextFunction} next - The next middleware function in the Express pipeline.
   * @returns {Promise<void>} - A promise that resolves when the response is sent.
   */
  public async uploadFile(req: Request, res: Response, next: NextFunction) {
    try {
      const fileUrl = await fileUploadService.uploadFile(req.file!);
      res.status(201).json({
        message: "File uploaded successfully",
        fileUrl,
      });
    } catch (error) {
      next(error);
    }
  }
}
