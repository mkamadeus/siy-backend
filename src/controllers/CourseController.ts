import 'reflect-metadata';
import { CourseService } from '@/services/CourseService';
import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
} from 'routing-controllers';
import { Course } from '@prisma/client';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { CourseResponse } from './response/CourseResponse';
import { CreateCourseBody, UpdateCourseBody } from './request/CourseRequest';
import Container from 'typedi';

@JsonController('/courses')
export class CourseController {
  @Get('/')
  @ResponseSchema(CourseResponse, { isArray: true })
  @OpenAPI({
    description: 'Get all courses',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public async getAllCourses(): Promise<Course[]> {
    return Container.get(CourseService).getAllCourses();
  }

  @Get('/:id')
  @ResponseSchema(CourseResponse)
  @OpenAPI({
    description: 'Get course data by ID',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public async getCourseById(@Param('id') id: number): Promise<Course> {
    return await Container.get(CourseService).getCourseById(id);
  }

  @Post('/')
  @ResponseSchema(CourseResponse)
  @OpenAPI({
    description: 'Create new course',
    responses: {
      '200': {
        description: 'OK',
      },
      '400': {
        description: 'Bad request',
      },
    },
  })
  public createCourse(@Body() course: CreateCourseBody): Promise<Course> {
    return Container.get(CourseService).createCourse(course as Course);
  }

  @Put('/:id')
  @ResponseSchema(CourseResponse)
  @OpenAPI({
    description: 'Update course, allows partial update',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public async updateCourse(
    @Param('id') id: number,
    @Body() course: UpdateCourseBody
  ): Promise<Course> {
    return await Container.get(CourseService).updateCourse(
      id,
      course as Course
    );
  }

  @Delete('/:id')
  @OpenAPI({
    description: 'Delete course by ID',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public removeCourse(@Param('id') id: number): Promise<Course> {
    return Container.get(CourseService).deleteCourse(id);
  }
}
