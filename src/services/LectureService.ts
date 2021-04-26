import { GradeResponse } from "@/controllers/response/StudentGradeResponse";
import Lecture from "@/entity/Lecture";
import { IndexValueEnum } from "@/enum/IndexEnum";
import { LectureRating } from "@/enum/LectureRatingEnum";
import Container, { Service } from "typedi";
import { getRepository, Repository } from "typeorm";
import { RatingQuestionnaireService } from "./RatingQuestionnaireService";
import { StudentGradeService } from "./StudentGradeService";

@Service()
export class LectureService {
  private lectureRepository: Repository<Lecture> = getRepository(
    Lecture,
    process.env.NODE_ENV === "test" ? "test" : "default"
  );

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

  public async getByCourse(id: number): Promise<Lecture[]> {
    return await this.lectureRepository.find({ where: { courseId: id } });
  }

  public async getByYear(year: number): Promise<Lecture[]> {
    return await this.lectureRepository.find({ where: { year: year } });
  }

  public async getByYearSemester(
    year: number,
    semester: number
  ): Promise<Lecture[]> {
    return await this.lectureRepository.find({
      where: { year: year, semester: semester },
    });
  }

  /**
   * Get Course Outcome per LO by lecture ID
   * @param id ID of the lecture
   * @param lo type of lo
   */
  public async getCourseOutcomeLO(id: number, lo: string): Promise<number> {
    const grades = await Container.get(StudentGradeService).getByLectureId(id);
    var totalLO = 0;
    grades.forEach((grade) => {
      if (lo == "A") {
        totalLO += grade.loA;
      } else if (lo == "B") {
        totalLO += grade.loB;
      } else if (lo == "C") {
        totalLO += grade.loC;
      } else if (lo == "D") {
        totalLO += grade.loD;
      } else if (lo == "E") {
        totalLO += grade.loE;
      } else if (lo == "F") {
        totalLO += grade.loF;
      } else if (lo == "G") {
        totalLO += grade.loG;
      }
    });
    if (totalLO == null || grades.length == 0) {
      return 0;
    }
    return totalLO / grades.length;
  }

  public async getCourseOutcome(id: number): Promise<number> {
    const grades = await Container.get(StudentGradeService).getByLectureId(id);
    var totalIdx = 0;

    grades.forEach((grade) => {
      var index = IndexValueEnum[grade.index];
      totalIdx += index;
    });

    var totalStudent = grades.length;
    return totalIdx / totalStudent;

    // const lect = this.getOne(id);
    // var kmtA = (await lect).loAKMTWeight;
    // if (kmtA == null) {
    //   kmtA = 0;
    // }
    // var kmtB = (await lect).loBKMTWeight;
    // if (kmtB == null) {
    //   kmtB = 0;
    // }
    // var kmtC = (await lect).loCKMTWeight;
    // if (kmtC == null) {
    //   kmtC = 0;
    // }
    // var kmtD = (await lect).loDKMTWeight;
    // if (kmtD == null) {
    //   kmtD = 0;
    // }
    // var kmtE = (await lect).loEKMTWeight;
    // if (kmtE == null) {
    //   kmtE = 0;
    // }
    // var kmtF = (await lect).loFKMTWeight;
    // if (kmtF == null) {
    //   kmtF = 0;
    // }
    // var kmtG = (await lect).loGKMTWeight;
    // if (kmtG == null) {
    //   kmtG = 0;
    // }

    // const coA = await this.getCourseOutcomeLO(id, "A");
    // const coB = await this.getCourseOutcomeLO(id, "B");
    // const coC = await this.getCourseOutcomeLO(id, "C");
    // const coD = await this.getCourseOutcomeLO(id, "D");
    // const coE = await this.getCourseOutcomeLO(id, "E");
    // const coF = await this.getCourseOutcomeLO(id, "F");
    // const coG = await this.getCourseOutcomeLO(id, "G");

    // var totalKMT = kmtA + kmtB + kmtC + kmtD + kmtE + kmtF + kmtG;

    // return (
    //   (kmtA * coA +
    //     kmtB * coB +
    //     kmtC * coC +
    //     kmtD * coD +
    //     kmtE * coE +
    //     kmtF * coF +
    //     kmtG * coG) /
    //   totalKMT
    // );
  }

  public async getLectureRating(lecture: Lecture) {
    const questionnaires = await Container.get(RatingQuestionnaireService).getByLectureId(lecture.id);
    const totalRating: LectureRating = {
      m1: 0,
      m2: 0,
      m3: 0,
      m4: 0,
      m5: 0,
      m6: 0,
      m7: 0,
      m8: 0,
      m9: 0,
      m10: 0,
      m11: 0,
      m12: 0,
    };
    const countQuestionnaire = questionnaires.length;
    questionnaires.forEach((rate) => {
      totalRating.m1 += rate.ratingM_1;
      totalRating.m2 += rate.ratingM_2;
      totalRating.m3 += rate.ratingM_3;
      totalRating.m4 += rate.ratingM_4;
      totalRating.m5 += rate.ratingM_5;
      totalRating.m6 += rate.ratingM_6;
      totalRating.m7 += rate.ratingM_7;
      totalRating.m8 += rate.ratingM_8;
      totalRating.m9 += rate.ratingM_9;
      totalRating.m10 += rate.ratingM_10;
      totalRating.m11 += rate.ratingM_11;
      totalRating.m12 += rate.ratingM_12;
    });

    const averageRating: LectureRating = {
      m1: totalRating.m1/countQuestionnaire,
      m2: totalRating.m1/countQuestionnaire,
      m3: totalRating.m1/countQuestionnaire,
      m4: totalRating.m1/countQuestionnaire,
      m5: totalRating.m1/countQuestionnaire,
      m6: totalRating.m1/countQuestionnaire,
      m7: totalRating.m1/countQuestionnaire,
      m8: totalRating.m1/countQuestionnaire,
      m9: totalRating.m1/countQuestionnaire,
      m10: totalRating.m1/countQuestionnaire,
      m11: totalRating.m1/countQuestionnaire,
      m12: totalRating.m1/countQuestionnaire,
    };

    return averageRating;
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
