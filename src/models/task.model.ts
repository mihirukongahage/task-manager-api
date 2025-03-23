export enum TaskStatus {
    PENDING = "pending",
    IN_PROGRESS = "in-progress",
    COMPLETED = "completed",
}

export type Task = {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    createdAt: string;
    updatedAt: string;
}
