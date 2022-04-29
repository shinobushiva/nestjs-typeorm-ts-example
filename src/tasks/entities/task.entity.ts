import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

export enum TaskStatus {
  NEW,
  IN_PROGRESS,
  COMPLETE,
}

registerEnumType(TaskStatus, {
  name: 'TaskStatus',
});

@Entity()
@ObjectType()
export class Task {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column({ length: '255' })
  @Field()
  title: string;

  @Column('text')
  @Field({ nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.NEW,
  })
  @Field(() => TaskStatus)
  status: TaskStatus;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @CreateDateColumn()
  @Field()
  updatedAt: Date;
}
