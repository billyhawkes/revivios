import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskInput } from './dto/create-task.input';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  create(createTaskInput: CreateTaskInput) {
    const newTask = this.taskRepository.create(createTaskInput);
    return this.taskRepository.save(newTask);
  }

  findAll() {
    return this.taskRepository.find();
  }

  findOne(id: number) {
    try {
      const task = this.taskRepository.findOneOrFail(id);
      return task;
    } catch (err) {
      // TODO: handle error
    }
  }
}
