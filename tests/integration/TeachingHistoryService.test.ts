import { TeacherService } from '@/services/TeacherService';
import { expect } from 'chai';
import { Container } from 'typedi';
import { prisma } from '@/repository/prisma';
import { LectureService } from '@/services/LectureService';
import { CourseService } from '@/services/CourseService';
import { TeachingHistoryService } from '@/services/TeachingHistoryService';

describe('Teaching history service test', () => {
  let teacherId: number;
  let lectureId: number;
  let courseId: number;
  const teacherService = Container.get(TeacherService);
  const lectureService = Container.get(LectureService);
  const courseService = Container.get(CourseService);
  const teachingHistoryService = Container.get(TeachingHistoryService);

  before(() => {
    prisma.$connect();
  });

  describe('Teaching history creation', () => {
    it('should have 0 teaching history', async () => {
      const students = await teacherService.getAllTeachers();
      expect(students.length).to.be.equal(0);
    });

    it('should have created 1 teacher', async () => {
      const name = 'Peter Parker';
      const teacher = await teacherService.createTeacher({ name });
      expect(teacher.name).to.be.equal(name);
      teacherId = teacher.id;
    });

    it('should have created 1 course', async () => {
      const data = {
        code: 'IF9999',
        name: 'Nama Mata Kuliah',
        credits: 2,
        briefSyllabus: 'Lorem ipsum dolor sit amet',
        completeSyllabus: 'Lorem ipsum dolor sit amet',
        outcome: 'Lorem ipsum dolor sit amet',
      };
      const course = await courseService.createCourse(data);
      expect(course.name).to.be.equal(data.name);
      courseId = course.id;
    });

    it('should have created 1 lecture', async () => {
      const semester = 1;
      const year = 2020;
      const lecture = await lectureService.createLecture({
        semester,
        year,
        course: {
          connect: { id: courseId },
        },
      });
      expect(lecture.year).to.be.equal(year);
      expect(lecture.semester).to.be.equal(semester);
      lectureId = lecture.id;
    });

    it('should have created 1 teaching history', async () => {
      const history = await teachingHistoryService.createTeachingHistory({
        teacher: {
          connect: { id: teacherId },
        },
        lecture: {
          connect: { id: lectureId },
        },
      });
      expect(history.lectureId).to.be.equal(lectureId);
      expect(history.teacherId).to.be.equal(teacherId);
    });
  });

  describe('Teaching history deletion', () => {
    it('should deleted the history entry', async () => {
      await teachingHistoryService.deleteTeachingHistory(lectureId, teacherId);
      const teachers = await teacherService.getAllTeachers();
      const lectures = await lectureService.getAllLectures();
      const courses = await courseService.getAllCourses();

      expect(teachers.length).to.be.eq(1);
      expect(lectures.length).to.be.eq(1);
      expect(courses.length).to.be.eq(1);
    });

    it('should deleted the unused entries on other tables', async () => {
      await teacherService.deleteTeacher(teacherId);
      await lectureService.deleteLecture(lectureId);
      await courseService.deleteCourse(courseId);

      const teachers = await teacherService.getAllTeachers();
      const lectures = await lectureService.getAllLectures();
      const courses = await courseService.getAllCourses();

      expect(teachers.length).to.be.eq(0);
      expect(lectures.length).to.be.eq(0);
      expect(courses.length).to.be.eq(0);
    });
  });

  after(() => {
    prisma.$disconnect();
  });
});
