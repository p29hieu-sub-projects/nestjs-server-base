import { CacheInterceptor, Module } from "@nestjs/common";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";

import { AppController } from "@/app.controller";
import { AppService } from "@/app.service";
import { AppThrottlerGuard } from "@/guards/app-throttler.guard";
import { ConfigModule } from "@/modules/common/config/config.module";
import { RateLimitModule } from "@/modules/common/rate-limit/rate-limit.module";
import { UsersModule } from "@/modules/users/users.module";

@Module({
  imports: [UsersModule, RateLimitModule, ConfigModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AppThrottlerGuard,
    },
  ],
})
export class AppModule {}
