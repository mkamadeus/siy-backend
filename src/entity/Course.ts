import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Lecture from './Lecture';

// FIXME: Recheck
@Entity()
export default class Course extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'code' })
  code: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'credits' })
  credits: number;

  @Column({ name: 'brief_syllabus' })
  briefSyllabus: string;

  @Column({ name: 'complete_syllabus' })
  completeSyllabus: string;

  @Column({ name: 'outcome' })
  outcome: string;

  @OneToMany(() => Lecture, (lecture) => lecture.course)
  lectures: Lecture[];

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;
}
