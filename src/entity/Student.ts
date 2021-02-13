import {
  BaseEntity,
  Column,
  Entity,
  //OneToMany,
  PrimaryColumn,
} from "typeorm";
//import StudentGrade from "./StudentGrade";

@Entity()
export default class Student extends BaseEntity {
  @PrimaryColumn()
  nim: number;

  @Column()
  name: string;

  @Column()
  imgPath: string;

  @Column("float")
  ipk: number;

  //@OneToMany(() => StudentGrade, (studentGrade) => studentGrade.nim)
  //studentGrade: studentGrade;
}
