import { StudentService } from '@/services/StudentService';
import { expect } from 'chai';
import { Container } from 'typedi';
import { prisma } from '@/repository/prisma';

describe('StudentService test', () => {
  before(() => {
    prisma.$connect();
  });

  describe('Student creation', () => {
    let studentId: number;
    const studentService = Container.get(StudentService);

    it('should have 0 student', async () => {
      const students = await studentService.getAllStudents();
      expect(students.length).to.be.equal(0);
    });

    it('should have created 1 student', async () => {
      const name = 'Matthew Kevin Amadeus';
      const nim = '13518035';
      const student = await studentService.createStudent({
        name,
        nim,
        lok: [0, 0, 0, 0, 0, 0, 0],
        gpa: 0,
      });
      expect(student.name).to.be.equal(name);
      expect(student.nim).to.be.equal(nim);
      studentId = student.id;
    });

    it('should deleted the entry', async () => {
      await studentService.deleteStudent(studentId);
      const students = await studentService.getAllStudents();
      expect(students.length).to.be.eq(0);
    });
  });

  after(() => {
    prisma.$disconnect();
  });
});
