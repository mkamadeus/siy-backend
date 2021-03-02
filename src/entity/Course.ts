import { Exclude } from "class-transformer";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import StudentGrade from "./StudentGrade";
import Answer from './Answer';

@Entity()
export default class Course extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  sks: number;

  @Column()
  name: string;

  @Column()
  silabusRingkas: string;

  @Column()
  silabusLengkap: string;

  @Column()
  outcome: string;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  @OneToMany(() => StudentGrade, studentGrade => studentGrade.course)
  public studentGrades!: StudentGrade[];
  
  @OneToMany(() => Answer, answer => answer.course)
  public answer!: Answer[];
}
