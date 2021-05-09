import 'reflect-metadata';
import Teaches from '@/entity/Teaches';
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
import { TeachesResponse } from './response/TeachesResponse';

import { CreateTeachesBody, UpdateTeachesBody } from './request/TeachesRequest';

@JsonController('/teaches')
export class TeachesController {
  constructor(private teachesService: TeachingHistoryService) {
    this.teachesService = teachesService;
  }

  // @Authorized([UserRole.ADMIN, UserRole.TEACHER])
  @Get('/')
  @ResponseSchema(TeachesResponse, { isArray: true })
  @OpenAPI({
    description: 'Get all teaching information',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public getAllTeaches() {
    return this.teachesService.getAllTeachingHistory();
  }

  // @Authorized([UserRole.ADMIN, UserRole.TEACHER])
  @Get('/:id')
  @ResponseSchema(TeachesResponse)
  @OpenAPI({
    description: 'Get one teaching information by ID',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public getTeachesById(@Param('id') id: number) {
    return this.teachesService.getOne(id);
  }

  // @Authorized([UserRole.ADMIN, UserRole.TEACHER])
  @Get('/teacher/:id')
  @ResponseSchema(TeachesResponse)
  @OpenAPI({
    description: 'Get teaching information of a teacher',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public getTeachesByTeacher(@Param('id') id: number) {
    return this.teachesService.getTeachingHistoryByTeacherId(id);
  }

  // @Authorized([UserRole.ADMIN, UserRole.TEACHER])
  @Get('/lecture/:id')
  @ResponseSchema(TeachesResponse)
  @OpenAPI({
    description: 'Get teaching information for a lecture',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public getTeachesByLecture(@Param('id') id: number) {
    return this.teachesService.getTeachingHistoryByLectureId(id);
  }

  // @Authorized([UserRole.ADMIN, UserRole.TEACHER])
  @Post('/')
  @ResponseSchema(TeachesResponse)
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
  public createTeaches(@Body() teaches: CreateTeachesBody) {
    return this.teachesService.createTeachingHistory(teaches as Teaches);
  }

  @Put('/portofolio/:lid/:tid')
  @ResponseSchema(TeachesResponse)
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
    @Body() teaches: UpdateTeachesBody
    // @Body() prototype: UpdatePortoBody
  ) {
    return await this.teachesService.updateTeachingHistory(
      lid,
      tid,
      teaches as Teaches
    );
  }

  //TODO: Is this necessary?
  @Authorized([UserRole.ADMIN, UserRole.TEACHER])
  @Put('/:id')
  @ResponseSchema(TeachesResponse)
  @OpenAPI({
    description: 'Update teaching information',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public async updateTeaches(
    @Param('id') id: number,
    @Body() teaches: UpdateTeachesBody
  ) {
    return await this.teachesService.update(id, teaches as Teaches);
  }

  @Authorized([UserRole.ADMIN, UserRole.TEACHER])
  @Delete('/:id')
  @OpenAPI({
    description: 'Delete teaching information by ID',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public removeTeaches(@Param('id') id: number) {
    return this.teachesService.deleteTeachingHistory(id);
  }
}
