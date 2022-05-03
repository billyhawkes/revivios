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

  async create({ name, date }: CreateTaskInput) {
    const newTask = await this.taskRepository.create({
      name,
      date: date.toISOString(),
    });
    return this.taskRepository.save(newTask);
  }

  async findAll() {
    return this.taskRepository.find();
  }

  async findOne(id: number) {
    try {
      const task = await this.taskRepository.findOneOrFail(id);
      return task;
    } catch (err) {
      // TODO: handle error
    }
  }

  async delete(id: number) {
    const task = await this.findOne(id);
    await this.taskRepository.delete(id);
    return task;
  }

  async toggleComplete(id: number) {
    const task = await this.findOne(id);
    task.completed = !task.completed;
    return this.taskRepository.save(task);
  }

  async changeDate({ id, date }: { id: number; date: Date }) {
    const task = await this.findOne(id);
    task.date = date;
    return this.taskRepository.save(task);
  }
}
