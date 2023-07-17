import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class ImportResponse {
  @Field(() => Boolean, {
    description: 'true if the import had success.',
  })
  success: boolean;
}