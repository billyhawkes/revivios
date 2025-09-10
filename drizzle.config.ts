import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: ["./src/lib/db/schema.ts"],
  out: "./migrations",
  dbCredentials: {
    url: "file:persist/sqlite.db",
  },
  verbose: true,
  strict: true,
});
