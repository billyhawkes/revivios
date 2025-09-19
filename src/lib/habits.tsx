import z from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { habits } from "./db/schema";

export const HabitsSchema = createSelectSchema(habits);
export type HabitsType = z.infer<typeof HabitsSchema>;

export const HabitFormSchema = createInsertSchema(habits, {
  title: (schema) => schema.min(1),
});
export type HabitFormType = z.infer<typeof HabitFormSchema>;
