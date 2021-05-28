import { RatingQuestionnaire } from '@/models/RatingQuestionnaire';
import {
  calculateAverageRatingOfOneQuestionnaire,
  calculateAverageRatingofAllQuestionnaires,
} from '@/utils/RatingQuestionnaireUtils';
import { expect } from 'chai';

describe('Rating Questionnaire utils test', () => {
  describe('One Questionnaire average test', () => {
    const rq: RatingQuestionnaire = {
      lectureId: 1,
      studentId: 1,
      ratings_m: [1.0, 3.6, 4.0, 3.0, 2.4, 3.5, 3.5, 4.0, 3.0, 3.0, 2.0, 3.0],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    it('should calculate average correctly', () => {
      const result = calculateAverageRatingOfOneQuestionnaire(rq);
      expect(result).to.be.eq(3.0);
    });
  });

  describe('No Questionnaire average test', () => {
    const rqs: RatingQuestionnaire[] = [];
    it('should give average of 0', () => {
      const result = calculateAverageRatingofAllQuestionnaires(rqs);
      expect(result).to.be.eq(0.0);
    });
  });

  describe('Cumulative average test', () => {
    const rqs: RatingQuestionnaire[] = [
      {
        lectureId: 1,
        studentId: 1,
        ratings_m: [1.0, 3.6, 4.0, 3.0, 2.4, 3.5, 3.5, 4.0, 3.0, 3.0, 2.0, 3.0],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        lectureId: 1,
        studentId: 2,
        ratings_m: [3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        lectureId: 1,
        studentId: 3,
        ratings_m: [1.0, 3.6, 4.0, 3.0, 2.4, 3.5, 4.0, 3.0, 3.5, 3.0, 2.0, 3.0],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    it('should calculate cumulative rating questionnaires correctly', () => {
      const result = calculateAverageRatingofAllQuestionnaires(rqs);
      expect(result).to.eq(3.0);
    });
  });
});
