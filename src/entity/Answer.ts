import { Exclude } from "class-transformer";
import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
} from "typeorm";
import Question from './Question';
import Student from './Student';
import Course from  './Course';

@Entity()
export default class Answer extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    answer: string;

    @CreateDateColumn()
    @Exclude()
    createdAt: Date;

    @UpdateDateColumn()
    @Exclude()
    updatedAt: Date;

    @ManyToOne(() => Question, question => question.answer)
    public question: Question;

    @ManyToOne(() => Student, student => student.answer)
    public student!: Student;

    @ManyToOne(() => Course, course => course.answer)
    public course!: Course;
}