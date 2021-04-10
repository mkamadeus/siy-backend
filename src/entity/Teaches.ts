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
import RatingQuestionnaire from "./RatingQuestionnaire";

@Entity()
export default class Teaches extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  teacherId: number;

  @Column()
  lectureId: number;

  @ManyToOne(() => Teacher, (teacher) => teacher.teaches)
  @JoinColumn({ name: "teacher_id", referencedColumnName: "id" })
  teacher: Teacher;

  @ManyToOne(() => Lecture, (lecture) => lecture)
  @JoinColumn({ name: "lecture_id", referencedColumnName: "id" })
  lecture: Lecture;

  @ManyToOne(() => RatingQuestionnaire, (rq) => rq.teaches)
  @JoinColumn({ name: "ratingquestionnaire_id", referencedColumnName: "id" })
  ratingQuestionnaire: RatingQuestionnaire;

  @Column({ name: "rating_m_2" })
  ratingM_2: number;

  @Column({ name: "rating_m_6" })
  ratingM_6: number;

  @Column({ name: "rating_m_9" })
  ratingM_9: number;
  
}
