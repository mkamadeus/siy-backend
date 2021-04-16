import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from "typeorm";
import Teacher from "./Teacher";
import Lecture from "./Lecture";
import RatingQuestionnaire from "./RatingQuestionnaire";

@Entity()
export default class Teaches extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "teacher_id" })
  teacherId: number;

  @Column({ name: "lecture_id" })
  lectureId: number;

  @Column({
    name: "portofolio",
    default: 0,
    type: "float",
    nullable: true,
  })
  portofolio: number;

  @ManyToOne(() => Teacher, (teacher) => teacher.teaches)
  @JoinColumn({ name: "teacher_id", referencedColumnName: "id" })
  teacher: Teacher;

  @ManyToOne(() => Lecture, (lecture) => lecture.teaches)
  @JoinColumn({ name: "lecture_id", referencedColumnName: "id" })
  lecture: Lecture;

  @ManyToOne(() => RatingQuestionnaire, (rq) => rq.teaches)
  @JoinColumn({ name: "ratingquestionnaire_id", referencedColumnName: "id" })
  ratingQuestionnaire: RatingQuestionnaire;
  
}
