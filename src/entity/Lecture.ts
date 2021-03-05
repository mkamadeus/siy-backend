import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Course from "./Course";

@Entity()
export default class Lecture extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  courseId: number;

  @Column()
  name: string;

  @Column()
  semester: number;

  @Column()
  year: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // UAS weight
  @Column({ name: "lo_a_final_weight" })
  loAFinalWeight: number;

  @Column({ name: "lo_b_final_weight" })
  loBFinalWeight: number;

  @Column({ name: "lo_c_final_weight" })
  loCFinalWeight: number;

  @Column({ name: "lo_d_final_weight" })
  loDFinalWeight: number;

  @Column({ name: "lo_e_final_weight" })
  loEFinalWeight: number;

  @Column({ name: "lo_f_final_weight" })
  loFFinalWeight: number;

  @Column({ name: "lo_g_final_weight" })
  loGFinalWeight: number;

  // UTS weight
  @Column({ name: "lo_a_mid_weight" })
  loAMidWeight: number;

  @Column({ name: "lo_b_mid_weight" })
  loBMidWeight: number;

  @Column({ name: "lo_c_mid_weight" })
  loCMidWeight: number;

  @Column({ name: "lo_d_mid_weight" })
  loDMidWeight: number;

  @Column({ name: "lo_e_mid_weight" })
  loEMidWeight: number;

  @Column({ name: "lo_f_mid_weight" })
  loFMidWeight: number;

  @Column({ name: "lo_g_mid_weight" })
  loGMidWeight: number;

  // Homework weight
  @Column({ name: "lo_a_homework_weight" })
  loAHomeworkWeight: number;

  @Column({ name: "lo_b_homework_weight" })
  loBHomeworkWeight: number;

  @Column({ name: "lo_c_homework_weight" })
  loCHomeworkWeight: number;

  @Column({ name: "lo_d_homework_weight" })
  loDHomeworkWeight: number;

  @Column({ name: "lo_e_homework_weight" })
  loEHomeworkWeight: number;

  @Column({ name: "lo_f_homework_weight" })
  loFHomeworkWeight: number;

  @Column({ name: "lo_g_homework_weight" })
  loGHomeworkWeight: number;

  // Quiz weight
  @Column({ name: "lo_a_quiz_weight" })
  loAQuizWeight: number;

  @Column({ name: "lo_b_quiz_weight" })
  loBQuizWeight: number;

  @Column({ name: "lo_c_quiz_weight" })
  loCQuizWeight: number;

  @Column({ name: "lo_d_quiz_weight" })
  loDQuizWeight: number;

  @Column({ name: "lo_e_quiz_weight" })
  loEQuizWeight: number;

  @Column({ name: "lo_f_quiz_weight" })
  loFQuizWeight: number;

  @Column({ name: "lo_g_quiz_weight" })
  loGQuizWeight: number;

  // Quiz weight
  @Column({ name: "lo_a_practicum_weight" })
  loAPracticumWeight: number;

  @Column({ name: "lo_b_practicum_weight" })
  loBPracticumWeight: number;

  @Column({ name: "lo_c_practicum_weight" })
  loCPracticumWeight: number;

  @Column({ name: "lo_d_practicum_weight" })
  loDPracticumWeight: number;

  @Column({ name: "lo_e_practicum_weight" })
  loEPracticumWeight: number;

  @Column({ name: "lo_f_practicum_weight" })
  loFPracticumWeight: number;

  @Column({ name: "lo_g_practicum_weight" })
  loGPracticumWeight: number;

  @ManyToOne(() => Course, (course) => course.id)
  @JoinColumn({ name: "course_id" })
  course: Course;
}
