import { ThrottlerModule } from "@nestjs/throttler";
import { Module } from "@nestjs/common";

import { AppThrottlerStorage } from "./app-throttler/throtter.storage";
import { AppThrottlerModule } from "./app-throttler/app-throttler.module";
import { backendConfigs } from "@/modules/common/config/config.service";

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      imports: [AppThrottlerModule],
      inject: [AppThrottlerStorage],
      useFactory: async (storage: AppThrottlerStorage) => {
        return {
          ttl: backendConfigs.THROTTLER_TTL,
          limit: backendConfigs.RATE_LIMIT_NUM,
          storage,
        };
      },
    }),
  ],
})
export class RateLimitModule {}
