import RatingQuestionnaire from "@/entity/RatingQuestionnaire";
import { Service } from "typedi";
import { getRepository, Repository } from "typeorm";

@Service()
export class RatingQuestionnaireService{
    private ratingQuestionnaireRepository: Repository<RatingQuestionnaire> = getRepository(
        RatingQuestionnaire,
        process.env.NODE_ENV === "test" ? "test" : "default"
    );

    public async getAll(): Promise<RatingQuestionnaire[]>{
        return await this.ratingQuestionnaireRepository.find().then((rq) => rq);
    }

    public async getOne(id: number): Promise<RatingQuestionnaire>{
        return await this.ratingQuestionnaireRepository
          .findOne({where: {id}})
          .then((rq) => rq);
    }

    public async getByLectureId(lectureId: number): Promise<RatingQuestionnaire[]>{
        return await this.ratingQuestionnaireRepository
            .createQueryBuilder("rating_questionnaire")
            .leftJoinAndSelect("rating_questionnaire.teaches", "teaches")
            .leftJoinAndSelect("teaches.lecture", "lecture")
            .where("lecture.id = :lectureId", { lectureId })
            .getMany()
    }

    public async create(rq: RatingQuestionnaire): Promise<RatingQuestionnaire>{
        return await this.ratingQuestionnaireRepository.save(rq);
    }

    public async update(id: number, rq: RatingQuestionnaire): Promise<RatingQuestionnaire>{
        rq.id = id;
        await this.ratingQuestionnaireRepository.update(id, rq);
        return await this.getOne(id);
    }

    public async delete(id: number): Promise<void>{
        await this.ratingQuestionnaireRepository.delete(id);
        return;
    }
}
