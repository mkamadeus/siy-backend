import {
  Student,
  StudentCreateInput,
  StudentUpdateInput,
} from '@/models/Student';
import { prisma } from '@/repository/prisma';
import { Service } from 'typedi';

@Service()
export class StudentService {
  /**
   * Get all students from database.
   */
  public async getAllStudents(): Promise<Student[]> {
    const students = await prisma.student.findMany();
    return students;
  }

  /**
   * Get student by database ID
   * @param id ID of the student
   */
  public async getStudentById(id: number): Promise<Student> {
    const student = await prisma.student.findUnique({ where: { id } });
    return student;
  }

  /**
   *
   * @param userId User ID
   * @returns Student object
   */
  public async getStudentByUserId(userId: number): Promise<Student> {
    const student = await prisma.student.findFirst({ where: { userId } });
    return student;
  }

  /**
   * Get student by NIM
   * @param nim NIM of the student
   */
  public async getStudentByNim(nim: string): Promise<Student> {
    const student = await prisma.student.findFirst({ where: { nim } });
    return student;
  }

  /**
   * Create new student
   * @param student Student object that is going to be created
   */
  public async createStudent(data: StudentCreateInput): Promise<Student> {
    data.lok = Array(7).fill(0);
    const student = await prisma.student.create({ data });
    return student;
  }

  /**
   * Update student by ID
   * @param id Student ID in database
   * @param data Student data
   */
  public async updateStudent(
    id: number,
    data: StudentUpdateInput
  ): Promise<Student> {
    const student = await prisma.student.update({ where: { id }, data });
    return student;
  }

  /**
   * Update student LO by ID
   * @param id Student ID in database
   * @param data Student data
   */
  public async updateStudentLO(id: number, lo: number[]): Promise<Student> {
    const student = await prisma.student.update({
      where: { id },
      data: { lok: lo },
    });
    return student;
  }

  /**
   * Update student LO by ID
   * @param id Student ID in database
   * @param data Student data
   */
  public async updateStudentGPA(id: number, gpa: number): Promise<Student> {
    const student = await prisma.student.update({
      where: { id },
      data: { gpa: gpa },
    });
    return student;
  }

  /**
   * Update student by NIM
   * @param nim Student NIM in database
   * @param data Student data
   */
  public async updateStudentByNim(
    nim: string,
    data: StudentUpdateInput
  ): Promise<Student> {
    const student = await prisma.student.update({ where: { nim }, data });
    return student;
  }

  /**
   * Delete student by ID
   * @param id Student ID
   */
  public async deleteStudent(id: number): Promise<Student> {
    const student = await prisma.student.delete({ where: { id } });
    return student;
  }
}
