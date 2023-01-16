import { z } from "zod";

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
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        date: z.date(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.task.create({
        data: { ...input, userId: ctx.session.user.id },
      });
    }),
});
