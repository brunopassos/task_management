import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CompanyEntity } from './company.entity';
import { UserEntity } from './user.entity';


export enum TaskStatusEnum {
  PENDING = 'Pendente',
  IN_PROGRESS = 'Em Progresso',
  COMPLETED = 'Comcluída',
}

@Entity({ name: 'Task' })
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'enum', enum: TaskStatusEnum })
  status: TaskStatusEnum;

  @Column({ type: 'date' })
  expirationDate: Date;

  @ManyToOne(() => CompanyEntity, (company) => company.tasks, {
    onDelete: 'CASCADE',
  })
  company: CompanyEntity;

  @ManyToOne(() => UserEntity, (user) => user.tasks, { onDelete: 'CASCADE' })
  user: UserEntity;
}


