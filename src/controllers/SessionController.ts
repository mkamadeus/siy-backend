import { UserRole } from '.prisma/client';
import { Grade } from '@/models/Grade';
import { LectureHistory } from '@/models/LectureHistory';
import { SessionData } from '@/models/Session';
import { TeachingHistory } from '@/models/TeachingHistory';
import { SessionService } from '@/services/SessionService';
import {
  Authorized,
  Get,
  HeaderParam,
  JsonController,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import Container from 'typedi';
import { TeacherResponse } from './response/TeacherResponse';

@Authorized([UserRole.STUDENT, UserRole.TEACHER, UserRole.ADMIN])
@JsonController('/me')
export class SessionController {
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
  public async getAuthenticatedUserData(
    @HeaderParam('Authorization') bearer: string
  ): Promise<SessionData> {
    const data = await Container.get(SessionService).getSessionData(bearer);
    return data;
  }

  @Get('/grades')
  public async getAuthenticatedGrades(
    @HeaderParam('Authorization') bearer: string
  ): Promise<Grade[]> {
    const grades = await Container.get(SessionService).getAuthenticatedGrades(
      bearer
    );
    return grades;
  }

  @Get('/lecture-histories')
  public async getAuthenticatedLectureHistory(
    @HeaderParam('Authorization') bearer: string
  ): Promise<LectureHistory[]> {
    const history = await Container.get(
      SessionService
    ).getAuthenticatedLectureHistory(bearer);
    return history;
  }

  @Get('/teaching-histories')
  public async getAuthenticatedTeachingHistory(
    @HeaderParam('Authorization') bearer: string
  ): Promise<TeachingHistory[]> {
    const history = await Container.get(
      SessionService
    ).getAuthenticatedTeachingHistory(bearer);
    return history;
  }

  // TODO: LO Suplemen
  @Get('/learning-outcome')
  public async getAuthenticatedLearningOutcome(
    @HeaderParam('Authorization') bearer: string
  ): Promise<number[]> {
    const lo = [];
    return lo;
  }
}
