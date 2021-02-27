import{
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn
} from "typeorm";
import Student from "./Student";
import Course from "./Course";

@Entity()
export default class LOSupplement extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : number;

    @Column({name: "student_id"})
    studentId: number;

    @Column({name: "course_id"})
    courseId: number;

    @Column()
    semester: number;

    @Column()
    year: number;

    @Column({name : "lo_a"})
    loA : number;

    @Column({name : "lo_b"})
    loB : number;

    @Column({name : "lo_c"})
    loC : number;

    @Column({name : "lo_d"})
    loD : number;

    @Column({name : "lo_e"})
    loE : number;

    @Column({name : "lo_f"})
    loF : number;

    @Column({name : "lo_g"})
    loG : number;

    @ManyToOne(() => Student, (student) => student.id)
    @JoinColumn({ name: "student_id" })
    public student: Student;

    @ManyToOne(() => Course, (course) => course.id)
    @JoinColumn({ name: "course_id" })
    public course: Course;
}