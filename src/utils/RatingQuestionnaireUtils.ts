import { RatingQuestionnaire } from '@/models/RatingQuestionnaire';

export const calculateAverageRatingofAllQuestionnaires = (
  ratings: RatingQuestionnaire[]
): number => {
  if (ratings.length === 0) {
    return 0;
  }

  let totalAverage = 0;
  ratings.forEach((rating) => {
    totalAverage += calculateAverageRatingOfOneQuestionnaire(rating);
  });

  return totalAverage / ratings.length;
};

export const calculateAverageRatingOfOneQuestionnaire = (
  rating: RatingQuestionnaire
): number => {
  if (rating.ratings_m.length === 0) {
    return 0;
  }

  let total = 0;
  rating.ratings_m.forEach((m) => {
    total += m;
  });

  return total / 12;
};
