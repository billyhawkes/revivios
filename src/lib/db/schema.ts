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
  ...dates,
});
