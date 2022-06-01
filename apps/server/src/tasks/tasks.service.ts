import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThanOrEqual, Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import {
  CreateTask,
  DeleteTask,
  FindAllOnDateTask,
  FindOneTask,
  UpdateTask,
} from './tasks.service.d';
import dayjs from 'dayjs';
import { UsersService } from 'src/users/users.service';

// SERVICES
@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private userService: UsersService,
  ) {}

  async create({ name, date = null, userId }: CreateTask) {
    const newTask = await this.taskRepository.create({
      name,
      date: date ? date.toISOString() : date,
      userId,
    });
    return this.taskRepository.save(newTask);
  }

  async findAll(userId: number) {
    return this.taskRepository.find({ where: { userId } });
  }

  async findOverdue(userId: number) {
    return this.taskRepository.find({
      where: {
        date: LessThanOrEqual(dayjs().startOf('day').toDate()),
        userId,
        completed: false,
      },
    });
  }

  async findAllOnDate({ date = null, userId }: FindAllOnDateTask) {
    let formatedDate: any = date;
    if (formatedDate !== null) {
      formatedDate = Between(
        dayjs(date).startOf('day').toDate(),
        dayjs(date).endOf('day').toDate(),
      );
    }
    return this.taskRepository.find({
      where: {
        date: formatedDate,
        userId,
      },
    });
  }

  async findOne({ id, userId }: FindOneTask) {
    const task = await this.taskRepository.findOne(id, {
      where: { userId },
    });
    return task;
  }

  async delete({ id, userId }: DeleteTask) {
    const task = await this.findOne({ id, userId });
    await this.taskRepository.delete([id, userId]);
    return task;
  }

  async update({ id, name, completed, date, userId }: UpdateTask) {
    const task = await this.findOne({ id, userId });

    // Alter xp
    if (!task.completed && completed)
      await this.userService.alterXP({ userId, amount: 1 });
    else if (task.completed && !completed)
      await this.userService.alterXP({ userId, amount: -1 });

    // Update task
    task.completed = completed;
    task.date = date;
    task.name = name;

    return this.taskRepository.save(task);
  }
}
