import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { Create, Delete, FindAll, FindOne, Update } from './tasks.service.d';

// SERVICES
@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private usersService: UsersService,
  ) {}

  async create({ name, date = null, userId }: Create) {
    const newTask = await this.taskRepository.create({
      name,
      date: date ? date.toISOString() : date,
      userId,
    });
    return this.taskRepository.save(newTask);
  }

  async findAll({ userId }: FindAll) {
    return this.taskRepository.find({ where: { userId } });
  }

  async findOne({ id, userId }: FindOne) {
    const task = await this.taskRepository.findOne(id, { where: { userId } });
    return task;
  }

  async delete({ id, userId }: Delete) {
    const task = await this.findOne({ id, userId });
    await this.taskRepository.delete([id, userId]);
    return task;
  }

  async update({ id, name, completed, date, userId }: Update) {
    const task = await this.findOne({ id, userId });
    task.completed = completed;
    task.date = date;
    task.name = name;
    return this.taskRepository.save(task);
  }
}
