import { TaskStatusEnum } from 'src/task/task.dto';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'task' })
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'enum' })
  status: TaskStatusEnum;

  @Column({ type: 'date' })
  expirationDate: Date;
}
