import { StudentGradeService } from "@/services/StudentGradeService";
import { Exclude } from "class-transformer";
import Container from "typedi";
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Answer from "./Answer";
import Course from "./Course";
import StudentGrade from "./StudentGrade";
import Teaches from "./Teaches";

@Entity()
export default class Lecture extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "course_id" })
  courseId: number;

  @Column()
  semester: number;

  @Column()
  year: number;

  // KMT Weight
  @Column({
    name: "lo_a_kmt_weight",
    default: 0,
    type: "float",
    nullable: true,
  })
  loAKMTWeight?: number;

  @Column({
    name: "lo_b_kmt_weight",
    default: 0,
    type: "float",
    nullable: true,
  })
  loBKMTWeight?: number;

  @Column({
    name: "lo_c_kmt_weight",
    default: 0,
    type: "float",
    nullable: true,
  })
  loCKMTWeight?: number;

  @Column({
    name: "lo_d_kmt_weight",
    default: 0,
    type: "float",
    nullable: true,
  })
  loDKMTWeight?: number;

  @Column({
    name: "lo_e_kmt_weight",
    default: 0,
    type: "float",
    nullable: true,
  })
  loEKMTWeight?: number;

  @Column({
    name: "lo_f_kmt_weight",
    default: 0,
    type: "float",
    nullable: true,
  })
  loFKMTWeight?: number;

  @Column({
    name: "lo_g_kmt_weight",
    default: 0,
    type: "float",
    nullable: true,
  })
  loGKMTWeight?: number;

  // UAS weight
  @Column({
    name: "lo_a_final_weight",
    default: 0,
    type: "float",
    nullable: true,
  })
  loAFinalWeight?: number;

  @Column({
    name: "lo_b_final_weight",
    default: 0,
    type: "float",
    nullable: true,
  })
  loBFinalWeight?: number;

  @Column({
    name: "lo_c_final_weight",
    default: 0,
    type: "float",
    nullable: true,
  })
  loCFinalWeight?: number;

  @Column({
    name: "lo_d_final_weight",
    default: 0,
    type: "float",
    nullable: true,
  })
  loDFinalWeight?: number;

  @Column({
    name: "lo_e_final_weight",
    default: 0,
    type: "float",
    nullable: true,
  })
  loEFinalWeight?: number;

  @Column({
    name: "lo_f_final_weight",
    default: 0,
    type: "float",
    nullable: true,
  })
  loFFinalWeight?: number;

  @Column({
    name: "lo_g_final_weight",
    default: 0,
    type: "float",
    nullable: true,
  })
  loGFinalWeight?: number;

  // UTS weight
  @Column({
    name: "lo_a_mid_weight",
    default: 0,
    type: "float",
    nullable: true,
  })
  loAMidWeight?: number;

  @Column({
    name: "lo_b_mid_weight",
    default: 0,
    type: "float",
    nullable: true,
  })
  loBMidWeight?: number;

  @Column({
    name: "lo_c_mid_weight",
    default: 0,
    type: "float",
    nullable: true,
  })
  loCMidWeight?: number;

  @Column({
    name: "lo_d_mid_weight",
    default: 0,
    type: "float",
    nullable: true,
  })
  loDMidWeight?: number;

  @Column({
    name: "lo_e_mid_weight",
    default: 0,
    type: "float",
    nullable: true,
  })
  loEMidWeight?: number;

  @Column({
    name: "lo_f_mid_weight",
    default: 0,
    type: "float",
    nullable: true,
  })
  loFMidWeight?: number;

  @Column({
    name: "lo_g_mid_weight",
    default: 0,
    type: "float",
    nullable: true,
  })
  loGMidWeight?: number;

  // Homework weight
  @Column({
    name: "lo_a_homework_weight",
    default: 0,
    type: "float",
    nullable: true,
  })
  loAHomeworkWeight?: number;

  @Column({
    name: "lo_b_homework_weight",
    default: 0,
    type: "float",
    nullable: true,
  })
  loBHomeworkWeight?: number;

  @Column({
    name: "lo_c_homework_weight",
    default: 0,
    type: "float",
    nullable: true,
  })
  loCHomeworkWeight?: number;

  @Column({
    name: "lo_d_homework_weight",
    default: 0,
    type: "float",
    nullable: true,
  })
  loDHomeworkWeight?: number;

  @Column({
    name: "lo_e_homework_weight",
    default: 0,
    type: "float",
    nullable: true,
  })
  loEHomeworkWeight?: number;

  @Column({
    name: "lo_f_homework_weight",
    default: 0,
    type: "float",
    nullable: true,
  })
  loFHomeworkWeight?: number;

  @Column({
    name: "lo_g_homework_weight",
    default: 0,
    type: "float",
    nullable: true,
  })
  loGHomeworkWeight?: number;

  // Quiz weight
  @Column({
    name: "lo_a_quiz_weight",
    default: 0,
    type: "float",
    nullable: true,
  })
  loAQuizWeight?: number;

  @Column({
    name: "lo_b_quiz_weight",
    default: 0,
    type: "float",
    nullable: true,
  })
  loBQuizWeight?: number;

  @Column({
    name: "lo_c_quiz_weight",
    default: 0,
    type: "float",
    nullable: true,
  })
  loCQuizWeight?: number;

  @Column({
    name: "lo_d_quiz_weight",
    default: 0,
    type: "float",
    nullable: true,
  })
  loDQuizWeight?: number;

  @Column({
    name: "lo_e_quiz_weight",
    default: 0,
    type: "float",
    nullable: true,
  })
  loEQuizWeight?: number;

  @Column({
    name: "lo_f_quiz_weight",
    default: 0,
    type: "float",
    nullable: true,
  })
  loFQuizWeight?: number;

  @Column({
    name: "lo_g_quiz_weight",
    default: 0,
    type: "float",
    nullable: true,
  })
  loGQuizWeight?: number;

  // Quiz weight
  @Column({
    name: "lo_a_practicum_weight",
    default: 0,
    type: "float",
    nullable: true,
  })
  loAPracticumWeight?: number;

  @Column({
    name: "lo_b_practicum_weight",
    default: 0,
    type: "float",
    nullable: true,
  })
  loBPracticumWeight?: number;

  @Column({
    name: "lo_c_practicum_weight",
    default: 0,
    type: "float",
    nullable: true,
  })
  loCPracticumWeight?: number;

  @Column({
    name: "lo_d_practicum_weight",
    default: 0,
    type: "float",
    nullable: true,
  })
  loDPracticumWeight?: number;

  @Column({
    name: "lo_e_practicum_weight",
    default: 0,
    type: "float",
    nullable: true,
  })
  loEPracticumWeight?: number;

  @Column({
    name: "lo_f_practicum_weight",
    default: 0,
    type: "float",
    nullable: true,
  })
  loFPracticumWeight?: number;

  @Column({
    name: "lo_g_practicum_weight",
    default: 0,
    type: "float",
    nullable: true,
  })
  loGPracticumWeight?: number;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  @OneToMany(() => Answer, (ans) => ans.lecture)
  answers: Answer[];

  @OneToMany(() => StudentGrade, (grade) => grade.lecture)
  studentGrades: StudentGrade[];

  @OneToMany(() => Teaches, (teaches) => teaches.lecture)
  teaches: Teaches[];

  @ManyToOne(() => Course, (course) => course.lectures)
  @JoinColumn({ name: "course_id", referencedColumnName: "id" })
  course: Course;

  @AfterUpdate()
  @AfterRemove()
  @AfterInsert()
  public async updateLo() {
    const losWithOwner = await Container.get(
      StudentGradeService
    ).getLoByLectureId(this.id);
    for (const loWithOwner of losWithOwner)
      Container.get(StudentGradeService).update(loWithOwner.gradeId, {
        ...loWithOwner.los,
      });
  }
}
