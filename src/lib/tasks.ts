import z from "zod";

export const tempTasks: Task[] = [
  {
    id: "1",
    title: "Buy milk",
    completed: false,
  },
  {
    id: "2",
    title: "Buy bread",
    completed: false,
  },
  {
    id: "3",
    title: "Buy eggs",
    completed: false,
  },
];

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  completed: z.boolean(),
});
export type Task = z.infer<typeof TaskSchema>;
