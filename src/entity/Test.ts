import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Course from "./Course";

@Entity()
export default class Test extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "course_id", nullable: true })
  courseId: number;

  @Column()
  description: string;

  @Column()
  start_time: Date;

  @Column()
  end_time: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Course, (course) => course.id)
  @JoinColumn({ name: "course_id" })
  course: Course;
}
