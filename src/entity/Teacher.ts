import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Teaches from './Teaches';
import User from './User';

@Entity()
export default class Teacher extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'teacher_name' })
  name: string;

  @Column({ name: 'user_id', nullable: true })
  userId: number;

  @OneToMany(() => Teaches, (teaches) => teaches.teacher)
  teaches: Teaches[];

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;
}
