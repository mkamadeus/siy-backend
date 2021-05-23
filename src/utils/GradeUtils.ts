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

  // grades.forEach((grade) => {
  //   cumulativeSum += grade.grade ? IndexValueEnum[grade.grade] : 4.0;
  // });

  return cumulativeSum / totalCredits;
};

/**
 * Calculate grade LO from final, mid, practicum, homework, and quiz score
 * @param lecture lecture of grade
 * @param grade
 * @returns lo result
 */
export const calculateGradeLO = (lecture: Lecture, grade: Grade): number[] => {
  var result = Array(7).fill(0);

  for (let i = 0; i < 7; i++) {
    let cumulativeSum = 0;
    let totalWeight = 0;

    let finalWeight = lecture.loFinalTestWeight[i];
    let midWeight = lecture.loMidTestWeight[i];
    let pracWeight = lecture.loPracticumWeight[i];
    let homeworkWeight = lecture.loHomeworkWeight[i];
    let quizWeight = lecture.loQuizWeight[i];

    cumulativeSum =
      grade.finalTest * finalWeight +
      grade.midTest * midWeight +
      grade.practicum * pracWeight +
      grade.homework * homeworkWeight +
      grade.quiz * quizWeight;

    totalWeight =
      finalWeight + midWeight + pracWeight + homeworkWeight + quizWeight;

    result[i] = totalWeight > 0 ? cumulativeSum / totalWeight : 0;
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

  var cumulativeSum = Array(7).fill(0);
  var totalKMT = Array(7).fill(0);
  var averageLO = Array(7).fill(0);
  for (let i = 0; i < grades.length; i++) {
    // const lecHistory = await Container.get(
    //   LectureHistoryService
    // ).getLectureHistoryByGradeId(grade.id);
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


