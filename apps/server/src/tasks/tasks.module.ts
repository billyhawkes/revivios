import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { Task } from './entities/task.entity';
import { TasksResolver } from './tasks.resolver';
import { TaskService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), UsersModule],
  providers: [TasksResolver, TaskService],
})
export class TasksModule {}
