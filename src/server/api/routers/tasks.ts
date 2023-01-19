import { z } from "zod";
import { CreateTaskSchema, UpdateTaskSchema } from "../../../types/tasks";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const tasksRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

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
});
