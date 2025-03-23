import { ITaskRepository } from "./task.repository.interface";
import { Task, TaskStatus } from "../models/task.model";
import { dynamoDB } from "../configs/aws-config";

const TABLE_NAME = "tasks-manager-table";

export class DynamoDBTaskRepository implements ITaskRepository {
  private dynamoDB = dynamoDB;

  /**
   * Creates a new task in the DynamoDB table.
   *
   * @param {Task} task - The task object to be created in the DynamoDB table.
   * @returns {Promise<Task>} - A promise that resolves to the created task object.
   * @throws {Error} - Throws an error if the task creation fails.
   */
  async createTask(task: Task): Promise<Task> {
    const params = {
      TableName: TABLE_NAME,
      Item: task,
    };

    try {
      await this.dynamoDB.put(params).promise();
      return task;
    } catch (error) {
      console.error("Error creating task:", error);
      throw new Error("Unable to create task");
    }
  }

  /**
   * Retrieves all tasks from the DynamoDB table.
   *
   * @returns {Promise<Task[]>} - A promise that resolves to an array of `Task` objects.
   * @throws {Error} - Throws an error if retrieving tasks from the database fails.
   */
  async getAllTasks(): Promise<Task[]> {
    const params = {
      TableName: TABLE_NAME,
    };

    try {
      const data = await this.dynamoDB.scan(params).promise();
      return data.Items as Task[];
    } catch (error) {
      console.error("Error getting tasks:", error);
      throw new Error("Unable to get tasks");
    }
  }

  /**
   * Retrieves a task by its ID from the DynamoDB table.
   *
   * @param {string} id - The ID of the task to retrieve from the DynamoDB table.
   * @returns {Promise<Task | undefined>} - A promise that resolves to the task if found, or `undefined` if not.
   * @throws {Error} - Throws an error if retrieving the task from the database fails.
   */
  async getTaskById(id: string): Promise<Task | undefined> {
    const params = {
      TableName: TABLE_NAME,
      Key: { id },
    };

    try {
      const data = await this.dynamoDB.get(params).promise();
      return data.Item as Task;
    } catch (error) {
      console.error("Error getting task by ID:", error);
      throw new Error("Unable to get task");
    }
  }

  /**
   * Updates an existing task in the DynamoDB table based on the provided task ID and updated task details.
   *
   * @param {string} id - The ID of the task to be updated.
   * @param {Partial<Task>} updatedTask - An object containing the updated values for the task's fields.
   *                                      The fields that are not provided will be replaced with default values.
   * @returns {Promise<Task | null>} - A promise that resolves to the updated task, or `null` if the task does not exist.
   * @throws {Error} - Throws an error if updating the task fails.
   */
  async updateTask(
    id: string,
    updatedTask: Partial<Task>
  ): Promise<Task | null> {
    const timestamp = new Date().toISOString();
    const params = {
      TableName: TABLE_NAME,
      Key: { id },
      UpdateExpression:
        "set #title = :title, #description = :description, #status = :status, #updatedAt = :updatedAt",
      ExpressionAttributeNames: {
        "#title": "title",
        "#description": "description",
        "#status": "status",
        "#updatedAt": "updatedAt",
      },
      ExpressionAttributeValues: {
        ":title": updatedTask.title ?? "Default Title",
        ":description": updatedTask.description ?? "Default Description",
        ":status": updatedTask.status ?? "pending",
        ":updatedAt": timestamp,
      },
      ReturnValues: "ALL_NEW",
    };

    try {
      const data = await this.dynamoDB.update(params).promise();
      return data.Attributes as Task;
    } catch (error) {
      console.error("Error updating task:", error);
      throw new Error("Unable to update task");
    }
  }

  /**
   * Deletes a task from the DynamoDB table based on the provided task ID.
   *
   * @param {string} id - The ID of the task to be deleted from the DynamoDB table.
   * @returns {Promise<boolean>} - A promise that resolves to `true` if the task was successfully deleted, or `false` if an error occurred.
   * @throws {Error} - If any error occurs during the deletion, it is logged, but no exception is thrown.
   */
  async deleteTask(id: string): Promise<boolean> {
    const params = {
      TableName: TABLE_NAME,
      Key: { id },
    };

    try {
      await this.dynamoDB.delete(params).promise();
      return true;
    } catch (error) {
      console.error("Error deleting task:", error);
      return false;
    }
  }
}
