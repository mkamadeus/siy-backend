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

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  @OneToMany(() => StudentGrade, (studentGrade) => studentGrade.student)
  public studentGrades: StudentGrade[];

  @OneToMany(() => Answer, (answer) => answer.student)
  public answer: Answer[];
}
