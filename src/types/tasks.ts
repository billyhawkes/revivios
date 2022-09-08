import { z } from "zod";

export const TaskSchema = z.object({
	id: z.string().cuid(),
	userId: z.string().cuid(),
	name: z.string().max(256),
	description: z.string().max(1000),
	date: z.date().optional(),
	completed: z.boolean().default(false),
});
export type Task = z.input<typeof TaskSchema>;

export const CreateTaskSchema = z.object({
	name: TaskSchema.shape.name,
	description: TaskSchema.shape.description,
	date: TaskSchema.shape.date,
});
export type CreateTask = z.input<typeof CreateTaskSchema>;

export const UpdateTaskSchema = z.object({
	id: TaskSchema.shape.id,
	name: TaskSchema.shape.name,
	description: TaskSchema.shape.description,
	date: TaskSchema.shape.date,
	completed: TaskSchema.shape.completed,
});
export type UpdateTask = z.input<typeof CreateTaskSchema>;
