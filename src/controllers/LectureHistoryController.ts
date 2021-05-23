import 'reflect-metadata';
import {
  LectureHistory,
  LectureHistoryCreateInput,
  LectureHistoryUpdateInput,
} from '@/models/LectureHistory';
import { LectureHistoryService } from '@/services/LectureHistoryService';
import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { LectureHistoryResponse } from './response/LectureHistoryResponse';

import Container from 'typedi';


@JsonController('/lectures')
export class LectureHistoryController {
  @Get('/')
  @ResponseSchema(LectureHistoryResponse, { isArray: true })
  @OpenAPI({
    description: 'Get all Lectures',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public async getAllLectureHistory(): Promise<LectureHistory[]> {
    return Container.get(LectureHistoryService).getAllLectureHistory();
  }

  @Get('/students/:sid/lectures/:lid')
  @ResponseSchema(LectureHistoryResponse)
  @OpenAPI({
    description: 'Get one LectureHistory by student and lecture id',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public async getLectureHistoryById(
    @Param('sid') sid: number,
    @Param('lid') lid: number
  ): Promise<LectureHistory> {
    return await Container.get(LectureHistoryService).getLectureHistoryById(
      sid,
      lid
    );
  }

  @Get('/students/:sid/')
  @ResponseSchema(LectureHistoryResponse)
  @OpenAPI({
    description: 'Get LectureHistory by student  id',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public async getLectureHistoryByStudentId(
    @Param('sid') sid: number
  ): Promise<LectureHistory[]> {
    return await Container.get(
      LectureHistoryService
    ).getLectureHistoryByStudentId(sid);
  }

  @Get('/lectures/:lid/')
  @ResponseSchema(LectureHistoryResponse)
  @OpenAPI({
    description: 'Get LectureHistory by lecture id',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public async getLectureHistoryByLectureId(
    @Param('lid') lid: number
  ): Promise<LectureHistory[]> {
    return await Container.get(
      LectureHistoryService
    ).getLectureHistoryByLectureId(lid);
  }

  @Post('/')
  @ResponseSchema(LectureHistoryResponse)
  @OpenAPI({
    description: 'Create new lecture history',
    responses: {
      '200': {
        description: 'OK',
      },
      '400': {
        description: 'Bad request',
      },
    },
  })
  public createLectureHistory(
    @Body() lecture: LectureHistoryCreateInput
  ): Promise<LectureHistory> {
    return Container.get(LectureHistoryService).createLectureHistory(lecture);
  }

  @Put('/students/:sid/lectures/:lid')
  @ResponseSchema(LectureHistoryResponse)
  @OpenAPI({
    description: 'Update lecture, allows partial update',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public async updateLecture(
    @Param('sid') sid: number,
    @Param('lid') lid: number,
    @Body() lecture: LectureHistoryUpdateInput
  ): Promise<LectureHistory> {
    return await Container.get(LectureHistoryService).updateLectureHistory(
      sid,
      lid,
      lecture
    );
  }

  @Delete('/students/:sid/lectures/:lid')
  @OpenAPI({
    description: 'Delete lecture by ID',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public async removeLecture(
    @Param('sid') sid: number,
    @Param('lid') lid: number
    // @Body() lecture: LectureHistoryUpdateInput
  ): Promise<LectureHistory> {
    return await Container.get(LectureHistoryService).deleteLectureHistory(
      sid,
      lid
    );
  }
}
