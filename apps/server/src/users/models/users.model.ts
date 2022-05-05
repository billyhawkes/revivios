import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Float)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => Int)
  xp: number;
}
