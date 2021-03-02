import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Assignment from "./Assignment";

@Entity()
export default class Class extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

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
}
