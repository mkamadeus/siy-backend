import { Exclude } from "class-transformer";

import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  JoinColumn,
  AfterInsert,
} from "typeorm";
import Student from "./Student";
import { IndexEnum, IndexValueEnum } from "@/enum/IndexEnum";
import Lecture from "./Lecture";
import Container from "typedi";
import { StudentGradeService } from "@/services/StudentGradeService";
import { StudentService } from "@/services/StudentService";

@Entity()
export default class StudentGrade extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "student_id", nullable: true })
  studentId: number;

  @Column({ name: "lecture_id", nullable: true })
  lectureId: number;

  @Column()
  semester: number;

  @Column()
  year: number;

  @Column({ type: "enum", enum: IndexEnum })
  index: IndexEnum;

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

  @Column({ name: "mid_test", type: "float" })
  midTest: number;

  @Column({ name: "quiz", type: "float" })
  quiz: number;

  @Column({ name: "final_test", type: "float" })
  finalTest: number;

  @Column({ name: "practicum", type: "float" })
  practicum: number;

  @Column({ name: "homework", type: "float" })
  homework: number;

  @ManyToOne(() => Student, (student) => student.studentGrades)
  @JoinColumn({ name: "studentId" })
  student: Student;

  @ManyToOne(() => Lecture, (lecture) => lecture.teaches)
  @JoinColumn({ name: "lectureId" })
  lecture: Lecture;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  @AfterInsert()
  async updateIpk() {
    console.log(this);
    const nim = this.student.nim;
    const grades = await Container.get(StudentGradeService).getByNim(nim);
    let totalScore = 0;
    let totalCredits = 0;
    for (const grade of grades) {
      totalCredits += grade.lecture.course.credits;
      totalScore += IndexValueEnum[grade.index];
    }
    const ipk = totalScore / totalCredits;
    await Container.get(StudentService).updateByNim(nim, { ipk });
  }
}
