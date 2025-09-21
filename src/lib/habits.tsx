import z from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { habitLogs, habits } from "./db/schema";

export const HabitsSchema = createSelectSchema(habits);
export type HabitsType = z.infer<typeof HabitsSchema>;

export const HabitFormSchema = createInsertSchema(habits, {
  title: (schema) => schema.min(1),
});
export type HabitFormType = z.infer<typeof HabitFormSchema>;

export const HabitLogSchema = createSelectSchema(habitLogs);
export type HabitLogType = z.infer<typeof HabitLogSchema>;

export const HabitLogFormSchema = createInsertSchema(habitLogs);
export type HabitLogFormType = z.infer<typeof HabitLogFormSchema>;
