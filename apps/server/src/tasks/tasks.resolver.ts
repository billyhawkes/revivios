import { Headers, Logger, Req, Request, UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTaskInput } from './dto/create-task.input';
import { Task } from './models/task.model';
import { TaskService } from './tasks.service';
import { UpdateTaskInput } from './dto/update-task.input';
import { GqlAuthGuard } from 'src/auth/jwt/gql.guard';

@Resolver()
export class TasksResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query(() => [Task], { name: 'tasks' })
  @UseGuards(GqlAuthGuard)
  tasks(@Context() { req: { user } }) {
    return this.taskService.findAll(user.id);
  }

  @Query(() => Task, { name: 'task' })
  @UseGuards(GqlAuthGuard)
  task(@Context() { req: { user } }, @Args('id') id: number) {
    return this.taskService.findOne({ id, userId: user.id });
  }

  @Mutation(() => Task, { name: 'createTask' })
  @UseGuards(GqlAuthGuard)
  create(
    @Args('createTaskInput') { name, date }: CreateTaskInput,
    @Context() { req: { user } },
  ) {
    return this.taskService.create({ name, date, userId: user.id });
  }

  @Mutation(() => Task, { name: 'deleteTask' })
  @UseGuards(GqlAuthGuard)
  delete(
    @Args('id', { type: () => Int }) id: number,
    @Context() { req: { user } },
  ) {
    return this.taskService.delete({ id, userId: user.id });
  }

  @Mutation(() => Task, { name: 'updateTask' })
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
