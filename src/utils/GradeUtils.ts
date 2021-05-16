import { IndexValueEnum } from '@/models/Grade';
import { CourseService } from '@/services/CourseService';
import { LectureHistoryService } from '@/services/LectureHistoryService';
import { LectureService } from '@/services/LectureService';
import { Grade, LectureHistory } from '@prisma/client';
import Container from 'typedi';

/**
 *
 * @param grades
 * @returns weighted average from grades
 */
export const calculateAverageGrade = async (
  credits: number[],
  grades: Grade[]
): Promise<number> => {
  if (credits.length !== grades.length) throw new Error('Length must be equal');

  let cumulativeSum = 0;
  let totalCredits = 0;

  for (let i = 0; i < grades.length; i++) {
    const gradeValue = grades[i].grade ? IndexValueEnum[grades[i].grade] : 4.0;

    cumulativeSum += gradeValue * credits[i];
    totalCredits += credits[i];
  }

  // grades.forEach((grade) => {
  //   cumulativeSum += grade.grade ? IndexValueEnum[grade.grade] : 4.0;
  // });

  return cumulativeSum / totalCredits;
};

// export const calculateGpa = (semesterGpas: number[]): number => {
//   const total = 0;

//   //   const lecHistory = await Container.get(
//   //     LectureHistoryService
//   //   ).getLectureHistoryByGradeId(grade.id);
//   //   lecHistory.lecture.

//   //   // lectures.push(await this.getLectureById(teach.lectureId));
//   // }

//     semesterGpas.reduce((sum, gpa) => (sum += gpa)) / semesterGpas.length;
//   return total;
// };

export const calculateSemesterLo = (
  lecHistory: LectureHistory[],
  grades: Grade[]
): number[] => {
  const cumulativeSum = Array(7).fill(0);
  for (let i = 0; i < grades.length; i++) {
    // const lecHistory = await Container.get(
    //   LectureHistoryService
    // ).getLectureHistoryByGradeId(grade.id);
    for (let j = 0; j < 7; i++) {
      const loKmtWeight = lecHistory[i].lecture.loKmtWeight;
      cumulativeSum[i] += grades[i].lo[j] * loKmtWeight[j];
    }
  }

  //   // lectures.push(await this.getLectureById(teach.lectureId));
  // }
  grades.forEach((grade) => {
    for (let i = 0; i < 7; i++) {
      cumulativeSum[i] /= grade.lo[i];
    }
  });
  return cumulativeSum.map((s) => s / grades.length);
};

export const calculateCumulativeLo = (semesterLos: number[][]): number[] => {
  const cumulativeSum = Array(7).fill(0);
  semesterLos.forEach((lo) => {
    for (let i = 0; i < 7; i++) {
      cumulativeSum[i] += lo[i];
    }
  });
  return cumulativeSum.map((s) => s / semesterLos.length);
};
