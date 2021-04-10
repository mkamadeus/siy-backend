import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
    Column,
} from "typeorm";
import Student from "./Student";
import Teaches from "./Teaches";

@Entity()
export default class RatingQuestionnaire extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Student, (student) => student)
    @JoinColumn({ name: "student_id", referencedColumnName: "id" })
    student: Student;

    @Column({ name: "rating_m_1" })
    ratingM_1: number;

    @Column({ name: "rating_m_3" })
    ratingM_3: number;

    @Column({ name: "rating_m_4" })
    ratingM_4: number;

    @Column({ name: "rating_m_5" })
    ratingM_5: number;

    @Column({ name: "rating_m_7" })
    ratingM_7: number;

    @Column({ name: "rating_m_8" })
    ratingM_8: number;
    
    @Column({ name: "rating_m_10" })
    ratingM_10: number;

    @Column({ name: "rating_m_11" })
    ratingM_11: number;

    @Column({ name: "rating_m_12" })
    ratingM_12: number;

    @OneToMany(() => Teaches, (teaches) => teaches.id)
    @JoinColumn({ name: "teaches_id", referencedColumnName: "id" })
    teaches: Teaches[];
}