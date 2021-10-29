import { tap } from "rxjs/operators";
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from "express";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest<Request>();
    this.logger.log(
      `${request.connection.remoteAddress} ${request.method} ${request.url}`,
    );
    const now = Date.now();
    return next
      .handle()
      .pipe(tap((data) => console.log(`After... ${Date.now() - now}ms`)));
  }
}
