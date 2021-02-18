import { Exclude } from "class-transformer";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Assignment from "./Assignment";

@Entity()
export default class Course extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  sks: number;

  @Column()
  name: string;

  @Column()
  silabusRingkas: string;

  @Column()
  silabusLengkap: string;

  @Column()
  outcome: string;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  @OneToMany(() => Assignment, (assignment) => assignment.id)
  assignment: Assignment;
}
