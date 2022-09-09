import { z } from "zod";
import { CreateTaskSchema, UpdateTaskSchema } from "../../../types/tasks";
import { authedProcedure, t } from "../trpc";

const tasksRouter = t.router({
	findAll: authedProcedure.query(
		async ({ ctx }) =>
			await ctx.prisma.task.findMany({ where: { userId: ctx.session.user.id } })
	),
	findOne: authedProcedure.input(z.object({ id: z.string().cuid() })).query(
		async ({ ctx, input }) =>
			await ctx.prisma.task.findFirst({
				where: { id: input.id, userId: ctx.session.user.id },
			})
	),
	create: authedProcedure.input(CreateTaskSchema).mutation(
		async ({ ctx, input: { name, date } }) =>
			await ctx.prisma.task.create({
				data: {
					userId: ctx.session.user.id,
					name,
					description: "",
					date,
					completed: false,
				},
			})
	),
	update: authedProcedure.input(UpdateTaskSchema).mutation(
		async ({ ctx, input: { id, name, description, date, completed } }) =>
			await ctx.prisma.task.update({
				where: { id },
				data: { name, description, date, completed },
			})
	),
	delete: authedProcedure
		.input(z.object({ id: z.string().cuid() }))
		.mutation(
			async ({ ctx, input: { id } }) => await ctx.prisma.task.delete({ where: { id } })
		),
});

export default tasksRouter;
