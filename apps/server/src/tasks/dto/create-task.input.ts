import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTaskInput {
  @Field(() => String)
  name: string;

  @Field(() => Date, { nullable: true })
  date?: Date;
}
