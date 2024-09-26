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
import { CreateUserDto, UpdateUserDto, UserDto } from './user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() user: CreateUserDto): UserDto {
    return this.usersService.create(user);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  @Get('/:id')
  findById(@Param('id') id: string): UserDto {
    return this.usersService.findById(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  @Patch('/:id')
  update(@Body() user: UpdateUserDto, @Param('id') id: string): UserDto {
    return this.usersService.update(id, user);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  @Delete('/:id')
  remove(@Param('id') id: string) {
    this.usersService.remove(id);
  }
}
