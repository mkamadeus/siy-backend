import Prisma from '@prisma/client';
import { Teacher } from './Teacher';
import { Lecture } from './Lecture';

export type TeachingHistory = Prisma.TeachingHistory & {
  lecture: Lecture;
  teacher: Teacher;
};

export type TeachingHistoryJoin = Prisma.TeachingHistory & {
  lecture: Lecture;
  teacher: Teacher;
};

export type TeachingHistoryCreateInput = Prisma.Prisma.TeachingHistoryCreateInput;

export type TeachingHistoryUpdateInput = Prisma.Prisma.TeachingHistoryUpdateInput;
