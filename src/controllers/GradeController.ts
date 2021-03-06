import 'reflect-metadata';
import { GradeService } from '@/services/GradeService';
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
import { GradeResponse } from './response/StudentGradeResponse';
import {
  CreateGradeBody,
  UpdateGradeBody,
} from './request/StudentGradeRequest';
import Container from 'typedi';
import { Grade } from '@/models/Grade';
import express from 'express';
import { fileUploadOptions } from '@/services/UploadService';

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
  public getAllGrades(): Promise<Grade[]> {
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
  public getGradeByNim(@Param('nim') nim: string): Promise<Grade[]> {
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
  public getLoById(@Param('id') id: number): Promise<number[]> {
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
  public getLOCumulative(@Param('nim') nim: string): Promise<number[]> {
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
  ): Promise<number[]> {
    return Container.get(GradeService).getSemesterLoByNIM(nim, year, semester);
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
  public getGradeByLecture(@Param('id') id: number): Promise<Grade[]> {
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
  public getGradeById(@Param('id') id: number): Promise<Grade> {
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
  public createGrade(@Body() grade: CreateGradeBody): Promise<Grade> {
    return Container.get(GradeService).createGrade(grade);
  }

  // @Post('/student/nim/:nim')
  // @ResponseSchema(GradeResponse)
  // @OpenAPI({
  //   description: 'Create new grade by NIM',
  //   responses: {
  //     '200': {
  //       description: 'OK',
  //     },
  //     '400': {
  //       description: 'Bad request',
  //     },
  //   },
  // })
  // public createGradeByNim(
  //   @Param('nim') nim: string,
  //   @Body() grade: CreateGradeByNimBody
  // ) {
  //   return Container.get(GradeService).createByNim(nim, grade as StudentGrade);
  // }

  // @Put('/student/nim/:nim')
  // @ResponseSchema(GradeResponse)
  // @OpenAPI({
  //   description: 'Update grade, allows partial update.',
  //   responses: {
  //     '200': {
  //       description: 'OK',
  //     },
  //   },
  // })
  // public updateGradeByNim(
  //   @Param('nim') nim: string,
  //   @Body() grade: UpdateGradeBody
  // ) {
  //   return Container.get(GradeService).updateByNim(nim, grade as StudentGrade);
  // }

  @Post('/upload')
  @UseBefore(express.urlencoded({ extended: true }))
  @OpenAPI({
    description:
      'Upload grade using Excel file. Use form data and insert the file using file field.',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public async uploadGrade(
    @UploadedFile('file', { required: true, options: fileUploadOptions() })
    file: Express.Multer.File,
    @BodyParam('lectureId') lectureId: number,
    @BodyParam('year') year: number,
    @BodyParam('semester') semester: number
  ): Promise<{
    errors: Error[];
  }> {
    if (!lectureId || !year || !semester)
      throw new Error('Provide necessary info.');
    const result = await Container.get(GradeService).createBulk(
      lectureId,
      year,
      semester,
      file
    );
    return result;
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
  public updateGrade(
    @Param('id') id: number,
    @Body() grade: UpdateGradeBody
  ): Promise<Grade> {
    return Container.get(GradeService).updateGrade(id, grade);
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
  public removeGrade(@Param('id') id: number): Promise<Grade> {
    return Container.get(GradeService).delete(id);
  }
}
