import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTaskInput } from './dto/create-task.input';
import { Task } from './models/task.model';
import { TaskService } from './tasks.service';

@Resolver()
export class TasksResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query(() => [Task], { name: 'tasks' })
  tasks() {
    return this.taskService.findAll();
  }

  @Query(() => Task, { name: 'task' })
  task(@Args('id', { type: () => Int }) id: number) {
    return this.taskService.findOne(id);
  }

  @Mutation(() => Task)
  createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput) {
    return this.taskService.create(createTaskInput);
  }

  @Mutation(() => Task, { name: 'remove' })
  deleteTask(@Args('id', { type: () => Int }) id: number) {
    return this.taskService.delete(id);
  }

  @Mutation(() => Task, { name: 'toggleComplete' })
  toggleComplete(@Args('id', { type: () => Int }) id: number) {
    return this.taskService.toggleComplete(id);
  }

  @Mutation(() => Task, { name: 'changeDate' })
  changeDate(@Args('date', { type: () => Date }) date: Date) {
    // return this.taskService.toggleComplete({ id, date });
  }
}
