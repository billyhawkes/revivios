import { z } from "zod";
import {
  CreateTaskSchema,
  DeleteTaskSchema,
  UpdateTaskSchema,
} from "../../../types/tasks";

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
      return await ctx.prisma.task.update({
        where: { id: input.id, userId: ctx.session.user.id },
        data: { ...input },
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
