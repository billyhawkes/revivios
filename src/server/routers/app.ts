import { t } from "../trpc";
import { tasksRouter } from "./tasks";

export const appRouter = t.router({
	tasks: tasksRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
