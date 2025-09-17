import z from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { tasks } from "./db/schema";
import { Calendar, CalendarDays, Inbox, List } from "lucide-react";

export const TaskSchema = createSelectSchema(tasks);
export type TaskType = z.infer<typeof TaskSchema>;

export const TaskFormSchema = createInsertSchema(tasks, {
  title: (schema) => schema.min(1),
});
export type TaskFormType = z.infer<typeof TaskFormSchema>;

export const TaskSearchSchema = z.object({
  view: z.enum(["list"]).optional(),
  filter: z.enum(["all", "inbox", "today", "tomorrow", "week"]).optional(),
});
export type TaskSearchType = z.infer<typeof TaskSearchSchema>;

export const taskStatuses = ["pending", "in-progress", "complete"] as const;

export const taskFilters: {
  name: string;
  value: TaskSearchType["filter"];
  icon: React.ReactNode;
}[] = [
  { name: "All", value: "all", icon: <List /> },
  { name: "Inbox", value: "inbox", icon: <Inbox /> },
  { name: "Today", value: "today", icon: <Calendar /> },
  { name: "Tomorrow", value: "tomorrow", icon: <CalendarDays /> },
];
