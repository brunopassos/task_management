import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { v4 as uuid } from 'uuid';
import { UserDto } from './user.dto';

@Injectable()
export class UsersService {
  private readonly users: UserDto[] = [];

  create(newUser: UserDto) {
    newUser.id = uuid();
    newUser.password = bcryptHashSync(newUser.password, 10);
    this.users.push(newUser);
    return plainToInstance(UserDto, newUser);
  }

  findById(id: string): UserDto {
    const foundUser = this.users.filter((u) => u.id === id);
    if (foundUser.length) {
      return plainToInstance(UserDto, foundUser[0]);
    }

    throw new HttpException(
      `User with id ${id} not found`,
      HttpStatus.NOT_FOUND,
    );
  }

  update(id: string, user: UserDto): UserDto {
    const userIndex = this.users.findIndex((u) => u.id === id);

    if (userIndex < 0) {
      throw new HttpException(
        `User with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedUser: UserDto = {
      id,
      username: user.username,
      password: bcryptHashSync(user.password, 10),
      role: user.role,
      company: user.company,
    };

    this.users[userIndex] = updatedUser;

    return plainToInstance(UserDto, updatedUser);
  }

  remove(id: string) {
    const userIndex = this.users.findIndex((u) => u.id === id);

    if (userIndex >= 0) {
      this.users.splice(userIndex, 1);
      return;
    }

    throw new HttpException(
      `User with id ${id} not found`,
      HttpStatus.NOT_FOUND,
    );
  }
}
