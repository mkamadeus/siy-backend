import { Exclude } from 'class-transformer';

import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import Lecture from './Lecture';
import Student from './Student';

@Entity()
export default class RatingQuestionnaire extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'student_id' })
  studentId: number;

  @Column({ name: 'lecture_id' })
  lectureId: number;

  @Column({ name: 'rating_m_1' })
  ratingM_1: number;

  @Column({ name: 'rating_m_3' })
  ratingM_3: number;

  @Column({ name: 'rating_m_4' })
  ratingM_4: number;

  @Column({ name: 'rating_m_5' })
  ratingM_5: number;

  @Column({ name: 'rating_m_7' })
  ratingM_7: number;

  @Column({ name: 'rating_m_8' })
  ratingM_8: number;

  @Column({ name: 'rating_m_10' })
  ratingM_10: number;

  @Column({ name: 'rating_m_11' })
  ratingM_11: number;

  @Column({ name: 'rating_m_12' })
  ratingM_12: number;

  //TEACHER AVERAGE SCORES COLUMN
  @Column({
    name: 'rating_m_2',
    type: 'float',
  })
  ratingM_2: number;

  @Column({
    name: 'rating_m_6',
    type: 'float',
  })
  ratingM_6: number;

  @Column({
    name: 'rating_m_9',
    type: 'float',
  })
  ratingM_9: number;

  @ManyToOne(() => Student, (student) => student)
  @JoinColumn({ name: 'student_id', referencedColumnName: 'id' })
  student: Student;

  @ManyToOne(() => Lecture, (lecture) => lecture.id)
  @JoinColumn({ name: 'lecture_id', referencedColumnName: 'id' })
  lectures: Lecture;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;
}
