import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from "typeorm";
import Teacher from "./Teacher";
import Lecture from "./Course";

@Entity()
export default class Teaches extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  teacherId: number;

  @Column()
  lectureId: number;

  @ManyToOne(() => Teacher, (teacher) => teacher.id)
  @JoinColumn({ name: "teacher_id" })
  public teacher: Teacher;

  @ManyToOne(() => Lecture, (clas) => clas.id)
  @JoinColumn({ name: "class_id" })
  public class: Lecture;
}
