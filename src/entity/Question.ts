// -import { Exclude } from 'class-transformer';
// import {
//   BaseEntity,
//   Column,
//   CreateDateColumn,
//   Entity,
//   OneToMany,
//   PrimaryGeneratedColumn,
//   UpdateDateColumn,
// } from 'typeorm';
// import Answer from './Answer';

// // FIXME: Waiting for client confirmation
// @Entity()
// export default class Question extends BaseEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   question: string;

//   @Column()
//   answerType: string;

//   @OneToMany(() => Answer, (answer) => answer.question)
//   answer: Answer[];

//   @CreateDateColumn()
//   @Exclude()
//   createdAt: Date;

//   @UpdateDateColumn()
//   @Exclude()
//   updatedAt: Date;
// }
