import { Headers, Logger, Req, Request, UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTaskInput } from './dto/create-task.input';
import { Task } from './models/task.model';
import { TaskService } from './tasks.service';
import { GqlAuthGuard } from 'src/auth/gql.guard';

@Resolver()
export class TasksResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query(() => [Task], { name: 'tasks' })
  @UseGuards(GqlAuthGuard)
  tasks(@Context() { req: { user } }) {
    return this.taskService.findAll({ userId: user.id });
  }

  //   @Query(() => [Task], { name: 'tasksAdmin' })
  //   tasksAdmin() {
  //     return this.taskService.findAllAdmin();
  //   }

  @Mutation(() => Task)
  @UseGuards(GqlAuthGuard)
  create(
    @Args('createTaskInput') { name, date }: CreateTaskInput,
    @Context() { req: { user } },
  ) {
    return this.taskService.create({ name, date, userId: user.id });
  }

  @Mutation(() => Task, { name: 'remove' })
  @UseGuards(GqlAuthGuard)
  deleteTask(
    @Args('id', { type: () => Int }) id: number,
    @Context() { req: { user } },
  ) {
    return this.taskService.delete({ id, userId: user.id });
  }

  @Mutation(() => Task, { name: 'toggleComplete' })
  @UseGuards(GqlAuthGuard)
  toggleComplete(
    @Args('id', { type: () => Int }) id: number,
    @Context() { req: { user } },
  ) {
    return this.taskService.toggleComplete({ id, userId: user.id });
  }

  // @Mutation(() => Task, { name: 'changeDate' })
  // changeDate(@Args('date', { type: () => Date }) date: Date) {
  //   // return this.taskService.toggleComplete({ id, date });
  // }
}
