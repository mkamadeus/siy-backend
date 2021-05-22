import 'reflect-metadata';
import {
  Body,
  Delete,
  Get,
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

  @Get('/all/questionnaires')
  @ResponseSchema(QuestionnaireResponse)
  @OpenAPI({
    description: 'Get all questionnaires',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public getAllQuestionnaires(): Promise<RatingQuestionnaire[]> {
    return Container.get(
      RatingQuestionnaireService
    ).getAllRatingQuestionnaires();
  }

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

  @Delete('/:id/questionnaire/student/:sId')
  @OpenAPI({
    description: 'Delete questionnaire',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public deleteQuestionnaireByAdmin(
    @Param('id') lectureId: number,
    @Param('sId') studentId: number
  ): Promise<RatingQuestionnaire> {
    return Container.get(RatingQuestionnaireService).deleteRatingQuestionnaire(
      studentId,
      lectureId
    );
  }
}
