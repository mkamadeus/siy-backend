import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import Student from "./Student";
import Course from "./Course";
import { Exclude } from "class-transformer";

@Entity()
export default class LOSupplement extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @Column({ name: "student_id" })
  studentId: number;

  @Exclude()
  @Column({ name: "course_id" })
  courseId: number;

  @Column()
  semester: number;

  @Column()
  year: number;

  @Column({ name: "lo_a", type: "float" })
  loA: number;

  @Column({ name: "lo_b", type: "float" })
  loB: number;

  @Column({ name: "lo_c", type: "float" })
  loC: number;

  @Column({ name: "lo_d", type: "float" })
  loD: number;

  @Column({ name: "lo_e", type: "float" })
  loE: number;

  @Column({ name: "lo_f", type: "float" })
  loF: number;

  @Column({ name: "lo_g", type: "float" })
  loG: number;

  @ManyToOne(() => Student, (student) => student.id)
  @JoinColumn({ name: "student_id" })
  public student: Student;

  @ManyToOne(() => Course, (course) => course.id)
  @JoinColumn({ name: "course_id" })
  public course: Course;
}
