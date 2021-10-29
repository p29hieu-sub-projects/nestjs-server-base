import { Module, CacheModule, Global } from "@nestjs/common";
import * as redisStore from "cache-manager-redis-store";

import { CONFIG_CACHE } from "@/config";

@Global()
@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      url: CONFIG_CACHE.uri,
      ttl: CONFIG_CACHE.default_ttl,
    }),
  ],
  exports: [CacheModule],
})
export class AppCacheModule {}
