import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Assignment from "./Assignment";
import Course from "./Course";

@Entity()
export default class Class extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @ManyToOne(() => Course, (course) => course.id)
  @JoinColumn({ name: "course_id" })
  public course: Course;

  @Column()
  name: string;

  @Column()
  semester: number;

  @Column()
  year: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Assignment)
  @JoinTable({
    name: "assigned_to",
    joinColumn: {
      name: "class_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "assignment_id",
      referencedColumnName: "id",
    },
  })
  assignments: Assignment[];

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
}
