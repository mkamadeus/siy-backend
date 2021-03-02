import { Exclude } from "class-transformer";

import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  
} from "typeorm";
import Student from "./Student";
import Course from "./Course";

@Entity()
export default class StudentGrade extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  studentId!: number;

  @Column()
  courseId!: number;

  @Column()
  indeks!: string;

  @Column()
  semester!: number;

  @Column()
  year!: number;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  @ManyToOne(() => Student, student => student.studentGrades)
  public student! : Student; 

  @ManyToOne(() => Course, course => course.studentGrades)
  public course! : Course; 

}