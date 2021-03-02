import{
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn
} from "typeorm";
import Teacher from "./Teacher";
import Class from "./Class";

@Entity()
export default class Teaches extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : number;

    @ManyToOne(() => Teacher, (teacher) => teacher.id)
    @JoinColumn({ name: "teacher_id" })
    public teacher: Teacher;

    @ManyToOne(() => Class, (clas) => clas.id)
    @JoinColumn({ name: "class_id" })
    public class: Class;

}