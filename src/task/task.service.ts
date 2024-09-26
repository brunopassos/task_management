import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TaskDto } from './task.dto';

@Injectable()
export class TaskService {
  private tasks: TaskDto[] = [];
  create(task: TaskDto) {
    this.tasks.push(task);
    console.log(this.tasks);
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

  update(id: string, task: TaskDto) {
    const taskIndex = this.tasks.findIndex((t) => t.id === task.id);

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
