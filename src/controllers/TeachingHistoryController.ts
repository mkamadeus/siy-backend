import 'reflect-metadata';
import {
  TeachingHistory,
  TeachingHistoryCreateInput,
  TeachingHistoryUpdateInput,
} from '@/models/TeachingHistory';
import {
  // Authorized,
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
} from 'routing-controllers';
import { TeachingHistoryService } from '@/services/TeachingHistoryService';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { TeachingHistoryResponse } from './response/TeachingHistoryResponse';

import Container from 'typedi';

@JsonController('/teaching-history')
export class TeachingHistoryController {
  // @Authorized([UserRole.ADMIN, UserRole.TEACHER])
  @Get('/')
  @ResponseSchema(TeachingHistoryResponse, { isArray: true })
  @OpenAPI({
    description: 'Get all teaching information',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public getAllTeachingHistory(): Promise<TeachingHistory[]> {
    return Container.get(TeachingHistoryService).getAllTeachingHistory();
  }

  // @Authorized([UserRole.ADMIN, UserRole.TEACHER])
  @Get('/teacher/:id')
  @ResponseSchema(TeachingHistoryResponse)
  @OpenAPI({
    description: 'Get teaching information of a teacher',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public getTeachingHistoryByTeacher(
    @Param('id') id: number
  ): Promise<TeachingHistory[]> {
    return Container.get(TeachingHistoryService).getTeachingHistoryByTeacherId(
      id
    );
  }

  // @Authorized([UserRole.ADMIN, UserRole.TEACHER])
  @Get('/lecture/:id')
  @ResponseSchema(TeachingHistoryResponse)
  @OpenAPI({
    description: 'Get teaching information for a lecture',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public getTeachingHistoryByLecture(
    @Param('id') id: number
  ): Promise<TeachingHistory[]> {
    return Container.get(TeachingHistoryService).getTeachingHistoryByLectureId(
      id
    );
  }

  // @Authorized([UserRole.ADMIN, UserRole.TEACHER])
  @Post('/')
  @ResponseSchema(TeachingHistoryResponse)
  @OpenAPI({
    description: 'Create new teaching information',
    responses: {
      '200': {
        description: 'OK',
      },
      '400': {
        description: 'Bad request',
      },
    },
  })
  public createTeachingHistory(
    @Body() teaches: TeachingHistoryCreateInput
  ): Promise<TeachingHistory> {
    return Container.get(TeachingHistoryService).createTeachingHistory(teaches);
  }

  @Put('/portofolio/:lid/:tid')
  @ResponseSchema(TeachingHistoryResponse)
  @OpenAPI({
    description: 'Update teaching information',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public async updatePorto(
    @Param('lid') lid: number,
    @Param('tid') tid: number,
    @Body() teaches: TeachingHistoryUpdateInput
    // @Body() prototype: UpdatePortoBody
  ): Promise<TeachingHistory> {
    return await Container.get(TeachingHistoryService).updateTeachingHistory(
      lid,
      tid,
      teaches
    );
  }

  //TODO: Is this necessary?
  // @Authorized([UserRole.ADMIN, UserRole.TEACHER])
  @Put('/teachers/:tid/lectures/:lid')
  @ResponseSchema(TeachingHistoryResponse)
  @OpenAPI({
    description: 'Update teaching information',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public async updateTeachingHistory(
    @Param('tid') tid: number,
    @Param('lid') lid: number,
    @Body() teaches: TeachingHistoryUpdateInput
  ): Promise<TeachingHistory> {
    return await Container.get(TeachingHistoryService).updateTeachingHistory(
      tid,
      lid,
      teaches
    );
  }

  // @Authorized([UserRole.ADMIN, UserRole.TEACHER])
  @Delete('/teachers/:tid/lectures/:lid')
  @OpenAPI({
    description: 'Delete teaching information by ID',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public removeTeachingHistory(
    @Param('tid') tid: number,
    @Param('lid') lid: number
  ): Promise<TeachingHistory> {
    return Container.get(TeachingHistoryService).deleteTeachingHistory(
      tid,
      lid
    );
  }
}
