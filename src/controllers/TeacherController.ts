import 'reflect-metadata';
import { Teacher } from '@/models/Teacher';
import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
} from 'routing-controllers';
import { TeacherService } from '@/services/TeacherService';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { TeacherResponse } from './response/TeacherResponse';
import { CreateTeacherBody, UpdateTeacherBody } from './request/TeacherRequest';
import Container from 'typedi';
import { TeachingHistory } from '@/models/TeachingHistory';
import { TeachingHistoryService } from '@/services/TeachingHistoryService';

@JsonController('/teachers')
export class TeacherController {
  // @Authorized([UserRole.ADMIN, UserRole.TEACHER])
  @Get('/')
  @ResponseSchema(TeacherResponse, { isArray: true })
  @OpenAPI({
    description: 'Get all teachers',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public async getAllTeachers(): Promise<Teacher[]> {
    return await Container.get(TeacherService).getAllTeachers();
  }

  // @Authorized([UserRole.ADMIN, UserRole.TEACHER])
  @Get('/:id')
  @ResponseSchema(TeacherResponse)
  @OpenAPI({
    description: 'Get teacher data by ID',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public getTeacherById(@Param('id') id: number): Promise<Teacher> {
    return Container.get(TeacherService).getTeacherById(id);
  }

  @Get('/:id/teaching-history')
  @ResponseSchema(TeacherResponse)
  @OpenAPI({
    description: 'Get teacher data by ID',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public async getTeacherTeachingHistory(
    @Param('id') id: number
  ): Promise<TeachingHistory[]> {
    return await Container.get(
      TeachingHistoryService
    ).getTeachingHistoryByTeacherId(id);
  }

  // @Authorized([UserRole.ADMIN, UserRole.TEACHER])
  @Post('/')
  @ResponseSchema(TeacherResponse)
  @OpenAPI({
    description: 'Create new teacher',
    responses: {
      '200': {
        description: 'OK',
      },
      '400': {
        description: 'Bad request',
      },
    },
  })
  public createTeacher(@Body() teacher: CreateTeacherBody): Promise<Teacher> {
    return Container.get(TeacherService).createTeacher(teacher);
  }

  @Put('/:id')
  @ResponseSchema(TeacherResponse)
  @OpenAPI({
    description: 'Update teacher',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public async updateTeacher(
    @Param('id') id: number,
    @Body() teacher: UpdateTeacherBody
  ): Promise<Teacher> {
    return await Container.get(TeacherService).updateTeacher(id, teacher);
  }

  @Delete('/:id')
  @OpenAPI({
    description: 'Delete teacher by ID',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public removeTeacher(@Param('id') id: number): Promise<Teacher> {
    return Container.get(TeacherService).deleteTeacher(id);
  }
}
