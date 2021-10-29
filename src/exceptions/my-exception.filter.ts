import {
  Catch,
  ExceptionFilter,
  Logger,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Request, Response } from "express";

import { ExceptionResponse } from "@/interceptors/response/dto/exception.response.dto";

@Catch()
export class MyExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(MyExceptionFilter.name);

  catch(exception: Error, host: ArgumentsHost): Response<ExceptionResponse> {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    this.logger.error(exception.stack);

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let obj_exception = exception;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      obj_exception = Object(exception.getResponse());
    }

    const obj_error: ExceptionResponse = {
      data: null,
      error: {
        message: exception.message,
        "user-agent": request.headers["user-agent"],
        statusCode: status,
        timestamp: new Date().toISOString(),
        ip: request.headers["x-forwarded-for"]
          ? request.headers["x-forwarded-for"]
          : request.connection.remoteAddress,
        path: request.url,
      },
    };

    // this.logger.error(obj_error);
    return response.status(200).json(obj_error);
  }
}
