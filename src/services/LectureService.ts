import Lecture from "@/entity/Lecture";
import { Service } from "typedi";
import { getRepository, Repository } from "typeorm";

@Service()
export class LectureService {
  private lectureRepository: Repository<Lecture> = getRepository(Lecture);

  public async getAll(): Promise<Lecture[]> {
    return await this.lectureRepository.find().then((cls) => cls);
  }

  public async getOne(id: number): Promise<Lecture> {
    return await this.lectureRepository.findOne({ where: { id } });
  }

  public async getByCourse(id: number): Promise<Lecture[]> {
    return await this.lectureRepository.find({ where: { courseId:id } });
  }

  public async getByYear(year: number): Promise<Lecture[]> {
    return await this.lectureRepository.find({ where: { year:year } });
  }

  public async getByYearSemester(year: number, semester: number): Promise<Lecture[]> {
    return await this.lectureRepository.find({ where: { year:year, semester:semester } });
  }

  // public async getFromCourseId(id: number)

  public async create(lecture: Lecture): Promise<Lecture> {
    return await this.lectureRepository.save(lecture);
  }

  public async update(id: number, lecture: Lecture): Promise<Lecture> {
    lecture.id = id;
    await this.lectureRepository.update(id, lecture);
    return await this.getOne(id);
  }

  public async delete(id: number): Promise<void> {
    await this.lectureRepository.delete(id);
    return;
  }
}
