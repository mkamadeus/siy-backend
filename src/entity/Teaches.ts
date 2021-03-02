import{
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn
} from "typeorm";
import Teacher from "./Teacher";
import Class from "./Class";

@Entity()
export default class LOSupplement extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : number;

    @Column({name : "lo_a_weight"})
    loAWeight : number;

    @Column({name : "lo_b_weight"})
    loBWeight : number;

    @Column({name : "lo_c_weight"})
    loCWeight : number;

    @Column({name : "lo_d_weight"})
    loDWeight : number;

    @Column({name : "lo_e_weight"})
    loEWeight : number;

    @Column({name : "lo_f_weight"})
    loFWeight : number;

    @Column({name : "lo_g_weight"})
    loGWeight : number;

    @ManyToOne(() => Teacher, (teacher) => teacher.id)
    @JoinColumn({ name: "teacher_id" })
    public teacher: Teacher;

    @ManyToOne(() => Class, (clas) => clas.id)
    @JoinColumn({ name: "class_id" })
    public class: Class;

}