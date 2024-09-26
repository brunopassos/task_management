import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export enum TaskStatusEnum {
  PENDING = 'Pendente',
  IN_PROGRESS = 'Em Progresso',
  COMPLETED = 'Comcluída',
}

export class TaskDto {
  id: string;
  title: string;
  description: string;
  status: string;
  expirationDate: Date;
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsEnum(TaskStatusEnum)
  @IsNotEmpty()
  status: string;
  @IsNotEmpty()
  @IsDateString()
  expirationDate: Date;
}

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatusEnum)
  status?: TaskStatusEnum;

  @IsOptional()
  @IsDateString()
  expirationDate?: Date;
}
