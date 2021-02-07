import { Exclude } from "class-transformer";
import {
  IsISO8601,
  IsEnum,
  IsNumber,
  IsString,
  ValidateNested,
} from "class-validator";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Class from "./Class";
import Course from "./Course";

export enum AssignmentType {
  TUBES = "tubes",
  TUCIL = "tucil",
}

@Entity()
export default class Assignment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @Column({ name: "course_id", nullable: true })
  courseId: number;

  @Column()
  title: string;

  @Column()
  deadline: Date;

  @Column({
    type: "enum",
    enum: AssignmentType,
  })
  type: AssignmentType;

  @Exclude()
  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Course, (course) => course.id)
  @JoinColumn({ name: "course_id" })
  course: Course;

  @ManyToMany(() => Class)
  @JoinTable({
    name: "assigned_to",
    joinColumn: {
      name: "assignment_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "class_id",
      referencedColumnName: "id",
    },
  })
  classes: Class[];
}
