import RatingQuestionnaire from "@/entity/RatingQuestionnaire";
import { plainToClass } from "class-transformer";
import Container, { Service } from "typedi";
import { getRepository, Repository } from "typeorm";
import { StudentService } from "./StudentService";

@Service()
export class RatingQuestionnaireService {
  private ratingQuestionnaireRepository: Repository<RatingQuestionnaire> = getRepository(
    RatingQuestionnaire,
    process.env.NODE_ENV === "test" ? "test" : "default"
  );

  public async getAll(): Promise<RatingQuestionnaire[]> {
    return await this.ratingQuestionnaireRepository.find().then((rq) => rq);
  }

  public async getOne(id: number): Promise<RatingQuestionnaire> {
    return await this.ratingQuestionnaireRepository
      .findOne({ where: { id } })
      .then((rq) => rq);
  }

  public async getByLectureId(
    lectureId: number
  ): Promise<RatingQuestionnaire[]> {
    return await this.ratingQuestionnaireRepository
      .createQueryBuilder("rating_questionnaire")
      .leftJoinAndSelect("rating_questionnaire.lectures", "lecture")
      //.leftJoinAndSelect("teaches.lecture", "lecture")
      .where("lecture.id = :lectureId", { lectureId })
      .getMany();
  }

  public async create(rq: RatingQuestionnaire): Promise<RatingQuestionnaire> {
    return await this.ratingQuestionnaireRepository.save(rq);
  }

  //TODO: Create by student after confirming that they have StudentGrade of a Lecture
  public async createByStudentNimLecture(
    nim: string,
    lectureId: number,
    rq: RatingQuestionnaire
  ): Promise<RatingQuestionnaire> {
    try {
      const student = await Container.get(StudentService).getByNim(nim);
      const result = await this.ratingQuestionnaireRepository.save(
        plainToClass(RatingQuestionnaire, {
          studentId: student.id,
          lectureId: lectureId,
          ...rq,
        })
      );
      return result;
    } catch (err) {
      throw new EvalError(`Error on questionnaire ${nim}: ${err.message}`);
    }
  }

  public async update(
    id: number,
    rq: RatingQuestionnaire
  ): Promise<RatingQuestionnaire> {
    rq.id = id;
    await this.ratingQuestionnaireRepository.update(id, rq);
    return await this.getOne(id);
  }

  public async delete(id: number): Promise<void> {
    await this.ratingQuestionnaireRepository.delete(id);
    return;
  }
}
