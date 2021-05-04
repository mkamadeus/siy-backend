import Question from '@/entity/Question';
import { Service } from 'typedi';
import { getRepository, Repository } from 'typeorm';

@Service()
export class QuestionService {
  private questionRepository: Repository<Question> = getRepository(
    Question,
    process.env.NODE_ENV === 'test' ? 'test' : 'default'
  );

  /**
   * Get all questions from database
   */
  public async getAll(): Promise<Question[]> {
    return await this.questionRepository.find();
  }

  /**
   * Get One Question with matching id
   * @param id
   */
  public async getOne(id: number): Promise<Question> {
    return await this.questionRepository.findOne({ where: { id } });
  }

  /**
   * Get list of questions with given answer type
   * @param answerType
   */
  public async getByAnswerType(answerType: string): Promise<Question[]> {
    return await this.questionRepository.find({ where: { answerType } });
  }

  /**
   * Create new question and save it in database
   * @param question
   */
  public async create(question: Question): Promise<Question> {
    return await this.questionRepository.save(question);
  }

  /**
   * Update question's attributes value
   * @param id
   * @param question
   */
  public async update(
    id: number,
    question: Partial<Question>
  ): Promise<Question> {
    question.id = id;
    return await this.questionRepository.save(question);
  }

  /**
   * Delete question with given id
   * @param id
   */
  public async delete(id: number): Promise<void> {
    await this.questionRepository.delete(id);
  }
}
