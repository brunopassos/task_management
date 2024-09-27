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

@UseGuards(AuthGuard, RolesGuard)
@Roles(UserRoleEnum.ADMIN)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() user: CreateUserDto): Promise<UserDto> {
    return await this.usersService.create(user);
  }

  @Get('/:id')
  async findById(@Param('id') id: string): Promise<UserDto> {
    return await this.usersService.findById(id);
  }

  @Patch('/:id')
  async update(
    @Body() user: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<UserDto> {
    return await this.usersService.update(id, user);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id);
  }
}
