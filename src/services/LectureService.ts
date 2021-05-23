import { CourseAssessment } from '@/controllers/response/CourseAssessmentResponse';
import Container, { Service } from 'typedi';
import { CourseService } from './CourseService';
import { GradeService } from './GradeService';
import { TeachingHistoryService } from './TeachingHistoryService';
import { prisma } from '@/repository/prisma';
import { Lecture } from '@prisma/client';
import { LectureCreateInput, LectureUpdateInput } from '@/models/Lecture';
import { RatingQuestionnaireService } from './RatingQuestionnaireService';
import { calculateAverageRatingofAllQuestionnaires } from '@/utils/RatingQuestionnaireUtils';
import { calculateLoAssessment } from '@/utils/LoAssessmentUtils';
import {
  calculateCourseAssessment,
  calculateCourseOutcome,
  scaleToIndex,
} from '@/utils/CourseAssessmentUtils';

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
  public async getLectureBySemester(
    year: number,
    semester: number
  ): Promise<Lecture[]> {
    const lectures = await prisma.lecture.findMany({
      where: { year, semester },
    });
    return lectures;
  }

  public async getLoAssessmentbySemester(
    year: number,
    semester: number
  ): Promise<number[]> {
    const lectures = await this.getLectureBySemester(year, semester);

    const ca: number[] = [];
    const kmtWeight = [];

    for (const lecture of lectures) {
      ca.push(await this.getCourseAssessmentByID(lecture.id));
      kmtWeight.push(await this.getKMT(lecture.id));
    }

    const result = calculateLoAssessment(ca, kmtWeight, lectures);

    return result;
  }
  /**
   * Get Course Outcome per LO by lecture ID
   * @param id ID of the lecture
   * @param lo type of lo
   */
  // public async getCourseOutcomeLo(id: number): Promise<number[]> {
  //   const grades = await Container.get(GradeService).getGradesByLectureId(id);
  //   const lo = calculateCourseOutcome(grades);
  //   return lo;
  // }

  /**
   * Get Course Outcome by lecture ID
   * @param id ID of the lecture
   */
  public async getCourseOutcome(lectureId: number): Promise<number> {
    const grades = await Container.get(GradeService).getGradesByLectureId(
      lectureId
    );

    const result = calculateCourseOutcome(grades);

    return result;

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

  public async getKMT(lectureId: number): Promise<number[]> {
    const lecture = await this.getLectureById(lectureId);
    const listKMT = lecture.loKmtWeight;

    return listKMT;
  }

  /**
   * Get Lecture Rating by Lecture
   * @param lecture Lecture
   */
  public async getLectureRating(lecture: Lecture): Promise<number> {
    const questionnaires = await Container.get(
      RatingQuestionnaireService
    ).getRatingQuestionnaireByLectureId(lecture.id);

    const averageRating = calculateAverageRatingofAllQuestionnaires(
      questionnaires
    );

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

    teachers.forEach(async (teacher) => {
      total += teacher.portfolio;
    });

    return total > 0 ? total / teachers.length : 0;
  }

  /**
   * Get Course Assessment by lecture ID
   * @param id ID of the lecture
   */
  public async getCourseAssessmentByID(lectureId: number): Promise<number> {
    const lecture = await this.getLectureById(lectureId);
    const courseOutcome = await this.getCourseOutcome(lectureId);
    const rating = await this.getLectureRating(lecture);
    const portofolio = await this.getLecturePortofolioByID(lectureId);

    return calculateCourseAssessment(courseOutcome, rating, portofolio);
  }

  /**
   * Get All Detailed Course Assessment
   */
  public async getCourseAssessment(): Promise<CourseAssessment[]> {
    const lectures = await this.getAllLectures();
    return await this.getDetailedCA(lectures);
  }

  public async getCourseAssessmentByTeacherId(
    teacherId: number
  ): Promise<CourseAssessment[]> {
    const teaches = await Container.get(
      TeachingHistoryService
    ).getTeachingHistoryByTeacherId(teacherId);
    const lectures: Lecture[] = [];
    for (const teach of teaches) {
      lectures.push(teach.lecture);
    }

    return await this.getDetailedCA(lectures);
  }

  public async getDetailedCA(lectures: Lecture[]): Promise<CourseAssessment[]> {
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
      //const rating = await this.getLectureRating(lecture);
      //const averageRating = this.getAverageRating(rating);
      const porto = await this.getLecturePortofolioByID(lecture.id);

      result.id = lecture.id;
      result.code = course.name;
      result.courseOutcome = await this.getCourseOutcome(lecture.id);
      //result.questionnaires = averageRating;
      result.portofolio = scaleToIndex(porto);
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

  public async createLecture(data: LectureCreateInput): Promise<Lecture> {
    const lecture = await prisma.lecture.create({ data });
    // Update grades
    const grades = await Container.get(GradeService).getGradesByLectureId(
      lecture.id
    );
    grades.forEach((grade) => {
      Container.get(GradeService).updateAll(grade);
    });
    return lecture;
  }

  public async updateLecture(
    id: number,
    data: LectureUpdateInput
  ): Promise<Lecture> {
    const lecture = await prisma.lecture.update({ data, where: { id } });

    // Update grades
    const grades = await Container.get(GradeService).getGradesByLectureId(
      lecture.id
    );
    grades.forEach((grade) => {
      Container.get(GradeService).updateAll(grade);
    });

    return lecture;
  }

  public async deleteLecture(id: number): Promise<Lecture> {
    const lecture = await prisma.lecture.delete({ where: { id } });
    return lecture;
  }
}
