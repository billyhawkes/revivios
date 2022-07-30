import { z } from "zod";

export const TaskSchema = z.object({
	id: z.string().cuid(),
	userId: z.string().cuid(),
	name: z
		.string()
		.min(1, { message: "Name must be at least 1 character." })
		.max(25, { message: "Name must be 25 or less characters." }),
	description: z.string(),
	completed: z.boolean().default(false),
	date: z.date().nullish(),
});

export const CreateTaskSchema = z.object({
	name: TaskSchema.shape.name,
	date: TaskSchema.shape.date,
});

export type CreateTask = z.infer<typeof CreateTaskSchema>;
export type Task = z.infer<typeof TaskSchema>;
