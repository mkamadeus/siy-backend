import { UserRoleEnum } from "@/enum/UserRoleEnum";
import { AuthService } from "@/services/AuthService";
import { StudentGradeService } from "@/services/StudentGradeService";
import { StudentService } from "@/services/StudentService";
import {
  Authorized,
  Get,
  HeaderParam,
  JsonController,
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import Container from "typedi";
import { StudentResponse } from "./response/StudentResponse";

@Authorized([UserRoleEnum.STUDENT])
@JsonController("/session/student")
export class StudentSessionController {
  @Get("/")
  @ResponseSchema(StudentResponse)
  @OpenAPI({
    description: "Get student grades by session token",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public async getStudentBySession(
    @HeaderParam("Authorization") token: string
  ) {
    const jwtToken = Container.get(AuthService).parseBearerToken(token);
    const user = await Container.get(AuthService).getUserByToken(jwtToken);
    const student = await Container.get(StudentService).getByUserId(user.id);
    return student;
  }

  @Get("/grades")
  @ResponseSchema(StudentResponse)
  @OpenAPI({
    description: "Get student grades by session token",
    responses: {
      "200": {
        description: "OK",
      },
    },
  })
  public async getGradesBySession(@HeaderParam("Authorization") token: string) {
    const jwtToken = Container.get(AuthService).parseBearerToken(token);
    const user = await Container.get(AuthService).getUserByToken(jwtToken);
    const student = await Container.get(StudentService).getByUserId(user.id);
    const grades = await Container.get(StudentGradeService).getByStudentId(
      student.id
    );
    console.log(grades);
    return grades;
  }

  // @Get("/lo")
  // @ResponseSchema(StudentResponse)
  // @OpenAPI({
  //   description: "Get student grades by session token",
  //   responses: {
  //     "200": {
  //       description: "OK",
  //     },
  //   },
  // })
  // public async getLosBySession(@HeaderParam("Authorization") token: string) {
  //   const jwtToken = Container.get(AuthService).parseBearerToken(token);
  //   const user = await Container.get(AuthService).getUserByToken(jwtToken);
  //   const student = await Container.get(StudentService).getByUserId(user.id);
  //   const grades = await Container.get(StudentGradeService).getByStudentId(
  //     student.id
  //   );
  //   console.log(grades)
  //   return grades;
  // }
}
