import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hashSync as bcryptHashSync, compareSync } from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { v4 as uuid } from 'uuid';
import { UpdateUserDto, UserDto } from './user.dto';

@Injectable()
export class UsersService {
  private readonly users: UserDto[] = [];

  create(newUser: UserDto) {
    const foundUser = this.users.find((u) => u.username === newUser.username);

    if (foundUser) {
      throw new HttpException(`User already existis`, HttpStatus.BAD_REQUEST);
    }

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

  findUserByNameAndPassword(username: string, password: string): UserDto {
    const foundUser = this.users.find((u) => u.username === username);

    const invalidCredentialsMessage = 'Invalid username or password!';

    if (!foundUser) {
      throw new HttpException(
        invalidCredentialsMessage,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const passwordMatches = compareSync(password, foundUser.password);

    if (!passwordMatches) {
      throw new HttpException(
        invalidCredentialsMessage,
        HttpStatus.UNAUTHORIZED,
      );
    }

    return plainToInstance(UserDto, foundUser);
  }

  update(id: string, user: UpdateUserDto): UserDto {
    const userIndex = this.users.findIndex((u) => u.id === id);

    if (userIndex < 0) {
      throw new HttpException(
        `User with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    const existingUser = this.users[userIndex];

    const updatedUser: UserDto = {
      ...existingUser,
      username: user.username ?? existingUser.username,
      password: user.password
        ? bcryptHashSync(user.password, 10)
        : existingUser.password,
      roles: user.roles ?? existingUser.roles,
      company: user.company ?? existingUser.company,
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
