import { expect } from 'chai';
import { Container } from 'typedi';
import { prisma } from '@/repository/prisma';
import { CourseService } from '@/services/CourseService';

describe('Course service test', () => {
  before(() => {
    prisma.$connect();
  });

  describe('Course creation', () => {
    let courseId: number;
    const courseService = Container.get(CourseService);

    it('should have 0 course', async () => {
      const courses = await courseService.getAllCourses();
      expect(courses.length).to.be.equal(0);
    });

    it('should have created 1 course', async () => {
      const courseData = {
        code: 'IF9999',
        name: 'Nama Mata Kuliah',
        credits: 2,
        briefSyllabus: 'Lorem ipsum dolor sit amet',
        completeSyllabus: 'Lorem ipsum dolor sit amet',
        outcome: 'Lorem ipsum dolor sit amet',
      };
      const course = await courseService.createCourse(courseData);
      expect(courseData.name).to.be.equal(course.name);
      courseId = course.id;
    });

    it('should deleted the entry', async () => {
      await courseService.deleteCourse(courseId);
      const courses = await courseService.getAllCourses();
      expect(courses.length).to.be.eq(0);
    });
  });

  after(() => {
    prisma.$disconnect();
  });
});
