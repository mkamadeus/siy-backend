import {
  RatingQuestionnaire,
  RatingQuestionnaireCreateInput,
  RatingQuestionnaireUncheckedCreateInput,
  RatingQuestionnaireUpdateInput,
  RatingQuestionnaireUncheckedUpdateInput,
} from '@/models/RatingQuestionnaire';
import { Student } from '@/models/Student';
import { UserRole } from '@/models/User';
import { prisma } from '@/repository/prisma';
import { SessionService } from '@/services/SessionService';
import { Service } from 'typedi';
import Container from 'typedi';

@Service()
export class RatingQuestionnaireService {
  /*
  private ratingQuestionnaireRepository: Repository<RatingQuestionnaire> = getRepository(
    RatingQuestionnaire,
    process.env.NODE_ENV === 'test' ? 'test' : 'default'
  );*/

  /**
   * Get all Rating Questionnaires of a lecture from database.
   * @returns All Rating Questionnaires
   */
  public async getAllRatingQuestionnaires(): Promise<RatingQuestionnaire[]> {
    const rq = await prisma.ratingQuestionnaire.findMany();
    return rq;
  }

  /**
   * Get one Rating Questionnaire by ID from database.
   * @param id ID of Rating Questionnaire
   * @returns Rating Questionnaire with given ID
   */
  public async getRatingQuestionnaireById(
    studentId: number,
    lectureId: number
  ): Promise<RatingQuestionnaire> {
    const rq = await prisma.ratingQuestionnaire.findUnique({
      where: { studentId_lectureId: { studentId, lectureId } },
    });
    return rq;
  }

  /**
   * Get all Rating Questionnaires with a given lecture ID.
   * @param lectureId Lecture ID
   * @returns Rating Questionnaires from a lecture with given ID.
   */
  public async getRatingQuestionnaireByLectureId(
    lectureId: number
  ): Promise<RatingQuestionnaire[]> {
    const rq = await prisma.ratingQuestionnaire.findMany({
      where: { lectureId },
    });
    return rq;
  }

  /**
   * Create a new Rating Questionnaire.
   * @param data Rating Questionnaire object that is going to be created
   */
  public async createRatingQuestionnaire(
    data: RatingQuestionnaireCreateInput
  ): Promise<RatingQuestionnaire> {
    const rq = await prisma.ratingQuestionnaire.create({ data });
    return rq;
  }

  public async createRatingQuestionnaireByStudent(
    bearer: string,
    lectureId: number,
    data: RatingQuestionnaireUncheckedCreateInput
  ): Promise<RatingQuestionnaire> {
    const user = await Container.get(SessionService).getSessionData(bearer);
    if (user.role !== UserRole.STUDENT) {
      throw new Error('Not a student!');
    }
    const student = user.userData as Student;
    data.studentId = student.id;
    data.lectureId = lectureId;
    const rq = await prisma.ratingQuestionnaire.create({ data });
    return rq;
  }

  public async updateRatingQuestionnaire(
    studentId: number,
    lectureId: number,
    data: RatingQuestionnaireUpdateInput
  ): Promise<RatingQuestionnaire> {
    const rq = await prisma.ratingQuestionnaire.update({
      where: { studentId_lectureId: { studentId, lectureId } },
      data,
    });
    return rq;
  }

  public async updateRatingQuestionnaireByStudent(
    bearer: string,
    lectureId: number,
    data: RatingQuestionnaireUncheckedUpdateInput
  ): Promise<RatingQuestionnaire> {
    const user = await Container.get(SessionService).getSessionData(bearer);
    if (user.role !== UserRole.STUDENT) {
      throw new Error('Not a student!');
    }
    const student = user.userData as Student;
    const studentId = student.id;
    const rq = await prisma.ratingQuestionnaire.update({
      where: { studentId_lectureId: { studentId, lectureId } },
      data,
    });
    return rq;
  }

  public async deleteRatingQuestionnaire(
    studentId: number,
    lectureId: number
  ): Promise<RatingQuestionnaire> {
    const rq = await prisma.ratingQuestionnaire.delete({
      where: { studentId_lectureId: { studentId, lectureId } },
    });
    return rq;
  }
}
