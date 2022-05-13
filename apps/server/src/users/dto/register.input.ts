import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class RegisterInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;
}
