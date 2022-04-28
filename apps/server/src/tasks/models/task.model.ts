import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Task {
  @Field(() => Float)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Boolean)
  completed: boolean;

  @Field(() => Date, { nullable: true })
  date?: Date;
}
