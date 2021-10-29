export const CONFIG_PORT = 3000;

export const CONFIG_JWT = {
  secret: "hihi",
  timeout: "60s",
};

export const CONFIG_CACHE = {
  strategy: "redis", // 'local'
  ttl: 60,
};

export const REDIS_URI = "redis://10.0.0.20:6379/2";

export const CONFIG_RATE_LIMIT = {
  default_throttler_ttl: 60,
  default_rate_limit_num: 10,
};
