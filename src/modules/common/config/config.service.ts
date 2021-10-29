import { Injectable } from "@nestjs/common";

import { CONFIG_RATE_LIMIT } from "@/config";
import {
  THROTTLER_TTL,
  RATE_LIMIT_NUM,
} from "@/modules/common/config/config.constant";

const data = {
  [RATE_LIMIT_NUM]: 10,
  [THROTTLER_TTL]: 60,
};

export const backendConfigs = {
  THROTTLER_TTL: CONFIG_RATE_LIMIT.default_throttler_ttl,
  RATE_LIMIT_NUM: CONFIG_RATE_LIMIT.default_rate_limit_num,
};

@Injectable()
export class ConfigService {
  constructor() {
    Object.keys(backendConfigs).forEach((key) => {
      this.getValue(key).then((value) => {
        backendConfigs[key] = parseInt(value) || backendConfigs[key];
      });
    });
  }

  async getValue(key: string): Promise<string> {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve(data[key]);
      }, 2000);
    });
  }
}
