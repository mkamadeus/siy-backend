// import 'reflect-metadata';
// import Answer from '@/entity/Answer';
// import { AnswerService } from '@/services/AnswerService';
// import { IsNumber, IsOptional, IsString } from 'class-validator';
// import {
//   Body,
//   Delete,
//   Get,
//   JsonController,
//   Param,
//   Post,
//   Put,
// } from 'routing-controllers';
// import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

// export class CreateAnswerBody {
//   @IsNumber()
//   public questionId: number;

//   @IsNumber()
//   public studentId: number;

//   @IsNumber()
//   public courseId: number;

//   @IsOptional()
//   @IsString()
//   public strAnswer: string;

//   @IsOptional()
//   @IsNumber()
//   public intAnswer: number;

//   @IsOptional()
//   @IsString()
//   public fileAnswer: string;

//   @IsNumber()
//   public formId: number;
// }

// export class UpdateAnswerBody {
//   @IsOptional()
//   @IsNumber()
//   public questionId: number;

//   @IsOptional()
//   @IsNumber()
//   public studentId: number;

//   @IsOptional()
//   @IsNumber()
//   public courseId: number;

//   @IsOptional()
//   @IsString()
//   public strAnswer: string;

//   @IsOptional()
//   @IsNumber()
//   public intAnswer: number;

//   @IsOptional()
//   @IsString()
//   public fileAnswer: string;

//   @IsOptional()
//   @IsNumber()
//   public formId: number;
// }

// export class AnswerResponse {
//   @IsNumber()
//   public id: number;

//   @IsNumber()
//   public questionId: number;

//   @IsNumber()
//   public studentId: number;

//   @IsNumber()
//   public courseId: number;

//   @IsString()
//   public strAnswer: string;

//   @IsNumber()
//   public intAnswer: number;

//   @IsString()
//   public fileAnswer: string;

//   @IsNumber()
//   public formId: number;
// }

// @JsonController('/answer')
// export class AnswerController {
//   constructor(private answerService: AnswerService) {}

//   @Get('/')
//   @ResponseSchema(AnswerResponse, { isArray: true })
//   @OpenAPI({
//     description: 'Get all answers from database',
//     responses: {
//       '200': {
//         description: 'OK',
//       },
//     },
//   })
//   public getAllAnswers(): Promise<Answer[]> {
//     return this.answerService.getAll();
//   }

//   @Get('/:id')
//   @ResponseSchema(AnswerResponse)
//   @OpenAPI({
//     description: 'Get an answer with given id',
//     responses: {
//       '200': {
//         description: 'OK',
//       },
//     },
//   })
//   public getAnswerByID(@Param('id') id: number): Promise<Answer> {
//     return this.answerService.getOne(id);
//   }

//   @Get('/form/:id')
//   @ResponseSchema(AnswerResponse, { isArray: true })
//   @OpenAPI({
//     description: 'Get list of answers from given form id',
//     responses: {
//       '200': {
//         description: 'OK',
//       },
//     },
//   })
//   public getFormAnswers(@Param('id') id: number): Promise<Answer[]> {
//     return this.answerService.getFormAnswers(id);
//   }

//   @Get('/course/:code')
//   @ResponseSchema(AnswerResponse, { isArray: true })
//   @OpenAPI({
//     description: 'Get list of answers from given course',
//     responses: {
//       '200': {
//         description: 'OK',
//       },
//     },
//   })
//   public getCourseAnswers(@Param('code') code: string): Promise<Answer[]> {
//     return this.answerService.getCourseAnswers(code);
//   }

//   @Get('/course/:code/:formId')
//   @ResponseSchema(AnswerResponse, { isArray: true })
//   @OpenAPI({
//     description: 'Get list of answers from given course and form',
//     responses: {
//       '200': {
//         description: 'OK',
//       },
//     },
//   })
//   public getCourseFormAnswers(
//     @Param('code') code: string,
//     @Param('formId') formId: number
//   ): Promise<Answer[]> {
//     return this.answerService.getCourseFormAnswers(code, formId);
//   }

//   @Post('/')
//   @ResponseSchema(AnswerResponse)
//   @OpenAPI({
//     description: 'Create a new answer',
//     responses: {
//       '200': {
//         description: 'OK',
//       },
//       '400': {
//         description: 'Bad request',
//       },
//     },
//   })
//   public createAnswer(@Body() answer: CreateAnswerBody): Promise<Answer> {
//     return this.answerService.create(answer as Answer);
//   }

//   @Put('/:id')
//   @ResponseSchema(AnswerResponse)
//   @OpenAPI({
//     description: 'Update an answer with given id',
//     responses: {
//       '200': {
//         description: 'OK',
//       },
//     },
//   })
//   public updateAnswer(
//     @Param('id') id: number,
//     @Body() answer: UpdateAnswerBody
//   ): Promise<Answer> {
//     return this.answerService.update(id, answer as Answer);
//   }

//   @Delete('/:id')
//   @OpenAPI({
//     description: 'Delete an answer with given id',
//     responses: {
//       '200': {
//         description: 'OK',
//       },
//     },
//   })
//   public deleteAnswer(@Param('id') id: number): Promise<void> {
//     return this.answerService.delete(id);
//   }
// }
