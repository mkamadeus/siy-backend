import { LectureHistory } from '@/models/LectureHistory';
import { Student } from '@/models/Student';
import { Teacher } from '@/models/Teacher';
import { User } from '@/models/User';
import { parseBearerToken } from '@/utils/AuthUtils';
import Container, { Service } from 'typedi';
import { AuthService } from './AuthService';
import { LectureHistoryService } from './LectureHistoryService';
import { StudentService } from './StudentService';
import { TeacherService } from './TeacherService';

@Service()
export class SessionService {
  public async getCurrentUser(bearer: string): Promise<User> {
    const jwtToken = parseBearerToken(bearer);
    const user = await Container.get(AuthService).getUserByToken(jwtToken);

    return user;
  }

  public async getCurrentStudent(bearer: string): Promise<Student> {
    const user = await this.getCurrentUser(bearer);
    const student = await Container.get(StudentService).getStudentByUserId(
      user.id
    );
    return student;
  }

  public async getCurrentTeacher(bearer: string): Promise<Teacher> {
    const user = await this.getCurrentUser(bearer);
    const teacher = await Container.get(TeacherService).getTeacherByUserId(
      user.id
    );
    return teacher;
  }

  public async getCurrentLectureHistory(
    bearer: string
  ): Promise<LectureHistory[]> {
    const student = await this.getCurrentStudent(bearer);
    const histories = await Container.get(
      LectureHistoryService
    ).getLectureHistoryByStudentId(student.id);
    return histories;
  }
}
