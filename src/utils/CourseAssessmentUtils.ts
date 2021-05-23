import { Grade, IndexValueEnum } from '@/models/Grade';

export const calculateCourseAssessment = (
  courseOutcome: number,
  quesionnaire: number,
  portfolio: number
): number => {
  if (courseOutcome > 0 && quesionnaire > 0 && portfolio > 0) {
    portfolio = scaleToIndex(portfolio);
    return 0.5 * courseOutcome + 0.4 * quesionnaire + 0.1 * portfolio;
  } else {
    return -1;
  }
};

export const calculateCourseOutcome = (grades: Grade[]): number => {
  let cumulativeSum = 0;
  for (const grade of grades) {
    const gradeValue = grade.grade ? IndexValueEnum[grade.grade] : 4.0;
    cumulativeSum += gradeValue;
  }

  return grades.length > 0 ? cumulativeSum / grades.length : 0;
};

export const scaleToIndex = (number: number): number => {
  if (number != -1) {
    return ((number - 0) * (4 - 0)) / (100 - 0) + 0;
  } else {
    return -1;
  }
};
