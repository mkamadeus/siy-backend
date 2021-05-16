import 'reflect-metadata';
import { StudentService } from '@/services/StudentService';
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
import { StudentResponse } from './response/StudentResponse';
import { CreateStudentBody, UpdateStudentBody } from './request/StudentRequest';
import Container from 'typedi';
import { GradeService } from '@/services/GradeService';
import { Student } from '.prisma/client';
import { Grade } from '@/models/Grade';

@OpenAPI({
  security: [{ BasicAuth: [] }],
})
@JsonController('/students')
export class StudentController {
  @Get('/')
  @ResponseSchema(StudentResponse, { isArray: true })
  @OpenAPI({
    description: 'Get all students',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public getAllStudents(): Promise<Student[]> {
    return Container.get(StudentService).getAllStudents();
  }

  @Get('/:id')
  @ResponseSchema(StudentResponse)
  @OpenAPI({
    description: 'Get student data by NIM with grades',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public getStudentById(@Param('id') id: number): Promise<Student> {
    return Container.get(StudentService).getStudentById(id);
  }

  // @Authorized([UserRole.ADMIN, UserRole.TEACHER])
  @Get('/nim/:nim')
  @ResponseSchema(StudentResponse)
  @OpenAPI({
    description: 'Get student data by NIM with grades',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public getStudentByNIM(@Param('nim') nim: string): Promise<Student> {
    return Container.get(StudentService).getStudentByNim(nim);
  }

  @Get('/:id/grades/:year/:semester')
  @ResponseSchema(StudentResponse)
  @OpenAPI({
    description: 'Get student grades by NIM',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public getStudentGradeByIdPerSemester(
    @Param('id') id: number,
    @Param('year') year: number,
    @Param('semester') semester: number
  ): Promise<Grade[]> {
    return Container.get(GradeService).getGradesByStudentIdPerSemester(
      id,
      year,
      semester
    );
  }

  @Get('/nim/:nim/grades/:year/:semester')
  @ResponseSchema(StudentResponse)
  @OpenAPI({
    description: 'Get student grades by NIM',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public getStudentGradeByNIMPerSemester(
    @Param('nim') nim: string,
    @Param('year') year: number,
    @Param('semester') semester: number
  ): Promise<Grade[]> {
    return Container.get(GradeService).getGradesByNimPerSemester(
      nim,
      year,
      semester
    );
  }

  // @Authorized([UserRole.ADMIN, UserRole.TEACHER])
  @Get('/nim/:nim/grades/')
  @ResponseSchema(StudentResponse)
  @OpenAPI({
    description: 'Get student grades by NIM',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public getGradeThisSemester(@Param('nim') nim: string): Promise<Grade[]> {
    return Container.get(GradeService).getGradesByNim(nim);
  }

  @Get('/:id/grades/')
  @ResponseSchema(StudentResponse)
  @OpenAPI({
    description: 'Get student grades by NIM',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public getGradesByStudentId(@Param('id') id: number): Promise<Grade[]> {
    return Container.get(GradeService).getGradesByStudentId(id);
  }

  //@Authorized([UserRole.ADMIN, UserRole.TEACHER])
  @Post('/')
  @ResponseSchema(StudentResponse)
  @OpenAPI({
    description: 'Create new student',
    responses: {
      '200': {
        description: 'OK',
      },
      '400': {
        description: 'Bad request',
      },
    },
  })
  public createStudent(@Body() student: CreateStudentBody): Promise<Student> {
    return Container.get(StudentService).createStudent(student);
  }

  //@Authorized([UserRole.ADMIN, UserRole.TEACHER])
  @Put('/:id')
  @ResponseSchema(StudentResponse)
  @OpenAPI({
    description: 'Update student, allows partial update',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public updateStudent(
    @Param('id') id: number,
    @Body() student: UpdateStudentBody
  ): Promise<Student> {
    return Container.get(StudentService).updateStudent(id, student);
  }

  //@Authorized([UserRole.ADMIN, UserRole.TEACHER])
  @Delete('/:id')
  @OpenAPI({
    description: 'Delete student',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public removeStudent(@Param('id') id: number): Promise<Student> {
    return Container.get(StudentService).deleteStudent(id);
  }
}
