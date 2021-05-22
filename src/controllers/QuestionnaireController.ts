import 'reflect-metadata';
import {
  Body,
  Delete,
  //Get,
  JsonController,
  Param,
  Post,
  Put,
  HeaderParam,
} from 'routing-controllers';
import { RatingQuestionnaireService } from '@/services/RatingQuestionnaireService';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { QuestionnaireResponse } from './response/QuestionnaireResponse';
import {
  CreateQuestionnaireBody,
  UpdateQuestionnaireBody,
} from './request/QuestionnaireRequest';
import {
  RatingQuestionnaire,
  RatingQuestionnaireUncheckedCreateInput,
  RatingQuestionnaireUncheckedUpdateInput,
} from '@/models/RatingQuestionnaire';
import Container from 'typedi';

@JsonController('/lecture')
export class QuestionnaireController {
  //constructor(private questionnaireService: RatingQuestionnaireService) {
  //  this.questionnaireService = questionnaireService;
  //}

  //@Get('/')
  //@ResponseSchema(QuestionnaireResponse, { isArray: true })
  //@OpenAPI({
  //  description: 'Get all questionnaires',
  //  responses: {
  //    '200': {
  //      description: 'OK',
  //    },
  //  },
  //})
  //public getAllQuestionnaires() {
  //  return this.questionnaireService.getAll();
  //}

  //@Get('/:id')
  //@ResponseSchema(QuestionnaireResponse)
  //@OpenAPI({
  //  description: 'Get one questionnaires by ID',
  //  responses: {
  //    '200': {
  //      description: 'OK',
  //    },
  //  },
  //})
  //public getOneQuestionnaire(@Param('id') id: number) {
  //  return this.questionnaireService.getOne(id);
  //}

  //@Get('/lectures/:id')
  //@ResponseSchema(QuestionnaireResponse)
  //@OpenAPI({
  //  description: 'Get questionnaires by Lecture',
  //  responses: {
  //    '200': {
  //      description: 'OK',
  //    },
  //  },
  //})
  //public getQuestionnairesByLecture(@Param('id') id: number) {
  //  return this.questionnaireService.getByLectureId(id);
  //}

  @Post('/:id/questionnaire')
  @ResponseSchema(QuestionnaireResponse)
  @OpenAPI({
    description: 'Create new questionnaire response',
    responses: {
      '200': {
        description: 'OK',
      },
      '400': {
        description: 'Bad request',
      },
    },
  })
  public createQuestionnaire(
    @HeaderParam('Authorization') bearer: string,
    @Param('id') lectureId: number,
    @Body() rq: CreateQuestionnaireBody
  ): Promise<RatingQuestionnaire> {
    return Container.get(
      RatingQuestionnaireService
    ).createRatingQuestionnaireByIds(
      bearer,
      lectureId,
      rq as RatingQuestionnaireUncheckedCreateInput
    );
  }

  //Create based on a nim and a lecture, note that the student HAS to take the lecture
  // @Post('/:nim/rq/:id')
  // @ResponseSchema(QuestionnaireResponse)
  // @OpenAPI({
  //   description:
  //     'Create new questionnaire response from student with certain NIM for lecture with certain ID',
  //   responses: {
  //     '200': {
  //       description: 'OK',
  //     },
  //     '400': {
  //       description: 'Bad request',
  //     },
  //   },
  // })

  // public createLectureQuestionnaire(
  //   @Param('nim') nim: string,
  //   @Param('id') id: number,
  //   @Body() rq: CreateQuestionnaireBody
  // ) {
  //   return this.questionnaireService.createByStudentNimLecture(
  //     nim,
  //     id,
  //     rq as RatingQuestionnaire
  //   );
  // }

  @Put('/:id/questionnaire')
  @ResponseSchema(QuestionnaireResponse)
  @OpenAPI({
    description: 'Update questionnaire, allows partial update',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public updateQuestionnaire(
    @HeaderParam('Authorization') bearer: string,
    @Param('id') lectureId: number,
    @Body() rq: UpdateQuestionnaireBody
  ): Promise<RatingQuestionnaire> {
    return Container.get(
      RatingQuestionnaireService
    ).updateRatingQuestionnaireByIds(
      bearer,
      lectureId,
      rq as RatingQuestionnaireUncheckedUpdateInput
    );
  }

  //TODO: Does update/create by admin needed?

  @Delete('/:id/student/:sId/questionnaire')
  @OpenAPI({
    description: 'Delete questionnaire',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public deleteRatingQuestionnaire(
    @Param('id') lectureId: number,
    @Param('sId') studentId: number
  ): Promise<RatingQuestionnaire> {
    return Container.get(RatingQuestionnaireService).deleteRatingQuestionnaire(
      studentId,
      lectureId
    );
  }
}
