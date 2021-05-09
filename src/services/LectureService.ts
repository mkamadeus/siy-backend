import { CourseAssessment } from '@/controllers/response/CourseAssessmentResponse';
import { LoEntry } from '@/enum/LoEnum';
import { LectureRating } from '@/enum/LectureRatingEnum';
import Container, { Service } from 'typedi';
import { CourseService } from './CourseService';
import { RatingQuestionnaireService } from './RatingQuestionnaireService';
import { GradeService } from './GradeService';
import { TeachingHistoryService } from './TeachingHistoryService';
import { prisma } from '@/repository/prisma';
import { Lecture } from '@prisma/client';
import { LectureCreateInput, LectureUpdateInput } from '@/models/Lecture';
import { calculateCourseOutcome } from '@/utils/LectureUtils';

@Service()
export class LectureService {
  /**
   * Get all Lectures
   */
  public async getAllLectures(): Promise<Lecture[]> {
    const lectures = await prisma.lecture.findMany();
    return lectures;
  }

  /**
   * Get lecture by database ID
   * @param id ID of the lecture
   */
  public async getLectureById(id: number): Promise<Lecture> {
    const lecture = await prisma.lecture.findFirst({ where: { id } });
    return lecture;
  }

  /**
   * Get lecture by course ID
   * @param id Course ID
   * @returns Lecture with specific course ID
   */
  public async getLectureByCourse(courseId: number): Promise<Lecture[]> {
    const lectures = await prisma.lecture.findMany({ where: { courseId } });
    return lectures;
  }

  /**
   * Get lecture by year
   * @param year Lecture year
   * @returns Lecture with specific year
   */
  public async getLectureByYear(year: number): Promise<Lecture[]> {
    const lectures = await prisma.lecture.findMany({ where: { year } });
    return lectures;
  }

  /**
   * Get lecture by lecture by year and semester
   * @param year Lecture year
   * @returns Lecture with specific year
   */
  public async getLectureByYearSemester(
    year: number,
    semester: number
  ): Promise<Lecture[]> {
    const lectures = await prisma.lecture.findMany({
      where: { year, semester },
    });
    return lectures;
  }

  /**
   * Get Course Outcome per LO by lecture ID
   * @param id ID of the lecture
   * @param lo type of lo
   */
  public async getCourseOutcomeLO(id: number): Promise<number[]> {
    const grades = await Container.get(StudentGradeService).getGradeByLectureId(
      id
    );
    const lo = calculateCourseOutcome(grades);
    return lo;
  }

  /**
   * Get Course Outcome by lecture ID
   * @param id ID of the lecture
   */
  public async getCourseOutcome(lectureId: number): Promise<number> {
    const grades = await Container.get(StudentGradeService).getGradeByLectureId(
      lectureId
    );
    let totalIdx = 0;

    grades.forEach((grade) => {
      const index = IndexValueEnum[grade.index];
      totalIdx += index;
    });

    const totalStudent = grades.length;
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
    const lecture = await this.getLectureById(lectureId);
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
    const teachers = await Container.get(
      TeachingHistoryService
    ).getTeachingHistoryByLectureId(lectureId);
    let total = 0;
    // if (lectureId == 2) {

    // }
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
    const lecture = await this.getLectureById(lectureId);
    const courseOutcome = await this.getCourseOutcome(lectureId);
    const rating = await this.getLectureRating(lecture);
    let portofolio = await this.getLecturePortofolioByID(lectureId);

    const averageRating = this.getAverageRating(rating);

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
    const lectures = await this.getAllLectures();
    return await this.getDetailedCA(lectures);
  }

  public async getCourseAssessmentByTeacherId(teacherId: number) {
    const teaches = await Container.get(
      TeachingHistoryService
    ).getInstancesByTeacherId(teacherId);
    const lectures: Lecture[] = [];
    for (const teach of teaches) {
      lectures.push(await this.getLectureById(teach.lectureId));
    }

    return await this.getDetailedCA(lectures);
  }

  public async getDetailedCA(lectures: Lecture[]) {
    const results: CourseAssessment[] = [];
    for (const lecture of lectures) {
      const result: CourseAssessment = {
        id: -1,
        code: 'code',
        name: 'name',
        courseOutcome: -1,
        questionnaires: -1,
        portofolio: -1,
        courseAssessment: -1,
        mark: 'mark',
      };

      const course = await Container.get(CourseService).getCourseById(
        lecture.courseId
      );
      const rating = await this.getLectureRating(lecture);
      const averageRating = this.getAverageRating(rating);
      const porto = await this.getLecturePortofolioByID(lecture.id);

      result.id = lecture.id;
      result.code = course.name;
      result.courseOutcome = await this.getCourseOutcome(lecture.id);
      result.questionnaires = averageRating;
      result.portofolio = this.scaleToIndex(porto);
      result.courseAssessment = await this.getCourseAssessmentByID(lecture.id);

      if (result.courseAssessment > 3) {
        result.mark = 'MANTAIN';
      } else if (result.courseAssessment == -1) {
        result.mark = 'MISSING DATA';
      } else {
        result.mark = 'IMPROVE';
      }

      results.push(result);
    }
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
    const averageRating = totalRating > 0 ? totalRating / 12 : -1;

    return averageRating;
  }

  public async createLecture(data: LectureCreateInput): Promise<Lecture> {
    const lecture = await prisma.lecture.create({ data });
    return lecture;
  }

  public async updateLecture(
    id: number,
    data: LectureUpdateInput
  ): Promise<Lecture> {
    const lecture = await prisma.lecture.update({ data, where: { id } });

    // Update grades
    const grades = await Container.get(GradeService).getGradeByLectureId(
      lecture.id
    );
    grades.forEach((grade) => {
      Container.get(GradeService).updateLO(grade);
    });

    return lecture;
  }

  public async deleteLecture(id: number): Promise<Lecture> {
    const lecture = await prisma.lecture.delete({ where: { id } });
    return lecture;
  }
}
