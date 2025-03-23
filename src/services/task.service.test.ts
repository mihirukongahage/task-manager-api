import { TaskService } from "./task.service";
import { ITaskRepository } from "../repositories/task.repository.interface";
import { Task, TaskStatus } from "../models/task.model";
import { generateUUID } from "../utils/uuid.util";

jest.mock("../repositories/task.repository.interface");
jest.mock("../utils/uuid.util", () => ({
  generateUUID: jest.fn(),
}));

describe("TaskService", () => {
  let taskRepositoryMock: jest.Mocked<ITaskRepository>;
  let taskService: TaskService;

  beforeEach(() => {
    taskRepositoryMock = new (jest.fn(() => ({
      createTask: jest.fn(),
      getAllTasks: jest.fn(),
      getTaskById: jest.fn(),
      updateTask: jest.fn(),
      deleteTask: jest.fn(),
    })))() as jest.Mocked<ITaskRepository>;

    taskService = new TaskService(taskRepositoryMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should create a new task and return it", async () => {
      const taskData = { title: "Test Task", description: "Test description" };
      const fixedDate = new Date("2025-03-23T07:23:40.618Z").toISOString();
      const newTask: Task = {
        id: "a",
        ...taskData,
        status: TaskStatus.PENDING,
        createdAt: fixedDate,
        updatedAt: fixedDate,
      };

      (generateUUID as jest.Mock).mockReturnValue("a");
      taskRepositoryMock.createTask.mockResolvedValue(newTask);

      const mockDate = jest.fn(() => fixedDate);
      global.Date = mockDate as unknown as DateConstructor;

      const result = await taskService.create(taskData);

      expect(generateUUID).toHaveBeenCalled();
      expect(taskRepositoryMock.createTask).toHaveBeenCalledWith(newTask);
      expect(result).toEqual(newTask);

      jest.restoreAllMocks();
    });
  });

  describe("getAll", () => {
    it("should return all tasks", async () => {
      const tasks: Task[] = [
        {
          id: "1",
          title: "Task 1",
          description: "Test task 1",
          status: TaskStatus.PENDING,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "2",
          title: "Task 2",
          description: "Test task 2",
          status: TaskStatus.PENDING,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];

      taskRepositoryMock.getAllTasks.mockResolvedValue(tasks);

      const result = await taskService.getAll();

      expect(taskRepositoryMock.getAllTasks).toHaveBeenCalled();
      expect(result).toEqual(tasks);

      jest.restoreAllMocks();
    });
  });

  describe("getById", () => {
    it("should return a task by ID", async () => {
      const taskId = "1";
      const fixedDate = new Date("2025-03-23T07:23:40.618Z").toISOString();
      const task: Task = {
        id: taskId,
        title: "Task 1",
        description: "Test task 1",
        status: TaskStatus.PENDING,
        createdAt: fixedDate,
        updatedAt: fixedDate,
      };

      taskRepositoryMock.getTaskById.mockResolvedValue(task);

      const mockDate = jest.fn(() => fixedDate);
      global.Date = mockDate as unknown as DateConstructor;

      const result = await taskService.getById(taskId);

      expect(taskRepositoryMock.getTaskById).toHaveBeenCalledWith(taskId);
      expect(result).toEqual(task);

      jest.restoreAllMocks();
    });
  });

  describe("update", () => {
    it("should update a task and return the updated task", async () => {
      const taskId = "1";
      const fixedDate = new Date("2025-03-23T07:23:40.618Z").toISOString();
      const updateData = {
        title: "Updated Task",
        description: "Updated description",
      };
      const updatedTask: Task = {
        id: taskId,
        title: "Updated Task",
        description: "Updated description",
        status: TaskStatus.PENDING,
        createdAt: new Date().toISOString(),
        updatedAt: fixedDate,
      };

      taskRepositoryMock.updateTask.mockResolvedValue(updatedTask);

      const mockDate = jest.fn(() => fixedDate);
      global.Date = mockDate as unknown as DateConstructor;

      const result = await taskService.update(taskId, updateData);

      expect(taskRepositoryMock.updateTask).toHaveBeenCalledWith(taskId, {
        ...updateData,
        updatedAt: fixedDate,
      });
      expect(result).toEqual(updatedTask);

      jest.restoreAllMocks();
    });
  });

  describe("delete", () => {
    it("should delete a task by ID", async () => {
      const taskId = "1";

      taskRepositoryMock.deleteTask.mockResolvedValue(true);

      await taskService.delete(taskId);

      expect(taskRepositoryMock.deleteTask).toHaveBeenCalledWith(taskId);
    });
  });
});
