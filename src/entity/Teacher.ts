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
import Teaches from "./Teaches";

@Entity()
export default class Teacher extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "teacher_name" })
  name: string;

  @OneToMany(() => Teaches, (teaches) => teaches.teacherId)
  teaches: Teaches[];

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;
}
