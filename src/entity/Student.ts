// import { Exclude } from 'class-transformer';
// import {
//   BaseEntity,
//   Column,
//   CreateDateColumn,
//   Entity,
//   JoinColumn,
//   OneToMany,
//   OneToOne,
//   PrimaryGeneratedColumn,
//   UpdateDateColumn,
// } from 'typeorm';
// import StudentGrade from './StudentGrade';
// import Answer from './Answer';
// import Faker from 'faker';
// import User from './User';

// @Entity()
// export default class Student extends BaseEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ name: 'user_id', nullable: true })
//   userId: number;

//   @Column({ unique: true })
//   nim: string;

//   @Column()
//   name: string;

//   @Column({ default: Faker.internet.avatar() })
//   imgPath: string;

//   @Column({ type: 'float', default: 0 })
//   loA: number;

//   @Column({ type: 'float', default: 0 })
//   loB: number;

//   @Column({ type: 'float', default: 0 })
//   loC: number;

//   @Column({ type: 'float', default: 0 })
//   loD: number;

//   @Column({ type: 'float', default: 0 })
//   loE: number;

//   @Column({ type: 'float', default: 0 })
//   loF: number;

//   @Column({ type: 'float', default: 0 })
//   loG: number;

//   @Column({ type: 'float', default: 0 })
//   ipk: number;

//   @OneToMany(() => StudentGrade, (studentGrade) => studentGrade.student)
//   studentGrades: StudentGrade[];

//   @OneToMany(() => Answer, (answer) => answer.student)
//   answer: Answer[];

//   @OneToOne(() => User)
//   @JoinColumn({ name: 'user_id' })
//   user: User;

//   @CreateDateColumn()
//   @Exclude()
//   createdAt: Date;

//   @UpdateDateColumn()
//   @Exclude()
//   updatedAt: Date;
// }
