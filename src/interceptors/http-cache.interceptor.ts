import { CacheInterceptor, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    const request: Request = context.switchToHttp().getRequest();
    const { httpAdapter } = this.httpAdapterHost;
    const httpServer = httpAdapter.getHttpServer();

    const isGetRequest = request.method === "GET";
    const excludePaths = [];
    if (
      !isGetRequest ||
      (isGetRequest && excludePaths.includes(httpServer.url))
    ) {
      return undefined;
    }
    return httpServer.url(request);
  }
}
