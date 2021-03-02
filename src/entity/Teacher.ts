import{
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export default class Teacher extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : number;

    @Column({name: "teacher_name"})
    name: string;

}