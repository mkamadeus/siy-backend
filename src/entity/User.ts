import { UserRoleEnum as UserRoleEnum } from "@/enum/UserRoleEnum";
import { Exclude } from "class-transformer";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ type: "enum", enum: UserRoleEnum, default: UserRoleEnum.STUDENT })
  role: UserRoleEnum;

  @Column({ nullable: true })
  refreshToken: string;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;
}
