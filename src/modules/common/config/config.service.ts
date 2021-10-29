import { CONFIG_RATE_LIMIT } from "@/config";
import { APP_CONFIG_KEYS } from "@/modules/common/config/config.constant";
import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";

export type IBackendConfig = Record<APP_CONFIG_KEYS, string>;

export const backendConfigs: IBackendConfig = {
  THROTTLER_TTL: CONFIG_RATE_LIMIT.default_throttler_ttl.toString(),
  RATE_LIMIT_NUM: CONFIG_RATE_LIMIT.default_rate_limit_num.toString(),
};

@Injectable()
export class ConfigService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {
    Object.keys(backendConfigs).forEach((key) => {
      this.cacheManager.get(key).then((value) => {
        backendConfigs[key] = value || backendConfigs[key];
      });
    });
  }

  async getValue(key: string): Promise<string> {
    return backendConfigs[key] || (await this.cacheManager.get(key));
  }
}
