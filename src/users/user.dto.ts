import { Exclude } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { UserRoleEnum } from 'src/auth/userInterface/user.interface';

export class UserDto {
  id: string;

  username: string;

  @Exclude()
  password: string;

  company: string;

  roles: UserRoleEnum[];
}

export class CreateUserDto {
  id: string;
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
  @IsString()
  @IsNotEmpty()
  company: string;
  @IsArray()
  @IsNotEmpty()
  roles: UserRoleEnum[];
}

export class UpdateUserDto {
  username?: string;

  password?: string;
  company?: string;
  roles?: UserRoleEnum[];
}
