import { TeacherService } from '@/services/TeacherService';
import { expect } from 'chai';
import { Container } from 'typedi';
import { prisma } from '@/repository/prisma';

describe('Teacher service test', () => {
  before(() => {
    prisma.$connect();
  });

  describe('Teacher creation', () => {
    let teacherId: number;
    const teacherService = Container.get(TeacherService);

    it('should have 0 teacher', async () => {
      const students = await teacherService.getAllTeachers();
      expect(students.length).to.be.equal(0);
    });

    it('should have created 1 teacher', async () => {
      const name = 'Peter Parker';
      const teacher = await teacherService.createTeacher({ name });
      expect(teacher.name).to.be.equal(name);
      teacherId = teacher.id;
    });

    it('should deleted the entry', async () => {
      await teacherService.deleteTeacher(teacherId);
      const teachers = await teacherService.getAllTeachers();
      expect(teachers.length).to.be.eq(0);
    });
  });

  after(() => {
    prisma.$disconnect();
  });
});
