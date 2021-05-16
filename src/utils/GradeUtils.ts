import { IndexValueEnum } from '@/models/Grade';
import { CourseService } from '@/services/CourseService';
import { LectureHistoryService } from '@/services/LectureHistoryService';
import { LectureService } from '@/services/LectureService';
import { Grade } from '@prisma/client';
import Container from 'typedi';

export const calculateSemesterGpa = async (grades: Grade[]): Promise<number> => {
  let cumulativeSum = 0;
  let totalCredits = 0;
  for (const grade of grades) {
    let gradeValue = grade.grade ? IndexValueEnum[grade.grade] : 4.0
    const lecHistory = await Container.get(
      LectureHistoryService
    ).getLectureHistoryByGradeId(grade.id);
    const course = await Container.get(CourseService).getCourseById(lecHistory.lecture.courseId)
    cumulativeSum += gradeValue*course.credits
    totalCredits += course.credits
  }

  // grades.forEach((grade) => {
  //   cumulativeSum += grade.grade ? IndexValueEnum[grade.grade] : 4.0;
  // });

  return cumulativeSum / totalCredits;
};

export const calculateGpa = (semesterGpas: number[]): number => {
  const total = 0;
  

  //   const lecHistory = await Container.get(
  //     LectureHistoryService
  //   ).getLectureHistoryByGradeId(grade.id);
  //   lecHistory.lecture.

  //   // lectures.push(await this.getLectureById(teach.lectureId));
  // }

    semesterGpas.reduce((sum, gpa) => (sum += gpa)) / semesterGpas.length;
  return total;
};

export const calculateSemesterLo = (grades: Grade[]): number[] => {
  const cumulativeSum = Array(7).fill(0);
  // for (const grade of grades) {
  //   const lecHistory = await Container.get(
  //     LectureHistoryService
  //   ).getLectureHistoryByGradeId(grade.id);
  //   lecHistory.lecture.

  //   // lectures.push(await this.getLectureById(teach.lectureId));
  // }
  grades.forEach( (grade) => {
    for (let i = 0; i < 7; i++) {
      cumulativeSum[i] += grade.lo[i];
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


