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

  @ManyToOne(() => Teacher, (teacher) => teacher.teaches)
  @JoinColumn({ name: "teacherId" })
  teacher: Teacher;

  @ManyToOne(() => Lecture, (lecture) => lecture)
  @JoinColumn({ name: "lectureId" })
  lecture: Lecture;
}
