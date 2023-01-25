import { createTRPCRouter, protectedProcedure } from "../trpc";

export const usersRouter = createTRPCRouter({
  getUser: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findFirst({
      where: { id: ctx.session.user.id },
    });
  }),
});
