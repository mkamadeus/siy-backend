import Prisma from '@prisma/client';
import { Student } from './Student';
import { Lecture } from './Lecture';
import { Grade } from './Grade';

export type LectureHistory = Prisma.LectureHistory & {
  lecture: Lecture;
  student: Student;
  grade: Grade;
};

export type LectureHistoryCreateInput = Prisma.Prisma.LectureHistoryCreateInput;

export type LectureHistoryUpdateInput = Prisma.Prisma.LectureHistoryUpdateInput;

export type AcademicYear = {
  year: number;
  semester: number;
};
