import Teaches from "@/entity/Teaches";
import { Service } from "typedi";
import { getRepository, Repository } from "typeorm";

@Service()
export class TeachesService {
  private teachesRepository: Repository<Teaches> = getRepository(
    Teaches,
    process.env.NODE_ENV === "test" ? "test" : "default"
  );

  public async getAll(): Promise<Teaches[]> {
    return await this.teachesRepository
      //.find().then((teaches) => teaches);
      .createQueryBuilder("teaches")
      .leftJoinAndSelect("teaches.teacher", "teacher")
      .leftJoinAndSelect("teaches.lecture", "lectures")
      .getMany();
  }

  public async getOne(id: number): Promise<Teaches> {
    return await this.teachesRepository
      //.findOne({where: {id}})
      //.then((teaches) => teaches);
      .createQueryBuilder("teaches")
      .leftJoinAndSelect("teaches.teacher", "teacher")
      .leftJoinAndSelect("teaches.lecture", "lectures")
      .where("teaches.id = :id", { id })
      .getOne();
  }

  public async getByTeacherId(teacherId: number): Promise<Teaches[]> {
    return await this.teachesRepository
      .createQueryBuilder("teaches")
      .leftJoinAndSelect("teaches.teacher", "teacher")
      .leftJoinAndSelect("teaches.lecture", "lectures")
      .where("teacher.id = :teacherId", { teacherId })
      .getMany();
  }

  public async getByLectureId(lectureId: number): Promise<Teaches[]> {
    return await this.teachesRepository
      .createQueryBuilder("teaches")
      .leftJoinAndSelect("teaches.teacher", "teacher")
      .leftJoinAndSelect("teaches.lecture", "lecture")
      .where("lecture.id = :lectureId", { lectureId })
      .getMany();
  }

  public async getLecturePortofolioByID(lid: number): Promise<number> {
    const teachers = await this.getByLectureId(lid);
    var total = 0;
    teachers.forEach((teacher) => {
      total += teacher.portofolio;
    });

    return total / teachers.length;
  }

  public async create(teaches: Teaches): Promise<Teaches> {
    return await this.teachesRepository.save(teaches);
  }

  public async updatePortofolio(
    lectureId: number,
    teacherId: number,
    teaches: Teaches
  ): Promise<Teaches> {
    // .createQueryBuilder()
    // .update(User)
    // .set({ firstName: "Timber", lastName: "Saw" })
    // .where("id = :id", { id: 1 })
    // .execute();
    const teaches2 = await this.teachesRepository
      .createQueryBuilder("teaches")
      .where("lecture_id = :lectureId", { lectureId })
      .andWhere("teacher_id = :teacherId", { teacherId })
      .getOne();
    teaches.lectureId = lectureId;
    teaches.teacherId = teacherId;
    await this.teachesRepository.update(teaches2.id, teaches);
    return await this.getOne(teaches2.id);
  }

  public async update(id: number, teaches: Teaches): Promise<Teaches> {
    teaches.id = id;
    await this.teachesRepository.update(id, teaches);
    return await this.getOne(id);
  }

  public async delete(id: number): Promise<void> {
    await this.teachesRepository.delete(id);
    return;
  }
}
