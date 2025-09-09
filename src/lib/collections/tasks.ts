import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { queryClient } from "@/lib/query";
import { tempTasks, TaskSchema } from "@/lib/tasks";

const getTasks = createServerFn().handler(async () => tempTasks);

const createTask = createServerFn()
  .validator(TaskSchema)
  .handler(async ({ data }) => {
    tempTasks.push(data);
  });

const updateTask = createServerFn()
  .validator(TaskSchema)
  .handler(async ({ data }) => {
    const index = tempTasks.findIndex((task) => task.id === data.id);
    tempTasks[index] = data;
  });

const deleteTask = createServerFn()
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data: { id } }) => {
    const index = tempTasks.findIndex((task) => task.id === id);
    tempTasks.splice(index, 1);
  });

export const taskCollection = createCollection(
  queryCollectionOptions({
    queryKey: ["tasks"],
    queryClient,
    getKey: (item) => item.id,
    queryFn: async () => {
      return await getTasks();
    },
    onUpdate: async ({ transaction }) => {
      const { modified } = transaction.mutations[0];
      await updateTask({ data: modified });
    },
    onDelete: async ({ transaction }) => {
      const { modified } = transaction.mutations[0];
      await deleteTask({ data: modified });
    },
    onInsert: async ({ transaction }) => {
      const { modified } = transaction.mutations[0];
      await createTask({ data: modified });
    },
  }),
);
