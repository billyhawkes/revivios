import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class TasksInput {
  @Field(() => Date, { nullable: true })
  date?: Date;
}
