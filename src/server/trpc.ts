// src/server/router/index.ts
import superjson from "superjson";
import { initTRPC } from "@trpc/server";
import { Context } from "./context";

export const t = initTRPC<{ ctx: Context }>()({
	transformer: superjson,
});
