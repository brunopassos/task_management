import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { TaskDto } from './task.dto';

@Injectable()
export class TaskService {
  private tasks: TaskDto[] = [];
  create(newTask: TaskDto): TaskDto {
    newTask.id = uuid();
    this.tasks.push(newTask);
    return newTask;
  }

  findById(id: string): TaskDto {
    const foundTask = this.tasks.filter((t) => t.id === id);
    if (foundTask.length) {
      return foundTask[0];
    }

    throw new HttpException(
      `Task with id ${id} not found`,
      HttpStatus.NOT_FOUND,
    );
  }

  update(id: string, task: TaskDto): TaskDto {
    const taskIndex = this.tasks.findIndex((t) => t.id === id);

    if (taskIndex < 0) {
      throw new HttpException(
        `Task with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedTask: TaskDto = {
      id,
      title: task.title,
      description: task.description,
      status: task.status,
      expirationDate: task.expirationDate,
    };

    this.tasks[taskIndex] = updatedTask;

    return updatedTask;
  }

  remove(id: string) {
    const taskIndex = this.tasks.findIndex((t) => t.id === id);

    if (taskIndex >= 0) {
      this.tasks.splice(taskIndex, 1);
      return;
    }

    throw new HttpException(
      `Task with id ${id} not found`,
      HttpStatus.NOT_FOUND,
    );
  }
}
