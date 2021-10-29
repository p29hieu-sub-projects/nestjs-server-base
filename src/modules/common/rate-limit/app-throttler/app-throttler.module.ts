import { Module } from "@nestjs/common";

import { AppCacheModule } from "@/modules/common/cache/app-cache.module";
import { AppThrottlerStorage } from "@/modules/common/rate-limit/app-throttler/throtter.storage";

@Module({
  imports: [AppCacheModule],
  providers: [AppThrottlerStorage],
  exports: [AppThrottlerStorage],
})
export class AppThrottlerModule {}
