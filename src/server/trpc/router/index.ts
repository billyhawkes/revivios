// src/server/trpc/router/index.ts
import { t } from "../trpc";
import authRouter from "./auth";
import tasksRouter from "./tasks";

export const appRouter = t.router({
	tasks: tasksRouter,
	auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
