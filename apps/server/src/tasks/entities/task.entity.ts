import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: false })
  completed: boolean;

  @Column({ type: 'timestamptz', default: null, nullable: true })
  date?: Date;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
