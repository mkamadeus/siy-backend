import { UserRole } from '.prisma/client';
import { LectureHistory } from '@/models/LectureHistory';
import { Student } from '@/models/Student';
import { Teacher } from '@/models/Teacher';
import { SessionService } from '@/services/SessionService';
import {
  Authorized,
  Get,
  HeaderParam,
  JsonController,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import Container from 'typedi';
import { GradeResponse } from './response/StudentGradeResponse';
import { StudentResponse } from './response/StudentResponse';
import { TeacherResponse } from './response/TeacherResponse';

@Authorized([UserRole.STUDENT])
@JsonController('/session/student')
export class StudentSessionController {
  @Get('/')
  @ResponseSchema(StudentResponse)
  @OpenAPI({
    description: 'Get student grades by session token',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public async getStudentBySession(
    @HeaderParam('Authorization') bearer: string
  ): Promise<Student> {
    const student = await Container.get(SessionService).getCurrentStudent(
      bearer
    );
    return student;
  }

  @Get('/grades')
  @ResponseSchema(GradeResponse, { isArray: true })
  @OpenAPI({
    description: 'Get student lecture history by session token',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public async getLectureHistoryBySession(
    @HeaderParam('Authorization') bearer: string
  ): Promise<LectureHistory[]> {
    const histories = await Container.get(
      SessionService
    ).getCurrentLectureHistory(bearer);
    return histories;
  }
}

@Authorized([UserRole.TEACHER])
@JsonController('/session/teacher')
export class TeacherSessionController {
  @Get('/')
  @ResponseSchema(TeacherResponse)
  @OpenAPI({
    description: 'Get student grades by session token',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public async getTeacherBySession(
    @HeaderParam('Authorization') bearer: string
  ): Promise<Teacher> {
    const teacher = await Container.get(SessionService).getCurrentTeacher(
      bearer
    );
    return teacher;
  }
}
