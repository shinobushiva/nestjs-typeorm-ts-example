import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepostiory: Repository<Task>,
  ) {}

  async create(createTaskInput: CreateTaskInput) {
    const task = this.taskRepostiory.create(createTaskInput);
    await this.taskRepostiory.save(task);
    return task;
  }

  findAll() {
    return this.taskRepostiory.find();
  }

  async findOne(id: number) {
    return await this.taskRepostiory.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateTaskInput: UpdateTaskInput) {
    const task = this.findOne(id);
    if (task) {
      await this.taskRepostiory.save(updateTaskInput);
    }
  }

  async remove(id: number) {
    const result = await this.taskRepostiory.delete(id);
    return result.affected > 0;
  }
}
