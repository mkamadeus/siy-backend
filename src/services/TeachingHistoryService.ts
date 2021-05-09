import { Service } from 'typedi';
import {
  TeachingHistory,
  TeachingHistoryCreateInput,
  TeachingHistoryUpdateInput,
} from '@/models/TeachingHistory';
import { prisma } from '@/repository/prisma';

@Service()
export class TeachingHistoryService {
  public async getAllTeachingHistory(): Promise<TeachingHistory[]> {
    const history = await prisma.teachingHistory.findMany({
      include: { lecture: true, teacher: true },
    });
    return history;
  }

  public async getTeachingHistoryById(
    lectureId: number,
    teacherId: number
  ): Promise<TeachingHistory> {
    const history = await prisma.teachingHistory.findFirst({
      include: { lecture: true, teacher: true },
      where: { lectureId, teacherId },
    });
    return history;
  }

  public async getTeachingHistoryByTeacherId(
    teacherId: number
  ): Promise<TeachingHistory[]> {
    const history = await prisma.teachingHistory.findMany({
      include: { lecture: true, teacher: true },
      where: { teacherId },
    });
    return history;
  }

  public async getTeachingHistoryByLectureId(
    lectureId: number
  ): Promise<TeachingHistory[]> {
    const history = await prisma.teachingHistory.findMany({
      include: { lecture: true, teacher: true },
      where: { lectureId },
    });
    return history;
  }

  public async createTeachingHistory(
    data: TeachingHistoryCreateInput
  ): Promise<TeachingHistory> {
    const history = await prisma.teachingHistory.create({ data });
    return this.getTeachingHistoryById(history.lectureId, history.teacherId);
  }

  public async updateTeachingHistory(
    lectureId: number,
    teacherId: number,
    data: TeachingHistoryUpdateInput
  ): Promise<TeachingHistory> {
    const history = await prisma.teachingHistory.update({
      where: {
        teacherId_lectureId: {
          teacherId,
          lectureId,
        },
      },
      data,
    });
    return this.getTeachingHistoryById(history.lectureId, history.teacherId);
  }

  public async deleteTeachingHistory(
    lectureId: number,
    teacherId: number
  ): Promise<TeachingHistory> {
    const history = await prisma.teachingHistory.delete({
      where: {
        teacherId_lectureId: {
          lectureId,
          teacherId,
        },
      },
    });
    return this.getTeachingHistoryById(history.lectureId, history.teacherId);
  }
}
