/* import RatingQuestionnaire from '@/entity/RatingQuestionnaire';
import { plainToClass } from 'class-transformer';
import Container, { Service } from 'typedi';
import { Repository, getRepository } from 'typeorm';
import { StudentService } from './StudentService'; */
import {
  RatingQuestionnaire,
  RatingQuestionnaireCreateInput,
  RatingQuestionnaireUpdateInput,
} from '@/models/RatingQuestionnaire';
import { prisma } from '@/repository/prisma';
import { Service } from 'typedi';

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
   * @param rq Rating Questionnaire object that is going to be created
   */
  public async createRatingQuestionnaire(
    data: RatingQuestionnaireCreateInput
  ): Promise<RatingQuestionnaire> {
    data.ratings_m = Array(12).fill(0);
    const rq = await prisma.ratingQuestionnaire.create({ data });
    return rq;
  }

  //TODO: Create with student and lecture known.
  // public async createByStudentNimLecture(
  //   nim: string,
  //   lectureId: number,
  //   rq: RatingQuestionnaire
  // ): Promise<RatingQuestionnaire> {
  //   try {
  //     const student = await Container.get(StudentService).getStudentByNim(nim);
  //     const result = await this.ratingQuestionnaireRepository.save(
  //       plainToClass(RatingQuestionnaire, {
  //         studentId: student.id,
  //         lectureId: lectureId,
  //         ...rq,
  //       })
  //     );
  //     return result;
  //   } catch (err) {
  //     throw new EvalError(`Error on questionnaire ${nim}: ${err.message}`);
  //   }
  // }

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
