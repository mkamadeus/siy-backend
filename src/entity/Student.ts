import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
//import StudentGrade from "./StudentGrade";

@Entity()
export default class Student extends BaseEntity {
  @PrimaryColumn()
  nim: number;

  @Column()
  nama: string;

  @Column()
  imgpath: string;

  @Column("float")
  ipk: number;

  //@OneToMany(() => StudentGrade, (studentGrade) => studentGrade.nim)
  //studentGrade: studentGrade;
}
