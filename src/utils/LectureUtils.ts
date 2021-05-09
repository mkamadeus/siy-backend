import { Grade } from '@/models/Grade';

export const calculateCourseOutcome = (grades: Grade[]): number[] => {
  const totalLo = Array(7).fill(0);

  if (grades.length === 0) {
    return totalLo;
  }

  grades.forEach((grade) => {
    for (let i = 0; i < 7; i++) {
      totalLo[i] += grade.lo[i];
    }
  });
  return totalLo.map((lo) => lo / grades.length);
};
