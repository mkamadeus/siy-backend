import 'reflect-metadata';
import StudentGrade from '@/entity/StudentGrade';
import { GradeService, StudentGradeService } from '@/services/GradeService';
import {
  Body,
  BodyParam,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
  UploadedFile,
  UseBefore,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { fileUploadOptions } from '@/services/UploadService';
import { GradeResponse } from './response/StudentGradeResponse';
import {
  CreateGradeBody,
  CreateGradeByNimBody,
  UpdateGradeBody,
} from './request/StudentGradeRequest';
import express from 'express';
import Container from 'typedi';

@JsonController('/grades')
export class GradeController {
  @Get('/')
  @ResponseSchema(GradeResponse, { isArray: true })
  @OpenAPI({
    description: 'Get all grades',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public getAllGrades() {
    return Container.get(GradeService).getAllGrades();
  }

  @Get('/student/:nim')
  @ResponseSchema(GradeResponse)
  @OpenAPI({
    description: 'Get grade data by NIM',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public getGradeByNim(@Param('nim') nim: string) {
    return Container.get(GradeService).getGradesByNim(nim);
  }

  @Get('/lo/:id')
  @ResponseSchema(GradeResponse)
  @OpenAPI({
    description: 'Get LO by grade ID',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public getLoById(@Param('id') id: number) {
    return Container.get(GradeService).getLoById(id);
  }

  @Get('/lo/nim/:nim')
  @ResponseSchema(GradeResponse)
  @OpenAPI({
    description: 'Get Cumulative LO by NIM',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public getLOCumulative(@Param('nim') nim: string) {
    return Container.get(GradeService).getCumulativeLoByNim(nim);
  }

  @Get('/lo/:nim/:year/:semester')
  @ResponseSchema(GradeResponse)
  @OpenAPI({
    description: 'Get cumulative LO per semester by NIM',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public getLOSemester(
    @Param('nim') nim: string,
    @Param('year') year: number,
    @Param('semester') semester: number
  ) {
    return Container.get(GradeService).getLOPerSemester(nim, year, semester);
  }

  @Get('/lecture/:id')
  @ResponseSchema(GradeResponse)
  @OpenAPI({
    description: 'Get grade data by grade ID',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public getGradeByLecture(@Param('id') id: number) {
    return Container.get(GradeService).getGradesByLectureId(id);
  }

  @Get('/:id')
  @ResponseSchema(GradeResponse)
  @OpenAPI({
    description: 'Get grade data by grade ID',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public getGradeById(@Param('id') id: number) {
    return Container.get(GradeService).getGradeById(id);
  }

  @Post('/')
  @ResponseSchema(GradeResponse)
  @OpenAPI({
    description: 'Create new grade',
    responses: {
      '200': {
        description: 'OK',
      },
      '400': {
        description: 'Bad request',
      },
    },
  })
  public createGrade(@Body() grade: CreateGradeBody) {
    return Container.get(GradeService).create(grade as StudentGrade);
  }

  @Post('/student/nim/:nim')
  @ResponseSchema(GradeResponse)
  @OpenAPI({
    description: 'Create new grade by NIM',
    responses: {
      '200': {
        description: 'OK',
      },
      '400': {
        description: 'Bad request',
      },
    },
  })
  public createGradeByNim(
    @Param('nim') nim: string,
    @Body() grade: CreateGradeByNimBody
  ) {
    return Container.get(GradeService).createByNim(nim, grade as StudentGrade);
  }

  @Put('/student/nim/:nim')
  @ResponseSchema(GradeResponse)
  @OpenAPI({
    description: 'Update grade, allows partial update.',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public updateGradeByNim(
    @Param('nim') nim: string,
    @Body() grade: UpdateGradeBody
  ) {
    return Container.get(GradeService).updateByNim(nim, grade as StudentGrade);
  }

  @Put('/:id')
  @ResponseSchema(GradeResponse)
  @OpenAPI({
    description: 'Update grade, allows partial update.',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public updateGrade(@Param('id') id: number, @Body() grade: UpdateGradeBody) {
    return Container.get(GradeService).updateGrade(id, grade as StudentGrade);
  }

  @Delete('/:id')
  @OpenAPI({
    description: 'Delete grade',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public removeGrade(@Param('id') id: number) {
    return Container.get(GradeService).delete(id);
  }
}
