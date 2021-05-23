import { Grade, IndexValueEnum } from '@/models/Grade';

export const calculateCourseOutcome = (grades: Grade[]): number => {
  let cumulativeSum = 0;
  for (const grade of grades) {
    const gradeValue = grade.grade ? IndexValueEnum[grade.grade] : 4.0;
    cumulativeSum += gradeValue;
  }

  return cumulativeSum / grades.length;
};
