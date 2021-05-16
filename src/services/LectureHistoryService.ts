import { Service } from 'typedi';
import {
  AcademicYear,
  LectureHistory,
  LectureHistoryCreateInput,
  LectureHistoryUpdateInput,
} from '@/models/LectureHistory';
import { prisma } from '@/repository/prisma';

@Service()
export class LectureHistoryService {
  public async getAllLectureHistory(): Promise<LectureHistory[]> {
    const history = await prisma.lectureHistory.findMany({
      include: { lecture: true, student: true, grade: true },
    });
    return history;
  }

  public async getLectureHistoryById(
    studentId: number,
    lectureId: number,
    gradeId: number
  ): Promise<LectureHistory> {
    const history = await prisma.lectureHistory.findFirst({
      include: { lecture: true, student: true, grade: true },
      where: { lectureId, studentId, gradeId },
    });
    return history;
  }

  public async getLectureHistoryByStudentId(
    studentId: number
  ): Promise<LectureHistory[]> {
    const history = await prisma.lectureHistory.findMany({
      include: { lecture: true, student: true, grade: true },
      where: { studentId },
    });
    return history;
  }

  public async getLectureHistoryByLectureId(
    lectureId: number
  ): Promise<LectureHistory[]> {
    const history = await prisma.lectureHistory.findMany({
      include: { lecture: true, student: true, grade: true },
      where: { lectureId },
    });
    return history;
  }

  public async getLectureHistoryByGradeId(
    gradeId: number
  ): Promise<LectureHistory> {
    const history = await prisma.lectureHistory.findFirst({
      include: { lecture: true, student: true, grade: true },
      where: { gradeId },
    });
    return history;
  }

  // public async getLectureHistoryBetweenAcademicYear(
  //   minYear: AcademicYear,
  //   maxYear: AcademicYear
  // ): Promise<LectureHistory[]> {
  //   const histories = this.getLectureHistoryByStudentId(studentId);

  //   const minAcademicYear = getMinAcademicYear(histories);
  //   const maxAcademicYear = getMaxAcademicYear(histories);

  //   const grades = histories
  //     .filter((history) => {
  //       const year = getAcademicYear(history);
  //       return isAcademicYearBetween(year, minAcademicYear, maxAcademicYear);
  //     })
  //     .map((history) => history.grade);
  // }

  public async createLectureHistory(
    data: LectureHistoryCreateInput
  ): Promise<LectureHistory> {
    const history = await prisma.lectureHistory.create({ data });
    return this.getLectureHistoryById(
      history.studentId,
      history.lectureId,
      history.gradeId
    );
  }

  public async updateLectureHistory(
    studentId: number,
    lectureId: number,
    gradeId: number,
    data: LectureHistoryUpdateInput
  ): Promise<LectureHistory> {
    const history = await prisma.lectureHistory.update({
      where: {
        studentId_lectureId_gradeId: {
          studentId,
          lectureId,
          gradeId,
        },
      },
      data,
    });
    return this.getLectureHistoryById(
      history.studentId,
      history.lectureId,
      history.gradeId
    );
  }

  public async deleteLectureHistory(
    studentId: number,
    lectureId: number,
    gradeId: number
  ): Promise<LectureHistory> {
    const history = await prisma.lectureHistory.delete({
      where: {
        studentId_lectureId_gradeId: {
          studentId,
          lectureId,
          gradeId,
        },
      },
    });
    return this.getLectureHistoryById(
      history.studentId,
      history.lectureId,
      history.gradeId
    );
  }
}
