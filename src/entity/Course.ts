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
import Answer from "./Answer";

@Entity()
export default class Lecture extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "code" })
  code: string;

  @Column({ name: "name" })
  name: string;

  @Column({ name: "credits" })
  credits: number;

  @Column({ name: "brief_syllabus" })
  briefSyllabus: string;

  @Column({ name: "complete_syllabus" })
  completeSyllabus: string;

  @Column({ name: "outcome" })
  outcome: string;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  @OneToMany(() => StudentGrade, (studentGrade) => studentGrade.attendedClass)
  public studentGrades!: StudentGrade[];

  @OneToMany(() => Answer, (answer) => answer.course)
  public answer!: Answer[];
}
