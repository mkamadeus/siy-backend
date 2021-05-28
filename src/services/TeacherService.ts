import { prisma } from '@/repository/prisma';
import {
  Teacher,
  TeacherCreateInput,
  TeacherUpdateInput,
} from '@/models/Teacher';
import { Service } from 'typedi';

@Service()
export class TeacherService {
  /**
   * Get all teachers from database.
   */
  public async getAllTeachers(): Promise<Teacher[]> {
    const teachers = await prisma.teacher.findMany();
    return teachers;
  }

  /**
   * Get one teacher by id.
   * @param {number} id The teacher ID queried.
   */
  public async getTeacherById(id: number): Promise<Teacher> {
    const teacher = await prisma.teacher.findUnique({ where: { id } });
    return teacher;
  }

  public async getTeacherByUserId(userId: number): Promise<Teacher> {
    const teacher = await prisma.teacher.findFirst({ where: { userId } });
    return teacher;
  }

  /**
   * Create new teacher entry in the database.
   * @param {Teacher} teacher The teacher ID queried.
   */
  public async createTeacher(data: TeacherCreateInput): Promise<Teacher> {
    return await prisma.teacher.create({ data });
  }

  /**
   * Update existing teacher entry in database.
   * @param id The teacher ID queried.
   * @param teacher The teacher body for updating entries.
   */
  public async updateTeacher(
    id: number,
    data: TeacherUpdateInput
  ): Promise<Teacher> {
    const teacher = await prisma.teacher.update({ data, where: { id } });
    return teacher;
  }

  /**
   * Delete existing teacher entry from the database.
   * @param id The teacher ID queried.
   */
  public async deleteTeacher(id: number): Promise<Teacher> {
    const teacher = await prisma.teacher.delete({ where: { id } });
    return teacher;
  }
}
