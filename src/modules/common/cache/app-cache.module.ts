import { Module, CacheModule, Global } from "@nestjs/common";
import * as redisStore from "cache-manager-redis-store";

import { CONFIG_CACHE, REDIS_URI } from "@/config";

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: () => {
        if (CONFIG_CACHE.strategy === "redis") {
          return {
            store: redisStore,
            url: REDIS_URI,
            ttl: CONFIG_CACHE.ttl,
          };
        } else {
          return {
            ttl: CONFIG_CACHE.ttl,
          };
        }
      },
    }),
  ],
  exports: [CacheModule],
})
export class AppCacheModule {}
