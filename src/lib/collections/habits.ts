import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { queryClient } from "@/lib/query";
import {
  HabitFormSchema,
  HabitLogFormSchema,
  HabitLogSchema,
} from "@/lib/habits";
import { db } from "../db";
import { habitLogs, habits } from "../db/schema";
import { eq } from "drizzle-orm";

const getHabitsFn = createServerFn().handler(async () => {
  return await db.select().from(habits);
});

const createHabitFn = createServerFn()
  .validator(HabitFormSchema)
  .handler(async ({ data }) => {
    await db.insert(habits).values({
      ...data,
      id: Bun.randomUUIDv7(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });

const updateHabitFn = createServerFn()
  .validator(HabitFormSchema.extend({ id: z.string() }))
  .handler(async ({ data }) => {
    await db.update(habits).set(data).where(eq(habits.id, data.id));
  });

const deleteHabitFn = createServerFn()
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data: { id } }) => {
    await db.delete(habits).where(eq(habits.id, id));
  });

const getHabitLogsFn = createServerFn().handler(async () => {
  return await db.select().from(habitLogs);
});

const createHabitLogFn = createServerFn()
  .validator(HabitLogFormSchema)
  .handler(async ({ data }) => {
    await db.insert(habitLogs).values({
      ...data,
      id: Bun.randomUUIDv7(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });

const deleteHabitLogFn = createServerFn()
  .validator(HabitLogSchema)
  .handler(async ({ data }) => {
    await db
      .delete(habitLogs)
      .where(
        eq(habitLogs.habitId, data.habitId) && eq(habitLogs.date, data.date),
      );
  });

export const habitCollection = createCollection(
  queryCollectionOptions({
    queryKey: ["habits"],
    queryClient,
    getKey: (item) => item.id,
    queryFn: async () => {
      return await getHabitsFn();
    },
    onUpdate: async ({ transaction }) => {
      const { modified } = transaction.mutations[0];
      await updateHabitFn({ data: modified });
    },
    onDelete: async ({ transaction }) => {
      const { modified } = transaction.mutations[0];
      await deleteHabitFn({ data: modified });
    },
    onInsert: async ({ transaction }) => {
      const { modified } = transaction.mutations[0];
      await createHabitFn({ data: modified });
    },
  }),
);

export const habitLogCollection = createCollection(
  queryCollectionOptions({
    queryKey: ["habit-logs"],
    queryClient,
    getKey: (item) => item.id,
    queryFn: async () => {
      return await getHabitLogsFn();
    },
    onDelete: async ({ transaction }) => {
      const { modified } = transaction.mutations[0];
      await deleteHabitLogFn({ data: modified });
    },
    onInsert: async ({ transaction }) => {
      const { modified } = transaction.mutations[0];
      await createHabitLogFn({ data: modified });
    },
  }),
);
