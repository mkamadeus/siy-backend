import Answer from "@/entity/Answer";
import { Service } from "typedi";
import { getRepository, Repository } from "typeorm";

@Service()
export class AnswerService {
  private answerRepository: Repository<Answer> = getRepository(Answer);

  /**
   * Get all answers from database
   */
  public async getAll(): Promise<Answer[]> {
    return await this.answerRepository.find();
  }

  /**
   * Get answer with given ID
   * @param id
   */
  public async getOne(id: number): Promise<Answer> {
    return await this.answerRepository.findOne({ where: { id } });
  }

  /**
   * Get list of answers with given form ID
   * @param formId
   */
  public async getFormAnswers(formId: number): Promise<Answer[]> {
    return await this.answerRepository.find({ where: { formId } });
  }

  /**
   * Get all answers from given course
   * @param course
   */
  public async getCourseAnswers(code: string): Promise<Answer[]> {
    return await this.answerRepository
      .createQueryBuilder("answer")
      .innerJoin("answer.course", "course")
      .where("course.code = :code", { code })
      .getMany();
  }

  /**
   * Get all answers from given course and form
   * @param courseId
   * @param formId
   */
  public async getCourseFormAnswers(
    code: string,
    formId: number
  ): Promise<Answer[]> {
    return await this.answerRepository
      .createQueryBuilder("answer")
      .innerJoin("answer.course", "course")
      .where("course.code = :code", { code })
      .andWhere("answer.formId = :formId", { formId })
      .getMany();
  }

  /**
   * Save an answer to database
   * @param answer
   */
  public async create(answer: Answer): Promise<Answer> {
    return await this.answerRepository.save(answer);
  }

  /**
   * Update an answer attributes' value
   * @param id
   * @param answer
   */
  public async update(id: number, answer: Partial<Answer>): Promise<Answer> {
    answer.id = id;
    return await this.answerRepository.save(answer);
  }

  /**
   * Delete an answer with given id
   * @param id
   */
  public async delete(id: number): Promise<void> {
    await this.answerRepository.delete(id);
  }
}
