import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RegisterInput } from './dto/register.input';
import { User } from './models/users.model';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(() => User)
  user(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Query(() => [User])
  users() {
    return this.userService.findAll();
  }

  @Mutation(() => User)
  createUser(@Args('registerInput') registerInput: RegisterInput) {
    return this.userService.create(registerInput);
  }
}
