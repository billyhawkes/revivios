import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { queryClient } from "@/lib/query";
import { TaskFormSchema } from "@/lib/tasks";
import { db } from "../db";
import { tasks } from "../db/schema";
import { eq } from "drizzle-orm";

const getTasks = createServerFn().handler(async () => {
  return await db.select().from(tasks);
});

const createTask = createServerFn()
  .validator(TaskFormSchema)
  .handler(async ({ data }) => {
    await db.insert(tasks).values({
      ...data,
      id: Bun.randomUUIDv7(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });

const updateTask = createServerFn()
  .validator(TaskFormSchema.extend({ id: z.string() }))
  .handler(async ({ data }) => {
    await db.update(tasks).set(data).where(eq(tasks.id, data.id));
  });

const deleteTask = createServerFn()
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data: { id } }) => {
    await db.delete(tasks).where(eq(tasks.id, id));
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
