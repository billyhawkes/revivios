import { z } from "zod";
import { createProtectedRouter } from "./protected-router";

export const tasksRouter = createProtectedRouter()
	.mutation("create", {
		input: z.object({
			name: z.string(),
		}),
		async resolve({ ctx, input: { name } }) {
			return await ctx.prisma.task.create({
				data: {
					name,
					description: "",
					userId: ctx.session.user.id,
					completed: false,
					date: new Date(),
				},
			});
		},
	})
	.query("findAll", {
		async resolve({ ctx }) {
			return await ctx.prisma.task.findMany();
		},
	});
