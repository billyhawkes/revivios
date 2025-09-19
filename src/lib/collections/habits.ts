import { createCollection } from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { queryClient } from "@/lib/query";
import { HabitFormSchema } from "@/lib/habits";
import { db } from "../db";
import { habits } from "../db/schema";
import { eq } from "drizzle-orm";

const getHabits = createServerFn().handler(async () => {
  return await db.select().from(habits);
});

const createHabit = createServerFn()
  .validator(HabitFormSchema)
  .handler(async ({ data }) => {
    await db.insert(habits).values({
      ...data,
      id: Bun.randomUUIDv7(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });

const updateHabit = createServerFn()
  .validator(HabitFormSchema.extend({ id: z.string() }))
  .handler(async ({ data }) => {
    await db.update(habits).set(data).where(eq(habits.id, data.id));
  });

const deleteHabit = createServerFn()
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data: { id } }) => {
    await db.delete(habits).where(eq(habits.id, id));
  });

const getHabitLogs = createServerFn().handler(async () => {
  return await db.select().from(habits);
});

const createHabitLog = createServerFn()
  .validator(HabitFormSchema)
  .handler(async ({ data }) => {
    await db.insert(habits).values({
      ...data,
      id: Bun.randomUUIDv7(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });

const updateHabitLog = createServerFn()
  .validator(HabitFormSchema.extend({ id: z.string() }))
  .handler(async ({ data }) => {
    await db.update(habits).set(data).where(eq(habits.id, data.id));
  });

const deleteHabitLog = createServerFn()
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data: { id } }) => {
    await db.delete(habits).where(eq(habits.id, id));
  });

export const habitCollection = createCollection(
  queryCollectionOptions({
    queryKey: ["habits"],
    queryClient,
    getKey: (item) => item.id,
    queryFn: async () => {
      return await getHabits();
    },
    onUpdate: async ({ transaction }) => {
      const { modified } = transaction.mutations[0];
      await updateHabit({ data: modified });
    },
    onDelete: async ({ transaction }) => {
      const { modified } = transaction.mutations[0];
      await deleteHabit({ data: modified });
    },
    onInsert: async ({ transaction }) => {
      const { modified } = transaction.mutations[0];
      await createHabit({ data: modified });
    },
  }),
);

export const habitLogCollection = createCollection(
  queryCollectionOptions({
    queryKey: ["habit-logs"],
    queryClient,
    getKey: (item) => item.id,
    queryFn: async () => {
      return await getHabitLogs();
    },
    onUpdate: async ({ transaction }) => {
      const { modified } = transaction.mutations[0];
      await updateHabitLog({ data: modified });
    },
    onDelete: async ({ transaction }) => {
      const { modified } = transaction.mutations[0];
      await deleteHabitLog({ data: modified });
    },
    onInsert: async ({ transaction }) => {
      const { modified } = transaction.mutations[0];
      await createHabitLog({ data: modified });
    },
  }),
);
