import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTaskInput } from './dto/create-task.input';
import { Task } from './models/task.model';
import { TaskService } from './tasks.service';

@Resolver()
export class TasksResolver {
  constructor(private readonly taskService: TaskService) {}

  @Mutation(() => Task)
  createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput) {
    return this.taskService.create(createTaskInput);
  }

  @Query(() => [Task], { name: 'tasks' })
  tasks() {
    return this.taskService.findAll();
  }
  @Query(() => Task, { name: 'task' })
  task(@Args('taskId') id: number) {
    return this.taskService.findOne(id);
  }
  @Mutation(() => Task, { name: 'remove' })
  deleteTask(@Args('id', { type: () => Int }) id: number) {
    return this.taskService.delete(id);
  }
}
