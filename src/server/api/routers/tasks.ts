import {
  CreateTaskSchema,
  DeleteTaskSchema,
  UpdateTaskSchema,
} from "../../../types/tasks";
import { getNewXPLevel, XPAmounts } from "../../../utils/xp";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const tasksRouter = createTRPCRouter({
  getTasks: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.task.findMany({
      where: { userId: ctx.session.user.id },
    });
  }),
  create: protectedProcedure
    .input(CreateTaskSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.task.create({
        data: {
          ...input,
          description: "",
          completed: false,
          userId: ctx.session.user.id,
        },
      });
    }),
  update: protectedProcedure
    .input(UpdateTaskSchema)
    .mutation(async ({ ctx, input }) => {
      const oldTask = await ctx.prisma.task.findFirst({
        where: { id: input.id, userId: ctx.session.user.id },
        include: { user: true },
      });

      if (!oldTask) return;

      const newXP = getNewXPLevel({
        xp: oldTask.user.xp,
        level: oldTask.user.level,
        change:
          !oldTask.completed && input.completed
            ? XPAmounts.task
            : oldTask.completed && input.completed
            ? -XPAmounts.task
            : 0,
      });

      return await ctx.prisma.task.update({
        where: { id: input.id, userId: ctx.session.user.id },
        data: { ...input, user: { update: { data: { ...newXP } } } },
      });
    }),
  delete: protectedProcedure
    .input(DeleteTaskSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.task.delete({
        where: { id: input.id, userId: ctx.session.user.id },
      });
    }),
});
