import 'reflect-metadata';
import { StudentService } from '@/services/StudentService';
import {
  Authorized,
  Body,
  Delete,
  Get,
  HeaderParam,
  JsonController,
  Param,
  Post,
  Put,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { StudentResponse } from './response/StudentResponse';
import { CreateStudentBody, UpdateStudentBody } from './request/StudentRequest';
import { UserRoleEnum } from '@/enum/UserRoleEnum';
import Container from 'typedi';
import { StudentGradeService } from '@/services/StudentGradeService';
import { AuthService } from '@/services/AuthService';
import { Student } from '.prisma/client';

@OpenAPI({
  security: [{ BasicAuth: [] }],
})
@JsonController('/students')
export class StudentController {
  @Get('/')
  @ResponseSchema(StudentResponse, { isArray: true })
  @OpenAPI({
    description: 'Get all students with grades',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public getAllStudents(): Promise<Student[]> {
    return Container.get(StudentService).getAllStudents();
  }

  // @Authorized([UserRoleEnum.ADMIN, UserRoleEnum.TEACHER])
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

  //@Authorized([UserRoleEnum.ADMIN, UserRoleEnum.TEACHER])
  @Get('/nim/:nim/grades/:year')
  @ResponseSchema(StudentResponse)
  @OpenAPI({
    description: 'Get student grades by NIM',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public getStudentGradeByYear(
    @Param('nim') nim: string,
    @Param('year') year: number
  ): Promise<Student> {
    return Container.get(StudentGradeService).getGradeByNimPerYear(nim, year);
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
  public getStudentGradeBySemester(
    @Param('nim') nim: string,
    @Param('year') year: number,
    @Param('semester') semester: number
  ) {
    return Container.get(StudentGradeService).getByNimPerSemester(
      nim,
      year,
      semester
    );
  }

  // @Authorized([UserRoleEnum.ADMIN, UserRoleEnum.TEACHER])
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
  public getGradeThisSemester(@Param('nim') nim: string) {
    return Container.get(StudentGradeService).getGradeByNim(nim);
  }

  //@Authorized([UserRoleEnum.ADMIN, UserRoleEnum.TEACHER])
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
    return Container.get(StudentService).createStudent(student as Student);
  }

  //@Authorized([UserRoleEnum.ADMIN, UserRoleEnum.TEACHER])
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
    return Container.get(StudentService).updateStudent(id, student as Student);
  }

  //@Authorized([UserRoleEnum.ADMIN, UserRoleEnum.TEACHER])
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
