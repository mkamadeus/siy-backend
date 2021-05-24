import { IndexValueEnum } from '@/models/Grade';
import { Grade, Lecture } from '@prisma/client';

/**
 *
 * @param grades
 * @returns weighted average from grades
 */
export const calculateAverageGrade = (
  credits: number[],
  grades: Grade[]
): number => {
  if (credits.length !== grades.length) throw new Error('Length must be equal');

  let cumulativeSum = 0;
  let totalCredits = 0;

  for (let i = 0; i < grades.length; i++) {
    const gradeValue = grades[i].grade ? IndexValueEnum[grades[i].grade] : 4.0;

    cumulativeSum += gradeValue * credits[i];
    totalCredits += credits[i];
  }

  return totalCredits > 0 ? cumulativeSum / totalCredits : 0;
};

/**
 * Calculate grade LO from final, mid, practicum, homework, and quiz score
 * @param lecture lecture of grade
 * @param grade
 * @returns lo result
 */
export const calculateGradeLo = (lecture: Lecture, grade: Grade): number[] => {
  const result = Array(7).fill(0);

  for (let i = 0; i < 7; i++) {
    let cumulativeSum = 0;
    let totalWeight = 0;

    const finalWeight = lecture.loFinalTestWeight[i];
    const midWeight = lecture.loMidTestWeight[i];
    const pracWeight = lecture.loPracticumWeight[i];
    const homeworkWeight = lecture.loHomeworkWeight[i];
    const quizWeight = lecture.loQuizWeight[i];

    cumulativeSum =
      grade.finalTest * finalWeight +
      grade.midTest * midWeight +
      grade.practicum * pracWeight +
      grade.homework * homeworkWeight +
      grade.quiz * quizWeight;

    totalWeight =
      finalWeight + midWeight + pracWeight + homeworkWeight + quizWeight;

    result[i] = totalWeight > 0 ? cumulativeSum / totalWeight : 0;
    result[i] = scaleToIndex(result[i]);
  }

  return result;
};

/**
 *
 * @param weights array of its KMT weights
 * @param grades
 * @returns weighted average of los
 */
export const calculateAverageLo = (
  weights: number[][],
  grades: Grade[]
): number[] => {
  if (weights.length !== grades.length) throw new Error('Length must be equal');

  const cumulativeSum = Array(7).fill(0);
  const totalKMT = Array(7).fill(0);
  const averageLO = Array(7).fill(0);
  for (let i = 0; i < grades.length; i++) {
    const loKmtWeight = weights[i];
    for (let j = 0; j < 7; j++) {
      cumulativeSum[j] += grades[i].lo[j] * loKmtWeight[j];
      totalKMT[j] += loKmtWeight[j];
    }
  }

  for (let i = 0; i < 7; i++) {
    averageLO[i] = totalKMT[i] > 0 ? cumulativeSum[i] / totalKMT[i] : 0;
  }

  return averageLO;
};

export const scaleToIndex = (number: number): number => {
  if (number != -1) {
    return (number * 4) / 100;
  } else {
    return -1;
  }
};
