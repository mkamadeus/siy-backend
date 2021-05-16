import { UserRole } from '.prisma/client';
import { Student } from './Student';
import { Teacher } from './Teacher';

export type SessionData = {
  role: UserRole;
  userData: Student | Teacher | null;
};
