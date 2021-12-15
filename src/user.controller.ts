import {
    Body,
    Controller,
    Post,
    Req,
    Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import {
    ApiCreatedResponse,
    ApiOkResponse,
    ApiUnauthorizedResponse,
    ApiBody,
} from '@nestjs/swagger';


@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('add')
    @ApiBody({})
    addUser(
        @Body() body,
        @Req() request: Request,
        @Res() response: Response,
    ): unknown {
        return this.userService.createUserService(body, request, response);
    }

    @Post('login')
    @ApiBody({})
    login(
        @Body() body,
        @Req() request: Request,
        @Res() response: Response,
    ): unknown {
        return this.userService.loginUserService(body, request, response);
    }
}
