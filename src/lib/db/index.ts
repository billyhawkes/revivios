import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import * as schema from "./schema";

const sqlite = new Database("./persist/sqlite.db");
export const db = drizzle({
  client: sqlite,
  schema,
});

db.run("PRAGMA foreign_keys = ON");
db.run("PRAGMA journal_mode = WAL");
