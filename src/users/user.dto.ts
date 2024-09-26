import { Exclude } from 'class-transformer';
import { UserRoleEnum } from 'src/auth/userInterface/user.interface';

export class UserDto {
  id: string;
  username: string;

  @Exclude()
  password: string;
  company: string;
  roles: UserRoleEnum[];
}
