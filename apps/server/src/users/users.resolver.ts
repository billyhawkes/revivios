import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/jwt/gql.guard';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './models/users.model';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  user(@Context() { req: { user } }) {
    return this.userService.findOne(user.id);
  }

  @Mutation(() => User, { name: 'updateUser' })
  @UseGuards(GqlAuthGuard)
  update(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @Context() { req: { user } },
  ) {
    return this.userService.update({ ...updateUserInput, userId: user.id });
  }
}
