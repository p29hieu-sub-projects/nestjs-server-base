import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { ThrottlerStorage } from "@nestjs/throttler";
import { Cache } from "cache-manager";

@Injectable()
export class AppThrottlerStorage implements ThrottlerStorage {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  storage: Record<string, number[]>;

  async getRecord(key: string): Promise<number[]> {
    return this.cacheManager.get(key);
  }

  async addRecord(key: string, ttl: number): Promise<void> {
    const oldRecord = (await this.getRecord(key)) || [];
    await this.cacheManager.set(
      key,
      [...oldRecord, Math.round(Math.random() * 1e7)],
      { ttl },
    );
  }
}
