import 'reflect-metadata';
import {
  Lecture,
  LectureCreateInput,
  LectureUpdateInput,
} from '@/models/Lecture';
import { LectureService } from '@/services/LectureService';
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
  QueryParams,
  UploadedFile,
  UseBefore,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { LectureResponse } from './response/LectureResponse';
import { GetLecturesQuery } from './request/LectureRequest';
import {
  CourseAssessment,
  CourseAssessmentResponse,
} from './response/CourseAssessmentResponse';
import Container from 'typedi';
import { LectureHistoryService } from '@/services/LectureHistoryService';
import { Student } from '@/models/Student';
import express from 'express';
import { fileUploadOptions } from '@/services/UploadService';

@JsonController('/lectures')
export class LectureController {
  @Get('/')
  @ResponseSchema(LectureResponse, { isArray: true })
  @OpenAPI({
    description: 'Get all Lectures',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public async getAllLectures(): Promise<Lecture[]> {
    return Container.get(LectureService).getAllLectures();
  }

  @Get('/query/')
  @ResponseSchema(LectureResponse, { isArray: true })
  @OpenAPI({
    description: 'Get all Lectures',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public async getAllLecturesByQuery(
    @QueryParams() query: GetLecturesQuery
  ): Promise<Lecture[]> {
    const { year, semester } = query;

    if (year && semester) {
      return await Container.get(LectureService).getLectureBySemester(
        year,
        semester
      );
    } else if (year && !semester) {
      return await Container.get(LectureService).getLectureByYear(year);
    } else if (!year && !semester) {
      return await Container.get(LectureService).getAllLectures();
    }
    throw new Error('Year must exist if semester exist');
  }

  @Get('/:id')
  @ResponseSchema(LectureResponse)
  @OpenAPI({
    description: 'Get one Lecture',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public async getLectureById(@Param('id') id: number): Promise<Lecture> {
    return await Container.get(LectureService).getLectureById(id);
  }

  @Get('/:id/students')
  @ResponseSchema(LectureResponse)
  @OpenAPI({
    description: 'Get one Lecture',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public async getStudentsByLectureId(
    @Param('id') id: number
  ): Promise<Student[]> {
    const history = await Container.get(
      LectureHistoryService
    ).getLectureHistoryByLectureId(id);
    const students = history.map((h) => h.student);
    return students;
  }

  @Get('/learning-outcomes/:year/:semester')
  @ResponseSchema(CourseAssessmentResponse)
  @OpenAPI({
    description: 'Get course assessment by teacher id',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public async getLearningOutcomeBySemester(
    @Param('year') year: number,
    @Param('semester') semester: number
  ): Promise<number[]> {
    return await Container.get(LectureService).getLoAssessmentbySemester(
      year,
      semester
    );
  }

  @Get('/:id/course-assessment')
  @ResponseSchema(CourseAssessmentResponse)
  @OpenAPI({
    description: 'Get course assessment by teacher id',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public async getCourseAssessmentByLectureId(
    @Param('id') id: number
  ): Promise<number> {
    return await Container.get(LectureService).getCourseAssessmentByID(id);
  }

  @Get('/course-assessment/:year/:semester')
  @ResponseSchema(CourseAssessmentResponse)
  @OpenAPI({
    description: 'Get course assessment by teacher id',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public async getCourseAssessment(
    @Param('year') year: number,
    @Param('semester') semester: number
  ): Promise<CourseAssessment[]> {
    const lectures = await Container.get(LectureService).getLectureBySemester(
      year,
      semester
    );
    const detailedCA = await Container.get(LectureService).getDetailedCA(
      lectures
    );

    return detailedCA;
  }

  @Post('/')
  @ResponseSchema(LectureResponse)
  @OpenAPI({
    description: 'Create new lecture',
    responses: {
      '200': {
        description: 'OK',
      },
      '400': {
        description: 'Bad request',
      },
    },
  })
  public createLecture(@Body() lecture: LectureCreateInput): Promise<Lecture> {
    return Container.get(LectureService).createLecture(lecture);
  }

  @Post('/:id/grades')
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
    @Param('id') id: number,
    @BodyParam('year') year: number,
    @BodyParam('semester') semester: number
  ): Promise<{ errors: Error[] }> {
    if (!id || !year || !semester) throw new Error('Provide necessary info.');
    const result = Container.get(GradeService).createBulk(
      id,
      year,
      semester,
      file
    );
    return result;
  }

  @Put('/:id')
  @ResponseSchema(LectureResponse)
  @OpenAPI({
    description: 'Update lecture, allows partial update',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public async updateLecture(
    @Param('id') id: number,
    @Body() lecture: LectureUpdateInput
  ): Promise<Lecture> {
    return await Container.get(LectureService).updateLecture(
      id,
      lecture as Lecture
    );
  }

  @Delete('/:id')
  @OpenAPI({
    description: 'Delete lecture by ID',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public async removeLecture(@Param('id') id: number): Promise<Lecture> {
    return await Container.get(LectureService).deleteLecture(id);
  }
}
