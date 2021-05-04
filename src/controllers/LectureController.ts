import 'reflect-metadata';
import Lecture from '@/entity/Lecture';
import { LectureService } from '@/services/LectureService';
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
import { LectureResponse } from './response/LectureResponse';
import { CreateLectureBody, UpdateLectureBody } from './request/LectureRequest';
import { CourseAssessmentResponse } from './response/CourseAssessmentResponse';

@JsonController('/lectures')
export class LectureController {
  constructor(private lectureService: LectureService) {
    this.lectureService = lectureService;
  }

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
  public getAllLectures() {
    return this.lectureService.getAllLectures();
  }

  @Get('/course/:id')
  @ResponseSchema(LectureResponse)
  @OpenAPI({
    description: 'Get Lecture by course',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public getLectureByCourse(@Param('id') id: number) {
    return this.lectureService.getLectureByCourse(id);
  }

  @Get('/year/:year')
  @ResponseSchema(LectureResponse)
  @OpenAPI({
    description: 'Get Lecture by year',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public getLectureByYear(@Param('year') year: number) {
    return this.lectureService.getLectureByYear(year);
  }

  @Get('/year/:year/:semester')
  @ResponseSchema(LectureResponse)
  @OpenAPI({
    description: 'Get Lecture by year and semester',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public getLectureByYearSemester(
    @Param('year') year: number,
    @Param('semester') semester: number
  ) {
    return this.lectureService.getLectureByYearSemester(year, semester);
  }

  @Get('/co/:id/:lo')
  @ResponseSchema(LectureResponse)
  @OpenAPI({
    description: 'Get course outcome per LO by lecture id',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public getCOperLO(@Param('id') id: number, @Param('lo') lo: string) {
    return this.lectureService.getCourseOutcomeLO(id, lo);
  }

  @Get('/co/:id')
  @ResponseSchema(LectureResponse)
  @OpenAPI({
    description: 'Get course outcome by lecture id',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public getCO(@Param('id') id: number) {
    return this.lectureService.getCourseOutcome(id);
  }

  @Get('/ca/teacher/:id')
  @ResponseSchema(CourseAssessmentResponse)
  @OpenAPI({
    description: 'Get course assessment by teacher id',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public getTeacherCA(@Param('id') id: number) {
    return this.lectureService.getCourseAssessmentByTeacherId(id);
  }

  @Get('/ca/:id')
  @ResponseSchema(LectureResponse)
  @OpenAPI({
    description: 'Get course assessment by lecture id',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public getCA(@Param('id') id: number) {
    return this.lectureService.getCourseAssessmentByID(id);
  }

  @Get('/ca')
  @ResponseSchema(CourseAssessmentResponse)
  @OpenAPI({
    description: 'Get all detailed course assessment',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public getAllCA() {
    return this.lectureService.getCourseAssessment();
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
  public getOneLecture(@Param('id') id: number) {
    return this.lectureService.getLectureById(id);
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
  public createLecture(@Body() lecture: CreateLectureBody) {
    return this.lectureService.create(lecture as Lecture);
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
    @Body() lecture: UpdateLectureBody
  ) {
    return await this.lectureService.update(id, lecture as Lecture);
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
  public removeLecture(@Param('id') id: number) {
    return this.lectureService.delete(id);
  }
}
