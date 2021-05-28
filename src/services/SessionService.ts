import { Grade } from '@/models/Grade';
import { LectureHistory } from '@/models/LectureHistory';
import { SessionData } from '@/models/Session';
import { Student } from '@/models/Student';
import { Teacher } from '@/models/Teacher';
import { TeachingHistory } from '@/models/TeachingHistory';
import { User, UserRole } from '@/models/User';
import { parseBearerToken } from '@/utils/AuthUtils';
import Container, { Service } from 'typedi';
import { AuthService } from './AuthService';
import { GradeService } from './GradeService';
import { LectureHistoryService } from './LectureHistoryService';
import { StudentService } from './StudentService';
import { TeacherService } from './TeacherService';
import { TeachingHistoryService } from './TeachingHistoryService';

@Service()
export class SessionService {
  public async getCurrentUser(bearer: string): Promise<User> {
    const jwtToken = parseBearerToken(bearer);
    const user = await Container.get(AuthService).getUserByToken(jwtToken);

    return user;
  }

  // public async getCurrentStudent(bearer: string): Promise<Student> {
  //   const user = await this.getCurrentUser(bearer);
  //   const student = await Container.get(StudentService).getStudentByUserId(
  //     user.id
  //   );
  //   return student;
  // }

  // public async getCurrentTeacher(bearer: string): Promise<Teacher> {
  //   const user = await this.getCurrentUser(bearer);
  //   const teacher = await Container.get(TeacherService).getTeacherByUserId(
  //     user.id
  //   );
  //   return teacher;
  // }

  public async getSessionData(bearer: string): Promise<SessionData> {
    const user = await this.getCurrentUser(bearer);
    const result = {
      role: user.role,
      userData: null,
    };
    if (user.role === UserRole.STUDENT) {
      const student = await Container.get(StudentService).getStudentByUserId(
        user.id
      );
      result.userData = student;
    } else if (user.role === UserRole.TEACHER || user.role === UserRole.ADMIN) {
      const teacher = await Container.get(TeacherService).getTeacherByUserId(
        user.id
      );
      result.userData = teacher;
    }

    return result;
  }

  public async getAuthenticatedLectureHistory(
    bearer: string
  ): Promise<LectureHistory[]> {
    const data = await this.getSessionData(bearer);
    if (data.role !== UserRole.STUDENT) {
      throw new Error('Not a student!');
    }
    const student = data.userData as Student;
    const histories = await Container.get(
      LectureHistoryService
    ).getLectureHistoryByStudentId(student.id);
    return histories;
  }

  public async getAuthenticatedGrades(bearer: string): Promise<Grade[]> {
    const data = await this.getSessionData(bearer);
    if (data.role !== UserRole.STUDENT) {
      throw new Error('Not a student!');
    }
    const student = data.userData as Student;
    const grades = await Container.get(GradeService).getGradesByStudentId(
      student.id
    );
    return grades;
  }

  public async getAuthenticatedTeachingHistory(
    bearer: string
  ): Promise<TeachingHistory[]> {
    const data = await this.getSessionData(bearer);
    if (data.role !== UserRole.TEACHER) {
      throw new Error('Not a teacher!');
    }
    const teacher = data.userData as Teacher;
    const history = await Container.get(
      TeachingHistoryService
    ).getTeachingHistoryByTeacherId(teacher.id);
    return history;
  }
}
