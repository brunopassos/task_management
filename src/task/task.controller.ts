import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { UserRoleEnum } from 'src/auth/userInterface/user.interface';
import { TaskDto } from './task.dto';
import { TaskService } from './task.service';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() task: TaskDto): TaskDto {
    return this.taskService.create(task);
  }

  @Get('/:id')
  findById(@Param('id') id: string): TaskDto {
    return this.taskService.findById(id);
  }

  @Patch('/:id')
  update(@Body() task: TaskDto, @Param('id') id: string): TaskDto {
    return this.taskService.update(id, task);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  @Delete('/:id')
  remove(@Param('id') id: string) {
    this.taskService.remove(id);
  }
}
