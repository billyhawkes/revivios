import z from "zod";
import { tasks } from "./db/schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const TaskSchema = createSelectSchema(tasks);
export type Task = z.infer<typeof TaskSchema>;

export const CreateTaskSchema = createInsertSchema(tasks);
export type CreateTask = z.infer<typeof CreateTaskSchema>;
