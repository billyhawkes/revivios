import * as trpc from "@trpc/server";
import { t } from "../trpc";

/**
 * Creates a tRPC router that asserts all queries and mutations are from an authorized user. Will throw an unauthorized error if a user is not signed in.
 */
const isAuthed = t.middleware(({ ctx, next }) => {
	if (!ctx.session || !ctx.session.user || !ctx.session.user.id) {
		throw new trpc.TRPCError({ code: "UNAUTHORIZED" });
	}

	return next({ ctx: { session: { user: { id: ctx.session.user.id } } } });
});

export const authProcedure = t.procedure.use(isAuthed);
