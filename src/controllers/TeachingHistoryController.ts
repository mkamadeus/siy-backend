import 'reflect-metadata';
import { TeachingHistory } from '@/models/TeachingHistory';
import {
  Authorized,
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

import {
  CreateTeachingHistoryBody,
  UpdateTeachingHistoryBody,
} from './request/TeachingHistoryRequest';
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
    @Body() teaches: CreateTeachingHistoryBody
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
    @Body() teaches: UpdateTeachingHistoryBody
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
  @Put('/:id')
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
    @Param('id') id: number,
    @Body() teaches: UpdateTeachingHistoryBody
  ) {
    return await Container.get(TeachingHistoryService).update(
      id,
      teaches as TeachingHistory
    );
  }

  // @Authorized([UserRole.ADMIN, UserRole.TEACHER])
  @Delete('/:id')
  @OpenAPI({
    description: 'Delete teaching information by ID',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public removeTeachingHistory(@Param('id') id: number) {
    return Container.get(TeachingHistoryService).deleteTeachingHistory(id);
  }
}
