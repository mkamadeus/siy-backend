import 'reflect-metadata';
import StudentGrade from '@/entity/StudentGrade';
import { StudentGradeService } from '@/services/GradeService';
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

@JsonController('/grades')
export class GradeController {
  constructor(private gradeService: StudentGradeService) {
    this.gradeService = gradeService;
  }

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
  public async getAllGrades() {
    return await this.gradeService.getAllGrades();
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
  public async getGradeByNim(@Param('nim') nim: string) {
    return await this.gradeService.getGradeByNim(nim);
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
  public async getLoById(@Param('id') id: number) {
    return await this.gradeService.getLoById(id);
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
  public async getLOCumulative(@Param('nim') nim: string) {
    return await this.gradeService.getCumulativeLoByNim(nim);
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
  public async getLOSemester(
    @Param('nim') nim: string,
    @Param('year') year: number,
    @Param('semester') semester: number
  ) {
    return await this.gradeService.getLOPerSemester(nim, year, semester);
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
  public async getGradeByLecture(@Param('id') id: number) {
    return await this.gradeService.getGradeByLectureId(id);
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
  public async getGradeById(@Param('id') id: number) {
    return await this.gradeService.getGradeById(id);
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
  public async createGrade(@Body() grade: CreateGradeBody) {
    return await this.gradeService.create(grade as StudentGrade);
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
  public async createGradeByNim(
    @Param('nim') nim: string,
    @Body() grade: CreateGradeByNimBody
  ) {
    return this.gradeService.createByNim(nim, grade as StudentGrade);
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
    return this.gradeService.updateByNim(nim, grade as StudentGrade);
  }

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
  ) {
    if (!lectureId || !year || !semester)
      throw new Error('Provide necessary info.');
    const result = await this.gradeService.createBulk(
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
  public updateGrade(@Param('id') id: number, @Body() grade: UpdateGradeBody) {
    return this.gradeService.update(id, grade as StudentGrade);
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
    return this.gradeService.delete(id);
  }
}
