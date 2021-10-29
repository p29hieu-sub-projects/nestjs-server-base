import { AppCacheModule } from "@/modules/common/cache/app-cache.module";
import { Module } from "@nestjs/common";
import { ConfigService } from "./config.service";

@Module({
  imports: [AppCacheModule],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
