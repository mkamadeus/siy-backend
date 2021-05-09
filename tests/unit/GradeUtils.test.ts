import { Grade } from '.prisma/client';
import {
  calculateSemesterGpa,
  calculateCumulativeLo,
  calculateGpa,
  calculateSemesterLo,
} from '@/utils/GradeUtils';
import { expect } from 'chai';

describe('Grade utils test', () => {
  describe('General test', () => {
    const grades = [4.0, 3.5, 3.75];
    it('should average correctly', () => {
      const result = calculateGpa(grades);
      expect(result).to.be.eq(3.75);
    });
  });
  describe('Cumulative/average test', () => {
    const grades: Grade[] = [
      {
        id: 1,
        lo: [4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0],
        grade: 'A',
        quiz: 0,
        midTest: 0,
        finalTest: 0,
        homework: 0,
        practicum: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        lo: [2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0],
        grade: 'AB',
        quiz: 0,
        midTest: 0,
        finalTest: 0,
        homework: 0,
        practicum: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        lo: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
        grade: 'BC',
        quiz: 0,
        midTest: 0,
        finalTest: 0,
        homework: 0,
        practicum: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        lo: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
        grade: 'AB',
        quiz: 0,
        midTest: 0,
        finalTest: 0,
        homework: 0,
        practicum: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    it('Calculate cumulative GPA', () => {
      const result = calculateSemesterGpa(grades);
      expect(result).to.be.eq(3.375);
    });

    it('Calculate semester LO', () => {
      const result = calculateSemesterLo(grades);
      expect(result).to.eql([2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0]);
    });
  });
});
