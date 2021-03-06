// import { Exclude } from 'class-transformer';
// import {
//   BaseEntity,
//   Column,
//   CreateDateColumn,
//   Entity,
//   JoinColumn,
//   ManyToOne,
//   PrimaryGeneratedColumn,
//   UpdateDateColumn,
// } from 'typeorm';
// import Question from './Question';
// import Student from './Student';
// import Lecture from './Lecture';

// // FIXME: Recheck
// @Entity()
// export default class Answer extends BaseEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ nullable: true })
//   questionId: number;

//   @Column({ nullable: true })
//   studentId: number;

//   @Column({ nullable: true })
//   courseId: number;

//   @ManyToOne(() => Question, (question) => question.answer)
//   @JoinColumn({ name: 'question_id', referencedColumnName: 'id' })
//   public question: Question;

//   @ManyToOne(() => Student, (student) => student.answer)
//   @JoinColumn({ name: 'student_id', referencedColumnName: 'id' })
//   public student: Student;

//   @ManyToOne(() => Lecture, (lecture) => lecture.answers)
//   @JoinColumn({ name: 'lecture_id', referencedColumnName: 'id' })
//   public lecture: Lecture;

//   @Column({
//     default: '',
//   })
//   strAnswer: string;

//   @Column({
//     default: '0',
//   })
//   intAnswer: number;

//   @Column({
//     default: '',
//   })
//   fileAnswer: string;

//   @Column()
//   formId: number;

//   @CreateDateColumn()
//   @Exclude()
//   createdAt: Date;

//   @UpdateDateColumn()
//   @Exclude()
//   updatedAt: Date;
// }
