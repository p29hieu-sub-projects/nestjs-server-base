import { AppController } from "@/app.controller";
import { AppService } from "@/app.service";
import { AppThrottlerGuard } from "@/guards/app-throttler.guard";
import { AppCacheModule } from "@/modules/common/cache/app-cache.module";
import { ConfigModule } from "@/modules/common/config/config.module";
import { RateLimitModule } from "@/modules/common/rate-limit/rate-limit.module";
import { UsersModule } from "@/modules/users/users.module";
import { CacheInterceptor, CACHE_MANAGER, Module } from "@nestjs/common";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";

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
    {
      provide: CACHE_MANAGER,
      useClass: AppCacheModule,
    },
  ],
})
export class AppModule {}
