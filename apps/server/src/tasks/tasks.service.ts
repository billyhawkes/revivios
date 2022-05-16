import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Between, LessThanOrEqual, Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import {
  Create,
  Delete,
  FindAll,
  FindAllOnDate,
  FindOne,
  FindOverdue,
  Update,
} from './tasks.service.d';
import dayjs from 'dayjs';

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

  async findOverdue({ userId }: FindOverdue) {
    return this.taskRepository.find({
      where: {
        date: LessThanOrEqual(dayjs().startOf('day').toDate()),
        userId,
        completed: false,
      },
    });
  }

  async findAllOnDate({ date = null, userId }: FindAllOnDate) {
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
