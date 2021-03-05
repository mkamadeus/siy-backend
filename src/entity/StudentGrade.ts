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
import { IndexEnum } from "@/enum/IndexEnum";
import Lecture from "./Course";

@Entity()
export default class StudentGrade extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "student_id", nullable: true })
  studentId: number;

  @Column({ name: "class_id", nullable: true })
  classId: number;

  @Column()
  semester: number;

  @Column()
  year: number;

  @Column({ type: "enum" })
  index: IndexEnum;

  @Column({ name: "lo_a", type: "float" })
  loA: number;

  @Column({ name: "lo_b", type: "float" })
  loB: number;

  @Column({ name: "lo_c", type: "float" })
  loC: number;

  @Column({ name: "lo_d", type: "float" })
  loD: number;

  @Column({ name: "lo_e", type: "float" })
  loE: number;

  @Column({ name: "lo_f", type: "float" })
  loF: number;

  @Column({ name: "lo_g", type: "float" })
  loG: number;

  @Column({ name: "mid_test", type: "float" })
  midTest: number;

  @Column({ name: "quiz", type: "float" })
  quiz: number;

  @Column({ name: "final_test", type: "float" })
  finalTest: number;

  @Column({ name: "practicum", type: "float" })
  practicum: number;

  @Column({ name: "homework", type: "float" })
  homework: number;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  @ManyToOne(() => Student, (student) => student.studentGrades)
  public student: Student;

  @ManyToOne(() => Lecture, (course) => course.studentGrades)
  public attendedClass!: Lecture;
}
