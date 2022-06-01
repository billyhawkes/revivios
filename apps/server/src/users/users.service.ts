import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUser, UpdateUser } from './users.service.d';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create({ name, email }: CreateUser) {
    const newUser = await this.userRepository.create({
      name,
      email,
      xp: 0,
    });
    await this.userRepository.save(newUser);

    return newUser;
  }

  async update({ name, id }: UpdateUser) {
    const user = await this.findOne(id);
    user.name = name;
    return this.userRepository.save(user);
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneOrFail(id);
    return user;
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: { email },
      });
      return user;
    } catch (err) {
      return undefined;
    }
  }
}
