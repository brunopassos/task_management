import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from 'src/users/user.dto';

export class CreateCompanyWithAdminDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsArray()
  users: CreateUserDto[];
}

export class CompanyDto {
  id: string;
  name: string;
}
export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsArray()
  @IsNotEmpty()
  users: string[];
  @IsNotEmpty()
  @IsArray()
  tasks: string[];
}

export class UpdateCompanyDto {
  name?: string;
  users?: string[];
  tasks?: string[];
}
