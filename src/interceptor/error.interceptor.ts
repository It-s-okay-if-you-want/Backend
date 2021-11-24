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

    let httpError = null;

    Logger.warn(exception);
    if (exception instanceof HttpException) {
      httpError = {
        status: exception.getStatus(),
        message: exception.message,
      };
    } else {
      httpError = {
        status: 500,
        message: '서버 오류.',
      };
    }

    const { status, message } = httpError;
    return response.status(status).json({
      status,
      message,
    });
  }
}
