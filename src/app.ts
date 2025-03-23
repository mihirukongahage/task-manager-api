import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import taskRoutes from "./routes/task.routes";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import errorHandler from "./middleware/error-handler.middleware";

dotenv.config();

const app: Application = express();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Task Manager API",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/*.ts"],
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api/tasks", taskRoutes);

// Invalid paths
app.all("*", (req, res) => {
  res.status(404).json({ message: "Page Not Found" });
});

app.use(errorHandler);

export default app;
