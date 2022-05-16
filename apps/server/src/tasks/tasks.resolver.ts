import { Headers, Logger, Req, Request, UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTaskInput } from './dto/create-task.input';
import { Task } from './models/task.model';
import { TaskService } from './tasks.service';
import { GqlAuthGuard } from 'src/auth/gql.guard';
import { UpdateTaskInput } from './dto/update-task.input';
import { TasksInput } from './dto/tasks.input';

@Resolver()
export class TasksResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query(() => [Task], { name: 'tasks' })
  @UseGuards(GqlAuthGuard)
  tasks(
    @Context() { req: { user } },
    @Args('tasksInput') { date }: TasksInput,
  ) {
    return this.taskService.findAllOnDate({ date, userId: user.id });
  }

  @Query(() => [Task], { name: 'overdue' })
  @UseGuards(GqlAuthGuard)
  overdue(@Context() { req: { user } }) {
    return this.taskService.findOverdue({ userId: user.id });
  }

  @Mutation(() => Task)
  @UseGuards(GqlAuthGuard)
  create(
    @Args('createTaskInput') { name, date }: CreateTaskInput,
    @Context() { req: { user } },
  ) {
    return this.taskService.create({ name, date, userId: user.id });
  }

  @Mutation(() => Task, { name: 'delete' })
  @UseGuards(GqlAuthGuard)
  delete(
    @Args('id', { type: () => Int }) id: number,
    @Context() { req: { user } },
  ) {
    return this.taskService.delete({ id, userId: user.id });
  }

  @Mutation(() => Task, { name: 'update' })
  @UseGuards(GqlAuthGuard)
  update(
    @Args('updateTaskInput') { id, name, completed, date }: UpdateTaskInput,
    @Context() { req: { user } },
  ) {
    return this.taskService.update({
      id,
      name,
      completed,
      date,
      userId: user.id,
    });
  }
}
