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
import Faker from "faker";

@Entity()
export default class Student extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nim: string;

  @Column()
  name: string;

  @Column({ default: Faker.internet.avatar() })
  imgPath: string;

  @Column({ type: "float", default: 0 })
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
