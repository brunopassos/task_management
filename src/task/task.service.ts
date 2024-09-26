import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto, TaskDto, UpdateTaskDto } from './task.dto';

@Injectable()
export class TaskService {
  private tasks: TaskDto[] = [];
  create(newTask: CreateTaskDto): TaskDto {
    const task = {
      ...newTask,
      id: uuid(),
    };
    this.tasks.push(task);
    return task;
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

  update(id: string, task: UpdateTaskDto): TaskDto {
    const taskIndex = this.tasks.findIndex((t) => t.id === id);

    if (taskIndex < 0) {
      throw new HttpException(
        `Task with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    const existingTask = this.tasks[taskIndex];

    const updatedTask: TaskDto = {
      ...existingTask,
      title: task.title ?? existingTask.title,
      description: task.description ?? existingTask.description,
      status: task.status ?? existingTask.status,
      expirationDate: task.expirationDate ?? existingTask.expirationDate,
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
