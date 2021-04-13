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

  @Column({ name: "teacher_id" })
  teacherId: number;

  @Column({ name: "lecture_id"})
  lectureId: number;

  @ManyToOne(() => Teacher, (teacher) => teacher.teaches)
  @JoinColumn({ name: "teacher_id", referencedColumnName: "id" })
  teacher: Teacher;

  @ManyToOne(() => Lecture, (lecture) => lecture)
  @JoinColumn({ name: "lecture_id", referencedColumnName: "id" })
  lecture: Lecture;
}
