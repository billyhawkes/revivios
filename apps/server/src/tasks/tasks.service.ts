import { Injectable } from '@nestjs/common';
import { CreateTaskInput } from './dto/create-task.input';

@Injectable()
export class TaskService {
  create(createTaskInput: CreateTaskInput) {
    return 'This action adds a new task';
  }

  findAll() {
    return [];
  }
}
