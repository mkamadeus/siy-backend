import { Lecture } from '@/models/Lecture';

export const calculateLoAssessment = (
  caArray: number[],
  kmtWeightArray: number[][],
  lectures: Lecture[]
): number[] => {
  if (
    lectures.length !== caArray.length ||
    caArray.length !== kmtWeightArray.length
  )
    throw new Error('Length must be equal');

  const sumLo = Array(7).fill(0);
  const sumKMT = Array(7).fill(0);

  for (let i = 0; i < lectures.length; i++) {
    const ca = caArray[i];
    const kmtWeight = kmtWeightArray[i];
    for (let i = 0; i < 7; i++) {
      sumLo[i] += kmtWeight[i] * ca;
      sumKMT[i] += kmtWeight[i];
    }
  }

  const result = Array(7).fill(0);
  for (let i = 0; i < 7; i++) {
    result[i] = sumKMT[i] > 0 ? sumLo[i] / sumKMT[i] : 0;
  }

  return result;
};
