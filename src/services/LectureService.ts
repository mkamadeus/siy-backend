import { LOAssessment } from "@/controllers/response/LOAssessmentResponse";
import { CourseAssessment } from "@/controllers/response/CourseAssessmentResponse";
import Lecture from "@/entity/Lecture";
import { IndexValueEnum } from "@/enum/IndexEnum";
import { LoEntry } from "@/enum/LoEnum";
import { LectureRating } from "@/enum/LectureRatingEnum";
import Container, { Service } from "typedi";
import { getRepository, Repository } from "typeorm";
import { CourseService } from "./CourseService";
import { RatingQuestionnaireService } from "./RatingQuestionnaireService";
import { StudentGradeService } from "./StudentGradeService";
import { TeachesService } from "./TeachesService";

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

  /**
   * Get Course Outcome by lecture ID
   * @param id ID of the lecture
   */
  public async getCourseOutcome(lectureId: number): Promise<number> {
    const grades = await Container.get(StudentGradeService).getByLectureId(
      lectureId
    );
    var totalIdx = 0;

    grades.forEach((grade) => {
      var index = IndexValueEnum[grade.index];
      totalIdx += index;
    });

    var totalStudent = grades.length;
    if (totalStudent > 0) {
      return totalIdx / totalStudent;
    } else {
      return -1;
    }

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

  public async getKMT(lectureId: number) {
    const lecture = await this.getOne(lectureId);
    const listKMT: LoEntry = {
      loA: lecture.loAKMTWeight,
      loB: lecture.loBKMTWeight,
      loC: lecture.loCKMTWeight,
      loD: lecture.loDKMTWeight,
      loE: lecture.loEKMTWeight,
      loF: lecture.loFKMTWeight,
      loG: lecture.loGKMTWeight,
    };

    return listKMT;
  }

  /**
   * Get Lecture Rating by Lecture
   * @param lecture Lecture
   */
  public async getLectureRating(lecture: Lecture) {
    const questionnaires = await Container.get(
      RatingQuestionnaireService
    ).getByLectureId(lecture.id);
    //console.log(questionnaires);
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
      m1: totalRating.m1 / countQuestionnaire,
      m2: totalRating.m1 / countQuestionnaire,
      m3: totalRating.m1 / countQuestionnaire,
      m4: totalRating.m1 / countQuestionnaire,
      m5: totalRating.m1 / countQuestionnaire,
      m6: totalRating.m1 / countQuestionnaire,
      m7: totalRating.m1 / countQuestionnaire,
      m8: totalRating.m1 / countQuestionnaire,
      m9: totalRating.m1 / countQuestionnaire,
      m10: totalRating.m1 / countQuestionnaire,
      m11: totalRating.m1 / countQuestionnaire,
      m12: totalRating.m1 / countQuestionnaire,
    };

    return averageRating;
  }

  /**
   * Get Lecture Portofolio by lecture ID
   * @param id ID of the lecture
   */
  public async getLecturePortofolioByID(lectureId: number): Promise<number> {
    const teachers = await Container.get(TeachesService).getByLectureId(
      lectureId
    );
    var total = 0;
    teachers.forEach(async (teacher) => {
      total += teacher.portofolio;
    });
    if (teachers.length > 0) {
      return total / teachers.length;
    } else {
      return -1;
    }
  }

  /**
   * Get Course Assessment by lecture ID
   * @param id ID of the lecture
   */
  public async getCourseAssessmentByID(lectureId: number) {
    const lecture = await this.getOne(lectureId);
    var courseOutcome = await this.getCourseOutcome(lectureId);
    const rating = await this.getLectureRating(lecture);
    var portofolio = await this.getLecturePortofolioByID(lectureId);

    const averageRating = this.getAverageRating(rating);

    // console.log(courseOutcome);
    // console.log(averageRating);
    // console.log(portofolio);
    if (averageRating > 0 && portofolio > 0 && courseOutcome > 0) {
      portofolio = this.scaleToIndex(portofolio);
      return 0.5 * courseOutcome + 0.4 * averageRating + 0.1 * portofolio;
    } else {
      return -1;
    }
  }

  /**
   * Get All Detailed Course Assessment
   */
  public async getCourseAssessment() {
    const lectures = await this.getAll();
    return await this.getDetailedCA(lectures);
  }

  public async getCourseAssessmentByTeacherId(teacherId: number) {
    const teaches = await Container.get(TeachesService).getInstancesByTeacherId(
      teacherId
    );
    var lectures: Lecture[] = [];
    for (const teach of teaches) {
      lectures.push(await this.getOne(teach.lectureId));
    }

    return await this.getDetailedCA(lectures);
  }

  public async getCourseAssessmentPerSemester(year: number, semester: number) {
    const lectures = await this.getByYearSemester(year, semester);

    return await this.getDetailedCA(lectures);
  }

  public async getDetailedCA(lectures: Lecture[]) {
    var results: CourseAssessment[] = [];
    for (const lecture of lectures) {
      //console.log("foreach");
      // console.log(lecture);
      var result: CourseAssessment = {
        id: -1,
        code: "code",
        name: "name",
        courseOutcome: -1,
        questionnaires: -1,
        portofolio: -1,
        courseAssessment: -1,
        mark: "mark",
      };
      //console.log("after declaring course assessment");
      //console.log(lecture.courseId);

      const course = await Container.get(CourseService).getOne(
        lecture.courseId
      );
      //console.log("getCourse");
      //console.log(course);
      const rating = await this.getLectureRating(lecture);
      const averageRating = this.getAverageRating(rating);
      var porto = await this.getLecturePortofolioByID(lecture.id);

      result.id = lecture.id;
      result.code = course.name;
      result.courseOutcome = await this.getCourseOutcome(lecture.id);
      result.questionnaires = averageRating;
      result.portofolio = this.scaleToIndex(porto);
      result.courseAssessment = await this.getCourseAssessmentByID(lecture.id);

      if (result.courseAssessment > 3) {
        result.mark = "MANTAIN";
      } else if (result.courseAssessment == -1) {
        result.mark = "MISSING DATA";
      } else {
        result.mark = "IMPROVE";
      }

      results.push(result);
    }
    return results;
  }

  public async getLOAssessment(year: number, semester: number) {
    var lectures = await this.getByYearSemester(year, semester);
    var result: LoEntry = {
      loA: 0,
      loB: 0,
      loC: 0,
      loD: 0,
      loE: 0,
      loF: 0,
      loG: 0,
    };

    var totalKMT: LoEntry = {
      loA: 0,
      loB: 0,
      loC: 0,
      loD: 0,
      loE: 0,
      loF: 0,
      loG: 0,
    };

    for (const lecture of lectures) {
      const courseAssessment = await this.getCourseAssessmentByID(lecture.id);
      if (courseAssessment != -1) {
        totalKMT.loA += lecture.loAKMTWeight;
        totalKMT.loB += lecture.loBKMTWeight;
        totalKMT.loC += lecture.loCKMTWeight;
        totalKMT.loD += lecture.loDKMTWeight;
        totalKMT.loE += lecture.loEKMTWeight;
        totalKMT.loF += lecture.loFKMTWeight;
        totalKMT.loG += lecture.loGKMTWeight;

        console.log("TESTT");
        console.log(lecture.id);
        console.log(lecture);
        console.log(courseAssessment);

        result.loA += courseAssessment * lecture.loAKMTWeight;
        result.loB += courseAssessment * lecture.loBKMTWeight;
        result.loC += courseAssessment * lecture.loCKMTWeight;
        result.loD += courseAssessment * lecture.loDKMTWeight;
        result.loE += courseAssessment * lecture.loEKMTWeight;
        result.loF += courseAssessment * lecture.loFKMTWeight;
        result.loG += courseAssessment * lecture.loGKMTWeight;
      }
    }

    console.log("result");
    console.log(result);
    console.log("totalKMT");
    console.log(totalKMT);

    if (result.loA > 0) {
      result.loA /= totalKMT.loA > 0 ? totalKMT.loA : 1;
    }
    if (result.loB > 0) {
      result.loB /= totalKMT.loB > 0 ? totalKMT.loB : 1;
    }
    if (result.loC > 0) {
      result.loC /= totalKMT.loC > 0 ? totalKMT.loC : 1;
    }
    if (result.loD > 0) {
      result.loD /= totalKMT.loD > 0 ? totalKMT.loD : 1;
    }
    if (result.loE) {
      result.loE /= totalKMT.loE > 0 ? totalKMT.loE : 1;
    }
    if (result.loF) {
      result.loF /= totalKMT.loF > 0 ? totalKMT.loF : 1;
    }
    if (result.loG) {
      result.loG /= totalKMT.loG > 0 ? totalKMT.loG : 1;
    }

    return result;

    // lo A = sum (courseAssessment_i*kmt_i) / total_kmt
  }

  public async getLOAssessmentDetail(year: number, semester: number) {
    const los = await this.getLOAssessment(year, semester);
    var results: LOAssessment[] = [
      {
        id: 1,
        loType: "LO A",
        value: los.loA,
        mark: los.loA > 3 ? "MAINTAIN" : "IMPROVE",
      },
      {
        id: 2,
        loType: "LO B",
        value: los.loB,
        mark: los.loB > 3 ? "MAINTAIN" : "IMPROVE",
      },
      {
        id: 3,
        loType: "LO C",
        value: los.loC,
        mark: los.loC > 3 ? "MAINTAIN" : "IMPROVE",
      },
      {
        id: 4,
        loType: "LO D",
        value: los.loD,
        mark: los.loD > 3 ? "MAINTAIN" : "IMPROVE",
      },
      {
        id: 5,
        loType: "LO E",
        value: los.loE,
        mark: los.loE > 3 ? "MAINTAIN" : "IMPROVE",
      },
      {
        id: 6,
        loType: "LO F",
        value: los.loF,
        mark: los.loF > 3 ? "MAINTAIN" : "IMPROVE",
      },
      {
        id: 7,
        loType: "LO G",
        value: los.loG,
        mark: los.loG > 3 ? "MAINTAIN" : "IMPROVE",
      },
    ];

    return results;
  }

  // utils
  public scaleToIndex(number: number) {
    if (number != -1) {
      return ((number - 0) * (4 - 0)) / (100 - 0) + 0;
    } else {
      return -1;
    }
  }

  public getAverageRating(rating: LectureRating) {
    const totalRating =
      rating.m1 +
      rating.m2 +
      rating.m3 +
      rating.m4 +
      rating.m5 +
      rating.m6 +
      rating.m7 +
      rating.m8 +
      rating.m9 +
      rating.m10 +
      rating.m11 +
      rating.m12;
    var averageRating = totalRating > 0 ? totalRating / 12 : -1;

    return averageRating;
  }

  public async create(lecture: Lecture): Promise<Lecture> {
    return await this.lectureRepository.save(lecture);
  }

  public async update(id: number, lecture: Lecture): Promise<Lecture> {
    lecture.id = id;
    await this.lectureRepository.update(id, lecture);
    var grades = await Container.get(StudentGradeService).getByLectureId(
      lecture.id
    );
    grades.forEach((grade) => {
      Container.get(StudentGradeService).updateLO(grade);
    });
    return await this.getOne(id);
  }

  public async delete(id: number): Promise<void> {
    await this.lectureRepository.delete(id);
    return;
  }
}
