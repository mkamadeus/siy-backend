import Container, { Service } from 'typedi';
import {
  LectureHistory,
  LectureHistoryCreateInput,
  LectureHistoryUpdateInput,
} from '@/models/LectureHistory';
import { prisma } from '@/repository/prisma';
import { GradeService } from './GradeService';

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
    lectureId: number
  ): Promise<LectureHistory> {
    const history = await prisma.lectureHistory.findFirst({
      include: { lecture: true, student: true, grade: true },
      where: { lectureId, studentId },
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

  public async createLectureHistory(
    data: LectureHistoryCreateInput
  ): Promise<LectureHistory> {
    const history = await prisma.lectureHistory.create({ data });

    return this.getLectureHistoryById(history.studentId, history.lectureId);
  }

  public async updateLectureHistory(
    studentId: number,
    lectureId: number,
    data: LectureHistoryUpdateInput
  ): Promise<LectureHistory> {
    const history = await prisma.lectureHistory.update({
      where: {
        studentId_lectureId: {
          studentId,
          lectureId,
        },
      },
      data,
    });

    const lecHistory = await this.getLectureHistoryById(
      history.studentId,
      history.lectureId
    );

    Container.get(GradeService).updateAll(lecHistory.grade);
    return lecHistory;
  }

  public async deleteLectureHistory(
    studentId: number,
    lectureId: number
  ): Promise<LectureHistory> {
    const history = await prisma.lectureHistory.delete({
      where: {
        studentId_lectureId: {
          studentId,
          lectureId,
        },
      },
    });
    return this.getLectureHistoryById(history.studentId, history.lectureId);
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
}
