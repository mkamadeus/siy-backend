import { IndexValueEnum } from '@/models/Grade';
import { Grade } from '@prisma/client';

export const calculateSemesterGpa = (grades: Grade[]): number => {
  let cumulativeSum = 0;
  grades.forEach((grade) => {
    cumulativeSum += grade.grade ? IndexValueEnum[grade.grade] : 4.0;
  });

  return cumulativeSum / grades.length;
};

export const calculateGpa = (semesterGpas: number[]): number => {
  const total =
    semesterGpas.reduce((sum, gpa) => (sum += gpa)) / semesterGpas.length;
  return total;
};

export const calculateSemesterLo = (grades: Grade[]): number[] => {
  const cumulativeSum = Array(7).fill(0);
  grades.forEach((grade) => {
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
