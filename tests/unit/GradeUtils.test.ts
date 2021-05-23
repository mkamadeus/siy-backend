import { Grade } from '@/models/Grade';
import { Lecture } from '@/models/Lecture';
import {
  calculateAverageGrade,
  calculateGradeLo,
  calculateAverageLo,
} from '@/utils/GradeUtils';
import { expect } from 'chai';

describe('Grade utils test', () => {
  describe('General test', () => {
    const grades: Grade[] = [
      {
        id: 1,
        lo: [2.46, 0, 3.48, 0, 3.06, 0, 0],
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
        lo: [3.02, 2.92, 0, 0, 3.47, 0, 0],
        grade: 'B',
        midTest: 81,
        finalTest: 53,
        practicum: 60,
        quiz: 59,
        homework: 75,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        lo: [3.5, 0, 0, 0, 0, 0, 0],
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
        id: 4,
        lo: [3.01, 0, 0, 0, 3.21, 3.35, 0],
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
    const credits = [2, 3, 2, 3];

    it('should average correctly', () => {
      const result = calculateAverageGrade(credits, grades);
      expect(result).to.be.eq(3.55);
    });

    const grade = grades[1];
    const lecture: Lecture = {
      id: 0,
      courseId: 1,
      semester: 1,
      year: 2021,
      loKmtWeight: [0, 0, 0, 0, 0, 0, 0],
      loFinalTestWeight: [0.4, 0.3, 0.3, 0, 0, 0, 0],
      loMidTestWeight: [0.5, 0.5, 0, 0, 0, 0, 0],
      loHomeworkWeight: [1, 0, 0, 0, 0, 0, 0],
      loQuizWeight: [1, 0, 0, 0, 0, 0, 0],
      loPracticumWeight: [0.2, 0.2, 0, 0.2, 0.2, 0, 0.2],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('Calculate grade LO', () => {
      const result = calculateGradeLo(lecture, grade);
      expect(result).to.eql([2.68, 2.736, 2.12, 2.4, 2.4, 0, 2.4]);
    });

    const weights = [
      [2, 0, 2, 2, 2, 0, 0],
      [2, 2, 0, 0, 2, 0, 0],
      [2, 0, 0, 0, 0, 0, 0],
      [3, 0, 0, 0, 2, 2, 0],
    ];

    it('Calculate semester LO', () => {
      const result = calculateAverageLo(weights, grades);
      // console.log(result);
      expect(result).to.eql([
        2.998888888888889,
        2.92,
        3.48,
        0,
        3.2466666666666666,
        3.35,
        0,
      ]);
    });
  });
});
