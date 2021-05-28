import { prisma } from '@/repository/prisma';
import { Course, CourseCreateInput, CourseUpdateInput } from '@/models/Course';
import { Service } from 'typedi';

@Service()
export class CourseService {
  public async getAllCourses(): Promise<Course[]> {
    const courses = await prisma.course.findMany();
    return courses;
  }

  public async getCourseById(id: number): Promise<Course> {
    const course = await prisma.course.findUnique({ where: { id } });
    return course;
  }

  public async createCourse(data: CourseCreateInput): Promise<Course> {
    const course = await prisma.course.create({ data });
    return course;
  }

  public async updateCourse(
    id: number,
    data: CourseUpdateInput
  ): Promise<Course> {
    const course = await prisma.course.update({ data, where: { id } });
    return course;
  }

  public async deleteCourse(id: number): Promise<Course> {
    const course = await prisma.course.delete({ where: { id } });
    return course;
  }
}
