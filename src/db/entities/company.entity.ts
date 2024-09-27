import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TaskEntity } from './task.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'Company' })
export class CompanyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(() => TaskEntity, (task) => task.company)
  tasks: TaskEntity[];

  @OneToMany(() => UserEntity, (user) => user.company)
  users: UserEntity[];
}
