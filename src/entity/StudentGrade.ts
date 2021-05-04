import { Exclude } from 'class-transformer';

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
} from 'typeorm';
import Student from './Student';
import { IndexEnum } from '@/enum/IndexEnum';
import Lecture from './Lecture';
import Container from 'typedi';
import { StudentGradeService } from '@/services/StudentGradeService';
import { StudentService } from '@/services/StudentService';

@Entity()
export default class StudentGrade extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'student_id', nullable: true })
  studentId: number;

  @Column({ name: 'lecture_id', nullable: true })
  lectureId: number;

  @Column()
  semester: number;

  @Column()
  year: number;

  @Column({ type: 'enum', enum: IndexEnum, nullable: true })
  index: IndexEnum;

  @Column({ name: 'lo_a', type: 'float', default: 0 })
  loA: number;

  @Column({ name: 'lo_b', type: 'float', default: 0 })
  loB: number;

  @Column({ name: 'lo_c', type: 'float', default: 0 })
  loC: number;

  @Column({ name: 'lo_d', type: 'float', default: 0 })
  loD: number;

  @Column({ name: 'lo_e', type: 'float', default: 0 })
  loE: number;

  @Column({ name: 'lo_f', type: 'float', default: 0 })
  loF: number;

  @Column({ name: 'lo_g', type: 'float', default: 0 })
  loG: number;

  @Column({ name: 'mid_test', type: 'float', default: 0, nullable: true })
  midTest: number;

  @Column({ name: 'quiz', type: 'float', default: 0, nullable: true })
  quiz: number;

  @Column({ name: 'final_test', type: 'float', default: 0, nullable: true })
  finalTest: number;

  @Column({ name: 'practicum', type: 'float', default: 0, nullable: true })
  practicum: number;

  @Column({ name: 'homework', type: 'float', default: 0, nullable: true })
  homework: number;

  @ManyToOne(() => Student, (student) => student.studentGrades)
  @JoinColumn({ name: 'student_id', referencedColumnName: 'id' })
  student: Student;

  @ManyToOne(() => Lecture, (lecture) => lecture.studentGrades)
  @JoinColumn({ name: 'lecture_id', referencedColumnName: 'id' })
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
    const grade = await Container.get(StudentGradeService).getGradeById(
      this.id
    );
    const student = await Container.get(StudentService).getStudentById(
      grade.studentId
    );
    const ipk = await Container.get(StudentGradeService).getIpkByNim(
      student.nim
    );
    console.log('updateIPK');
    await Container.get(StudentService).updateStudent(grade.studentId, { ipk });
  }
  // @AfterUpdate()
  // @AfterRemove()
  // @AfterInsert()
  // public async updateIpk() {
  //   const student = await Container.get(StudentService).getOne(this.studentId);
  //   const ipk = await Container.get(StudentGradeService).getIpkByNim(
  //     student.nim
  //   );

  //   await Container.get(StudentService).update(this.studentId, { ipk });
  // }

  // @AfterUpdate()
  // @AfterRemove()
  // @AfterInsert()
  // public async updateCumulativeLo() {
  //   console.log("updateCumulativeLO");
  //   const grade = await Container.get(StudentGradeService).getOne(this.id);
  //   const student = await Container.get(StudentService).getOne(grade.studentId);
  //   const lo = await Container.get(StudentGradeService).getCumulativeLoByNim(
  //     student.nim
  //   );

  //   console.log("lo");
  //   console.log(lo);
  //   console.log(student.id);

  //   await Container.get(StudentService).update(student.id, { ...lo });
  // }

  // @AfterInsert()
  // public async updateLo() {
  //   const lo = await Container.get(StudentGradeService).getLoById(this.id);
  //   await Container.get(StudentGradeService).update(this.id, { ...lo });
  // }
  //   const student = await Container.get(StudentService).getOne(this.studentId);
  //   const lo = await Container.get(StudentGradeService).getCumulativeLoByNim(
  //     student.nim
  //   );
  //   console.log(student);
  //   await Container.get(StudentService).update(student.id, { ...lo });
  // }

  // @AfterInsert()
  // public async updateLo() {
  //   const lo = await Container.get(StudentGradeService).getLoById(this.id);
  //   await Container.get(StudentGradeService).update(this.id, { ...lo });
  // }
}
