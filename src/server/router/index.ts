// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import { tasksRouter } from "./tasks";

export const appRouter = createRouter().transformer(superjson).merge("tasks.", tasksRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
