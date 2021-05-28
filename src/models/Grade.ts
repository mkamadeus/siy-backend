import Prisma from '@prisma/client';

export type Grade = Prisma.Grade;

export type GradeCreateInput = Prisma.Prisma.GradeCreateInput;

export type GradeUpdateInput = Prisma.Prisma.GradeUpdateInput;

export enum IndexEnum {
  A = 'A',
  AB = 'AB',
  B = 'B',
  BC = 'BC',
  C = 'C',
  D = 'D',
  E = 'E',
}

export enum IndexValueEnum {
  A = 4,
  AB = 3.5,
  B = 3,
  BC = 2.5,
  C = 2,
  D = 1,
  E = 0,
}
