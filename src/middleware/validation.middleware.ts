import { Request, Response, NextFunction } from "express";
import { CreateTaskDto, UpdateTaskDto } from "../dtos/task.dto";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

/**
 * Validates the request body for creating a task.
 *
 * @param {Request} req - The HTTP request object containing the task creation data in the body.
 * @param {Response} res - The HTTP response object used to send the response.
 * @param {NextFunction} next - The next middleware function in the Express pipeline.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
export const validateCreateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const taskDto = plainToClass(CreateTaskDto, req.body);
  const errors = await validate(taskDto);

  if (errors.length > 0) {
    const errorMessages = errors.map((error) => `${error.property}: ${error}`);
    res.status(400).json({
      message: "Validation failed",
      errors: errorMessages,
    });
    return;
  }
  next();
};

/**
 * Validates the request body for updating a task.
 *
 * @param {Request} req - The HTTP request object containing the task update data in the body.
 * @param {Response} res - The HTTP response object used to send the response.
 * @param {NextFunction} next - The next middleware function in the Express pipeline.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
export const validateUpdateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const taskDto = plainToClass(UpdateTaskDto, req.body);
  const errors = await validate(taskDto);

  if (errors.length > 0) {
    const errorMessages = errors.map((error) => `${error.property}: ${error}`);
    res.status(400).json({
      message: "Validation failed",
      errors: errorMessages,
    });
    return;
  }
  next();
};

/**
 * Validates the presence of an uploaded file in the request.
 *
 * @param {Request} req - The HTTP request object containing the uploaded file.
 * @param {Response} res - The HTTP response object used to send the response.
 * @param {NextFunction} next - The next middleware function in the Express pipeline.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
export const validateFileUpload = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const file = req.file;

  if (!file) {
    res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
    return;
  }
  next();
};
