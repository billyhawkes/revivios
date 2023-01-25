import { createTRPCRouter } from "./trpc";
import { tasksRouter } from "./routers/tasks";
import { usersRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  tasks: tasksRouter,
  users: usersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
