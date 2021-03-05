import { Exclude } from "class-transformer";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import Question from "./Question";
import Student from "./Student";
import Lecture from "./Lecture";

@Entity()
export default class Answer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Question, (question) => question.answer)
  public question: Question;

  @ManyToOne(() => Student, (student) => student.answer)
  public student!: Student;

  @ManyToOne(() => Lecture, (course) => course.answer)
  public course!: Lecture;

  @Column({
    default: "",
  })
  strAnswer: string;

  @Column({
    default: "0",
  })
  intAnswer: number;

  @Column({
    default: "",
  })
  fileAnswer: string;

  @Column()
  formId: number;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;
}
