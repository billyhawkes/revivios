import { z } from "zod";
import { CreateTaskSchema } from "../../../types/Task";
import { t } from "../trpc";
import { authProcedure } from "./auth";

export const tasksRouter = t.router({
	create: authProcedure.input(CreateTaskSchema).mutation(
		async ({ ctx, input: { name, date } }) =>
			await ctx.prisma.task.create({
				data: {
					name,
					description: "",
					userId: ctx.session.user.id,
					completed: false,
					date,
				},
			})
	),
	update: authProcedure
		.input(z.object({ id: z.string(), name: z.string() }))
		.query(
			async ({ ctx, input: { id, name } }) =>
				await ctx.prisma.task.update({ where: { id }, data: { name } })
		),
	findOne: authProcedure
		.input(z.object({ id: z.string() }))
		.query(
			async ({ ctx, input: { id } }) => await ctx.prisma.task.findFirst({ where: { id } })
		),
	findAll: authProcedure.query(async ({ ctx }) => await ctx.prisma.task.findMany()),
	delete: authProcedure
		.input(z.object({ id: z.string() }))
		.mutation(
			async ({ ctx, input: { id } }) => await ctx.prisma.task.delete({ where: { id } })
		),
});
