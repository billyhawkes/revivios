import z from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { tasks } from "./db/schema";

export const TaskSchema = createSelectSchema(tasks);
export type TaskType = z.infer<typeof TaskSchema>;

export const TaskFormSchema = createInsertSchema(tasks, {
  title: (schema) => schema.min(1),
});
export type TaskFormType = z.infer<typeof TaskFormSchema>;
