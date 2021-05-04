import { IndexValueEnum } from '@/enum/IndexEnum';
import { Grade } from '@prisma/client';

export const calculateCumulativeGpa = (grades: Grade[]): number => {
  let cumulativeSum = 0;
  grades.forEach((grade) => {
    cumulativeSum += grade.grade ? IndexValueEnum[grade.grade] : 4.0;
  });

  return cumulativeSum / grades.length;
};

export const calculateCumulativeLo = (grades: Grade[]): number[] => {
  const cumulativeSum = Array(7).fill(0);
  grades.forEach((grade) => {
    for (let i = 0; i < 7; i++) {
      cumulativeSum[i] += grade.lo[i];
    }
  });
  return cumulativeSum.map((s) => s / grades.length);
};
