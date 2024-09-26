import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserDto } from './user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() user: UserDto): UserDto {
    return this.usersService.create(user);
  }

  @Get('/:id')
  findById(@Param('id') id: string): UserDto {
    return this.usersService.findById(id);
  }

  @Patch('/:id')
  update(@Body() user: UserDto, @Param('id') id: string): UserDto {
    return this.usersService.update(id, user);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    this.usersService.remove(id);
  }
}
