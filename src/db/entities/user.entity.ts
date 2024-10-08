import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CompanyEntity } from './company.entity';
import { TaskEntity } from './task.entity';

export enum UserRoleEnum {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity({ name: 'User' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'enum', enum: UserRoleEnum })
  roles: UserRoleEnum;

  @ManyToOne(() => CompanyEntity, (company) => company.users, { eager: true })
  company: CompanyEntity;

  @OneToMany(() => TaskEntity, (task) => task.user)
  tasks: TaskEntity[];
}
