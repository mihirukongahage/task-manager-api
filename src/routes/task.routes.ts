import { Router } from "express";
import multer from "multer";
import { TaskController } from "../controllers/task.controller";
import {
  validateCreateTask,
  validateFileUpload,
} from "../middleware/validation.middleware";

const router = Router();
const taskController = new TaskController();
const upload = multer({ storage: multer.memoryStorage() });

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "New Task"
 *               description:
 *                 type: string
 *                 example: "This is a task description"
 *     responses:
 *       201:
 *         description: Task created successfully
 */
router.post(
  "/",
  validateCreateTask,
  taskController.createTask.bind(taskController)
);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: A list of tasks
 */
router.get("/", taskController.getAllTasks.bind(taskController));

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The task ID
 *     responses:
 *       200:
 *         description: Task found
 *       404:
 *         description: Task not found
 */
router.get("/:id", taskController.getTaskById.bind(taskController));

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Task Title"
 *               description:
 *                 type: string
 *                 example: "Updated task description"
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 */
router.put(
  "/:id",
  validateCreateTask,
  taskController.updateTask.bind(taskController)
);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */
router.delete("/:id", taskController.deleteTask.bind(taskController));

/**
 * @swagger
 * /tasks/upload:
 *   post:
 *     summary: Upload a file
 *     tags: [Tasks]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: file
 *         type: file
 *         required: true
 *         description: The file to upload
 *     responses:
 *       200:
 *         description: File uploaded successfully
 */
router.post(
  "/upload",
  upload.single("file"),
  validateFileUpload,
  taskController.uploadFile.bind(taskController)
);

export default router;
