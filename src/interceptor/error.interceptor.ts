import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Response } from 'express';

@Catch()
export default class CatchException implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: Response = ctx.getResponse();

    Logger.warn(exception);
    if (exception instanceof HttpException) {
      return response.status(exception.getStatus()).json(exception.getResponse());
    } else {
      return response.status(500).json({
        status: 500,
        message: '서버 오류'
      });
    }
  }
}
