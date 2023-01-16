// Task

import { z } from "zod";

export const TaskSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  description: z.string(),
  date: z.date().optional(),
  userId: z.string().cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type Task = z.infer<typeof TaskSchema>;

export const CreateTaskSchema = z.object({
  name: TaskSchema.shape.name,
  description: TaskSchema.shape.description,
  date: TaskSchema.shape.date,
});
export type CreateTask = z.infer<typeof CreateTaskSchema>;
