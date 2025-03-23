import { Request, Response, NextFunction } from "express";

/**
 * Middleware for handling errors in the Express application.
 *
 * @param {any} err - The error object, which can include properties like `statusCode` and `message`.
 * @param {Request} req - The HTTP request object, which provides details of the incoming request.
 * @param {Response} res - The HTTP response object, which is used to send the error response.
 * @param {NextFunction} next - The next middleware function in the Express pipeline. This is not used in this handler.
 *
 * @returns {void} - The function doesn't return any value; it sends a response to the client.
 */
const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;
