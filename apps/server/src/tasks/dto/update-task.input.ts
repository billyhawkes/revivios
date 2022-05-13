import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class UpdateTaskInput {
  @Field(() => Float)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Boolean)
  completed: boolean;

  @Field(() => Date, { nullable: true })
  date?: Date;
}
