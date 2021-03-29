import Lecture from "@/entity/Lecture";
import Container, { Service } from "typedi";
import { getRepository, Repository } from "typeorm";
import { StudentGradeService } from "./StudentGradeService";

@Service()
export class LectureService {
  private lectureRepository: Repository<Lecture> = getRepository(Lecture);

  /**
   * Get all Lectures
   */
  public async getAll(): Promise<Lecture[]> {
    return await this.lectureRepository.find().then((cls) => cls);
  }

  /**
   * Get lecture by database ID
   * @param id ID of the lecture
   */
  public async getOne(id: number): Promise<Lecture> {
    return await this.lectureRepository.findOne({ where: { id } });
  }

  /**
   * Get Course Outcome per LO by lecture ID
   * @param id ID of the lecture
   * @param lo type of lo
   */
  public async getCourseOutcomeLO(id: number, lo: string): Promise<number> {
    const grades = await Container.get(StudentGradeService).getByLectureId(id);
    var totalLO = 0;
    grades.forEach(grade => {
      if (lo=="A") {
        totalLO += grade.loA;
      }
      else if (lo=="B") {
        totalLO += grade.loB;
      }
      else if (lo=="C") {
        totalLO += grade.loC;
      }
      else if (lo=="D") {
        totalLO += grade.loD;
      }
      else if (lo=="E") {
        totalLO += grade.loE;
      }
      else if (lo=="F") {
        totalLO += grade.loF;
      }
      else if (lo=="G") {
        totalLO += grade.loG;
      }
    });
    return totalLO / grades.length
  }

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
