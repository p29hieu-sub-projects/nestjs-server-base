import { ThrottlerException, ThrottlerGuard } from "@nestjs/throttler";

import { Injectable, ExecutionContext } from "@nestjs/common";

@Injectable()
export class AppThrottlerGuard extends ThrottlerGuard {
  async handleRequest(
    context: ExecutionContext,
    limit: number,
    ttl: number,
  ): Promise<boolean> {
    const { req, res } = this.getRequestResponse(context);

    const ip = req.ip;
    const key = this.generateKey(context, ip);
    const ttls = await this.storageService.getRecord(key);

    if (ttls && ttls.length >= limit) {
      throw new ThrottlerException("Too many request");
    }

    await this.storageService.addRecord(key, ttl);
    return true;
  }
}
