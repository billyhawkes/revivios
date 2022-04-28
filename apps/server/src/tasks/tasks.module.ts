import { Module } from '@nestjs/common';
import { TasksResolver } from './tasks.resolver';
import { TaskService } from './tasks.service';

@Module({
  providers: [TasksResolver, TaskService],
})
export class TasksModule {}
