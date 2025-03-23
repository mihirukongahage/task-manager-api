import { TaskStatus } from "../models/task.model";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description: string;
}

export class UpdateTaskDto {
  @IsString()
  title?: string;

  @IsString()
  description?: string;

  @IsString()
  status?: TaskStatus;
}

export class TaskResponseDto {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}
