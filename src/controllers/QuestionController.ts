import 'reflect-metadata';
import Question from '@/entity/Question';
import { QuestionService } from '@/services/QuestionService';
import { IsNumber, IsOptional, IsString } from 'class-validator';
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

export class CreateQuestionBody {
  @IsString()
  public question: string;

  @IsString()
  public answerType: string;
}

export class UpdateQuestionBody {
  @IsOptional()
  @IsString()
  public question: string;

  @IsOptional()
  @IsString()
  public answerType: string;
}

export class QuestionResponse {
  @IsNumber()
  public id: number;

  @IsString()
  public question: string;

  @IsString()
  public answerType: string;
}

@JsonController('/question')
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Get('/')
  @ResponseSchema(QuestionResponse, { isArray: true })
  @OpenAPI({
    description: 'Get all questions from database',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public getAllQuestions(): Promise<Question[]> {
    return this.questionService.getAll();
  }

  @Get('/:id')
  @ResponseSchema(QuestionResponse)
  @OpenAPI({
    description: 'Get a question with given id',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public getQuestionByID(@Param('id') id: number): Promise<Question> {
    return this.questionService.getOne(id);
  }

  @Get('/answerType/:answerType')
  @ResponseSchema(QuestionResponse, { isArray: true })
  @OpenAPI({
    description: 'Get list of questions with given answer type',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public getQuestionsByAnswertype(
    @Param('answerType') answerType: string
  ): Promise<Question[]> {
    return this.questionService.getByAnswerType(answerType);
  }

  @Post('/')
  @ResponseSchema(QuestionResponse)
  @OpenAPI({
    description: 'Create a new question',
    responses: {
      '200': {
        description: 'OK',
      },
      '400': {
        description: 'Bad request',
      },
    },
  })
  public createQuestion(
    @Body() question: CreateQuestionBody
  ): Promise<Question> {
    return this.questionService.create(question as Question);
  }

  @Put('/:id')
  @ResponseSchema(QuestionResponse)
  @OpenAPI({
    description: 'Update a question with given id',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public updateQuestion(
    @Param('id') id: number,
    @Body() question: UpdateQuestionBody
  ): Promise<Question> {
    return this.questionService.update(id, question as Question);
  }

  @Delete('/:id')
  @OpenAPI({
    description: 'Delete a question with given id',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public deleteQuestion(@Param('id') id: number): Promise<void> {
    return this.questionService.delete(id);
  }
}
