import { Exclude } from "class-transformer";
import {
    BaseEntity,
    Column,
    Entity,
    PrimaryColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from "typeorm";
import Answer from './Answer';

@Entity()
export default class Question extends BaseEntity {
    @PrimaryColumn()
    id: number;

    @Column()
    question: string;

    @Column()
    answerType: string;

    @CreateDateColumn()
    @Exclude()
    createdAt: Date;

    @UpdateDateColumn()
    @Exclude()
    updatedAt: Date;

    @OneToMany(() => Answer, answer => answer.question)
    public answer!: Answer[];
}