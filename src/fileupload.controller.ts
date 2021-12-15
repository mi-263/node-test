import {
    Body,
    Controller,
    Post,
    Get,
    Delete,
    Req,
    Res, UploadedFile, UseGuards, UseInterceptors, Query, Param, ParseIntPipe,
} from '@nestjs/common';
import { FileUploadService } from './fileupload.service';
import { Request, Response } from 'express';
import {FileInterceptor} from "@nestjs/platform-express";
import {AuthGuard} from "./auth/auth.guard";
import {Roles, RolesGuard} from "./auth/roles.guard";
import {ApiBearerAuth, ApiBody, ApiConsumes, ApiParam} from "@nestjs/swagger";





@Controller('fileupload')
export class FileUploadController {
    constructor(private readonly fileUploadService: FileUploadService) {}
    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('admin')
    @Post('upload')
    @ApiBearerAuth('authorization')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    upload(
        @UploadedFile() file: Express.Multer.File,
        @Body() body,
        @Res() response: Response,
    ): unknown {
        return this.fileUploadService.uploadExcelFileService(file, body, response);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles('admin', 'user')
    @Get('files')
    @ApiBearerAuth('authorization')
    files(
        @Req() request: Request,
        @Res() response: Response,
    ): unknown {
        return this.fileUploadService.getExcelFilesService(response);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles('admin', 'user')
    @Get('file/:id')
    @ApiParam({
        name: 'id',
        type: 'integer'
    })
    @ApiBearerAuth('authorization')
    file(
        @Req() request: Request,
        @Res() response: Response,
        @Param('id', new ParseIntPipe()) id,
    ): unknown {
        return this.fileUploadService.getExcelFileService( id, response, request);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles('admin', 'user')
    @ApiBearerAuth('authorization')
    @ApiParam({
        name: 'id',
        type: 'integer'
    })
    @Delete('delete/:id')
    delete(
        @Req() request: Request,
        @Res() response: Response,
        @Param('id', new ParseIntPipe()) id,
    ): unknown {
        return this.fileUploadService.deleteExcelFileService( id, response, request);
    }
}
