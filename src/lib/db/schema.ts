import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

const dates = {
  createdAt: integer("created_at", {
    mode: "timestamp",
  })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", {
    mode: "timestamp",
  })
    .notNull()
    .$defaultFn(() => new Date()),
};

export const tasks = sqliteTable("tasks", {
  id: text()
    .primaryKey()
    .notNull()
    .$defaultFn(() => Bun.randomUUIDv7()),
  title: text().notNull(),
  description: text(),
  status: text({ enum: ["pending", "in-progress", "complete"] })
    .notNull()
    .$defaultFn(() => "pending"),
  date: integer("date", { mode: "timestamp" }),
  ...dates,
});

export const habits = sqliteTable("habits", {
  id: text()
    .primaryKey()
    .notNull()
    .$defaultFn(() => Bun.randomUUIDv7()),
  title: text().notNull(),
  description: text(),
  type: text({ enum: ["avoid", "do"] }).notNull(),
  frequency: integer(),
  startDate: integer("start_date", { mode: "timestamp" }),
  ...dates,
});

export const habitLogs = sqliteTable("habit_logs", {
  id: text()
    .primaryKey()
    .notNull()
    .$defaultFn(() => Bun.randomUUIDv7()),
  habitId: text().notNull(),
  date: integer("date", { mode: "timestamp" }).notNull(),
  ...dates,
});
