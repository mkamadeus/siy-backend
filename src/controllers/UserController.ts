import User from '@/entity/User';
import { UserRoleEnum } from '@/enum/UserRoleEnum';
import { UserService } from '@/services/UserService';
import {
  Authorized,
  Body,
  Get,
  JsonController,
  Param,
  Post,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { CreateUserBody } from './request/UserRequest';
import { UserResponse } from './response/UserResponse';

@JsonController('/users')
export class UserController {
  constructor(private userService: UserService) {
    this.userService = userService;
  }

  // @Authorized(UserRoleEnum.ADMIN)
  @Get('/')
  @ResponseSchema(UserResponse, { isArray: true })
  @OpenAPI({
    description: 'Get all users',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Authorized(UserRoleEnum.ADMIN)
  @Get('/:id')
  @ResponseSchema(UserResponse)
  @OpenAPI({
    description: 'Get user by ID',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public async getUserById(@Param('id') id: number) {
    return await this.userService.getUserById(id);
  }

  // @Authorized(UserRoleEnum.ADMIN)
  @Post('/')
  @ResponseSchema(UserResponse)
  @OpenAPI({
    description: 'Registers a new user',
    responses: {
      '200': {
        description: 'OK',
      },
    },
  })
  public async createUser(@Body() user: CreateUserBody) {
    return await this.userService.createUser(user as User);
  }
}
