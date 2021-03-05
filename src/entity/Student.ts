import { Exclude } from "class-transformer";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import StudentGrade from "./StudentGrade";
import Answer from "./Answer";

@Entity()
export default class Student extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nim: number;

  @Column()
  name: string;

  @Column()
  imgPath: string;

  @Column("float")
  ipk: number;

  @OneToMany(() => StudentGrade, (studentGrade) => studentGrade.student)
  studentGrades: StudentGrade[];

  @OneToMany(() => Answer, (answer) => answer.student)
  answer: Answer[];

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;
}
