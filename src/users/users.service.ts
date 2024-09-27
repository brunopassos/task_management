import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync as bcryptHashSync, compareSync } from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { CompanyEntity } from 'src/db/entities/company.entity';
import { UserEntity } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateUserDto, UpdateUserDto, UserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,

    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
  ) {}

  async create(newUser: CreateUserDto): Promise<UserDto> {
    const foundUser = await this.usersRepository.findOne({
      where: { username: newUser.username },
    });

    if (foundUser) {
      throw new HttpException(`User already exists`, HttpStatus.BAD_REQUEST);
    }

    const foundCompany = await this.companyRepository.findOne({
      where: { id: newUser.companyId },
    });

    const userEntity = new UserEntity();

    userEntity.id = uuid();
    userEntity.password = bcryptHashSync(newUser.password, 10);
    userEntity.username = newUser.username;
    userEntity.company = foundCompany;
    userEntity.roles = newUser.roles;

    const user = {
      id: uuid(),
      password: bcryptHashSync(newUser.password, 10),
      username: newUser.username,
      companyId: foundCompany.id,
      roles: newUser.roles,
    };

    await this.usersRepository.save(userEntity);
    return plainToInstance(UserDto, user);
  }

  async findById(id: string): Promise<UserDto> {
    const foundUser = await this.usersRepository.findOne({
      where: { id },
    });

    if (foundUser) {
      return plainToInstance(UserDto, foundUser);
    }

    throw new HttpException(
      `User with id ${id} not found`,
      HttpStatus.NOT_FOUND,
    );
  }

  async findUserByNameAndPassword(
    username: string,
    password: string,
  ): Promise<UserDto> {
    const foundUser = await this.usersRepository.findOne({
      where: {
        username,
      },
    });

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

  async update(id: string, user: UpdateUserDto): Promise<UserDto> {
    const foundUser = await this.usersRepository.findOne({
      where: { id },
    });

    if (!foundUser) {
      throw new HttpException(
        `User with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    if ('company' in user) {
      const foundCompany = await this.companyRepository.findOne({
        where: { id: user.company },
      });

      const updatedUser = {
        id,
        username: user.username ?? foundUser.username,
        password: user.password
          ? bcryptHashSync(user.password, 10)
          : foundUser.password,
        roles: user.roles ?? foundUser.roles,
        companyId: foundCompany.id,
      };

      await this.usersRepository.update(updatedUser.id, updatedUser);

      return plainToInstance(UserDto, updatedUser);
    }

    const updatedUser: UserDto = {
      id,
      username: user.username ?? foundUser.username,
      password: user.password
        ? bcryptHashSync(user.password, 10)
        : foundUser.password,
      roles: user.roles ?? foundUser.roles,
      companyId: user.company,
    };

    await this.usersRepository.update(updatedUser.id, updatedUser);

    return plainToInstance(UserDto, updatedUser);
  }

  async remove(id: string) {
    const userFound = await this.usersRepository.findOne({
      where: { id },
    });

    if (!userFound) {
      throw new HttpException(
        `User with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.usersRepository.delete(id);
  }
}
