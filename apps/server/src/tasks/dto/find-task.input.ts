import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class FindTaskInput {
  @Field(() => Int)
  id: number;
}
