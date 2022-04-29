import { InputType, Field } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { TaskStatus } from '../entities/task.entity';

@InputType()
export class CreateTaskInput {
  @MaxLength(255)
  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => TaskStatus)
  status: TaskStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
