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
  AfterUpdate,
  AfterRemove,
  getRepository,
} from "typeorm";
import Student from "./Student";
import { IndexEnum, IndexValueEnum } from "@/enum/IndexEnum";
import Lecture from "./Lecture";
import Container from "typedi";
import { StudentGradeService } from "@/services/StudentGradeService";
import { StudentService } from "@/services/StudentService";
import { LectureService } from "@/services/LectureService";
import { CourseService } from "@/services/CourseService";

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

  @Column({ name: "lo_a", type: "float", default: 0 })
  loA: number;

  @Column({ name: "lo_b", type: "float", default: 0 })
  loB: number;

  @Column({ name: "lo_c", type: "float", default: 0 })
  loC: number;

  @Column({ name: "lo_d", type: "float", default: 0 })
  loD: number;

  @Column({ name: "lo_e", type: "float", default: 0 })
  loE: number;

  @Column({ name: "lo_f", type: "float", default: 0 })
  loF: number;

  @Column({ name: "lo_g", type: "float", default: 0 })
  loG: number;

  @Column({ name: "mid_test", type: "float", default: 0, nullable: true })
  midTest: number;

  @Column({ name: "quiz", type: "float", default: 0, nullable: true })
  quiz: number;

  @Column({ name: "final_test", type: "float", default: 0, nullable: true })
  finalTest: number;

  @Column({ name: "practicum", type: "float", default: 0, nullable: true })
  practicum: number;

  @Column({ name: "homework", type: "float", default: 0, nullable: true })
  homework: number;

  @ManyToOne(() => Student, (student) => student.studentGrades)
  @JoinColumn({ name: "student_id", referencedColumnName: "id" })
  student: Student;

  @ManyToOne(() => Lecture, (lecture) => lecture.teaches)
  @JoinColumn({ name: "lecture_id", referencedColumnName: "id" })
  lecture: Lecture;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  @AfterUpdate()
  @AfterRemove()
  @AfterInsert()
  public async updateIpk() {
    const student = await Container.get(StudentService).getOne(this.studentId);
    const grades = await Container.get(StudentGradeService).getByNim(
      student.nim
    );
    let totalScore = 0;
    let totalCredits = 0;
    for (const grade of grades) {
      const lecture = await Container.get(LectureService).getOne(
        grade.lectureId
      );
      const course = await Container.get(CourseService).getOne(
        lecture.courseId
      );
      totalCredits += course.credits;
      totalScore += IndexValueEnum[grade.index] * course.credits;
    }
    const ipk = totalScore / totalCredits;
    await Container.get(StudentService).update(this.studentId, { ipk });
  }

  @AfterUpdate()
  @AfterRemove()
  @AfterInsert()
  public async updateLo() {
    const { midTest, quiz, finalTest, practicum, homework } = this;
    const lecture = await Container.get(LectureService).getOne(this.lectureId);

    // Sum product of all LO
    this.loA =
      midTest * lecture.loAMidWeight +
      quiz * lecture.loAQuizWeight +
      finalTest * lecture.loAFinalWeight +
      practicum * lecture.loAPracticumWeight +
      homework * lecture.loAHomeworkWeight;
    this.loB =
      midTest * lecture.loBMidWeight +
      quiz * lecture.loBQuizWeight +
      finalTest * lecture.loBFinalWeight +
      practicum * lecture.loBPracticumWeight +
      homework * lecture.loBHomeworkWeight;
    this.loC =
      midTest * lecture.loCMidWeight +
      quiz * lecture.loCQuizWeight +
      finalTest * lecture.loCFinalWeight +
      practicum * lecture.loCPracticumWeight +
      homework * lecture.loCHomeworkWeight;
    this.loD =
      midTest * lecture.loDMidWeight +
      quiz * lecture.loDQuizWeight +
      finalTest * lecture.loDFinalWeight +
      practicum * lecture.loDPracticumWeight +
      homework * lecture.loDHomeworkWeight;
    this.loE =
      midTest * lecture.loEMidWeight +
      quiz * lecture.loEQuizWeight +
      finalTest * lecture.loEFinalWeight +
      practicum * lecture.loEPracticumWeight +
      homework * lecture.loEHomeworkWeight;
    this.loF =
      midTest * lecture.loFMidWeight +
      quiz * lecture.loFQuizWeight +
      finalTest * lecture.loFFinalWeight +
      practicum * lecture.loFPracticumWeight +
      homework * lecture.loFHomeworkWeight;
    this.loG =
      midTest * lecture.loGMidWeight +
      quiz * lecture.loGQuizWeight +
      finalTest * lecture.loGFinalWeight +
      practicum * lecture.loGPracticumWeight +
      homework * lecture.loGHomeworkWeight;

    console.log(this);
    // getRepository(StudentGrade).save(this);
  }
}
