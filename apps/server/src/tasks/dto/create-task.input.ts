import { InputType, Field, Context } from '@nestjs/graphql';

@InputType()
export class CreateTaskInput {
  @Field(() => String)
  name: string;

  @Field(() => Date, { nullable: true })
  date?: Date;
}
