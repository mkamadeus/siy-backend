import LOSupplement from "@/entity/LOSupplement";
import LOSupplementService from "@/services/LOSupplementService";
import { IsNumber, IsOptional } from "class-validator";
import {
  Body,
  Get,
  JsonController,
  Param,
  Post,
  Put,
} from "routing-controllers";

export class CreateLOBody {
  @IsNumber()
  studentId: number;

  @IsNumber()
  courseId: number;

  @IsNumber()
  year: number;

  @IsNumber()
  semester: number;

  @IsNumber()
  loA: number;

  @IsNumber()
  loB: number;

  @IsNumber()
  loC: number;

  @IsNumber()
  loD: number;

  @IsNumber()
  loE: number;

  @IsNumber()
  loF: number;

  @IsNumber()
  loG: number;
}

export class UpdateLOBody {
  @IsOptional()
  @IsNumber()
  studentId: number;

  @IsOptional()
  @IsNumber()
  courseId: number;

  @IsOptional()
  @IsNumber()
  year: number;

  @IsOptional()
  @IsNumber()
  semester: number;

  @IsOptional()
  @IsNumber()
  loA: number;

  @IsOptional()
  @IsNumber()
  loB: number;

  @IsOptional()
  @IsNumber()
  loC: number;

  @IsOptional()
  @IsNumber()
  loD: number;

  @IsOptional()
  @IsNumber()
  loE: number;

  @IsOptional()
  @IsNumber()
  loF: number;

  @IsOptional()
  @IsNumber()
  loG: number;
}

@JsonController("/lo")
export default class LOSupplementController {
  constructor(private loService: LOSupplementService) {}

  @Get("/")
  public async getAllLO() {
    return await this.loService.getAll();
  }

  @Get("/:id")
  public async getLoById(@Param("id") id: number) {
    return await this.loService.getOne(id);
  }

  @Get("/student/:studentId")
  public async getLoByStudentId(@Param("studentId") studentId) {
    return await this.loService.getByStudentId(studentId);
  }

  @Post("/")
  public async createLo(@Body() loBody: CreateLOBody) {
    return await this.loService.create(loBody as LOSupplement);
  }

  @Put("/:id")
  public async updateLo(@Param("id") id: number, @Body() loBody: UpdateLOBody) {
    return await this.loService.update(id, loBody as LOSupplement);
  }
}
