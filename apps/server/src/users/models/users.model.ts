import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Task } from 'src/tasks/models/task.model';

@ObjectType()
export class User {
  @Field(() => Float)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => Int)
  xp: number;

  @Field(() => [Task])
  tasks: Task[];
}
